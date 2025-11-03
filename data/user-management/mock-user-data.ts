/**
 * Mock User Management Data
 * Provides realistic user profiles, roles, permissions, and login history
 */

import { UserRole, OrganizationRole } from '@prisma/client';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  isTwoFactorEnabled: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  organizations: UserOrganization[];
  permissions: Permission[];
  loginHistory: LoginHistory[];
}

export interface UserOrganization {
  id: string;
  organizationId: string;
  organizationName: string;
  role: OrganizationRole;
  status: 'ACTIVE' | 'INACTIVE' | 'REMOVED';
  joinedAt: Date;
  lastActivity?: Date;
}

export interface Permission {
  id: string;
  resource: string;
  action: string;
  scope: 'global' | 'organization' | 'personal';
  granted: boolean;
}

export interface LoginHistory {
  id: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  location?: string;
  device: string;
  success: boolean;
  failureReason?: string;
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  usersByRole: Record<UserRole, number>;
  recentRegistrations: number;
  loginAttempts: {
    successful: number;
    failed: number;
  };
  topActiveUsers: Array<{
    userId: string;
    name: string;
    loginCount: number;
    lastLogin: Date;
  }>;
}

// Mock User Profiles
export const mockUserProfiles: UserProfile[] = [
  {
    id: 'user-admin-001',
    name: 'Admin User',
    email: 'admin@p-core.com',
    role: UserRole.SUPERADMIN,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    isActive: true,
    isTwoFactorEnabled: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    organizations: [
      {
        id: 'user-org-001',
        organizationId: 'org1',
        organizationName: 'P-Core School',
        role: OrganizationRole.SUPER_ADMIN,
        status: 'ACTIVE',
        joinedAt: new Date('2024-01-15'),
        lastActivity: new Date(Date.now() - 1000 * 60 * 30),
      },
    ],
    permissions: [
      { id: 'perm-001', resource: 'users', action: 'manage', scope: 'global', granted: true },
      { id: 'perm-002', resource: 'organizations', action: 'manage', scope: 'global', granted: true },
      { id: 'perm-003', resource: 'system', action: 'admin', scope: 'global', granted: true },
    ],
    loginHistory: [
      {
        id: 'login-001',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        location: 'Yangon, Myanmar',
        device: 'Desktop',
        success: true,
      },
      {
        id: 'login-002',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        location: 'Yangon, Myanmar',
        device: 'Desktop',
        success: true,
      },
    ],
  },
  {
    id: 'user-teacher-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@p-core.com',
    role: UserRole.USER,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    isActive: true,
    isTwoFactorEnabled: false,
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    organizations: [
      {
        id: 'user-org-002',
        organizationId: 'org1',
        organizationName: 'P-Core School',
        role: OrganizationRole.TEACHER,
        status: 'ACTIVE',
        joinedAt: new Date('2024-02-01'),
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
    ],
    permissions: [
      { id: 'perm-004', resource: 'courses', action: 'manage', scope: 'organization', granted: true },
      { id: 'perm-005', resource: 'students', action: 'view', scope: 'organization', granted: true },
      { id: 'perm-006', resource: 'grades', action: 'manage', scope: 'organization', granted: true },
    ],
    loginHistory: [
      {
        id: 'login-003',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        ipAddress: '10.0.0.50',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        location: 'Mandalay, Myanmar',
        device: 'Laptop',
        success: true,
      },
    ],
  },
  {
    id: 'user-student-001',
    name: 'Mike Chen',
    email: 'mike.chen@p-core.com',
    role: UserRole.USER,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    isActive: true,
    isTwoFactorEnabled: false,
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    organizations: [
      {
        id: 'user-org-003',
        organizationId: 'org1',
        organizationName: 'P-Core School',
        role: OrganizationRole.STUDENT,
        status: 'ACTIVE',
        joinedAt: new Date('2024-03-10'),
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 6),
      },
    ],
    permissions: [
      { id: 'perm-007', resource: 'courses', action: 'view', scope: 'personal', granted: true },
      { id: 'perm-008', resource: 'grades', action: 'view', scope: 'personal', granted: true },
      { id: 'perm-009', resource: 'library', action: 'access', scope: 'organization', granted: true },
    ],
    loginHistory: [
      {
        id: 'login-004',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        ipAddress: '172.16.0.25',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
        location: 'Naypyidaw, Myanmar',
        device: 'Mobile',
        success: true,
      },
      {
        id: 'login-005',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        ipAddress: '172.16.0.25',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
        location: 'Naypyidaw, Myanmar',
        device: 'Mobile',
        success: false,
        failureReason: 'Invalid password',
      },
    ],
  },
  {
    id: 'user-librarian-001',
    name: 'Linda Rodriguez',
    email: 'linda.rodriguez@p-core.com',
    role: UserRole.USER,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=linda',
    isActive: true,
    isTwoFactorEnabled: true,
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    organizations: [
      {
        id: 'user-org-004',
        organizationId: 'org1',
        organizationName: 'P-Core School',
        role: OrganizationRole.LIBRARIAN,
        status: 'ACTIVE',
        joinedAt: new Date('2024-01-20'),
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    ],
    permissions: [
      { id: 'perm-010', resource: 'library', action: 'manage', scope: 'organization', granted: true },
      { id: 'perm-011', resource: 'books', action: 'manage', scope: 'organization', granted: true },
      { id: 'perm-012', resource: 'loans', action: 'manage', scope: 'organization', granted: true },
    ],
    loginHistory: [
      {
        id: 'login-006',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        ipAddress: '192.168.1.150',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        location: 'Yangon, Myanmar',
        device: 'Desktop',
        success: true,
      },
    ],
  },
  {
    id: 'user-inactive-001',
    name: 'Inactive User',
    email: 'inactive@p-core.com',
    role: UserRole.USER,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=inactive',
    isActive: false,
    isTwoFactorEnabled: false,
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    organizations: [
      {
        id: 'user-org-005',
        organizationId: 'org1',
        organizationName: 'P-Core School',
        role: OrganizationRole.MEMBER,
        status: 'INACTIVE',
        joinedAt: new Date('2024-01-01'),
        lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      },
    ],
    permissions: [
      { id: 'perm-013', resource: 'profile', action: 'view', scope: 'personal', granted: true },
    ],
    loginHistory: [
      {
        id: 'login-007',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
        ipAddress: '192.168.1.200',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        location: 'Yangon, Myanmar',
        device: 'Desktop',
        success: true,
      },
    ],
  },
];

// Mock User Statistics
export const mockUserStatistics: UserStatistics = {
  totalUsers: 1247,
  activeUsers: 1156,
  inactiveUsers: 91,
  usersByRole: {
    [UserRole.SUPERADMIN]: 3,
    [UserRole.ADMIN]: 12,
    [UserRole.USER]: 1232,
    [UserRole.DEVELOPMENT]: 0,
  },
  recentRegistrations: 23,
  loginAttempts: {
    successful: 15432,
    failed: 234,
  },
  topActiveUsers: [
    {
      userId: 'user-admin-001',
      name: 'Admin User',
      loginCount: 89,
      lastLogin: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      userId: 'user-teacher-001',
      name: 'Sarah Johnson',
      loginCount: 67,
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      userId: 'user-student-001',
      name: 'Mike Chen',
      loginCount: 45,
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 6),
    },
    {
      userId: 'user-librarian-001',
      name: 'Linda Rodriguez',
      loginCount: 34,
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  ],
};

// Helper functions
export function getUserById(id: string): UserProfile | undefined {
  return mockUserProfiles.find(user => user.id === id);
}

export function getUsersByRole(role: UserRole): UserProfile[] {
  return mockUserProfiles.filter(user => user.role === role);
}

export function getUsersByOrganization(orgId: string): UserProfile[] {
  return mockUserProfiles.filter(user =>
    user.organizations.some(org => org.organizationId === orgId)
  );
}

export function getRecentLoginHistory(days: number = 7): LoginHistory[] {
  const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return mockUserProfiles
    .flatMap(user => user.loginHistory)
    .filter(login => login.timestamp >= cutoffDate)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function getUserManagementData() {
  return {
    users: mockUserProfiles,
    statistics: mockUserStatistics,
    recentLogins: getRecentLoginHistory(),
  };
}
