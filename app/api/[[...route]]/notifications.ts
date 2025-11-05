/**
 * Notifications API Routes - Hono Implementation
 * Handles notification CRUD operations with proper database queries
 */

import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { handleError } from "@/lib/error-handler";

// ============================================================================
// SCHEMAS
// ============================================================================

const getNotificationsSchema = z.object({
  limit: z.string().optional().transform(val => val ? parseInt(val) : 20),
  offset: z.string().optional().transform(val => val ? parseInt(val) : 0),
});

const markAsReadSchema = z.object({
  notificationId: z.string().min(1, "Notification ID is required"),
});

const notifications = new Hono();

// ============================================================================
// ROUTES
// ============================================================================

/**
 * GET /api/notifications
 * Get user notifications with pagination
 */
notifications.get(
  "/",
  zValidator("query", getNotificationsSchema),
  async (c) => {
    try {
      const user = await currentUser();
      if (!user || !user.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { limit, offset } = c.req.valid("query");

      // Get notifications where user is in recipients array or recipients contains 'all'
      const userNotifications = await db.notification.findMany({
        where: {
          OR: [
            {
              recipients: {
                contains: user.id
              }
            },
            {
              recipients: {
                contains: '"all"'
              }
            }
          ]
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: offset,
        take: limit,
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      });

      // Transform to match expected format
      const notifications = userNotifications.map(notification => {
        // Derive category from notification type or use default
        const getCategory = (type: string): string => {
          const typeLower = type.toLowerCase();
          switch (typeLower) {
            case 'info':
              return 'system';
            case 'warning':
              return 'alert';
            case 'error':
              return 'error';
            case 'success':
              return 'success';
            default:
              return 'system';
          }
        };

        return {
          id: notification.id,
          userId: user.id, // Add userId from current user
          title: notification.title,
          message: notification.message,
          type: notification.type.toLowerCase() as 'info' | 'warning' | 'success' | 'error',
          category: getCategory(notification.type), // Dynamic category based on type
          isRead: notification.isRead,
          createdAt: notification.createdAt.toISOString(),
          actionUrl: notification.actionUrl,
          metadata: notification.metadata ? JSON.parse(notification.metadata) : undefined
        };
      });

      return c.json(notifications);
    } catch (error) {
      return handleError(c, error, 500, 'DATABASE_ERROR');
    }
  }
);

/**
 * GET /api/notifications/unread-count
 * Get unread notification count for current user
 */
notifications.get("/unread-count", async (c) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const unreadCount = await db.notification.count({
      where: {
        AND: [
          {
            OR: [
              {
                recipients: {
                  contains: user.id
                }
              },
              {
                recipients: {
                  contains: '"all"'
                }
              }
            ]
          },
          {
            isRead: false
          }
        ]
      }
    });

    return c.json({ count: unreadCount });
  } catch (error) {
    return handleError(c, error, 500, 'DATABASE_ERROR');
  }
});

/**
 * PUT /api/notifications/:notificationId/read
 * Mark a specific notification as read
 */
notifications.put(
  "/:notificationId/read",
  zValidator("param", markAsReadSchema),
  async (c) => {
    try {
      const user = await currentUser();
      if (!user || !user.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { notificationId } = c.req.valid("param");

      // Check if notification belongs to user
      const notification = await db.notification.findFirst({
        where: {
          id: notificationId,
          OR: [
            {
              recipients: {
                contains: user.id
              }
            },
            {
              recipients: {
                contains: '"all"'
              }
            }
          ]
        }
      });

      if (!notification) {
        return c.json({ error: "Notification not found" }, 404);
      }

      // Mark as read
      const updatedNotification = await db.notification.update({
        where: { id: notificationId },
        data: {
          isRead: true,
          readAt: new Date()
        }
      });

      return c.json({
        id: updatedNotification.id,
        isRead: updatedNotification.isRead,
        readAt: updatedNotification.readAt
      });
    } catch (error) {
      return handleError(c, error, 500, 'UPDATE_ERROR');
    }
  }
);

/**
 * PUT /api/notifications/read-all
 * Mark all notifications as read for current user
 */
notifications.put("/read-all", async (c) => {
  try {
    const user = await currentUser();
    if (!user || !user.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Update all unread notifications for this user
    const result = await db.notification.updateMany({
      where: {
        AND: [
          {
            OR: [
              {
                recipients: {
                  contains: user.id
                }
              },
              {
                recipients: {
                  contains: '"all"'
                }
              }
            ]
          },
          {
            isRead: false
          }
        ]
      },
      data: {
        isRead: true,
        readAt: new Date()
      }
    });

    return c.json({ updatedCount: result.count });
  } catch (error) {
    return handleError(c, error, 500, 'UPDATE_ERROR');
  }
});

/**
 * DELETE /api/notifications/:notificationId
 * Delete a specific notification
 */
notifications.delete(
  "/:notificationId",
  zValidator("param", markAsReadSchema),
  async (c) => {
    try {
      const user = await currentUser();
      if (!user || !user.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { notificationId } = c.req.valid("param");

      // Check if notification belongs to user (only allow deleting user's own notifications)
      const notification = await db.notification.findFirst({
        where: {
          id: notificationId,
          senderId: user.id // Only sender can delete
        }
      });

      if (!notification) {
        return c.json({ error: "Notification not found or access denied" }, 404);
      }

      await db.notification.delete({
        where: { id: notificationId }
      });

      return c.json({ success: true });
    } catch (error) {
      return handleError(c, error, 500, 'DELETION_ERROR');
    }
  }
);

/**
 * POST /api/notifications/bulk-delete
 * Bulk delete notifications
 */
notifications.post(
  "/bulk-delete",
  zValidator(
    "json",
    z.object({
      notificationIds: z.array(z.string()).min(1, "At least one notification ID is required")
    })
  ),
  async (c) => {
    try {
      const user = await currentUser();
      if (!user || !user.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { notificationIds } = c.req.valid("json");

      // Delete only notifications sent by this user
      const result = await db.notification.deleteMany({
        where: {
          id: {
            in: notificationIds
          },
          senderId: user.id
        }
      });

      return c.json({ deletedCount: result.count });
    } catch (error) {
      return handleError(c, error, 500, 'DELETION_ERROR');
    }
  }
);

/**
 * POST /api/notifications/bulk-read
 * Bulk mark notifications as read
 */
notifications.post(
  "/bulk-read",
  zValidator(
    "json",
    z.object({
      notificationIds: z.array(z.string()).min(1, "At least one notification ID is required")
    })
  ),
  async (c) => {
    try {
      const user = await currentUser();
      if (!user || !user.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { notificationIds } = c.req.valid("json");

      // Update only notifications that belong to this user
      const result = await db.notification.updateMany({
        where: {
          id: {
            in: notificationIds
          },
          OR: [
            {
              recipients: {
                contains: user.id
              }
            },
            {
              recipients: {
                contains: '"all"'
              }
            }
          ]
        },
        data: {
          isRead: true,
          readAt: new Date()
        }
      });

      return c.json({ updatedCount: result.count });
    } catch (error) {
      return handleError(c, error, 500, 'UPDATE_ERROR');
    }
  }
);

export default notifications;
