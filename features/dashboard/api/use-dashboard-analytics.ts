/* eslint-disable @typescript-eslint/no-explicit-any */
// Enhanced Dashboard Analytics Hook
// Uses mock data for frontend-only application

import { useQuery } from "@tanstack/react-query";
import { mockDashboardStats } from '@/data/dashboard/mock-dashboard';

export interface AnalyticsQueryParams {
  orgId: string;
  timeRange?: "week" | "month" | "quarter" | "year";
  organizationType?: string;
  metrics?: string[];
  enabled?: boolean;
}

// Query keys
export const dashboardAnalyticsKeys = {
  all: ["dashboard", "analytics"] as const,
  lists: () => [...dashboardAnalyticsKeys.all, "list"] as const,
  list: (params: Partial<AnalyticsQueryParams>) =>
    [...dashboardAnalyticsKeys.lists(), params] as const,
};

/**
 * Hook to fetch dashboard analytics with mock data
 */
export function useDashboardAnalytics({
  orgId,
  timeRange = "month",
  organizationType,
  metrics,
  enabled = true,
}: AnalyticsQueryParams) {
  const query = useQuery({
    // Enable query only if orgId is provided and enabled is true
    enabled: enabled && !!orgId,

    // Structured query key for better cache management
    queryKey: dashboardAnalyticsKeys.list({
      orgId,
      timeRange,
      organizationType,
      metrics,
    }),

    // Mock query function
    queryFn: async () => {
      // Validation
      if (!orgId) {
        throw new Error("Organization ID is required");
      }

      // Mock implementation - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Return mock analytics data
      return Promise.resolve({
        data: {
          metrics: {
            userGrowth: mockDashboardStats.userGrowth,
            organizationGrowth: mockDashboardStats.organizationGrowth,
            totalUsers: mockDashboardStats.totalUsers,
            activeUsers: mockDashboardStats.activeUsers,
            totalOrganizations: mockDashboardStats.totalOrganizations,
            systemHealth: mockDashboardStats.systemHealth
          },
          organizationType: organizationType || 'business',
          timeRange
        }
      });
    },

    // Cache configuration for optimal performance
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

    // Keep previous data when refetching (for better UX)
    placeholderData: (previousData) => previousData,
  });

  // Return enhanced query result with additional utilities
  return {
    ...query,

    // Convenience properties for common use cases
    analytics: (query.data as any)?.data || null,
    metrics: (query.data as any)?.data?.metrics || {},
    organizationType: (query.data as any)?.data?.organizationType,
    timeRange: (query.data as any)?.data?.timeRange,

    // Error utilities
    errorMessage: query.error?.message,
    isAccessDenied: query.error?.message?.includes("access") || false,
    isInvalidTimeRange: query.error?.message?.includes("time") || false,
  };
}

// Export the function that the components are looking for (for backward compatibility)
export const getDashboardAnalytics = async (params: AnalyticsQueryParams) => {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return Promise.resolve({
    data: {
      metrics: {
        userGrowth: mockDashboardStats.userGrowth,
        organizationGrowth: mockDashboardStats.organizationGrowth,
        totalUsers: mockDashboardStats.totalUsers,
        activeUsers: mockDashboardStats.activeUsers,
        totalOrganizations: mockDashboardStats.totalOrganizations,
        systemHealth: mockDashboardStats.systemHealth
      },
      organizationType: params.organizationType || 'business',
      timeRange: params.timeRange || 'month'
    }
  });
};
