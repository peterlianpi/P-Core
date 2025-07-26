// Enhanced Dashboard Activity Hook
// Uses new unified API client with improved error handling and type safety
// Integrates with RLS-based security for automatic tenant isolation

import { useQuery } from "@tanstack/react-query";
import { client, apiUtils } from "@/lib/api/hono-client";
import type { InferResponseType } from "hono";

// Type inference for better TypeScript support
type DashboardActivityResponse = InferResponseType<
  (typeof client.api.dashboard.activity)["$get"]
>;

export interface ActivityQueryParams {
  orgId: string;
  limit?: number;
  offset?: number;
  types?: string[];
  timeRange?: "today" | "week" | "month";
  enabled?: boolean;
}

// Query keys
export const dashboardActivityKeys = {
  all: ["dashboard", "activity"] as const,
  lists: () => [...dashboardActivityKeys.all, "list"] as const,
  list: (params: ActivityQueryParams) =>
    [...dashboardActivityKeys.lists(), params] as const,
};

// Hooks
export function useDashboardActivity(params: ActivityQueryParams = { orgId }) {
  return useQuery({
    queryKey: dashboardActivityKeys.list(params),
    queryFn: () => api.getDashboardActivity(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Export the function that the components are looking for
export const getDashboardActivity = api.getDashboardActivity;
