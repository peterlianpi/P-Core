/**
 * Library Management Feature
 * Main exports for the library management domain
 */

// API hooks and types
export * from './api';

// Types
export * from './types';

// Feature metadata
export const LIBRARY_MANAGEMENT_FEATURE = {
  id: 'library-management',
  name: 'Library Management',
  description: 'Complete library system with book catalog, loans, and reservations',
  version: '1.0.0',
  dependencies: ['organization-management'],
  permissions: {
    books: {
      read: ['ADMIN', 'LIBRARIAN', 'ASSISTANT', 'MEMBER'],
      write: ['ADMIN', 'LIBRARIAN', 'ASSISTANT'],
      delete: ['ADMIN', 'LIBRARIAN'],
    },
    loans: {
      read: ['ADMIN', 'LIBRARIAN', 'ASSISTANT', 'MEMBER'],
      write: ['ADMIN', 'LIBRARIAN', 'ASSISTANT'],
      delete: ['ADMIN', 'LIBRARIAN'],
    },
    reservations: {
      read: ['ADMIN', 'LIBRARIAN', 'ASSISTANT', 'MEMBER'],
      write: ['ADMIN', 'LIBRARIAN', 'ASSISTANT', 'MEMBER'],
      delete: ['ADMIN', 'LIBRARIAN'],
    },
  },
} as const;
