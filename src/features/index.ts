// P-Core Features - Centralized Export Hub
// Provides unified access to all feature modules across the application
// Follows the new architecture patterns with enhanced security and performance

// ============================================================================
// SCHOOL MANAGEMENT FEATURES
// ============================================================================

// Student Management
export * from './students/api';
export * from './students/components';
export * from './students/hooks';
export * from './students/types';

// Course Management
export * from './courses/api';
export * from './courses/components';
export * from './courses/hooks';
export * from './courses/types';

// Library Management  
export * from './library/api';
export * from './library/components';
export * from './library/hooks';
export * from './library/types';

// Purchase & Financial Management
export * from './purchases/api';
export * from './purchases/components';
export * from './purchases/hooks';
export * from './purchases/types';

// ============================================================================
// CHURCH MANAGEMENT FEATURES
// ============================================================================

// Member Management
export * from './members/api';
export * from './members/components';
export * from './members/hooks';
export * from './members/types';

// Family & Relationship Management
export * from './families/api';
export * from './families/components';
export * from './families/hooks';
export * from './families/types';

// Geographic Organization (Homes, Vengs, Khawks)
export * from './homes/api';
export * from './homes/components';
export * from './homes/hooks';
export * from './homes/types';

// Role & Ministry Management
export * from './roles/api';
export * from './roles/components';
export * from './roles/hooks';
export * from './roles/types';

// ============================================================================
// ACTIVITIES & MUSIC MINISTRY FEATURES
// ============================================================================

// Choir Management
export * from './choirs/api';
export * from './choirs/components';
export * from './choirs/hooks';
export * from './choirs/types';

// Song & Music Library
export * from './songs/api';
export * from './songs/components';
export * from './songs/hooks';
export * from './songs/types';

// Event Management
export * from './events/api';
export * from './events/components';
export * from './events/hooks';
export * from './events/types';

// ============================================================================
// ORGANIZATION & SYSTEM FEATURES
// ============================================================================

// Organization Management
export * from './organizations/api';
export * from './organizations/components';
export * from './organizations/hooks';
export * from './organizations/types';

// User & Authentication Management
export * from './users/api';
export * from './users/components';
export * from './users/hooks';
export * from './users/types';

// Permission & Access Control
export * from './permissions/api';
export * from './permissions/components';
export * from './permissions/hooks';
export * from './permissions/types';

// Dashboard & Analytics
export * from './dashboard/api';
export * from './dashboard/components';
export * from './dashboard/hooks';
export * from './dashboard/types';

// ============================================================================
// SYSTEM & UTILITY FEATURES
// ============================================================================

// Feedback & Support
export * from './feedback/api';
export * from './feedback/components';
export * from './feedback/hooks';
export * from './feedback/types';

// Version & Update Management
export * from './version/api';
export * from './version/components';
export * from './version/hooks';
export * from './version/types';

// File Upload & Media Management
export * from './uploads/api';
export * from './uploads/components';
export * from './uploads/hooks';
export * from './uploads/types';

// ============================================================================
// SHARED FEATURE UTILITIES
// ============================================================================

// Shared components across features
export * from './shared/components';
export * from './shared/hooks';
export * from './shared/types';
export * from './shared/utils';

// ============================================================================
// FEATURE CONFIGURATION & CONSTANTS
// ============================================================================

// Feature flags and configuration
export const FEATURE_FLAGS = {
  // School Management
  STUDENTS_ENABLED: true,
  COURSES_ENABLED: true,
  LIBRARY_ENABLED: true,
  PURCHASES_ENABLED: true,
  
  // Church Management
  MEMBERS_ENABLED: true,
  FAMILIES_ENABLED: true,
  HOMES_ENABLED: true,
  ROLES_ENABLED: true,
  
  // Activities & Music
  CHOIRS_ENABLED: true,
  SONGS_ENABLED: true,
  EVENTS_ENABLED: true,
  
  // System Features
  DASHBOARD_ENABLED: true,
  FEEDBACK_ENABLED: true,
  VERSION_TRACKING_ENABLED: true,
  MEDIA_UPLOADS_ENABLED: true,
} as const;

// Organization type feature matrix
export const ORGANIZATION_FEATURES = {
  SCHOOL: {
    students: true,
    courses: true,
    library: true,
    purchases: true,
    members: false,
    families: false,
    choirs: false,
  },
  
  CHURCH: {
    students: false,
    courses: false,
    library: true,
    purchases: false,
    members: true,
    families: true,
    choirs: true,
  },
  
  MIXED: {
    students: true,
    courses: true,
    library: true,
    purchases: true,
    members: true,
    families: true,
    choirs: true,
  },
  
  LIBRARY: {
    students: false,
    courses: false,
    library: true,
    purchases: false,
    members: true,
    families: false,
    choirs: false,
  },
} as const;

// Feature permissions matrix
export const FEATURE_PERMISSIONS = {
  // School Management
  students: {
    read: ['OWNER', 'ADMIN', 'MANAGER', 'TEACHER', 'OFFICE_STAFF'],
    write: ['OWNER', 'ADMIN', 'MANAGER', 'TEACHER'],
    delete: ['OWNER', 'ADMIN'],
  },
  
  courses: {
    read: ['OWNER', 'ADMIN', 'MANAGER', 'TEACHER'],
    write: ['OWNER', 'ADMIN', 'MANAGER'],
    delete: ['OWNER', 'ADMIN'],
  },
  
  // Church Management
  members: {
    read: ['OWNER', 'ADMIN', 'PASTOR', 'ASSISTANT_PASTOR', 'LEADER'],
    write: ['OWNER', 'ADMIN', 'PASTOR', 'ASSISTANT_PASTOR'],
    delete: ['OWNER', 'ADMIN', 'PASTOR'],
  },
  
  // Library Management
  library: {
    read: ['OWNER', 'ADMIN', 'LIBRARIAN', 'TEACHER', 'MEMBER'],
    write: ['OWNER', 'ADMIN', 'LIBRARIAN'],
    delete: ['OWNER', 'ADMIN'],
  },
  
  // Activities
  choirs: {
    read: ['OWNER', 'ADMIN', 'CHOIR_DIRECTOR', 'MEMBER'],
    write: ['OWNER', 'ADMIN', 'CHOIR_DIRECTOR'],
    delete: ['OWNER', 'ADMIN'],
  },
} as const;

// Export feature utilities
export const getOrganizationFeatures = (orgType: keyof typeof ORGANIZATION_FEATURES) => {
  return ORGANIZATION_FEATURES[orgType] || ORGANIZATION_FEATURES.MIXED;
};

export const hasFeaturePermission = (
  feature: keyof typeof FEATURE_PERMISSIONS,
  action: 'read' | 'write' | 'delete',
  userRole: string
) => {
  const featurePerms = FEATURE_PERMISSIONS[feature];
  if (!featurePerms) return false;
  
  return featurePerms[action].includes(userRole as any);
};

export const isFeatureEnabled = (feature: keyof typeof FEATURE_FLAGS) => {
  return FEATURE_FLAGS[feature];
};

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Export commonly used types
export type { Organization, User, UserRole } from '@prisma/client';
export type { OrganizationType, OrganizationRole } from '@prisma/client';

// API-related types
export type { APIError, APIClientError } from '@/lib/api/hono-client';

// Feature-specific types will be exported from their respective modules above

// ============================================================================
// HOOKS EXPORTS
// ============================================================================

// Re-export commonly used hooks
export { useGetOrganizationDashboard } from './organizations/api/use-get-organization-dashboard';
export { useGetMembers } from './members/api/use-get-members';
export { useGetChoirs } from './choirs/api/use-get-choirs';
export { useGetBooks } from './library/api/use-get-books';

// Dashboard hooks
export { 
  useGetQuickStats,
  useGetFinancialDashboard,
  useGetActivityDashboard,
  useGetGrowthAnalytics 
} from './organizations/api/use-get-organization-dashboard';
