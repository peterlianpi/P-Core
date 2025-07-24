import { LogType, UserRole } from "@prisma/client";
import { prisma } from "../db/client";


async function getTelegramSettings(
  userId?: string,
  role?: UserRole,
  orgId?: string
) {
  try {
    let settings = [];

    if (role === "SUPERADMIN") {
      settings = await prisma.telegramSetting.findMany({
        where: { scope: "SUPERADMIN" },
      });
    } else if (role === "ADMIN") {
      settings = await prisma.telegramSetting.findMany({
        where: {
          OR: [
            { scope: "ORG", orgId },
            { scope: "USER", userId },
          ],
        },
      });
    } else {
      settings = await prisma.telegramSetting.findMany({
        where: { scope: "USER", userId },
      });
    }

    // If no database settings found, use environment variables as fallback
    if (settings.length === 0 && process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      return [{
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        chatId: process.env.TELEGRAM_CHAT_ID,
        scope: role || "USER",
        userId: userId,
        orgId: orgId,
      }];
    }

    return settings;
  } catch (error) {
    console.warn("Telegram settings not configured in database, checking environment variables:", error);
    
    // Fallback to environment variables if database is not available
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      return [{
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        chatId: process.env.TELEGRAM_CHAT_ID,
        scope: role || "USER",
        userId: userId,
        orgId: orgId,
      }];
    }
    
    return []; // Return empty array if no telegram configuration available
  }
}

export async function sendTelegramLog({
  userId,
  orgId,
  role,
  title,
  message,
  type = "INFO",
}: {
  userId?: string; // ✅ Now optional
  orgId?: string;
  role?: UserRole; // ✅ Now optional
  title: string;
  message: string;
  type?: LogType;
}) {
  const settings = await getTelegramSettings(userId, role, orgId);

  // Save to database log (with error handling)
  try {
    await prisma.updateLog.create({
      data: {
        name: title,
        message,
        updatedBy: userId ?? "SYSTEM",
        orgId,
        type,
        date: new Date(),
      },
    });
  } catch (error) {
    console.warn("Could not save update log:", error);
  }

  // Send to Telegram
  for (const setting of settings) {
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${setting.botToken}/sendMessage`;

    try {
      await fetch(TELEGRAM_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: setting.chatId,
          text: `*${title}*\n\n${message}`,
          parse_mode: "Markdown",
        }),
      });
    } catch (error) {
      console.error("❌ Telegram send failed:", error);
    }
  }
}
