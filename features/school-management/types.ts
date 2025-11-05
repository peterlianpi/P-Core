/**
 * School Management Types
 * Type definitions for school management domain
 */

export interface Student {
  id: string;
  number: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  enrollmentDate: Date;
  graduationDate?: Date;
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'SUSPENDED';
  grade?: string;
  section?: string;
  imageUrl?: string;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description?: string;
  credits: number;
  duration: number; // in hours
  price: number;
  maxStudents?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
  imageUrl?: string;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Schedule {
  id: string;
  courseId: string;
  course: Course;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  daysOfWeek: string[]; // ['MONDAY', 'WEDNESDAY', 'FRIDAY']
  room?: string;
  instructor?: string;
  maxCapacity: number;
  enrolledCount: number;
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentCourse {
  id: string;
  studentId: string;
  student: Student;
  courseId: string;
  course: Course;
  scheduleId?: string;
  schedule?: Schedule;
  enrollmentDate: Date;
  completionDate?: Date;
  grade?: string;
  status: 'ENROLLED' | 'COMPLETED' | 'DROPPED' | 'FAILED';
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonBook {
  id: string;
  courseId: string;
  course: Course;
  title: string;
  description?: string;
  content?: string;
  order: number;
  duration?: number; // in minutes
  isPublished: boolean;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Purchase {
  id: string;
  studentId: string;
  student: Student;
  courseId: string;
  course: Course;
  amount: number;
  paymentMethod?: string;
  transactionId?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  paymentDate?: Date;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Request/Response Types
export interface CreateStudentRequest {
  number: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  grade?: string;
  section?: string;
}

export interface UpdateStudentRequest extends Partial<CreateStudentRequest> {
  status?: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'SUSPENDED';
}

export interface CreateCourseRequest {
  code: string;
  name: string;
  description?: string;
  credits: number;
  duration: number;
  price: number;
  maxStudents?: number;
}

export interface UpdateCourseRequest extends Partial<CreateCourseRequest> {
  status?: 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';
}

export interface CreateScheduleRequest {
  courseId: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  daysOfWeek: string[];
  room?: string;
  instructor?: string;
  maxCapacity: number;
}

export interface EnrollStudentRequest {
  studentId: string;
  courseId: string;
  scheduleId?: string;
}

// Filter and Search Types
export interface StudentFilters {
  status?: string;
  grade?: string;
  section?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CourseFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ScheduleFilters {
  courseId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

// Statistics Types
export interface SchoolStats {
  totalStudents: number;
  activeStudents: number;
  totalCourses: number;
  activeCourses: number;
  totalSchedules: number;
  ongoingSchedules: number;
  totalEnrollments: number;
  completedEnrollments: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageGrade?: string;
  graduationRate?: number;
}

// Dashboard Types
export interface StudentDashboard {
  recentEnrollments: StudentCourse[];
  upcomingSchedules: Schedule[];
  pendingPayments: Purchase[];
  completedCourses: StudentCourse[];
}

export interface AdminDashboard {
  stats: SchoolStats;
  recentStudents: Student[];
  popularCourses: Course[];
  upcomingSchedules: Schedule[];
  revenueChart: Array<{
    month: string;
    revenue: number;
    enrollments: number;
  }>;
}
