/**
 * Mock data for user management
 * Production-ready mock data for frontend-only application
 */

import { UserRole } from '@/shared/types/user-role';
import { OrganizationRole } from '@/shared/types/organization-role';
import type {
  UserProfile,
  UserWithOrganizations,
  UserListItem,
  UserStats,
} from '@/features/user-management/types';

// Mock users data
export const mockUsers: UserWithOrganizations[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    role: UserRole.ADMIN,
    isTwoFactorEnabled: true,
    defaultOrgId: 'org-1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-11-01'),
    organizations: [
      {
        id: 'org-user-1',
        role: OrganizationRole.ADMIN,
        status: 'active',
        organization: {
          id: 'org-1',
          name: 'Tech Solutions Inc',
          type: 'company'
        }
      }
    ]
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    role: UserRole.USER,
    isTwoFactorEnabled: false,
    defaultOrgId: 'org-2',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-10-15'),
    organizations: [
      {
        id: 'org-user-2',
        role: OrganizationRole.MEMBER,
        status: 'active',
        organization: {
          id: 'org-2',
          name: 'Design Studio',
          type: 'agency'
        }
      }
    ]
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
    role: UserRole.USER,
    isTwoFactorEnabled: true,
    defaultOrgId: 'org-1',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-09-20'),
    organizations: [
      {
        id: 'org-user-3',
        role: OrganizationRole.MEMBER,
        status: 'active',
        organization: {
          id: 'org-1',
          name: 'Tech Solutions Inc',
          type: 'company'
        }
      }
    ]
  },
  {
    id: 'user-4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    role: UserRole.USER,
    isTwoFactorEnabled: false,
    defaultOrgId: null,
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-08-30'),
    organizations: []
  },
  {
    id: 'user-5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    role: UserRole.USER,
    isTwoFactorEnabled: true,
    defaultOrgId: 'org-3',
    createdAt: new Date('2024-05-12'),
    updatedAt: new Date('2024-11-02'),
    organizations: [
      {
        id: 'org-user-5',
        role: OrganizationRole.MEMBER,
        status: 'active',
        organization: {
          id: 'org-3',
          name: 'Marketing Pro',
          type: 'consulting'
        }
      }
    ]
  },
  {
    id: 'user-6',
    name: 'Lisa Davis',
    email: 'lisa.davis@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    role: UserRole.USER,
    isTwoFactorEnabled: false,
    defaultOrgId: 'org-2',
    createdAt: new Date('2024-06-18'),
    updatedAt: new Date('2024-10-25'),
    organizations: [
      {
        id: 'org-user-6',
        role: OrganizationRole.MEMBER,
        status: 'active',
        organization: {
          id: 'org-2',
          name: 'Design Studio',
          type: 'agency'
        }
      }
    ]
  },
  {
    id: 'user-7',
    name: 'Tom Anderson',
    email: 'tom.anderson@example.com',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tom',
    role: UserRole.USER,
    isTwoFactorEnabled: true,
    defaultOrgId: 'org-1',
    createdAt: new Date('2024-07-22'),
    updatedAt: new Date('2024-09-15'),
    organizations: [
      {
        id: 'org-user-7',
        role: OrganizationRole.MEMBER,
        status: 'active',
        organization: {
          id: 'org-1',
          name: 'Tech Solutions Inc',
          type: 'company'
        }
      }
    ]
  }
];

// Convert to UserListItem format
export const mockUserListItems: UserListItem[] = mockUsers.map(user => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  isTwoFactorEnabled: user.isTwoFactorEnabled,
  createdAt: user.createdAt,
  organizationCount: user.organizations.length,
  lastActive: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random last active within last 30 days
}));

// Mock user stats
export const mockUserStats: UserStats = {
  totalUsers: mockUsers.length,
  activeUsers: mockUsers.filter(u => u.organizations.length > 0).length,
  newUsersThisMonth: 3,
  usersByRole: {
    [UserRole.ADMIN]: mockUsers.filter(u => u.role === UserRole.ADMIN).length,
    [UserRole.USER]: mockUsers.filter(u => u.role === UserRole.USER).length,
    [UserRole.DEVELOPMENT]: 0,
    [UserRole.SUPERADMIN]: 0,
  }
};

// Current user (for demo purposes)
export const mockCurrentUser: UserWithOrganizations = mockUsers[0];

// Mock organizations
export const mockOrganizations = [
  {
    id: 'org-1',
    name: 'Tech Solutions Inc',
    type: 'company',
    description: 'Leading technology solutions provider',
    memberCount: 3,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'org-2',
    name: 'Design Studio',
    type: 'agency',
    description: 'Creative design and branding agency',
    memberCount: 2,
    createdAt: new Date('2024-02-15')
  },
  {
    id: 'org-3',
    name: 'Marketing Pro',
    type: 'consulting',
    description: 'Digital marketing consulting services',
    memberCount: 1,
    createdAt: new Date('2024-03-20')
  }
];

// Utility functions for mock data management
export function getMockUserById(id: string): UserWithOrganizations | undefined {
  return mockUsers.find(user => user.id === id);
}

export function getMockUsersByRole(role: UserRole): UserWithOrganizations[] {
  return mockUsers.filter(user => user.role === role);
}

export function getMockUsersByOrganization(orgId: string): UserWithOrganizations[] {
  return mockUsers.filter(user =>
    user.organizations.some(org => org.organization.id === orgId)
  );
}

export function searchMockUsers(query: string): UserListItem[] {
  const lowercaseQuery = query.toLowerCase();
  return mockUserListItems.filter(user =>
    user.name?.toLowerCase().includes(lowercaseQuery) ||
    user.email.toLowerCase().includes(lowercaseQuery)
  );
}
