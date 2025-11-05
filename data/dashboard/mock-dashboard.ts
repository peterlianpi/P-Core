/**
 * Mock data for dashboard
 * Production-ready mock data for frontend-only application
 */

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalOrganizations: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  recentActivity: ActivityItem[];
  userGrowth: GrowthData[];
  organizationGrowth: GrowthData[];
}

export interface ActivityItem {
  id: string;
  type: 'user_registered' | 'organization_created' | 'user_login' | 'system_update';
  description: string;
  timestamp: Date;
  user?: {
    name: string;
    email: string;
  };
}

export interface GrowthData {
  month: string;
  users: number;
  organizations: number;
}

// Mock dashboard statistics
export const mockDashboardStats: DashboardStats = {
  totalUsers: 7,
  activeUsers: 6,
  totalOrganizations: 3,
  systemHealth: 'healthy',
  recentActivity: [
    {
      id: 'activity-1',
      type: 'user_registered',
      description: 'New user Tom Anderson registered',
      timestamp: new Date('2024-11-04T10:30:00'),
      user: {
        name: 'Tom Anderson',
        email: 'tom.anderson@example.com'
      }
    },
    {
      id: 'activity-2',
      type: 'organization_created',
      description: 'New organization Marketing Pro created',
      timestamp: new Date('2024-11-03T14:15:00'),
      user: {
        name: 'David Brown',
        email: 'david.brown@example.com'
      }
    },
    {
      id: 'activity-3',
      type: 'user_login',
      description: 'User logged in',
      timestamp: new Date('2024-11-03T09:45:00'),
      user: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      }
    },
    {
      id: 'activity-4',
      type: 'system_update',
      description: 'System maintenance completed successfully',
      timestamp: new Date('2024-11-02T23:00:00')
    },
    {
      id: 'activity-5',
      type: 'user_registered',
      description: 'New user Lisa Davis registered',
      timestamp: new Date('2024-11-02T16:20:00'),
      user: {
        name: 'Lisa Davis',
        email: 'lisa.davis@example.com'
      }
    }
  ],
  userGrowth: [
    { month: 'Jan', users: 1, organizations: 1 },
    { month: 'Feb', users: 2, organizations: 1 },
    { month: 'Mar', users: 3, organizations: 2 },
    { month: 'Apr', users: 4, organizations: 2 },
    { month: 'May', users: 5, organizations: 2 },
    { month: 'Jun', users: 6, organizations: 2 },
    { month: 'Jul', users: 7, organizations: 3 },
    { month: 'Aug', users: 7, organizations: 3 },
    { month: 'Sep', users: 7, organizations: 3 },
    { month: 'Oct', users: 7, organizations: 3 },
    { month: 'Nov', users: 7, organizations: 3 }
  ],
  organizationGrowth: [
    { month: 'Jan', users: 1, organizations: 1 },
    { month: 'Feb', users: 2, organizations: 1 },
    { month: 'Mar', users: 3, organizations: 2 },
    { month: 'Apr', users: 4, organizations: 2 },
    { month: 'May', users: 5, organizations: 2 },
    { month: 'Jun', users: 6, organizations: 2 },
    { month: 'Jul', users: 7, organizations: 3 },
    { month: 'Aug', users: 7, organizations: 3 },
    { month: 'Sep', users: 7, organizations: 3 },
    { month: 'Oct', users: 7, organizations: 3 },
    { month: 'Nov', users: 7, organizations: 3 }
  ]
};

// Mock system health data
export const mockSystemHealth = {
  status: 'healthy' as const,
  uptime: '15 days, 8 hours',
  lastBackup: new Date('2024-11-03T02:00:00'),
  cpuUsage: 45,
  memoryUsage: 62,
  diskUsage: 78,
  services: [
    { name: 'Database', status: 'healthy', uptime: '99.9%' },
    { name: 'API', status: 'healthy', uptime: '99.8%' },
    { name: 'Cache', status: 'healthy', uptime: '99.9%' },
    { name: 'Email', status: 'healthy', uptime: '99.7%' }
  ]
};

// Mock notifications data
export const mockNotifications = [
  {
    id: 'notif-1',
    type: 'info',
    title: 'Welcome to P-Core',
    message: 'Your account has been successfully set up.',
    read: false,
    createdAt: new Date('2024-11-04T08:00:00')
  },
  {
    id: 'notif-2',
    type: 'success',
    title: 'Profile Updated',
    message: 'Your profile information has been updated successfully.',
    read: true,
    createdAt: new Date('2024-11-03T15:30:00')
  },
  {
    id: 'notif-3',
    type: 'warning',
    title: 'Storage Warning',
    message: 'You are approaching your storage limit.',
    read: false,
    createdAt: new Date('2024-11-02T12:00:00')
  }
];

// Utility functions
export function getRecentActivity(limit: number = 5): ActivityItem[] {
  return mockDashboardStats.recentActivity.slice(0, limit);
}

export function getUnreadNotificationsCount(): number {
  return mockNotifications.filter(n => !n.read).length;
}

export function markNotificationAsRead(id: string): void {
  const notification = mockNotifications.find(n => n.id === id);
  if (notification) {
    notification.read = true;
  }
}
