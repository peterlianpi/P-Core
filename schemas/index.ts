import { UserRole } from "@/prisma-user-database/user-database-client-types";
import * as z from "zod";

/**
 * Schema for validating user settings updates.
 * Includes validations for optional fields like name, email, and passwords.
 */

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()), // Optional name field
    isTwoFactorEnabled: z.optional(z.boolean()), // Optional 2FA flag
    role: z.enum([
      UserRole.SUPERADMIN,
      UserRole.ADMIN,
      UserRole.MANAGER,
      UserRole.USER,
    ]), // Must be one of the defined user roles
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
  type: z
    .enum(["school", "church", "business", "nonprofit"], {
      required_error: "Team type is required",
    })
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
        .enum(["school", "church", "business", "nonprofit"], {
          required_error: "Team type is required",
        })
        .optional(),
    }),
  })
);

// All Version Server Action use
export const Versions = z.array(
  z.object({
    status: z.string(),
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
