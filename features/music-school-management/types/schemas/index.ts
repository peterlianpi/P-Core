import { z } from "zod";

// // Status options updated to match your Prisma CourseStatus enum
// const statusOptions = [
//   "ENROLLED",
//   "PAUSED",
//   "RESUMED",
//   "FINISHED",
//   "CANCELLED",
// ] as const;

// export const courseEnrollmentSchema = z.object({
//   courseId: z.string().min(1, "Course is required"),
//   level: z.string().min(1, "Level is required"),
//   enrollmentDate: z
//     .string()
//     .min(1, "Enrollment date is required")
//     .refine((date) => !isNaN(Date.parse(date)), {
//       message: "Invalid date format",
//     }),
//   status: z.enum(statusOptions),
// });

// export const studentFormSchema = z.object({
//   id: z.string().optional(),
//   number: z.number().optional(),
//   name: z.string().min(1, "Name is required"),
//   birthDate: z
//     .string()
//     .optional()
//     .refine((date) => !date || !isNaN(Date.parse(date)), {
//       message: "Invalid birthDate format",
//     }),
//   image: z.string().optional(),
//   gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
//   phone: z.string().optional(),
//   address: z.string().optional(),
//   email: z.string().email("Invalid email").optional(),
//   guardian: z.string().optional(),
//   joinedAt: z
//     .string()
//     .min(1, "Join date is required")
//     .refine((date) => !isNaN(Date.parse(date)), {
//       message: "Invalid joinedAt date format",
//     }),
//   orgId: z.string(),
//   rollNumber: z.string().optional(),
//   parentName: z.string().optional(),
//   parentPhone: z.string().optional(),
//   courses: z
//     .array(courseEnrollmentSchema)
//     .min(1, "At least one course is required"),
// });

// export type StudentFormData = z.infer<typeof studentFormSchema>;

export const studentFormBulkSchema = z.object({
  id: z.string().cuid(),
  number: z.number().int().optional(),
  name: z.string(),
  birthDate: z.date().optional(),
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
export const StudentSchema = z.object({
  id: z.string().cuid(),
  number: z.number().int().optional(),
  name: z.string(),
  birthDate: z.date().optional(),
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
});
export type StudentForm = z.infer<typeof StudentSchema>;

// This is used for inputs like create or update (not DB model)
export const studentFormSchema = StudentSchema.extend({
  courseIds: z.array(z.string()).optional(),
});

export type StudentFormData = z.infer<typeof studentFormSchema>;

// This is used for importing students from CSV or other sources
export const studentImportSchema = StudentSchema.omit({
  joinedAt: true,
}).extend({
  courseNames: z.array(z.string()).optional(),
});

export type StudentImportForm = z.infer<typeof studentImportSchema>;

// Course Schema
export const courseSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().default(0),
  duration: z.number().int().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  orgId: z.string(),
  teacherId: z.string().optional(),
  roomId: z.string().optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;

// Custom Course Schema for Form Inputs
// Pick only id and name from courseSchema and add levels (string array)
export const customCourseFormSchema = courseSchema
  .pick({
    id: true,
    name: true,
  })
  .extend({
    levels: z.array(z.string()).optional(),
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

// LessonBook
export const lessonBookSchema = z.object({
  id: z.string().cuid().optional(),
  title: z.string(),
  author: z.string().optional().nullable(),
  price: z.number().default(0),
  description: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  orgId: z.string(),
  courseId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  coverImage: z.string().optional().nullable(),
  publicationDate: z.date().optional().nullable(),
});

export type LessonBookForm = z.infer<typeof lessonBookSchema>;

// StudentCourse
export const studentCourseSchema = z.object({
  id: z.string().cuid().optional(),
  studentId: z.string(),
  courseId: z.string(),
  enrolledAt: z.date().optional(),
  status: z
    .enum(["ENROLLED", "PAUSED", "RESUMED", "FINISHED", "CANCELLED"])
    .default("ENROLLED"),
  notes: z.string().optional().nullable(),
  orgId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type StudentCourseForm = z.infer<typeof studentCourseSchema>;

// CourseStatusLog
export const courseStatusLogSchema = z.object({
  id: z.string().cuid().optional(),
  studentCourseId: z.string(),
  status: z.enum(["ENROLLED", "PAUSED", "RESUMED", "FINISHED", "CANCELLED"]),
  changedAt: z.date().optional(),
  note: z.string().optional().nullable(),
  orgId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type CourseStatusLogForm = z.infer<typeof courseStatusLogSchema>;

// LessonProgress
export const lessonProgressSchema = z.object({
  id: z.string().cuid().optional(),
  studentId: z.string(),
  lessonBookId: z.string(),
  completed: z.boolean().default(false),
  completedAt: z.date().optional().nullable(),
  progress: z.number().int().min(0).max(100).default(0),
  lessonNumber: z.number().int().optional().nullable(),
  lessonTitle: z.string().optional().nullable(),
  lessonDate: z.date().optional().nullable(),
  studentNotes: z.string().optional().nullable(),
  teacherNotes: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  orgId: z.string(),
});
export type LessonProgressForm = z.infer<typeof lessonProgressSchema>;

// Purchase
export const purchaseSchema = z.object({
  id: z.string().cuid().optional(),
  studentId: z.string(),
  courseId: z.string().optional().nullable(),
  type: z.enum(["MONTHLY_FEE", "LESSON_BOOK", "OTHER"]).default("MONTHLY_FEE"),
  amount: z.number(),
  description: z.string().optional().nullable(),
  paidAt: z.date().optional(),
  forMonth: z.date().optional().nullable(),
  method: z.enum(["CASH", "BANK", "ONLINE", "TRANSFER"]).default("CASH"),
  invoiceId: z.string().optional().nullable(),
  orgId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type PurchaseForm = z.infer<typeof purchaseSchema>;

// Schedule
export const scheduleSchema = z.object({
  id: z.string().cuid().optional(),
  courseId: z.string(),
  teacherId: z.string(),
  roomId: z.string(),
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.date(),
  endTime: z.date(),
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  orgId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type ScheduleForm = z.infer<typeof scheduleSchema>;

// StudentSchedule
export const studentScheduleSchema = z.object({
  id: z.string().cuid().optional(),
  scheduleId: z.string(),
  studentId: z.string(),
  status: z
    .enum(["ENROLLED", "PAUSED", "RESUMED", "FINISHED", "CANCELLED"])
    .default("ENROLLED"),
  notes: z.string().optional().nullable(),
  attended: z.boolean().default(false),
  orgId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type StudentScheduleForm = z.infer<typeof studentScheduleSchema>;

// Room
export const roomSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  location: z.string().optional().nullable(),
  capacity: z.number().int().optional().nullable(),
  orgId: z.string(),
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type RoomForm = z.infer<typeof roomSchema>;

// Invoice
export const invoiceSchema = z.object({
  id: z.string().cuid().optional(),
  number: z.string(),
  studentId: z.string(),
  orgId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type InvoiceForm = z.infer<typeof invoiceSchema>;
