// Enhanced Organization Dashboard Hook
// Comprehensive dashboard with multi-feature statistics and analytics
// Integrates with RLS-based security for automatic tenant isolation

import { useQuery } from "@tanstack/react-query";
import { client, apiUtils } from "@/lib/api/hono-client";
import type { InferResponseType } from "hono";

// Type inference for better TypeScript support
type DashboardResponse = InferResponseType<typeof client.api.dashboard["$get"]>;

export interface UseGetOrganizationDashboardParams {
  orgId: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
  includeStudents?: boolean;
  includeMembers?: boolean;
  includeChoirs?: boolean;
  includeLibrary?: boolean;
  includePurchases?: boolean;
  includeEvents?: boolean;
  includeGrowthTrends?: boolean;
  enabled?: boolean;
}

/**
 * Hook to fetch comprehensive organization dashboard data
 * Features:
 * - Automatic tenant isolation via RLS
 * - Multi-feature statistics (school, church, library, music)
 * - Growth trends and analytics
 * - Financial summaries
 * - Recent activity tracking
 * - Enhanced error handling with specific error types
 * - Type-safe response handling
 * - Optimized caching strategy with smart invalidation
 */
export const useGetOrganizationDashboard = ({
  orgId,
  dateRange,
  includeStudents = true,
  includeMembers = true,
  includeChoirs = true,
  includeLibrary = true,
  includePurchases = true,
  includeEvents = true,
  includeGrowthTrends = true,
  enabled = true,
}: UseGetOrganizationDashboardParams) => {
  const query = useQuery({
    // Enable query only if orgId is provided and enabled is true
    enabled: enabled && !!orgId,
    
    // Structured query key for better cache management
    queryKey: [
      "dashboard", 
      { 
        orgId,
        dateRange: dateRange ? {
          from: dateRange.from.toISOString(),
          to: dateRange.to.toISOString()
        } : undefined,
        includeStudents,
        includeMembers,
        includeChoirs,
        includeLibrary,
        includePurchases,
        includeEvents,
        includeGrowthTrends
      }
    ] as const,
    
    // Enhanced query function with comprehensive error handling
    queryFn: async (): Promise<DashboardResponse> => {
      // Validation
      if (!orgId) {
        throw new Error("Organization ID is required");
      }

      try {
        // Build query parameters
        const queryParams: Record<string, string> = {
          includeStudents: includeStudents.toString(),
          includeMembers: includeMembers.toString(),
          includeChoirs: includeChoirs.toString(),
          includeLibrary: includeLibrary.toString(),
          includePurchases: includePurchases.toString(),
          includeEvents: includeEvents.toString(),
          includeGrowthTrends: includeGrowthTrends.toString(),
        };

        // Add date range if specified
        if (dateRange) {
          queryParams.fromDate = dateRange.from.toISOString();
          queryParams.toDate = dateRange.to.toISOString();
        }

        // API request with RLS-enabled security context
        const response = await client.api.dashboard.$get({
          query: apiUtils.createOrgQuery(orgId, queryParams),
        });

        // The client now handles error responses automatically
        return await response.json();

      } catch (error) {
        // Enhanced error handling with specific error types
        if (apiUtils.isAPIError(error)) {
          const errorCode = apiUtils.getErrorCode(error);
          
          switch (errorCode) {
            case 'ACCESS_DENIED':
              throw new Error('You do not have access to view dashboard data');
            case 'INVALID_ORGANIZATION':
              throw new Error('Invalid organization context');
            case 'INVALID_DATE_RANGE':
              throw new Error('Invalid date range specified');
            case 'DASHBOARD_NOT_ENABLED':
              throw new Error('Dashboard is not enabled for this organization');
            case 'INSUFFICIENT_PERMISSIONS':
              throw new Error('You do not have sufficient permissions to view all dashboard data');
            default:
              throw new Error(apiUtils.getErrorMessage(error));
          }
        }
        
        // Handle network errors
        if (apiUtils.isNetworkError(error)) {
          throw new Error('Network connection failed. Please check your internet connection.');
        }
        
        // Re-throw other errors
        throw error;
      }
    },
    
    // Cache configuration for optimal performance
    staleTime: 5 * 60 * 1000,  // 5 minutes (dashboard data should be relatively fresh)
    gcTime: 15 * 60 * 1000,    // 15 minutes (formerly cacheTime)
    
    // Retry configuration for resilience
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (apiUtils.isAPIError(error) && error.apiError.statusCode < 500) {
        return false;
      }
      
      // Retry up to 2 times for server errors (dashboard is less critical)
      return failureCount < 2;
    },
    
    // Retry delay with exponential backoff
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 15000),
    
    // Refetch on window focus for real-time data
    refetchOnWindowFocus: true,
    
    // Refetch every 10 minutes for live dashboard
    refetchInterval: 10 * 60 * 1000,
  });

  // Calculate derived statistics
  const calculateGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  // Return enhanced query result with additional utilities
  return {
    ...query,
    
    // Organization overview
    organization: query.data?.organization || {},
    
    // School management statistics
    studentStats: query.data?.studentStats || {
      total: 0,
      active: 0,
      inactive: 0,
      newThisMonth: 0,
      growthRate: 0,
    },
    
    courseStats: query.data?.courseStats || {
      total: 0,
      active: 0,
      completed: 0,
      enrollments: 0,
    },
    
    // Church management statistics
    memberStats: query.data?.memberStats || {
      total: 0,
      active: 0,
      inactive: 0,
      newThisMonth: 0,
      byHome: {},
      byVeng: {},
      byKhawk: {},
      growthRate: 0,
    },
    
    familyStats: query.data?.familyStats || {
      totalFamilies: 0,
      averageFamilySize: 0,
      singleMembers: 0,
      marriedCouples: 0,
    },
    
    // Music ministry statistics
    choirStats: query.data?.choirStats || {
      totalChoirs: 0,
      activeChoirs: 0,
      totalMembers: 0,
      totalSongs: 0,
      upcomingEvents: 0,
      voicePartDistribution: {},
    },
    
    // Library statistics
    libraryStats: query.data?.libraryStats || {
      totalBooks: 0,
      availableBooks: 0,
      loanedBooks: 0,
      overdueBooks: 0,
      popularBooks: [],
      recentLoans: [],
    },
    
    // Financial statistics
    financialStats: query.data?.financialStats || {
      totalRevenue: 0,
      monthlyRevenue: 0,
      pendingPayments: 0,
      completedPayments: 0,
      revenueGrowthRate: 0,
    },
    
    // Activity feed
    recentActivity: query.data?.recentActivity || [],
    
    // Growth trends
    growthTrends: query.data?.growthTrends || {
      students: [],
      members: [],
      revenue: [],
      courses: [],
      choirs: [],
    },
    
    // Upcoming events and deadlines
    upcomingEvents: query.data?.upcomingEvents || [],
    upcomingDeadlines: query.data?.upcomingDeadlines || [],
    
    // Alerts and notifications
    alerts: query.data?.alerts || [],
    notifications: query.data?.notifications || [],
    
    // Performance metrics
    performanceMetrics: query.data?.performanceMetrics || {
      enrollmentRate: 0,
      completionRate: 0,
      attendanceRate: 0,
      satisfactionScore: 0,
    },
    
    // Convenience utilities
    totalUsers: (query.data?.studentStats?.total || 0) + (query.data?.memberStats?.total || 0),
    hasGrowth: query.data?.studentStats?.growthRate > 0 || query.data?.memberStats?.growthRate > 0,
    isHealthy: (query.data?.alerts || []).filter(alert => alert.level === 'error').length === 0,
    
    // Date range utilities
    dateRange: dateRange || {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
      to: new Date(),
    },
    
    // Feature availability
    hasStudentFeature: includeStudents && (query.data?.studentStats?.total || 0) > 0,
    hasMemberFeature: includeMembers && (query.data?.memberStats?.total || 0) > 0,
    hasChoirFeature: includeChoirs && (query.data?.choirStats?.totalChoirs || 0) > 0,
    hasLibraryFeature: includeLibrary && (query.data?.libraryStats?.totalBooks || 0) > 0,
    
    // Error utilities
    errorMessage: query.error ? apiUtils.getErrorMessage(query.error) : undefined,
    errorCode: query.error ? apiUtils.getErrorCode(query.error) : undefined,
    isAccessDenied: apiUtils.isErrorCode(query.error, 'ACCESS_DENIED'),
    isInvalidDateRange: apiUtils.isErrorCode(query.error, 'INVALID_DATE_RANGE'),
    isDashboardNotEnabled: apiUtils.isErrorCode(query.error, 'DASHBOARD_NOT_ENABLED'),
    isInsufficientPermissions: apiUtils.isErrorCode(query.error, 'INSUFFICIENT_PERMISSIONS'),
  };
};

// Specialized hooks for specific dashboard sections

/**
 * Hook to get quick overview statistics
 */
export const useGetQuickStats = (orgId: string) => {
  return useGetOrganizationDashboard({
    orgId,
    includeGrowthTrends: false,
    includeEvents: false,
  });
};

/**
 * Hook to get financial dashboard
 */
export const useGetFinancialDashboard = (orgId: string, dateRange?: { from: Date; to: Date }) => {
  return useGetOrganizationDashboard({
    orgId,
    dateRange,
    includeStudents: false,
    includeMembers: false,
    includeChoirs: false,
    includeLibrary: false,
    includePurchases: true,
    includeEvents: false,
    includeGrowthTrends: true,
  });
};

/**
 * Hook to get activity dashboard
 */
export const useGetActivityDashboard = (orgId: string) => {
  return useGetOrganizationDashboard({
    orgId,
    includeEvents: true,
    includeGrowthTrends: false,
  });
};

/**
 * Hook to get growth analytics
 */
export const useGetGrowthAnalytics = (orgId: string, dateRange: { from: Date; to: Date }) => {
  return useGetOrganizationDashboard({
    orgId,
    dateRange,
    includeGrowthTrends: true,
    includeEvents: false,
  });
};
