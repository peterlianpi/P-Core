/**
 * User Management MVP API
 *
 * Core API functions for user CRUD operations (create, read, update, delete users)
 */

import { User, UserProfile, CreateUserData, UpdateUserData, UserFilters, UserListResponse } from './types';

const API_BASE = '/api/users';

/**
 * Get users list with optional filtering and pagination
 */
export async function getUsers(
  filters?: UserFilters,
  page: number = 1,
  limit: number = 20
): Promise<UserListResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(filters?.role && { role: filters.role }),
    ...(filters?.isActive !== undefined && { isActive: filters.isActive.toString() }),
    ...(filters?.search && { search: filters.search }),
  });

  const response = await fetch(`${API_BASE}?${params}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get users');
  }

  return response.json();
}

/**
 * Get a specific user by ID
 */
export async function getUserById(userId: string): Promise<User> {
  const response = await fetch(`${API_BASE}/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get user');
  }

  return response.json();
}

/**
 * Create a new user
 */
export async function createUser(data: CreateUserData): Promise<User> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create user');
  }

  return response.json();
}

/**
 * Update an existing user
 */
export async function updateUser(userId: string, data: UpdateUserData): Promise<User> {
  const response = await fetch(`${API_BASE}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update user');
  }

  return response.json();
}

/**
 * Delete a user
 */
export async function deleteUser(userId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete user');
  }
}

/**
 * Bulk update users
 */
export async function bulkUpdateUsers(userIds: string[], data: UpdateUserData): Promise<User[]> {
  const response = await fetch(`${API_BASE}/bulk`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userIds, data }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to bulk update users');
  }

  return response.json();
}

/**
 * Bulk delete users
 */
export async function bulkDeleteUsers(userIds: string[]): Promise<void> {
  const response = await fetch(`${API_BASE}/bulk`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userIds }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to bulk delete users');
  }
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
