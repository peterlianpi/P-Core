// Image upload hooks using Hono client and React Query
// This file follows the feature-based structure and mirrors the useCreateFeedback pattern

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  ImageUploadInput,
  ImageOwnerType,
  ImageFeature
} from "@/lib/schemas/image-schemas";
import client from "@/lib/api/hono-client";

// Query keys for React Query cache management
export const imageKeys = {
  all: ["images"] as const,
  lists: () => [...imageKeys.all, "list"] as const,
  list: (params: Partial<ImageUploadInput>) => [...imageKeys.lists(), params] as const,
  entity: (ownerType: ImageOwnerType, ownerId: string) =>
    [...imageKeys.all, "entity", ownerType, ownerId] as const,
};

/**
 * useUploadImage - React Query mutation for uploading images using Hono client
 * @returns mutation object from useMutation
 */
export function useUploadImage() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    // Use Hono client to POST image upload
    mutationFn: async (json: ImageUploadInput) => {
      // Log the payload before sending
      console.log("[HOOK] useUploadImage - payload:", json);
      // POST to the Hono API route for image upload
      const response = await client.api["upload-image"].$post({
        json,
      });
      // Log the raw response object
      console.log("[HOOK] useUploadImage - raw response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[HOOK] useUploadImage - errorData:", errorData);
        throw new Error(errorData?.error || "Unknown error occurred");
      }

      const data = await response.json();
      console.log("[HOOK] useUploadImage - response data:", data);
      return data;
    },
    onSuccess: (data, variables) => {
      // Invalidate relevant queries to refresh UI
      queryClient.invalidateQueries({
        queryKey: imageKeys.entity(variables.ownerType, variables.ownerId),
      });
      queryClient.invalidateQueries({ queryKey: imageKeys.lists() });
      toast.success("Image uploaded successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to upload image");
    },
  });

  return mutation;
}

// Utility function to convert File to base64 data URL
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * useFileImageUpload - Helper for uploading File objects
 * @returns uploadFile function and mutation state
 */
export function useFileImageUpload() {
  const uploadMutation = useUploadImage();

  const uploadFile = async (
    file: File,
    ownerType: ImageOwnerType,
    ownerId: string,
    feature: ImageFeature = "profile"
  ) => {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Image size must be less than 10MB');
      }
      // Convert to base64
      const imageData = await fileToBase64(file);
      // Upload
      return uploadMutation.mutateAsync({
        imageData,
        ownerType,
        ownerId,
        feature,
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload image');
      throw error;
    }
  };

  return {
    uploadFile,
    isUploading: uploadMutation.isPending,
    error: uploadMutation.error,
  };
}
