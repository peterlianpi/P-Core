// hooks/api/use-api-dynamic.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";
import { EndpointKey, endpointMap } from "../../lib/apis-endpoint";
import { QueryOf } from "../../types/param";

/** GET Hook */
export const useGetDynamic = <
  TEndpoint extends keyof EndpointParams, // ✅ Explicit constraint here
>(params: {
  endpoint: TEndpoint;
  queryKey?: unknown[];
  queryParams: QueryOf<TEndpoint>; // This now works because TEndpoint is guaranteed to match
}) => {
  const { endpoint, queryKey, queryParams } = params;
  const api = endpointMap[endpoint];

  return useQuery({
    queryKey: queryKey || [endpoint, queryParams],
    queryFn: async () => {
      if (!("$get" in api)) {
        throw new Error(
          `GET is not supported on endpoint: ${String(endpoint)}`
        );
      }

      const res = await api.$get({ query: queryParams });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });
};

/** POST Hook */
export const usePostDynamic = <TEndpoint extends EndpointKey>(params: {
  endpoint: TEndpoint;
  queryParams?: Record<string, unknown>;
  successMessage?: string;
}) => {
  const { endpoint, queryParams, successMessage } = params;
  const queryClient = useQueryClient();
  const api = endpointMap[endpoint];

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
      queryClient.invalidateQueries();
    },
    onError: () => toast.error("Failed to create"),
  });
};

/** PATCH Hook */
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
        json,
        query: queryParams,
        param: { id },
      });
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    },
    onSuccess: () => {
      toast.success(successMessage || "Updated successfully");
      queryClient.invalidateQueries();
    },
    onError: () => toast.error("Failed to update"),
  });
};

/** DELETE Hook */
export const useDeleteDynamic = <TEndpoint extends EndpointKey>(params: {
  endpoint: TEndpoint;
  id: string;
  queryParams?: Record<string, unknown>;
  successMessage?: string;
}) => {
  const { endpoint, id, queryParams, successMessage } = params;
  const queryClient = useQueryClient();
  const api = endpointMap[endpoint];

  return useMutation({
    mutationFn: async () => {
      const res = await api[":id"]["$delete"]({
        query: queryParams,
        param: { id },
      });
      if (!res.ok) throw new Error("Failed to delete");
      return res.json();
    },
    onSuccess: () => {
      toast.success(successMessage || "Deleted successfully");
      queryClient.invalidateQueries();
    },
    onError: () => toast.error("Failed to delete"),
  });
};

/** BULK CREATE Hook */
export const useBulkCreateDynamic = <TEndpoint extends EndpointKey>(params: {
  endpoint: TEndpoint;
  queryParams?: Record<string, unknown>;
  successMessage?: string;
}) => {
  const { endpoint, queryParams, successMessage } = params;
  const queryClient = useQueryClient();
  const api = endpointMap[endpoint];

  type Request = InferRequestType<(typeof api)["bulk-create"]["$post"]>["json"];
  type Response = InferResponseType<(typeof api)["bulk-create"]["$post"]>;

  return useMutation<Response, Error, Request>({
    mutationFn: async (json) => {
      const res = await api["bulk-create"]["$post"]({
        json,
        query: queryParams,
      });
      if (!res.ok) throw new Error("Bulk create failed");
      return res.json();
    },
    onSuccess: () => {
      toast.success(successMessage || "Bulk created successfully");
      queryClient.invalidateQueries();
    },
    onError: () => toast.error("Bulk create failed"),
  });
};
