// hooks/use-patch-dynamic.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { EndpointKey, endpointMap } from "../lib/apis-endpoint";

export const usePatchDynamic = <TEndpoint extends EndpointKey>(params: {
  endpoint: TEndpoint;
  id: string;
  queryParams?: Record<string, unknown>;
  successMessage?: string;
}) => {
  const { endpoint, id, queryParams, successMessage } = params;
  const queryClient = useQueryClient();
  const api = endpointMap[endpoint];

  type Request = InferRequestType<(typeof api)[":id"]["$patch"]>["json"];
  type Response = InferResponseType<(typeof api)[":id"]["$patch"]>;

  return useMutation<Response, Error, Request>({
    mutationFn: async (json) => {
      const res = await api[":id"]["$patch"]({
        param: { id },
        query: queryParams,
        json,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error((error as any)?.error || "Unknown error");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success(successMessage || "Updated successfully");
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("Update failed");
    },
  });
};
