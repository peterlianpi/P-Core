export interface Teacher {
  id: string
  name: string
  email: string
  phone?: string
  instrument: string
  hourlyRate: number
  bio?: string
  createdAt: string
  updatedAt: string
}

export interface TeacherScheduleEntry {
  id: string
  lessonTitle: string
  studentName: string
  date: string // YYYY-MM-DD
  startTime: string // HH:MM
  endTime: string // HH:MM
  status: "Scheduled" | "Completed" | "Cancelled"
  paymentStatus: "Paid" | "Pending" | "Overdue"
}

export type TeacherFormValues = Omit<Teacher, "id" | "createdAt" | "updatedAt">
