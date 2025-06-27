import { LogType, UserRole } from "@/prisma-user-database/user-database-client-types";
import { db } from "./db";

async function getTelegramSettings(
  userId?: string,
  role?: UserRole,
  orgId?: string
) {
  if (role === "SUPERADMIN") {
    return await db.telegramSetting.findMany({
      where: { scope: "SUPERADMIN" },
    });
  }

  if (role === "ADMIN") {
    return await db.telegramSetting.findMany({
      where: {
        OR: [
          { scope: "ORG", orgId },
          { scope: "USER", userId },
        ],
      },
    });
  }

  return await db.telegramSetting.findMany({
    where: { scope: "USER", userId },
  });
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

  // Save to database log
  await db.updateLog.create({
    data: {
      name: title,
      message,
      updatedBy: userId ?? "SYSTEM", // or null if allowed,
      orgId,
      type,
      date: new Date(),
    },
  });

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
