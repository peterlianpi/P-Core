/**
 * Church Management API Client
 * Type-safe API calls for church management features
 */

import type { 
  ApiResponse, 
  PaginatedResponse 
} from "@/lib/types/database"

// Define church-specific types here
interface Member {
  id: string
  name: string
  email?: string
  phone?: string
  isActive: boolean
  // Add more fields as needed
}

interface Choir {
  id: string
  name: string
  description?: string
  isActive: boolean
  // Add more fields as needed
}

class ChurchManagementApiClient {
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

  // Members API calls
  async getMembers(params?: {
    page?: number
    limit?: number
    search?: string
    isActive?: boolean
  }): Promise<PaginatedResponse<Member>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.search) searchParams.set('search', params.search)
    if (params?.isActive !== undefined) searchParams.set('isActive', params.isActive.toString())

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request<PaginatedResponse<Member>>(`/members${query}`)
  }

  async createMember(data: Partial<Member>): Promise<Member> {
    return this.request<Member>('/members', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Choirs API calls
  async getChoirs(params?: {
    page?: number
    limit?: number
    search?: string
    isActive?: boolean
  }): Promise<PaginatedResponse<Choir>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.search) searchParams.set('search', params.search)
    if (params?.isActive !== undefined) searchParams.set('isActive', params.isActive.toString())

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request<PaginatedResponse<Choir>>(`/choirs${query}`)
  }

  async createChoir(data: Partial<Choir>): Promise<Choir> {
    return this.request<Choir>('/choirs', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

// Export singleton instance
export const churchApi = new ChurchManagementApiClient()

// Export React Query keys for consistency
export const queryKeys = {
  members: {
    all: ['members'] as const,
    list: (params?: any) => ['members', 'list', params] as const,
    detail: (id: string) => ['members', 'detail', id] as const,
  },
  choirs: {
    all: ['choirs'] as const,
    list: (params?: any) => ['choirs', 'list', params] as const,  
    detail: (id: string) => ['choirs', 'detail', id] as const,
  },
} as const
