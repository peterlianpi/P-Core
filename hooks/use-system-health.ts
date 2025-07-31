import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

/**
 * System Health Data Types
 */
export interface SystemHealthData {
  database: {
    status: 'healthy' | 'warning' | 'error';
    responseTime: number;
    connections: number;
    maxConnections: number;
  };
  api: {
    status: 'operational' | 'degraded' | 'down';
    responseTime: number;
    requestsPerMinute: number;
    errorRate: number;
  };
  authentication: {
    status: 'active' | 'issues' | 'down';
    activeUsers: number;
    failedLogins: number;
  };
  storage: {
    status: 'available' | 'warning' | 'full';
    usedSpace: number;
    totalSpace: number;
    usagePercentage: number;
  };
  system: {
    uptime: number;
    uptimePercentage: number;
    memoryUsage: number;
    cpuUsage: number;
    lastUpdated: string;
  };
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  service: string;
  message: string;
  details?: Record<string, any>;
}

/**
 * Custom hook for real-time system health monitoring
 * 
 * Features:
 * - Real-time polling every 30 seconds
 * - Automatic error handling and retry
 * - Background updates when tab is visible
 * - Optimistic updates for better UX
 * 
 * @param options Configuration options for the hook
 * @returns System health data and control functions
 */
export function useSystemHealth(options: {
  /** Polling interval in milliseconds (default: 30000) */
  refetchInterval?: number;
  /** Whether to refetch when window gains focus */
  refetchOnWindowFocus?: boolean;
  /** Whether to enable real-time updates */
  enabled?: boolean;
} = {}) {
  const {
    refetchInterval = 30000, // 30 seconds
    refetchOnWindowFocus = true,
    enabled = true
  } = options;

  // System health query with real-time polling
  const healthQuery = useQuery({
    queryKey: ['system-health'],
    queryFn: async (): Promise<SystemHealthData> => {
      const response = await fetch('/api/superadmin/system/health');
      if (!response.ok) {
        throw new Error('Failed to fetch system health');
      }
      return response.json();
    },
    refetchInterval: enabled ? refetchInterval : false,
    refetchOnWindowFocus,
    staleTime: 10000, // Consider data stale after 10 seconds
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled,
  });

  // System logs query with real-time polling
  const logsQuery = useQuery({
    queryKey: ['system-logs'],
    queryFn: async (): Promise<SystemLog[]> => {
      const response = await fetch('/api/superadmin/system/logs?limit=20');
      if (!response.ok) {
        throw new Error('Failed to fetch system logs');
      }
      const data = await response.json();
      return data.logs || [];
    },
    refetchInterval: enabled ? refetchInterval / 2 : false, // More frequent for logs (15 seconds)
    refetchOnWindowFocus,
    staleTime: 5000, // Consider logs stale after 5 seconds
    enabled,
  });

  // Connection status tracking
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Helper functions
  const getOverallSystemStatus = (): 'healthy' | 'warning' | 'critical' => {
    if (!healthQuery.data) return 'warning';

    const { database, api, authentication, storage } = healthQuery.data;
    
    // Critical if any core service is down
    if (database.status === 'error' || api.status === 'down' || authentication.status === 'down') {
      return 'critical';
    }
    
    // Warning if any service has issues or storage is nearly full
    if (
      database.status === 'warning' || 
      api.status === 'degraded' || 
      authentication.status === 'issues' ||
      storage.status === 'warning' ||
      storage.usagePercentage > 85
    ) {
      return 'warning';
    }
    
    return 'healthy';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'healthy':
      case 'operational':
      case 'active':
      case 'available':
        return 'bg-green-500';
      case 'warning':
      case 'degraded':
      case 'issues':
        return 'bg-yellow-500';
      case 'error':
      case 'down':
      case 'full':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' => {
    switch (status) {
      case 'healthy':
      case 'operational':
      case 'active':
      case 'available':
        return 'default';
      case 'warning':
      case 'degraded':
      case 'issues':
        return 'secondary';
      case 'error':
      case 'down':
      case 'full':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatUptime = (uptimeSeconds: number): string => {
    const days = Math.floor(uptimeSeconds / (24 * 60 * 60));
    const hours = Math.floor((uptimeSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((uptimeSeconds % (60 * 60)) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  const formatBytes = (bytes: number): string => {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  return {
    // Data
    health: healthQuery.data,
    logs: logsQuery.data || [],
    
    // Loading states
    isLoading: healthQuery.isLoading || logsQuery.isLoading,
    isHealthLoading: healthQuery.isLoading,
    isLogsLoading: logsQuery.isLoading,
    
    // Error states
    error: healthQuery.error || logsQuery.error,
    healthError: healthQuery.error,
    logsError: logsQuery.error,
    
    // Connection status
    isOnline,
    
    // Computed values
    overallStatus: getOverallSystemStatus(),
    
    // Helper functions
    getStatusColor,
    getStatusVariant,
    formatUptime,
    formatBytes,
    
    // Control functions
    refetch: () => {
      healthQuery.refetch();
      logsQuery.refetch();
    },
    
    // Query objects for advanced usage
    healthQuery,
    logsQuery,
  };
}