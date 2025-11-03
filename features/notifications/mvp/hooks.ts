/**
 * Notifications Management MVP Hooks
 * React Query hooks for notification operations
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdatePreferencesData } from './types';
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUserPreferences,
  updateUserPreferences,
  getUnreadCount,
  deleteNotification,
  getNotificationTemplates,
  getNotificationStatistics,
} from './api';

/**
 * Get user notifications
 */
export function useNotifications(limit: number = 20, offset: number = 0) {
  return useQuery({
    queryKey: ['notifications', 'list', limit, offset],
    queryFn: () => getUserNotifications(limit, offset),
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

/**
 * Get unread notification count
 */
export function useUnreadCount() {
  return useQuery({
    queryKey: ['notifications', 'unread-count'],
    queryFn: getUnreadCount,
    refetchInterval: 15000, // Refetch every 15 seconds
  });
}

/**
 * Mark notification as read
 */
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });
}

/**
 * Mark all notifications as read
 */
export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });
}

/**
 * Delete notification
 */
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['notifications', 'unread-count'] });
    },
  });
}

/**
 * Get user notification preferences
 */
export function useNotificationPreferences() {
  return useQuery({
    queryKey: ['notifications', 'preferences'],
    queryFn: getUserPreferences,
  });
}

/**
 * Update notification preferences
 */
export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePreferencesData) => updateUserPreferences(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications', 'preferences'] });
    },
  });
}

/**
 * Get notification templates (admin)
 */
export function useNotificationTemplates() {
  return useQuery({
    queryKey: ['notifications', 'templates'],
    queryFn: getNotificationTemplates,
  });
}

/**
 * Get notification statistics (admin)
 */
export function useNotificationStatistics() {
  return useQuery({
    queryKey: ['notifications', 'statistics'],
    queryFn: getNotificationStatistics,
  });
}