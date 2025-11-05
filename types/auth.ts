/**
 * Authentication and User Types
 * Custom type definitions for the application, independent of database schema
 */

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
  DEVELOPMENT = "DEVELOPMENT",
}

export enum OrganizationRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  VIEWER = "VIEWER",
}

export enum OrgType {
  COMPANY = "COMPANY",
  STARTUP = "STARTUP",
  NONPROFIT = "NONPROFIT",
  EDUCATION = "EDUCATION",
  PERSONAL = "PERSONAL",
}

export enum OrgSize {
  SMALL = "SMALL",     // 1-10
  MEDIUM = "MEDIUM",   // 11-50
  LARGE = "LARGE",     // 51-200
  ENTERPRISE = "ENTERPRISE", // 201-1000
  ENTERPRISE_PLUS = "ENTERPRISE_PLUS", // 1000+
}

export enum MemberStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  PENDING = "PENDING",
}

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

export interface Organization {
  id: string;
  name: string;
  description: string | null;
  logo: string | null;
  website: string | null;
  type: OrgType;
  size: OrgSize;
  industry: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  settings: string; // JSON string
}

export interface UserOrganization {
  id: string;
  userId: string;
  organizationId: string;
  role: OrganizationRole;
  status: MemberStatus;
  joinedAt: Date;
}

export interface ExtendedUser extends User {
  isOAuth: boolean;
  password?: string;
}

// Registration types
export type RegistrationRole = "user" | "admin" | "company";

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: RegistrationRole;
  companyName?: string;
}

// Auth session types
export interface AuthSession {
  user: ExtendedUser;
  expires: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Dashboard types
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalOrganizations: number;
  systemHealth: number;
}

export interface RoleConfig {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  features: Array<{
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    action: string;
    stats: string;
  }>;
  quickActions: Array<{
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    variant: "default" | "outline";
  }>;
}

// Navigation types
export interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  roles: UserRole[];
  badge?: string;
}
