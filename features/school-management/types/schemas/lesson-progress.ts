import z from "zod";

// LessonProgress
export const lessonProgressSchema = z.object({
  id: z.string().cuid().optional(),
  studentId: z.string(),
  lessonBookId: z.string(),
  completed: z.boolean().default(false),
  completedAt: z.date().optional(),
  progress: z.number().int().min(0).max(100).default(0),
  lessonNumber: z.number().int().optional(),
  lessonTitle: z.string().optional(),
  lessonDate: z.date().optional(),
  studentNotes: z.string().optional(),
  teacherNotes: z.string().optional(),
  notes: z.string().optional(),
  orgId: z.string(),
});
export type LessonProgressForm = z.infer<typeof lessonProgressSchema>;
