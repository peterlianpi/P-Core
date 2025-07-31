import { z } from "zod";

// Student Bulk Form Schema
// This schema is used for bulk operations like importing students from CSV
export const studentFormBulkSchema = z.object({
  id: z.string().cuid(),
  number: z.number().int().optional(),
  name: z.string(),
  birthDate: z.union([z.string().datetime(), z.date()]).optional(), // This makes the field optional (it can be undefined)
  image: z.string().url().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email().optional(),
  rollNumber: z.string().optional(),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  notes: z.string().optional(),
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  isProspect: z.boolean().default(false),
  joinedAt: z.date().default(new Date()),
  orgId: z.string(),
  courseNames: z.array(z.string()).optional(), // ✅ multi-course support
});

export type StudentFormBulkData = z.infer<typeof studentFormBulkSchema>;

// Student Schema
// This schema is used for individual student records
// It includes all fields and is used for both form inputs and database records
export const StudentSchema = z.object({
  id: z.string(),
  number: z.number().optional(),
  name: z.string().min(2, { message: "Name is required" }),
  birthDate: z.union([z.string().datetime(), z.date()]).optional(), // This makes the field optional (it can be undefined)
  image: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .or(z.literal(""))
    .optional(),
  rollNumber: z.string().optional(),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  notes: z.string().optional(),
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  isProspect: z.boolean().default(false),
  joinedAt: z.union([z.string().datetime(), z.date()]).optional(), // This makes the field optional (it can be undefined)

  orgId: z.string(),
});
export type StudentForm = z.infer<typeof StudentSchema>;

// This is used for inputs like create or update (not DB model)
export const studentFormSchema = StudentSchema.extend({
  courseIds: z.array(z.string()).optional(),

  // Accept any type for image, can be string or File
  image: z.any().optional(),

  // Override birthDate to accept only Date
  birthDate: z.date().optional(),

  // Override joinedAt to accept only Date
  joinedAt: z.date().optional(),

  // Override isActive, isArchived, isProspect, and isDeleted to be optional
  isActive: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isProspect: z.boolean().optional(),
  isDeleted: z.boolean().optional(),

  status: z
    .enum(["SELECT", "ACTIVE", "ARCHIVED", "PROSPECT"], {
      required_error: "Status is required",
    })
    .optional(),
});

export type StudentFormData = z.infer<typeof studentFormSchema>;

// create a new schema omitting id and orgId
export const studentFormDataSchema = studentFormSchema.omit({
  id: true,
  orgId: true,
});

export type studentFormData = z.infer<typeof studentFormDataSchema>;

// This is used for importing students from CSV or other sources
export const studentImportSchema = StudentSchema.omit({
  joinedAt: true,
}).extend({
  courseNames: z.array(z.string()).optional(),
});

export type StudentImportForm = z.infer<typeof studentImportSchema>;
