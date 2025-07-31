import z from "zod";

// CourseStatusLog
export const courseStatusLogSchema = z.object({
  id: z.string().cuid().optional(),
  studentCourseId: z.string(),
  status: z.enum(["ENROLLED", "PAUSED", "RESUMED", "FINISHED", "CANCELLED"]),
  changedAt: z.union([z.string().datetime(), z.date()]).optional(), // This makes the field optional (it can be undefined)

  note: z.string().optional(),
  orgId: z.string(),
});
