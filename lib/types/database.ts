// Database Types - Re-exported to avoid bundling Prisma client in browser
// These types are safe to import in client components

import type { 
  User,
  Organization,
  OrganizationRole,
  UserOrganization,
  Student,
  Course,
  Purchase,
  Schedule,
  LessonBook,
  StudentCourse,
  CourseStatusLog,
  UserRole,
  OrganizationType,
  UserOrganizationStatus,
  Gender,
  StudentCourseStatus,
  DayOfWeek,
  PurchaseStatus,
  PaymentMethod,
  LogType
} from "@prisma/client"

// Re-export types that are safe for client-side use
export type {
  User,
  Organization,
  OrganizationRole,
  UserOrganization,
  Student,
  Course,
  Purchase,
  Schedule,
  LessonBook,
  StudentCourse,
  CourseStatusLog,
  UserRole,
  OrganizationType,
  UserOrganizationStatus,
  Gender,
  StudentCourseStatus,
  DayOfWeek,
  PurchaseStatus,
  PaymentMethod,
  LogType
}

// API Response Types
export interface DashboardStats {
  studentStats: {
    total: number
    active: number
    newThisMonth: number
    growthRate: number
  }
  courseStats: {
    total: number
    active: number
    enrollments: number
    completed: number
  }
  financialStats: {
    totalRevenue: number
    monthlyRevenue: number
    revenueGrowthRate: number
    pendingPayments: number
    completedPayments: number
  }
  growthTrends: {
    students: Array<{ month: string; value: number }>
    revenue: Array<{ month: string; value: number }>
  }
  organization: {
    id: string
    name: string
    type: OrganizationType
    createdAt: string
    description?: string
  }
}

// Extended types with relations
export interface StudentWithCourses extends Student {
  courses: Array<StudentCourse & {
    course: Course
  }>
}

export interface CourseWithStudents extends Course {
  students: Array<StudentCourse & {
    student: Student
  }>
  _count: {
    students: number
  }
}

export interface PurchaseWithStudent extends Purchase {
  student: Student
  course?: Course
}

export interface ScheduleWithCourse extends Schedule {
  course: Course
}

// Form Types
export interface StudentFormData {
  name: string
  email?: string
  phone?: string
  address?: string
  parentName?: string
  parentPhone?: string
  gender?: Gender
  birthDate?: Date
  notes?: string
  orgId: string
}

export interface CourseFormData {
  name: string
  description?: string
  price: number
  duration?: number
  orgId: string
}

export interface ScheduleFormData {
  title: string
  courseId: string
  startTime: Date
  endTime: Date
  dayOfWeek: DayOfWeek
  room?: string
  notes?: string
  orgId: string
}

export interface PurchaseFormData {
  studentId: string
  courseId?: string
  amount: number
  method?: PaymentMethod
  notes?: string
  orgId: string
}

// API Response wrappers
export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  totalItems: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

// Organization context type (replacing the problematic import)
export interface OrganizationContextType {
  organizationId: string
  role: OrganizationRole
  permissions: string[]
}
