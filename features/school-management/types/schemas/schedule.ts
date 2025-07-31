import z from "zod";

// Schedule
export const scheduleSchema = z.object({
  id: z.string(),
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
});
export type ScheduleForm = z.infer<typeof scheduleSchema>;

export const scheduleFormSchema = scheduleSchema
  .omit({
    id: true,
    orgId: true,
  })
  .extend({
    teacherId: z.string().optional(),
    isActive: z.boolean().optional(),
    isArchived: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    status: z.string().optional(),
  });

export type ScheduleFormData = z.infer<typeof scheduleFormSchema>;
