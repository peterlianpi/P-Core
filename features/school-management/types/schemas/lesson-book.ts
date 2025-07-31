import z from "zod";

// LessonBook
export const lessonBookSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  author: z.string().optional(),
  price: z.number().default(0),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
  isArchived: z.boolean().default(false),
  isDeleted: z.boolean().default(false),
  orgId: z.string(),
  courseId: z.string(),
  coverImage: z.string().optional(),
  publicationDate: z.union([z.string().datetime(), z.date()]).optional(), // This makes the field optional (it can be undefined)
});

export type LessonBookForm = z.infer<typeof lessonBookSchema>;

export const lessonBookFormSchema = lessonBookSchema
  .omit({
    orgId: true,
  })
  .extend({
    status: z.enum(["SELECT", "ACTIVE", "ARCHIVED"], {
      required_error: "Status is required",
    }),
    // Accept any type for image, can be string or File
    image: z.any().optional(),
    // Override isActive, isArchived, and isDeleted to be optional
    isActive: z.boolean().optional(),
    isArchived: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    price: z.string().optional(),
  });

export type LessonBookFormData = z.infer<typeof lessonBookFormSchema>;

// Custom Lesson Books Data
export const customLessonBookData = lessonBookSchema
  .pick({
    id: true,
    title: true,
    price: true,
    coverImage: true,
    description: true,
    isActive: true,
    author: true,
  })
  .extend({
    course: z.string().optional(),
  });

export type CustomLessonBookData = z.infer<typeof customLessonBookData>;
