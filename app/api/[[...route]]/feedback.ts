import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { feedbackSchema, feedbackUpdateSchema } from "@/lib/schemas";
import { handleError } from "@/lib/error-handler";
import { 
  organizationSecurityMiddleware, 
  getOrganizationContext,
  requirePermission 
} from "@/lib/security/tenant";
import { cors } from "hono/cors";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

// Updated query schema for pagination and filtering
const querySchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('20'),
  status: z.enum(["PENDING", "REVIEWED", "RESOLVED"]).optional(),
  anonymous: z.string().transform(val => val === 'true').optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
});

// 🔹 Load Telegram Bot Info
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

// ✅ Utility function to send messages to Telegram
async function sendToTelegram(message: string): Promise<void> {
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
  // Apply CORS first
  .use("*", cors({ origin: "*" }))
  
  // Apply security middleware
  .use("*", organizationSecurityMiddleware)

  // ✅ Create Feedback (Save to DB + Send to Telegram)
  .post(
    "/", 
    zValidator("json", feedbackSchema), 
    requirePermission("create:feedback"),
    async (c) => {
      try {
        const data = c.req.valid("json");
        const { organizationId } = getOrganizationContext(c);

        // Save feedback to database
        // TODO: Implement when feedback model is added to schema
        const feedback = {
          id: "temp_" + Date.now(),
          ...data,
          status: "PENDING",
          orgId: organizationId,
          createdAt: new Date(),
          updatedAt: new Date()
        };

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
          feedback,
        }, 201);
      } catch (error) {
        return handleError(c, error, 500, 'FEEDBACK_CREATION_ERROR');
      }
    }
  )

  // ✅ Get All Feedbacks with filtering and pagination
  .get(
    "/", 
    zValidator("query", querySchema),
    requirePermission("read:feedback"),
    async (c) => {
      try {
        const { page, limit, status, anonymous, fromDate, toDate } = c.req.valid("query");
        const skip = (page - 1) * limit;
        const { organizationId } = getOrganizationContext(c);

        // TODO: Implement when feedback model is added to schema
        // Mock data for now
        const feedbacks = [
          {
            id: "mock_1",
            name: "John Doe",
            email: "john@example.com",
            message: "Great application!",
            status: "PENDING",
            anonymous: false,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];
        const total = 1;

        return c.json({
          feedbacks,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        });
      } catch (error) {
        return handleError(c, error, 500, 'FEEDBACK_FETCH_ERROR');
      }
    }
  )

  // ✅ Get Single Feedback by ID
  .get(
    "/:id", 
    requirePermission("read:feedback"),
    async (c) => {
      try {
        const id = c.req.param("id");
        const { organizationId } = getOrganizationContext(c);

        // TODO: Implement when feedback model is added to schema
        const feedbackItem = {
          id,
          name: "John Doe",
          email: "john@example.com",
          message: "Mock feedback",
          status: "PENDING",
          anonymous: false,
          orgId: organizationId,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        return c.json(feedbackItem);
      } catch (error) {
        return handleError(c, error, 500, 'FEEDBACK_FETCH_ERROR');
      }
    }
  )

  // ✅ Update Feedback Status
  .patch(
    "/:id", 
    zValidator("json", feedbackUpdateSchema), 
    requirePermission("update:feedback"),
    async (c) => {
      try {
        const id = c.req.param("id");
        const { status } = c.req.valid("json");
        const { organizationId } = getOrganizationContext(c);

        // TODO: Implement when feedback model is added to schema
        const updatedFeedback = {
          id,
          name: "John Doe",
          email: "john@example.com",
          message: "Mock feedback",
          status: status || "PENDING",
          anonymous: false,
          orgId: organizationId,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        return c.json({ success: true, feedback: updatedFeedback });
      } catch (error) {
        return handleError(c, error, 500, 'FEEDBACK_UPDATE_ERROR');
      }
    }
  )

  // ✅ Delete Feedback by ID
  .delete(
    "/:id", 
    requirePermission("delete:feedback"),
    async (c) => {
      try {
        const id = c.req.param("id");
        const { organizationId } = getOrganizationContext(c);

        // TODO: Implement when feedback model is added to schema
        // Mock successful deletion
        return c.json({
          success: true,
          message: "Feedback deleted successfully",
        });
      } catch (error) {
        return handleError(c, error, 500, 'FEEDBACK_DELETION_ERROR');
      }
    }
  );

export default feedback;
