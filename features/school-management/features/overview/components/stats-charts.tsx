"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "recharts";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRangePicker } from "../../../components/filters/date-range-picker";

// Sample data
const enrollmentData = [
  { month: "Jan", students: 1180, newEnrollments: 45, graduations: 12 },
  { month: "Feb", students: 1210, newEnrollments: 52, graduations: 18 },
  { month: "Mar", students: 1247, newEnrollments: 48, graduations: 15 },
  { month: "Apr", students: 1275, newEnrollments: 41, graduations: 22 },
  { month: "May", students: 1298, newEnrollments: 38, graduations: 25 },
  { month: "Jun", students: 1320, newEnrollments: 35, graduations: 28 },
];

const revenueData = [
  { month: "Jan", tuition: 85000, fees: 12000, materials: 8000 },
  { month: "Feb", tuition: 92000, fees: 13500, materials: 7500 },
  { month: "Mar", tuition: 98000, fees: 14000, materials: 9000 },
  { month: "Apr", tuition: 95000, fees: 12500, materials: 8200 },
  { month: "May", tuition: 105000, fees: 15000, materials: 9500 },
  { month: "Jun", tuition: 110000, fees: 16000, materials: 10000 },
];

const performanceData = [
  { subject: "Math", averageScore: 85, passRate: 92, students: 245 },
  { subject: "Science", averageScore: 78, passRate: 87, students: 198 },
  { subject: "English", averageScore: 88, passRate: 95, students: 312 },
  { subject: "History", averageScore: 82, passRate: 89, students: 178 },
  { subject: "Art", averageScore: 91, passRate: 98, students: 156 },
  { subject: "PE", averageScore: 94, passRate: 99, students: 425 },
];

const attendanceData = [
  { day: "Mon", attendance: 96.5, absent: 3.5 },
  { day: "Tue", attendance: 94.2, absent: 5.8 },
  { day: "Wed", attendance: 93.8, absent: 6.2 },
  { day: "Thu", attendance: 95.1, absent: 4.9 },
  { day: "Fri", attendance: 92.3, absent: 7.7 },
];

const gradeDistribution = [
  { grade: "A", count: 425, percentage: 34 },
  { grade: "B", count: 380, percentage: 30 },
  { grade: "C", count: 285, percentage: 23 },
  { grade: "D", count: 125, percentage: 10 },
  { grade: "F", count: 35, percentage: 3 },
];

const COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
  purple: "#8B5CF6",
};

const chartConfig = {
  students: { label: "Students", color: COLORS.primary },
  newEnrollments: { label: "New Enrollments", color: COLORS.success },
  graduations: { label: "Graduations", color: COLORS.info },
  tuition: { label: "Tuition", color: COLORS.primary },
  fees: { label: "Fees", color: COLORS.secondary },
  materials: { label: "Materials", color: COLORS.warning },
  averageScore: { label: "Average Score", color: COLORS.primary },
  passRate: { label: "Pass Rate", color: COLORS.success },
  attendance: { label: "Attendance", color: COLORS.success },
  absent: { label: "Absent", color: COLORS.danger },
};

interface StatsChartsProps {
  className?: string;
}

export const StatsCharts: React.FC<StatsChartsProps> = ({
  className,
}) => {
  const [dateRange, setDateRange] = useState<{from: Date; to: Date} | undefined>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });

  const [selectedChart, setSelectedChart] = useState<"enrollment" | "revenue" | "performance" | "attendance">("enrollment");

  const handleExport = () => {
    console.log("Exporting chart data...");
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Statistics & Analytics</h2>
          <p className="text-muted-foreground">
            Visual insights into school performance and trends
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DateRangePicker
            date={dateRange}
            onDateChange={setDateRange}
            className="w-full sm:w-auto"
          />
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Chart Selection */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: "enrollment", label: "Enrollment" },
          { key: "revenue", label: "Revenue" },
          { key: "performance", label: "Performance" },
          { key: "attendance", label: "Attendance" },
        ].map(({ key, label }) => (
          <Button
            key={key}
            variant={selectedChart === key ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedChart(key as "enrollment" | "revenue" | "performance" | "attendance")}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {selectedChart === "enrollment" && (
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
                      dataKey="students"
                      stackId="1"
                      stroke={COLORS.primary}
                      fill={COLORS.primary}
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New Enrollments vs Graduations</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="newEnrollments" fill={COLORS.success} />
                    <Bar dataKey="graduations" fill={COLORS.info} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )}

        {selectedChart === "revenue" && (
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
                      dataKey="fees"
                      stackId="1"
                      stroke={COLORS.secondary}
                      fill={COLORS.secondary}
                    />
                    <Area
                      type="monotone"
                      dataKey="materials"
                      stackId="1"
                      stroke={COLORS.warning}
                      fill={COLORS.warning}
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

        {selectedChart === "performance" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="averageScore" fill={COLORS.primary} />
                  </BarChart>
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
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {gradeDistribution.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={[COLORS.success, COLORS.info, COLORS.warning, COLORS.danger, "#6B7280"][index]}
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

        {selectedChart === "attendance" && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Daily Attendance Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="attendance" fill={COLORS.success} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance vs Absence</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <AreaChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="attendance"
                      stackId="1"
                      stroke={COLORS.success}
                      fill={COLORS.success}
                    />
                    <Area
                      type="monotone"
                      dataKey="absent"
                      stackId="1"
                      stroke={COLORS.danger}
                      fill={COLORS.danger}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default StatsCharts;
