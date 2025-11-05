import { Hono } from "hono";
import { db } from "@/lib/db";
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

    // TODO: Implement when telegramSetting model is added to schema
    // Mock data for now
    return c.json({
      telegramChatId: undefined,
      telegramBotToken: undefined,
      isActive: false,
    });
  });

export default app;
