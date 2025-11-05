/**
 * DATA PROVIDER - Unified data access layer for the entire application
 *
 * This provider creates a centralized data access point that combines all services,
 * provides global state management, and offers React hooks for easy data consumption.
 */

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient } from './api-client';

// Import all services
import { UserService, useUsers, useUser, useUserStats, useUserSearch } from './services/user-service';
import { NotificationService, useNotifications, useNotification, useNotificationTemplates, useNotificationStats } from './services/notification-service';

// Import types
import {
  User,
  UserWithOrganizations,
  UserStats,
  Notification,
  NotificationTemplate,
  NotificationStats,
  DashboardStats,
  SystemHealth,
  AnalyticsData,
  ApiResponse,
  PaginatedResponse,
} from '@/lib/types/database';

// ============================================================================
// DATA PROVIDER CONTEXT & INTERFACE
// ============================================================================

interface DataProviderContextType {
  // Services
  userService: typeof UserService;
  notificationService: typeof NotificationService;

  // Global state
  isOnline: boolean;
  lastSync: Date | null;

  // Cache management
  clearAllCache: () => void;
  getCacheStats: () => any;

  // Connection management
  refreshConnection: () => Promise<void>;
}

const DataProviderContext = createContext<DataProviderContextType | undefined>(undefined);

// ============================================================================
// DATA PROVIDER COMPONENT
// ============================================================================

interface DataProviderProps {
  children: ReactNode;
  config?: {
    enableOfflineMode?: boolean;
    syncInterval?: number;
    cacheConfig?: any;
  };
}

export function DataProvider({ children, config = {} }: DataProviderProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const {
    enableOfflineMode = false,
    syncInterval = 5 * 60 * 1000, // 5 minutes
  } = config;

  // ============================================================================
  // CONNECTION MANAGEMENT
  // ============================================================================

  useEffect(() => {
    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Periodic sync when online
  useEffect(() => {
    if (!isOnline || !enableOfflineMode) return;

    const syncIntervalId = setInterval(async () => {
      try {
        // Perform lightweight sync operations
        await refreshConnection();
        setLastSync(new Date());
      } catch (error) {
        console.warn('Sync failed:', error);
      }
    }, syncInterval);

    return () => clearInterval(syncIntervalId);
  }, [isOnline, enableOfflineMode, syncInterval]);

  // ============================================================================
  // CACHE MANAGEMENT
  // ============================================================================

  const clearAllCache = () => {
    UserService.clearCache();
    NotificationService.clearCache();
    apiClient.clearCache();
  };

  const getCacheStats = () => {
    return {
      apiClient: apiClient.getCacheStats(),
      totalSize: 0, // Would aggregate all service cache sizes
    };
  };

  // ============================================================================
  // CONNECTION MANAGEMENT
  // ============================================================================

  const refreshConnection = async () => {
    try {
      // Test connection with a lightweight endpoint
      const response = await fetch('/api/health', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Connection test failed');
      }

      setIsOnline(true);
      setLastSync(new Date());
    } catch (error) {
      setIsOnline(false);
      throw error;
    }
  };

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: DataProviderContextType = {
    // Services
    userService: UserService,
    notificationService: NotificationService,

    // Global state
    isOnline,
    lastSync,

    // Cache management
    clearAllCache,
    getCacheStats,

    // Connection management
    refreshConnection,
  };

  return (
    <DataProviderContext.Provider value={contextValue}>
      {children}
    </DataProviderContext.Provider>
  );
}

// ============================================================================
// HOOKS FOR USING DATA PROVIDER
// ============================================================================

/**
 * Main hook for accessing data provider context
 */
export function useDataProvider(): DataProviderContextType {
  const context = useContext(DataProviderContext);
  if (context === undefined) {
    throw new Error('useDataProvider must be used within a DataProvider');
  }
  return context;
}

/**
 * Hook for connection status
 */
export function useConnectionStatus() {
  const { isOnline, lastSync, refreshConnection } = useDataProvider();

  return {
    isOnline,
    lastSync,
    refreshConnection,
    connectionQuality: isOnline ? 'good' : 'offline',
  };
}

/**
 * Hook for cache management
 */
export function useCache() {
  const { clearAllCache, getCacheStats } = useDataProvider();

  return {
    clearAllCache,
    getCacheStats,
    invalidateUserCache: () => UserService.clearCache(),
    invalidateNotificationCache: () => NotificationService.clearCache(),
  };
}

// ============================================================================
// UNIFIED DATA HOOKS - Easy access to all data operations
// ============================================================================

/**
 * Unified user data hooks
 */
export const useUserData = {
  // User CRUD
  useUsers,
  useUser,
  useUserStats,
  useUserSearch,

  // User service methods (for imperative calls)
  createUser: UserService.createUser,
  updateUser: UserService.updateUser,
  deleteUser: UserService.deleteUser,
  bulkDeleteUsers: UserService.bulkDeleteUsers,
  bulkUpdateRoles: UserService.bulkUpdateRoles,

  // User profile
  getUserProfile: UserService.getUserProfile,
  updateUserProfile: UserService.updateUserProfile,

  // User analytics
  getRegistrationTrends: UserService.getRegistrationTrends,

  // Organization relationships
  addUserToOrganization: UserService.addUserToOrganization,
  removeUserFromOrganization: UserService.removeUserFromOrganization,
  updateUserOrganizationRole: UserService.updateUserOrganizationRole,

  // Utilities
  validateUserData: UserService.validateUserData,
  sanitizeUserData: UserService.sanitizeUserData,
};

/**
 * Unified notification data hooks
 */
export const useNotificationData = {
  // Notification CRUD
  useNotifications,
  useNotification,
  useNotificationTemplates,
  useNotificationStats,

  // Notification service methods
  createNotification: NotificationService.createNotification,
  updateNotification: NotificationService.updateNotification,
  deleteNotification: NotificationService.deleteNotification,
  markAsRead: NotificationService.markAsRead,
  markMultipleAsRead: NotificationService.markMultipleAsRead,
  bulkDeleteNotifications: NotificationService.bulkDeleteNotifications,

  // Templates
  createTemplate: NotificationService.createTemplate,
  updateTemplate: NotificationService.updateTemplate,
  deleteTemplate: NotificationService.deleteTemplate,

  // Broadcasting
  broadcastToAll: NotificationService.broadcastToAll,
  sendToUsers: NotificationService.sendToUsers,
  sendByRole: NotificationService.sendByRole,

  // Analytics
  getDeliveryTrends: NotificationService.getDeliveryTrends,

  // Utilities
  validateNotificationData: NotificationService.validateNotificationData,
  sanitizeNotificationData: NotificationService.sanitizeNotificationData,
};

// ============================================================================
// DASHBOARD DATA HOOKS - Specialized for dashboard components
// ============================================================================

/**
 * Hook for dashboard statistics
 */
export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // This would typically call a dashboard service
        // For now, using mock data
        const mockStats: DashboardStats = {
          totalUsers: 1247,
          activeUsers: 892,
          totalOrganizations: 45,
          systemHealth: 'healthy',
          recentActivity: [],
          userGrowth: [],
          organizationGrowth: [],
          revenue: { current: 45231, previous: 36845, growth: 23 },
          topPages: [],
        };

        setStats(mockStats);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error, refetch: () => setLoading(true) };
}

/**
 * Hook for system health monitoring
 */
export function useSystemHealth() {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        setLoading(true);
        // This would typically call a system service
        const mockHealth: SystemHealth = {
          cpuUsage: 45,
          memoryUsage: 67,
          diskUsage: 23,
          networkLatency: 12,
          services: [
            { name: 'API Server', status: 'healthy', uptime: '99.9%', responseTime: 45 },
            { name: 'Database', status: 'healthy', uptime: '99.8%', responseTime: 23 },
            { name: 'Cache', status: 'healthy', uptime: '99.9%', responseTime: 5 },
          ],
          lastChecked: new Date(),
        };

        setHealth(mockHealth);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch system health');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();

    // Refresh every 30 seconds
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return { health, loading, error };
}

/**
 * Hook for analytics data
 */
export function useAnalyticsData(timeRange?: { start: Date; end: Date }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // This would typically call an analytics service
        const mockData: AnalyticsData = {
          overview: {
            totalUsers: 1247,
            activeUsers: 892,
            pageViews: 15420,
            sessionDuration: "4m 32s",
            bounceRate: "32%",
            conversionRate: "3.2%",
          },
          userGrowth: [
            { month: "Jan", users: 120 },
            { month: "Feb", users: 145 },
            { month: "Mar", users: 178 },
            { month: "Apr", users: 203 },
            { month: "May", users: 245 },
            { month: "Jun", users: 289 },
          ],
          topPages: [
            { page: "/dashboard", views: 3420, unique: 2890 },
            { page: "/users", views: 2156, unique: 1890 },
            { page: "/profile", views: 1876, unique: 1654 },
          ],
          deviceStats: [
            { device: "Desktop", percentage: 65, count: 812 },
            { device: "Mobile", percentage: 28, count: 349 },
            { device: "Tablet", percentage: 7, count: 87 },
          ],
          geographicData: [
            { country: "United States", users: 423, percentage: 34 },
            { country: "United Kingdom", users: 198, percentage: 16 },
            { country: "Germany", users: 156, percentage: 13 },
          ],
          timeRange: timeRange || {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            end: new Date(),
          },
        };

        setData(mockData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  return { data, loading, error };
}

// ============================================================================
// EXPORT EVERYTHING
// ============================================================================

export {
  // Services
  UserService,
  NotificationService,

  // Individual hooks (for direct import)
  useUsers,
  useUser,
  useUserStats,
  useUserSearch,
  useNotifications,
  useNotification,
  useNotificationTemplates,
  useNotificationStats,
};
