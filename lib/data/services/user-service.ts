/**
 * USER SERVICE - Type-safe data access layer for user operations
 *
 * This service provides all user-related data operations with proper typing,
 * caching, and error handling.
 */

import { apiClient } from '@/lib/data/api-client';
import { DataValidator } from '@/lib/data/api-client';
import {
  User,
  UserWithOrganizations,
  UserProfile,
  UserStats,
  ApiResponse,
  PaginatedResponse,
} from '@/lib/types/database';

// ============================================================================
// USER SERVICE CLASS
// ============================================================================

export class UserService {
  private static readonly BASE_ENDPOINT = '/users';

  // ============================================================================
  // USER CRUD OPERATIONS
  // ============================================================================

  /**
   * Get all users with pagination
   */
  static async getUsers(options: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}): Promise<PaginatedResponse<UserWithOrganizations>> {
    const {
      page = 1,
      limit = 10,
      search,
      role,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = options;

    const params: Record<string, any> = {
      page,
      limit,
      sortBy,
      sortOrder,
    };

    if (search) params.search = search;
    if (role) params.role = role;

    return apiClient.getPaginated<UserWithOrganizations>(
      this.BASE_ENDPOINT,
      { params, useCache: true, cacheTtl: 2 * 60 * 1000 } // 2 minutes cache
    );
  }

  /**
   * Get a single user by ID
   */
  static async getUserById(userId: string): Promise<ApiResponse<UserWithOrganizations>> {
    return apiClient.get<UserWithOrganizations>(
      `${this.BASE_ENDPOINT}/${userId}`,
      { useCache: true, cacheTtl: 5 * 60 * 1000 } // 5 minutes cache
    );
  }

  /**
   * Create a new user
   */
  static async createUser(userData: {
    name: string;
    email: string;
    role: string;
    password?: string;
  }): Promise<ApiResponse<User>> {
    // Validate and sanitize input
    const sanitizedData = DataValidator.sanitizeObject(userData);

    if (!DataValidator.validateEmail(sanitizedData.email)) {
      return {
        success: false,
        error: 'Invalid email address',
        message: 'Please provide a valid email address',
      };
    }

    if (!DataValidator.validateRequired(sanitizedData.name)) {
      return {
        success: false,
        error: 'Name is required',
        message: 'Please provide a name',
      };
    }

    return apiClient.post<User>(this.BASE_ENDPOINT, sanitizedData);
  }

  /**
   * Update an existing user
   */
  static async updateUser(
    userId: string,
    userData: Partial<{
      name: string;
      email: string;
      role: string;
      isTwoFactorEnabled: boolean;
    }>
  ): Promise<ApiResponse<User>> {
    const sanitizedData = DataValidator.sanitizeObject(userData);

    if (sanitizedData.email && !DataValidator.validateEmail(sanitizedData.email)) {
      return {
        success: false,
        error: 'Invalid email address',
        message: 'Please provide a valid email address',
      };
    }

    return apiClient.put<User>(`${this.BASE_ENDPOINT}/${userId}`, sanitizedData);
  }

  /**
   * Delete a user
   */
  static async deleteUser(userId: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${this.BASE_ENDPOINT}/${userId}`);
  }

  /**
   * Bulk delete users
   */
  static async bulkDeleteUsers(userIds: string[]): Promise<ApiResponse<{ deletedCount: number }>> {
    return apiClient.post<{ deletedCount: number }>(
      `${this.BASE_ENDPOINT}/bulk-delete`,
      { userIds }
    );
  }

  /**
   * Bulk update user roles
   */
  static async bulkUpdateRoles(
    userIds: string[],
    role: string
  ): Promise<ApiResponse<{ updatedCount: number }>> {
    return apiClient.post<{ updatedCount: number }>(
      `${this.BASE_ENDPOINT}/bulk-update-role`,
      { userIds, role }
    );
  }

  // ============================================================================
  // USER PROFILE OPERATIONS
  // ============================================================================

  /**
   * Get user profile
   */
  static async getUserProfile(userId: string): Promise<ApiResponse<UserProfile>> {
    return apiClient.get<UserProfile>(
      `${this.BASE_ENDPOINT}/${userId}/profile`,
      { useCache: true, cacheTtl: 10 * 60 * 1000 } // 10 minutes cache
    );
  }

  /**
   * Update user profile
   */
  static async updateUserProfile(
    userId: string,
    profileData: Partial<UserProfile>
  ): Promise<ApiResponse<UserProfile>> {
    const sanitizedData = DataValidator.sanitizeObject(profileData);
    return apiClient.put<UserProfile>(
      `${this.BASE_ENDPOINT}/${userId}/profile`,
      sanitizedData
    );
  }

  // ============================================================================
  // USER STATISTICS & ANALYTICS
  // ============================================================================

  /**
   * Get user statistics
   */
  static async getUserStats(): Promise<ApiResponse<UserStats>> {
    return apiClient.get<UserStats>(
      `${this.BASE_ENDPOINT}/stats`,
      { useCache: true, cacheTtl: 15 * 60 * 1000 } // 15 minutes cache
    );
  }

  /**
   * Get user registration trends
   */
  static async getRegistrationTrends(options: {
    startDate?: Date;
    endDate?: Date;
    interval?: 'day' | 'week' | 'month';
  } = {}): Promise<ApiResponse<Array<{ date: string; count: number }>>> {
    const params: Record<string, any> = {};

    if (options.startDate) params.startDate = options.startDate.toISOString();
    if (options.endDate) params.endDate = options.endDate.toISOString();
    if (options.interval) params.interval = options.interval;

    return apiClient.get<Array<{ date: string; count: number }>>(
      `${this.BASE_ENDPOINT}/registration-trends`,
      { params, useCache: true, cacheTtl: 30 * 60 * 1000 } // 30 minutes cache
    );
  }

  // ============================================================================
  // USER SEARCH & FILTERING
  // ============================================================================

  /**
   * Search users
   */
  static async searchUsers(query: string, options: {
    limit?: number;
    role?: string;
  } = {}): Promise<ApiResponse<UserWithOrganizations[]>> {
    const params: Record<string, any> = {
      q: query,
      limit: options.limit || 20,
    };

    if (options.role) params.role = options.role;

    return apiClient.get<UserWithOrganizations[]>(
      `${this.BASE_ENDPOINT}/search`,
      { params, useCache: false } // Don't cache search results
    );
  }

  /**
   * Get users by role
   */
  static async getUsersByRole(role: string): Promise<ApiResponse<UserWithOrganizations[]>> {
    return apiClient.get<UserWithOrganizations[]>(
      `${this.BASE_ENDPOINT}/role/${role}`,
      { useCache: true, cacheTtl: 5 * 60 * 1000 } // 5 minutes cache
    );
  }

  // ============================================================================
  // USER ORGANIZATION RELATIONSHIPS
  // ============================================================================

  /**
   * Add user to organization
   */
  static async addUserToOrganization(
    userId: string,
    organizationId: string,
    role: string = 'MEMBER'
  ): Promise<ApiResponse<void>> {
    return apiClient.post<void>(
      `${this.BASE_ENDPOINT}/${userId}/organizations`,
      { organizationId, role }
    );
  }

  /**
   * Remove user from organization
   */
  static async removeUserFromOrganization(
    userId: string,
    organizationId: string
  ): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(
      `${this.BASE_ENDPOINT}/${userId}/organizations/${organizationId}`
    );
  }

  /**
   * Update user role in organization
   */
  static async updateUserOrganizationRole(
    userId: string,
    organizationId: string,
    role: string
  ): Promise<ApiResponse<void>> {
    return apiClient.put<void>(
      `${this.BASE_ENDPOINT}/${userId}/organizations/${organizationId}`,
      { role }
    );
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Validate user data
   */
  static validateUserData(userData: Partial<User>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (userData.email && !DataValidator.validateEmail(userData.email)) {
      errors.push('Invalid email address');
    }

    if (userData.name && !DataValidator.validateLength(userData.name, 1, 100)) {
      errors.push('Name must be between 1 and 100 characters');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Sanitize user data
   */
  static sanitizeUserData(userData: Partial<User>): Partial<User> {
    return DataValidator.sanitizeObject(userData);
  }

  /**
   * Clear user-related cache
   */
  static clearCache(): void {
    apiClient.invalidateCache(this.BASE_ENDPOINT);
  }
}

// ============================================================================
// REACT HOOKS FOR USER OPERATIONS
// ============================================================================

import { useApi, UseApiState } from '@/lib/data/api-client';

/**
 * Hook for fetching users with pagination
 */
export function useUsers(options: Parameters<typeof UserService.getUsers>[0] = {}): UseApiState<PaginatedResponse<UserWithOrganizations>> {
  return useApi(() => UserService.getUsers(options), [JSON.stringify(options)]) as any;
}

/**
 * Hook for fetching a single user
 */
export function useUser(userId: string): UseApiState<UserWithOrganizations> {
  return useApi(() => UserService.getUserById(userId), [userId]);
}

/**
 * Hook for user statistics
 */
export function useUserStats(): UseApiState<UserStats> {
  return useApi(() => UserService.getUserStats(), []);
}

/**
 * Hook for user search
 */
export function useUserSearch(query: string, options: Parameters<typeof UserService.searchUsers>[1] = {}): UseApiState<UserWithOrganizations[]> {
  return useApi(() => UserService.searchUsers(query, options), [query, JSON.stringify(options)]);
}
