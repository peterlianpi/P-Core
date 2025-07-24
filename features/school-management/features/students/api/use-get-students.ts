// Enhanced Students List Fetching Hook
// Uses new unified API client with improved error handling and type safety
// Integrates with RLS-based security for automatic tenant isolation

import { useQuery } from "@tanstack/react-query";
import { client, apiUtils } from "@/lib/api/hono-client";
import type { InferResponseType } from "hono";

// Type inference for better TypeScript support
type StudentsResponse = InferResponseType<typeof client.api.students["$get"]>;

export interface UseGetStudentsParams {
  orgId: string;
  take?: number;
  skip?: number;
  enabled?: boolean;
}

/**
 * Hook to fetch students list with organization context
 * Features:
 * - Automatic tenant isolation via RLS
 * - Enhanced error handling with specific error types
 * - Pagination support
 * - Type-safe response handling
 * - Optimized caching strategy
 */
export const useGetStudents = ({
  orgId,
  take = 10,
  skip = 0,
  enabled = true,
}: UseGetStudentsParams) => {
  const query = useQuery({
    // Enable query only if orgId is provided and enabled is true
    enabled: enabled && !!orgId,
    
    // Structured query key for better cache management
    queryKey: ["students", { orgId, take, skip }] as const,
    
    // Enhanced query function with comprehensive error handling
    queryFn: async (): Promise<StudentsResponse> => {
      // Validation
      if (!orgId) {
        throw new Error("Organization ID is required");
      }

      try {
        // API request with RLS-enabled security context
        const response = await client.api.students.$get({
          query: apiUtils.createOrgQuery(orgId, {
            take: take.toString(),
            skip: skip.toString(),
          }),
        });

        // The client now handles error responses automatically
        return await response.json();

      } catch (error) {
        // Enhanced error handling with specific error types
        if (apiUtils.isAPIError(error)) {
          const errorCode = apiUtils.getErrorCode(error);
          
          switch (errorCode) {
            case 'ACCESS_DENIED':
              throw new Error('You do not have access to view students');
            case 'INVALID_ORGANIZATION':
              throw new Error('Invalid organization context');
            case 'INVALID_PAGINATION':
              throw new Error('Invalid pagination parameters');
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
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000,    // 5 minutes (formerly cacheTime)
    
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
    students: query.data?.data || [],
    totalItems: query.data?.totalItems || 0,
    activeCount: query.data?.active || 0,
    archivedCount: query.data?.archived || 0,
    
    // Pagination utilities
    hasNextPage: skip + take < (query.data?.totalItems || 0),
    hasPreviousPage: skip > 0,
    currentPage: Math.floor(skip / take) + 1,
    totalPages: Math.ceil((query.data?.totalItems || 0) / take),
    
    // Error utilities
    errorMessage: query.error ? apiUtils.getErrorMessage(query.error) : undefined,
    errorCode: query.error ? apiUtils.getErrorCode(query.error) : undefined,
    isAccessDenied: apiUtils.isErrorCode(query.error, 'ACCESS_DENIED'),
    isInvalidPagination: apiUtils.isErrorCode(query.error, 'INVALID_PAGINATION'),
  };
};
