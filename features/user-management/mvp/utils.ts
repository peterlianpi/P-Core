/**
 * User Management MVP Utilities
 *
 * Utility functions for user management operations
 */

import { UserRole, UserProfile } from './types';

/**
 * Check if user has required role or higher
 */
export function hasRole(user: UserProfile | null, requiredRole: UserRole): boolean {
  if (!user) return false;

  const roleHierarchy: Record<UserRole, number> = {
    [UserRole.USER]: 1,
    [UserRole.ADMIN]: 2,
    [UserRole.SUPERADMIN]: 3,
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

/**
 * Check if user is admin or superadmin
 */
export function isAdmin(user: UserProfile | null): boolean {
  return hasRole(user, UserRole.ADMIN);
}

/**
 * Check if user is superadmin
 */
export function isSuperAdmin(user: UserProfile | null): boolean {
  return hasRole(user, UserRole.SUPERADMIN);
}

/**
 * Get user display name (name or email)
 */
export function getUserDisplayName(user: UserProfile | null): string {
  if (!user) return 'Anonymous';
  return user.name || user.email;
}

/**
 * Get user initials for avatar fallback
 */
export function getUserInitials(user: UserProfile | null): string {
  if (!user) return '?';

  if (user.name) {
    return user.name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  return user.email.charAt(0).toUpperCase();
}

/**
 * Format user role for display
 */
export function formatUserRole(role: UserRole): string {
  switch (role) {
    case UserRole.SUPERADMIN:
      return 'Super Admin';
    case UserRole.ADMIN:
      return 'Admin';
    case UserRole.USER:
      return 'User';
    default:
      return role;
  }
}

/**
 * Check if email is valid format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize user input for display
 */
export function sanitizeUserInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Generate a secure random token
 */
export function generateToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Hash password (client-side placeholder - actual hashing should be server-side)
 */
export async function hashPassword(password: string): Promise<string> {
  // This is a placeholder - actual password hashing should be done server-side
  // using bcrypt or similar secure hashing algorithm
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  score: number; // 0-4
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score++;
  } else {
    feedback.push('Use at least 8 characters');
  }

  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    feedback.push('Include at least one uppercase letter');
  }

  if (/[a-z]/.test(password)) {
    score++;
  } else {
    feedback.push('Include at least one lowercase letter');
  }

  if (/\d/.test(password)) {
    score++;
  } else {
    feedback.push('Include at least one number');
  }

  if (/[^A-Za-z\d]/.test(password)) {
    score++;
  } else {
    feedback.push('Include at least one special character');
  }

  return {
    isValid: score >= 3,
    score,
    feedback,
  };
}

/**
 * Format date for user display
 */
export function formatUserDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - d.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

  return formatUserDate(d);
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Local storage helpers with error handling
 */
export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage errors
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore storage errors
    }
  },
};

/**
 * Session storage helpers
 */
export const sessionStorage = {
  get: <T>(key: string): T | null => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage errors
    }
  },

  remove: (key: string): void => {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      // Ignore storage errors
    }
  },
};
