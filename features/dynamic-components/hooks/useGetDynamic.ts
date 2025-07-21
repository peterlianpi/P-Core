import { useQuery } from "@tanstack/react-query";
import { EndpointKey, endpointMap } from "../lib/apis-endpoint";

export const useGetDynamic = <TEndpoint extends EndpointKey>(params: {
  endpoint: TEndpoint;
  queryKey?: unknown[];
  queryParams?: Record<string, unknown>;
}) => {
  const { endpoint, queryKey, queryParams } = params;
  const api = endpointMap[endpoint];

  if (!("$get" in api)) {
    throw new Error(`GET is not supported on endpoint: ${String(endpoint)}`);
  }

  return useQuery({
    queryKey: queryKey || [endpoint, queryParams],
    queryFn: async () => {
      const res = await api.$get({ query: queryParams });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });
};
