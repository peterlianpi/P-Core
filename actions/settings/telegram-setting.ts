"use server";

import { userDBPrismaClient } from "@/lib/prisma-client/user-prisma-client";
import { UserRole } from "@/prisma-user-database/user-database-client-types";

export const getTelegramSetting = async ({
  userId,
  role,
}: {
  userId: string;
  role: UserRole;
}) => {
  const result = await userDBPrismaClient.telegramSetting.findUnique({
    where: { userId_role: { userId: userId, role: role } },
  });

  return {
    telegramChatId: result?.chatId,
    telegramBotToken: result?.botToken,
  };
};

export const getTelegramSettings = async ({ userId }: { userId: string }) => {
  const result = await userDBPrismaClient.telegramSetting.findMany({
    where: { userId: userId },
  });

  return {
    telegramSettings: result.map((setting) => ({
      chatId: setting.chatId,
      botToken: setting.botToken,
    })),
  };
};
