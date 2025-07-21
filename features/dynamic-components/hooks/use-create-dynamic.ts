import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { EndpointKey, endpointMap } from "../lib/apis-endpoint";

export const usePostDynamic = <TEndpoint extends EndpointKey>(params: {
  endpoint: TEndpoint;
  queryParams?: Record<string, unknown>;
  successMessage?: string;
  onSuccessInvalidateKeys?: unknown[];
}) => {
  const { endpoint, queryParams, successMessage, onSuccessInvalidateKeys } =
    params;
  const queryClient = useQueryClient();
  const api = endpointMap[endpoint];

  if (!("$post" in api)) {
    throw new Error(`POST is not supported on endpoint: ${String(endpoint)}`);
  }

  type Request = InferRequestType<(typeof api)["$post"]>["json"];
  type Response = InferResponseType<(typeof api)["$post"]>;

  return useMutation<Response, Error, Request>({
    mutationFn: async (json) => {
      const res = await api.$post({ json, query: queryParams });
      if (!res.ok) throw new Error("Failed to post");
      return res.json();
    },
    onSuccess: () => {
      toast.success(successMessage || "Created successfully");
      if (onSuccessInvalidateKeys && onSuccessInvalidateKeys.length > 0) {
        onSuccessInvalidateKeys.forEach((key) =>
          queryClient.invalidateQueries(key)
        );
      } else {
        queryClient.invalidateQueries([endpoint]);
      }
    },
    onError: () => toast.error("Failed to create"),
  });
};
