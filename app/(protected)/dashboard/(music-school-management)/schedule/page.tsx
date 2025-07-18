"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Lesson,
  ScheduleFormValues,
  Student,
  Teacher,
} from "@/features/music-school-management/features/schedule/types";
import { ScheduleTabs } from "@/features/music-school-management/features/schedule/components/schedule-tabs";
import { ScheduleForm } from "@/features/music-school-management/features/schedule/components/schedule-form";

// Mock data for teachers and students
const mockTeachers: Teacher[] = [
  { id: "t1", name: "Mr. David Lee" },
  { id: "t2", name: "Ms. Emily Chen" },
  { id: "t3", name: "Dr. Robert Green" },
];

const mockStudents: Student[] = [
  { id: "s1", name: "Alice Smith" },
  { id: "s2", name: "Bob Johnson" },
  { id: "s3", name: "Charlie Brown" },
  { id: "s4", name: "Diana Prince" },
];

const initialLessons: Lesson[] = [
  {
    id: "l1",
    title: "Piano Lesson - Alice",
    teacherId: "t1",
    teacher: mockTeachers[0],
    studentId: "s1",
    student: mockStudents[0],
    date: "2024-07-20",
    startTime: "10:00",
    endTime: "11:00",
    status: "Scheduled",
    createdAt: "2024-07-15T09:00:00Z",
    updatedAt: "2024-07-15T09:00:00Z",
  },
  {
    id: "l2",
    title: "Guitar Lesson - Bob",
    teacherId: "t2",
    teacher: mockTeachers[1],
    studentId: "s2",
    student: mockStudents[1],
    date: "2024-07-20",
    startTime: "14:00",
    endTime: "15:00",
    status: "Scheduled",
    createdAt: "2024-07-15T10:00:00Z",
    updatedAt: "2024-07-15T10:00:00Z",
  },
  {
    id: "l3",
    title: "Drum Lesson - Charlie",
    teacherId: "t3",
    teacher: mockTeachers[2],
    studentId: "s3",
    student: mockStudents[2],
    date: "2024-07-21",
    startTime: "09:30",
    endTime: "10:30",
    status: "Completed",
    createdAt: "2024-07-16T11:00:00Z",
    updatedAt: "2024-07-21T10:30:00Z",
  },
];

export default function SchedulePage() {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | undefined>(
    undefined
  );
  const searchParams = useSearchParams();

  // Effect to open form automatically if 'add=true' is in URL
  useEffect(() => {
    if (searchParams.get("add") === "true") {
      handleAddLesson();
    }
  }, [searchParams]);

  const handleAddLesson = () => {
    setEditingLesson(undefined);
    setIsFormOpen(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setIsFormOpen(true);
  };

  const handleDeleteLesson = (id: string) => {
    setLessons((prevLessons) =>
      prevLessons.filter((lesson) => lesson.id !== id)
    );
  };

  const handleSaveLesson = (lessonData: ScheduleFormValues) => {
    const now = new Date().toISOString();
    const selectedTeacher = mockTeachers.find(
      (t) => t.id === lessonData.teacherId
    );
    const selectedStudent = mockStudents.find(
      (s) => s.id === lessonData.studentId
    );

    if (editingLesson) {
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === editingLesson.id
            ? {
                ...lesson,
                ...lessonData,
                updatedAt: now,
                teacher: selectedTeacher || lesson.teacher,
                student: selectedStudent || lesson.student,
              }
            : lesson
        )
      );
    } else {
      const newLesson: Lesson = {
        id: `l${Date.now()}`,
        createdAt: now,
        updatedAt: now,
        ...lessonData,
        teacher: selectedTeacher as Teacher,
        student: selectedStudent as Student,
      };
      setLessons((prevLessons) => [...prevLessons, newLesson]);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <Card className="rounded-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold">Schedule</CardTitle>
            <CardDescription>
              Manage your music school&apos;s lesson schedule.
            </CardDescription>
          </div>
          <Button
            onClick={handleAddLesson}
            className="w-full sm:w-auto rounded-lg"
          >
            Add New Lesson
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          <ScheduleTabs
            lessons={lessons}
            onEdit={handleEditLesson}
            onDelete={handleDeleteLesson}
            teachers={mockTeachers}
            students={mockStudents}
          />
        </CardContent>
      </Card>

      <ScheduleForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        lesson={editingLesson}
        onSave={handleSaveLesson}
        availableTeachers={mockTeachers}
        availableStudents={mockStudents}
      />
    </div>
  );
}
