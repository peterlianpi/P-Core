/**
 * STUDENTS FEATURE API
 * 
 * This module provides student-specific API functions using the Hono client
 * Follows the features/school-management/students/api/ pattern for organization
 */

import { studentsApi } from '@/lib/hono-client'

// ============================================================================
// TYPES
// ============================================================================

export interface Student {
  id: string
  firstName: string
  lastName: string
  email?: string
  phone?: string
  dateOfBirth?: Date
  address?: string
  emergencyContact?: string
  organizationId: string
  createdAt: Date
  updatedAt: Date
  enrolledCourses?: Course[]
}

export interface Course {
  id: string
  name: string
  description?: string
  price?: number
  organizationId: string
}

export interface StudentStats {
  totalStudents: number
  newEnrollments: number
  activeStudents: number
  completionRate: number
}

export interface StudentSearchParams {
  search?: string
  courseId?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Get all students with optional pagination and filtering
 */
export async function getStudents(
  params?: StudentSearchParams
): Promise<ApiResponse<Student[]>> {
  try {
    const queryParams = params ? Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ) : undefined
    
    const response = await studentsApi.getAll(queryParams)
    return response as ApiResponse<Student[]>
  } catch (error) {
    console.error('Failed to fetch students:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Get a student by ID
 */
export async function getStudentById(id: string): Promise<ApiResponse<Student>> {
  try {
    const response = await studentsApi.getById(id)
    return response as ApiResponse<Student>
  } catch (error) {
    console.error('Failed to fetch student:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Get student statistics
 */
export async function getStudentStats(): Promise<ApiResponse<StudentStats>> {
  try {
    const response = await studentsApi.getStats()
    return response as ApiResponse<StudentStats>
  } catch (error) {
    console.error('Failed to fetch student stats:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Search students with filters
 */
export async function searchStudents(
  params: StudentSearchParams
): Promise<ApiResponse<Student[]>> {
  try {
    const queryParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    )
    
    const response = await studentsApi.search(queryParams)
    return response as ApiResponse<Student[]>
  } catch (error) {
    console.error('Failed to search students:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Create a new student
 */
export async function createStudent(
  studentData: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ApiResponse<Student>> {
  try {
    const response = await studentsApi.create(studentData)
    return response as ApiResponse<Student>
  } catch (error) {
    console.error('Failed to create student:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Update a student
 */
export async function updateStudent(
  id: string,
  studentData: Partial<Student>
): Promise<ApiResponse<Student>> {
  try {
    const response = await studentsApi.update(id, studentData)
    return response as ApiResponse<Student>
  } catch (error) {
    console.error('Failed to update student:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Delete a student
 */
export async function deleteStudent(id: string): Promise<ApiResponse<void>> {
  try {
    const response = await studentsApi.delete(id)
    return response as ApiResponse<void>
  } catch (error) {
    console.error('Failed to delete student:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Bulk create students
 */
export async function bulkCreateStudents(
  studentsData: Array<Omit<Student, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ApiResponse<Student[]>> {
  try {
    const response = await studentsApi.bulkCreate({ students: studentsData })
    return response as ApiResponse<Student[]>
  } catch (error) {
    console.error('Failed to bulk create students:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get student full name
 */
export function getStudentFullName(student: Student): string {
  return `${student.firstName} ${student.lastName}`.trim()
}

/**
 * Format student for display
 */
export function formatStudentForDisplay(student: Student) {
  return {
    ...student,
    fullName: getStudentFullName(student),
    displayName: getStudentFullName(student),
    coursesCount: student.enrolledCourses?.length || 0
  }
}

/**
 * Validate student data
 */
export function validateStudentData(
  studentData: Partial<Student>
): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!studentData.firstName?.trim()) {
    errors.push('First name is required')
  }

  if (!studentData.lastName?.trim()) {
    errors.push('Last name is required')
  }

  if (studentData.email && !isValidEmail(studentData.email)) {
    errors.push('Invalid email format')
  }

  if (studentData.phone && !isValidPhone(studentData.phone)) {
    errors.push('Invalid phone number format')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate phone format
 */
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}
