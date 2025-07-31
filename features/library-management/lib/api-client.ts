/**
 * Library Management API Client
 * Type-safe API calls for library management features
 */

import type { 
  ApiResponse, 
  PaginatedResponse 
} from "@/lib/types/database"

// Define library-specific types here
interface Book {
  id: string
  title: string
  author?: string
  isbn?: string
  available: number
  total: number
  isActive: boolean
  // Add more fields as needed
}

interface BookLoan {
  id: string
  bookId: string
  studentId: string
  loanDate: Date
  dueDate: Date
  returnDate?: Date
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE'
  // Add more fields as needed
}

class LibraryManagementApiClient {
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

  // Books API calls
  async getBooks(params?: {
    page?: number
    limit?: number
    search?: string
    author?: string
    isActive?: boolean
    available?: boolean
  }): Promise<PaginatedResponse<Book>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.search) searchParams.set('search', params.search)
    if (params?.author) searchParams.set('author', params.author)
    if (params?.isActive !== undefined) searchParams.set('isActive', params.isActive.toString())
    if (params?.available !== undefined) searchParams.set('available', params.available.toString())

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request<PaginatedResponse<Book>>(`/books${query}`)
  }

  async createBook(data: Partial<Book>): Promise<Book> {
    return this.request<Book>('/books', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Book Loans API calls
  async getBookLoans(params?: {
    page?: number
    limit?: number
    studentId?: string
    bookId?: string
    status?: string
  }): Promise<PaginatedResponse<BookLoan>> {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.studentId) searchParams.set('studentId', params.studentId)
    if (params?.bookId) searchParams.set('bookId', params.bookId)
    if (params?.status) searchParams.set('status', params.status)

    const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return this.request<PaginatedResponse<BookLoan>>(`/book-loans${query}`)
  }

  async createBookLoan(data: Partial<BookLoan>): Promise<BookLoan> {
    return this.request<BookLoan>('/book-loans', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async returnBook(loanId: string): Promise<BookLoan> {
    return this.request<BookLoan>(`/book-loans/${loanId}/return`, {
      method: 'PATCH',
    })
  }
}

// Export singleton instance
export const libraryApi = new LibraryManagementApiClient()

// Export React Query keys for consistency
export const queryKeys = {
  books: {
    all: ['books'] as const,
    list: (params?: any) => ['books', 'list', params] as const,
    detail: (id: string) => ['books', 'detail', id] as const,
  },
  loans: {
    all: ['book-loans'] as const,
    list: (params?: any) => ['book-loans', 'list', params] as const,
    detail: (id: string) => ['book-loans', 'detail', id] as const,
  },
} as const
