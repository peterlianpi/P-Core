import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client, { apiUtils } from "@/lib/api/hono-client";

type ResponseType = InferResponseType<
  (typeof client.api.schedules)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.schedules)[":id"]["$patch"]
>["json"];

export const useEditSchedule = ({
  orgId,
  id,
}: {
  orgId: string;
  id: string;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.schedules[":id"]["$patch"]({
        json,
        query: {
          orgId,
        },
        param: {
          id,
        },
      });
      // Use the unified error handling and parsing utilities
      return await apiUtils.safeParseResponse(response);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule", { id, orgId }] });
      queryClient.invalidateQueries({ queryKey: ["schedules", { orgId }] });
    },
  });
  return mutation;
};
