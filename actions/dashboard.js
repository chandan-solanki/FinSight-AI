"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


const serializeAccount = (obj) => {
  const serialize = { ...obj };

  if (obj.balance) {
    serialize.balance = Number(obj.balance);
  }

  return obj;
};

export default async function createAccount(data) {
  try {
    const userId = auth.userId;
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user = await db.user.findUnique({ where: { clearkUserId: userId } });

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
        userId: user.id,
        balance: balanceFloat,
        isDefault: shouldBeDefault,
        ...data,
      },
    });

    const serializedAccount = serializeAccount(account);

    revalidatePath("/dashboard");
    return { success: true, serializedAccount };
  } catch (err) {
    throw new Error(err.message);
  }
}
