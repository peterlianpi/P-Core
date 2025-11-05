/**
 * Register Schema Tests
 * Tests for the enhanced registration schema with role selection
 */

import { describe, it, expect } from 'vitest';
import { RegisterSchema } from '../../lib/schemas';
import { UserRole } from '../../types/auth';

describe('RegisterSchema', () => {
  describe('Individual User Registration', () => {
    it('should validate valid individual user data', () => {
      const validData = {
        email: 'user@example.com',
        password: 'password123',
        name: 'John Doe',
        role: 'user' as const,
      };

      const result = RegisterSchema.safeParse(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
    });

    it('should accept individual user without company name', () => {
      const dataWithoutCompany = {
        email: 'user@example.com',
        password: 'password123',
        name: 'John Doe',
        role: 'user' as const,
      };

      const result = RegisterSchema.safeParse(dataWithoutCompany);
      expect(result.success).toBe(true);
    });
  });

  describe('Company Registration', () => {
    it('should validate valid company registration data', () => {
      const validCompanyData = {
        email: 'company@example.com',
        password: 'password123',
        name: 'Jane Smith',
        role: 'company' as const,
        companyName: 'Tech Solutions Inc.',
      };

      const result = RegisterSchema.safeParse(validCompanyData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validCompanyData);
    });

    it('should reject company registration without company name', () => {
      const invalidCompanyData = {
        email: 'company@example.com',
        password: 'password123',
        name: 'Jane Smith',
        role: 'company' as const,
        // Missing companyName
      };

      const result = RegisterSchema.safeParse(invalidCompanyData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toBe('Company name is required when registering as a company');
    });

    it('should reject company registration with empty company name', () => {
      const invalidCompanyData = {
        email: 'company@example.com',
        password: 'password123',
        name: 'Jane Smith',
        role: 'company' as const,
        companyName: '', // Empty company name
      };

      const result = RegisterSchema.safeParse(invalidCompanyData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toBe('Company name is required when registering as a company');
    });
  });

  describe('Admin Registration', () => {
    it('should validate valid admin registration data', () => {
      const validAdminData = {
        email: 'admin@example.com',
        password: 'password123',
        name: 'Admin User',
        role: 'admin' as const,
      };

      const result = RegisterSchema.safeParse(validAdminData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validAdminData);
    });

    it('should accept admin registration without company name', () => {
      const adminData = {
        email: 'admin@example.com',
        password: 'password123',
        name: 'Admin User',
        role: 'admin' as const,
      };

      const result = RegisterSchema.safeParse(adminData);
      expect(result.success).toBe(true);
    });
  });

  describe('Field Validation', () => {
    it('should reject invalid email format', () => {
      const invalidEmailData = {
        email: 'invalid-email',
        password: 'password123',
        name: 'Test User',
        role: 'user' as const,
      };

      const result = RegisterSchema.safeParse(invalidEmailData);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some(issue => issue.path.includes('email'))).toBe(true);
    });

    it('should reject password shorter than 6 characters', () => {
      const shortPasswordData = {
        email: 'user@example.com',
        password: '12345', // Too short
        name: 'Test User',
        role: 'user' as const,
      };

      const result = RegisterSchema.safeParse(shortPasswordData);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some(issue => issue.path.includes('password'))).toBe(true);
    });

    it('should reject empty name', () => {
      const emptyNameData = {
        email: 'user@example.com',
        password: 'password123',
        name: '', // Empty name
        role: 'user' as const,
      };

      const result = RegisterSchema.safeParse(emptyNameData);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some(issue => issue.path.includes('name'))).toBe(true);
    });

    it('should reject invalid role', () => {
      const invalidRoleData = {
        email: 'user@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'invalid-role', // Invalid role
      };

      const result = RegisterSchema.safeParse(invalidRoleData);
      expect(result.success).toBe(false);
      expect(result.error?.issues.some(issue => issue.path.includes('role'))).toBe(true);
    });
  });

  describe('Role Validation', () => {
    it('should accept all valid roles', () => {
      const validRoles = ['user', 'admin', 'company'] as const;

      validRoles.forEach(role => {
        const data = {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
          role,
          ...(role === 'company' ? { companyName: 'Test Company' } : {}),
        };

        const result = RegisterSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject roles not in the allowed list', () => {
      const invalidRoles = ['superadmin', 'moderator', 'guest', ''];

      invalidRoles.forEach(role => {
        const data = {
          email: 'test@example.com',
          password: 'password123',
          name: 'Test User',
          role,
        };

        const result = RegisterSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Data Transformation', () => {
    it('should preserve all valid data fields', () => {
      const inputData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'company' as const,
        companyName: 'Test Company Inc.',
      };

      const result = RegisterSchema.safeParse(inputData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(inputData);
    });

    it('should handle optional companyName field correctly', () => {
      // For non-company roles, companyName should be undefined
      const userData = {
        email: 'user@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'user' as const,
      };

      const userResult = RegisterSchema.safeParse(userData);
      expect(userResult.success).toBe(true);
      expect(userResult.data?.companyName).toBeUndefined();

      // For company role, companyName should be present
      const companyData = {
        email: 'company@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'company' as const,
        companyName: 'Test Company',
      };

      const companyResult = RegisterSchema.safeParse(companyData);
      expect(companyResult.success).toBe(true);
      expect(companyResult.data?.companyName).toBe('Test Company');
    });
  });
});
