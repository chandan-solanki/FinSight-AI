"use server"

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
