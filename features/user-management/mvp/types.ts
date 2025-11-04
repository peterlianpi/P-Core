/**
 * User Management MVP Types
 *
 * Core type definitions for the minimum viable user management implementation
 */

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  avatar?: string;
  lastLogin?: Date;
}

export interface CreateUserData {
  email: string;
  name: string;
  role: UserRole;
  isActive?: boolean;
}

export interface UpdateUserData {
  name?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UserFilters {
  role?: UserRole;
  isActive?: boolean;
  search?: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface AuthResponse {
  user: UserProfile;
  token: string;
}

export interface AuthError {
  message: string;
  field?: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN'
}

export interface SessionData {
  userId: string;
  expiresAt: Date;
}

export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}
