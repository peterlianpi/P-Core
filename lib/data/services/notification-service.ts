/**
 * NOTIFICATION SERVICE - Type-safe data access layer for notification operations
 *
 * This service provides all notification-related data operations with proper typing,
 * caching, and error handling.
 */

import { apiClient } from '@/lib/data/api-client';
import { DataValidator } from '@/lib/data/api-client';
import {
  Notification,
  NotificationTemplate,
  NotificationStats,
  ApiResponse,
  PaginatedResponse,
} from '@/lib/types/database';

// ============================================================================
// NOTIFICATION SERVICE CLASS
// ============================================================================

export class NotificationService {
  private static readonly BASE_ENDPOINT = 'notifications';

  // ============================================================================
  // NOTIFICATION CRUD OPERATIONS
  // ============================================================================

  /**
   * Get notifications with pagination
   */
  static async getNotifications(options: {
    page?: number;
    limit?: number;
    userId?: string;
    type?: string;
    isRead?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<PaginatedResponse<Notification>> {
    const {
      page = 1,
      limit = 10,
      userId,
      type,
      isRead,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = options;

    const params: Record<string, any> = {
      page,
      limit,
      sortBy,
      sortOrder,
    };

    if (userId) params.userId = userId;
    if (type) params.type = type;
    if (isRead !== undefined) params.isRead = isRead;

    return apiClient.getPaginated<Notification>(
      this.BASE_ENDPOINT,
      { params, useCache: true, cacheTtl: 1 * 60 * 1000 } // 1 minute cache
    );
  }

  /**
   * Get a single notification by ID
   */
  static async getNotificationById(notificationId: string): Promise<ApiResponse<Notification>> {
    return apiClient.get<Notification>(
      `${this.BASE_ENDPOINT}/${notificationId}`,
      { useCache: true, cacheTtl: 5 * 60 * 1000 } // 5 minutes cache
    );
  }

  /**
   * Create a new notification
   */
  static async createNotification(notificationData: {
    title: string;
    message: string;
    type: string;
    recipients: string[];
    actionUrl?: string;
    metadata?: Record<string, any>;
  }): Promise<ApiResponse<Notification>> {
    // Validate and sanitize input
    const sanitizedData = DataValidator.sanitizeObject(notificationData);

    if (!DataValidator.validateRequired(sanitizedData.title)) {
      return {
        success: false,
        error: 'Title is required',
        message: 'Please provide a notification title',
      };
    }

    if (!DataValidator.validateRequired(sanitizedData.message)) {
      return {
        success: false,
        error: 'Message is required',
        message: 'Please provide a notification message',
      };
    }

    if (!sanitizedData.recipients || sanitizedData.recipients.length === 0) {
      return {
        success: false,
        error: 'Recipients are required',
        message: 'Please specify notification recipients',
      };
    }

    return apiClient.post<Notification>(this.BASE_ENDPOINT, sanitizedData);
  }

  /**
   * Update a notification
   */
  static async updateNotification(
    notificationId: string,
    notificationData: Partial<{
      title: string;
      message: string;
      type: string;
      isRead: boolean;
      actionUrl: string;
      metadata: Record<string, any>;
    }>
  ): Promise<ApiResponse<Notification>> {
    const sanitizedData = DataValidator.sanitizeObject(notificationData);
    return apiClient.put<Notification>(`${this.BASE_ENDPOINT}/${notificationId}`, sanitizedData);
  }

  /**
   * Delete a notification
   */
  static async deleteNotification(notificationId: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.BASE_ENDPOINT}/${notificationId}`);
  }

  /**
   * Get user notifications with pagination
   */
  static async getUserNotifications(userId: string, limit: number = 20, offset: number = 0): Promise<PaginatedResponse<Notification>> {
    // TODO: Implement direct database query instead of API call
    // For now, return mock data to prevent infinite loop
    return {
      success: true,
      data: [],
      meta: {
        page: Math.floor(offset / limit) + 1,
        limit,
        total: 0,
        totalPages: 0,
      },
    };
  }

  /**
   * Get unread notification count for user
   */
  static async getUnreadCount(userId: string): Promise<ApiResponse<number>> {
    try {
      const result = await this.getNotifications({
        userId,
        isRead: false,
        limit: 1000, // Get all unread to count them
      });

      if (result.success && result.data) {
        return {
          success: true,
          data: result.data.length,
        };
      }

      return {
        success: false,
        error: result.error || 'Failed to get unread count',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to get unread count',
      };
    }
  }

  /**
   * Mark notification as read
   */
  static async markAsRead(notificationId: string): Promise<ApiResponse<Notification>> {
    return apiClient.put<Notification>(`${this.BASE_ENDPOINT}/${notificationId}/read`, {});
  }

  /**
   * Mark all notifications as read for user
   */
  static async markAllAsRead(userId: string): Promise<ApiResponse<number>> {
    try {
      // Get all unread notifications for the user
      const unreadResult = await this.getNotifications({
        userId,
        isRead: false,
        limit: 1000,
      });

      if (!unreadResult.success || !unreadResult.data) {
        return {
          success: false,
          error: unreadResult.error || 'Failed to get unread notifications',
        };
      }

      const unreadIds = unreadResult.data.map(n => n.id);

      if (unreadIds.length === 0) {
        return {
          success: true,
          data: 0,
        };
      }

      // Mark all as read
      const result = await this.markMultipleAsRead(unreadIds);

      if (result.success && result.data) {
        return {
          success: true,
          data: result.data.updatedCount,
        };
      }

      return {
        success: false,
        error: result.error || 'Failed to mark all as read',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to mark all notifications as read',
      };
    }
  }

  /**
   * Mark multiple notifications as read
   */
  static async markMultipleAsRead(notificationIds: string[]): Promise<ApiResponse<{ updatedCount: number }>> {
    return apiClient.post<{ updatedCount: number }>(
      `${this.BASE_ENDPOINT}/bulk-read`,
      { notificationIds }
    );
  }

  /**
   * Bulk delete notifications
   */
  static async bulkDeleteNotifications(notificationIds: string[]): Promise<ApiResponse<{ deletedCount: number }>> {
    return apiClient.post<{ deletedCount: number }>(
      `${this.BASE_ENDPOINT}/bulk-delete`,
      { notificationIds }
    );
  }

  // ============================================================================
  // NOTIFICATION TEMPLATES
  // ============================================================================

  /**
   * Get notification templates
   */
  static async getTemplates(options: {
    category?: string;
    isActive?: boolean;
  } = {}): Promise<ApiResponse<NotificationTemplate[]>> {
    const params: Record<string, any> = {};

    if (options.category) params.category = options.category;
    if (options.isActive !== undefined) params.isActive = options.isActive;

    return apiClient.get<NotificationTemplate[]>(
      `${this.BASE_ENDPOINT}/templates`,
      { params, useCache: true, cacheTtl: 10 * 60 * 1000 } // 10 minutes cache
    );
  }

  /**
   * Create notification template
   */
  static async createTemplate(templateData: {
    name: string;
    title: string;
    message: string;
    type: string;
    variables: string[];
    category: string;
  }): Promise<ApiResponse<NotificationTemplate>> {
    const sanitizedData = DataValidator.sanitizeObject(templateData);

    if (!DataValidator.validateRequired(sanitizedData.name)) {
      return {
        success: false,
        error: 'Template name is required',
        message: 'Please provide a template name',
      };
    }

    return apiClient.post<NotificationTemplate>(`${this.BASE_ENDPOINT}/templates`, sanitizedData);
  }

  /**
   * Update notification template
   */
  static async updateTemplate(
    templateId: string,
    templateData: Partial<NotificationTemplate>
  ): Promise<ApiResponse<NotificationTemplate>> {
    const sanitizedData = DataValidator.sanitizeObject(templateData);
    return apiClient.put<NotificationTemplate>(`${this.BASE_ENDPOINT}/templates/${templateId}`, sanitizedData);
  }

  /**
   * Delete notification template
   */
  static async deleteTemplate(templateId: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.BASE_ENDPOINT}/templates/${templateId}`);
  }

  // ============================================================================
  // NOTIFICATION STATISTICS & ANALYTICS
  // ============================================================================

  /**
   * Get notification statistics
   */
  static async getStats(options: {
    startDate?: Date;
    endDate?: Date;
    userId?: string;
  } = {}): Promise<ApiResponse<NotificationStats>> {
    const params: Record<string, any> = {};

    if (options.startDate) params.startDate = options.startDate.toISOString();
    if (options.endDate) params.endDate = options.endDate.toISOString();
    if (options.userId) params.userId = options.userId;

    return apiClient.get<NotificationStats>(
      `${this.BASE_ENDPOINT}/stats`,
      { params, useCache: true, cacheTtl: 15 * 60 * 1000 } // 15 minutes cache
    );
  }

  /**
   * Get notification delivery trends
   */
  static async getDeliveryTrends(options: {
    startDate?: Date;
    endDate?: Date;
    interval?: 'day' | 'week' | 'month';
  } = {}): Promise<ApiResponse<Array<{ date: string; sent: number; read: number }>>> {
    const params: Record<string, any> = {};

    if (options.startDate) params.startDate = options.startDate.toISOString();
    if (options.endDate) params.endDate = options.endDate.toISOString();
    if (options.interval) params.interval = options.interval;

    return apiClient.get<Array<{ date: string; sent: number; read: number }>>(
      `${this.BASE_ENDPOINT}/delivery-trends`,
      { params, useCache: true, cacheTtl: 30 * 60 * 1000 } // 30 minutes cache
    );
  }

  // ============================================================================
  // NOTIFICATION BROADCASTING
  // ============================================================================

  /**
   * Send notification to all users
   */
  static async broadcastToAll(notificationData: {
    title: string;
    message: string;
    type: string;
    actionUrl?: string;
    metadata?: Record<string, any>;
  }): Promise<ApiResponse<{ sentCount: number }>> {
    const sanitizedData = DataValidator.sanitizeObject(notificationData);
    return apiClient.post<{ sentCount: number }>(
      `${this.BASE_ENDPOINT}/broadcast`,
      { ...sanitizedData, recipients: ['all'] }
    );
  }

  /**
   * Send notification to specific users
   */
  static async sendToUsers(
    userIds: string[],
    notificationData: {
      title: string;
      message: string;
      type: string;
      actionUrl?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<ApiResponse<{ sentCount: number }>> {
    const sanitizedData = DataValidator.sanitizeObject(notificationData);
    return apiClient.post<{ sentCount: number }>(
      `${this.BASE_ENDPOINT}/send-to-users`,
      { ...sanitizedData, recipients: userIds }
    );
  }

  /**
   * Send notification by role
   */
  static async sendByRole(
    role: string,
    notificationData: {
      title: string;
      message: string;
      type: string;
      actionUrl?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<ApiResponse<{ sentCount: number }>> {
    const sanitizedData = DataValidator.sanitizeObject(notificationData);
    return apiClient.post<{ sentCount: number }>(
      `${this.BASE_ENDPOINT}/send-by-role`,
      { ...sanitizedData, role }
    );
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Validate notification data
   */
  static validateNotificationData(notificationData: Partial<Notification>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (notificationData.title && !DataValidator.validateLength(notificationData.title, 1, 200)) {
      errors.push('Title must be between 1 and 200 characters');
    }

    if (notificationData.message && !DataValidator.validateLength(notificationData.message, 1, 1000)) {
      errors.push('Message must be between 1 and 1000 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Sanitize notification data
   */
  static sanitizeNotificationData(notificationData: Partial<Notification>): Partial<Notification> {
    return DataValidator.sanitizeObject(notificationData);
  }

  /**
   * Clear notification-related cache
   */
  static clearCache(): void {
    apiClient.invalidateCache(this.BASE_ENDPOINT);
  }
}

// ============================================================================
// REACT HOOKS FOR NOTIFICATION OPERATIONS
// ============================================================================

import { useApi, UseApiState } from '@/lib/data/api-client';

/**
 * Hook for fetching notifications with pagination
 */
export function useNotifications(options: Parameters<typeof NotificationService.getNotifications>[0] = {}): UseApiState<PaginatedResponse<Notification>> {
  return useApi(() => NotificationService.getNotifications(options), [JSON.stringify(options)]) as any;
}

/**
 * Hook for fetching a single notification
 */
export function useNotification(notificationId: string): UseApiState<Notification> {
  return useApi(() => NotificationService.getNotificationById(notificationId), [notificationId]);
}

/**
 * Hook for notification templates
 */
export function useNotificationTemplates(options: Parameters<typeof NotificationService.getTemplates>[0] = {}): UseApiState<NotificationTemplate[]> {
  return useApi(() => NotificationService.getTemplates(options), [JSON.stringify(options)]);
}

/**
 * Hook for notification statistics
 */
export function useNotificationStats(options: Parameters<typeof NotificationService.getStats>[0] = {}): UseApiState<NotificationStats> {
  return useApi(() => NotificationService.getStats(options), [JSON.stringify(options)]);
}
