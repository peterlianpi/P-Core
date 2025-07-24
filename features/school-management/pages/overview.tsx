"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OverviewGrid, StatsCharts } from "../features/overview";
import { SchoolAnalyticsDashboard } from "../components";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users,
  BookOpen,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SchoolOverviewPageProps {
  className?: string;
}

export const SchoolOverviewPage: React.FC<SchoolOverviewPageProps> = ({
  className,
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Page Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">School Management Overview</h1>
        <p className="text-muted-foreground">
          Comprehensive dashboard for managing your educational institution
        </p>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewGrid />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <SchoolAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <StatsCharts />
        </TabsContent>
      </Tabs>

      {/* Additional Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Operational</div>
            <p className="text-xs text-muted-foreground">
              All systems running normally
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Freshness</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Live</div>
            <p className="text-xs text-muted-foreground">
              Last updated: just now
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              Currently online
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchoolOverviewPage;
