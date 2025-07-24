"use server";

import { prisma } from "@/lib/db/client";
import { TelegramScope } from "@prisma/client";

export const getTelegramSetting = async ({
  userId,
  scope = "USER",
}: {
  userId: string;
  scope?: TelegramScope;
}) => {
  try {
    const result = await prisma.telegramSetting.findFirst({
      where: { 
        userId: userId, 
        scope: scope,
        isActive: true 
      },
    });

    return {
      telegramChatId: result?.chatId,
      telegramBotToken: result?.botToken,
      isActive: result?.isActive ?? false,
    };
  } catch (error) {
    console.error("Error fetching telegram setting:", error);
    return {
      telegramChatId: null,
      telegramBotToken: null,
      isActive: false,
    };
  }
};

export const getTelegramSettings = async ({ userId }: { userId: string }) => {
  try {
    const result = await prisma.telegramSetting.findMany({
      where: { 
        userId: userId,
        isActive: true 
      },
      orderBy: { createdAt: 'desc' }
    });

    return {
      telegramSettings: result.map((setting) => ({
        id: setting.id,
        chatId: setting.chatId,
        botToken: setting.botToken,
        scope: setting.scope,
        orgId: setting.orgId,
        isActive: setting.isActive,
        createdAt: setting.createdAt,
      })),
    };
  } catch (error) {
    console.error("Error fetching telegram settings:", error);
    return {
      telegramSettings: [],
    };
  }
};

export const createTelegramSetting = async ({
  userId,
  chatId,
  botToken,
  scope = "USER",
  orgId,
}: {
  userId: string;
  chatId: string;
  botToken: string;
  scope?: TelegramScope;
  orgId?: string;
}) => {
  try {
    // Check if setting already exists
    const existing = await prisma.telegramSetting.findFirst({
      where: {
        userId,
        scope,
        orgId: orgId || null,
      },
    });

    if (existing) {
      // Update existing setting
      const updated = await prisma.telegramSetting.update({
        where: { id: existing.id },
        data: {
          chatId,
          botToken,
          isActive: true,
          updatedAt: new Date(),
        },
      });
      return { success: true, data: updated };
    } else {
      // Create new setting
      const created = await prisma.telegramSetting.create({
        data: {
          userId,
          chatId,
          botToken,
          scope,
          orgId: orgId || null,
          isActive: true,
        },
      });
      return { success: true, data: created };
    }
  } catch (error) {
    console.error("Error creating/updating telegram setting:", error);
    return { success: false, error: "Failed to save telegram setting" };
  }
};

export const deleteTelegramSetting = async ({
  settingId,
  userId,
}: {
  settingId: string;
  userId: string;
}) => {
  try {
    await prisma.telegramSetting.delete({
      where: {
        id: settingId,
        userId: userId, // Ensure user can only delete their own settings
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting telegram setting:", error);
    return { success: false, error: "Failed to delete telegram setting" };
  }
};

export const toggleTelegramSetting = async ({
  settingId,
  userId,
  isActive,
}: {
  settingId: string;
  userId: string;
  isActive: boolean;
}) => {
  try {
    const updated = await prisma.telegramSetting.update({
      where: {
        id: settingId,
        userId: userId, // Ensure user can only update their own settings
      },
      data: {
        isActive,
        updatedAt: new Date(),
      },
    });
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error toggling telegram setting:", error);
    return { success: false, error: "Failed to update telegram setting" };
  }
};
