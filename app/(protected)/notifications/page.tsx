/**
 * Notifications Page - MVP Implementation
 *
 * Notifications management page using the Notifications MVP components
 */

'use client';

import { Suspense, useState, useEffect } from 'react';
import { NotificationList, NotificationPreferences } from '@/features/notifications/mvp/components';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Bell, Settings, Activity, TrendingUp, Users, AlertTriangle, Info, CheckCircle, BarChart3 } from 'lucide-react';

function NotificationsPageContent() {
  const [stats, setStats] = useState({
    thisWeek: 0,
    unread: 0,
    total: 0,
    categories: {
      system: 0,
      account: 0,
      social: 0,
      promotional: 0
    }
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoadingStats(true);
      // Mock stats - in real app, this would come from API
      setStats({
        thisWeek: 24,
        unread: 5,
        total: 156,
        categories: {
          system: 12,
          account: 8,
          social: 3,
          promotional: 1
        }
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleNotificationClick = (notification: any) => {
    console.log('Notification clicked:', notification);
    // Handle navigation or actions based on notification type
  };

  const handlePreferencesSave = (preferences: any) => {
    console.log('Preferences saved:', preferences);
  };

  const StatCard = ({ title, value, description, icon: Icon, color = "default" }: {
    title: string;
    value: string | number;
    description: string;
    icon: any;
    color?: "default" | "success" | "warning" | "destructive";
  }) => {
    const colorClasses = {
      default: "text-primary",
      success: "text-green-600 dark:text-green-400",
      warning: "text-yellow-600 dark:text-yellow-400",
      destructive: "text-red-600 dark:text-red-400"
    };

    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
            <Icon className={`h-8 w-8 ${colorClasses[color]} opacity-75`} />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background py-4">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 w-full">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
              <p className="text-muted-foreground">
                Stay updated with your latest activities and messages
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="This Week"
            value={isLoadingStats ? "..." : stats.thisWeek}
            description="New notifications"
            icon={Activity}
            color="default"
          />
          <StatCard
            title="Unread"
            value={isLoadingStats ? "..." : stats.unread}
            description="Pending review"
            icon={AlertTriangle}
            color="warning"
          />
          <StatCard
            title="Total"
            value={isLoadingStats ? "..." : stats.total}
            description="All time"
            icon={BarChart3}
            color="success"
          />
          <StatCard
            title="Read Rate"
            value={isLoadingStats ? "..." : `${Math.round(((stats.total - stats.unread) / stats.total) * 100)}%`}
            description="Engagement"
            icon={TrendingUp}
            color="success"
          />
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
                {/* Recent Activity Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Activity className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      Your notification activity overview
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Read today</span>
                        </div>
                        <Badge variant="secondary">{stats.total - stats.unread}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">Unread</span>
                        </div>
                        <Badge variant="outline">{stats.unread}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">This week</span>
                        </div>
                        <Badge variant="secondary">{stats.thisWeek}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Categories Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BarChart3 className="h-5 w-5" />
                      Categories
                    </CardTitle>
                    <CardDescription>
                      Breakdown by notification type
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(stats.categories).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-sm capitalize">{category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${(count / Math.max(...Object.values(stats.categories))) * 100}%`
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-muted-foreground w-8 text-right">
                            {count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                    <CardDescription>
                      Manage your notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark all as read
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Notification settings
                    </Button>
                    <Separator />
                    <div className="text-xs text-muted-foreground text-center">
                      Last updated: {new Date().toLocaleTimeString()}
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
