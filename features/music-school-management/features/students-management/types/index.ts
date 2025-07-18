export interface Student {
  id: string
  name: string
  email: string
  phone?: string
  course: string
  level: string
  createdAt: string
  updatedAt: string
}

export type StudentFormValues = Omit<Student, "id" | "createdAt" | "updatedAt">
