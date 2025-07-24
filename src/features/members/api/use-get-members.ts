// Enhanced Members List Fetching Hook
// Church member management with family relationships and role tracking
// Integrates with RLS-based security for automatic tenant isolation

import { useQuery } from "@tanstack/react-query";
import { client, apiUtils } from "@/lib/api/hono-client";
import type { InferResponseType } from "hono";

// Type inference for better TypeScript support
type MembersResponse = InferResponseType<typeof client.api.members["$get"]>;

export interface UseGetMembersParams {
  orgId: string;
  take?: number;
  skip?: number;
  searchQuery?: string;
  homeId?: string;
  vengId?: string;
  khawkId?: string;
  roleId?: string;
  isActive?: boolean;
  enabled?: boolean;
}

/**
 * Hook to fetch church members list with organization context
 * Features:
 * - Automatic tenant isolation via RLS
 * - Enhanced filtering by home, veng, khawk, role
 * - Family relationship tracking
 * - Enhanced error handling with specific error types
 * - Pagination support
 * - Type-safe response handling
 * - Optimized caching strategy
 */
export const useGetMembers = ({
  orgId,
  take = 20,
  skip = 0,
  searchQuery,
  homeId,
  vengId,
  khawkId,
  roleId,
  isActive = true,
  enabled = true,
}: UseGetMembersParams) => {
  const query = useQuery({
    // Enable query only if orgId is provided and enabled is true
    enabled: enabled && !!orgId,
    
    // Structured query key for better cache management
    queryKey: [
      "members", 
      { 
        orgId, 
        take, 
        skip, 
        searchQuery, 
        homeId, 
        vengId, 
        khawkId, 
        roleId, 
        isActive 
      }
    ] as const,
    
    // Enhanced query function with comprehensive error handling
    queryFn: async (): Promise<MembersResponse> => {
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
        };

        // Add optional filters
        if (searchQuery) queryParams.searchQuery = searchQuery;
        if (homeId) queryParams.homeId = homeId;
        if (vengId) queryParams.vengId = vengId;
        if (khawkId) queryParams.khawkId = khawkId;
        if (roleId) queryParams.roleId = roleId;

        // API request with RLS-enabled security context
        const response = await client.api.members.$get({
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
              throw new Error('You do not have access to view church members');
            case 'INVALID_ORGANIZATION':
              throw new Error('Invalid organization context');
            case 'INVALID_PAGINATION':
              throw new Error('Invalid pagination parameters');
            case 'INVALID_FILTER':
              throw new Error('Invalid filter parameters');
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
    staleTime: 3 * 60 * 1000, // 3 minutes (member data changes less frequently)
    gcTime: 10 * 60 * 1000,   // 10 minutes (formerly cacheTime)
    
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
    members: query.data?.data || [],
    totalMembers: query.data?.totalItems || 0,
    activeMembers: query.data?.active || 0,
    inactiveMembers: query.data?.inactive || 0,
    homeStats: query.data?.homeStats || {},
    vengStats: query.data?.vengStats || {},
    khawkStats: query.data?.khawkStats || {},
    
    // Pagination utilities
    hasNextPage: skip + take < (query.data?.totalItems || 0),
    hasPreviousPage: skip > 0,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil((query.data?.totalItems || 0) / take),
    
    // Filter utilities
    hasActiveFilter: isActive !== undefined,
    hasSearchFilter: !!searchQuery,
    hasLocationFilter: !!(homeId || vengId || khawkId),
    hasRoleFilter: !!roleId,
    
    // Error utilities
    errorMessage: query.error ? apiUtils.getErrorMessage(query.error) : undefined,
    errorCode: query.error ? apiUtils.getErrorCode(query.error) : undefined,
    isAccessDenied: apiUtils.isErrorCode(query.error, 'ACCESS_DENIED'),
    isInvalidPagination: apiUtils.isErrorCode(query.error, 'INVALID_PAGINATION'),
    isInvalidFilter: apiUtils.isErrorCode(query.error, 'INVALID_FILTER'),
  };
};

// Additional specialized hooks for common use cases

/**
 * Hook to get members by home
 */
export const useGetMembersByHome = (orgId: string, homeId: string) => {
  return useGetMembers({ 
    orgId, 
    homeId, 
    enabled: !!homeId,
    take: 50 // Homes typically don't have too many members
  });
};

/**
 * Hook to get members by role
 */
export const useGetMembersByRole = (orgId: string, roleId: string) => {
  return useGetMembers({ 
    orgId, 
    roleId, 
    enabled: !!roleId,
    take: 100 // Roles can have many members
  });
};

/**
 * Hook to get family members
 */
export const useGetFamilyMembers = (orgId: string, homeId: string) => {
  return useGetMembers({ 
    orgId, 
    homeId, 
    enabled: !!homeId,
    take: 20 // Families are usually smaller
  });
};
