import { useQuery } from '@tanstack/react-query';

// Types
export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  activeMembers: number;
  completionRate: number;
  organizationType: string;
  periodGrowth: {
    users: number;
    revenue: number;
    members: number;
    completion: number;
  };
  // Organization-specific stats
  school?: {
    totalStudents: number;
    totalCourses: number;
    totalEnrollments: number;
    averageGrade: number;
  };
  church?: {
    totalMembers: number;
    totalFamilies: number;
    totalChoirs: number;
    totalEvents: number;
  };
  library?: {
    totalBooks: number;
    totalLoans: number;
    availableBooks: number;
    overdueLoans: number;
  };
}

export interface StatsQueryParams {
  timeRange?: 'today' | 'week' | 'month' | 'quarter' | 'year';
  organizationType?: string;
  includeGrowth?: boolean;
}

// API functions
const api = {
  getDashboardStats: async (params: StatsQueryParams = {}): Promise<{ data: DashboardStats }> => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const response = await fetch(`/api/dashboard/stats?${searchParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    return response.json();
  },

  getFallbackStats: async (organizationType: string = 'business'): Promise<{ data: DashboardStats }> => {
    // Fallback data when API fails
    return {
      data: {
        totalUsers: 0,
        totalRevenue: 0,
        activeMembers: 0,
        completionRate: 0,
        organizationType,
        periodGrowth: {
          users: 0,
          revenue: 0,
          members: 0,
          completion: 0,
        },
        ...(organizationType === 'school' && {
          school: {
            totalStudents: 0,
            totalCourses: 0,
            totalEnrollments: 0,
            averageGrade: 0,
          },
        }),
        ...(organizationType === 'church' && {
          church: {
            totalMembers: 0,
            totalFamilies: 0,
            totalChoirs: 0,
            totalEvents: 0,
          },
        }),
        ...(organizationType === 'library' && {
          library: {
            totalBooks: 0,
            totalLoans: 0,
            availableBooks: 0,
            overdueLoans: 0,
          },
        }),
      },
    };
  },
};

// Query keys
export const dashboardStatsKeys = {
  all: ['dashboard', 'stats'] as const,
  lists: () => [...dashboardStatsKeys.all, 'list'] as const,
  list: (params: StatsQueryParams) => [...dashboardStatsKeys.lists(), params] as const,
};

// Hooks
export function useDashboardStats(params: StatsQueryParams = {}) {
  return useQuery({
    queryKey: dashboardStatsKeys.list(params),
    queryFn: () => api.getDashboardStats(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useFallbackStats(organizationType: string = 'business') {
  return useQuery({
    queryKey: [...dashboardStatsKeys.all, 'fallback', organizationType],
    queryFn: () => api.getFallbackStats(organizationType),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Export the functions that the components are looking for
export const getDashboardStats = api.getDashboardStats;
export const getFallbackStats = api.getFallbackStats;
