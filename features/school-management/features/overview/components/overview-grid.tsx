"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Award,
  Clock,
  UserCheck,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  href?: string;
  className?: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  href,
  className,
}) => {
  const CardWrapper = href ? Link : "div";
  const cardProps = href ? { href } : {};

  return (
    <CardWrapper {...cardProps}>
      <Card className={cn(
        "transition-all duration-200 hover:shadow-md",
        href && "cursor-pointer hover:border-primary/50",
        className
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div className="text-muted-foreground">{icon}</div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {trend && (
            <div className={cn(
              "flex items-center text-xs mt-1",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              <TrendingUp 
                className={cn(
                  "w-3 h-3 mr-1",
                  !trend.isPositive && "rotate-180"
                )} 
              />
              {trend.isPositive ? "+" : ""}{trend.value}% from last month
            </div>
          )}
          {description && (
            <p className="text-xs text-muted-foreground mt-1">
              {description}
            </p>
          )}
          {href && (
            <div className="flex items-center justify-end mt-2">
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  );
};

interface OverviewGridProps {
  className?: string;
}

export const OverviewGrid: React.FC<OverviewGridProps> = ({
  className,
}) => {
  // This would typically come from your data layer
  const overviewData = {
    totalStudents: 1247,
    activeCourses: 18,
    totalRevenue: 125000,
    averageAttendance: 94.5,
    graduationRate: 96.2,
    teacherStudentRatio: "1:15",
    upcomingEvents: 12,
    pendingApplications: 23,
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          title="Total Students"
          value={overviewData.totalStudents.toLocaleString()}
          icon={<Users className="h-4 w-4" />}
          description="Across all programs"
          trend={{ value: 8.2, isPositive: true }}
          href="/school-management/students"
        />

        <OverviewCard
          title="Active Courses"
          value={overviewData.activeCourses}
          icon={<BookOpen className="h-4 w-4" />}
          description="Currently running"
          trend={{ value: 12.5, isPositive: true }}
          href="/school-management/courses"
        />

        <OverviewCard
          title="Monthly Revenue"
          value={`$${(overviewData.totalRevenue / 1000).toFixed(0)}K`}
          icon={<DollarSign className="h-4 w-4" />}
          description="This month's earnings"
          trend={{ value: 15.3, isPositive: true }}
          href="/school-management/financial"
        />

        <OverviewCard
          title="Avg. Attendance"
          value={`${overviewData.averageAttendance}%`}
          icon={<UserCheck className="h-4 w-4" />}
          description="Last 30 days"
          trend={{ value: 2.1, isPositive: true }}
          href="/school-management/attendance"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          title="Graduation Rate"
          value={`${overviewData.graduationRate}%`}
          icon={<Award className="h-4 w-4" />}
          description="This academic year"
          trend={{ value: 3.7, isPositive: true }}
        />

        <OverviewCard
          title="Teacher:Student Ratio"
          value={overviewData.teacherStudentRatio}
          icon={<Users className="h-4 w-4" />}
          description="Current ratio"
        />

        <OverviewCard
          title="Upcoming Events"
          value={overviewData.upcomingEvents}
          icon={<Calendar className="h-4 w-4" />}
          description="Next 30 days"
          href="/school-management/events"
        />

        <OverviewCard
          title="Pending Applications"
          value={overviewData.pendingApplications}
          icon={<Clock className="h-4 w-4" />}
          description="Awaiting review"
          href="/school-management/applications"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button variant="outline" className="justify-start h-auto p-4" asChild>
              <Link href="/school-management/students/new">
                <Users className="w-4 h-4 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Add Student</div>
                  <div className="text-xs text-muted-foreground">Enroll new student</div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4" asChild>
              <Link href="/school-management/courses/new">
                <BookOpen className="w-4 h-4 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Create Course</div>
                  <div className="text-xs text-muted-foreground">New course offering</div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4" asChild>
              <Link href="/school-management/reports">
                <TrendingUp className="w-4 h-4 mr-2" />
                <div className="text-left">
                  <div className="font-medium">View Reports</div>
                  <div className="text-xs text-muted-foreground">Analytics & insights</div>
                </div>
              </Link>
            </Button>

            <Button variant="outline" className="justify-start h-auto p-4" asChild>
              <Link href="/school-management/schedule">
                <Calendar className="w-4 h-4 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Manage Schedule</div>
                  <div className="text-xs text-muted-foreground">Classes & events</div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "New student enrolled",
                details: "Sarah Johnson joined Advanced Mathematics",
                time: "2 hours ago",
                icon: <Users className="w-4 h-4 text-green-600" />,
              },
              {
                action: "Course completed",
                details: "Introduction to Physics - 28 students graduated",
                time: "5 hours ago",
                icon: <Award className="w-4 h-4 text-blue-600" />,
              },
              {
                action: "Payment received",
                details: "$2,500 tuition payment processed",
                time: "1 day ago",
                icon: <DollarSign className="w-4 h-4 text-green-600" />,
              },
              {
                action: "Schedule updated",
                details: "Chemistry lab session rescheduled",
                time: "2 days ago",
                icon: <Calendar className="w-4 h-4 text-orange-600" />,
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="mt-0.5">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.details}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <Button variant="ghost" className="w-full" asChild>
              <Link href="/school-management/activity">
                View All Activity
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewGrid;
