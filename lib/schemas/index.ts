import { UserRole } from "@prisma/client";
import * as z from "zod";

/**
 * Schema for validating user settings updates.
 * Includes validations for optional fields like name, email, and passwords.
 */

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()), // Optional name field
    isTwoFactorEnabled: z.optional(z.boolean()), // Optional 2FA flag
    role: z.enum([UserRole.SUPERADMIN, UserRole.ADMIN, UserRole.USER]), // Must be one of the defined user roles
    telegramChatId: z.optional(z.string()), // Optional Telegram chat ID
    telegramBotToken: z.optional(z.string()), // Optional Telegram bot token
    email: z.optional(z.string().email()), // Optional email field with email validation
    password: z.optional(z.string().min(6)), // Optional current password with a minimum length of 6
    newPassword: z.optional(z.string().min(6)), // Optional new password with a minimum length of 6
    image:
      typeof window === "undefined"
        ? z.any()
        : z.instanceof(FileList).optional(),
    defaultOrgId: z.string().optional(),
  })
  // Ensure newPassword is required if password is provided
  .refine((data) => !(data.password && !data.newPassword), {
    message: "New password is required!",
    path: ["newPassword"],
  })
  // Ensure password is required if newPassword is provided
  .refine((data) => !(data.newPassword && !data.password), {
    message: "Password is required!",
    path: ["password"],
  });

/**
 * Schema for validating new password input.
 * Ensures the password is at least 6 characters long.
 */
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

/**
 * Schema for resetting a user's password.
 * Ensures the email field is valid.
 */
export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

/**
 * Schema for validating login input.
 * Requires email and password fields, with an optional 2FA code.
 */
export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()), // Optional 2FA code
});

/**
 * Schema for validating user registration input.
 * Requires email, password, and name fields.
 */
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

// Organization Schema
export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  startedAt: z.date().optional(),
  logoImage: z.string().optional(),
  type: z.string().optional(),
});

// UserOrganization Schema (Join Table)
export const UserOrganizationSchema = z.object({
  id: z.number(),
  userId: z.string(),
  organizationId: z.number(),
  organization: OrganizationSchema, // Nested organization
});

// Schema Validation
export const OrgSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  startedAt: z.date().optional(), // Date format
  logoImage: z.string().optional(),
  role: z.string().optional(),
  type: z.string().optional(),
});

export const teamFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Team name is required"),
  description: z.string().optional(),
  logoImage: z.string().optional(),
  startedAt: z.date().optional(),
  type: z.string()
    .transform((val) => {
      if (!val) return val;
      // Handle mapping from lowercase to uppercase
      const typeMap: Record<string, string> = {
        'school': 'SCHOOL',
        'training_center': 'TRAINING_CENTER',
        'university': 'UNIVERSITY', 
        'corporate': 'CORPORATE',
        'church': 'CHURCH',
        'business': 'CORPORATE', // Map business to corporate
        'nonprofit': 'OTHER', // Map nonprofit to other
        'other': 'OTHER'
      };
      const upperVal = val.toUpperCase();
      return typeMap[val.toLowerCase()] || upperVal;
    })
    .pipe(z.enum(["SCHOOL", "TRAINING_CENTER", "UNIVERSITY", "CORPORATE", "CHURCH", "OTHER"]))
    .optional(),
});

// Define Feedback Schema
export const feedbackSchema = z.object({
  name: z.string().optional(), // Allow anonymous feedback
  email: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters long"),
  anonymous: z.boolean().default(false),
  status: z.enum(["Pending", "Resolved", "Reviewed"]).default("Pending"),
});

// Define Update Schema (Only allows status update)
export const feedbackUpdateSchema = z.object({
  status: z.enum(["Pending", "Resolved", "Reviewed"]),
});

// Address Schema
export const AddressSchema = z.object({
  id: z.string(), // ID is optional when creating a new record
  name: z.string().nonempty("Name number is required"), // Home number must be a string and required
  address: z.string().optional(), // Address is optional
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

// Default Org select Server Action use
export const OrganizationsAPISchema = z.array(
  z.object({
    role: z.string().optional(),
    organization: z.object({
      id: z.string(),
      name: z.string(),
      description: z.string().optional(),
      startedAt: z.date().optional().nullable(),
      logoImage: z.string().optional(),
      type: z
        .enum(["SCHOOL", "TRAINING_CENTER", "UNIVERSITY", "CORPORATE", "CHURCH", "OTHER"], {
          required_error: "Team type is required",
        })
        .optional(),
    }),
  })
);

// All Version Server Action use
export const Versions = z.array(
  z.object({
    name: z.string(),
    id: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
    version: z.string(),
  })
);

export const OrgUserRole = z.object({
  userId: z.string(),
  orgId: z.string(),
  role: z.string().optional(),
});

// Church Management Schemas
export const FamilyRelationshipSchema = z.object({
  id: z.string(),
  fromId: z.string(),
  toId: z.string(),
  typeId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const HomeSchema = z.object({
  id: z.string(),
  homeNumber: z.string(),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  orgId: z.string(),
  vengId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const KhawkSchema = z.object({
  id: z.string(),
  name: z.string(),
  orgId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MemberSchema = z.object({
  id: z.string(),
  number: z.number().optional(),
  name: z.string(),
  birthdate: z.date().optional(),
  gender: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  bloodType: z.string().optional(),
  image: z.string().optional(),
  fbLink: z.string().optional(),
  orgId: z.string(),
  homeId: z.string().optional(),
  spouseId: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const VengSchema = z.object({
  id: z.string(),
  name: z.string(),
  orgId: z.string(),
  khawkId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Library Management Schemas
export const LibrarySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Library name is required"),
  code: z.string().optional(),
  description: z.string().optional(),
  
  // Location
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().default("Myanmar"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  
  // Contact
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),
  
  // Library Details
  type: z.enum(["PUBLIC", "ACADEMIC", "SCHOOL", "SPECIAL", "PRIVATE", "DIGITAL", "RESEARCH"]).default("PUBLIC"),
  capacity: z.number().int().positive().optional(),
  floors: z.number().int().positive().default(1),
  totalArea: z.number().positive().optional(),
  
  // Policies
  loanPeriod: z.number().int().positive().default(14),
  maxRenewals: z.number().int().min(0).default(2),
  finePerDay: z.number().min(0).optional(),
  maxBooksPerUser: z.number().int().positive().default(5),
  
  // Status
  isActive: z.boolean().default(true),
  isMainBranch: z.boolean().default(false),
  
  // Organization
  orgId: z.string(),
});

export const LibrarySectionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Section name is required"),
  code: z.string().optional(),
  description: z.string().optional(),
  floor: z.number().int().positive().default(1),
  capacity: z.number().int().positive().optional(),
  libraryId: z.string(),
  orgId: z.string(),
  isActive: z.boolean().default(true),
});

export const LibraryStaffSchema = z.object({
  id: z.string().optional(),
  employeeId: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  position: z.enum([
    "LIBRARIAN", 
    "ASSISTANT_LIBRARIAN", 
    "LIBRARY_TECHNICIAN", 
    "CLERK", 
    "MANAGER", 
    "DIRECTOR", 
    "VOLUNTEER", 
    "STUDENT_ASSISTANT"
  ]).default("LIBRARIAN"),
  department: z.string().optional(),
  hireDate: z.date(),
  salary: z.number().min(0).optional(),
  canIssueBooks: z.boolean().default(true),
  canManageBooks: z.boolean().default(false),
  canManageMembers: z.boolean().default(false),
  libraryId: z.string(),
  userId: z.string().optional(),
  orgId: z.string(),
  isActive: z.boolean().default(true),
});

// Type exports
export type FamilyRelationship = z.infer<typeof FamilyRelationshipSchema>;
export type Home = z.infer<typeof HomeSchema>;
export type Khawk = z.infer<typeof KhawkSchema>;
export type Member = z.infer<typeof MemberSchema>;
export type Veng = z.infer<typeof VengSchema>;

// Library Types
export type Library = z.infer<typeof LibrarySchema>;
export type LibrarySection = z.infer<typeof LibrarySectionSchema>;
export type LibraryStaff = z.infer<typeof LibraryStaffSchema>;
