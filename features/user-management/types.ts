/**
 * User Management MVP Types
 * Core type definitions for user management operations
 */

import type { UserRole } from '@/shared/types/user-role';
import type { OrganizationRole } from '@/shared/types/organization-role';

export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  defaultOrgId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithOrganizations extends UserProfile {
  organizations: {
    id: string;
    role: OrganizationRole;
    status: string;
    organization: {
      id: string;
      name: string;
      type: string;
    };
  }[];
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  image?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserListItem {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  createdAt: Date;
  organizationCount: number;
  lastActive?: Date;
}

export interface UserActivityLog {
  id: string;
  userId: string;
  action: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  usersByRole: Record<UserRole, number>;
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface VerifyEmailData {
  token: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface RequestPasswordResetData {
  email: string;
}

export interface UserSearchParams {
  search?: string;
  role?: UserRole;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'email' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface UpdateUserRoleData {
  userId: string;
  role: UserRole;
}

export interface SuspendUserData {
  userId: string;
  reason?: string;
}