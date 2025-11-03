/**
 * User Management MVP API
 * Core API functions for user operations
 */

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

const API_BASE = '/api/users';

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<UserWithOrganizations> {
  const response = await fetch(`${API_BASE}/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get user profile');
  }

  return response.json();
}

/**
 * Update current user profile
 */
export async function updateProfile(data: UpdateProfileData): Promise<UserProfile> {
  const response = await fetch(`${API_BASE}/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update profile');
  }

  return response.json();
}

/**
 * Change user password
 */
export async function changePassword(data: ChangePasswordData): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE}/me/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to change password');
  }

  return response.json();
}

/**
 * Delete current user account
 */
export async function deleteAccount(): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE}/me`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete account');
  }

  return response.json();
}

/**
 * Register new user
 */
export async function registerUser(data: RegisterUserData): Promise<{ success: boolean; message: string }> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to register user');
  }

  return response.json();
}

/**
 * Verify email address
 */
export async function verifyEmail(data: VerifyEmailData): Promise<{ success: boolean }> {
  const response = await fetch('/api/auth/verify-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to verify email');
  }

  return response.json();
}

/**
 * Request password reset
 */
export async function requestPasswordReset(data: RequestPasswordResetData): Promise<{ success: boolean }> {
  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to request password reset');
  }

  return response.json();
}

/**
 * Reset password with token
 */
export async function resetPassword(data: ResetPasswordData): Promise<{ success: boolean }> {
  const response = await fetch('/api/auth/reset-password/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to reset password');
  }

  return response.json();
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
  const queryParams = new URLSearchParams();
  if (params.search) queryParams.set('search', params.search);
  if (params.role) queryParams.set('role', params.role);
  if (params.page) queryParams.set('page', params.page.toString());
  if (params.limit) queryParams.set('limit', params.limit.toString());
  if (params.sortBy) queryParams.set('sortBy', params.sortBy);
  if (params.sortOrder) queryParams.set('sortOrder', params.sortOrder);

  const response = await fetch(`/api/admin/users?${queryParams.toString()}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get users');
  }

  return response.json();
}

/**
 * Get user by ID (admin only)
 */
export async function getUserById(userId: string): Promise<UserWithOrganizations> {
  const response = await fetch(`/api/admin/users/${userId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get user');
  }

  return response.json();
}

/**
 * Update user role (admin only)
 */
export async function updateUserRole(data: UpdateUserRoleData): Promise<{ success: boolean }> {
  const response = await fetch(`/api/admin/users/${data.userId}/role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ role: data.role }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update user role');
  }

  return response.json();
}

/**
 * Suspend/activate user (admin only)
 */
export async function toggleUserStatus(userId: string, isActive: boolean): Promise<{ success: boolean }> {
  const response = await fetch(`/api/admin/users/${userId}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update user status');
  }

  return response.json();
}

/**
 * Get user statistics (admin only)
 */
export async function getUserStats(): Promise<UserStats> {
  const response = await fetch('/api/admin/users/stats', {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get user stats');
  }

  return response.json();
}