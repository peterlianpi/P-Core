"use server";

import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const getTelegramSetting = async ({
  userId,
  role,
}: {
  userId: string;
  role: UserRole;
}) => {
  const result = await db.telegramSetting.findUnique({
    where: { userId_role: { userId: userId, role: role } },
  });

  return {
    telegramChatId: result?.chatId,
    telegramBotToken: result?.botToken,
  };
};

export const getTelegramSettings = async ({ userId }: { userId: string }) => {
  const result = await db.telegramSetting.findMany({
    where: { userId: userId },
  });

  return {
    telegramSettings: result.map((setting) => ({
      chatId: setting.chatId,
      botToken: setting.botToken,
    })),
  };
};
