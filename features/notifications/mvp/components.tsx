/**
 * Notifications Management MVP Components
 *
 * Core React components for notifications using shadcn/ui
 */

'use client';

import React, { useState, useEffect } from 'react';
import type {
  NotificationItem as NotificationItemType,
  UserNotificationPreferences,
  NotificationCategory,
  NotificationFrequency,
  UpdatePreferencesData
} from './types';
import {
  useNotifications,
  useMarkAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
  useUnreadCount
} from './hooks';
import type { NotificationItem } from './types';

// shadcn/ui components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  Mail,
  MessageSquare,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface NotificationListProps {
  limit?: number;
  offset?: number;
  onNotificationClick?: (notification: NotificationItemType) => void;
}

export function NotificationList({ limit = 20, offset = 0, onNotificationClick }: NotificationListProps) {
  const { data: notifications = [], isLoading, error } = useNotifications(limit, offset);
  const markAsReadMutation = useMarkAsRead();
  const markAllAsReadMutation = useMarkAllAsRead();
  const deleteMutation = useDeleteNotification();

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsReadMutation.mutateAsync(notificationId);
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync();
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteMutation.mutateAsync(notificationId);
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading notifications...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>{error.message || 'Failed to load notifications'}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {notifications.filter(n => !n.isRead).length > 0 && (
              <Badge variant="secondary">
                {notifications.filter(n => !n.isRead).length}
              </Badge>
            )}
          </CardTitle>
          {notifications.some(n => !n.isRead) && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <BellOff className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                  onClick={onNotificationClick}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface NotificationItemProps {
  notification: NotificationItemType;
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
  onClick?: (notification: NotificationItemType) => void;
}

function NotificationItem({ notification, onMarkAsRead, onDelete, onClick }: NotificationItemProps) {
  const handleClick = () => {
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    if (onClick) {
      onClick(notification);
    }
  };

  return (
    <div
      className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
        !notification.isRead ? 'bg-muted/30 border-primary/20' : 'bg-background'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{notification.title}</p>
            {!notification.isRead && (
              <div className="w-2 h-2 bg-primary rounded-full" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {notification.category}
            </Badge>
            <span>{new Date(notification.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 ml-2">
          {!notification.isRead && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead?.(notification.id);
              }}
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(notification.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface NotificationPreferencesProps {
  onSave?: (preferences: UserNotificationPreferences) => void;
}

export function NotificationPreferences({ onSave }: NotificationPreferencesProps) {
  // Placeholder implementation - preferences not implemented yet
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Notification preferences will be available soon
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Preferences coming soon...</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface NotificationBadgeProps {
  children: React.ReactNode;
  pollInterval?: number; // in milliseconds
}

export function NotificationBadge({ children, pollInterval = 30000 }: NotificationBadgeProps) {
  const { data: unreadCountData } = useUnreadCount(pollInterval);
  const unreadCount = unreadCountData?.count || 0;

  return (
    <div className="relative">
      {children}
      {unreadCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </div>
  );
}
