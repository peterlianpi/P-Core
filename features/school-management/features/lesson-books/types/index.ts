export interface Course {
  id: string
  name: string
  orgId: string
  createdAt: string
  updatedAt: string
  levels: string[] // Array of strings for levels
}

export interface LessonBook {
  id: string
  title: string
  author?: string
  price: number
  courseId: string
  course: Course // Include the full course object for display/relation
  level?: string // Specific level within the course
  createdAt: string
  updatedAt: string
}

export type LessonBookFormValues = Omit<LessonBook, "id" | "createdAt" | "updatedAt" | "course">
