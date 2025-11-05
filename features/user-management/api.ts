/**
 * User Management MVP API
 * Core API functions for user operations using mock data
 */

import { UserRole } from './types';
import type {
  UserProfile,
  UserWithOrganizations,
  UpdateProfileData,
  ChangePasswordData,
  UserListItem,
  UserStats,
  RegisterUserData,
  VerifyEmailData,
  ResetPasswordData,
  RequestPasswordResetData,
  UserSearchParams,
  UpdateUserRoleData,
} from './types';
import {
  mockCurrentUser,
  mockUserListItems,
  mockUserStats,
  getMockUserById,
  searchMockUsers
} from '@/data/user-management/mock-users';

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<UserWithOrganizations> {
  // Always use mock data for frontend-only application
  return Promise.resolve(mockCurrentUser);
}

/**
 * Update current user profile
 */
export async function updateProfile(data: UpdateProfileData): Promise<UserProfile> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return updated profile (in real app, this would be saved to backend)
  return Promise.resolve({
    ...mockCurrentUser,
    ...data,
    updatedAt: new Date()
  });
}

/**
 * Change user password
 */
export async function changePassword(data: ChangePasswordData): Promise<{ success: boolean }> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Basic validation (in real app, this would be handled by backend)
  if (data.newPassword !== data.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  return Promise.resolve({ success: true });
}

/**
 * Delete current user account
 */
export async function deleteAccount(): Promise<{ success: boolean }> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return Promise.resolve({ success: true });
}

/**
 * Register new user
 */
export async function registerUser(data: RegisterUserData): Promise<{ success: boolean; message: string }> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  return Promise.resolve({
    success: true,
    message: 'User registered successfully. Please check your email for verification.'
  });
}

/**
 * Verify email address
 */
export async function verifyEmail(data: VerifyEmailData): Promise<{ success: boolean }> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  return Promise.resolve({ success: true });
}

/**
 * Request password reset
 */
export async function requestPasswordReset(data: RequestPasswordResetData): Promise<{ success: boolean }> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));

  return Promise.resolve({ success: true });
}

/**
 * Reset password with token
 */
export async function resetPassword(data: ResetPasswordData): Promise<{ success: boolean }> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return Promise.resolve({ success: true });
}

// ============================================================================
// ADMIN OPERATIONS
// ============================================================================

/**
 * Get all users (admin only)
 */
export async function getUsers(params: UserSearchParams = {}): Promise<{
  users: UserListItem[];
  total: number;
  page: number;
  limit: number;
}> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  let filteredUsers = [...mockUserListItems];

  // Apply search filter
  if (params.search) {
    filteredUsers = searchMockUsers(params.search);
  }

  // Apply role filter
  if (params.role) {
    filteredUsers = filteredUsers.filter(user => user.role === params.role);
  }

  // Apply sorting
  if (params.sortBy) {
    filteredUsers.sort((a, b) => {
      const aValue = a[params.sortBy as keyof UserListItem] || '';
      const bValue = b[params.sortBy as keyof UserListItem] || '';

      if (aValue < bValue) return params.sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return params.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Apply pagination
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return Promise.resolve({
    users: paginatedUsers,
    total: filteredUsers.length,
    page,
    limit
  });
}

/**
 * Get user by ID (admin only)
 */
export async function getUserById(userId: string): Promise<UserWithOrganizations> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));

  const user = getMockUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return Promise.resolve(user);
}

/**
 * Update user role (admin only)
 */
export async function updateUserRole(data: UpdateUserRoleData): Promise<{ success: boolean }> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  return Promise.resolve({ success: true });
}

/**
 * Suspend/activate user (admin only)
 */
export async function toggleUserStatus(userId: string, isActive: boolean): Promise<{ success: boolean }> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return Promise.resolve({ success: true });
}

/**
 * Get user statistics (admin only)
 */
export async function getUserStats(): Promise<UserStats> {
  // Mock implementation - simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));

  return Promise.resolve(mockUserStats);
}
