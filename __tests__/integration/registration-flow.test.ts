d/**
 * Registration Flow Integration Tests
 * End-to-end tests for the complete registration process
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RegisterSchema } from '../../lib/schemas';
import { register } from '../../actions/auth/register';
import { UserRole, OrganizationRole, OrgType } from '../../types/auth';

// Mock all external dependencies
vi.mock('../../lib/db', () => ({
  db: {
    user: {
      create: vi.fn(),
      update: vi.fn(),
      findUnique: vi.fn(),
    },
    organization: {
      create: vi.fn(),
    },
    userOrganization: {
      create: vi.fn(),
    },
  },
}));

vi.mock('../../data/user', () => ({
  getUserByEmail: vi.fn(),
}));

vi.mock('../../lib/tokens', () => ({
  generateVerificationToken: vi.fn(),
}));

vi.mock('../../lib/mail/mail', () => ({
  sendVerificationEmail: vi.fn(),
}));

vi.mock('../../actions/auth/track-system-activities', () => ({
  trackRegister: vi.fn(),
}));

describe('Registration Flow Integration', () => {
  const mockDb = vi.mocked(await import('@/lib/db')).db;
  const mockGetUserByEmail = vi.mocked(await import('@/data/user')).getUserByEmail;
  const mockGenerateToken = vi.mocked(await import('@/lib/tokens')).generateVerificationToken;
  const mockSendEmail = vi.mocked(await import('@/lib/mail/mail')).sendVerificationEmail;
  const mockTrackRegister = vi.mocked(await import('@/actions/auth/track-system-activities')).trackRegister;

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mocks
    mockGetUserByEmail.mockResolvedValue(null);
    mockGenerateToken.mockResolvedValue({
      identifier: 'test@example.com',
      token: 'verification-token-123',
    });
    mockSendEmail.mockResolvedValue(undefined);
    mockTrackRegister.mockResolvedValue(undefined);

    mockDb.user.create.mockResolvedValue({
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
      role: UserRole.USER,
      isTwoFactorEnabled: false,
      emailVerified: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      defaultOrgId: null,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('Individual User Registration Flow', () => {
    it('should complete full registration flow for individual user', async () => {
      // 1. Validate schema
      const userData = {
        email: 'john.doe@example.com',
        password: 'securePassword123',
        name: 'John Doe',
        role: 'user' as const,
      };

      const schemaResult = RegisterSchema.safeParse(userData);
      expect(schemaResult.success).toBe(true);

      // 2. Execute registration
      const result = await register(userData);

      // 3. Verify success response
      expect(result).toEqual({
        success: 'Confirmation email sent!',
      });

      // 4. Verify database operations
      expect(mockDb.user.create).toHaveBeenCalledWith({
        data: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: expect.any(String), // Hashed password
          role: UserRole.USER,
        },
      });

      // 5. Verify no organization was created
      expect(mockDb.organization.create).not.toHaveBeenCalled();
      expect(mockDb.userOrganization.create).not.toHaveBeenCalled();

      // 6. Verify email verification was sent
      expect(mockGenerateToken).toHaveBeenCalledWith('john.doe@example.com');
      expect(mockSendEmail).toHaveBeenCalledWith('test@example.com', 'verification-token-123');

      // 7. Verify activity tracking
      expect(mockTrackRegister).toHaveBeenCalledWith({ value: 'john.doe@example.com' });
    });
  });

  describe('Company Registration Flow', () => {
    beforeEach(() => {
      mockDb.organization.create.mockResolvedValue({
        id: 'org-456',
        name: 'Tech Solutions Inc.',
        type: OrgType.COMPANY,
        ownerId: 'user-123',
        description: 'Tech Solutions Inc. - Created during registration',
        logo: null,
        website: null,
        size: 'SMALL',
        industry: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        settings: '{}',
      });

      mockDb.userOrganization.create.mockResolvedValue({
        id: 'user-org-789',
        userId: 'user-123',
        organizationId: 'org-456',
        role: OrganizationRole.OWNER,
        status: 'ACTIVE',
        joinedAt: new Date(),
      });
    });

    it('should complete full registration flow for company', async () => {
      // 1. Validate schema
      const companyData = {
        email: 'jane.smith@techsolutions.com',
        password: 'companyPass456',
        name: 'Jane Smith',
        role: 'company' as const,
        companyName: 'Tech Solutions Inc.',
      };

      const schemaResult = RegisterSchema.safeParse(companyData);
      expect(schemaResult.success).toBe(true);

      // 2. Execute registration
      const result = await register(companyData);

      // 3. Verify success response
      expect(result).toEqual({
        success: 'Confirmation email sent!',
      });

      // 4. Verify user creation with USER role
      expect(mockDb.user.create).toHaveBeenCalledWith({
        data: {
          name: 'Jane Smith',
          email: 'jane.smith@techsolutions.com',
          password: expect.any(String),
          role: UserRole.USER, // Company owners start as USER
        },
      });

      // 5. Verify organization creation
      expect(mockDb.organization.create).toHaveBeenCalledWith({
        data: {
          name: 'Tech Solutions Inc.',
          type: OrgType.COMPANY,
          ownerId: 'user-123',
          description: 'Tech Solutions Inc. - Created during registration',
        },
      });

      // 6. Verify user-organization relationship
      expect(mockDb.userOrganization.create).toHaveBeenCalledWith({
        data: {
          userId: 'user-123',
          organizationId: 'org-456',
          role: OrganizationRole.OWNER,
        },
      });

      // 7. Verify default organization assignment
      expect(mockDb.user.update).toHaveBeenCalledWith({
        where: { id: 'user-123' },
        data: { defaultOrgId: 'org-456' },
      });

      // 8. Verify email verification
      expect(mockGenerateToken).toHaveBeenCalledWith('jane.smith@techsolutions.com');
      expect(mockSendEmail).toHaveBeenCalled();

      // 9. Verify activity tracking
      expect(mockTrackRegister).toHaveBeenCalledWith({ value: 'jane.smith@techsolutions.com' });
    });
  });

  describe('Admin Registration Flow', () => {
    it('should complete full registration flow for admin', async () => {
      // 1. Validate schema
      const adminData = {
        email: 'admin@company.com',
        password: 'adminSecure789',
        name: 'Admin User',
        role: 'admin' as const,
      };

      const schemaResult = RegisterSchema.safeParse(adminData);
      expect(schemaResult.success).toBe(true);

      // 2. Execute registration
      const result = await register(adminData);

      // 3. Verify success response
      expect(result).toEqual({
        success: 'Confirmation email sent!',
      });

      // 4. Verify user creation with ADMIN role
      expect(mockDb.user.create).toHaveBeenCalledWith({
        data: {
          name: 'Admin User',
          email: 'admin@company.com',
          password: expect.any(String),
          role: UserRole.ADMIN,
        },
      });

      // 5. Verify no organization operations for admin
      expect(mockDb.organization.create).not.toHaveBeenCalled();
      expect(mockDb.userOrganization.create).not.toHaveBeenCalled();
      expect(mockDb.user.update).not.toHaveBeenCalled();

      // 6. Verify email verification and tracking
      expect(mockGenerateToken).toHaveBeenCalledWith('admin@company.com');
      expect(mockSendEmail).toHaveBeenCalled();
      expect(mockTrackRegister).toHaveBeenCalledWith({ value: 'admin@company.com' });
    });
  });

  describe('Error Scenarios', () => {
    it('should handle duplicate email registration', async () => {
      mockGetUserByEmail.mockResolvedValue({
        id: 'existing-user',
        email: 'existing@example.com',
        name: 'Existing User',
      });

      const duplicateData = {
        email: 'existing@example.com',
        password: 'password123',
        name: 'New User',
        role: 'user' as const,
      };

      const result = await register(duplicateData);

      expect(result).toEqual({
        error: 'Email already in use!',
      });

      // Verify no database operations occurred
      expect(mockDb.user.create).not.toHaveBeenCalled();
      expect(mockDb.organization.create).not.toHaveBeenCalled();
    });

    it('should handle database errors during user creation', async () => {
      mockDb.user.create.mockRejectedValue(new Error('Database connection failed'));

      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        role: 'user' as const,
      };

      await expect(register(userData)).rejects.toThrow('Database connection failed');
    });

    it('should handle organization creation failures', async () => {
      mockDb.organization.create.mockRejectedValue(new Error('Organization creation failed'));

      const companyData = {
        email: 'company@example.com',
        password: 'password123',
        name: 'Company Owner',
        role: 'company' as const,
        companyName: 'Test Company',
      };

      await expect(register(companyData)).rejects.toThrow('Organization creation failed');
    });
  });

  describe('Security & Validation', () => {
    it('should hash passwords before storage', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'myPlainTextPassword',
        name: 'Test User',
        role: 'user' as const,
      };

      await register(userData);

      const createCall = mockDb.user.create.mock.calls[0][0];
      const storedPassword = createCall.data.password;

      // Password should be hashed (bcrypt produces longer strings)
      expect(storedPassword).not.toBe('myPlainTextPassword');
      expect(storedPassword.length).toBeGreaterThan(20);
      expect(storedPassword.startsWith('$2')).toBe(true); // bcrypt hash format
    });

    it('should validate all required fields', () => {
      const invalidData = {
        email: 'invalid-email',
        password: '123', // too short
        name: '', // empty
        role: 'invalid' as any,
      };

      const result = RegisterSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      expect(result.error?.issues.length).toBeGreaterThan(0);
    });

    it('should require company name for company role', () => {
      const invalidCompanyData = {
        email: 'company@example.com',
        password: 'password123',
        name: 'Company Owner',
        role: 'company' as const,
        // Missing companyName
      };

      const result = RegisterSchema.safeParse(invalidCompanyData);
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toBe('Company name is required when registering as a company');
    });
  });

  describe('Email Verification Integration', () => {
    it('should generate and send verification tokens', async () => {
      const userData = {
        email: 'verify@example.com',
        password: 'password123',
        name: 'Verify User',
        role: 'user' as const,
      };

      await register(userData);

      expect(mockGenerateToken).toHaveBeenCalledWith('verify@example.com');
      expect(mockGenerateToken).toHaveBeenCalledTimes(1);

      expect(mockSendEmail).toHaveBeenCalledWith(
        'test@example.com', // identifier from mock
        'verification-token-123' // token from mock
      );
      expect(mockSendEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('Activity Tracking', () => {
    it('should track registration events', async () => {
      const userData = {
        email: 'track@example.com',
        password: 'password123',
        name: 'Track User',
        role: 'user' as const,
      };

      await register(userData);

      expect(mockTrackRegister).toHaveBeenCalledWith({ value: 'track@example.com' });
      expect(mockTrackRegister).toHaveBeenCalledTimes(1);
    });
  });
});
