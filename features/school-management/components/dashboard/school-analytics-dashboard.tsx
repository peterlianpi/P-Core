"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Download, Users, BookOpen, TrendingUp, DollarSign } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { DateRangePicker } from "../filters/date-range-picker";

// Sample data - replace with actual API calls
const generateStudentEnrollmentData = () => [
  { month: "Jan", enrolled: 120, graduated: 15, dropouts: 3 },
  { month: "Feb", enrolled: 135, graduated: 18, dropouts: 2 },
  { month: "Mar", enrolled: 148, graduated: 22, dropouts: 4 },
  { month: "Apr", enrolled: 162, graduated: 20, dropouts: 1 },
  { month: "May", enrolled: 175, graduated: 25, dropouts: 3 },
  { month: "Jun", enrolled: 188, graduated: 30, dropouts: 2 },
];

const generateCoursePerformanceData = () => [
  { course: "Mathematics", averageScore: 85, students: 45, passRate: 92 },
  { course: "Science", averageScore: 78, students: 38, passRate: 87 },
  { course: "English", averageScore: 88, students: 52, passRate: 95 },
  { course: "History", averageScore: 82, students: 41, passRate: 89 },
  { course: "Art", averageScore: 91, students: 29, passRate: 98 },
];

const generateRevenueData = () => [
  { month: "Jan", tuition: 45000, materials: 8000, other: 3000 },
  { month: "Feb", tuition: 48000, materials: 7500, other: 3500 },
  { month: "Mar", tuition: 52000, materials: 9000, other: 4000 },
  { month: "Apr", tuition: 49000, materials: 8200, other: 3200 },
  { month: "May", tuition: 55000, materials: 9500, other: 4500 },
  { month: "Jun", tuition: 58000, materials: 10000, other: 5000 },
];

const generateGradeDistribution = () => [
  { grade: "A", count: 45, percentage: 25 },
  { grade: "B", count: 72, percentage: 40 },
  { grade: "C", count: 36, percentage: 20 },
  { grade: "D", count: 18, percentage: 10 },
  { grade: "F", count: 9, percentage: 5 },
];

const COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  muted: "hsl(var(--muted))",
  destructive: "hsl(var(--destructive))",
  success: "#10B981",
  warning: "#F59E0B",
  info: "#3B82F6",
};

const chartConfig = {
  enrolled: {
    label: "Enrolled",
    color: COLORS.primary,
  },
  graduated: {
    label: "Graduated",
    color: COLORS.success,
  },
  dropouts: {
    label: "Dropouts",
    color: COLORS.destructive,
  },
  tuition: {
    label: "Tuition",
    color: COLORS.primary,
  },
  materials: {
    label: "Materials",
    color: COLORS.secondary,
  },
  other: {
    label: "Other",
    color: COLORS.accent,
  },
};

interface SchoolAnalyticsDashboardProps {
  className?: string;
}

export const SchoolAnalyticsDashboard: React.FC<SchoolAnalyticsDashboardProps> = ({
  className,
}) => {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });

  const [selectedMetric, setSelectedMetric] = useState<"enrollment" | "performance" | "revenue">("enrollment");

  // Memoized data based on date range
  const enrollmentData = useMemo(() => generateStudentEnrollmentData(), [dateRange]);
  const courseData = useMemo(() => generateCoursePerformanceData(), [dateRange]);
  const revenueData = useMemo(() => generateRevenueData(), [dateRange]);
  const gradeData = useMemo(() => generateGradeDistribution(), [dateRange]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalStudents = enrollmentData[enrollmentData.length - 1]?.enrolled || 0;
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.tuition + item.materials + item.other, 0);
    const averageScore = courseData.reduce((sum, course) => sum + course.averageScore, 0) / courseData.length;
    const totalCourses = courseData.length;

    return {
      totalStudents,
      totalRevenue,
      averageScore: Math.round(averageScore),
      totalCourses,
    };
  }, [enrollmentData, revenueData, courseData]);

  const handleExportData = () => {
    // Export functionality
    console.log("Exporting data...");
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">School Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your school's performance and growth
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DateRangePicker
            date={dateRange}
            onDateChange={setDateRange}
            className="w-full sm:w-auto"
          />
          <Button onClick={handleExportData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summaryStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Metric Selection */}
      <div className="flex gap-2">
        <Button
          variant={selectedMetric === "enrollment" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedMetric("enrollment")}
        >
          Enrollment
        </Button>
        <Button
          variant={selectedMetric === "performance" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedMetric("performance")}
        >
          Performance
        </Button>
        <Button
          variant={selectedMetric === "revenue" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedMetric("revenue")}
        >
          Revenue
        </Button>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {selectedMetric === "enrollment" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Student Enrollment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <AreaChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="enrolled"
                      stackId="1"
                      stroke={COLORS.primary}
                      fill={COLORS.primary}
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="graduated"
                      stackId="2"
                      stroke={COLORS.success}
                      fill={COLORS.success}
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <PieChart>
                    <Pie
                      data={gradeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {gradeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={Object.values(COLORS)[index % Object.values(COLORS).length]}
                        />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )}

        {selectedMetric === "performance" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={courseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="course" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="averageScore" fill={COLORS.primary} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pass Rates by Course</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <LineChart data={courseData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="course" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="passRate"
                      stroke={COLORS.success}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )}

        {selectedMetric === "revenue" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="tuition"
                      stackId="1"
                      stroke={COLORS.primary}
                      fill={COLORS.primary}
                    />
                    <Area
                      type="monotone"
                      dataKey="materials"
                      stackId="1"
                      stroke={COLORS.secondary}
                      fill={COLORS.secondary}
                    />
                    <Area
                      type="monotone"
                      dataKey="other"
                      stackId="1"
                      stroke={COLORS.accent}
                      fill={COLORS.accent}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="tuition"
                      stroke={COLORS.primary}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default SchoolAnalyticsDashboard;
