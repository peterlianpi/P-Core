"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export interface TeacherScheduleEntry {
  id: string
  lessonTitle: string
  studentName: string
  date: string
  startTime: string
  endTime: string
  status: "Scheduled" | "Completed" | "Cancelled"
  paymentStatus: "Paid" | "Pending" | "Overdue"
}

interface TeacherScheduleProps {
  schedule: TeacherScheduleEntry[]
}

export function TeacherSchedule({ schedule }: TeacherScheduleProps) {
  const [filter, setFilter] = useState("")

  const filteredSchedule = schedule.filter(
    (entry) =>
      entry.lessonTitle.toLowerCase().includes(filter.toLowerCase()) ||
      entry.studentName.toLowerCase().includes(filter.toLowerCase()) ||
      entry.date.includes(filter) ||
      entry.status.toLowerCase().includes(filter.toLowerCase()) ||
      entry.paymentStatus.toLowerCase().includes(filter.toLowerCase()),
  )

  const getStatusBadgeVariant = (status: TeacherScheduleEntry["status"]) => {
    switch (status) {
      case "Scheduled":
        return "default" as const
      case "Completed":
        return "secondary" as const
      case "Cancelled":
        return "destructive" as const
      default:
        return "default" as const
    }
  }

  const getPaymentStatusBadgeVariant = (status: TeacherScheduleEntry["paymentStatus"]) => {
    switch (status) {
      case "Paid":
        return "default" as const
      case "Pending":
        return "secondary" as const
      case "Overdue":
        return "destructive" as const
      default:
        return "default" as const
    }
  }

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Filter schedule..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lesson</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSchedule.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{entry.lessonTitle}</TableCell>
              <TableCell>{entry.studentName}</TableCell>
              <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
              <TableCell>{`${entry.startTime} - ${entry.endTime}`}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(entry.status)}>{entry.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getPaymentStatusBadgeVariant(entry.paymentStatus)}>{entry.paymentStatus}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TeacherSchedule
