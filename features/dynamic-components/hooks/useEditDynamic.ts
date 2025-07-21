import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditDynamic = <TRequest, TResponse>({
  endpoint,
  id,
  queryParams,
  invalidateKeys = [],
}: {
  endpoint: string;
  id: string;
  queryParams?: Record<string, unknown>;
  invalidateKeys?: readonly (readonly unknown[])[];
}) => {
  const queryClient = useQueryClient();

  return useMutation<TResponse, Error, TRequest>({
    mutationFn: async (json) => {
      const res = await client.api[endpoint][":id"]["$patch"]({
        json,
        param: { id },
        query: queryParams,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          (errorData as { error?: string })?.error || "Unknown error"
        );
      }

      return res.json();
    },
    onSuccess: () => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
    },
  });
};
