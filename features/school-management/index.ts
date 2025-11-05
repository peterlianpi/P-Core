/**
 * School Management Feature
 * Main exports for the school management domain
 */

// API hooks and types
export * from './api';

// Types
export * from './types';

// Feature metadata
export const SCHOOL_MANAGEMENT_FEATURE = {
  id: 'school-management',
  name: 'School Management',
  description: 'Complete student, course, and schedule management system',
  version: '1.0.0',
  dependencies: ['organization-management'],
  permissions: {
    students: {
      read: ['ADMIN', 'MANAGER', 'TEACHER'],
      write: ['ADMIN', 'MANAGER'],
      delete: ['ADMIN'],
    },
    courses: {
      read: ['ADMIN', 'MANAGER', 'TEACHER', 'STUDENT'],
      write: ['ADMIN', 'MANAGER'],
      delete: ['ADMIN'],
    },
    schedules: {
      read: ['ADMIN', 'MANAGER', 'TEACHER', 'STUDENT'],
      write: ['ADMIN', 'MANAGER'],
      delete: ['ADMIN'],
    },
  },
} as const;
