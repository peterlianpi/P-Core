// Enhanced Choirs List Fetching Hook
// Music ministry management with member tracking and song repertoire
// Integrates with RLS-based security for automatic tenant isolation

import { useQuery } from "@tanstack/react-query";
import { client, apiUtils } from "@/lib/api/hono-client";
import type { InferResponseType } from "hono";

// Type inference for better TypeScript support
type ChoirsResponse = InferResponseType<typeof client.api.choirs["$get"]>;

export interface UseGetChoirsParams {
  orgId: string;
  take?: number;
  skip?: number;
  searchQuery?: string;
  isActive?: boolean;
  includeMemberCount?: boolean;
  includeSongCount?: boolean;
  includeUpcomingEvents?: boolean;
  enabled?: boolean;
}

/**
 * Hook to fetch choirs list with organization context
 * Features:
 * - Automatic tenant isolation via RLS
 * - Enhanced filtering by activity status
 * - Member and song count aggregation
 * - Upcoming events tracking
 * - Enhanced error handling with specific error types
 * - Pagination support
 * - Type-safe response handling
 * - Optimized caching strategy
 */
export const useGetChoirs = ({
  orgId,
  take = 20,
  skip = 0,
  searchQuery,
  isActive = true,
  includeMemberCount = true,
  includeSongCount = true,
  includeUpcomingEvents = false,
  enabled = true,
}: UseGetChoirsParams) => {
  const query = useQuery({
    // Enable query only if orgId is provided and enabled is true
    enabled: enabled && !!orgId,
    
    // Structured query key for better cache management
    queryKey: [
      "choirs", 
      { 
        orgId, 
        take, 
        skip, 
        searchQuery, 
        isActive,
        includeMemberCount,
        includeSongCount,
        includeUpcomingEvents
      }
    ] as const,
    
    // Enhanced query function with comprehensive error handling
    queryFn: async (): Promise<ChoirsResponse> => {
      // Validation
      if (!orgId) {
        throw new Error("Organization ID is required");
      }

      try {
        // Build query parameters
        const queryParams: Record<string, string> = {
          take: take.toString(),
          skip: skip.toString(),
          isActive: isActive.toString(),
          includeMemberCount: includeMemberCount.toString(),
          includeSongCount: includeSongCount.toString(),
          includeUpcomingEvents: includeUpcomingEvents.toString(),
        };

        // Add optional filters
        if (searchQuery) queryParams.searchQuery = searchQuery;

        // API request with RLS-enabled security context
        const response = await client.api.choirs.$get({
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
              throw new Error('You do not have access to view choirs');
            case 'INVALID_ORGANIZATION':
              throw new Error('Invalid organization context');
            case 'INVALID_PAGINATION':
              throw new Error('Invalid pagination parameters');
            case 'MUSIC_MINISTRY_NOT_ENABLED':
              throw new Error('Music ministry is not enabled for this organization');
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
    staleTime: 5 * 60 * 1000, // 5 minutes (choir data changes less frequently)
    gcTime: 15 * 60 * 1000,   // 15 minutes (formerly cacheTime)
    
    // Retry configuration for resilience
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (apiUtils.isAPIError(error) && error.apiError.statusCode < 500) {
        return false;
      }
      
      // Retry up to 3 times for server errors
      return failureCount < 3;
    },
    
    // Retry delay with exponential backoff
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    
    // Keep previous data when refetching (for better UX during pagination)
    placeholderData: (previousData) => previousData,
  });

  // Return enhanced query result with additional utilities
  return {
    ...query,
    
    // Convenience properties for common use cases
    choirs: query.data?.data || [],
    totalChoirs: query.data?.totalItems || 0,
    activeChoirs: query.data?.active || 0,
    inactiveChoirs: query.data?.inactive || 0,
    totalMembers: query.data?.totalMembers || 0,
    totalSongs: query.data?.totalSongs || 0,
    upcomingEvents: query.data?.upcomingEvents || [],
    
    // Voice part statistics
    voicePartStats: query.data?.voicePartStats || {
      soprano: 0,
      alto: 0,
      tenor: 0,
      bass: 0,
    },
    
    // Choir statistics
    choirStats: query.data?.choirStats || {
      averageMembersPerChoir: 0,
      averageSongsPerChoir: 0,
      mostActiveChoir: null,
      newestChoir: null,
    },
    
    // Pagination utilities
    hasNextPage: skip + take < (query.data?.totalItems || 0),
    hasPreviousPage: skip > 0,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil((query.data?.totalItems || 0) / take),
    
    // Filter utilities
    hasActiveFilter: isActive !== undefined,
    hasSearchFilter: !!searchQuery,
    
    // Error utilities
    errorMessage: query.error ? apiUtils.getErrorMessage(query.error) : undefined,
    errorCode: query.error ? apiUtils.getErrorCode(query.error) : undefined,
    isAccessDenied: apiUtils.isErrorCode(query.error, 'ACCESS_DENIED'),
    isInvalidPagination: apiUtils.isErrorCode(query.error, 'INVALID_PAGINATION'),
    isMusicMinistryNotEnabled: apiUtils.isErrorCode(query.error, 'MUSIC_MINISTRY_NOT_ENABLED'),
  };
};

// Additional specialized hooks for common use cases

/**
 * Hook to get active choirs only
 */
export const useGetActiveChoirs = (orgId: string) => {
  return useGetChoirs({ 
    orgId, 
    isActive: true,
    take: 50, // Most organizations won't have too many active choirs
  });
};

/**
 * Hook to get choir statistics
 */
export const useGetChoirStats = (orgId: string) => {
  return useGetChoirs({ 
    orgId, 
    take: 1, // We only need the stats, not the actual choirs
    includeMemberCount: true,
    includeSongCount: true,
    includeUpcomingEvents: true,
  });
};

/**
 * Hook to get choirs with upcoming events
 */
export const useGetChoirsWithEvents = (orgId: string) => {
  return useGetChoirs({ 
    orgId, 
    isActive: true,
    includeUpcomingEvents: true,
    take: 100, // Get all active choirs with events
  });
};

/**
 * Hook to search choirs by name
 */
export const useSearchChoirs = (orgId: string, searchQuery: string) => {
  return useGetChoirs({ 
    orgId, 
    searchQuery,
    enabled: !!searchQuery && searchQuery.length >= 2, // Only search if query is at least 2 characters
    take: 20,
  });
};
