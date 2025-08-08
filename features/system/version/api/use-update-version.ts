import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/api/hono-client";

// Explicitly define the update payload type
export type UpdateVersionPayload = {
  id: string;
  version?: string;
  name?: string;
  description?: string;
  releaseDate?: Date;
  status?: "DEVELOPMENT" | "TESTING" | "STAGING" | "PRODUCTION" | "DEPRECATED";
  createdBy?: string;
};

/**
 * useUpdateVersion - React Query mutation for updating a version using Hono client
 * Version management is global (not org-specific)
 */
export function useUpdateVersion() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdateVersionPayload>({
    mutationFn: async ({ id, ...json }) => {
      const response = await client.api.version[":id"].$patch({
        param: { id },
        json,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as { error?: string })?.error || "Unknown error occurred"
        );
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["versions"] });
    },
  });
}
