// API Types for P-Core System
import { UserRole, OrganizationRole, UserOrganizationStatus, LogType, OrganizationType } from "@prisma/client";

// Base API Response Types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  success?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// User & Organization Types
export interface UserWithOrganizations {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  createdAt: Date;
  isTwoFactorEnabled: boolean;
  organizations: {
    role: OrganizationRole;
    organization: {
      id: string;
      name: string;
      type: OrganizationType;
    };
  }[];
}

export interface OrganizationWithDetails {
  id: string;
  name: string;
  description: string | null;
  type: OrganizationType;
  createdAt: Date;
  startedAt: Date | null;
  logoImage: string | null;
  _count: {
    users: number;
  };
  createdBy: {
    name: string | null;
    email: string;
  };
  users: {
    role: OrganizationRole;
    user: {
      name: string | null;
      email: string;
    };
  }[];
}

// Dashboard Types
export interface DashboardStats {
  overview: {
    totalUsers: number;
    totalOrganizations: number;
    activeOrganizations: number;
    totalStudents: number;
    totalMembers: number;
    totalCourses: number;
    totalBooks: number;
    totalRevenue: number;
    recentSignups: number;
    userGrowthRate: number;
    orgGrowthRate: number;
  };
  recentActivity: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  name: string;
  message: string;
  type: LogType;
  createdAt: Date;
  organization?: {
    name: string;
  } | null;
}

// Student Management Types
export interface StudentData {
  id: string;
  number: string | null;
  rollNumber: string | null;
  name: string;
  email: string | null;
  phone: string | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | null;
  birthDate: Date | null;
  address: string | null;
  parentName: string | null;
  parentPhone: string | null;
  image: string | null;
  notes: string | null;
  isActive: boolean;
  isProspect: boolean;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseData {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number | null;
  isActive: boolean;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Member Management Types
export interface MemberData {
  id: string;
  number: number | null;
  name: string;
  birthdate: Date | null;
  gender: 'MALE' | 'FEMALE' | 'OTHER' | null;
  phone: string | null;
  email: string | null;
  bloodType: string | null;
  image: string | null;
  fbLink: string | null;
  isActive: boolean;
  orgId: string;
  homeId: string | null;
  spouseId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Book Management Types
export interface BookData {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  category: string | null;
  publisher: string | null;
  publishedAt: Date | null;
  description: string | null;
  total: number;
  available: number;
  isActive: boolean;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookLoanData {
  id: string;
  bookId: string;
  memberId: string;
  studentId: string | null;
  loanDate: Date;
  dueDate: Date;
  returnDate: Date | null;
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE' | 'LOST';
  notes: string | null;
  orgId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Form Input Types
export interface CreateStudentInput {
  number?: string;
  rollNumber?: string;
  name: string;
  email?: string;
  phone?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  birthDate?: Date;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  image?: string;
  notes?: string;
  isActive?: boolean;
  isProspect?: boolean;
}

export interface UpdateStudentInput extends Partial<CreateStudentInput> {}

export interface CreateOrganizationInput {
  name: string;
  description?: string;
  logoImage?: string;
  type: OrganizationType;
  startedAt?: Date;
}

export interface UpdateOrganizationInput extends Partial<CreateOrganizationInput> {}

// Query Parameter Types
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface StudentQueryParams extends PaginationParams {
  search?: string;
  isActive?: boolean;
  isProspect?: boolean;
}

export interface UserQueryParams extends PaginationParams {
  search?: string;
  role?: UserRole;
}

export interface OrganizationQueryParams extends PaginationParams {
  type?: OrganizationType;
}

// Error Types
export interface ApiError {
  error: string;
  code: string;
  timestamp: string;
  requestId?: string;
  details?: {
    originalMessage?: string;
    stack?: string[];
  };
}

// Prisma Error Types
export interface PrismaError {
  code: string;
  message: string;
  meta?: {
    target?: string[];
    cause?: string;
  };
}

// Context Types for Hono
export interface OrganizationContext {
  organizationId: string;
  userId: string;
  userRole: UserRole;
  orgRole: OrganizationRole;
}

// Telegram Types
export interface TelegramSettings {
  id: string;
  userId: string;
  orgId: string | null;
  chatId: string;
  botToken: string;
  scope: 'USER' | 'ORG' | 'SUPERADMIN';
  isActive: boolean;
}

export interface TelegramLogParams {
  userId?: string;
  orgId?: string;
  role?: UserRole;
  title: string;
  message: string;
  type?: LogType;
  metadata?: Record<string, unknown>;
}

// Analytics Types
export interface AnalyticsData {
  userGrowth: Array<{ createdAt: Date; _count: number }>;
  orgGrowth: Array<{ createdAt: Date; _count: number }>;
  orgTypes: Array<{ type: OrganizationType; _count: number }>;
  activeOrgs: Array<{
    id: string;
    name: string;
    type: OrganizationType;
    _count: { users: number };
  }>;
  period: '7d' | '30d' | '90d' | '1y';
}

// Health Check Types
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  database?: {
    connected: boolean;
    responseTime: number;
  };
  metrics?: {
    totalUsers: number;
    totalOrganizations: number;
    recentActivity: number;
    uptime: number;
  };
  timestamp: string;
  error?: string;
}

// Request Handler Types
export type ApiHandler<TInput = unknown, TOutput = unknown> = (
  input: TInput
) => Promise<ApiResponse<TOutput>>;

export type PaginatedHandler<TQuery, TData> = (
  query: TQuery
) => Promise<PaginatedResponse<TData>>;
