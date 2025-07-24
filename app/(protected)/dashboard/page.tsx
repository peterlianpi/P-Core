'use client';

/**
 * COMPREHENSIVE DASHBOARD: Modern Analytics & Overview
 * 
 * This dashboard provides:
 * 1. Organization-specific statistics and analytics
 * 2. Role-based content and permissions
 * 3. Real-time data visualization
 * 4. Key performance indicators (KPIs)
 * 5. Quick actions and shortcuts
 * 
 * FEATURES:
 * - Dynamic content based on organization type
 * - Interactive charts and graphs
 * - Recent activity feed
 * - Quick statistics cards
 * - Performance monitoring integration
 */

import React from "react";
import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  Clock,
  Target
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CardSkeleton } from "@/components/ui/modern-loading";
import { ErrorBoundaryWrapper } from "@/components/error/error-boundary";

import { useSession } from "next-auth/react";
import { organizationsApi } from "@/lib/hono-client";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import RecentActivity from "@/components/dashboard/recent-activity";
import QuickActions from "@/components/dashboard/quick-actions";
import AnalyticsCharts from "@/components/dashboard/analytics-charts";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const DashboardPage = () => {
  const { data: session } = useSession();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        if (session?.user?.id) {
          const result: any = await organizationsApi.getByUserId();
          setOrganizations(result.data || []);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [session?.user?.id]);

  // Get current organization context
  const currentOrgId = session?.user?.defaultOrgId;
  const currentOrg = organizations.find((org: any) => org.organization.id === currentOrgId);
  const orgType = currentOrg?.organization?.type;
  const userRole = currentOrg?.role;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundaryWrapper level="page">
      <div className="space-y-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session?.user?.name}! Here&apos;s what&apos;s happening in your organization.
            </p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            {currentOrg && (
              <Badge variant="outline" className="text-sm">
                {orgType === 'school' && '🎓 School Management'}
                {orgType === 'church' && '⛪ Church Management'}
                {orgType === 'business' && '🏢 Business Management'}
                {orgType === 'nonprofit' && '🤝 Non-Profit Management'}
                {!orgType && '🏢 Organization Management'}
              </Badge>
            )}
            <Badge variant="secondary">
              {userRole || 'Member'}
            </Badge>
          </div>
        </motion.div>

        {/* Main Dashboard Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Quick Statistics */}
          <motion.div variants={itemVariants}>
            <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => <CardSkeleton key={i} />)}
            </div>}>
              <DashboardStats orgType={orgType} userRole={userRole} />
            </Suspense>
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="actions" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Quick Actions
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Chart Area */}
                  <div className="lg:col-span-2">
                    <Suspense fallback={<CardSkeleton className="h-96" />}>
                      <AnalyticsCharts orgType={orgType} />
                    </Suspense>
                  </div>
                  
                  {/* Side Panel */}
                  <div className="space-y-6">
                    <Suspense fallback={<CardSkeleton />}>
                      <RecentActivity orgType={orgType} />
                    </Suspense>
                  </div>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Suspense fallback={<CardSkeleton className="h-96" />}>
                    <PerformanceMetrics orgType={orgType} />
                  </Suspense>
                  <Suspense fallback={<CardSkeleton className="h-96" />}>
                    <TrendAnalysis orgType={orgType} />
                  </Suspense>
                </div>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Suspense fallback={<CardSkeleton />}>
                  <ActivityFeed orgType={orgType} />
                </Suspense>
              </TabsContent>

              {/* Quick Actions Tab */}
              <TabsContent value="actions" className="space-y-6">
                <Suspense fallback={<CardSkeleton />}>
                  <QuickActions orgType={orgType} userRole={userRole} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </ErrorBoundaryWrapper>
  );
};

// Additional Dashboard Components (to be implemented)
const PerformanceMetrics = ({ orgType }: { orgType?: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Performance Metrics
      </CardTitle>
      <CardDescription>
        Key performance indicators for your {orgType || 'organization'}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {orgType === 'school' && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Student Enrollment Rate</span>
                <span>87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Course Completion Rate</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Teacher Satisfaction</span>
                <span>94%</span>
              </div>
              <Progress value={94} className="h-2" />
            </div>
          </>
        )}
        
        {/* Default metrics for other org types */}
        {orgType !== 'school' && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Member Engagement</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Goal Achievement</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </>
        )}
      </div>
    </CardContent>
  </Card>
);

const TrendAnalysis = ({ orgType }: { orgType?: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Trend Analysis
      </CardTitle>
      <CardDescription>
        Growth trends and insights
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Growth Rate</span>
          </div>
          <span className="text-green-600 font-semibold">+12.5%</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Member Growth</span>
          </div>
          <span className="text-blue-600 font-semibold">+8.3%</span>
        </div>
        
        {orgType === 'school' && (
          <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Academic Performance</span>
            </div>
            <span className="text-purple-600 font-semibold">+15.2%</span>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

const ActivityFeed = ({ orgType }: { orgType?: string }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Recent Activity Feed
      </CardTitle>
      <CardDescription>
        Latest updates and activities in your {orgType || 'organization'}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {/* Sample activity items */}
        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
          <div className="h-2 w-2 bg-green-500 rounded-full mt-2" />
          <div className="flex-1">
            <p className="text-sm font-medium">New student enrolled</p>
            <p className="text-xs text-muted-foreground">John Doe joined Computer Science course</p>
            <span className="text-xs text-muted-foreground">2 hours ago</span>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
          <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
          <div className="flex-1">
            <p className="text-sm font-medium">Course updated</p>
            <p className="text-xs text-muted-foreground">Mathematics curriculum revised</p>
            <span className="text-xs text-muted-foreground">5 hours ago</span>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
          <div className="h-2 w-2 bg-purple-500 rounded-full mt-2" />
          <div className="flex-1">
            <p className="text-sm font-medium">Payment received</p>
            <p className="text-xs text-muted-foreground">Monthly fee payment processed</p>
            <span className="text-xs text-muted-foreground">1 day ago</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default DashboardPage;
