/**
 * User Management MVP - Core Implementation
 * 
 * This module provides the minimum viable implementation for user management
 * including registration, authentication, profile management, and user administration.
 */

export * from './types';
export * from './api';
export * from './hooks';
export * from './components/user-management-table';
export * from './components/user-stats-cards';

// Explicit exports for hooks to ensure they're available
export { useCurrentUser, useUpdateProfile, useChangePassword, useDeleteAccount, useUsers, useUser, useUpdateUserRole, useToggleUserStatus, useUserStats } from './hooks';
