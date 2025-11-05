/**
 * User Management API Tests
 * Tests for the user management API functions with mock data
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getCurrentUser,
  getUsers,
  getUserById,
  updateProfile,
  changePassword,
  registerUser,
  getUserStats
} from '../../features/user-management/api';

// Mock fetch globally
global.fetch = vi.fn();

describe('User Management API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCurrentUser', () => {
    it('returns mock current user data', async () => {
      const result = await getCurrentUser();

      expect(result).toBeDefined();
      expect(result.id).toBe('user-1');
      expect(result.name).toBe('John Doe');
      expect(result.email).toBe('john.doe@example.com');
      expect(result.role).toBe('ADMIN');
    });

    it('returns user with organizations', async () => {
      const result = await getCurrentUser();

      expect(result.organizations).toBeDefined();
      expect(Array.isArray(result.organizations)).toBe(true);
      expect(result.organizations.length).toBeGreaterThan(0);
    });
  });

  describe('getUsers', () => {
    it('returns paginated user list', async () => {
      const params = { page: 1, limit: 5 };
      const result = await getUsers(params);

      expect(result).toBeDefined();
      expect(result.users).toBeDefined();
      expect(Array.isArray(result.users)).toBe(true);
      expect(result.total).toBeDefined();
      expect(result.page).toBe(1);
      expect(result.limit).toBe(5);
    });

    it('supports search filtering', async () => {
      const params = { search: 'john' };
      const result = await getUsers(params);

      expect(result.users.length).toBeGreaterThan(0);
      // Mock implementation should filter users by search term
    });

    it('supports role filtering', async () => {
      const params = { role: 'ADMIN' };
      const result = await getUsers(params);

      expect(result.users.length).toBeGreaterThan(0);
      // All returned users should have ADMIN role
      result.users.forEach(user => {
        expect(user.role).toBe('ADMIN');
      });
    });

    it('supports sorting', async () => {
      const params = { sortBy: 'name' as 'name' | 'email' | 'createdAt', sortOrder: 'asc' as 'asc' | 'desc' };
      const result = await getUsers(params);

      expect(result.users).toBeDefined();
      // Users should be sorted by name
    });
  });

  describe('getUserById', () => {
    it('returns user data for valid ID', async () => {
      const userId = 'user-1';
      const result = await getUserById(userId);

      expect(result).toBeDefined();
      expect(result.id).toBe(userId);
      expect(result.name).toBeDefined();
      expect(result.email).toBeDefined();
    });

    it('throws error for invalid user ID', async () => {
      const invalidUserId = 'invalid-user';

      await expect(getUserById(invalidUserId)).rejects.toThrow('User not found');
    });
  });

  describe('updateProfile', () => {
    it('updates user profile successfully', async () => {
      const updateData = { name: 'Updated Name' };
      const result = await updateProfile(updateData);

      expect(result).toBeDefined();
      expect(result.name).toBe(updateData.name);
      expect(result.updatedAt).toBeDefined();
    });

    it('preserves existing data when partially updating', async () => {
      const updateData = { name: 'New Name' };
      const result = await updateProfile(updateData);

      expect(result.email).toBeDefined(); // Should preserve email
      expect(result.role).toBeDefined(); // Should preserve role
    });
  });

  describe('changePassword', () => {
    it('changes password successfully', async () => {
      const passwordData = {
        currentPassword: 'oldpass',
        newPassword: 'newpass123',
        confirmPassword: 'newpass123'
      };

      const result = await changePassword(passwordData);
      expect(result.success).toBe(true);
    });

    it('validates password confirmation', async () => {
      const passwordData = {
        currentPassword: 'oldpass',
        newPassword: 'newpass123',
        confirmPassword: 'differentpass'
      };

      await expect(changePassword(passwordData)).rejects.toThrow('Passwords do not match');
    });
  });

  describe('registerUser', () => {
    it('registers new user successfully', async () => {
      const userData = {
        name: 'New User',
        email: 'new@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        acceptTerms: true
      };

      const result = await registerUser(userData);
      expect(result.success).toBe(true);
      expect(result.message).toContain('successfully');
    });
  });

  describe('getUserStats', () => {
    it('returns user statistics', async () => {
      const result = await getUserStats();

      expect(result).toBeDefined();
      expect(result.totalUsers).toBeDefined();
      expect(result.activeUsers).toBeDefined();
      expect(result.newUsersThisMonth).toBeDefined();
      expect(result.usersByRole).toBeDefined();
    });

    it('includes role distribution', async () => {
      const result = await getUserStats();

      expect(result.usersByRole).toHaveProperty('ADMIN');
      expect(result.usersByRole).toHaveProperty('USER');
      expect(result.usersByRole).toHaveProperty('DEVELOPMENT');
      expect(result.usersByRole).toHaveProperty('SUPERADMIN');
    });
  });
});
