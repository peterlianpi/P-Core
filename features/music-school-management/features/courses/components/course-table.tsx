"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import type { Course } from "@/lib/types"

interface CourseTableProps {
  courses: Course[]
  onEdit: (course: Course) => void
  onDelete: (id: string) => void
}

export function CourseTable({ courses, onEdit, onDelete }: CourseTableProps) {
  const [filter, setFilter] = useState("")

  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(filter.toLowerCase()) ||
      course.description?.toLowerCase().includes(filter.toLowerCase()) ||
      course.levels.some((level) => level.toLowerCase().includes(filter.toLowerCase())),
  )

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Filter courses..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Levels</TableHead>
            <TableHead>Monthly Fee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCourses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: course.color }} />
                  <div>
                    <div className="font-medium">{course.name}</div>
                    {course.description && <div className="text-sm text-muted-foreground">{course.description}</div>}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {course.levels.map((level) => (
                    <Badge key={level} variant="outline" className="text-xs">
                      {level}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>${course.monthlyFee}</TableCell>
              <TableCell>
                <Badge variant={course.isActive ? "default" : "secondary"}>
                  {course.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(course)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(course.id)}>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
