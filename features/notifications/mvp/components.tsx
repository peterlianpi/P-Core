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
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUserPreferences,
  updateUserPreferences,
  getUnreadCount,
  deleteNotification
} from './api';

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
  onNotificationClick?: (notification: NotificationItemType) => void;
}

export function NotificationList({ limit = 20, onNotificationClick }: NotificationListProps) {
  const [notifications, setNotifications] = useState<NotificationItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserNotifications(limit);
      setNotifications(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
    }
  };

  const handleDelete = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
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
            <AlertDescription>{error}</AlertDescription>
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
  const [preferences, setPreferences] = useState<UserNotificationPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getUserPreferences();
      setPreferences(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!preferences) return;

    try {
      setIsSaving(true);
      setError(null);
      const updated = await updateUserPreferences(preferences);
      setPreferences(updated);
      onSave?.(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  const updatePreference = (key: keyof UserNotificationPreferences, value: any) => {
    if (!preferences) return;
    setPreferences({ ...preferences, [key]: value });
  };

  const updateCategory = (category: NotificationCategory, enabled: boolean) => {
    if (!preferences) return;
    setPreferences({
      ...preferences,
      categories: { ...preferences.categories, [category]: enabled }
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="ml-2">Loading preferences...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!preferences) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
        <CardDescription>
          Choose how you want to receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            <Switch
              id="email-notifications"
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => updatePreference('emailNotifications', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <Label htmlFor="in-app-notifications">In-App Notifications</Label>
            </div>
            <Switch
              id="in-app-notifications"
              checked={preferences.inAppNotifications}
              onCheckedChange={(checked) => updatePreference('inAppNotifications', checked)}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <Label className="text-base font-medium">Categories</Label>
          {Object.entries(preferences.categories).map(([category, enabled]) => (
            <div key={category} className="flex items-center justify-between">
              <Label htmlFor={`category-${category}`} className="capitalize">
                {category} Notifications
              </Label>
              <Switch
                id={`category-${category}`}
                checked={enabled}
                onCheckedChange={(checked) => updateCategory(category as NotificationCategory, checked)}
              />
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="frequency">Notification Frequency</Label>
          <Select
            value={preferences.frequency}
            onValueChange={(value) => updatePreference('frequency', value as NotificationFrequency)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="daily">Daily Digest</SelectItem>
              <SelectItem value="weekly">Weekly Digest</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </Button>
      </CardContent>
    </Card>
  );
}

interface NotificationBadgeProps {
  children: React.ReactNode;
}

export function NotificationBadge({ children }: NotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadUnreadCount();
    // Set up polling for unread count updates
    const interval = setInterval(loadUnreadCount, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadUnreadCount = async () => {
    try {
      const { count } = await getUnreadCount();
      setUnreadCount(count);
    } catch (err) {
      console.error('Failed to load unread count:', err);
    }
  };

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
