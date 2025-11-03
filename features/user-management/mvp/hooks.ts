/**
 * User Management MVP Hooks
 *
 * React hooks for managing authentication state and user data
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from './types';
import { getCurrentUser } from './api';

interface UseAuthReturn {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (user: UserProfile) => void;
  logout: () => void;
  refresh: () => Promise<void>;
}

/**
 * Hook for managing authentication state
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback((userData: UserProfile) => {
    setUser(userData);
    setError(null);
    // Store user data in localStorage for persistence
    localStorage.setItem('auth_user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('auth_user');
    // Clear any server-side session by making a request
    fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {
      // Ignore logout errors
    });
  }, []);

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userData = await getCurrentUser();
      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to refresh user data';
      setError(message);
      setUser(null);
      localStorage.removeItem('auth_user');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      // Check for stored user data first
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch {
          localStorage.removeItem('auth_user');
        }
      }

      // Always try to refresh from server to ensure validity
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        localStorage.setItem('auth_user', JSON.stringify(userData));
      } catch {
        // If server request fails, keep stored user data if available
        if (!user) {
          setError('Not authenticated');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [user]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    login,
    logout,
    refresh,
  };
}

interface UseUserProfileReturn {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
  refreshProfile: () => Promise<void>;
}

/**
 * Hook for managing user profile data
 */
export function useUserProfile(): UseUserProfileReturn {
  const { user, isLoading, error, refresh } = useAuth();
  const [localProfile, setLocalProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setLocalProfile(user);
  }, [user]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    if (localProfile) {
      const updated = { ...localProfile, ...updates };
      setLocalProfile(updated);
      localStorage.setItem('auth_user', JSON.stringify(updated));
    }
  }, [localProfile]);

  const refreshProfile = useCallback(async () => {
    await refresh();
  }, [refresh]);

  return {
    profile: localProfile,
    isLoading,
    error,
    updateProfile,
    refreshProfile,
  };
}

interface UseAuthGuardReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  requireAuth: () => boolean;
  redirectToLogin: () => void;
}

/**
 * Hook for protecting routes that require authentication
 */
export function useAuthGuard(): UseAuthGuardReturn {
  const { user, isLoading, isAuthenticated } = useAuth();

  const requireAuth = useCallback(() => {
    if (isLoading) return false;
    return isAuthenticated;
  }, [isLoading, isAuthenticated]);

  const redirectToLogin = useCallback(() => {
    // Store current path for redirect after login
    const currentPath = window.location.pathname;
    sessionStorage.setItem('redirect_after_login', currentPath);
    window.location.href = '/auth/login';
  }, []);

  // Redirect if not authenticated and not loading
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirectToLogin();
    }
  }, [isLoading, isAuthenticated, redirectToLogin]);

  return {
    isAuthenticated,
    isLoading,
    user,
    requireAuth,
    redirectToLogin,
  };
}

interface UseLoginReturn {
  login: (email: string, password: string) => Promise<UserProfile>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for handling login functionality
 */
export function useLogin(): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleLogin = useCallback(async (email: string, password: string): Promise<UserProfile> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const { user } = await response.json();
      login(user);

      // Check for redirect after login
      const redirectPath = sessionStorage.getItem('redirect_after_login');
      if (redirectPath) {
        sessionStorage.removeItem('redirect_after_login');
        window.location.href = redirectPath;
      }

      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  return {
    login: handleLogin,
    isLoading,
    error,
  };
}

interface UseRegisterReturn {
  register: (data: { email: string; password: string; name: string }) => Promise<UserProfile>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook for handling user registration
 */
export function useRegister(): UseRegisterReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleRegister = useCallback(async (data: { email: string; password: string; name: string }): Promise<UserProfile> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const { user } = await response.json();
      login(user);

      return user;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  return {
    register: handleRegister,
    isLoading,
    error,
  };
}
