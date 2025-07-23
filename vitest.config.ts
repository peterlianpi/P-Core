/**
 * VITEST CONFIGURATION: Modern Testing Setup
 * 
 * This configuration provides:
 * 1. Fast unit and integration testing with Vitest
 * 2. React Testing Library integration
 * 3. TypeScript support
 * 4. Path aliases matching Next.js config
 * 5. Coverage reporting
 * 
 * WHY VITEST:
 * - Faster than Jest (native ESM support)
 * - Better TypeScript integration
 * - Vite ecosystem compatibility
 * - Modern testing features
 * - Excellent developer experience
 */

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    // Test environment configuration
    environment: 'jsdom',
    
    // Setup files
    setupFiles: ['./test/setup.ts'],
    
    // Global test configuration
    globals: true,
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '.next/',
        'coverage/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/index.ts', // Barrel exports
      ],
      thresholds: {
        global: {
          branches: 70,
          functions: 70,
          lines: 70,
          statements: 70,
        },
      },
    },
    
    // Test file patterns
    include: [
      '**/__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}',
      '**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    
    // Exclude patterns
    exclude: [
      'node_modules/',
      '.next/',
      'dist/',
      'build/',
      'coverage/',
    ],
    
    // Test timeout
    testTimeout: 10000,
    
    // Hook timeout
    hookTimeout: 10000,
  },
  
  // Path resolution (match Next.js paths)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  
  // Define environment variables for tests
  define: {
    'process.env.NODE_ENV': '"test"',
  },
});
