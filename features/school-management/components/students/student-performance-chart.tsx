"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Award, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample student performance data
const generateStudentData = () => [
  {
    id: "1",
    name: "Alice Johnson",
    subjects: {
      mathematics: [85, 88, 92, 89, 94],
      science: [78, 82, 85, 88, 90],
      english: [92, 89, 91, 93, 95],
      history: [80, 83, 85, 87, 89],
      art: [95, 93, 96, 98, 97],
    },
    overall: [86, 87, 90, 91, 93],
    grade: "A",
    trend: "up",
  },
  {
    id: "2",
    name: "Bob Smith",
    subjects: {
      mathematics: [70, 72, 68, 75, 78],
      science: [82, 80, 84, 86, 85],
      english: [75, 78, 80, 82, 84],
      history: [88, 85, 87, 89, 91],
      art: [90, 88, 92, 89, 91],
    },
    overall: [81, 80, 82, 84, 86],
    grade: "B",
    trend: "up",
  },
  {
    id: "3",
    name: "Carol Davis",
    subjects: {
      mathematics: [92, 89, 91, 88, 85],
      science: [95, 93, 91, 89, 87],
      english: [88, 85, 83, 80, 78],
      history: [90, 88, 85, 82, 80],
      art: [85, 83, 80, 78, 76],
    },
    overall: [90, 88, 86, 83, 81],
    grade: "B",
    trend: "down",
  },
];

const COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  info: "#3B82F6",
};

const chartConfig = {
  mathematics: { label: "Mathematics", color: COLORS.primary },
  science: { label: "Science", color: COLORS.info },
  english: { label: "English", color: COLORS.success },
  history: { label: "History", color: COLORS.warning },
  art: { label: "Art", color: COLORS.secondary },
  overall: { label: "Overall", color: COLORS.primary },
};

interface StudentPerformanceChartProps {
  className?: string;
}

export const StudentPerformanceChart: React.FC<StudentPerformanceChartProps> = ({
  className,
}) => {
  const [selectedStudent, setSelectedStudent] = useState("1");
  const [chartType, setChartType] = useState<"line" | "bar" | "radar">("line");
  const [timeRange, setTimeRange] = useState("all");

  const studentData = useMemo(() => generateStudentData(), []);
  const currentStudent = studentData.find(s => s.id === selectedStudent);

  // Transform data for charts
  const chartData = useMemo(() => {
    if (!currentStudent) return [];

    const periods = ["Term 1", "Term 2", "Term 3", "Term 4", "Term 5"];
    
    return periods.map((period, index) => ({
      period,
      mathematics: currentStudent.subjects.mathematics[index],
      science: currentStudent.subjects.science[index],
      english: currentStudent.subjects.english[index],
      history: currentStudent.subjects.history[index],
      art: currentStudent.subjects.art[index],
      overall: currentStudent.overall[index],
    }));
  }, [currentStudent]);

  // Radar chart data
  const radarData = useMemo(() => {
    if (!currentStudent) return [];

    const latestScores = {
      mathematics: currentStudent.subjects.mathematics.slice(-1)[0],
      science: currentStudent.subjects.science.slice(-1)[0],
      english: currentStudent.subjects.english.slice(-1)[0],
      history: currentStudent.subjects.history.slice(-1)[0],
      art: currentStudent.subjects.art.slice(-1)[0],
    };

    return Object.entries(latestScores).map(([subject, score]) => ({
      subject: subject.charAt(0).toUpperCase() + subject.slice(1),
      score,
      fullMark: 100,
    }));
  }, [currentStudent]);

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="mathematics" fill={COLORS.primary} />
              <Bar dataKey="science" fill={COLORS.info} />
              <Bar dataKey="english" fill={COLORS.success} />
              <Bar dataKey="history" fill={COLORS.warning} />
              <Bar dataKey="art" fill={COLORS.secondary} />
            </BarChart>
          </ChartContainer>
        );
      
      case "radar":
        return (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={0} domain={[0, 100]} />
              <Radar
                name="Current Scores"
                dataKey="score"
                stroke={COLORS.primary}
                fill={COLORS.primary}
                fillOpacity={0.3}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ChartContainer>
        );
      
      default:
        return (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="mathematics"
                stroke={COLORS.primary}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="science"
                stroke={COLORS.info}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="english"
                stroke={COLORS.success}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="history"
                stroke={COLORS.warning}
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="art"
                stroke={COLORS.secondary}
                strokeWidth={2}
              />
            </LineChart>
          </ChartContainer>
        );
    }
  };

  const getGradeBadgeColor = (grade: string) => {
    switch (grade) {
      case "A": return "bg-green-500 hover:bg-green-600";
      case "B": return "bg-blue-500 hover:bg-blue-600";
      case "C": return "bg-yellow-500 hover:bg-yellow-600";
      case "D": return "bg-orange-500 hover:bg-orange-600";
      default: return "bg-red-500 hover:bg-red-600";
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={selectedStudent} onValueChange={setSelectedStudent}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select student" />
            </SelectTrigger>
            <SelectContent>
              {studentData.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={(value: "line" | "bar" | "radar") => setChartType(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
              <SelectItem value="radar">Radar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {currentStudent && (
          <div className="flex items-center gap-2">
            <Badge className={getGradeBadgeColor(currentStudent.grade)}>
              Grade {currentStudent.grade}
            </Badge>
            {currentStudent.trend === "up" ? (
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">Improving</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <TrendingDown className="w-4 h-4 mr-1" />
                <span className="text-sm">Declining</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            {currentStudent?.name} Performance Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderChart()}
        </CardContent>
      </Card>

      {/* Subject Breakdown */}
      {currentStudent && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Object.entries(currentStudent.subjects).map(([subject, scores]) => {
            const latestScore = scores[scores.length - 1];
            const previousScore = scores[scores.length - 2];
            const change = latestScore - previousScore;
            
            return (
              <Card key={subject}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm capitalize">{subject}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{latestScore}%</div>
                  <div className={cn(
                    "flex items-center text-xs",
                    change >= 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {change >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {change > 0 ? "+" : ""}{change}% from last term
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Performance Insights */}
      {currentStudent && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Performance Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentStudent.trend === "down" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">
                    <strong>Attention Required:</strong> {currentStudent.name}'s overall performance has been declining. 
                    Consider additional support in weaker subjects.
                  </p>
                </div>
              )}
              
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Strongest Subject:</strong> {
                    Object.entries(currentStudent.subjects)
                      .map(([subject, scores]) => ({ subject, score: scores[scores.length - 1] }))
                      .sort((a, b) => b.score - a.score)[0].subject.charAt(0).toUpperCase() + 
                    Object.entries(currentStudent.subjects)
                      .map(([subject, scores]) => ({ subject, score: scores[scores.length - 1] }))
                      .sort((a, b) => b.score - a.score)[0].subject.slice(1)
                  } with {
                    Object.entries(currentStudent.subjects)
                      .map(([subject, scores]) => ({ subject, score: scores[scores.length - 1] }))
                      .sort((a, b) => b.score - a.score)[0].score
                  }%
                </p>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">
                  <strong>Improvement Opportunity:</strong> {
                    Object.entries(currentStudent.subjects)
                      .map(([subject, scores]) => ({ subject, score: scores[scores.length - 1] }))
                      .sort((a, b) => a.score - b.score)[0].subject.charAt(0).toUpperCase() + 
                    Object.entries(currentStudent.subjects)
                      .map(([subject, scores]) => ({ subject, score: scores[scores.length - 1] }))
                      .sort((a, b) => a.score - b.score)[0].subject.slice(1)
                  } needs attention with {
                    Object.entries(currentStudent.subjects)
                      .map(([subject, scores]) => ({ subject, score: scores[scores.length - 1] }))
                      .sort((a, b) => a.score - b.score)[0].score
                  }%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentPerformanceChart;
