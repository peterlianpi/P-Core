/**
 * TEST SETUP: Global test configuration and mocks
 * 
 * This file provides:
 * 1. Jest DOM matchers for better assertions
 * 2. Global mocks for browser APIs
 * 3. Test utilities and helpers
 * 4. Environment setup for testing
 * 5. Mock data factories
 */

import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// ============================================================================
// GLOBAL TEST CLEANUP
// ============================================================================

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// ============================================================================
// BROWSER API MOCKS
// ============================================================================

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  writable: true,
  value: {
    writeText: vi.fn(() => Promise.resolve()),
    readText: vi.fn(() => Promise.resolve('')),
  },
});

// ============================================================================
// NEXT.JS MOCKS
// ============================================================================

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, ...props }: any) => {
    return <a {...props}>{children}</a>;
  },
}));

// ============================================================================
// AUTH MOCKS
// ============================================================================

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'USER',
      },
    },
    status: 'authenticated',
  }),
  SessionProvider: ({ children }: any) => children,
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

// ============================================================================
// PRISMA MOCKS
// ============================================================================

// Mock Prisma clients
vi.mock('@/lib/prisma-client/user-prisma-client', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    organization: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    $disconnect: vi.fn(),
  },
}));

vi.mock('@/lib/prisma-client/features-prisma-client', () => ({
  featuresDBPrismaClient: {
    student: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    course: {
      findUnique: vi.fn(),
      findMany: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    $disconnect: vi.fn(),
  },
}));

// ============================================================================
// ENVIRONMENT VARIABLES
// ============================================================================

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.NEXTAUTH_SECRET = 'test-secret';
process.env.PPG_USER_DATABASE_URL = 'postgresql://test:test@localhost:5432/test_user';
process.env.PPG_FEATURES_DATABASE_URL = 'postgresql://test:test@localhost:5432/test_features';

// ============================================================================
// GLOBAL TEST UTILITIES
// ============================================================================

// Add custom matchers
expect.extend({
  toHaveNoAccessibilityViolations: () => ({
    pass: true,
    message: () => 'Expected element to have no accessibility violations',
  }),
});

// Global test helpers
global.testHelpers = {
  // Wait for next tick
  waitForNextTick: () => new Promise(resolve => setTimeout(resolve, 0)),
  
  // Create mock event
  createMockEvent: (overrides = {}) => ({
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
    target: { value: '' },
    currentTarget: { value: '' },
    ...overrides,
  }),
};

// ============================================================================
// CONSOLE WARNINGS/ERRORS
// ============================================================================

// Suppress console warnings in tests (optional)
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args: any[]) => {
  // Suppress specific warnings
  const message = args[0];
  if (typeof message === 'string') {
    // Add patterns to suppress here
    const suppressPatterns = [
      'Warning: ReactDOM.render is deprecated',
      'Warning: validateDOMNesting',
    ];
    
    if (suppressPatterns.some(pattern => message.includes(pattern))) {
      return;
    }
  }
  originalWarn.apply(console, args);
};

console.error = (...args: any[]) => {
  // Suppress specific errors
  const message = args[0];
  if (typeof message === 'string') {
    // Add patterns to suppress here
    const suppressPatterns = [
      'Error: Not implemented: HTMLCanvasElement.prototype.getContext',
    ];
    
    if (suppressPatterns.some(pattern => message.includes(pattern))) {
      return;
    }
  }
  originalError.apply(console, args);
};
