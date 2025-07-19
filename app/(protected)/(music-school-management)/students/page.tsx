"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Users, UserCheck, UserX, GraduationCap } from "lucide-react";

import { StudentForm } from "@/features/music-school-management/features/students-management/components/student-form";
import { StudentTable } from "@/features/music-school-management/features/students-management/components/student-table";
import {
  mockCourses,
  mockStudents,
} from "@/features/music-school-management/lib/mock-data";
import {
  CustomCourseFormData,
  StudentFormData,
} from "@/features/music-school-management/types/schemas";

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentFormData[]>(mockStudents);
  const [courses] = useState<CustomCourseFormData[]>(mockCourses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<
    StudentFormData | undefined
  >();

  const handleSave = (studentData: StudentFormData) => {
    if (editingStudent) {
      // Update existing student
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editingStudent.id
            ? {
                ...student,
                ...studentData,
                updatedAt: new Date().toISOString(),
              }
            : student
        )
      );
    } else {
      // Add new student
      const newStudent: StudentFormData = {
        ...studentData,
        id: `${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setStudents((prev) => [...prev, newStudent]);
    }
    setEditingStudent(undefined);
    setIsFormOpen(false);
  };

  const handleEdit = (student: StudentFormData) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const handleAddNew = () => {
    setEditingStudent(undefined);
    setIsFormOpen(true);
  };

  const stats = {
    total: students.length,
    active: students.filter((s) => s.status === "active").length,
    inactive: students.filter((s) => s.status === "inactive").length,
    graduated: students.filter((s) => s.status === "graduated").length,
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Students</h1>
            <p className="text-muted-foreground">
              Manage your music school students
            </p>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">enrolled students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">currently learning</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <UserX className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactive}</div>
            <p className="text-xs text-muted-foreground">not active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduated</CardTitle>
            <GraduationCap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.graduated}</div>
            <p className="text-xs text-muted-foreground">completed courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
          <CardDescription>
            A list of all students in your music school
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentTable
            students={students}
            courses={courses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Student Form Dialog */}
      <StudentForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        student={editingStudent}
        onSave={handleSave}
        availableCourses={courses}
      />
    </div>
  );
}
