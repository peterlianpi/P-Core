/**
 * Notifications Page - MVP Implementation
 *
 * Notifications management page using the Notifications MVP components
 */

import { Suspense } from 'react';
import { NotificationList, NotificationPreferences } from '@/features/notifications/mvp/components';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Bell, Settings } from 'lucide-react';

function NotificationsPageContent() {
  const handleNotificationClick = (notification: any) => {
    console.log('Notification clicked:', notification);
    // Handle navigation or actions based on notification type
  };

  const handlePreferencesSave = (preferences: any) => {
    console.log('Preferences saved:', preferences);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-2 text-sm text-gray-600">
            Stay updated with your latest activities and messages
          </p>
        </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <NotificationList
                  limit={50}
                  onNotificationClick={handleNotificationClick}
                />
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                    <CardDescription>
                      Your notification activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">24</p>
                        <p className="text-sm text-muted-foreground">This Week</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">5</p>
                        <p className="text-sm text-muted-foreground">Unread</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Categories</CardTitle>
                    <CardDescription>
                      Notification types
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System</span>
                      <span className="text-sm text-muted-foreground">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Account</span>
                      <span className="text-sm text-muted-foreground">8</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Social</span>
                      <span className="text-sm text-muted-foreground">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Promotional</span>
                      <span className="text-sm text-muted-foreground">1</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="max-w-2xl">
              <NotificationPreferences onSave={handlePreferencesSave} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <NotificationsPageContent />
    </Suspense>
  );
}

export const metadata = {
  title: 'Notifications - P-Core',
  description: 'View and manage your notifications',
};
