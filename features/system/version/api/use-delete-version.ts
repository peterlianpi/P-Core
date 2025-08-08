import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/api/hono-client";

/**
 * useDeleteVersion - React Query mutation for deleting a version using Hono client
 * Version management is global (not org-specific)
 */
export function useDeleteVersion() {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      const response = await client.api.version[":id"].$delete({
        param: { id },
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
