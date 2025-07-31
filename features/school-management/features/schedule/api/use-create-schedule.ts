import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/api/hono-client";

type ResponseType = InferResponseType<typeof client.api.schedules.$post>;
type RequestType = InferRequestType<typeof client.api.schedules.$post>["json"];

export const useCreateSchedule = ({ orgId }: { orgId: string }) => {
  // userId is passed as a parameter
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      // Include userId in the request payload (json)
      const response = await client.api.schedules.$post({
        query: { orgId },
        json,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          (errorData as ErrorResponse)?.error || "Unknown error occurred"
        );
      }

      const data = await response.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule", { orgId }] });
      queryClient.invalidateQueries({ queryKey: ["schedules", { orgId }] });
    },
  });

  return mutation;
};
