import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client, { apiUtils } from "@/lib/api/hono-client";

type ResponseType = InferResponseType<typeof client.api.courses.$post>;
type RequestType = InferRequestType<typeof client.api.courses.$post>["json"];

export const useCreateCourse = ({ orgId }: { orgId: string }) => {
  // userId is passed as a parameter
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      // Include userId in the request payload (json)
      const response = await client.api.courses.$post({
        query: { orgId },
        json,
      });

      // Use the unified error handling and parsing utilities
      return await apiUtils.safeParseResponse(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", { orgId }] });
      queryClient.invalidateQueries({ queryKey: ["courses", { orgId }] });
    },
  });

  return mutation;
};
