/**
 * HONO CLIENT UTILITIES
 * 
 * This file provides utilities for making type-safe API calls using Hono client
 * Follows the features API pattern for organization
 */

import { hc } from 'hono/client'
import type { AppType } from '@/app/api/[[...route]]/route'

// Create a typed Hono client instance
export const client = hc<AppType>('/api')

// Base API client with error handling
export class ApiClient {
  private baseUrl: string

  constructor(baseUrl = '/api') {
    this.baseUrl = baseUrl
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(endpoint, window.location.origin + this.baseUrl)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value)
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(this.baseUrl + endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }
}

// Create a default API client instance
export const apiClient = new ApiClient()

// Feature-specific API clients
export const dashboardApi = {
  getStats: (orgType?: string, orgId?: string) =>
    apiClient.get('/dashboard/stats', { 
      ...(orgType && { orgType }), 
      ...(orgId && { orgId }) 
    }),
  
  getAnalytics: (orgType?: string, timeRange?: string, orgId?: string) =>
    apiClient.get('/dashboard/analytics', { 
      ...(orgType && { orgType }), 
      ...(timeRange && { timeRange }),
      ...(orgId && { orgId }) 
    }),
  
  getActivity: (orgType?: string, limit?: number, filter?: string, orgId?: string) =>
    apiClient.get('/dashboard/activity', { 
      ...(orgType && { orgType }), 
      ...(limit && { limit: limit.toString() }),
      ...(filter && { filter }),
      ...(orgId && { orgId }) 
    }),
}

export const studentsApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get('/students', params),
  
  getById: (id: string) =>
    apiClient.get(`/students/${id}`),
  
  getStats: () =>
    apiClient.get('/students/stats'),
  
  search: (params: Record<string, string>) =>
    apiClient.get('/students/search', params),
  
  create: (data: any) =>
    apiClient.post('/students', data),
  
  update: (id: string, data: any) =>
    apiClient.patch(`/students/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/students/${id}`),
  
  bulkCreate: (data: any) =>
    apiClient.post('/students/bulk-create', data),
}

export const coursesApi = {
  getAll: () =>
    apiClient.get('/courses'),
  
  getById: (id: string) =>
    apiClient.get(`/courses/${id}`),
  
  create: (data: any) =>
    apiClient.post('/courses', data),
  
  update: (id: string, data: any) =>
    apiClient.patch(`/courses/${id}`, data),
}

export const organizationsApi = {
  getAll: () =>
    apiClient.get('/org/org'),
  
  getByUserId: () =>
    apiClient.get('/org'),
  
  getById: (id: string) =>
    apiClient.get(`/org/${id}`),
  
  getDetails: () =>
    apiClient.get('/org/org-details'),
  
  create: (data: any) =>
    apiClient.post('/org', data),
  
  update: (id: string, data: any) =>
    apiClient.patch(`/org/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/org/${id}`),
  
  addUser: (id: string, data: any) =>
    apiClient.post(`/org/${id}/add-user`, data),
  
  updateRoles: (id: string, data: any) =>
    apiClient.patch(`/org/${id}/update-roles`, data),
  
  removeMember: (id: string, data: any) =>
    apiClient.patch(`/org/${id}/remove-member`, data),
}

export const purchasesApi = {
  getAll: (params?: Record<string, string>) =>
    apiClient.get('/purchases', params),
  
  getById: (id: string) =>
    apiClient.get(`/purchases/${id}`),
  
  create: (data: any) =>
    apiClient.post('/purchases', data),
  
  update: (id: string, data: any) =>
    apiClient.patch(`/purchases/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/purchases/${id}`),
}

export const schedulesApi = {
  getAll: () =>
    apiClient.get('/schedules'),
  
  getById: (id: string) =>
    apiClient.get(`/schedules/${id}`),
  
  create: (data: any) =>
    apiClient.post('/schedules', data),
  
  update: (id: string, data: any) =>
    apiClient.patch(`/schedules/${id}`, data),
}

export const inviteApi = {
  send: (data: any) =>
    apiClient.post('/invite', data),
  
  accept: (data: any) =>
    apiClient.post('/invite/accept', data),
  
  getDetails: (token: string) =>
    apiClient.get('/invite', { token }),
  
  getAll: () =>
    apiClient.get('/invite/invites'),
  
  revoke: (token: string) =>
    apiClient.delete('/invite', { token }),
}

export const feedbackApi = {
  create: (data: any) =>
    apiClient.post('/feedback', data),
  
  getAll: (params?: Record<string, string>) =>
    apiClient.get('/feedback', params),
  
  getById: (id: string) =>
    apiClient.get(`/feedback/${id}`),
  
  update: (id: string, data: any) =>
    apiClient.patch(`/feedback/${id}`, data),
  
  delete: (id: string) =>
    apiClient.delete(`/feedback/${id}`),
}
