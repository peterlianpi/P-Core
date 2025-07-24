"use server"

import { prisma } from "@/lib/db/client"
import { z } from "zod"
import { auth } from "@/auth"
import { UserRole, NotificationType, NotificationPriority, LogLevel } from "@prisma/client"

// Notification validation schemas
export const CreateNotificationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  type: z.nativeEnum(NotificationType).default(NotificationType.INFO),
  priority: z.nativeEnum(NotificationPriority).default(NotificationPriority.MEDIUM),
  userId: z.string().optional(), // If not provided, it's a system-wide notification
  organizationId: z.string().optional(),
  actionUrl: z.string().url().optional(),
  expiresAt: z.date().optional(),
  metadata: z.record(z.any()).optional(),
})

export const UpdateNotificationSchema = z.object({
  id: z.string(),
  isRead: z.boolean().optional(),
  isArchived: z.boolean().optional(),
})

export const CreateLogSchema = z.object({
  level: z.nativeEnum(LogLevel).default(LogLevel.INFO),
  action: z.string().min(1, "Action is required"),
  description: z.string().min(1, "Description is required"),
  userId: z.string().optional(),
  organizationId: z.string().optional(),
  resourceType: z.string().optional(),
  resourceId: z.string().optional(),
  metadata: z.record(z.any()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
})

// Create notification
export async function createNotification(values: z.infer<typeof CreateNotificationSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const validatedFields = CreateNotificationSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields", details: validatedFields.error.flatten() }
    }

    const { title, message, type, priority, userId, organizationId, actionUrl, expiresAt, metadata } = validatedFields.data

    // Only SUPERADMIN and ADMIN can create system-wide notifications
    if (!userId && session.user.role !== UserRole.SUPERADMIN && session.user.role !== UserRole.ADMIN) {
      return { error: "Access denied. Only administrators can create system-wide notifications." }
    }

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type,
        priority,
        userId,
        organizationId,
        actionUrl,
        expiresAt,
        metadata,
        createdById: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        createdBy: {
          select: {
            id: true,
            name: true,
            role: true,
          }
        }
      }
    })

    // Log the notification creation
    await createActivityLog({
      level: LogLevel.INFO,
      action: "NOTIFICATION_CREATED",
      description: `Created notification: ${title}`,
      userId: session.user.id,
      organizationId,
      resourceType: "notification",
      resourceId: notification.id,
      metadata: { type, priority, targetUserId: userId },
    })

    return { success: "Notification created successfully", notification }
  } catch (error) {
    console.error("Error creating notification:", error)
    return { error: "Failed to create notification" }
  }
}

// Get notifications for user (with pagination and filters)
export async function getUserNotifications(
  page: number = 1,
  limit: number = 10,
  filters: {
    isRead?: boolean,
    isArchived?: boolean,
    type?: NotificationType,
    priority?: NotificationPriority,
  } = {}
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const skip = (page - 1) * limit

    const where: any = {
      OR: [
        { userId: session.user.id }, // Personal notifications
        { userId: null }, // System-wide notifications
      ],
      AND: [
        { expiresAt: { gte: new Date() } }, // Not expired
        { isArchived: false }, // Not archived by system
      ]
    }

    // Apply filters
    if (filters.isRead !== undefined) where.isRead = filters.isRead
    if (filters.isArchived !== undefined) where.isArchived = filters.isArchived
    if (filters.type) where.type = filters.type
    if (filters.priority) where.priority = filters.priority

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              role: true,
            }
          }
        },
        skip,
        take: limit,
        orderBy: [
          { priority: "desc" },
          { createdAt: "desc" }
        ],
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: {
          OR: [
            { userId: session.user.id },
            { userId: null },
          ],
          isRead: false,
          isArchived: false,
          expiresAt: { gte: new Date() },
        }
      })
    ])

    return {
      success: "Notifications retrieved successfully",
      notifications,
      unreadCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error("Error getting notifications:", error)
    return { error: "Failed to get notifications" }
  }
}

// Mark notification as read/unread
export async function updateNotification(values: z.infer<typeof UpdateNotificationSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const validatedFields = UpdateNotificationSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { id, isRead, isArchived } = validatedFields.data

    // Check if notification exists and user has access
    const notification = await prisma.notification.findFirst({
      where: {
        id,
        OR: [
          { userId: session.user.id },
          { userId: null }, // System-wide notifications
        ]
      }
    })

    if (!notification) {
      return { error: "Notification not found or access denied" }
    }

    const updateData: any = {}
    if (isRead !== undefined) updateData.isRead = isRead
    if (isArchived !== undefined) updateData.isArchived = isArchived

    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: updateData,
    })

    // Log the action
    if (isRead !== undefined) {
      await createActivityLog({
        level: LogLevel.INFO,
        action: isRead ? "NOTIFICATION_READ" : "NOTIFICATION_UNREAD",
        description: `Marked notification as ${isRead ? 'read' : 'unread'}: ${notification.title}`,
        userId: session.user.id,
        resourceType: "notification",
        resourceId: id,
      })
    }

    return { success: "Notification updated successfully", notification: updatedNotification }
  } catch (error) {
    console.error("Error updating notification:", error)
    return { error: "Failed to update notification" }
  }
}

// Create activity log entry
export async function createActivityLog(values: z.infer<typeof CreateLogSchema>) {
  try {
    const validatedFields = CreateLogSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields", details: validatedFields.error.flatten() }
    }

    const { level, action, description, userId, organizationId, resourceType, resourceId, metadata, ipAddress, userAgent } = validatedFields.data

    const log = await prisma.activityLog.create({
      data: {
        level,
        action,
        description,
        userId,
        organizationId,
        resourceType,
        resourceId,
        metadata,
        ipAddress,
        userAgent,
        timestamp: new Date(),
      },
    })

    return { success: "Activity logged successfully", log }
  } catch (error) {
    console.error("Error creating activity log:", error)
    return { error: "Failed to create activity log" }
  }
}

// Get activity logs (SUPERADMIN only)
export async function getActivityLogs(
  page: number = 1,
  limit: number = 20,
  filters: {
    level?: LogLevel,
    action?: string,
    userId?: string,
    organizationId?: string,
    resourceType?: string,
    startDate?: Date,
    endDate?: Date,
  } = {}
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    // Only SUPERADMIN can view all logs, others can only view their own
    const canViewAllLogs = session.user.role === UserRole.SUPERADMIN

    const skip = (page - 1) * limit

    const where: any = {}

    if (!canViewAllLogs) {
      where.userId = session.user.id
    } else {
      // Apply admin filters
      if (filters.level) where.level = filters.level
      if (filters.action) where.action = { contains: filters.action, mode: "insensitive" }
      if (filters.userId) where.userId = filters.userId
      if (filters.organizationId) where.organizationId = filters.organizationId
      if (filters.resourceType) where.resourceType = filters.resourceType
      
      if (filters.startDate || filters.endDate) {
        where.timestamp = {}
        if (filters.startDate) where.timestamp.gte = filters.startDate
        if (filters.endDate) where.timestamp.lte = filters.endDate
      }
    }

    const [logs, total] = await Promise.all([
      prisma.activityLog.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            }
          }
        },
        skip,
        take: limit,
        orderBy: { timestamp: "desc" },
      }),
      prisma.activityLog.count({ where }),
    ])

    return {
      success: "Activity logs retrieved successfully",
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error("Error getting activity logs:", error)
    return { error: "Failed to get activity logs" }
  }
}

// Get system statistics (SUPERADMIN only)
export async function getSystemStatistics() {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    if (session.user.role !== UserRole.SUPERADMIN) {
      return { error: "Access denied. Only superadmin can view system statistics." }
    }

    const now = new Date()
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const [
      totalNotifications,
      unreadNotifications,
      totalLogs,
      errorLogs,
      warningLogs,
      recentActivity,
      criticalNotifications,
      notificationsLast24h,
      logsLast24h,
    ] = await Promise.all([
      prisma.notification.count(),
      prisma.notification.count({ where: { isRead: false, isArchived: false } }),
      prisma.activityLog.count(),
      prisma.activityLog.count({ where: { level: LogLevel.ERROR } }),
      prisma.activityLog.count({ where: { level: LogLevel.WARNING } }),
      prisma.activityLog.count({ where: { timestamp: { gte: last24Hours } } }),
      prisma.notification.count({ where: { priority: NotificationPriority.HIGH } }),
      prisma.notification.count({ where: { createdAt: { gte: last24Hours } } }),
      prisma.activityLog.count({ where: { timestamp: { gte: last24Hours } } }),
    ])

    const stats = {
      notifications: {
        total: totalNotifications,
        unread: unreadNotifications,
        critical: criticalNotifications,
        last24Hours: notificationsLast24h,
      },
      logs: {
        total: totalLogs,
        errors: errorLogs,
        warnings: warningLogs,
        recentActivity,
        last24Hours: logsLast24h,
      },
      system: {
        uptime: process.uptime(),
        timestamp: now,
        healthStatus: errorLogs === 0 ? "healthy" : "warning",
      }
    }

    return { success: "System statistics retrieved successfully", stats }
  } catch (error) {
    console.error("Error getting system statistics:", error)
    return { error: "Failed to get system statistics" }
  }
}

// Send system-wide announcement (SUPERADMIN only)
export async function sendSystemAnnouncement(
  title: string,
  message: string,
  priority: NotificationPriority = NotificationPriority.MEDIUM,
  expiresInHours: number = 24
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    if (session.user.role !== UserRole.SUPERADMIN) {
      return { error: "Access denied. Only superadmin can send system announcements." }
    }

    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000)

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        type: NotificationType.ANNOUNCEMENT,
        priority,
        userId: null, // System-wide
        expiresAt,
        createdById: session.user.id,
        metadata: {
          isSystemAnnouncement: true,
          expiresInHours,
        }
      },
    })

    // Log the announcement
    await createActivityLog({
      level: LogLevel.INFO,
      action: "SYSTEM_ANNOUNCEMENT",
      description: `Sent system announcement: ${title}`,
      userId: session.user.id,
      resourceType: "notification",
      resourceId: notification.id,
      metadata: { priority, expiresInHours },
    })

    return { success: "System announcement sent successfully", notification }
  } catch (error) {
    console.error("Error sending system announcement:", error)
    return { error: "Failed to send system announcement" }
  }
}

// Mark all notifications as read for user
export async function markAllNotificationsAsRead() {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const result = await prisma.notification.updateMany({
      where: {
        OR: [
          { userId: session.user.id },
          { userId: null }, // System-wide notifications
        ],
        isRead: false,
        isArchived: false,
      },
      data: {
        isRead: true,
      },
    })

    // Log the action
    await createActivityLog({
      level: LogLevel.INFO,
      action: "NOTIFICATIONS_MARK_ALL_READ",
      description: `Marked ${result.count} notifications as read`,
      userId: session.user.id,
      metadata: { count: result.count },
    })

    return { success: `Marked ${result.count} notifications as read`, count: result.count }
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    return { error: "Failed to mark notifications as read" }
  }
}

// Clean up expired notifications (system maintenance)
export async function cleanupExpiredNotifications() {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    if (session.user.role !== UserRole.SUPERADMIN) {
      return { error: "Access denied. Only superadmin can perform system maintenance." }
    }

    const result = await prisma.notification.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    })

    // Log the cleanup
    await createActivityLog({
      level: LogLevel.INFO,
      action: "SYSTEM_CLEANUP",
      description: `Cleaned up ${result.count} expired notifications`,
      userId: session.user.id,
      metadata: { cleanupType: "expired_notifications", count: result.count },
    })

    return { success: `Cleaned up ${result.count} expired notifications`, count: result.count }
  } catch (error) {
    console.error("Error cleaning up notifications:", error)
    return { error: "Failed to cleanup notifications" }
  }
}