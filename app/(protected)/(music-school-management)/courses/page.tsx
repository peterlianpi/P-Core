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
import { Plus } from "lucide-react";
import { CourseForm } from "@/features/music-school-management/features/courses/components/course-form";
import { CourseTable } from "@/features/music-school-management/features/courses/components/course-table";
import { CourseFormData } from "@/features/music-school-management/lib/types";
import { mockCourses } from "@/features/music-school-management/lib/mock-data";
import { Course } from "@/features/music-school-management/types/core";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | undefined>();

  const handleSave = (courseData: CourseFormData) => {
    if (editingCourse) {
      // Update existing course
      setCourses((prev) =>
        prev.map((course) =>
          course.id === editingCourse.id
            ? {
                ...course,
                ...courseData,
                updatedAt: new Date().toISOString(),
              }
            : course
        )
      );
    } else {
      // Add new course
      const newCourse: Course = {
        id: Date.now().toString(),
        ...courseData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCourses((prev) => [...prev, newCourse]);
    }
    setEditingCourse(undefined);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const handleAddNew = () => {
    setEditingCourse(undefined);
    setIsFormOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
            <p className="text-muted-foreground">
              Manage your music school courses and levels
            </p>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">
              {courses.filter((c) => c.isActive).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Fee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {Math.round(
                courses.reduce((sum, c) => sum + c.monthlyFee, 0) /
                  courses.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">per month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((sum, c) => sum + c.levels.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">across all courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>
            A list of all courses in your music school
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CourseTable
            courses={courses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {/* Course Form Dialog */}
      <CourseForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        course={editingCourse}
        onSave={handleSave}
      />
    </div>
  );
}
