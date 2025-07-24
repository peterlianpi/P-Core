// Enhanced Student Data Fetching Hook
// Uses new unified API client with improved error handling and type safety
// Integrates with RLS-based security for automatic tenant isolation

import { useQuery } from "@tanstack/react-query";
import { client, apiUtils, APIClientError } from "@/lib/api/hono-client";
import type { InferResponseType } from "hono";

// Type inference for better TypeScript support
type StudentResponse = InferResponseType<typeof client.api.students[":id"]["$get"]>;

export interface UseGetStudentParams {
  id: string;
  orgId: string;
  enabled?: boolean; // Allow external control of query execution
}

/**
 * Hook to fetch student data by ID with organization context
 * Features:
 * - Automatic tenant isolation via RLS
 * - Enhanced error handling with specific error types
 * - Type-safe response handling
 * - Optimized caching strategy
 */
export const useGetStudentByIdAndOrgId = ({
  id,
  orgId,
  enabled = true,
}: UseGetStudentParams) => {
  const query = useQuery({
    // Enable query only if both ID and orgId are provided and enabled is true
    enabled: enabled && !!id && !!orgId,
    
    // Structured query key for better cache management
    queryKey: ["student", { id, orgId }] as const,
    
    // Enhanced query function with comprehensive error handling
    queryFn: async (): Promise<StudentResponse> => {
      // Validation
      if (!id) {
        throw new Error("Student ID is required");
      }
      
      if (!orgId) {
        throw new Error("Organization ID is required");
      }

      try {
        // API request with RLS-enabled security context
        const response = await client.api.students[":id"].$get({
          query: apiUtils.createOrgQuery(orgId),
          param: { id },
        });

        // The client now handles error responses automatically
        return await response.json();

      } catch (error) {
        // Enhanced error handling with specific error types
        if (apiUtils.isAPIError(error)) {
          // Handle specific API error codes
          const errorCode = apiUtils.getErrorCode(error);
          
          switch (errorCode) {
            case 'STUDENT_NOT_FOUND':
              throw new Error(`Student with ID ${id} not found`);
            case 'ACCESS_DENIED':
              throw new Error('You do not have access to this student');
            case 'INVALID_ORGANIZATION':
              throw new Error('Invalid organization context');
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
    staleTime: 5 * 60 * 1000, // 5 minutes
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
  });

  // Return enhanced query result with additional utilities
  return {
    ...query,
    
    // Convenience properties for common use cases
    student: query.data,
    isStudent: !!query.data,
    
    // Error utilities
    errorMessage: query.error ? apiUtils.getErrorMessage(query.error) : undefined,
    errorCode: query.error ? apiUtils.getErrorCode(query.error) : undefined,
    isNotFound: apiUtils.isErrorCode(query.error, 'STUDENT_NOT_FOUND'),
    isAccessDenied: apiUtils.isErrorCode(query.error, 'ACCESS_DENIED'),
  };
};
