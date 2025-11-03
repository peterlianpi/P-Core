/**
 * Mock Dashboard Data
 * Provides realistic metrics, activities, and usage statistics for dashboard components
 */

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalOrganizations: number;
  activeOrganizations: number;
  totalStudents: number;
  activeStudents: number;
  totalMembers: number;
  activeMembers: number;
  totalCourses: number;
  activeCourses: number;
  totalLibraries: number;
  activeLibraries: number;
  totalBooks: number;
  availableBooks: number;
  totalRevenue: number;
  monthlyRevenue: number;
  systemHealth: number;
  uptime: number;
}

export interface RecentActivity {
  id: string;
  type: 'user_login' | 'user_registration' | 'course_enrollment' | 'book_loan' | 'payment' | 'organization_created' | 'feedback_submitted';
  description: string;
  userId?: string;
  userName?: string;
  orgId?: string;
  orgName?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface UsageStatistics {
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  userLogins: number;
  courseEnrollments: number;
  bookLoans: number;
  payments: number;
  feedbackSubmissions: number;
  systemUsage: number;
  peakHours: number[];
  topFeatures: Array<{
    feature: string;
    usage: number;
    growth: number;
  }>;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
  errorRate: number;
  lastMaintenance: Date;
  nextMaintenance: Date;
  alerts: Array<{
    id: string;
    type: 'info' | 'warning' | 'error';
    message: string;
    timestamp: Date;
  }>;
}

// Mock Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalUsers: 1247,
  activeUsers: 892,
  totalOrganizations: 23,
  activeOrganizations: 21,
  totalStudents: 3456,
  activeStudents: 2890,
  totalMembers: 2156,
  activeMembers: 1987,
  totalCourses: 89,
  activeCourses: 76,
  totalLibraries: 12,
  activeLibraries: 11,
  totalBooks: 15432,
  availableBooks: 12876,
  totalRevenue: 2456789.50,
  monthlyRevenue: 156789.25,
  systemHealth: 98.5,
  uptime: 99.9,
};

// Mock Recent Activities
export const mockRecentActivities: RecentActivity[] = [
  {
    id: 'act-001',
    type: 'user_login',
    description: 'Admin User logged into the system',
    userId: 'user-admin',
    userName: 'Admin User',
    orgId: 'org1',
    orgName: 'P-Core School',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: 'act-002',
    type: 'course_enrollment',
    description: 'Student enrolled in Math 101',
    userId: 'student-001',
    userName: 'Alice Johnson',
    orgId: 'org1',
    orgName: 'P-Core School',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    metadata: { courseName: 'Math 101', courseId: 'course-math-101' },
  },
  {
    id: 'act-003',
    type: 'book_loan',
    description: 'Book "Introduction to Algebra" was loaned',
    userId: 'member-001',
    userName: 'John Doe',
    orgId: 'org1',
    orgName: 'P-Core School',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    metadata: { bookTitle: 'Introduction to Algebra', dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14) },
  },
  {
    id: 'act-004',
    type: 'payment',
    description: 'Payment of $150.00 received for English Course',
    userId: 'student-002',
    userName: 'Bob Smith',
    orgId: 'org1',
    orgName: 'P-Core School',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    metadata: { amount: 150.00, courseName: 'English 101' },
  },
  {
    id: 'act-005',
    type: 'user_registration',
    description: 'New user registered: Charlie Wilson',
    userId: 'user-charlie',
    userName: 'Charlie Wilson',
    orgId: 'org2',
    orgName: 'Community Church',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: 'act-006',
    type: 'organization_created',
    description: 'New organization created: Tech Academy',
    userId: 'user-admin',
    userName: 'Admin User',
    orgId: 'org-new',
    orgName: 'Tech Academy',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
  },
  {
    id: 'act-007',
    type: 'feedback_submitted',
    description: 'Feedback submitted by user',
    userId: 'user-feedback',
    userName: 'Diana Prince',
    orgId: 'org1',
    orgName: 'P-Core School',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    metadata: { rating: 5, category: 'course_quality' },
  },
];

// Mock Usage Statistics
export const mockUsageStatistics: UsageStatistics = {
  period: 'monthly',
  startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  endDate: new Date(),
  userLogins: 15432,
  courseEnrollments: 567,
  bookLoans: 1234,
  payments: 456,
  feedbackSubmissions: 89,
  systemUsage: 94.2,
  peakHours: [9, 10, 11, 14, 15, 16],
  topFeatures: [
    { feature: 'Course Management', usage: 2341, growth: 12.5 },
    { feature: 'Library System', usage: 1876, growth: 8.3 },
    { feature: 'User Dashboard', usage: 1654, growth: 15.7 },
    { feature: 'Payment Processing', usage: 1234, growth: -2.1 },
    { feature: 'Organization Settings', usage: 987, growth: 5.4 },
  ],
};

// Mock System Health
export const mockSystemHealth: SystemHealth = {
  status: 'healthy',
  uptime: 99.9,
  responseTime: 245,
  errorRate: 0.1,
  lastMaintenance: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
  nextMaintenance: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21), // 3 weeks from now
  alerts: [
    {
      id: 'alert-001',
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    },
    {
      id: 'alert-002',
      type: 'warning',
      message: 'High memory usage detected on server-02',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ],
};

// Helper functions for dynamic data generation
export function generateRandomActivity(): RecentActivity {
  const types: RecentActivity['type'][] = ['user_login', 'course_enrollment', 'book_loan', 'payment', 'feedback_submitted'];
  const users = ['Alice Johnson', 'Bob Smith', 'Charlie Wilson', 'Diana Prince', 'Eve Davis'];
  const orgs = ['P-Core School', 'Community Church', 'Tech Academy', 'Business Institute'];

  const type = types[Math.floor(Math.random() * types.length)];
  const userName = users[Math.floor(Math.random() * users.length)];
  const orgName = orgs[Math.floor(Math.random() * orgs.length)];

  let description = '';
  switch (type) {
    case 'user_login':
      description = `${userName} logged into the system`;
      break;
    case 'course_enrollment':
      description = `${userName} enrolled in a course`;
      break;
    case 'book_loan':
      description = `${userName} borrowed a book from the library`;
      break;
    case 'payment':
      description = `Payment received from ${userName}`;
      break;
    case 'feedback_submitted':
      description = `Feedback submitted by ${userName}`;
      break;
  }

  return {
    id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    description,
    userId: `user-${userName.toLowerCase().replace(' ', '-')}`,
    userName,
    orgId: `org-${orgName.toLowerCase().replace(' ', '-')}`,
    orgName,
    timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24), // Random time in last 24 hours
  };
}

export function getDashboardData() {
  return {
    metrics: mockDashboardMetrics,
    recentActivities: mockRecentActivities,
    usageStatistics: mockUsageStatistics,
    systemHealth: mockSystemHealth,
  };
}
