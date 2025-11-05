import { useQuery } from "@tanstack/react-query";
import { mockDashboardStats } from '@/data/dashboard/mock-dashboard';

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

// API function using mock data
async function getDashboardActivity(params: ActivityQueryParams): Promise<{
  data: {
    activities: DashboardActivity[];
    total: number;
    hasMore: boolean;
  };
}> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));

  // Convert mock activity data to expected format
  const activities: DashboardActivity[] = mockDashboardStats.recentActivity.map(activity => ({
    id: activity.id,
    type: activity.type,
    title: activity.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: activity.description,
    user: { name: activity.user?.name || 'System' },
    timestamp: activity.timestamp,
    metadata: {}
  }));

  // Apply filters
  let filteredActivities = activities;

  if (params.types && params.types.length > 0) {
    filteredActivities = filteredActivities.filter(activity =>
      params.types!.includes(activity.type)
    );
  }

  // Apply pagination
  const limit = params.limit || 10;
  const offset = params.offset || 0;
  const paginatedActivities = filteredActivities.slice(offset, offset + limit);

  return Promise.resolve({
    data: {
      activities: paginatedActivities,
      total: filteredActivities.length,
      hasMore: offset + limit < filteredActivities.length
    }
  });
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
