/* eslint-disable @typescript-eslint/no-explicit-any */
// Enhanced Dashboard Analytics Hook
// Uses centralized API client with improved error handling
// Integrates with RLS-based security for automatic tenant isolation

import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../lib/api-client";

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
 * Hook to fetch dashboard analytics with organization context
 * Features:
 * - Automatic tenant isolation via RLS
 * - Enhanced error handling with specific error types
 * - Flexible time range and metrics filtering
 * - Type-safe response handling
 * - Optimized caching strategy
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

    // Enhanced query function with comprehensive error handling
    queryFn: async () => {
      // Validation
      if (!orgId) {
        throw new Error("Organization ID is required");
      }

      try {
        // API request with RLS-enabled security context
        return await dashboardApi.getAnalytics({
          orgId,
          timeRange,
          organizationType,
          metrics,
        });
      } catch (error) {
        // Enhanced error handling
        if (error instanceof Error) {
          // Handle specific error cases
          if (error.message.includes("access")) {
            throw new Error(
              "You do not have access to view dashboard analytics"
            );
          }
          if (error.message.includes("organization")) {
            throw new Error("Invalid organization context");
          }
          if (error.message.includes("time")) {
            throw new Error("Invalid time range specified");
          }
        }

        // Re-throw other errors
        throw error;
      }
    },

    // Cache configuration for optimal performance
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)

    // Retry configuration for resilience
    retry: (failureCount, error) => {
      // Don't retry on client errors (access denied, etc.)
      if (
        error instanceof Error &&
        (error.message.includes("access") ||
          error.message.includes("organization"))
      ) {
        return false;
      }

      // Retry up to 3 times for server errors
      return failureCount < 3;
    },

    // Retry delay with exponential backoff
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

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
  return await dashboardApi.getAnalytics(params);
};
