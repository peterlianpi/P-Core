/**
 * TYPE-SAFE API CLIENT - Centralized Data Fetching Layer
 *
 * This file implements the API client with type safety, caching, error handling,
 * and retry logic. It provides a unified interface for all data operations.
 */

import React from 'react';
import {
  ApiResponse,
  PaginatedResponse,
  ApiError,
  CacheEntry,
  CacheConfig,
  DataProviderConfig,
  CacheKey,
  ApiEndpoint,
} from '@/lib/types/database';

// ============================================================================
// CACHE IMPLEMENTATION
// ============================================================================

class CacheManager {
  private cache = new Map<CacheKey, CacheEntry>();
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = config;
  }

  set<T>(key: CacheKey, data: T, ttl?: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.config.defaultTtl,
      key,
    };

    // Implement cache size limit
    if (this.cache.size >= this.config.maxSize) {
      this.evict();
    }

    this.cache.set(key, entry);
  }

  get<T>(key: CacheKey): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  has(key: CacheKey): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  delete(key: CacheKey): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private evict(): void {
    // Simple FIFO eviction - in a real implementation, you'd use LRU/LFU
    const firstKey = this.cache.keys().next().value;
    if (firstKey) {
      this.cache.delete(firstKey);
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      maxSize: this.config.maxSize,
      hitRate: 0, // Would need to track hits/misses for this
    };
  }
}

// ============================================================================
// API CLIENT CORE
// ============================================================================

export class ApiClient {
  private baseUrl: string;
  private cache: CacheManager;
  private config: DataProviderConfig;

  constructor(config: DataProviderConfig) {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
    this.config = config;
    this.cache = new CacheManager(config.cache);
  }

  // ============================================================================
  // HTTP METHODS WITH TYPE SAFETY
  // ============================================================================

  async get<T>(
    endpoint: ApiEndpoint,
    options: {
      params?: Record<string, any>;
      useCache?: boolean;
      cacheTtl?: number;
    } = {}
  ): Promise<ApiResponse<T>> {
    const { params, useCache = true, cacheTtl } = options;
    const url = this.buildUrl(endpoint, params);
    const cacheKey = `GET:${url}`;

    // Check cache first
    if (useCache && this.cache.has(cacheKey)) {
      const cachedData = this.cache.get<ApiResponse<T>>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    try {
      const response = await this.fetchWithRetry(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      const result: ApiResponse<T> = await response.json();

      // Cache successful responses
      if (useCache && response.ok && result.success) {
        this.cache.set(cacheKey, result, cacheTtl);
      }

      return result;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async post<T, D = any>(
    endpoint: ApiEndpoint,
    data: D,
    options: {
      useCache?: boolean;
      cacheTtl?: number;
    } = {}
  ): Promise<ApiResponse<T>> {
    const { useCache = false, cacheTtl } = options;
    const url = this.buildUrl(endpoint);
    const cacheKey = `POST:${url}:${JSON.stringify(data)}`;

    try {
      const response = await this.fetchWithRetry(url, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      const result: ApiResponse<T> = await response.json();

      // Cache successful responses if enabled
      if (useCache && response.ok && result.success) {
        this.cache.set(cacheKey, result, cacheTtl);
      }

      return result;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async put<T, D = any>(
    endpoint: ApiEndpoint,
    data: D,
    options: {
      useCache?: boolean;
      cacheTtl?: number;
    } = {}
  ): Promise<ApiResponse<T>> {
    const { useCache = false, cacheTtl } = options;
    const url = this.buildUrl(endpoint);

    try {
      const response = await this.fetchWithRetry(url, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });

      const result: ApiResponse<T> = await response.json();

      // Invalidate related cache entries
      this.invalidateCache(endpoint);

      // Cache successful responses if enabled
      if (useCache && response.ok && result.success) {
        const cacheKey = `PUT:${url}`;
        this.cache.set(cacheKey, result, cacheTtl);
      }

      return result;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  async delete<T>(
    endpoint: ApiEndpoint,
    options: {} = {}
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpoint);

    try {
      const response = await this.fetchWithRetry(url, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      const result: ApiResponse<T> = await response.json();

      // Invalidate related cache entries
      this.invalidateCache(endpoint);

      return result;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  // ============================================================================
  // PAGINATION SUPPORT
  // ============================================================================

  async getPaginated<T>(
    endpoint: ApiEndpoint,
    options: {
      page?: number;
      limit?: number;
      params?: Record<string, any>;
      useCache?: boolean;
      cacheTtl?: number;
    } = {}
  ): Promise<PaginatedResponse<T>> {
    const { page = 1, limit = 10, params = {}, useCache = true, cacheTtl } = options;

    const queryParams = {
      ...params,
      page,
      limit,
    };

    return this.get<PaginatedResponse<T>>(endpoint, {
      params: queryParams,
      useCache,
      cacheTtl,
    }) as Promise<PaginatedResponse<T>>;
  }

  // ============================================================================
  // CACHE MANAGEMENT
  // ============================================================================

  invalidateCache(endpoint: ApiEndpoint): void {
    // Invalidate all cache entries related to this endpoint
    const keysToDelete: CacheKey[] = [];

    for (const [key] of this.cache['cache']) {
      if (key.includes(endpoint)) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheStats() {
    return this.cache.getStats();
  }

  // ============================================================================
  // PRIVATE METHODS
  // ============================================================================

  private buildUrl(endpoint: ApiEndpoint, params?: Record<string, any>): string {
    // Handle the case where baseUrl is a relative path (like '/api')
    // Join the base path with the endpoint path
    const basePath = this.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    const endpointPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    let fullPath = `${basePath}${endpointPath}`;

    // Manually build query string if params exist
    if (params && Object.keys(params).length > 0) {
      const queryParts: string[] = [];
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Manually encode key and value to ensure proper URL encoding
          const encodedKey = encodeURIComponent(key);
          const encodedValue = encodeURIComponent(String(value));
          queryParts.push(`${encodedKey}=${encodedValue}`);
        }
      });
      if (queryParts.length > 0) {
        fullPath += `?${queryParts.join('&')}`;
      }
    }

    return fullPath;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      // Add authentication headers here when needed
      // 'Authorization': `Bearer ${token}`,
    };
  }

  private async fetchWithRetry(
    url: string,
    options: RequestInit,
    attempt = 1
  ): Promise<Response> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      if (attempt < this.config.retryAttempts) {
        // Exponential backoff
        const delay = this.config.retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));

        return this.fetchWithRetry(url, options, attempt + 1);
      }

      throw error;
    }
  }

  private handleError<T>(error: any): ApiResponse<T> {
    console.error('API Error:', error);

    const apiError: ApiError = {
      code: 'NETWORK_ERROR',
      message: error.message || 'An unexpected error occurred',
      details: { originalError: error },
      timestamp: new Date(),
    };

    return {
      success: false,
      error: apiError.message,
      message: apiError.message,
    };
  }
}

// ============================================================================
// DATA VALIDATION UTILITIES
// ============================================================================

class DataValidator {
  static sanitizeString(value: string): string {
    return value.trim().replace(/[<>]/g, '');
  }

  static sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized = { ...obj } as T;

    for (const [key, value] of Object.entries(sanitized)) {
      if (typeof value === 'string') {
        (sanitized as any)[key] = this.sanitizeString(value);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        (sanitized as any)[key] = this.sanitizeObject(value);
      }
    }

    return sanitized;
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validateRequired(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }

  static validateLength(value: string, min: number, max: number): boolean {
    return value.length >= min && value.length <= max;
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

const defaultConfig: DataProviderConfig = {
  cache: {
    defaultTtl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100,
    strategy: 'lru',
  },
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  timeout: 10000, // 10 seconds
};

export const apiClient = new ApiClient(defaultConfig);

// ============================================================================
// HOOKS FOR REACT COMPONENTS
// ============================================================================

export interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Generic hook for API calls
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  dependencies: any[] = []
): UseApiState<T> {
  const [state, setState] = React.useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
    refetch: async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const response = await apiCall();
        if (response.success && response.data !== undefined) {
          setState(prev => ({
            ...prev,
            data: response.data ?? null,
            loading: false,
          }));
        } else {
          setState(prev => ({
            ...prev,
            error: response.error || 'An error occurred',
            loading: false,
          }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : 'An error occurred',
          loading: false,
        }));
      }
    },
  });

  React.useEffect(() => {
    state.refetch();
  }, dependencies);

  return state;
}

// ============================================================================
// EXPORT UTILITIES
// ============================================================================

export { CacheManager, DataValidator };
