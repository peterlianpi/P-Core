// Enhanced Student Creation Hook
// Uses new unified API client with improved error handling and type safety
// Integrates with RLS-based security for automatic tenant isolation

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client, apiUtils } from "@/lib/api/hono-client";
import type { InferRequestType, InferResponseType } from "hono";

// Type inference for better TypeScript support
type CreateStudentRequest = InferRequestType<typeof client.api.students["$post"]>["json"];
type CreateStudentResponse = InferResponseType<typeof client.api.students["$post"]>;

export interface UseCreateStudentParams {
  orgId: string;
  onSuccess?: (data: CreateStudentResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook to create a new student with organization context
 * Features:
 * - Automatic tenant isolation via RLS
 * - Enhanced error handling with specific error types
 * - Optimistic cache updates
 * - Toast notifications for user feedback
 * - Type-safe request/response handling
 */
export const useCreateStudent = ({ 
  orgId, 
  onSuccess,
  onError 
}: UseCreateStudentParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<CreateStudentResponse, Error, CreateStudentRequest>({
    mutationFn: async (studentData) => {
      // Validation
      if (!orgId) {
        throw new Error("Organization ID is required");
      }

      try {
        // API request with RLS-enabled security context
        const response = await client.api.students.$post({
          query: apiUtils.createOrgQuery(orgId),
          json: studentData,
        });

        // The client now handles error responses automatically
        return await response.json();

      } catch (error) {
        // Enhanced error handling with specific error types
        if (apiUtils.isAPIError(error)) {
          const errorCode = apiUtils.getErrorCode(error);
          
          switch (errorCode) {
            case 'EMAIL_ALREADY_EXISTS':
              throw new Error('A student with this email already exists');
            case 'PHONE_ALREADY_EXISTS':
              throw new Error('A student with this phone number already exists');
            case 'VALIDATION_ERROR':
              throw new Error('Please check all required fields are filled correctly');
            case 'ACCESS_DENIED':
              throw new Error('You do not have permission to create students');
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

    onSuccess: (data) => {
      // Show success notification
      toast.success("Student created successfully");

      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ 
        queryKey: ["students", { orgId }] 
      });
      
      queryClient.invalidateQueries({ 
        queryKey: ["students", "search", { orgId }] 
      });
      
      queryClient.invalidateQueries({ 
        queryKey: ["students", "stats", { orgId }] 
      });

      // Optimistically add the new student to the cache
      queryClient.setQueryData(
        ["student", { id: data.id, orgId }],
        data
      );

      // Call custom success handler if provided
      onSuccess?.(data);
    },

    onError: (error) => {
      // Show error notification with specific message
      const errorMessage = apiUtils.getErrorMessage(error);
      toast.error(errorMessage);

      // Log error for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Create student error:', error);
      }

      // Call custom error handler if provided
      onError?.(error);
    },

    // Retry configuration for resilience
    retry: (failureCount, error) => {
      // Don't retry on client errors (4xx)
      if (apiUtils.isAPIError(error) && error.apiError.statusCode < 500) {
        return false;
      }
      
      // Retry up to 2 times for server errors
      return failureCount < 2;
    },

    // Retry delay with exponential backoff
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
  });

  // Return enhanced mutation result with additional utilities
  return {
    ...mutation,
    
    // Convenience properties for common use cases
    createStudent: mutation.mutate,
    createStudentAsync: mutation.mutateAsync,
    
    // Error utilities
    errorMessage: mutation.error ? apiUtils.getErrorMessage(mutation.error) : undefined,
    errorCode: mutation.error ? apiUtils.getErrorCode(mutation.error) : undefined,
    isEmailConflict: apiUtils.isErrorCode(mutation.error, 'EMAIL_ALREADY_EXISTS'),
    isPhoneConflict: apiUtils.isErrorCode(mutation.error, 'PHONE_ALREADY_EXISTS'),
    isValidationError: apiUtils.isErrorCode(mutation.error, 'VALIDATION_ERROR'),
    isAccessDenied: apiUtils.isErrorCode(mutation.error, 'ACCESS_DENIED'),
  };
};
