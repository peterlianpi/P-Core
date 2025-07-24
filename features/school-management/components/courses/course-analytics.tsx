"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
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
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample course data
const generateCourseData = () => [
  {
    id: "math101",
    name: "Advanced Mathematics",
    instructor: "Dr. Smith",
    students: 45,
    capacity: 50,
    completionRate: 92,
    averageScore: 85,
    passRate: 94,
    difficulty: "Advanced",
    duration: "16 weeks",
    category: "STEM",
    enrollmentTrend: [38, 40, 42, 45, 45],
    weeklyScores: [
      { week: "Week 1", average: 78, attendance: 98 },
      { week: "Week 2", average: 82, attendance: 96 },
      { week: "Week 3", average: 85, attendance: 94 },
      { week: "Week 4", average: 87, attendance: 95 },
      { week: "Week 5", average: 85, attendance: 93 },
    ],
    gradeDistribution: [
      { grade: "A", count: 20, percentage: 44 },
      { grade: "B", count: 15, percentage: 33 },
      { grade: "C", count: 8, percentage: 18 },
      { grade: "D", count: 2, percentage: 4 },
      { grade: "F", count: 0, percentage: 0 },
    ],
  },
  {
    id: "eng102",
    name: "English Literature",
    instructor: "Prof. Johnson",
    students: 38,
    capacity: 40,
    completionRate: 95,
    averageScore: 88,
    passRate: 97,
    difficulty: "Intermediate",
    duration: "14 weeks",
    category: "Literature",
    enrollmentTrend: [35, 36, 37, 38, 38],
    weeklyScores: [
      { week: "Week 1", average: 85, attendance: 99 },
      { week: "Week 2", average: 87, attendance: 97 },
      { week: "Week 3", average: 89, attendance: 96 },
      { week: "Week 4", average: 88, attendance: 94 },
      { week: "Week 5", average: 90, attendance: 95 },
    ],
    gradeDistribution: [
      { grade: "A", count: 18, percentage: 47 },
      { grade: "B", count: 16, percentage: 42 },
      { grade: "C", count: 4, percentage: 11 },
      { grade: "D", count: 0, percentage: 0 },
      { grade: "F", count: 0, percentage: 0 },
    ],
  },
  {
    id: "sci103",
    name: "Physics Fundamentals",
    instructor: "Dr. Brown",
    students: 32,
    capacity: 35,
    completionRate: 87,
    averageScore: 78,
    passRate: 89,
    difficulty: "Advanced",
    duration: "18 weeks",
    category: "STEM",
    enrollmentTrend: [30, 31, 32, 32, 31],
    weeklyScores: [
      { week: "Week 1", average: 72, attendance: 94 },
      { week: "Week 2", average: 75, attendance: 92 },
      { week: "Week 3", average: 78, attendance: 90 },
      { week: "Week 4", average: 80, attendance: 89 },
      { week: "Week 5", average: 79, attendance: 87 },
    ],
    gradeDistribution: [
      { grade: "A", count: 10, percentage: 31 },
      { grade: "B", count: 12, percentage: 38 },
      { grade: "C", count: 7, percentage: 22 },
      { grade: "D", count: 2, percentage: 6 },
      { grade: "F", count: 1, percentage: 3 },
    ],
  },
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

const GRADE_COLORS = [COLORS.success, COLORS.info, COLORS.warning, COLORS.danger, "#6B7280"];

const chartConfig = {
  average: { label: "Average Score", color: COLORS.primary },
  attendance: { label: "Attendance %", color: COLORS.success },
  enrollment: { label: "Enrollment", color: COLORS.info },
};

interface CourseAnalyticsProps {
  className?: string;
}

export const CourseAnalytics: React.FC<CourseAnalyticsProps> = ({
  className,
}) => {
  const [selectedCourse, setSelectedCourse] = useState("math101");
  const [viewType, setViewType] = useState<"overview" | "performance" | "enrollment">("overview");

  const courseData = useMemo(() => generateCourseData(), []);
  const currentCourse = courseData.find(c => c.id === selectedCourse);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-800 border-green-200";
      case "intermediate": return "bg-blue-100 text-blue-800 border-blue-200";
      case "advanced": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPerformanceIcon = (score: number) => {
    if (score >= 90) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (score >= 80) return <TrendingUp className="w-4 h-4 text-blue-600" />;
    if (score >= 70) return <Clock className="w-4 h-4 text-yellow-600" />;
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {courseData.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-1">
            <Button
              variant={viewType === "overview" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewType("overview")}
            >
              Overview
            </Button>
            <Button
              variant={viewType === "performance" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewType("performance")}
            >
              Performance
            </Button>
            <Button
              variant={viewType === "enrollment" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewType("enrollment")}
            >
              Enrollment
            </Button>
          </div>
        </div>
      </div>

      {currentCourse && (
        <>
          {/* Course Info Card */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {currentCourse.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Instructor: {currentCourse.instructor} • {currentCourse.duration} • {currentCourse.category}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(currentCourse.difficulty)}>
                    {currentCourse.difficulty}
                  </Badge>
                  {getPerformanceIcon(currentCourse.averageScore)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Enrollment</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-lg font-semibold">
                      {currentCourse.students}/{currentCourse.capacity}
                    </span>
                  </div>
                  <Progress 
                    value={(currentCourse.students / currentCourse.capacity) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-600" />
                    <span className="text-lg font-semibold">{currentCourse.averageScore}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Pass Rate</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-semibold">{currentCourse.passRate}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-lg font-semibold">{currentCourse.completionRate}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Content Based on View Type */}
          {viewType === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <LineChart data={currentCourse.weeklyScores}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="average"
                        stroke={COLORS.primary}
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="attendance"
                        stroke={COLORS.success}
                        strokeWidth={2}
                      />
                    </LineChart>
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
                        data={currentCourse.gradeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {currentCourse.gradeDistribution.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={GRADE_COLORS[index % GRADE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          )}

          {viewType === "performance" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Performance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[400px]">
                    <BarChart data={currentCourse.weeklyScores}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="average" fill={COLORS.primary} />
                      <Bar dataKey="attendance" fill={COLORS.success} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {currentCourse.gradeDistribution.map((grade, index) => (
                  <Card key={grade.grade}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Grade {grade.grade}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{grade.count}</div>
                      <div className="text-sm text-muted-foreground">
                        {grade.percentage}% of students
                      </div>
                      <Progress 
                        value={grade.percentage} 
                        className="h-2 mt-2"
                        style={{ 
                          background: `${GRADE_COLORS[index]}20`,
                        }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {viewType === "enrollment" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <LineChart 
                      data={currentCourse.enrollmentTrend.map((count, index) => ({
                        period: `Period ${index + 1}`,
                        enrollment: count,
                      }))}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="enrollment"
                        stroke={COLORS.info}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Capacity Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Enrollment</span>
                      <span>{currentCourse.students}/{currentCourse.capacity}</span>
                    </div>
                    <Progress 
                      value={(currentCourse.students / currentCourse.capacity) * 100}
                      className="h-3"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-lg font-semibold text-blue-700">
                        {((currentCourse.students / currentCourse.capacity) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-blue-600">Capacity Used</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-lg font-semibold text-green-700">
                        {currentCourse.capacity - currentCourse.students}
                      </div>
                      <div className="text-sm text-green-600">Available Spots</div>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <h4 className="font-medium">Enrollment Status</h4>
                    {((currentCourse.students / currentCourse.capacity) * 100) > 90 ? (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">
                          <AlertTriangle className="w-4 h-4 inline mr-2" />
                          Course is nearly at capacity. Consider increasing capacity or creating waitlist.
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700">
                          <CheckCircle className="w-4 h-4 inline mr-2" />
                          Course has good availability for new enrollments.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CourseAnalytics;
