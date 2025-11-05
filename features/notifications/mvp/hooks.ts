/**
 * Notifications React Query Hooks
 * Type-safe hooks for notification operations using React Query
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { NotificationItem } from './types';

export interface UnreadCountResponse {
  count: number;
}

export interface MarkAsReadResponse {
  id: string;
  isRead: boolean;
  readAt: Date | null;
}

export interface BulkOperationResponse {
  updatedCount: number;
}

export interface DeleteResponse {
  success: true;
}

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Hook for fetching user notifications
 */
export const useNotifications = (limit: number = 20, offset: number = 0) => {
  return useQuery({
    queryKey: ["notifications", { limit, offset }],
    queryFn: async (): Promise<NotificationItem[]> => {
      const response = await fetch(`/api/notifications?limit=${limit}&offset=${offset}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error || "Failed to fetch notifications"
        );
      }

      const data = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook for fetching unread notification count
 */
export const useUnreadCount = (staleTime: number = 30 * 1000) => {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: async (): Promise<UnreadCountResponse> => {
      const response = await fetch('/api/notifications/unread-count');

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error || "Failed to fetch unread count"
        );
      }

      const data = await response.json();
      return data;
    },
    staleTime,
  });
};

/**
 * Hook for marking a notification as read
 */
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string): Promise<MarkAsReadResponse> => {
      const response = await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PUT',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error || "Failed to mark notification as read"
        );
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch notifications and unread count
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

/**
 * Hook for marking all notifications as read
 */
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<BulkOperationResponse> => {
      const response = await fetch('/api/notifications/read-all', {
        method: 'PUT',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error || "Failed to mark all notifications as read"
        );
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch notifications and unread count
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

/**
 * Hook for deleting a notification
 */
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: string): Promise<DeleteResponse> => {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error || "Failed to delete notification"
        );
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

/**
 * Hook for bulk marking notifications as read
 */
export const useBulkMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationIds: string[]): Promise<BulkOperationResponse> => {
      const response = await fetch('/api/notifications/bulk-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationIds }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error || "Failed to bulk mark notifications as read"
        );
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch notifications and unread count
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

/**
 * Hook for bulk deleting notifications
 */
export const useBulkDeleteNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationIds: string[]): Promise<BulkOperationResponse> => {
      const response = await fetch('/api/notifications/bulk-delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationIds }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error || "Failed to bulk delete notifications"
        );
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch notifications
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};

// ============================================================================
// UTILITY TYPES
// ============================================================================

interface ErrorResponse {
  error: string;
  message?: string;
}
