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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface UpdateProfileData {
  name?: string;
  avatar?: string;
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
