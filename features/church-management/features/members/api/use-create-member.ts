// Enhanced Member Creation Hook
// Church member management with family relationships and role assignment
// Integrates with RLS-based security for automatic tenant isolation

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client, apiUtils } from "@/lib/api/hono-client";
import type { InferRequestType, InferResponseType } from "hono";

// Type inference for better TypeScript support
type CreateMemberRequest = InferRequestType<typeof client.api.members["$post"]>["json"];
type CreateMemberResponse = InferResponseType<typeof client.api.members["$post"]>;

export interface UseCreateMemberParams {
  orgId: string;
  onSuccess?: (data: CreateMemberResponse) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook to create a new church member with organization context
 * Features:
 * - Automatic tenant isolation via RLS
 * - Enhanced error handling with specific error types
 * - Family relationship creation
 * - Role assignment during creation
 * - Optimistic cache updates
 * - Toast notifications for user feedback
 * - Type-safe request/response handling
 * - Home assignment and geographic organization
 */
export const useCreateMember = ({ 
  orgId, 
  onSuccess,
  onError 
}: UseCreateMemberParams) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<CreateMemberResponse, Error, CreateMemberRequest>({
    mutationFn: async (memberData) => {
      // Validation
      if (!orgId) {
        throw new Error("Organization ID is required");
      }

      try {
        // API request with RLS-enabled security context
        const response = await client.api.members.$post({
          query: apiUtils.createOrgQuery(orgId),
          json: memberData,
        });

        // The client now handles error responses automatically
        return await response.json();

      } catch (error) {
        // Enhanced error handling with specific error types
        if (apiUtils.isAPIError(error)) {
          const errorCode = apiUtils.getErrorCode(error);
          
          switch (errorCode) {
            case 'EMAIL_ALREADY_EXISTS':
              throw new Error('A member with this email already exists');
            case 'PHONE_ALREADY_EXISTS':
              throw new Error('A member with this phone number already exists');
            case 'INVALID_HOME':
              throw new Error('The selected home does not exist or is not accessible');
            case 'INVALID_ROLE':
              throw new Error('The selected role is not valid for this organization');
            case 'INVALID_SPOUSE':
              throw new Error('The selected spouse is not valid or already married');
            case 'INVALID_FAMILY_RELATIONSHIP':
              throw new Error('Invalid family relationship specified');
            case 'VALIDATION_ERROR':
              throw new Error('Please check all required fields are filled correctly');
            case 'ACCESS_DENIED':
              throw new Error('You do not have permission to create members');
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
      toast.success("Church member created successfully");

      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ 
        queryKey: ["members", { orgId }] 
      });
      
      queryClient.invalidateQueries({ 
        queryKey: ["members", "search", { orgId }] 
      });
      
      queryClient.invalidateQueries({ 
        queryKey: ["members", "stats", { orgId }] 
      });

      // Invalidate home-related queries if member assigned to home
      if (data.homeId) {
        queryClient.invalidateQueries({ 
          queryKey: ["members", { orgId, homeId: data.homeId }] 
        });
        
        queryClient.invalidateQueries({ 
          queryKey: ["homes", { orgId }] 
        });
      }

      // Invalidate role-related queries if roles assigned
      if (data.roles && data.roles.length > 0) {
        data.roles.forEach(roleAssignment => {
          queryClient.invalidateQueries({ 
            queryKey: ["members", { orgId, roleId: roleAssignment.roleId }] 
          });
        });
        
        queryClient.invalidateQueries({ 
          queryKey: ["roles", { orgId }] 
        });
      }

      // Invalidate family-related queries if family relationships created
      if (data.familyRelationships && data.familyRelationships.length > 0) {
        queryClient.invalidateQueries({ 
          queryKey: ["family-relationships", { orgId }] 
        });
      }

      // Optimistically add the new member to the cache
      queryClient.setQueryData(
        ["member", { id: data.id, orgId }],
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
        console.error('Create member error:', error);
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
    createMember: mutation.mutate,
    createMemberAsync: mutation.mutateAsync,
    
    // Error utilities
    errorMessage: mutation.error ? apiUtils.getErrorMessage(mutation.error) : undefined,
    errorCode: mutation.error ? apiUtils.getErrorCode(mutation.error) : undefined,
    isEmailConflict: apiUtils.isErrorCode(mutation.error, 'EMAIL_ALREADY_EXISTS'),
    isPhoneConflict: apiUtils.isErrorCode(mutation.error, 'PHONE_ALREADY_EXISTS'),
    isInvalidHome: apiUtils.isErrorCode(mutation.error, 'INVALID_HOME'),
    isInvalidRole: apiUtils.isErrorCode(mutation.error, 'INVALID_ROLE'),
    isInvalidSpouse: apiUtils.isErrorCode(mutation.error, 'INVALID_SPOUSE'),
    isInvalidFamily: apiUtils.isErrorCode(mutation.error, 'INVALID_FAMILY_RELATIONSHIP'),
    isValidationError: apiUtils.isErrorCode(mutation.error, 'VALIDATION_ERROR'),
    isAccessDenied: apiUtils.isErrorCode(mutation.error, 'ACCESS_DENIED'),
  };
};

// Specialized hook for creating member with family relationships
export const useCreateMemberWithFamily = ({ 
  orgId, 
  onSuccess,
  onError 
}: UseCreateMemberParams) => {
  const createMember = useCreateMember({ orgId, onSuccess, onError });
  
  return {
    ...createMember,
    
    // Helper method for creating member with family context
    createWithFamily: (memberData: CreateMemberRequest & {
      familyRelationships?: Array<{
        relatedMemberId: string;
        relationshipTypeId: string;
        isReciprocalCreated?: boolean;
      }>;
    }) => {
      return createMember.createMemberAsync(memberData);
    }
  };
};

// Specialized hook for creating member with spouse
export const useCreateMemberWithSpouse = ({ 
  orgId, 
  onSuccess,
  onError 
}: UseCreateMemberParams) => {
  const createMember = useCreateMember({ orgId, onSuccess, onError });
  
  return {
    ...createMember,
    
    // Helper method for creating member with spouse
    createWithSpouse: (memberData: CreateMemberRequest & {
      spouseId?: string;
    }) => {
      return createMember.createMemberAsync(memberData);
    }
  };
};
