// Core entity types
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "teacher" | "student"
  avatar?: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface Course {
  id: string
  name: string
  description?: string
  color: string
  levels: string[]
  monthlyFee: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Student {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  rollNumber?: string
  courseId: string
  level: string
  enrollmentDate: string
  status: "active" | "inactive" | "suspended" | "graduated"
  parentName?: string
  parentPhone?: string
  address?: string
  createdAt: string
  updatedAt: string
}

export interface Teacher {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  specialization: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface LessonBook {
  id: string
  title: string
  author?: string
  price: number
  courseId: string
  level: string
  description?: string
  coverImage?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  id: string
  studentId: string
  type: "monthly_fee" | "book_purchase" | "material_purchase" | "other"
  amount: number
  description: string
  status: "pending" | "completed" | "failed" | "refunded"
  paymentMethod: "cash" | "card" | "bank_transfer" | "online"
  dueDate?: string
  paidDate?: string
  createdAt: string
  updatedAt: string
}

export interface Schedule {
  id: string
  courseId: string
  teacherId: string
  studentIds: string[]
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string
  endTime: string
  room: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// UI Theme types
export interface ThemeSettings {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontSize: "small" | "medium" | "large"
  borderRadius: "none" | "small" | "medium" | "large"
  mode: "light" | "dark" | "system"
}

// Form types
export type StudentFormData = Omit<Student, "id" | "createdAt" | "updatedAt">
export type CourseFormData = Omit<Course, "id" | "createdAt" | "updatedAt">
export type LessonBookFormData = Omit<LessonBook, "id" | "createdAt" | "updatedAt">
export type TransactionFormData = Omit<Transaction, "id" | "createdAt" | "updatedAt">
export type TeacherFormData = Omit<Teacher, "id" | "createdAt" | "updatedAt">
export type ScheduleFormData = Omit<Schedule, "id" | "createdAt" | "updatedAt">

// Dashboard stats
export interface DashboardStats {
  totalStudents: number
  totalRevenue: number
  pendingPayments: number
  activeTeachers: number
  monthlyGrowth: number
  revenueGrowth: number
}
