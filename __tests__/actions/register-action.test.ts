/**
 * Register Action Tests
 * Tests for the enhanced registration server action
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { register } from '../../actions/auth/register';
import { UserRole, OrganizationRole, OrgType } from '../../types/auth';

// Mock the database
const mockUserCreate = vi.fn();
const mockOrganizationCreate = vi.fn();
const mockUserOrganizationCreate = vi.fn();
const mockUserUpdate = vi.fn();

vi.mock('../../lib/db', () => ({
  db: {
    user: {
      create: mockUserCreate,
      update: mockUserUpdate,
      findUnique: vi.fn(),
    },
    organization: {
      create: mockOrganizationCreate,
    },
    userOrganization: {
      create: mockUserOrganizationCreate,
    },
  },
}));

// Mock token generation and email sending
vi.mock('../../lib/tokens', () => ({
  generateVerificationToken: vi.fn().mockResolvedValue({
    identifier: 'test@example.com',
    token: 'mock-verification-token',
  }),
}));

vi.mock('../../lib/mail/mail', () => ({
  sendVerificationEmail: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../actions/auth/track-system-activities', () => ({
  trackRegister: vi.fn().mockResolvedValue(undefined),
}));

describe('register action', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock successful database operations
    mockUserCreate.mockResolvedValue({
      id: 'user-id-123',
      email: 'test@example.com',
      name: 'Test User',
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Individual User Registration', () => {
    it('should create a user with USER role for individual registration', async () => {
      const userData = {
        email: 'user@example.com',
        password: 'password123',
        name: 'John Doe',
        role: 'user' as const,
      };

      const result = await register(userData);

      expect(result).toEqual({
        success: 'Confirmation email sent!',
      });

      expect(mockUserCreate).toHaveBeenCalledWith({
        data: {
          name: 'John Doe',
          email: 'user@example.com',
          password: expect.any(String), // Hashed password
          role: UserRole.USER,
        },
      });

      // Should not create organization for individual users
      expect(mockOrganizationCreate).not.toHaveBeenCalled();
      expect(mockUserOrganizationCreate).not.toHaveBeenCalled();
    });

    it('should hash the password before storing', async () => {
      const userData = {
        email: 'user@example.com',
        password: 'password123',
        name: 'John Doe',
        role: 'user' as const,
      };

      await register(userData);

      const createCall = mockUserCreate.mock.calls[0][0];
      const storedPassword = createCall.data.password;

      // Password should be hashed (bcrypt hash is longer than original)
      expect(storedPassword).not.toBe('password123');
      expect(storedPassword.length).toBeGreaterThan(10);
    });
  });

  describe('Company Registration', () => {
    beforeEach(() => {
      mockOrganizationCreate.mockResolvedValue({
        id: 'org-id-123',
        name: 'Test Company',
        type: OrgType.COMPANY,
        ownerId: 'user-id-123',
      });

      mockUserOrganizationCreate.mockResolvedValue({
        id: 'user-org-id-123',
        userId: 'user-id-123',
        organizationId: 'org-id-123',
        role: OrganizationRole.OWNER,
      });
    });

    it('should create user, organization, and relationship for company registration', async () => {
      const companyData = {
        email: 'company@example.com',
        password: 'password123',
        name: 'Jane Smith',
        role: 'company' as const,
        companyName: 'Tech Solutions Inc.',
      };

      const result = await register(companyData);

      expect(result).toEqual({
        success: 'Confirmation email sent!',
      });

      // Should create user with USER role (not ADMIN)
      expect(mockUserCreate).toHaveBeenCalledWith({
        data: {
          name: 'Jane Smith',
          email: 'company@example.com',
          password: expect.any(String),
          role: UserRole.USER, // Company owners start as USER
        },
      });

      // Should create organization
      expect(mockOrganizationCreate).toHaveBeenCalledWith({
        data: {
          name: 'Tech Solutions Inc.',
          type: OrgType.COMPANY,
          ownerId: 'user-id-123',
          description: 'Tech Solutions Inc. - Created during registration',
        },
      });

      // Should create user-organization relationship
      expect(mockUserOrganizationCreate).toHaveBeenCalledWith({
        data: {
          userId: 'user-id-123',
          organizationId: 'org-id-123',
          role: OrganizationRole.OWNER,
        },
      });

      // Should set default organization for user
      expect(mockUserUpdate).toHaveBeenCalledWith({
        where: { id: 'user-id-123' },
        data: { defaultOrgId: 'org-id-123' },
      });
    });

    it('should handle organization creation failure', async () => {
      mockOrganizationCreate.mockRejectedValue(new Error('Database error'));

      const companyData = {
        email: 'company@example.com',
        password: 'password123',
        name: 'Jane Smith',
        role: 'company' as const,
        companyName: 'Test Company',
      };

      await expect(register(companyData)).rejects.toThrow('Database error');
    });
  });

  describe('Admin Registration', () => {
    it('should create a user with ADMIN role for admin registration', async () => {
      const adminData = {
        email: 'admin@example.com',
        password: 'password123',
        name: 'Admin User',
        role: 'admin' as const,
      };

      const result = await register(adminData);

      expect(result).toEqual({
        success: 'Confirmation email sent!',
      });

      expect(mockUserCreate).toHaveBeenCalledWith({
        data: {
          name: 'Admin User',
          email: 'admin@example.com',
          password: expect.any(String),
          role: UserRole.ADMIN,
        },
      });

      // Should not create organization for admin users
      expect(mockOrganizationCreate).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should return error for existing email', async () => {
      // Mock user already exists
      const mockGetUserByEmail = vi.fn().mockResolvedValue({
        id: 'existing-user-id',
        email: 'existing@example.com',
      });

      vi.doMock('../../data/user', () => ({
        getUserByEmail: mockGetUserByEmail,
      }));

      const userData = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'user' as const,
      };

      // Re-import to get the mocked version
      const { register: mockedRegister } = await import('../../actions/auth/register');

      const result = await mockedRegister(userData);
      expect(result).toEqual({
        error: 'Email already in use!',
      });

      expect(mockUserCreate).not.toHaveBeenCalled();
    });

    it('should handle database errors during user creation', async () => {
      mockUserCreate.mockRejectedValue(new Error('Database connection failed'));

      const userData = {
        email: 'user@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'user' as const,
      };

      await expect(register(userData)).rejects.toThrow('Database connection failed');
    });
  });

  describe('Email Verification', () => {
    it('should generate and send verification email', async () => {
      const userData = {
        email: 'user@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'user' as const,
      };

      await register(userData);

      // Verify email verification was triggered
      const { generateVerificationToken } = await import('../../lib/tokens');
      const { sendVerificationEmail } = await import('../../lib/mail/mail');

      expect(generateVerificationToken).toHaveBeenCalledWith('user@example.com');
      expect(sendVerificationEmail).toHaveBeenCalledWith(
        'test@example.com',
        'mock-verification-token'
      );
    });

    it('should track registration activity', async () => {
      const userData = {
        email: 'user@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'user' as const,
      };

      await register(userData);

      const { trackRegister } = await import('../../actions/auth/track-system-activities');
      expect(trackRegister).toHaveBeenCalledWith({ value: 'user@example.com' });
    });
  });

  describe('Role Mapping', () => {
    it('should correctly map registration roles to UserRole enums', async () => {
      const testCases = [
        { input: 'user' as const, expected: UserRole.USER },
        { input: 'admin' as const, expected: UserRole.ADMIN },
        { input: 'company' as const, expected: UserRole.USER }, // Company owners start as USER
      ];

      for (const { input, expected } of testCases) {
        mockUserCreate.mockClear();

        const data = {
          email: `test-${input}@example.com`,
          password: 'password123',
          name: 'Test User',
          role: input,
          ...(input === 'company' ? { companyName: 'Test Company' } : {}),
        };

        await register(data);

        expect(mockUserCreate).toHaveBeenCalledWith({
          data: expect.objectContaining({
            role: expected,
          }),
        });
      }
    });
  });
});
