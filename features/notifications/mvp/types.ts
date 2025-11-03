/**
 * Notifications Management MVP Types
 *
 * Core type definitions for the minimum viable notifications implementation
 */

export interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  category: NotificationCategory;
  subject?: string;
  content: string;
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationDelivery {
  id: string;
  templateId: string;
  recipientId: string;
  recipientEmail?: string;
  status: DeliveryStatus;
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  channel: NotificationChannel;
  priority: NotificationPriority;
  metadata?: Record<string, any>;
}

export interface UserNotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  inAppNotifications: boolean;
  categories: Record<NotificationCategory, boolean>;
  frequency: NotificationFrequency;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface NotificationStatistics {
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  deliveryRate: number;
  byChannel: Record<NotificationChannel, {
    sent: number;
    delivered: number;
    failed: number;
    rate: number;
  }>;
}

export enum NotificationType {
  EMAIL = 'email',
  IN_APP = 'in_app'
}

export enum NotificationChannel {
  EMAIL = 'email',
  IN_APP = 'in_app'
}

export enum NotificationCategory {
  SYSTEM = 'system',
  ACCOUNT = 'account',
  SOCIAL = 'social',
  PROMOTIONAL = 'promotional'
}

export enum DeliveryStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed'
}

export enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum NotificationFrequency {
  IMMEDIATE = 'immediate',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  NEVER = 'never'
}

export interface SendNotificationData {
  templateId: string;
  recipientId: string;
  variables?: Record<string, string>;
  priority?: NotificationPriority;
}

export interface CreateTemplateData {
  name: string;
  type: NotificationType;
  category: NotificationCategory;
  subject?: string;
  content: string;
  variables: string[];
}

export interface UpdatePreferencesData {
  emailNotifications?: boolean;
  inAppNotifications?: boolean;
  categories?: Record<NotificationCategory, boolean>;
  frequency?: NotificationFrequency;
}
