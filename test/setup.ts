/**
 * Vitest Setup Configuration
 * Global test setup for the P-Core application
 */

import React from 'react';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Make React available globally for tests
global.React = React;

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock Next.js headers
vi.mock('next/headers', () => ({
  cookies: () => ({
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  }),
  headers: () => new Map(),
}));

// Mock environment variables
process.env.NEXTAUTH_SECRET = 'test-secret';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.DATABASE_URL = 'file:./test.db';

// Global test utilities
declare global {
  var testUtils: {
    mockRouter: typeof mockRouter;
    createMockUser: (overrides?: Partial<any>) => any;
    createMockOrganization: (overrides?: Partial<any>) => any;
  };
}

global.testUtils = {
  mockRouter,
  createMockUser: (overrides = {}) => ({
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
    role: 'USER',
    isTwoFactorEnabled: false,
    emailVerified: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    defaultOrgId: null,
    ...overrides,
  }),
  createMockOrganization: (overrides = {}) => ({
    id: 'test-org-id',
    name: 'Test Organization',
    description: 'A test organization',
    logo: null,
    website: null,
    type: 'COMPANY',
    size: 'SMALL',
    industry: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 'test-user-id',
    settings: '{}',
    ...overrides,
  }),
};
