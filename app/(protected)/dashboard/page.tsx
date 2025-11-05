/**
 * Dashboard Page - MVP Implementation
 *
 * Comprehensive dashboard with data analysis for different user roles
 */

'use client';

import React, { Suspense } from 'react';
import { useCurrentUser } from '@/features/user-management/hooks';
import { useStudentStats } from '@/features/school-management';
import { useMemberStats } from '@/features/church-management';
import { useBookStats } from '@/features/library-management';
import { AnalyticsDashboard } from '@/components/charts/analytics-dashboard';
import { DataInsights } from '@/components/charts/data-insights';
import { PCoreSidebar } from '@/components/navigation/p-core-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Loader2,
  Users,
  Bell,
  TrendingUp,
  Activity,
  Shield,
  Settings,
  BarChart3,
  PieChart,
  Calendar,
  DollarSign,
  UserCheck,
  AlertTriangle,
  GraduationCap,
  Church,
  Library,
  BookOpen,
  User,
  Heart,
  CheckCircle,
  Clock,
  Cake
} from 'lucide-react';

function DashboardPageContent() {
  const { data: user, isLoading } = useCurrentUser();
  const { data: studentStats } = useStudentStats();
  const { data: memberStats } = useMemberStats();
  const { data: bookStats } = useBookStats();
  const [activeTab, setActiveTab] = React.useState("overview");

  // Mock current organization - in real app this would come from context
  const currentOrganization = {
    id: 'school-1',
    name: 'Springfield High School',
    type: 'school' as 'school' | 'church' | 'library' | 'general',
    subdomain: 'springfield',
    settings: {
      theme: {
        primaryColor: '#3b82f6',
        logo: '/logo-school.png',
        favicon: '/favicon-school.ico'
      },
      features: {
        schoolManagement: true,
        churchManagement: false,
        libraryManagement: false
      },
      branding: {
        siteName: 'Springfield High School',
        tagline: 'Excellence in Education',
        description: 'Leading educational institution committed to student success'
      }
    }
  };

  // Organization-specific data and metrics
  const getOrganizationMetrics = () => {
    switch (currentOrganization.type) {
      case 'school':
        return {
          primaryMetric: { label: 'Total Students', value: studentStats?.total || 0, change: '+12%' },
          secondaryMetric: { label: 'Active Students', value: studentStats?.active || 0, change: '+8%' },
          tertiaryMetric: { label: 'Courses Offered', value: 24, change: '+3' },
          performanceIndicators: [
            { label: 'Average GPA', value: '3.7', trend: 'up', color: 'green' },
            { label: 'Attendance Rate', value: '94%', trend: 'up', color: 'green' },
            { label: 'Graduation Rate', value: '96%', trend: 'stable', color: 'blue' }
          ],
          recentActivities: [
            { type: 'enrollment', message: 'New student enrolled: John Doe - Grade 10', time: '2 hours ago' },
            { type: 'course', message: 'Advanced Calculus course completed by 28 students', time: '4 hours ago' },
            { type: 'achievement', message: 'Science Fair winners announced', time: '1 day ago' }
          ]
        };
      case 'church':
        return {
          primaryMetric: { label: 'Total Members', value: memberStats?.total || 0, change: '+15%' },
          secondaryMetric: { label: 'Active Members', value: memberStats?.active || 0, change: '+10%' },
          tertiaryMetric: { label: 'Weekly Attendance', value: 342, change: '+5%' },
          performanceIndicators: [
            { label: 'Baptism Rate', value: '8.5%', trend: 'up', color: 'green' },
            { label: 'Donation Growth', value: '+12%', trend: 'up', color: 'green' },
            { label: 'Youth Program', value: '156 members', trend: 'up', color: 'blue' }
          ],
          recentActivities: [
            { type: 'membership', message: 'New member baptized: Sarah Johnson', time: '1 day ago' },
            { type: 'event', message: 'Community outreach event completed - 89 participants', time: '2 days ago' },
            { type: 'program', message: 'Youth choir performance at local festival', time: '3 days ago' }
          ]
        };
      case 'library':
        return {
          primaryMetric: { label: 'Total Books', value: bookStats?.total || 0, change: '+8%' },
          secondaryMetric: { label: 'Active Loans', value: bookStats?.checkedOut || 0, change: '+15%' },
          tertiaryMetric: { label: 'Monthly Visitors', value: 1250, change: '+22%' },
          performanceIndicators: [
            { label: 'Book Utilization', value: '78%', trend: 'up', color: 'green' },
            { label: 'Return Rate', value: '95%', trend: 'stable', color: 'blue' },
            { label: 'New Acquisitions', value: '45 books', trend: 'up', color: 'green' }
          ],
          recentActivities: [
            { type: 'loan', message: 'Popular science section fully utilized this week', time: '2 hours ago' },
            { type: 'return', message: 'Overdue book returned with fine payment', time: '4 hours ago' },
            { type: 'acquisition', message: 'New collection of programming books added', time: '1 day ago' }
          ]
        };
      default:
        return {
          primaryMetric: { label: 'Total Users', value: 1247, change: '+12%' },
          secondaryMetric: { label: 'Active Users', value: 1156, change: '+8%' },
          tertiaryMetric: { label: 'System Health', value: '98.5%', change: '+0.2%' },
          performanceIndicators: [
            { label: 'Uptime', value: '99.9%', trend: 'stable', color: 'green' },
            { label: 'Response Time', value: '245ms', trend: 'down', color: 'green' },
            { label: 'Error Rate', value: '0.01%', trend: 'stable', color: 'blue' }
          ],
          recentActivities: [
            { type: 'system', message: 'Scheduled maintenance completed successfully', time: '2 hours ago' },
            { type: 'user', message: 'New user registration peak detected', time: '4 hours ago' },
            { type: 'security', message: 'Security audit passed with no issues', time: '1 day ago' }
          ]
        };
    }
  };

  const orgMetrics = getOrganizationMetrics();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // For frontend-only app, always show dashboard with mock user
  const currentUser = user || {
    id: 'mock-user',
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'ADMIN' as const,
    isTwoFactorEnabled: true
  };

  const isAdmin = currentUser.role === 'ADMIN' || currentUser.role === 'SUPERADMIN';
  const isSuperAdmin = currentUser.role === 'SUPERADMIN';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              {/* <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <span className="text-lg font-bold text-white">P</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {currentOrganization.settings.branding.siteName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {currentOrganization.settings.branding.tagline}
                  </p>
                </div>
              </div> */}
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {currentUser.name || currentUser.email}!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Here's what's happening at {currentOrganization.name} today.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <Badge variant="outline" className="mb-1">
                  {currentOrganization.type.charAt(0).toUpperCase() + currentOrganization.type.slice(1)}
                </Badge>
                <div className="text-sm text-gray-600">
                  {currentUser.role}
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Organization-Specific Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{orgMetrics.primaryMetric.label}</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orgMetrics.primaryMetric.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{orgMetrics.primaryMetric.change}</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{orgMetrics.secondaryMetric.label}</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orgMetrics.secondaryMetric.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{orgMetrics.secondaryMetric.change}</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{orgMetrics.tertiaryMetric.label}</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orgMetrics.tertiaryMetric.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{orgMetrics.tertiaryMetric.change}</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Mobile Tab Navigation */}
          <div className="md:hidden">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === "overview"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === "analytics"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab("insights")}
                className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === "insights"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Advanced
              </button>
              {isAdmin && (
                <button
                  onClick={() => setActiveTab("admin")}
                  className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                    activeTab === "admin"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Admin Panel
                </button>
              )}
              {isSuperAdmin && (
                <button
                  onClick={() => setActiveTab("superadmin")}
                  className={`px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                    activeTab === "superadmin"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Super Admin
                </button>
              )}
            </div>
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden md:block overflow-x-auto">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-max min-w-full lg:w-full lg:grid lg:grid-cols-5">
              <TabsTrigger value="overview" className="whitespace-nowrap">Overview</TabsTrigger>
              <TabsTrigger value="analytics" className="whitespace-nowrap">Analytics</TabsTrigger>
              <TabsTrigger value="insights" className="whitespace-nowrap">Advanced</TabsTrigger>
              {isAdmin && <TabsTrigger value="admin" className="whitespace-nowrap">Admin Panel</TabsTrigger>}
              {isSuperAdmin && <TabsTrigger value="superadmin" className="whitespace-nowrap">Super Admin</TabsTrigger>}
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* P-Core System Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* School Management Overview */}
              <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <GraduationCap className="h-5 w-5" />
                    School Management
                  </CardTitle>
                  <CardDescription>Student and course management system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{studentStats?.total || 0}</div>
                      <div className="text-xs text-blue-700">Total Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{studentStats?.active || 0}</div>
                      <div className="text-xs text-green-700">Active Students</div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" size="sm">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Manage Students
                  </Button>
                </CardContent>
              </Card>

              {/* Church Management Overview */}
              <Card className="border-purple-200 bg-purple-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <Church className="h-5 w-5" />
                    Church Management
                  </CardTitle>
                  <CardDescription>Member and choir management system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{memberStats?.total || 0}</div>
                      <div className="text-xs text-purple-700">Total Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-600">{memberStats?.baptized || 0}</div>
                      <div className="text-xs text-pink-700">Baptized</div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" size="sm">
                    <Church className="h-4 w-4 mr-2" />
                    Manage Members
                  </Button>
                </CardContent>
              </Card>

              {/* Library Management Overview */}
              <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <Library className="h-5 w-5" />
                    Library Management
                  </CardTitle>
                  <CardDescription>Book catalog and loan management system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{bookStats?.total || 0}</div>
                      <div className="text-xs text-green-700">Total Books</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{bookStats?.available || 0}</div>
                      <div className="text-xs text-blue-700">Available</div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline" size="sm">
                    <Library className="h-4 w-4 mr-2" />
                    Manage Books
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* System Statistics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Combined Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                  <CardDescription>Combined statistics from all management systems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Students</span>
                      </div>
                      <div className="text-2xl font-bold">{studentStats?.total || 0}</div>
                      <div className="text-xs text-muted-foreground">
                        {studentStats?.active || 0} active
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Church className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Members</span>
                      </div>
                      <div className="text-2xl font-bold">{memberStats?.total || 0}</div>
                      <div className="text-xs text-muted-foreground">
                        {memberStats?.baptized || 0} baptized
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Books</span>
                      </div>
                      <div className="text-2xl font-bold">{bookStats?.total || 0}</div>
                      <div className="text-xs text-muted-foreground">
                        {bookStats?.availableCopies || 0} available copies
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-pink-500" />
                        <span className="text-sm font-medium">Married</span>
                      </div>
                      <div className="text-2xl font-bold">{memberStats?.married || 0}</div>
                      <div className="text-xs text-muted-foreground">
                        Church members
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Access all management systems</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <GraduationCap className="h-4 w-4 mr-2 text-blue-500" />
                    Student Management
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Church className="h-4 w-4 mr-2 text-purple-500" />
                    Church Management
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Library className="h-4 w-4 mr-2 text-green-500" />
                    Library Management
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    User Management
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    System Alerts
                  </CardTitle>
                  <CardDescription>Important notifications and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bookStats && bookStats.lowStock > 0 && (
                    <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-orange-900">Low Stock Alert</p>
                        <p className="text-xs text-orange-700">
                          {bookStats.lowStock} books have ≤1 copy available
                        </p>
                      </div>
                    </div>
                  )}
                  {studentStats && studentStats.suspended > 0 && (
                    <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-900">Suspended Students</p>
                        <p className="text-xs text-red-700">
                          {studentStats.suspended} students are currently suspended
                        </p>
                      </div>
                    </div>
                  )}
                  {(!bookStats || bookStats.lowStock === 0) && (!studentStats || studentStats.suspended === 0) && (
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-900">All Systems Normal</p>
                        <p className="text-xs text-green-700">
                          No critical alerts at this time
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Organization Performance Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Indicators</CardTitle>
                  <CardDescription>Key metrics and trends for {currentOrganization.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {orgMetrics.performanceIndicators.map((indicator, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            indicator.color === 'green' ? 'bg-green-500' :
                            indicator.color === 'blue' ? 'bg-blue-500' : 'bg-gray-500'
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium">{indicator.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {indicator.trend === 'up' ? '↗️ Improving' :
                               indicator.trend === 'down' ? '↘️ Declining' : '→ Stable'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{indicator.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Organization-Specific Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions at {currentOrganization.name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {orgMetrics.recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'enrollment' || activity.type === 'membership' ? 'bg-blue-500' :
                          activity.type === 'course' || activity.type === 'program' ? 'bg-green-500' :
                          activity.type === 'achievement' || activity.type === 'event' ? 'bg-purple-500' :
                          activity.type === 'loan' || activity.type === 'return' ? 'bg-orange-500' :
                          activity.type === 'acquisition' ? 'bg-teal-500' : 'bg-gray-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <DataInsights />
          </TabsContent>

          {isAdmin && (
            <TabsContent value="admin" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Management
                    </CardTitle>
                    <CardDescription>Manage system users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">1,247</p>
                      <p className="text-sm text-muted-foreground">Total users</p>
                      <Button className="w-full mt-4" size="sm">
                        Manage Users
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      System Security
                    </CardTitle>
                    <CardDescription>Security monitoring</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-green-600">Secure</p>
                      <p className="text-sm text-muted-foreground">All systems secure</p>
                      <Button className="w-full mt-4" size="sm" variant="outline">
                        View Security Logs
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Performance
                    </CardTitle>
                    <CardDescription>System performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">99.9%</p>
                      <p className="text-sm text-muted-foreground">Uptime</p>
                      <Button className="w-full mt-4" size="sm" variant="outline">
                        View Metrics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {isSuperAdmin && (
            <TabsContent value="superadmin" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Revenue
                    </CardTitle>
                    <CardDescription>Monthly recurring revenue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">$156,789</p>
                      <p className="text-sm text-green-600">+12% from last month</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Subscriptions
                    </CardTitle>
                    <CardDescription>Active subscriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold">1,156</p>
                      <p className="text-sm text-muted-foreground">Active subscriptions</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      System Alerts
                    </CardTitle>
                    <CardDescription>Critical system notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-yellow-600">3</p>
                      <p className="text-sm text-muted-foreground">Pending alerts</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Growth Rate
                    </CardTitle>
                    <CardDescription>User acquisition rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-green-600">+23%</p>
                      <p className="text-sm text-muted-foreground">Monthly growth</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Super Admin Controls</CardTitle>
                  <CardDescription>Advanced system management tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline">
                      <Settings className="h-4 w-4 mr-2" />
                      System Settings
                    </Button>
                    <Button variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Security Audit
                    </Button>
                    <Button variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Advanced Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <DashboardPageContent />
    </Suspense>
  );
}
