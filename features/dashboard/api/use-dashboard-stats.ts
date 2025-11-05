import { useQuery } from '@tanstack/react-query';
import { mockDashboardStats } from '@/data/dashboard/mock-dashboard';

// Types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalOrganizations: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: Date;
    user?: {
      name: string;
      email: string;
    };
  }>;
  userGrowth: Array<{
    month: string;
    users: number;
    organizations: number;
  }>;
  organizationGrowth: Array<{
    month: string;
    users: number;
    organizations: number;
  }>;
}

export interface StatsQueryParams {
  timeRange?: 'today' | 'week' | 'month' | 'quarter' | 'year';
  organizationType?: string;
  includeGrowth?: boolean;
}

// API functions
const api = {
  getDashboardStats: async (params: StatsQueryParams = {}): Promise<{ data: DashboardStats }> => {
    // Mock implementation - simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    return Promise.resolve({ data: mockDashboardStats });
  },

  getFallbackStats: async (organizationType: string = 'business'): Promise<{ data: DashboardStats }> => {
    // Fallback data when API fails - return mock data
    return Promise.resolve({ data: mockDashboardStats });
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
