import z from "zod";

// StudentCourse
export const studentCourseSchema = z.object({
  id: z.string().cuid().optional(),
  studentId: z.string(),
  courseId: z.string(),
  enrolledAt: z.union([z.string().datetime(), z.date()]).optional(), // This makes the field optional (it can be undefined)

  status: z
    .enum(["ENROLLED", "PAUSED", "RESUMED", "FINISHED", "CANCELLED"])
    .default("ENROLLED"),
  notes: z.string().optional(),
  orgId: z.string(),
});
export type StudentCourseForm = z.infer<typeof studentCourseSchema>;
