/**
 * User Management MVP Hooks
 * React Query hooks for user operations
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  UpdateProfileData,
  ChangePasswordData,
  UserSearchParams,
  UpdateUserRoleData,
} from './types';
import {
  getCurrentUser,
  updateProfile,
  changePassword,
  deleteAccount,
  getUsers,
  getUserById,
  updateUserRole,
  toggleUserStatus,
  getUserStats,
} from './api';

/**
 * Get current user profile
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: getCurrentUser,
  });
}

/**
 * Update user profile
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
  });
}

/**
 * Change password
 */
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => changePassword(data),
  });
}

/**
 * Delete account
 */
export function useDeleteAccount() {
  return useMutation({
    mutationFn: deleteAccount,
  });
}

/**
 * Get all users (admin)
 */
export function useUsers(params: UserSearchParams = {}) {
  return useQuery({
    queryKey: ['users', 'list', params],
    queryFn: () => getUsers(params),
  });
}

/**
 * Get user by ID (admin)
 */
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['users', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
}

/**
 * Update user role (admin)
 */
export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRoleData) => updateUserRole(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['users', variables.userId] });
    },
  });
}

/**
 * Toggle user status (admin)
 */
export function useToggleUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, isActive }: { userId: string; isActive: boolean }) =>
      toggleUserStatus(userId, isActive),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['users', variables.userId] });
    },
  });
}

/**
 * Get user statistics (admin)
 */
export function useUserStats() {
  return useQuery({
    queryKey: ['users', 'stats'],
    queryFn: getUserStats,
  });
}