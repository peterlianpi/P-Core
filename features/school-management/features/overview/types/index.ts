import type { LucideIcon } from "lucide-react"

export type StatCardProps = {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  icon?: LucideIcon
}

export type StudentGrowthData = {
  month: string
  students: number
}

export type StudentsPerCourseData = {
  course: string
  students: number
}

export type GenderBreakdownData = {
  gender: string
  students: number
}
