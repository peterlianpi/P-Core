"use client";

import React, { useState, useMemo } from "react";
import { EnhancedAdminLayout } from "@/components/admin-panel/enhanced-admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePicker } from "@/components/date-picker";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Calendar,
  Download,
  RefreshCw,
  Eye,
  MousePointer,
  Clock,
  Globe,
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const [startDate, setStartDate] = useState<Date | undefined>(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30); // Default to last 30 days
    return date;
  });
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());

  // Base analytics data for different time ranges
  const analyticsDataSets = {
    "7days": {
      overview: {
        totalUsers: 234,
        activeUsers: 189,
        pageViews: 3420,
        sessionDuration: "3m 45s",
        bounceRate: "28%",
        conversionRate: "4.1%",
      },
      userGrowth: [
        { month: "Day 1", users: 45 },
        { month: "Day 2", users: 52 },
        { month: "Day 3", users: 48 },
        { month: "Day 4", users: 61 },
        { month: "Day 5", users: 55 },
        { month: "Day 6", users: 67 },
        { month: "Day 7", users: 73 },
      ],
      topPages: [
        { page: "/dashboard", views: 720, unique: 612 },
        { page: "/users", views: 456, unique: 398 },
        { page: "/profile", views: 398, unique: 351 },
        { page: "/admin", views: 327, unique: 262 },
        { page: "/notifications", views: 209, unique: 185 },
      ],
      deviceStats: [
        { device: "Desktop", percentage: 68, count: 161 },
        { device: "Mobile", percentage: 25, count: 59 },
        { device: "Tablet", percentage: 7, count: 17 },
      ],
      geographicData: [
        { country: "United States", users: 89, percentage: 38 },
        { country: "United Kingdom", users: 42, percentage: 18 },
        { country: "Germany", users: 33, percentage: 14 },
        { country: "Canada", users: 28, percentage: 12 },
        { country: "Australia", users: 21, percentage: 9 },
      ],
    },
    "30days": {
      overview: {
        totalUsers: 1247,
        activeUsers: 892,
        pageViews: 15420,
        sessionDuration: "4m 32s",
        bounceRate: "32%",
        conversionRate: "3.2%",
      },
      userGrowth: [
        { month: "Week 1", users: 234 },
        { month: "Week 2", users: 289 },
        { month: "Week 3", users: 345 },
        { month: "Week 4", users: 379 },
      ],
      topPages: [
        { page: "/dashboard", views: 3420, unique: 2890 },
        { page: "/users", views: 2156, unique: 1890 },
        { page: "/profile", views: 1876, unique: 1654 },
        { page: "/admin", views: 1543, unique: 1234 },
        { page: "/notifications", views: 987, unique: 876 },
      ],
      deviceStats: [
        { device: "Desktop", percentage: 65, count: 812 },
        { device: "Mobile", percentage: 28, count: 349 },
        { device: "Tablet", percentage: 7, count: 87 },
      ],
      geographicData: [
        { country: "United States", users: 423, percentage: 34 },
        { country: "United Kingdom", users: 198, percentage: 16 },
        { country: "Germany", users: 156, percentage: 13 },
        { country: "Canada", users: 134, percentage: 11 },
        { country: "Australia", users: 98, percentage: 8 },
      ],
    },
    "90days": {
      overview: {
        totalUsers: 3456,
        activeUsers: 2341,
        pageViews: 45230,
        sessionDuration: "5m 12s",
        bounceRate: "35%",
        conversionRate: "2.8%",
      },
      userGrowth: [
        { month: "Month 1", users: 987 },
        { month: "Month 2", users: 1234 },
        { month: "Month 3", users: 1235 },
      ],
      topPages: [
        { page: "/dashboard", views: 10230, unique: 8670 },
        { page: "/users", views: 6432, unique: 5634 },
        { page: "/profile", views: 5628, unique: 4962 },
        { page: "/admin", views: 4629, unique: 3702 },
        { page: "/notifications", views: 2952, unique: 2628 },
      ],
      deviceStats: [
        { device: "Desktop", percentage: 62, count: 2145 },
        { device: "Mobile", percentage: 31, count: 1073 },
        { device: "Tablet", percentage: 7, count: 242 },
      ],
      geographicData: [
        { country: "United States", users: 1173, percentage: 34 },
        { country: "United Kingdom", users: 547, percentage: 16 },
        { country: "Germany", users: 429, percentage: 12 },
        { country: "Canada", users: 371, percentage: 11 },
        { country: "Australia", users: 271, percentage: 8 },
      ],
    },
    "1year": {
      overview: {
        totalUsers: 12456,
        activeUsers: 8234,
        pageViews: 156780,
        sessionDuration: "6m 28s",
        bounceRate: "38%",
        conversionRate: "2.1%",
      },
      userGrowth: [
        { month: "Q1", users: 2341 },
        { month: "Q2", users: 3456 },
        { month: "Q3", users: 3456 },
        { month: "Q4", users: 3203 },
      ],
      topPages: [
        { page: "/dashboard", views: 37420, unique: 31757 },
        { page: "/users", views: 23456, unique: 20567 },
        { page: "/profile", views: 20456, unique: 18012 },
        { page: "/admin", views: 16843, unique: 13472 },
        { page: "/notifications", views: 10789, unique: 9567 },
      ],
      deviceStats: [
        { device: "Desktop", percentage: 58, count: 7195 },
        { device: "Mobile", percentage: 35, count: 4341 },
        { device: "Tablet", percentage: 7, count: 869 },
      ],
      geographicData: [
        { country: "United States", users: 4234, percentage: 34 },
        { country: "United Kingdom", users: 1978, percentage: 16 },
        { country: "Germany", users: 1546, percentage: 12 },
        { country: "Canada", users: 1334, percentage: 11 },
        { country: "Australia", users: 978, percentage: 8 },
      ],
    },
  };

  // Calculate date range and determine which dataset to use
  const dateRange = useMemo(() => {
    if (!startDate || !endDate) return null;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [startDate, endDate]);

  // Get current analytics data based on date range
  const analyticsData = useMemo(() => {
    if (!dateRange) return analyticsDataSets["30days"]; // Default fallback

    if (dateRange <= 7) return analyticsDataSets["7days"];
    if (dateRange <= 30) return analyticsDataSets["30days"];
    if (dateRange <= 90) return analyticsDataSets["90days"];
    return analyticsDataSets["1year"];
  }, [dateRange]);

  // Calculate growth percentage based on date range
  const growthPercentage = useMemo(() => {
    if (!dateRange) return "+12% from last month";

    if (dateRange <= 7) return "+24% from last week";
    if (dateRange <= 30) return "+12% from last month";
    if (dateRange <= 90) return "+8% from last quarter";
    return "+156% from last year";
  }, [dateRange]);

  // Calculate active users growth
  const activeUsersGrowth = useMemo(() => {
    if (!dateRange) return "+8% from last month";

    if (dateRange <= 7) return "+18% from last week";
    if (dateRange <= 30) return "+8% from last month";
    if (dateRange <= 90) return "+15% from last quarter";
    return "+89% from last year";
  }, [dateRange]);

  // Calculate page views growth
  const pageViewsGrowth = useMemo(() => {
    if (!dateRange) return "+15% from last month";

    if (dateRange <= 7) return "+31% from last week";
    if (dateRange <= 30) return "+15% from last month";
    if (dateRange <= 90) return "+23% from last quarter";
    return "+142% from last year";
  }, [dateRange]);

  // Calculate session duration trend
  const sessionDurationTrend = useMemo(() => {
    if (!dateRange) return "-2% from last month";

    if (dateRange <= 7) return "+5% from last week";
    if (dateRange <= 30) return "-2% from last month";
    if (dateRange <= 90) return "+8% from last quarter";
    return "+12% from last year";
  }, [dateRange]);

  // Handle refresh functionality
  const handleRefresh = async () => {
    console.log('Starting refresh...');
    setIsRefreshing(true);
    console.log('isRefreshing set to true:', true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setLastRefreshTime(new Date());
      // In a real app, this would refetch data from the server
      console.log('Analytics data refreshed');
    } catch (error) {
      console.error('Failed to refresh analytics data:', error);
    } finally {
      console.log('Setting isRefreshing to false');
      setIsRefreshing(false);
    }
  };

  // Handle export functionality
  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Simulate export processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Prepare export data
      const exportData = {
        dateRange: dateRange ? `${dateRange} days` : 'Custom range',
        startDate: startDate?.toISOString().split('T')[0],
        endDate: endDate?.toISOString().split('T')[0],
        generatedAt: new Date().toISOString(),
        overview: analyticsData.overview,
        userGrowth: analyticsData.userGrowth,
        topPages: analyticsData.topPages,
        deviceStats: analyticsData.deviceStats,
        geographicData: analyticsData.geographicData,
        growthMetrics: {
          totalUsersGrowth: growthPercentage,
          activeUsersGrowth: activeUsersGrowth,
          pageViewsGrowth: pageViewsGrowth,
          sessionDurationTrend: sessionDurationTrend,
        },
      };

      // Create CSV content
      const csvContent = generateCSV(exportData);

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      const dateRangeStr = dateRange ? `${dateRange}days` : 'custom';
      link.setAttribute('download', `analytics-${dateRangeStr}-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Analytics data exported successfully');
    } catch (error) {
      console.error('Failed to export analytics data:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Generate CSV content from analytics data
  const generateCSV = (data: any): string => {
    const dateRangeStr = dateRange ? `${dateRange} days` : 'Custom range';
    const headers = [
      'Metric',
      'Value',
      'Date Range',
      'Generated At'
    ];

    const rows = [
      ['Date Range', dateRangeStr, '', new Date().toISOString()],
      ['Start Date', startDate?.toISOString().split('T')[0] || 'N/A', '', ''],
      ['End Date', endDate?.toISOString().split('T')[0] || 'N/A', '', ''],
      ['Generated At', new Date().toLocaleString(), '', ''],
      ['', '', '', ''],
      ['OVERVIEW METRICS', '', '', ''],
      ['Total Users', data.overview.totalUsers, dateRangeStr, ''],
      ['Active Users', data.overview.activeUsers, dateRangeStr, ''],
      ['Page Views', data.overview.pageViews, dateRangeStr, ''],
      ['Session Duration', data.overview.sessionDuration, dateRangeStr, ''],
      ['Bounce Rate', data.overview.bounceRate, dateRangeStr, ''],
      ['Conversion Rate', data.overview.conversionRate, dateRangeStr, ''],
      ['', '', '', ''],
      ['GROWTH METRICS', '', '', ''],
      ['Total Users Growth', data.growthMetrics.totalUsersGrowth, dateRangeStr, ''],
      ['Active Users Growth', data.growthMetrics.activeUsersGrowth, dateRangeStr, ''],
      ['Page Views Growth', data.growthMetrics.pageViewsGrowth, dateRangeStr, ''],
      ['Session Duration Trend', data.growthMetrics.sessionDurationTrend, dateRangeStr, ''],
      ['', '', '', ''],
      ['TOP PAGES', '', '', ''],
      ...data.topPages.map((page: any, index: number) => [
        `Page ${index + 1}`,
        page.page,
        `${page.views} views (${page.unique} unique)`,
        dateRangeStr
      ]),
      ['', '', '', ''],
      ['DEVICE STATISTICS', '', '', ''],
      ...data.deviceStats.map((device: any) => [
        device.device,
        `${device.percentage}% (${device.count} users)`,
        dateRangeStr,
        ''
      ]),
      ['', '', '', ''],
      ['GEOGRAPHIC DATA', '', '', ''],
      ...data.geographicData.map((country: any) => [
        country.country,
        `${country.users} users (${country.percentage}%)`,
        dateRangeStr,
        ''
      ]),
    ];

    // Convert to CSV format
    const csvRows = [
      headers.join(','),
      ...rows.map((row: any[]) => row.map((cell: any) => `"${cell}"`).join(','))
    ];

    return csvRows.join('\n');
  };

  return (
    <EnhancedAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Analytics</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Comprehensive insights into user behavior and system performance.
            </p>
          </div>
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
            {/* Date Range Picker */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
              <DatePicker
                value={startDate}
                onChange={setStartDate}
                placeholder="Start date"
              />
              <div className="flex items-center justify-center sm:hidden">
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">to</span>
              </div>
              <span className="text-sm text-muted-foreground hidden sm:inline">to</span>
              <DatePicker
                value={endDate}
                onChange={setEndDate}
                placeholder="End date"
              />
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="w-full  ">
                <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                <span className="sm:hidden">Refresh</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting} className="w-full  ">
                <Download className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Export'}</span>
                <span className="sm:hidden">Export</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalUsers.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                {growthPercentage}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.activeUsers.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                {activeUsersGrowth}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.pageViews.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                {pageViewsGrowth}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.sessionDuration}</div>
              <div className={`flex items-center text-xs ${sessionDurationTrend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {sessionDurationTrend.includes('+') ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {sessionDurationTrend}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="traffic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto p-1">
            <TabsTrigger value="traffic" className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2">Traffic</TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2">Users</TabsTrigger>
            <TabsTrigger value="content" className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2">Content</TabsTrigger>
            <TabsTrigger value="geography" className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2">Geography</TabsTrigger>
          </TabsList>

          <TabsContent value="traffic" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* User Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    User Growth Trend
                  </CardTitle>
                  <CardDescription>Monthly user acquisition over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Interactive growth chart</p>
                      <p className="text-sm font-medium text-green-600 mt-2">
                        +52% growth over 6 months
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Device Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Device Breakdown</CardTitle>
                  <CardDescription>User distribution by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.deviceStats.map((device) => (
                      <div key={device.device} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span className="text-sm font-medium">{device.device}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold">{device.percentage}%</div>
                          <div className="text-xs text-muted-foreground">{device.count} users</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages in your application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.topPages.map((page, index) => (
                    <div key={page.page} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">{page.page}</div>
                          <div className="text-sm text-muted-foreground">
                            {page.unique} unique visitors
                          </div>
                        </div>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <div className="font-bold">{page.views.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">views</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* User Engagement */}
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Key user interaction metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bounce Rate</span>
                    <Badge variant="outline">{analyticsData.overview.bounceRate}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Conversion Rate</span>
                    <Badge variant="outline">{analyticsData.overview.conversionRate}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Return Visitors</span>
                    <Badge variant="outline">68%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New vs Returning</span>
                    <Badge variant="outline">42% / 58%</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* User Activity Timeline */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>User Activity Timeline</CardTitle>
                  <CardDescription>Recent user activities and interactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "User login", user: "john.doe@example.com", time: "2 minutes ago", type: "auth" },
                      { action: "Profile updated", user: "jane.smith@example.com", time: "15 minutes ago", type: "profile" },
                      { action: "Team created", user: "admin@p-core.com", time: "1 hour ago", type: "team" },
                      { action: "Notification sent", user: "admin@p-core.com", time: "2 hours ago", type: "notification" },
                      { action: "User registered", user: "new.user@example.com", time: "3 hours ago", type: "auth" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.user}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Analytics for your application's content and features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">Dashboard</div>
                    <div className="text-sm text-muted-foreground">Most visited page</div>
                    <div className="text-lg font-semibold">3,420 views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">User Management</div>
                    <div className="text-sm text-muted-foreground">Second most used</div>
                    <div className="text-lg font-semibold">2,156 views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">Notifications</div>
                    <div className="text-sm text-muted-foreground">Growing feature</div>
                    <div className="text-lg font-semibold">987 views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">Profile</div>
                    <div className="text-sm text-muted-foreground">User settings</div>
                    <div className="text-lg font-semibold">1,876 views</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Geographic Distribution
                </CardTitle>
                <CardDescription>User distribution by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.geographicData.map((country) => (
                    <div key={country.country} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-6 bg-muted rounded flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {country.country.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium truncate">{country.country}</span>
                      </div>
                      <div className="flex items-center gap-4 flex-1 sm:flex-initial">
                        <div className="flex-1 sm:w-24 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${country.percentage}%` }}
                          />
                        </div>
                        <div className="text-right min-w-16 flex-shrink-0">
                          <div className="font-bold">{country.users.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">{country.percentage}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EnhancedAdminLayout>
  );
}
