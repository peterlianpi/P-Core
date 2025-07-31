import { Hono } from "hono";
import { prisma, TelegramScope } from "@/lib/db/client";
import { zValidator } from "@hono/zod-validator";
import z from "zod";

const app = new Hono()

  // GET /api/telegram-settings?userId=... - Get Telegram settings for a user by userId param
  .get("/", zValidator(
    "query",
    z.object({
      userId: z.string(),
    })
  ), zValidator(
    "param",
    z.object({
      scope: z.string()
    })
  ), async (c) => {
    const { userId } = c.req.valid("query");
    const { scope } = c.req.valid("param")
    if (!userId) {
      return c.json({ error: "Missing userId parameter" }, 400);
    }

    // Fetch Telegram settings for the user
    const user = await prisma.telegramSetting.findFirst({
      where: { userId: userId, scope: scope as TelegramScope },
      select: {
        chatId: true,
        botToken: true,
        isActive: true,
      },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({
      telegramChatId: user.chatId || undefined,
      telegramBotToken: user.botToken || undefined,
      isActive: user.isActive ?? undefined,
    });
  });

export default app;
