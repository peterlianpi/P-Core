// Course Schema
// This schema is used for course records

import z from "zod";

// It includes all fields and is used for both form inputs and database records
export const courseSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2, { message: "Course name is required" }),
  description: z.string().optional(),
  image: z.string().optional(),
  price: z.number().default(0).optional(),
  duration: z.number().int().optional(),
  startDate: z.union([z.string().datetime(), z.date()]).optional(), // This makes the field optional (it can be undefined)
  endDate: z.union([z.string().datetime(), z.date()]).optional(), // This makes the field optional (it can be undefined)
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  orgId: z.string(),
  teacherId: z.string().optional(),
  roomId: z.string().optional(),
});

export const courseFormSchema = courseSchema
  .omit({
    id: true,
    orgId: true,
  })
  .extend({
    // Accept any type for image, can be string or File
    image: z.any().optional(),
    // Override startDate and endDate to accept only Date
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    // Override isActive, isArchived, and isDeleted to be optional
    isActive: z.boolean().optional(),
    isArchived: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    status: z.enum(["SELECT", "ACTIVE", "ARCHIVED"], {
      required_error: "Status is required",
    }),
    price: z.string().optional(), // Price can be a string or number
    duration: z.string().optional(), // Duration can be a string or number
  });

export type CourseFormData = z.infer<typeof courseFormSchema>;

// Custom Course Schema for Form Inputs
// Pick only id and name from courseSchema and add levels (string array)
export const customCourseFormSchema = courseSchema
  .pick({
    id: true,
    name: true,
  })
  .extend({
    price: z.number().default(0).optional(),
    description: z.string().optional().nullable(),
    isActive: z.boolean().default(true),
    level: z
      .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
      .optional()
      .nullable(),
  });

export type CustomCourseFormData = z.infer<typeof customCourseFormSchema>;

// Teacher Schema
export const TeacherSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
  bio: z.string().optional(),
  orgId: z.string(),
  subject: z.string().optional(),
  isAvailable: z.boolean().default(true),
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
});

export type TeacherForm = z.infer<typeof TeacherSchema>;
