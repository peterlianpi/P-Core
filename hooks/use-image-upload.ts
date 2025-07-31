// Modern client-side image upload hook using the new standardized API
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  ImageUploadInput,
  ImageDeleteInput,
  ImageListInput,
  ImageOwnerType,
  ImageFeature
} from "@/lib/schemas/image-schemas";

// API functions for image operations
async function uploadImage(data: ImageUploadInput) {
  const response = await fetch("/api/upload-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to upload image");
  }

  return response.json();
}

async function deleteImage(data: ImageDeleteInput) {
  const response = await fetch("/api/upload-image", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete image");
  }

  return response.json();
}

async function fetchImages(params: ImageListInput) {
  const queryParams = new URLSearchParams();

  if (params.ownerType) queryParams.set("ownerType", params.ownerType);
  if (params.ownerId) queryParams.set("ownerId", params.ownerId);
  if (params.feature) queryParams.set("feature", params.feature);
  if (params.page) queryParams.set("page", params.page.toString());
  if (params.limit) queryParams.set("limit", params.limit.toString());

  const response = await fetch(`/api/upload-image?${queryParams.toString()}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch images");
  }

  return response.json();
}

async function updateImage(imageId: string, imageData: string, feature?: string) {
  const response = await fetch(`/api/upload-image/${imageId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageData, feature }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update image");
  }

  return response.json();
}

// Query keys for React Query cache management
export const imageKeys = {
  all: ["images"] as const,
  lists: () => [...imageKeys.all, "list"] as const,
  list: (params: Partial<ImageListInput>) => [...imageKeys.lists(), params] as const,
  entity: (ownerType: ImageOwnerType, ownerId: string) =>
    [...imageKeys.all, "entity", ownerType, ownerId] as const,
};

// Hook for uploading images
export function useImageUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadImage,
    onSuccess: (data, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: imageKeys.entity(variables.ownerType, variables.ownerId)
      });
      queryClient.invalidateQueries({ queryKey: imageKeys.lists() });

      toast.success("Image uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload image");
    },
  });
}

// Hook for deleting images
export function useImageDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      // Invalidate all image queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: imageKeys.all });
      toast.success("Image deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete image");
    },
  });
}

// Hook for updating images
export function useImageUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ imageId, imageData, feature }: {
      imageId: string;
      imageData: string;
      feature?: string;
    }) => updateImage(imageId, imageData, feature),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: imageKeys.all });
      toast.success("Image updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update image");
    },
  });
}

// Hook for fetching images
export function useImages(params: ImageListInput) {
  return useQuery({
    queryKey: imageKeys.list(params),
    queryFn: () => fetchImages(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!(params.ownerType && params.ownerId), // Only fetch if we have required params
  });
}

// Hook for getting a single entity's images
export function useEntityImages(
  ownerType: ImageOwnerType,
  ownerId: string,
  feature?: ImageFeature
) {
  return useImages({
    ownerType,
    ownerId,
    feature,
    page: 1,
    limit: 50,
  });
}

// Hook for getting primary image (first image of specified feature)
export function usePrimaryImage(
  ownerType: ImageOwnerType,
  ownerId: string,
  feature: ImageFeature = "profile"
) {
  const { data, ...rest } = useEntityImages(ownerType, ownerId, feature);

  const primaryImage = data?.success ? data.data[0] : null;

  return {
    data: primaryImage,
    imageUrl: primaryImage?.url || null,
    ...rest,
  };
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

// Utility function for easy image upload from File input
export function useFileImageUpload() {
  const uploadMutation = useImageUpload();

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
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to upload image');
      throw error;
    }
  };

  return {
    uploadFile,
    isUploading: uploadMutation.isPending,
    error: uploadMutation.error,
  };
}
