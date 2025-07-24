/**
 * School Management API Client
 * Type-safe API calls for school management features
 */

import type { 
  DashboardStats, 
  ApiResponse, 
  PaginatedResponse,
  Student,
  Course,
  Purchase,
  Schedule,
  StudentWithCourses,
  CourseWithStudents,
  PurchaseWithStudent,
  ScheduleWithCourse 
} from "@/lib/types/database"

class SchoolManagementApiClient {
  private baseUrl = '/api'

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Dashboard API calls
  async getDashboardStats(): Promise<DashboardStats> {
    return this.request<DashboardStats>('/dashboard?include=students,courses,purchases,growthTrends')
  }

  // Students API calls
  async getStudents(params?: {
    page?: number
    limit?: number
    search?: string
    isActive?: boolean
  }): Promise<PaginatedResponse<StudentWithCourses>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.search) searchParams.set('search', params.search)
    if (params?.isActive !== undefined) searchParams.set('isActive', params.isActive.toString())

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request<PaginatedResponse<StudentWithCourses>>(`/students${query}`)
  }

  async getStudent(id: string): Promise<StudentWithCourses> {
    return this.request<StudentWithCourses>(`/students/${id}`)
  }

  async createStudent(data: Partial<Student>): Promise<Student> {
    return this.request<Student>('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateStudent(id: string, data: Partial<Student>): Promise<Student> {
    return this.request<Student>(`/students/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteStudent(id: string): Promise<void> {
    return this.request<void>(`/students/${id}`, {
      method: 'DELETE',
    })
  }

  // Courses API calls
  async getCourses(params?: {
    page?: number
    limit?: number
    search?: string
    isActive?: boolean
  }): Promise<PaginatedResponse<CourseWithStudents>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.search) searchParams.set('search', params.search)
    if (params?.isActive !== undefined) searchParams.set('isActive', params.isActive.toString())

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request<PaginatedResponse<CourseWithStudents>>(`/courses${query}`)
  }

  async getCourse(id: string): Promise<CourseWithStudents> {
    return this.request<CourseWithStudents>(`/courses/${id}`)
  }

  async createCourse(data: Partial<Course>): Promise<Course> {
    return this.request<Course>('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateCourse(id: string, data: Partial<Course>): Promise<Course> {
    return this.request<Course>(`/courses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteCourse(id: string): Promise<void> {
    return this.request<void>(`/courses/${id}`, {
      method: 'DELETE',
    })
  }

  // Purchases API calls
  async getPurchases(params?: {
    page?: number
    limit?: number
    studentId?: string
    status?: string
  }): Promise<PaginatedResponse<PurchaseWithStudent>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.studentId) searchParams.set('studentId', params.studentId)
    if (params?.status) searchParams.set('status', params.status)

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request<PaginatedResponse<PurchaseWithStudent>>(`/purchases${query}`)
  }

  async createPurchase(data: Partial<Purchase>): Promise<Purchase> {
    return this.request<Purchase>('/purchases', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Schedules API calls
  async getSchedules(params?: {
    page?: number
    limit?: number
    courseId?: string
    dayOfWeek?: string
  }): Promise<PaginatedResponse<ScheduleWithCourse>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.courseId) searchParams.set('courseId', params.courseId)
    if (params?.dayOfWeek) searchParams.set('dayOfWeek', params.dayOfWeek)

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request<PaginatedResponse<ScheduleWithCourse>>(`/schedules${query}`)
  }

  async createSchedule(data: Partial<Schedule>): Promise<Schedule> {
    return this.request<Schedule>('/schedules', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateSchedule(id: string, data: Partial<Schedule>): Promise<Schedule> {
    return this.request<Schedule>(`/schedules/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteSchedule(id: string): Promise<void> {
    return this.request<void>(`/schedules/${id}`, {
      method: 'DELETE',
    })
  }
}

// Export singleton instance
export const schoolApi = new SchoolManagementApiClient()

// Export React Query keys for consistency
export const queryKeys = {
  dashboard: ['dashboard'] as const,
  students: {
    all: ['students'] as const,
    list: (params?: any) => ['students', 'list', params] as const,
    detail: (id: string) => ['students', 'detail', id] as const,
  },
  courses: {
    all: ['courses'] as const,
    list: (params?: any) => ['courses', 'list', params] as const,  
    detail: (id: string) => ['courses', 'detail', id] as const,
  },
  purchases: {
    all: ['purchases'] as const,
    list: (params?: any) => ['purchases', 'list', params] as const,
  },
  schedules: {
    all: ['schedules'] as const,
    list: (params?: any) => ['schedules', 'list', params] as const,
  },
} as const
