/**
 * CENTRAL TYPE DEFINITIONS - Database Models & API Types
 *
 * This file contains all data structures, types, and interfaces used throughout the application.
 * All data models are defined here to ensure type safety and consistency.
 */

// ============================================================================
// BASE TYPES & UTILITIES
// ============================================================================

export type UserRole = 'USER' | 'ADMIN' | 'SUPERADMIN' | 'DEVELOPMENT';
export type OrganizationRole = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
export type NotificationType = 'info' | 'warning' | 'success' | 'error';
export type PlanInterval = 'monthly' | 'yearly';
export type ActivityType = 'user_registered' | 'organization_created' | 'user_login' | 'system_update' | 'notification_sent';
export type CacheKey = string;
export type ApiEndpoint = string;

// ============================================================================
// USER MANAGEMENT TYPES
// ============================================================================

export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
  defaultOrgId: string | null;
}

export interface UserWithOrganizations extends User {
  organizations: UserOrganization[];
}

export interface UserOrganization {
  organizationId: string;
  role: OrganizationRole;
  status: 'active' | 'inactive' | 'pending';
  joinedAt: Date;
  organization: Organization;
}

export interface UserProfile extends Omit<User, 'emailVerified'> {
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  usersByRole: Record<UserRole, number>;
  topLocations: Array<{ location: string; count: number }>;
  registrationTrend: Array<{ date: string; count: number }>;
}

// ============================================================================
// ORGANIZATION MANAGEMENT TYPES
// ============================================================================

export interface Organization {
  id: string;
  name: string;
  description: string | null;
  logo: string | null;
  website: string | null;
  type: 'company' | 'startup' | 'nonprofit' | 'education' | 'personal';
  size: '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';
  industry: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  settings: OrganizationSettings;
}

export interface OrganizationSettings {
  allowPublicProjects: boolean;
  requireApprovalForMembers: boolean;
  defaultRoleForNewMembers: OrganizationRole;
  maxMembers: number | null;
  features: {
    teams: boolean;
    billing: boolean;
    analytics: boolean;
    integrations: boolean;
  };
}

export interface Team {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  organizationId: string;
  memberIds: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  settings: TeamSettings;
}

export interface TeamSettings {
  allowSelfJoin: boolean;
  requireApproval: boolean;
  maxMembers: number | null;
  permissions: {
    canCreateProjects: boolean;
    canInviteMembers: boolean;
    canManageSettings: boolean;
  };
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  recipients: string[]; // user IDs or 'all' or 'admins'
  senderId: string;
  isRead: boolean;
  readAt: Date | null;
  actionUrl?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  expiresAt: Date | null;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  title: string;
  message: string;
  type: NotificationType;
  variables: string[]; // e.g., ['userName', 'organizationName']
  category: 'system' | 'user' | 'marketing' | 'security';
  isActive: boolean;
}

export interface NotificationStats {
  totalSent: number;
  totalRead: number;
  averageOpenRate: number;
  topPerformingTypes: Array<{ type: NotificationType; rate: number }>;
  deliveryTrend: Array<{ date: string; sent: number; read: number }>;
}

// ============================================================================
// ROLE & PERMISSION TYPES
// ============================================================================

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
  userCount: number;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: PermissionCategory;
  resource: string;
  action: string;
  isSystem: boolean;
}

export type PermissionCategory =
  | 'users'
  | 'organizations'
  | 'teams'
  | 'projects'
  | 'content'
  | 'analytics'
  | 'settings'
  | 'billing'
  | 'notifications'
  | 'api'
  | 'system';

export interface PermissionGroup {
  category: PermissionCategory;
  permissions: Permission[];
  description: string;
}

// ============================================================================
// PLAN & BILLING TYPES
// ============================================================================

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: PlanInterval;
  currency: string;
  features: string[];
  limits: PlanLimits;
  isActive: boolean;
  isPopular: boolean;
  sortOrder: number;
  trialDays: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlanLimits {
  users: number;
  organizations: number;
  storage: number; // in GB
  apiCalls: number; // per month
  projects: number;
  integrations: number;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd: Date | null;
  createdAt: Date;
  updatedAt: Date;
  plan: Plan;
}

export interface Invoice {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  dueDate: Date | null;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// ANALYTICS & DASHBOARD TYPES
// ============================================================================

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalOrganizations: number;
  systemHealth: 'healthy' | 'warning' | 'critical';
  recentActivity: Activity[];
  userGrowth: Array<{ date: string; count: number }>;
  organizationGrowth: Array<{ date: string; count: number }>;
  revenue: {
    current: number;
    previous: number;
    growth: number;
  };
  topPages: Array<{ page: string; views: number; unique: number }>;
}

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  userId?: string;
  organizationId?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface SystemHealth {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  services: Array<{
    name: string;
    status: 'healthy' | 'warning' | 'critical';
    uptime: string;
    responseTime: number;
  }>;
  lastChecked: Date;
}

export interface AnalyticsData {
  overview: {
    totalUsers: number;
    activeUsers: number;
    pageViews: number;
    sessionDuration: string;
    bounceRate: string;
    conversionRate: string;
  };
  userGrowth: Array<{ month: string; users: number }>;
  topPages: Array<{ page: string; views: number; unique: number }>;
  deviceStats: Array<{ device: string; percentage: number; count: number }>;
  geographicData: Array<{ country: string; users: number; percentage: number }>;
  timeRange: {
    start: Date;
    end: Date;
  };
}

// ============================================================================
// API TYPES & RESPONSES
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
}

// ============================================================================
// FORM & VALIDATION TYPES
// ============================================================================

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  validation?: ValidationRule;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: any;
}

export interface FormSchema {
  fields: FormField[];
  submitLabel: string;
  cancelLabel?: string;
  onSubmit: (data: Record<string, any>) => Promise<void> | void;
  onCancel?: () => void;
}

// ============================================================================
// CACHE & DATA MANAGEMENT TYPES
// ============================================================================

export interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number; // time to live in milliseconds
  key: CacheKey;
}

export interface CacheConfig {
  defaultTtl: number;
  maxSize: number;
  strategy: 'lru' | 'fifo' | 'lfu';
}

export interface DataProviderConfig {
  cache: CacheConfig;
  retryAttempts: number;
  retryDelay: number;
  timeout: number;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type WithTimestamps<T> = T & {
  createdAt: Date;
  updatedAt: Date;
};

export type WithId<T> = T & {
  id: string;
};

// ============================================================================
// ALL TYPES ARE EXPORTED ABOVE WITH THEIR DECLARATIONS
// ============================================================================

// This file serves as the central type definition hub for the entire application.
// All data structures are defined and exported here to ensure type safety and consistency.
