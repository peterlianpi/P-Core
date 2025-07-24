"use server"

import { featuresDb } from "@/lib/db"
import { z } from "zod"
import { auth } from "@/auth"
import { CourseStatus } from "@prisma/client"

// StudentCourse validation schemas
export const CreateStudentCourseSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
  status: z.nativeEnum(CourseStatus).default(CourseStatus.ENROLLED),
  enrolledAt: z.date().default(new Date()),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  notes: z.string().optional(),
  orgId: z.string().min(1, "Organization ID is required"),
})

export const UpdateStudentCourseSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(CourseStatus).optional(),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  notes: z.string().optional(),
})

export const GetStudentCourseSchema = z.object({
  id: z.string(),
})

export const GetStudentCoursesSchema = z.object({
  studentId: z.string().optional(),
  courseId: z.string().optional(),
  status: z.nativeEnum(CourseStatus).optional(),
  orgId: z.string().min(1, "Organization ID is required"),
})

// Enroll student in course
export async function enrollStudentInCourse(values: z.infer<typeof CreateStudentCourseSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const validatedFields = CreateStudentCourseSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields", details: validatedFields.error.flatten() }
    }

    const { studentId, courseId, status, enrolledAt, startedAt, completedAt, notes, orgId } = validatedFields.data

    // Check if student exists
    const student = await featuresDb.student.findUnique({
      where: { id: studentId },
    })

    if (!student) {
      return { error: "Student not found" }
    }

    // Check if course exists
    const course = await featuresDb.course.findUnique({
      where: { id: courseId },
    })

    if (!course) {
      return { error: "Course not found" }
    }

    // Check if enrollment already exists
    const existingEnrollment = await featuresDb.studentCourse.findFirst({
      where: {
        studentId,
        courseId,
        orgId,
      },
    })

    if (existingEnrollment) {
      return { error: "Student is already enrolled in this course" }
    }

    const studentCourse = await featuresDb.studentCourse.create({
      data: {
        studentId,
        courseId,
        status,
        enrolledAt,
        startedAt: status === CourseStatus.ENROLLED ? startedAt : undefined,
        completedAt: status === CourseStatus.FINISHED ? completedAt : undefined,
        notes,
        orgId,
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            name: true,
            description: true,
            level: true,
          },
        },
      },
    })

    // Create status log entry
    await featuresDb.courseStatusLog.create({
      data: {
        studentCourseId: studentCourse.id,
        status,
        changedAt: new Date(),
        notes: `Enrolled in course: ${course.name}`,
        orgId,
      },
    })

    return { success: "Student enrolled successfully", enrollment: studentCourse }
  } catch (error) {
    console.error("Error enrolling student:", error)
    return { error: "Failed to enroll student in course" }
  }
}

// Update student course status
export async function updateStudentCourseStatus(values: z.infer<typeof UpdateStudentCourseSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const validatedFields = UpdateStudentCourseSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields", details: validatedFields.error.flatten() }
    }

    const { id, status, startedAt, completedAt, notes } = validatedFields.data

    // Check if enrollment exists
    const existingEnrollment = await featuresDb.studentCourse.findUnique({
      where: { id },
      include: {
        student: { select: { name: true } },
        course: { select: { name: true } },
      },
    })

    if (!existingEnrollment) {
      return { error: "Enrollment not found" }
    }

    const updateData: any = {}
    
    if (status !== undefined) {
      updateData.status = status
      
      // Auto-set timestamps based on status
      if (status === CourseStatus.ENROLLED && !existingEnrollment.startedAt) {
        updateData.startedAt = startedAt || new Date()
      }
      
      if (status === CourseStatus.FINISHED && !existingEnrollment.completedAt) {
        updateData.completedAt = completedAt || new Date()
      }
    }
    
    if (startedAt !== undefined) updateData.startedAt = startedAt
    if (completedAt !== undefined) updateData.completedAt = completedAt
    if (notes !== undefined) updateData.notes = notes

    const updatedEnrollment = await featuresDb.studentCourse.update({
      where: { id },
      data: updateData,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        course: {
          select: {
            id: true,
            name: true,
            description: true,
            level: true,
          },
        },
      },
    })

    // Create status log entry if status changed
    if (status && status !== existingEnrollment.status) {
      await featuresDb.courseStatusLog.create({
        data: {
          studentCourseId: id,
          status,
          changedAt: new Date(),
          notes: notes || `Status changed from ${existingEnrollment.status} to ${status}`,
          orgId: existingEnrollment.orgId,
        },
      })
    }

    return { success: "Course enrollment updated successfully", enrollment: updatedEnrollment }
  } catch (error) {
    console.error("Error updating student course:", error)
    return { error: "Failed to update course enrollment" }
  }
}

// Get student course enrollment
export async function getStudentCourse(values: z.infer<typeof GetStudentCourseSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const validatedFields = GetStudentCourseSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { id } = validatedFields.data

    const enrollment = await featuresDb.studentCourse.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
          },
        },
        course: {
          select: {
            id: true,
            name: true,
            description: true,
            level: true,
            duration: true,
            price: true,
          },
        },
        statusLogs: {
          orderBy: { changedAt: "desc" },
          take: 10,
        },
        lessonProgresses: {
          include: {
            lessonBook: {
              select: {
                id: true,
                title: true,
                level: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!enrollment) {
      return { error: "Enrollment not found" }
    }

    return { success: "Enrollment found", enrollment }
  } catch (error) {
    console.error("Error getting student course:", error)
    return { error: "Failed to get enrollment details" }
  }
}

// Get student courses with filters
export async function getStudentCourses(
  values: z.infer<typeof GetStudentCoursesSchema>,
  page: number = 1,
  limit: number = 10
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const validatedFields = GetStudentCoursesSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { studentId, courseId, status, orgId } = validatedFields.data
    const skip = (page - 1) * limit

    const where: any = { orgId }
    
    if (studentId) where.studentId = studentId
    if (courseId) where.courseId = courseId
    if (status) where.status = status

    const [enrollments, total] = await Promise.all([
      featuresDb.studentCourse.findMany({
        where,
        include: {
          student: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              image: true,
            },
          },
          course: {
            select: {
              id: true,
              name: true,
              description: true,
              level: true,
              duration: true,
              price: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { enrolledAt: "desc" },
      }),
      featuresDb.studentCourse.count({ where }),
    ])

    return {
      success: "Enrollments retrieved successfully",
      enrollments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    }
  } catch (error) {
    console.error("Error getting student courses:", error)
    return { error: "Failed to get enrollments" }
  }
}

// Unenroll student from course
export async function unenrollStudentFromCourse(values: z.infer<typeof GetStudentCourseSchema>) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const validatedFields = GetStudentCourseSchema.safeParse(values)
    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { id } = validatedFields.data

    // Check if enrollment exists
    const existingEnrollment = await featuresDb.studentCourse.findUnique({
      where: { id },
      include: {
        student: { select: { name: true } },
        course: { select: { name: true } },
      },
    })

    if (!existingEnrollment) {
      return { error: "Enrollment not found" }
    }

    // Update status to cancelled instead of deleting
    const updatedEnrollment = await featuresDb.studentCourse.update({
      where: { id },
      data: {
        status: CourseStatus.CANCELLED,
      },
    })

    // Create status log entry
    await featuresDb.courseStatusLog.create({
      data: {
        studentCourseId: id,
        status: CourseStatus.CANCELLED,
        changedAt: new Date(),
        notes: `Student unenrolled from course: ${existingEnrollment.course.name}`,
        orgId: existingEnrollment.orgId,
      },
    })

    return { success: "Student unenrolled successfully", enrollment: updatedEnrollment }
  } catch (error) {
    console.error("Error unenrolling student:", error)
    return { error: "Failed to unenroll student from course" }
  }
}

// Get course enrollment statistics
export async function getCourseEnrollmentStats(orgId: string) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const [
      totalEnrollments,
      activeEnrollments,
      completedEnrollments,
      cancelledEnrollments,
      pausedEnrollments,
    ] = await Promise.all([
      featuresDb.studentCourse.count({ where: { orgId } }),
      featuresDb.studentCourse.count({ where: { orgId, status: CourseStatus.ENROLLED } }),
      featuresDb.studentCourse.count({ where: { orgId, status: CourseStatus.FINISHED } }),
      featuresDb.studentCourse.count({ where: { orgId, status: CourseStatus.CANCELLED } }),
      featuresDb.studentCourse.count({ where: { orgId, status: CourseStatus.PAUSED } }),
    ])

    const stats = {
      total: totalEnrollments,
      active: activeEnrollments,
      completed: completedEnrollments,
      cancelled: cancelledEnrollments,
      paused: pausedEnrollments,
      completionRate: totalEnrollments > 0 ? (completedEnrollments / totalEnrollments) * 100 : 0,
    }

    return { success: "Statistics retrieved successfully", stats }
  } catch (error) {
    console.error("Error getting enrollment stats:", error)
    return { error: "Failed to get enrollment statistics" }
  }
}