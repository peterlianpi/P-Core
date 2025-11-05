/**
 * DATA LAYER INDEX - Unified exports for the entire data architecture
 *
 * This file provides a single entry point for all data-related functionality,
 * making it easy to import and use throughout the application.
 */

import { apiClient } from './api-client';

// ============================================================================
// CORE DATA INFRASTRUCTURE
// ============================================================================

// API Client & Cache
export { apiClient, ApiClient, CacheManager, DataValidator } from './api-client';
export type { UseApiState } from './api-client';

// Data Provider (React Context)
export {
  DataProvider,
  useDataProvider,
  useConnectionStatus,
  useCache,
  useDashboardStats,
  useSystemHealth,
  useAnalyticsData,
} from './data-provider';

// Unified data hooks
export { useUserData, useNotificationData } from './data-provider';

// ============================================================================
// SERVICE LAYER - Domain-specific data operations
// ============================================================================

// User Service
export {
  UserService,
  useUsers,
  useUser,
  useUserStats,
  useUserSearch,
} from './services/user-service';

// Notification Service
export {
  NotificationService,
  useNotifications,
  useNotification,
  useNotificationTemplates,
  useNotificationStats,
} from './services/notification-service';

// ============================================================================
// TYPE DEFINITIONS - All data types in one place
// ============================================================================

export type {
  // Base Types
  UserRole,
  OrganizationRole,
  NotificationType,
  PlanInterval,
  ActivityType,
  PermissionCategory,

  // User Types
  User,
  UserWithOrganizations,
  UserOrganization,
  UserProfile,
  UserPreferences,
  UserStats,

  // Organization Types
  Organization,
  OrganizationSettings,
  Team,
  TeamSettings,

  // Notification Types
  Notification,
  NotificationTemplate,
  NotificationStats,

  // Role & Permission Types
  Role,
  Permission,
  PermissionGroup,

  // Plan & Billing Types
  Plan,
  PlanLimits,
  Subscription,
  Invoice,

  // Analytics & Dashboard Types
  DashboardStats,
  Activity,
  SystemHealth,
  AnalyticsData,

  // API Types
  ApiResponse,
  PaginatedResponse,
  ApiError,

  // Form & Validation Types
  ValidationRule,
  FormField,
  FormSchema,

  // Cache & Data Management Types
  CacheEntry,
  CacheConfig,
  DataProviderConfig,

  // Utility Types
  DeepPartial,
  Optional,
  RequiredFields,
  WithTimestamps,
  WithId,
} from '../types/database';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Initialize the data layer with default configuration
 */
export function initializeDataLayer(config?: {
  enableOfflineMode?: boolean;
  syncInterval?: number;
  cacheConfig?: any;
}) {
  // This would set up global data layer configuration
  console.log('Data layer initialized with config:', config);
}

/**
 * Get data layer health status
 */
export function getDataLayerHealth() {
  return {
    apiClient: apiClient.getCacheStats(),
    services: {
      users: 'healthy',
      notifications: 'healthy',
    },
    timestamp: new Date(),
  };
}

/**
 * Reset entire data layer (use with caution)
 */
export function resetDataLayer() {
  apiClient.clearCache();
  console.warn('Data layer reset - all cached data cleared');
}

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

export const DATA_LAYER_CONFIG = {
  DEFAULT_CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  MAX_CACHE_SIZE: 100,
  RETRY_ATTEMPTS: 3,
  REQUEST_TIMEOUT: 10000,
  PAGINATION_DEFAULTS: {
    page: 1,
    limit: 10,
  },
} as const;

export const API_ENDPOINTS = {
  USERS: '/users',
  NOTIFICATIONS: '/notifications',
  ORGANIZATIONS: '/organizations',
  TEAMS: '/teams',
  PLANS: '/plans',
  ANALYTICS: '/analytics',
  HEALTH: '/health',
} as const;

// ============================================================================
// DEVELOPMENT HELPERS
// ============================================================================

if (process.env.NODE_ENV === 'development') {
  // Add global helpers for development
  (globalThis as any).dataLayer = {
    getHealth: getDataLayerHealth,
    reset: resetDataLayer,
    clearCache: () => apiClient.clearCache(),
    getCacheStats: () => apiClient.getCacheStats(),
  };
}
