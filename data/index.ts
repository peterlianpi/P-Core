/**
 * Mock Data Index
 * Central export point for all mock data used in the application
 */

// Dashboard Mock Data
export * from './dashboard/mock-dashboard-data';

// User Management Mock Data
export * from './user-management/mock-user-data';

// Notifications Management Mock Data
export * from './notifications/mock-notification-data';

// Subscriptions Management Mock Data
export * from './subscriptions/mock-subscription-data';

// Combined mock data access
import { getDashboardData } from './dashboard/mock-dashboard-data';
import { getUserManagementData } from './user-management/mock-user-data';
import { getNotificationManagementData } from './notifications/mock-notification-data';
import { getSubscriptionManagementData } from './subscriptions/mock-subscription-data';

/**
 * Get all mock data for the application
 * Useful for initializing the application with mock data
 */
export function getAllMockData() {
  return {
    dashboard: getDashboardData(),
    userManagement: getUserManagementData(),
    notifications: getNotificationManagementData(),
    subscriptions: getSubscriptionManagementData(),
  };
}

/**
 * Mock data utilities and helpers
 */
export const mockDataUtils = {
  /**
   * Generate a random ID with prefix
   */
  generateId: (prefix: string = 'mock') => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,

  /**
   * Generate a random date within a range
   */
  randomDate: (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  },

  /**
   * Generate random user data
   */
  generateRandomUser: () => {
    const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa', 'Tom', 'Emma'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Garcia', 'Miller', 'Davis'];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return {
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
    };
  },

  /**
   * Format currency
   */
  formatCurrency: (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  },

  /**
   * Format date
   */
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options,
    }).format(date);
  },

  /**
   * Get relative time string
   */
  getRelativeTime: (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return mockDataUtils.formatDate(date);
  },
};
