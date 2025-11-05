/**
 * Church Management Feature
 * Main exports for the church management domain
 */

// API hooks and types
export * from './api';

// Types
export * from './types';

// Feature metadata
export const CHURCH_MANAGEMENT_FEATURE = {
  id: 'church-management',
  name: 'Church Management',
  description: 'Complete church member, choir, and family management system',
  version: '1.0.0',
  dependencies: ['organization-management'],
  permissions: {
    members: {
      read: ['ADMIN', 'PASTOR', 'ASSISTANT_PASTOR', 'LEADER'],
      write: ['ADMIN', 'PASTOR', 'ASSISTANT_PASTOR'],
      delete: ['ADMIN', 'PASTOR'],
    },
    choirs: {
      read: ['ADMIN', 'PASTOR', 'CHOIR_DIRECTOR', 'MEMBER'],
      write: ['ADMIN', 'PASTOR', 'CHOIR_DIRECTOR'],
      delete: ['ADMIN', 'PASTOR'],
    },
    families: {
      read: ['ADMIN', 'PASTOR', 'ASSISTANT_PASTOR', 'LEADER'],
      write: ['ADMIN', 'PASTOR', 'ASSISTANT_PASTOR'],
      delete: ['ADMIN', 'PASTOR'],
    },
  },
} as const;
