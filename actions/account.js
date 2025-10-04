"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeAccount = (obj) => {
  const serialize = { ...obj };

  if (obj.amount) {
    serialize.amount = Number(obj.amount);
  }

  if (obj.balance) {
    serialize.balance = Number(obj.balance);
  }

  return serialize;
};

export const updateDefaultAccount = async (accountId) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated errr");
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    await db.account.updateMany({
      where: { userId: user.id, isDefault: true },
      data: { isDefault: false },
    });

    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeAccount(account) };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

export const getAccountWithTransaction = async (accountId) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated errr");
  }

  const user = await db.user.findUnique({ where: { clerkUserId: userId } });

  if (!user) {
    throw new Error("User not found");
  }

  const account = await db.account.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
    include: {
      transactions: {
        orderBy: { date: "desc" },
      },
      _count: { select: { transactions: true } },
    },
  });

  if (!account) {
    return null;
  }

  return {
    ...serializeAccount(account),
    transactions: account.transactions.map(serializeAccount),
  };
};

export const bulkDeleteTransactions = async (transactionIds) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated errr");
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    
    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });



    const acccountBalanceChange = transactions.reduce((acc, curr) => {
      let change = acc.type === "EXPENSE" ? -curr.amount : curr.amount;

      acc[curr.accountId] = (acc[curr.accountId] || 0) + change;
      return acc;
    }, {});

    // console.log("ACCOUNT BALANCE CHANGE : " , acccountBalanceChange)


    await db.$transaction(async (tx) => {
      await tx.transaction.deleteMany({
        where: {
          id: { in: transactionIds },
          userId: user.id,
        },
      });

      for (const [accountId, balanceChange] of Object.entries(
        acccountBalanceChange
      )) {
       await tx.account.update({
          where: {
            id: accountId,
          },
          data: {
            balance: {
              increment: Number.parseInt(balanceChange),
            },
          },
        });
      }
    });

      revalidatePath("/dashboard");
      revalidatePath("/account/[id]");
      return "success";
  } catch (err) {
    return { success: false, message: err.message };
    // throw new Error(err.message);
  }
};
