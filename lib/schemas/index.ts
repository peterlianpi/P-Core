/**
 * ENHANCED SCHEMA SYSTEM: Centralized Validation & Type Safety
 * 
 * This module provides:
 * 1. Centralized schema definitions for consistency
 * 2. Enhanced validation with better error messages
 * 3. Type-safe schemas with TypeScript integration
 * 4. Reusable validation patterns
 * 5. Performance optimized validation
 * 
 * WHY THIS IS NEEDED:
 * - Ensures data consistency across the application
 * - Provides better user experience with clear error messages
 * - Prevents security vulnerabilities through strict validation
 * - Reduces code duplication with reusable schemas
 * - Maintains type safety throughout the system
 */

import { UserRole } from "@/prisma-user-database/user-database-client-types";
import * as z from "zod";

// ============================================================================
// COMMON VALIDATION PATTERNS
// ============================================================================

/**
 * Common validation patterns for reuse across schemas
 */
export const CommonPatterns = {
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { 
      message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" 
    }),
  strongPassword: z.string().min(12, { message: "Password must be at least 12 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message: "Password must contain uppercase, lowercase, number, and special character"
    }),
  phoneNumber: z.string().regex(/^\+?[\d\s\-\(\)]+$/, { 
    message: "Please enter a valid phone number" 
  }).optional(),
  url: z.string().url({ message: "Please enter a valid URL" }).optional(),
  orgId: z.string().cuid2({ message: "Invalid organization ID" }),
  userId: z.string().cuid2({ message: "Invalid user ID" }),
  name: z.string().min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s\-'\.]+$/, { message: "Name contains invalid characters" }),
};

// ============================================================================
// AUTHENTICATION SCHEMAS
// ============================================================================

/**
 * Enhanced login schema with security improvements
 */
export const LoginSchema = z.object({
  email: CommonPatterns.email,
  password: z.string().min(1, { message: "Password is required" }),
  code: z.string().regex(/^\d{6}$/, { message: "2FA code must be 6 digits" }).optional(),
  rememberMe: z.boolean().default(false),
});

/**
 * Enhanced registration schema with stronger validation
 */
export const RegisterSchema = z.object({
  email: CommonPatterns.email,
  password: CommonPatterns.password,
  name: CommonPatterns.name,
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

/**
 * Password reset schema
 */
export const ResetSchema = z.object({
  email: CommonPatterns.email,
});

/**
 * New password schema with confirmation
 */
export const NewPasswordSchema = z.object({
  password: CommonPatterns.password,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

/**
 * Enhanced user settings schema
 */
export const SettingsSchema = z.object({
  name: CommonPatterns.name.optional(),
  email: CommonPatterns.email.optional(),
  phone: CommonPatterns.phoneNumber,
  isTwoFactorEnabled: z.boolean().optional(),
  role: z.enum([
    UserRole.SUPERADMIN,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.USER,
  ]).optional(),
  telegramChatId: z.string().optional(),
  telegramBotToken: z.string().optional(),
  currentPassword: z.string().min(1).optional(),
  newPassword: CommonPatterns.password.optional(),
  confirmPassword: z.string().optional(),
  image: typeof window === "undefined" ? z.any() : z.instanceof(FileList).optional(),
  defaultOrgId: z.string().optional(),
  theme: z.string().optional(),
  language: z.enum(['en', 'my', 'zh']).default('en'),
  timezone: z.string().default('Asia/Yangon'),
}).refine((data) => {
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: "Current password is required to set new password",
  path: ["currentPassword"],
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "New passwords don't match",
  path: ["confirmPassword"],
});

// ============================================================================
// ORGANIZATION SCHEMAS
// ============================================================================

/**
 * Enhanced organization schema
 */
export const OrganizationSchema = z.object({
  id: z.string().cuid2().optional(),
  name: z.string().min(2, { message: "Organization name must be at least 2 characters" })
    .max(100, { message: "Organization name must be less than 100 characters" }),
  description: z.string().max(500, { message: "Description must be less than 500 characters" }).optional(),
  type: z.enum(["school", "church", "business", "nonprofit"], {
    required_error: "Organization type is required",
  }),
  logoImage: z.string().url({ message: "Logo must be a valid URL" }).optional(),
  website: CommonPatterns.url,
  email: CommonPatterns.email.optional(),
  phone: CommonPatterns.phoneNumber,
  address: z.string().max(200, { message: "Address must be less than 200 characters" }).optional(),
  startedAt: z.date().optional(),
  settings: z.record(z.any()).optional(),
  isActive: z.boolean().default(true),
});

/**
 * Organization membership schema
 */
export const UserOrganizationSchema = z.object({
  userId: CommonPatterns.userId,
  organizationId: CommonPatterns.orgId,
  role: z.enum(["OWNER", "ADMIN", "ACCOUNTANT", "OFFICE_STAFF", "MEMBER"], {
    required_error: "Organization role is required",
  }),
  permissions: z.array(z.string()).default([]),
  joinedAt: z.date().optional(),
  isActive: z.boolean().default(true),
});

// ============================================================================
// STUDENT MANAGEMENT SCHEMAS
// ============================================================================

/**
 * Enhanced student schema with better validation
 */
export const StudentSchema = z.object({
  id: z.string().cuid2().optional(),
  orgId: CommonPatterns.orgId,
  rollNumber: z.string().min(1, { message: "Roll number is required" })
    .max(20, { message: "Roll number must be less than 20 characters" }),
  name: CommonPatterns.name,
  email: CommonPatterns.email.optional(),
  phone: CommonPatterns.phoneNumber,
  dateOfBirth: z.date({ required_error: "Date of birth is required" })
    .refine(date => date < new Date(), { message: "Date of birth must be in the past" }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "Gender is required",
  }),
  address: z.string().max(200, { message: "Address must be less than 200 characters" }).optional(),
  guardianName: z.string().min(1, { message: "Guardian name is required" })
    .max(100, { message: "Guardian name must be less than 100 characters" }),
  guardianPhone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, { 
    message: "Please enter a valid guardian phone number" 
  }),
  guardianEmail: CommonPatterns.email.optional(),
  emergencyContact: z.string().regex(/^\+?[\d\s\-\(\)]+$/, { 
    message: "Please enter a valid emergency contact number" 
  }).optional(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
  medicalConditions: z.string().max(500, { message: "Medical conditions must be less than 500 characters" }).optional(),
  profileImage: z.string().url({ message: "Profile image must be a valid URL" }).optional(),
  admissionDate: z.date().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "GRADUATED", "TRANSFERRED"]).default("ACTIVE"),
  notes: z.string().max(1000, { message: "Notes must be less than 1000 characters" }).optional(),
});

/**
 * Student import schema for bulk operations
 */
export const StudentImportSchema = StudentSchema.omit({ id: true, orgId: true });

// ============================================================================
// COURSE MANAGEMENT SCHEMAS
// ============================================================================

/**
 * Enhanced course schema
 */
export const CourseSchema = z.object({
  id: z.string().cuid2().optional(),
  orgId: CommonPatterns.orgId,
  name: z.string().min(2, { message: "Course name must be at least 2 characters" })
    .max(100, { message: "Course name must be less than 100 characters" }),
  code: z.string().min(2, { message: "Course code must be at least 2 characters" })
    .max(20, { message: "Course code must be less than 20 characters" })
    .regex(/^[A-Z0-9\-]+$/, { message: "Course code must contain only uppercase letters, numbers, and hyphens" }),
  description: z.string().max(1000, { message: "Description must be less than 1000 characters" }).optional(),
  credits: z.number().min(1, { message: "Credits must be at least 1" })
    .max(10, { message: "Credits must be less than 10" }).optional(),
  duration: z.number().min(1, { message: "Duration must be at least 1 hour" })
    .max(1000, { message: "Duration must be less than 1000 hours" }).optional(),
  teacherId: z.string().optional(),
  roomId: z.string().optional(),
  schedule: z.string().max(200, { message: "Schedule must be less than 200 characters" }).optional(),
  capacity: z.number().min(1, { message: "Capacity must be at least 1" })
    .max(1000, { message: "Capacity must be less than 1000" }).optional(),
  fee: z.number().min(0, { message: "Fee cannot be negative" }).optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED", "CANCELLED"]).default("ACTIVE"),
  requirements: z.string().max(500, { message: "Requirements must be less than 500 characters" }).optional(),
  materials: z.array(z.string()).default([]),
});

// ============================================================================
// FEEDBACK SCHEMAS
// ============================================================================

/**
 * Enhanced feedback schema with better validation
 */
export const FeedbackSchema = z.object({
  name: z.string().max(100, { message: "Name must be less than 100 characters" }).optional(),
  email: CommonPatterns.email.optional(),
  phone: CommonPatterns.phoneNumber,
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" })
    .max(200, { message: "Subject must be less than 200 characters" }).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
  category: z.enum(["bug", "feature", "support", "general"]).default("general"),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  anonymous: z.boolean().default(false),
  status: z.enum(["pending", "in_progress", "resolved", "rejected"]).default("pending"),
  attachments: z.array(z.string().url()).default([]),
});

/**
 * Feedback update schema for admin use
 */
export const FeedbackUpdateSchema = z.object({
  status: z.enum(["pending", "in_progress", "resolved", "rejected"]),
  adminNotes: z.string().max(1000, { message: "Admin notes must be less than 1000 characters" }).optional(),
  assignedTo: z.string().optional(),
});

// ============================================================================
// UTILITY SCHEMAS
// ============================================================================

/**
 * Pagination schema for consistent pagination
 */
export const PaginationSchema = z.object({
  page: z.number().min(1, { message: "Page must be at least 1" }).default(1),
  limit: z.number().min(1, { message: "Limit must be at least 1" })
    .max(100, { message: "Limit must be less than 100" }).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().max(100, { message: "Search term must be less than 100 characters" }).optional(),
});

/**
 * File upload schema
 */
export const FileUploadSchema = z.object({
  file: z.any(),
  type: z.enum(["image", "document", "video", "audio"]),
  maxSize: z.number().default(10 * 1024 * 1024), // 10MB default
  allowedTypes: z.array(z.string()).default(["image/jpeg", "image/png", "image/webp"]),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Export types for TypeScript integration
export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type SettingsInput = z.infer<typeof SettingsSchema>;
export type OrganizationInput = z.infer<typeof OrganizationSchema>;
export type StudentInput = z.infer<typeof StudentSchema>;
export type CourseInput = z.infer<typeof CourseSchema>;
export type FeedbackInput = z.infer<typeof FeedbackSchema>;
export type PaginationInput = z.infer<typeof PaginationSchema>;

// ============================================================================
// SCHEMA COLLECTIONS
// ============================================================================

/**
 * Grouped schemas for easier imports
 */
export const AuthSchemas = {
  login: LoginSchema,
  register: RegisterSchema,
  reset: ResetSchema,
  newPassword: NewPasswordSchema,
  settings: SettingsSchema,
};

export const OrgSchemas = {
  organization: OrganizationSchema,
  membership: UserOrganizationSchema,
};

export const EducationSchemas = {
  student: StudentSchema,
  studentImport: StudentImportSchema,
  course: CourseSchema,
};

export const SystemSchemas = {
  feedback: FeedbackSchema,
  feedbackUpdate: FeedbackUpdateSchema,
  pagination: PaginationSchema,
  fileUpload: FileUploadSchema,
};

/**
 * All schemas combined for convenience
 */
export const AllSchemas = {
  ...AuthSchemas,
  ...OrgSchemas,
  ...EducationSchemas,
  ...SystemSchemas,
};
