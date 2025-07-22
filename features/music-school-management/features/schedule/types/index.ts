export interface Teacher {
  id: string
  name: string
}

export interface Student {
  id: string
  name: string
}

export interface Lesson {
  id: string
  title: string
  teacherId: string
  teacher: Teacher // Full teacher object
  studentId: string
  student: Student // Full student object
  date: string // YYYY-MM-DD format
  startTime: string // HH:MM format
  endTime: string // HH:MM format
  status: "Scheduled" | "Completed" | "Cancelled"
  createdAt: string
  updatedAt: string
}

export type ScheduleFormValues = Omit<Lesson, "id" | "createdAt" | "updatedAt" | "teacher" | "student">
