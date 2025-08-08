import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client, apiUtils } from "@/lib/api/hono-client";

// Type inference for request/response
// Assumes your Hono route is client.api.version.$post
export type ResponseType = InferResponseType<typeof client.api.version.$post>;
export type RequestType = InferRequestType<typeof client.api.version.$post>["json"];

/**
 * useCreateVersion - React Query mutation for creating a version using Hono client
 * Version management is global (not org-specific)
 */
export function useCreateVersion() {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.version.$post({ json });
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
