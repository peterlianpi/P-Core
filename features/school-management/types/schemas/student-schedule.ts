import z from "zod";

// StudentSchedule
export const studentScheduleSchema = z.object({
  id: z.string().cuid().optional(),
  scheduleId: z.string(),
  studentId: z.string(),
  status: z
    .enum(["ENROLLED", "PAUSED", "RESUMED", "FINISHED", "CANCELLED"])
    .default("ENROLLED"),
  notes: z.string().optional(),
  attended: z.boolean().default(false),
  orgId: z.string(),
});
export type StudentScheduleForm = z.infer<typeof studentScheduleSchema>;
