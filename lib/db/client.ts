// Unified Prisma Client with Singleton Pattern
// This replaces the dual-database setup with a single, optimized client instance
// Implements connection pooling best practices and RLS context management

import { PrismaClient, Prisma } from "@prisma/client";

// Global variable to store the singleton instance
declare global {
  // Prevent multiple instances in development due to hot reloading
  var __globalPrismaClient: PrismaClient | undefined;
}

// Database configuration optimized for serverless environments
const createPrismaClient = () => {
  console.log('🔧 DATABASE_URL:', process.env.DATABASE_URL);
  console.log('🔧 Should use mock:', process.env.DATABASE_URL?.includes('mock'));

  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],

    // Connection pool configuration for optimal performance
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  // Add middleware for Row-Level Security (RLS) context setting (for real database)
  if (!process.env.DATABASE_URL?.includes('mock')) {
    (client as any).$use(async (params: any, next: any) => {
      // Extract orgId from the query params if available
      const orgId = extractOrgIdFromParams(params);

      if (orgId) {
        // Set the organization context for RLS policies
        await (client as any).$executeRaw`SELECT set_config('app.current_org_id', ${orgId}, true)`;
      }

      return next(params);
    });
  }

  // For development with mock data, create a simple in-memory mock client
  if (process.env.DATABASE_URL?.includes('mock')) {
    console.log('🔧 Using mock database for development');
    // In-memory storage for mock data (server-side only)
    const mockStorage: {
      users: any[];
      accounts: any[];
      sessions: any[];
      verificationTokens: any[];
      passwordResetTokens: any[];
      twoFactorTokens: any[];
      twoFactorConfirmations: any[];
      organizations: any[];
      userOrganizations: any[];
      feedback: any[];
      images: any[];
      updateLogs: any[];
      telegramSettings: any[];
      versionInfos: any[];
    } = {
      users: [
        {
          id: 'mock-user-1',
          name: 'Demo User',
          email: 'demo@example.com',
          password: '$2a$12$KYRlu/KpzG2lez782RxaNe/gsY.GI5OxVa14AM6ZCxmdHxymFVkHi', // bcrypt hash for 'password'
          emailVerified: new Date(),
          role: 'USER',
          isActive: true,
          isTwoFactorEnabled: false,
          defaultOrgId: 'mock-org-1',
          image: '/images/demo-user.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-admin-1',
          name: 'Admin User',
          email: 'admin@example.com',
          password: '$2a$12$KYRlu/KpzG2lez782RxaNe/gsY.GI5OxVa14AM6ZCxmdHxymFVkHi', // bcrypt hash for 'password'
          emailVerified: new Date(),
          role: 'ADMIN',
          isActive: true,
          isTwoFactorEnabled: false,
          defaultOrgId: 'mock-org-1',
          image: '/images/admin-user.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-superadmin-1',
          name: 'Super Admin',
          email: 'superadmin@example.com',
          password: '$2a$12$KYRlu/KpzG2lez782RxaNe/gsY.GI5OxVa14AM6ZCxmdHxymFVkHi', // bcrypt hash for 'password'
          emailVerified: new Date(),
          role: 'SUPERADMIN',
          isActive: true,
          isTwoFactorEnabled: true,
          defaultOrgId: 'mock-org-1',
          image: '/images/superadmin.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-teacher-1',
          name: 'John Teacher',
          email: 'teacher@example.com',
          password: '$2a$12$KYRlu/KpzG2lez782RxaNe/gsY.GI5OxVa14AM6ZCxmdHxymFVkHi', // bcrypt hash for 'password'
          emailVerified: new Date(),
          role: 'USER',
          isActive: false,
          isTwoFactorEnabled: false,
          defaultOrgId: 'mock-org-1',
          image: '/images/teacher.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-student-1',
          name: 'Alice Student',
          email: 'student@example.com',
          password: '$2a$12$KYRlu/KpzG2lez782RxaNe/gsY.GI5OxVa14AM6ZCxmdHxymFVkHi', // bcrypt hash for 'password'
          emailVerified: new Date(),
          role: 'USER',
          isActive: true,
          isTwoFactorEnabled: false,
          defaultOrgId: 'mock-org-2',
          image: '/images/student.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      accounts: [],
      sessions: [],
      verificationTokens: [],
      passwordResetTokens: [],
      twoFactorTokens: [],
      twoFactorConfirmations: [],
      organizations: [
        {
          id: 'mock-org-1',
          name: 'Demo School',
          description: 'A demonstration school organization for educational purposes',
          type: 'SCHOOL',
          logoImage: '/images/school-logo.png',
          startedAt: new Date('2024-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-org-2',
          name: 'Demo Church',
          description: 'A demonstration church organization for community services',
          type: 'CHURCH',
          logoImage: '/images/church-logo.png',
          startedAt: new Date('2024-01-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-org-3',
          name: 'Tech Corp',
          description: 'A technology company focused on software development',
          type: 'CORPORATE',
          logoImage: '/images/corp-logo.png',
          startedAt: new Date('2023-06-15'),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-org-4',
          name: 'Community Library',
          description: 'Public library serving the local community',
          type: 'OTHER',
          logoImage: '/images/library-logo.png',
          startedAt: new Date('2022-09-01'),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      userOrganizations: [
        {
          id: 'mock-user-org-1',
          userId: 'mock-user-1',
          organizationId: 'mock-org-1',
          role: 'USER',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-user-org-2',
          userId: 'mock-admin-1',
          organizationId: 'mock-org-1',
          role: 'ADMIN',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-user-org-3',
          userId: 'mock-superadmin-1',
          organizationId: 'mock-org-1',
          role: 'ADMIN',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-user-org-4',
          userId: 'mock-teacher-1',
          organizationId: 'mock-org-1',
          role: 'USER',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-user-org-5',
          userId: 'mock-student-1',
          organizationId: 'mock-org-2',
          role: 'USER',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-user-org-6',
          userId: 'mock-admin-1',
          organizationId: 'mock-org-3',
          role: 'ADMIN',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'mock-user-org-7',
          userId: 'mock-superadmin-1',
          organizationId: 'mock-org-4',
          role: 'ADMIN',
          status: 'ACTIVE',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      feedback: [
        {
          id: 'mock-feedback-1',
          name: 'Anonymous User',
          email: 'user@example.com',
          message: 'Great application! Very user-friendly.',
          anonymous: false,
          status: 'RESOLVED',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      images: [
        {
          id: 'mock-image-1',
          filename: 'demo-image.jpg',
          url: '/images/demo.jpg',
          ownerId: 'mock-user-1',
          ownerType: 'USER',
          size: 1024000,
          mimeType: 'image/jpeg',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      updateLogs: [
        {
          id: 'mock-log-1',
          type: 'SYSTEM_UPDATE',
          message: 'Mock database initialized',
          details: 'Development mock data loaded successfully',
          createdAt: new Date(),
        }
      ],
      telegramSettings: [
        {
          id: 'mock-telegram-1',
          userId: 'mock-user-1',
          role: 'USER',
          telegramChatId: null,
          telegramBotToken: null,
          isActive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      versionInfos: [
        {
          id: 'mock-version-1',
          name: 'P-Core v1.0.0',
          version: '1.0.0',
          description: 'Initial release with authentication, organization management, and settings',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
        {
          id: 'mock-version-2',
          name: 'P-Core v1.1.0',
          version: '1.1.0',
          description: 'Enhanced user interface and performance improvements',
          createdAt: new Date(Date.now() - 86400000), // 1 day ago
          updatedAt: new Date(Date.now() - 86400000),
          deletedAt: null,
        }
      ],
    };

    // Create a mock Prisma client
    const mockClient = {
      $connect: () => Promise.resolve(),
      $disconnect: () => Promise.resolve(),
      $queryRaw: () => Promise.resolve([]),

      user: {
        findUnique: ({ where }: any) => {
          const user = mockStorage.users.find(u =>
            (where.id && u.id === where.id) ||
            (where.email && u.email === where.email)
          );
          return Promise.resolve(user || null);
        },
        findFirst: ({ where }: any) => {
          const user = mockStorage.users.find(u =>
            (where.email && u.email === where.email)
          );
          return Promise.resolve(user || null);
        },
        findMany: ({ where, select }: any) => {
          console.log('🔍 user.findMany called with:', { where, select });
          let results = mockStorage.users;
          if (where) {
            if (where.role) {
              results = results.filter(u => u.role === where.role);
            }
            if (where.email) {
              results = results.filter(u => u.email === where.email);
            }
            if (where.isActive !== undefined) {
              results = results.filter(u => u.isActive === where.isActive);
            }
            // Add other where conditions as needed
          }

          // Handle select with relationships
          console.log('🔍 Processing select:', select, 'isTruthy:', !!select);
          if (select) {
            results = results.map(user => {
              const selectedUser: any = {};

              // Copy all requested fields - only include fields explicitly set to true
              Object.keys(select).forEach(key => {
                if (select[key] === true && user[key] !== undefined) {
                  selectedUser[key] = user[key];
                }
              });

              // Handle organizations relationship
              if (select.organizations) {
                const userOrgs = mockStorage.userOrganizations.filter(uo => uo.userId === user.id);
                selectedUser.organizations = userOrgs.map(uo => ({
                  organizationId: uo.organizationId,
                  role: uo.role,
                  status: uo.status,
                }));
                console.log(`🔗 User ${user.id} has ${selectedUser.organizations.length} organizations`);
              }

              console.log(`🔍 Selected user ${user.id}:`, selectedUser);
              return selectedUser;
            });
          }

          console.log('🔍 user.findMany returning:', results.length, 'users');
          return Promise.resolve(results);
        },
        create: ({ data }: any) => {
          const newUser = {
            ...data,
            id: `mock-user-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          mockStorage.users.push(newUser);
          return Promise.resolve(newUser);
        },
        update: ({ where, data, select }: any) => {
          const index = mockStorage.users.findIndex(u =>
            (where.id && u.id === where.id) ||
            (where.email && u.email === where.email)
          );
          if (index !== -1) {
            mockStorage.users[index] = { ...mockStorage.users[index], ...data, updatedAt: new Date() };
            const updatedUser = mockStorage.users[index];

            // Apply select if specified
            if (select) {
              const selectedUser: any = {};
              Object.keys(select).forEach(key => {
                if (select[key] === true && updatedUser[key] !== undefined) {
                  selectedUser[key] = updatedUser[key];
                }
              });
              return Promise.resolve(selectedUser);
            }

            return Promise.resolve(updatedUser);
          }
          return Promise.resolve(null);
        },
        delete: ({ where }: any) => {
          const index = mockStorage.users.findIndex(u =>
            (where.id && u.id === where.id) ||
            (where.email && u.email === where.email)
          );
          if (index !== -1) {
            const deletedUser = mockStorage.users.splice(index, 1)[0];
            return Promise.resolve(deletedUser);
          }
          return Promise.resolve(null);
        },
      },

      account: {
        findFirst: ({ where }: any) => {
          const account = mockStorage.accounts.find(a =>
            (where.userId && a.userId === where.userId) ||
            (where.provider && where.providerAccountId && a.provider === where.provider && a.providerAccountId === where.providerAccountId)
          );
          return Promise.resolve(account || null);
        },
        create: ({ data }: any) => {
          const newAccount = {
            ...data,
            id: `mock-account-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          mockStorage.accounts.push(newAccount);
          return Promise.resolve(newAccount);
        },
      },

      verificationToken: {
        findFirst: ({ where }: any) => {
          const token = mockStorage.verificationTokens.find(t =>
            t.identifier === where.identifier && t.token === where.token
          );
          return Promise.resolve(token || null);
        },
        create: ({ data }: any) => {
          const newToken = {
            ...data,
            id: `mock-token-${Date.now()}`,
            createdAt: new Date(),
          };
          mockStorage.verificationTokens.push(newToken);
          return Promise.resolve(newToken);
        },
        delete: ({ where }: any) => {
          const index = mockStorage.verificationTokens.findIndex(t =>
            t.identifier === where.identifier
          );
          if (index !== -1) {
            const deleted = mockStorage.verificationTokens.splice(index, 1)[0];
            return Promise.resolve(deleted);
          }
          return Promise.resolve(null);
        },
      },

      passwordResetToken: {
        findFirst: ({ where }: any) => {
          const token = mockStorage.passwordResetTokens.find(t =>
            t.email === where.email
          );
          return Promise.resolve(token || null);
        },
        create: ({ data }: any) => {
          const newToken = {
            ...data,
            id: `mock-reset-${Date.now()}`,
            createdAt: new Date(),
          };
          mockStorage.passwordResetTokens.push(newToken);
          return Promise.resolve(newToken);
        },
        delete: ({ where }: any) => {
          const index = mockStorage.passwordResetTokens.findIndex(t =>
            t.email === where.email
          );
          if (index !== -1) {
            const deleted = mockStorage.passwordResetTokens.splice(index, 1)[0];
            return Promise.resolve(deleted);
          }
          return Promise.resolve(null);
        },
      },

      twoFactorToken: {
        findFirst: ({ where }: any) => {
          const token = mockStorage.twoFactorTokens.find(t =>
            t.email === where.email
          );
          return Promise.resolve(token || null);
        },
        create: ({ data }: any) => {
          const newToken = {
            ...data,
            id: `mock-2fa-${Date.now()}`,
            createdAt: new Date(),
          };
          mockStorage.twoFactorTokens.push(newToken);
          return Promise.resolve(newToken);
        },
        delete: ({ where }: any) => {
          const index = mockStorage.twoFactorTokens.findIndex(t =>
            t.id === where.id
          );
          if (index !== -1) {
            const deleted = mockStorage.twoFactorTokens.splice(index, 1)[0];
            return Promise.resolve(deleted);
          }
          return Promise.resolve(null);
        },
      },

      twoFactorConfirmation: {
        findFirst: ({ where }: any) => {
          const confirmation = mockStorage.twoFactorConfirmations.find(c =>
            c.userId === where.userId
          );
          return Promise.resolve(confirmation || null);
        },
        create: ({ data }: any) => {
          const newConfirmation = {
            ...data,
            id: `mock-confirm-${Date.now()}`,
            createdAt: new Date(),
          };
          mockStorage.twoFactorConfirmations.push(newConfirmation);
          return Promise.resolve(newConfirmation);
        },
        delete: ({ where }: any) => {
          const index = mockStorage.twoFactorConfirmations.findIndex(c =>
            c.id === where.id
          );
          if (index !== -1) {
            const deleted = mockStorage.twoFactorConfirmations.splice(index, 1)[0];
            return Promise.resolve(deleted);
          }
          return Promise.resolve(null);
        },
      },

      telegramSetting: {
        findFirst: ({ where }: any) => {
          const setting = mockStorage.telegramSettings.find(s =>
            s.userId === where.userId && s.role === where.role
          );
          return Promise.resolve(setting || null);
        },
        create: ({ data }: any) => {
          const newSetting = {
            ...data,
            id: `mock-telegram-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          mockStorage.telegramSettings.push(newSetting);
          return Promise.resolve(newSetting);
        },
        update: ({ where, data }: any) => {
          const index = mockStorage.telegramSettings.findIndex(s =>
            s.userId === where.userId && s.role === where.role
          );
          if (index !== -1) {
            mockStorage.telegramSettings[index] = { ...mockStorage.telegramSettings[index], ...data, updatedAt: new Date() };
            return Promise.resolve(mockStorage.telegramSettings[index]);
          }
          return Promise.resolve(null);
        },
      },

      userOrganization: {
        findMany: ({ where, select }: any) => {
          console.log('🔍 userOrganization.findMany called with:', { where, select });
          let results = mockStorage.userOrganizations;
          if (where) {
            if (where.userId) {
              results = results.filter(uo => uo.userId === where.userId);
              console.log(`🔍 Filtered by userId ${where.userId}, found ${results.length} records`);
            }
            if (where.status) {
              results = results.filter(uo => uo.status === where.status);
            }
          }

          // Apply select if specified
          if (select && results.length > 0) {
            results = results.map(item => {
              const selected: any = {};

              // Copy selected fields
              if (select.userId) selected.userId = item.userId;
              if (select.role) selected.role = item.role;

              // Handle organization relationship
              if (select.organization && typeof select.organization === 'object') {
                console.log('🔍 Processing organization relationship for item:', item);
                const org = mockStorage.organizations.find(o => o.id === item.organizationId);
                console.log(`🔍 Looking for organization ${item.organizationId}, found:`, !!org);
                console.log('🔍 Available organizations:', mockStorage.organizations.map(o => o.id));
                if (org) {
                  selected.organization = {
                    id: org.id,
                    name: org.name,
                    description: org.description,
                    startedAt: org.startedAt,
                    logoImage: org.logoImage,
                    type: org.type,
                  };
                  console.log('🔍 Populated organization:', selected.organization);
                } else {
                  console.log(`❌ Organization ${item.organizationId} not found in mock data`);
                  selected.organization = null;
                }
              }

              return selected;
            });
          }

          console.log('🔍 userOrganization.findMany returning:', results);
          return Promise.resolve(results);
        },
        create: ({ data }: any) => {
          const newUserOrg = {
            ...data,
            id: `mock-user-org-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          mockStorage.userOrganizations.push(newUserOrg);
          return Promise.resolve(newUserOrg);
        },
      },

      versionInfo: {
        findMany: ({ orderBy, select }: any) => {
          console.log('🔍 versionInfo.findMany called with:', { orderBy, select });
          let results = [...mockStorage.versionInfos];
          console.log('🔍 Initial versionInfos:', results);

          // Apply ordering
          if (orderBy && orderBy.createdAt === 'desc') {
            results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          }

          // Apply select if specified
          if (select && results.length > 0) {
            results = results.map(item => {
              const selected: any = {};
              // Always include required fields that are in select
              if (select.id) selected.id = item.id;
              if (select.name) selected.name = item.name;
              if (select.version) selected.version = item.version;
              if (select.description) selected.description = item.description;
              if (select.createdAt) selected.createdAt = item.createdAt;
              if (select.updatedAt) selected.updatedAt = item.updatedAt;
              if (select.deletedAt) selected.deletedAt = item.deletedAt;

              console.log(`🔍 Selected item:`, selected);
              return selected;
            });
          }

          console.log('🔍 versionInfo.findMany returning:', results);
          return Promise.resolve(results);
        },
      },
    };

    return mockClient as any;
  }

  return client;
};

// Helper function to extract orgId from query parameters
function extractOrgIdFromParams(params: any): string | null {
  if (!params.args) return null;

  // Handle different query structures
  if (params.args.where?.orgId) {
    return params.args.where.orgId;
  }
  
  if (params.args.data?.orgId) {
    return params.args.data.orgId;
  }

  return null;
}

// Singleton pattern implementation
// Ensures single instance across the application lifecycle
export const prisma = globalThis.__globalPrismaClient ?? createPrismaClient();

// In development, store the client globally to prevent multiple instances
if (process.env.NODE_ENV === "development") {
  globalThis.__globalPrismaClient = prisma;
}

// Connection management utilities
export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log("✅ Database disconnected successfully");
  } catch (error) {
    console.error("❌ Database disconnection failed:", error);
    throw error;
  }
};

// Health check function for monitoring
export const checkDatabaseHealth = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: "healthy", timestamp: new Date().toISOString() };
  } catch (error) {
    return { 
      status: "unhealthy", 
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString() 
    };
  }
};

// Export the singleton client as default
export default prisma;

// Explicit type exports to avoid CommonJS warning
export type { 
  PrismaClient,
  Prisma,
  User,
  UserRole,
  Organization,
  OrganizationType,
  OrganizationRole,
  UserOrganization,
  UserOrganizationStatus,
  Student,
  Course,
  StudentCourse,
  StudentCourseStatus,
  Purchase,
  PurchaseStatus,
  PaymentMethod,
  Member,
  Book,
  BookLoan,
  BookLoanStatus,
  Choir,
  ChoirMember,
  ChoirMemberStatus,
  Song,
  VoicePart,
  TelegramSetting,
  TelegramScope,
  UpdateLog,
  LogType,
  Image,
  ImageOwner,
  OrganizationInvite,
  OrganizationInviteStatus,
  Feedback,
  Gender,
  DayOfWeek,
  VersionInfo,
  Schedule,
  LessonBook,
  CourseStatusLog,
  Home,
  Veng,
  Khawk,
  FamilyRelationship,
  RelationshipType,
  MemberRole,
  MemberRoleAssignment,
  ChoirEvent,
  Account,
  Session,
  VerificationToken,
  PasswordResetToken,
  TwoFactorToken,
  TwoFactorConfirmation
} from "@prisma/client";
