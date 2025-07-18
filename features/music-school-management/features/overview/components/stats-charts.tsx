"use client"

import { useState } from "react"
import { LineChartCard } from "@/components/charts/line-chart-card"
import { BarChartCard } from "@/components/charts/bar-chart-card"
import { PieChartCard } from "@/components/charts/pie-chart-card"
import { ChartSwitcher } from "@/components/charts/chart-switcher"
import type { ChartData } from "../types"

// Mock data for charts
const monthlyRevenueData: ChartData[] = [
  { month: "Jan", revenue: 10000 },
  { month: "Feb", revenue: 12000 },
  { month: "Mar", revenue: 11000 },
  { month: "Apr", revenue: 13000 },
  { month: "May", revenue: 15000 },
  { month: "Jun", revenue: 14000 },
  { month: "Jul", revenue: 16000 },
  { month: "Aug", revenue: 17000 },
  { month: "Sep", revenue: 18000 },
  { month: "Oct", revenue: 19000 },
  { month: "Nov", revenue: 20000 },
  { month: "Dec", revenue: 21000 },
]

const studentEnrollmentData: ChartData[] = [
  { month: "Jan", students: 200 },
  { month: "Feb", students: 220 },
  { month: "Mar", students: 210 },
  { month: "Apr", students: 230 },
  { month: "May", students: 250 },
  { month: "Jun", students: 240 },
  { month: "Jul", students: 260 },
  { month: "Aug", students: 270 },
  { month: "Sep", students: 280 },
  { month: "Oct", students: 290 },
  { month: "Nov", students: 300 },
  { month: "Dec", students: 310 },
]

const coursePopularityData: ChartData[] = [
  { name: "Piano", value: 400 },
  { name: "Guitar", value: 300 },
  { name: "Violin", value: 200 },
  { name: "Drums", value: 100 },
]

const chartOptions = [
  { value: "revenue", label: "Monthly Revenue" },
  { value: "enrollment", label: "Student Enrollment" },
  { value: "popularity", label: "Course Popularity" },
]

export function StatsCharts() {
  const [selectedChart, setSelectedChart] = useState("revenue")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <ChartSwitcher charts={chartOptions} onSelect={setSelectedChart} defaultValue={selectedChart} />
      </div>

      {selectedChart === "revenue" && (
        <LineChartCard
          title="Monthly Revenue"
          description="Revenue generated over the last 12 months."
          data={monthlyRevenueData}
          dataKey="revenue"
          lineColor="hsl(var(--primary))"
        />
      )}
      {selectedChart === "enrollment" && (
        <BarChartCard
          title="Student Enrollment"
          description="New student enrollments per month."
          data={studentEnrollmentData}
          dataKey="students"
          barColor="hsl(var(--accent))"
        />
      )}
      {selectedChart === "popularity" && (
        <PieChartCard
          title="Course Popularity"
          description="Distribution of students across different courses."
          data={coursePopularityData}
          nameKey="name"
          valueKey="value"
          colors={["#8884d8", "#82ca9d", "#ffc658", "#ff7300"]} // Example colors
        />
      )}
    </div>
  )
}
