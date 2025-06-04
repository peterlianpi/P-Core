import { Hono } from "hono";
import { db } from "@/lib/db"; // Prisma client
import { zValidator } from "@hono/zod-validator";
import { feedbackSchema, feedbackUpdateSchema } from "@/schemas";
import { authenticate } from "@/lib/api-auth";
import { cors } from "hono/cors";

cors({
  origin: (origin) => {
    if (
      ["https://ebyf-info.vercel.app", "http://localhost:3001"].includes(origin)
    ) {
      return origin;
    }
    return "https://ebyf-info.vercel.app"; // Default fallback
  },
  credentials: true,
});

// 🔹 Load Telegram Bot Info
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

// ✅ Utility function to send messages to Telegram
async function sendToTelegram(message: string) {
  try {
    await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
  }
}

const feedback = new Hono()

  .use("*", cors({ origin: "*" })) // 🔹 First

  // Apply API key authentication to all routes
  .use("*", authenticate)

  // ✅ Create Feedback (Save to DB + Send to Telegram)
  .post("/", zValidator("json", feedbackSchema), async (c) => {
    try {
      const data = c.req.valid("json");

      // Save feedback to database
      await db.feedback.create({ data });

      // Format message for Telegram
      const message = `
📩 *New Feedback Received*
${data.anonymous ? "🕵️‍♂️ Anonymous" : `👤 Name: ${data.name || "N/A"}`}  
📧 Email: ${data.email || "N/A"}  
📞 Phone: ${data.phone || "N/A"}  
📝 Message: ${data.message}
      `;

      // Send to Telegram
      await sendToTelegram(message);

      return c.json({
        success: true,
        message: "Feedback submitted successfully!",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      return c.json({ error: "Failed to submit feedback" }, 500);
    }
  })

  // ✅ Get All Feedbacks (Supports Pagination)
  .get("/", async (c) => {
    try {
      const page = Number(c.req.query("page")) || 1;
      const pageSize = 10;
      const skip = (page - 1) * pageSize;

      const feedbacks = await db.feedback.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      });

      return c.json(feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      return c.json({ error: "Failed to fetch feedback" }, 500);
    }
  })

  // ✅ Get Single Feedback by ID
  .get("/:id", async (c) => {
    try {
      const id = c.req.param("id");

      const feedbackItem = await db.feedback.findUnique({
        where: { id },
      });

      if (!feedbackItem) return c.json({ error: "Feedback not found" }, 404);

      return c.json(feedbackItem);
    } catch {
      return c.json({ error: "Failed to fetch feedback" }, 500);
    }
  })

  // ✅ Update Feedback (Only Status Update)
  .patch("/:id", zValidator("json", feedbackUpdateSchema), async (c) => {
    try {
      const id = c.req.param("id");
      const { status } = c.req.valid("json");

      const updatedFeedback = await db.feedback.update({
        where: { id },
        data: { status },
      });

      return c.json({ success: true, updatedFeedback });
    } catch {
      return c.json({ error: "Failed to update feedback" }, 500);
    }
  })

  // ✅ Delete Feedback by ID
  .delete("/:id", async (c) => {
    try {
      const id = c.req.param("id");

      await db.feedback.delete({ where: { id } });

      return c.json({
        success: true,
        message: "Feedback deleted successfully",
      });
    } catch {
      return c.json({ error: "Failed to delete feedback" }, 500);
    }
  });

export default feedback;
