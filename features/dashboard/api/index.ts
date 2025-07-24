/**
 * DASHBOARD FEATURE API
 * 
 * This module provides dashboard-specific API functions using the Hono client
 * Follows the features/dashboard/api/ pattern for organization
 */

import { dashboardApi } from '@/lib/hono-client'

// ============================================================================
// TYPES
// ============================================================================

export interface DashboardStats {
  [key: string]: {
    value: number | string
    change?: number
    changeType?: 'increase' | 'decrease' | 'neutral'
  }
}

export interface AnalyticsData {
  [key: string]: any[]
}

export interface Activity {
  id: string
  type: 'enrollment' | 'payment' | 'course' | 'event' | 'communication' | 'system' | 'achievement'
  title: string
  description: string
  user: {
    name: string
    avatar?: string
    role?: string
  }
  timestamp: Date
  metadata?: any
  priority?: 'low' | 'medium' | 'high'
}

export interface DashboardApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Get dashboard statistics for an organization
 */
export async function getDashboardStats(
  orgType?: string, 
  orgId?: string
): Promise<DashboardApiResponse<DashboardStats>> {
  try {
    const response = await dashboardApi.getStats(orgType, orgId)
    return response as DashboardApiResponse<DashboardStats>
  } catch (error) {
    console.error('Failed to fetch dashboard stats:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Get analytics data for dashboard charts
 */
export async function getDashboardAnalytics(
  orgType?: string, 
  timeRange?: string, 
  orgId?: string
): Promise<DashboardApiResponse<AnalyticsData>> {
  try {
    const response = await dashboardApi.getAnalytics(orgType, timeRange, orgId)
    return response as DashboardApiResponse<AnalyticsData>
  } catch (error) {
    console.error('Failed to fetch dashboard analytics:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

/**
 * Get recent activity feed
 */
export async function getDashboardActivity(
  orgType?: string, 
  limit?: number, 
  filter?: string, 
  orgId?: string
): Promise<DashboardApiResponse<Activity[]>> {
  try {
    const response = await dashboardApi.getActivity(orgType, limit, filter, orgId)
    return response as DashboardApiResponse<Activity[]>
  } catch (error) {
    console.error('Failed to fetch dashboard activity:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// ============================================================================
// MOCK DATA GENERATORS (Fallback)
// ============================================================================

export function generateMockSchoolStats(): DashboardStats {
  return {
    students: {
      value: 1245,
      change: 8.2,
      changeType: 'increase'
    },
    courses: {
      value: 24,
      change: 12.5,
      changeType: 'increase'
    },
    teachers: {
      value: 18,
      change: 0,
      changeType: 'neutral'
    },
    revenue: {
      value: 45600,
      change: 15.3,
      changeType: 'increase'
    }
  }
}

export function generateMockChurchStats(): DashboardStats {
  return {
    members: {
      value: 856,
      change: 5.7,
      changeType: 'increase'
    },
    families: {
      value: 234,
      change: 3.2,
      changeType: 'increase'
    },
    events: {
      value: 12,
      change: -8.1,
      changeType: 'decrease'
    },
    donations: {
      value: 23400,
      change: 22.1,
      changeType: 'increase'
    }
  }
}

export function generateMockBusinessStats(): DashboardStats {
  return {
    employees: {
      value: 127,
      change: 12.1,
      changeType: 'increase'
    },
    projects: {
      value: 8,
      change: 25.0,
      changeType: 'increase'
    },
    clients: {
      value: 45,
      change: 18.9,
      changeType: 'increase'
    },
    revenue: {
      value: 156700,
      change: 31.2,
      changeType: 'increase'
    }
  }
}

export function generateMockDefaultStats(): DashboardStats {
  return {
    members: {
      value: 245,
      change: 7.1,
      changeType: 'increase'
    },
    activities: {
      value: 12,
      change: 5.3,
      changeType: 'increase'
    },
    engagement: {
      value: 78,
      change: 12.4,
      changeType: 'increase'
    },
    growth: {
      value: 23.5,
      change: 8.7,
      changeType: 'increase'
    }
  }
}

/**
 * Get fallback stats based on organization type
 */
export function getFallbackStats(orgType?: string): DashboardStats {
  switch (orgType) {
    case 'school':
      return generateMockSchoolStats()
    case 'church':
      return generateMockChurchStats()
    case 'business':
      return generateMockBusinessStats()
    default:
      return generateMockDefaultStats()
  }
}
