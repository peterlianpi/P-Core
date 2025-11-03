/**
 * Notifications Management MVP API
 *
 * Core API functions for notification templates, delivery, and user preferences
 */

import {
  NotificationTemplate,
  NotificationItem,
  UserNotificationPreferences,
  SendNotificationData,
  UpdatePreferencesData,
  NotificationStatistics
} from './types';

const API_BASE = '/api/notifications';

/**
 * Send a notification using a template
 */
export async function sendNotification(data: SendNotificationData): Promise<{ success: boolean; deliveryId: string }> {
  const response = await fetch(`${API_BASE}/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send notification');
  }

  return response.json();
}

/**
 * Get user notifications
 */
export async function getUserNotifications(limit: number = 20, offset: number = 0): Promise<NotificationItem[]> {
  const response = await fetch(`${API_BASE}?limit=${limit}&offset=${offset}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get notifications');
  }

  return response.json();
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(notificationId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${notificationId}/read`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to mark notification as read');
  }
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead(): Promise<void> {
  const response = await fetch(`${API_BASE}/read-all`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to mark all notifications as read');
  }
}

/**
 * Get user notification preferences
 */
export async function getUserPreferences(): Promise<UserNotificationPreferences> {
  const response = await fetch(`${API_BASE}/preferences`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get preferences');
  }

  return response.json();
}

/**
 * Update user notification preferences
 */
export async function updateUserPreferences(data: UpdatePreferencesData): Promise<UserNotificationPreferences> {
  const response = await fetch(`${API_BASE}/preferences`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update preferences');
  }

  return response.json();
}

/**
 * Get notification statistics (admin only)
 */
export async function getNotificationStatistics(): Promise<NotificationStatistics> {
  const response = await fetch(`${API_BASE}/statistics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get statistics');
  }

  return response.json();
}

/**
 * Get unread notification count
 */
export async function getUnreadCount(): Promise<{ count: number }> {
  const response = await fetch(`${API_BASE}/unread-count`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get unread count');
  }

  return response.json();
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${notificationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete notification');
  }
}

/**
 * Get available notification templates
 */
export async function getNotificationTemplates(): Promise<NotificationTemplate[]> {
  const response = await fetch(`${API_BASE}/templates`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get templates');
  }

  return response.json();
}

/**
 * Validate notification template variables
 */
export function validateTemplateVariables(content: string, variables: string[]): { isValid: boolean; missing: string[] } {
  const variableRegex = /\{\{(\w+)\}\}/g;
  const foundVariables = new Set<string>();
  let match;

  while ((match = variableRegex.exec(content)) !== null) {
    foundVariables.add(match[1]);
  }

  const requiredVariables = new Set(variables);
  const missing = Array.from(requiredVariables).filter(v => !foundVariables.has(v));

  return {
    isValid: missing.length === 0,
    missing,
  };
}

/**
 * Format notification content with variables
 */
export function formatNotificationContent(content: string, variables: Record<string, string>): string {
  let formatted = content;
  Object.entries(variables).forEach(([key, value]) => {
    formatted = formatted.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), value);
  });
  return formatted;
}

/**
 * Check if user should receive notification based on preferences
 */
export function shouldSendNotification(
  preferences: UserNotificationPreferences,
  category: string,
  channel: string
): boolean {
  // Check if notifications are enabled for this channel
  if (channel === 'email' && !preferences.emailNotifications) return false;
  if (channel === 'in_app' && !preferences.inAppNotifications) return false;

  // Check category preferences
  if (!preferences.categories[category as keyof typeof preferences.categories]) return false;

  // Check frequency (simplified - in real implementation would check timing)
  if (preferences.frequency === 'never') return false;

  return true;
}
