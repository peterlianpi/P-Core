import { useQuery } from "@tanstack/react-query";

export interface ActivityQueryParams {
  orgId: string;
  limit?: number;
  offset?: number;
  types?: string[];
  timeRange?: "today" | "week" | "month";
}

export interface DashboardActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  user: { name: string };
  timestamp: Date;
  metadata: Record<string, unknown>;
}

// Query keys
export const dashboardActivityKeys = {
  all: ["dashboard", "activity"] as const,
  lists: () => [...dashboardActivityKeys.all, "list"] as const,
  list: (params: ActivityQueryParams) =>
    [...dashboardActivityKeys.lists(), params] as const,
};

// API function using fetch
async function getDashboardActivity(params: ActivityQueryParams): Promise<{
  data: {
    activities: DashboardActivity[];
    total: number;
    hasMore: boolean;
  };
}> {
  const queryParams = new URLSearchParams();
  
  if (params.limit) queryParams.set("limit", params.limit.toString());
  if (params.offset) queryParams.set("offset", params.offset.toString());
  if (params.types) queryParams.set("types", params.types.join(","));
  if (params.timeRange) queryParams.set("timeRange", params.timeRange);

  const response = await fetch(`/api/dashboard/activity?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard activity");
  }

  return response.json();
}

// Hook
export function useDashboardActivity(params: ActivityQueryParams) {
  return useQuery({
    queryKey: dashboardActivityKeys.list(params),
    queryFn: () => getDashboardActivity(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
    enabled: !!params.orgId,
  });
}

export { getDashboardActivity };
