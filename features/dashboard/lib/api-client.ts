// Dashboard API Client
// Centralized API functions for dashboard features

interface RequestOptions {
  orgId: string;
  [key: string]: any;
}

class DashboardApiClient {
  private baseUrl = '/api/dashboard';

  private async request<T>(endpoint: string, options: RequestOptions): Promise<T> {
    const { orgId, ...params } = options;
    
    // Add orgId to query params for RLS
    const searchParams = new URLSearchParams();
    if (orgId) searchParams.append('orgId', orgId);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          searchParams.append(key, value.join(','));
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const url = `${this.baseUrl}${endpoint}?${searchParams.toString()}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `Failed to fetch ${endpoint}`);
    }

    return response.json();
  }

  async getAnalytics(options: RequestOptions & {
    timeRange?: string;
    organizationType?: string;
    metrics?: string[];
  }) {
    return this.request('/analytics', options);
  }

  async getActivity(options: RequestOptions & {
    limit?: number;
    offset?: number;
    types?: string[];
    timeRange?: string;
  }) {
    return this.request('/activity', options);
  }

  async getStats(options: RequestOptions & {
    timeRange?: string;
    organizationType?: string;
    includeGrowth?: boolean;
  }) {
    return this.request('/stats', options);
  }
}

export const dashboardApi = new DashboardApiClient();
