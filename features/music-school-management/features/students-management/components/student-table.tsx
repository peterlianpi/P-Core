"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  CustomCourseFormData,
  StudentFormData,
} from "@/features/music-school-management/types/schemas";

interface StudentTableProps {
  students: StudentFormData[];
  courses: CustomCourseFormData[];
  onEdit: (student: StudentFormData) => void;
  onDelete: (id: string) => void;
}

export function StudentTable({
  students,
  courses,
  onEdit,
  onDelete,
}: StudentTableProps) {
  const [filter, setFilter] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(filter.toLowerCase()) ||
      student?.email.toLowerCase().includes(filter.toLowerCase()) ||
      student.rollNumber?.toLowerCase().includes(filter.toLowerCase()) ||
      student?.level.toLowerCase().includes(filter.toLowerCase())
  );

  const getCourse = (courseId: string) => {
    return courses.find((c) => c.id === courseId);
  };

  const getStatusVariant = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "default" as const;
      case "inactive":
        return "secondary" as const;
      case "suspended":
        return "destructive" as const;
      case "graduated":
        return "outline" as const;
      default:
        return "secondary" as const;
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Filter students..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Roll No.</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents.map((student) => {
            const course = getCourse(student.courseId);
            return (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={student.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {student.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {student.rollNumber || "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {course && (
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: course.color }}
                      />
                    )}
                    {course?.name || "Unknown"}
                  </div>
                </TableCell>
                <TableCell>{student.level}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(student.status)}>
                    {student.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{student.phone || "N/A"}</div>
                    {student.parentName && (
                      <div className="text-muted-foreground">
                        Parent: {student.parentName}
                      </div>
                    )}
                  </div>
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
                      <DropdownMenuItem onClick={() => onEdit(student)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDelete(student.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
