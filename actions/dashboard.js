"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeAccount = (obj) => {
  const serialize = { ...obj };

  if (obj.amount) {
    serialize.amount = Number(obj.amount);
    serialize.amount = Number(obj.amount);
  }

  if (obj.balance) {
    serialize.balance = Number(obj.balance);
  }

  // Serialize transactions if they exist
  if (obj.transactions && Array.isArray(obj.transactions)) {
    serialize.transactions = obj.transactions.map((transaction) => ({
      ...transaction,
      amount: Number(transaction.amount), // Convert Decimal to Number
    }));
  }

  return serialize;
};

export default async function createAccount(data) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated errr");
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    // Create account logic here

    const balanceFloat = parseFloat(data.balance);

    if (isNaN(balanceFloat)) {
      throw new Error("Invalid balance");
    }

    const existingAccount = await db.account.findMany({
      where: { userId: user.id },
    });

    const shouldBeDefault = existingAccount.length === 0 ? true : data.isDefaut;

    //
    if (shouldBeDefault) {
      await db.account.updateMany({
        where: { userId: user.id, isDefault: true },
        data: { isDefault: false },
      });
    }

    const account = await db.account.create({
      data: {
        ...data,
        userId: user.id,
        balance: balanceFloat,
        isDefault: shouldBeDefault,
      },
    });

    const serializedAccount = serializeAccount(account);

    revalidatePath("/dashboard");
    return { success: true, serializedAccount };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getAccounts() {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        transactions: true,
      },
    });

    const serializedAccount = accounts.map(serializeAccount);

    return { success: true, serializedAccount };
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getDashboardData(params) {
  try {
    const { userId } = await auth();

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({ where: { clerkUserId: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    const transactions = await db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });

    const serializeTransaction = transactions.map((t) => {
      t.amount = t.amount.toNumber();
      return t;
    });

    return { success: true, serializeTransaction };
  } catch (err) {
    throw new Error(err.message);
  }
}
