/**
 * P-CORE FEATURES INDEX
 * 
 * Modern feature-based architecture with dynamic loading and registry system.
 * Features are organized by domain and system categories with cooperative functionality.
 */

// =============================================================================
// FEATURE SYSTEM CORE
// =============================================================================

// Feature Registry & Loading System
export * from './feature-registry'
// export * from './feature-loader' // temporarily disabled: file not present

// =============================================================================
// DOMAIN FEATURES - Business Logic
// =============================================================================

// Organization Management (Combined org + organizations)
export * from './organization-management'

// School Management Features (temporarily disabled: modules not present)
// export * from './school-management/features/overview/components/overview-grid'
// export * from './school-management/features/overview/components/stats-charts'
// export * from './school-management/features/students/components/students-table'
// export * from './school-management/features/courses/components/courses-table'
// export * from './school-management/features/schedule/components/schedules-table'
// export { schoolApi, queryKeys as schoolQueryKeys } from './school-management/lib/api-client'

// // Church Management Features
// export * from './church-management/features/members/api/use-create-member'
// export * from './church-management/features/members/api/use-get-members'
// export * from './church-management/features/choirs/api/use-get-choirs'
// export * from './church-management/features/choirs/components/choir-card'
// export { churchApi, queryKeys as churchQueryKeys } from './church-management/lib/api-client'

// // Library Management Features
// export * from './library-management/features/books/api/use-get-books'
// export * from './library-management/features/books/components/book-card'
// export { libraryApi, queryKeys as libraryQueryKeys } from './library-management/lib/api-client'

// =============================================================================
// SYSTEM FEATURES - Infrastructure & Utilities
// =============================================================================

// System Features (Dashboard, Site, Version, etc.)
export * from './system'

// Legacy exports for backward compatibility (TODO: Remove after migration)
export * from './system/dashboard'
export * from './system/site'
export * from './system/version'
export * from './system/image-upload/components/upload-image-show'
export * from './system/feedback'

// =============================================================================
// SHARED TYPES AND UTILITIES
// =============================================================================

// Re-export common types
export type {
  DashboardStats,
  StudentWithCourses,
  CourseWithStudents,
  PurchaseWithStudent,
  ScheduleWithCourse,
  ApiResponse,
  PaginatedResponse
} from '@/lib/types/database'

// Feature system types
export type {
  FeatureConfig
} from './feature-registry'
