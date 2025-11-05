/**
 * Mock Data Tests
 * Tests for the mock data utilities and functions
 */

import { describe, it, expect } from 'vitest';
import {
  mockUsers,
  mockUserListItems,
  mockUserStats,
  mockCurrentUser,
  getMockUserById,
  getMockUsersByRole,
  getMockUsersByOrganization,
  searchMockUsers
} from '../../data/user-management/mock-users';

describe('Mock Users Data', () => {
  describe('mockUsers', () => {
    it('contains expected number of users', () => {
      expect(mockUsers).toHaveLength(7);
    });

    it('has valid user structure', () => {
      const user = mockUsers[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('name');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('role');
      expect(user).toHaveProperty('isTwoFactorEnabled');
      expect(user).toHaveProperty('organizations');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');
    });

    it('includes users with different roles', () => {
      const roles = mockUsers.map(user => user.role);
      expect(roles).toContain('ADMIN');
      expect(roles).toContain('USER');
    });

    it('has realistic organization data', () => {
      const userWithOrg = mockUsers.find(user => user.organizations.length > 0);
      expect(userWithOrg).toBeDefined();

      const org = userWithOrg!.organizations[0];
      expect(org).toHaveProperty('organization');
      expect(org.organization).toHaveProperty('id');
      expect(org.organization).toHaveProperty('name');
      expect(org.organization).toHaveProperty('type');
    });
  });

  describe('mockUserListItems', () => {
    it('is derived from mockUsers', () => {
      expect(mockUserListItems).toHaveLength(mockUsers.length);
    });

    it('has correct structure', () => {
      const item = mockUserListItems[0];
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('email');
      expect(item).toHaveProperty('role');
      expect(item).toHaveProperty('isTwoFactorEnabled');
      expect(item).toHaveProperty('createdAt');
      expect(item).toHaveProperty('organizationCount');
      expect(item).toHaveProperty('lastActive');
    });

    it('calculates organization count correctly', () => {
      const userWithOrgs = mockUserListItems.find(item => item.organizationCount > 0);
      expect(userWithOrgs).toBeDefined();
    });
  });

  describe('mockUserStats', () => {
    it('has correct structure', () => {
      expect(mockUserStats).toHaveProperty('totalUsers');
      expect(mockUserStats).toHaveProperty('activeUsers');
      expect(mockUserStats).toHaveProperty('newUsersThisMonth');
      expect(mockUserStats).toHaveProperty('usersByRole');
    });

    it('calculates totals correctly', () => {
      expect(mockUserStats.totalUsers).toBe(mockUsers.length);
      expect(mockUserStats.activeUsers).toBeGreaterThan(0);
    });

    it('includes all role types', () => {
      expect(mockUserStats.usersByRole).toHaveProperty('ADMIN');
      expect(mockUserStats.usersByRole).toHaveProperty('USER');
      expect(mockUserStats.usersByRole).toHaveProperty('DEVELOPMENT');
      expect(mockUserStats.usersByRole).toHaveProperty('SUPERADMIN');
    });
  });

  describe('mockCurrentUser', () => {
    it('is the first user in mockUsers', () => {
      expect(mockCurrentUser).toEqual(mockUsers[0]);
    });

    it('has admin role', () => {
      expect(mockCurrentUser.role).toBe('ADMIN');
    });
  });

  describe('getMockUserById', () => {
    it('returns correct user for valid ID', () => {
      const user = getMockUserById('user-1');
      expect(user).toBeDefined();
      expect(user!.id).toBe('user-1');
    });

    it('returns undefined for invalid ID', () => {
      const user = getMockUserById('invalid-id');
      expect(user).toBeUndefined();
    });
  });

  describe('getMockUsersByRole', () => {
    it('filters users by role correctly', () => {
      const admins = getMockUsersByRole('ADMIN');
      expect(admins.length).toBeGreaterThan(0);
      admins.forEach(user => {
        expect(user.role).toBe('ADMIN');
      });
    });

    it('returns empty array for unused role', () => {
      const devs = getMockUsersByRole('DEVELOPMENT');
      expect(devs).toHaveLength(0);
    });
  });

  describe('getMockUsersByOrganization', () => {
    it('filters users by organization correctly', () => {
      const orgUsers = getMockUsersByOrganization('org-1');
      expect(orgUsers.length).toBeGreaterThan(0);
      orgUsers.forEach(user => {
        const hasOrg = user.organizations.some((org: any) => org.organization.id === 'org-1');
        expect(hasOrg).toBe(true);
      });
    });

    it('returns empty array for invalid organization', () => {
      const orgUsers = getMockUsersByOrganization('invalid-org');
      expect(orgUsers).toHaveLength(0);
    });
  });

  describe('searchMockUsers', () => {
    it('searches by name', () => {
      const results = searchMockUsers('john');
      expect(results.length).toBeGreaterThan(0);
      results.forEach(user => {
        const nameMatch = user.name?.toLowerCase().includes('john');
        const emailMatch = user.email.toLowerCase().includes('john');
        expect(nameMatch || emailMatch).toBe(true);
      });
    });

    it('searches by email', () => {
      const results = searchMockUsers('doe');
      expect(results.length).toBeGreaterThan(0);
      results.forEach(user => {
        const nameMatch = user.name?.toLowerCase().includes('doe');
        const emailMatch = user.email.toLowerCase().includes('doe');
        expect(nameMatch || emailMatch).toBe(true);
      });
    });

    it('is case insensitive', () => {
      const results1 = searchMockUsers('JOHN');
      const results2 = searchMockUsers('john');
      expect(results1).toEqual(results2);
    });

    it('returns empty array for no matches', () => {
      const results = searchMockUsers('nonexistentuser');
      expect(results).toHaveLength(0);
    });
  });
});
