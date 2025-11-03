/**
 * Notifications Management MVP Utilities
 * Helper functions for notification operations
 */

import type { NotificationCategory, NotificationType } from './types';

/**
 * Get notification icon based on category
 */
export function getNotificationIcon(category: NotificationCategory): string {
  const icons: Record<NotificationCategory, string> = {
    system: '⚙️',
    account: '👤',
    social: '👥',
    promotional: '🎉',
  };
  return icons[category] || '📬';
}

/**
 * Get notification color based on category
 */
export function getNotificationColor(category: NotificationCategory): string {
  const colors: Record<NotificationCategory, string> = {
    system: 'blue',
    account: 'green',
    social: 'purple',
    promotional: 'orange',
  };
  return colors[category] || 'gray';
}

/**
 * Format notification time
 */
export function formatNotificationTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  
  return new Date(date).toLocaleDateString();
}

/**
 * Truncate notification message
 */
export function truncateMessage(message: string, maxLength: number = 100): string {
  if (message.length <= maxLength) return message;
  return message.substring(0, maxLength) + '...';
}

/**
 * Get notification badge variant
 */
export function getNotificationBadgeVariant(category: NotificationCategory): 'default' | 'secondary' | 'destructive' | 'outline' {
  const variants: Record<NotificationCategory, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    system: 'default',
    account: 'secondary',
    social: 'outline',
    promotional: 'outline',
  };
  return variants[category] || 'default';
}