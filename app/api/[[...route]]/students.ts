import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
//import { createId } from "@paralleldrive/cuid2";
import { v2 as cloudinary } from "cloudinary";
import { ensureUserInOrganization } from "@/lib/auth-helpers";
import { featuresDBPrismaClient } from "@/lib/prisma-client/features-prisma-client";
import { Prisma } from "@/prisma-features-database/features-database-client-types";
import {
  studentImportSchema,
  StudentSchema,
} from "@/features/music-school-management/types/schemas";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function createEnrollments(
  studentId: string,
  courseIds: string[],
  orgId: string
) {
  const now = new Date();

  return Promise.all(
    courseIds.map(async (courseId) => {
      // 1. Create the studentCourse enrollment
      const studentCourse = await featuresDBPrismaClient.studentCourse.create({
        data: {
          studentId,
          courseId,
          orgId,
          status: "ENROLLED",
          enrolledAt: now,
        },
      });

      // 2. Create the initial status log
      await featuresDBPrismaClient.courseStatusLog.create({
        data: {
          studentCourseId: studentCourse.id,
          status: "ENROLLED",
          changedAt: now,
          orgId,
          note: "Initial enrollment",
        },
      });

      return studentCourse;
    })
  );
}

const app = new Hono()

  // Endpoint to bulk create students
  .post(
    "/bulk-create",
    zValidator(
      "json",
      z.array(studentImportSchema.omit({ id: true })) // Expecting an array of student data
    ),
    zValidator(
      "query",
      z.object({
        orgId: z.string().optional(),
      })
    ),
    async (c) => {
      const students = c.req.valid("json");
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      try {
        const results = [];

        // 1. Get all course names from the incoming students
        const allCourseNames = Array.from(
          new Set(students.flatMap((s) => s.courseNames ?? []))
        );

        // 2. Fetch matching courses from DB
        const allCourses = await featuresDBPrismaClient.course.findMany({
          where: {
            name: { in: allCourseNames },
            orgId: organizationId,
          },
        });

        const courseNameToId = new Map<string, string>();
        allCourses.forEach((course) => {
          courseNameToId.set(course.name, course.id);
        });

        for (const student of students) {
          // Convert courseNames to courseIds

          const courseIds: string[] =
            student.courseNames
              ?.map((name) => courseNameToId.get(name))
              .filter((id): id is string => typeof id === "string") ?? [];

          const existingStudent =
            await featuresDBPrismaClient.student.findFirst({
              where: {
                name: student.name,
                phone: student.phone,
                birthDate: student.birthDate,
                orgId: organizationId,
              },
              include: { courses: { select: { courseId: true } } },
            });

          if (existingStudent) {
            // Check which courses are already enrolled
            const existingCourseIds = new Set(
              existingStudent.courses.map((c) => c.courseId)
            );
            const newCourseIds =
              courseIds?.filter((id) => !existingCourseIds.has(id)) || [];

            if (newCourseIds.length > 0) {
              await createEnrollments(
                existingStudent.id,
                newCourseIds,
                organizationId
              );
              results.push({
                message: `Updated ${student.name} with new courses.`,
                student: existingStudent,
              });
            } else {
              results.push({
                message: `Student ${student.name} already enrolled in all listed courses.`,
                student: existingStudent,
              });
            }
          } else {
            // Create student first
            const newStudent = await featuresDBPrismaClient.student.create({
              data: {
                ...student,
                orgId: organizationId,
              },
            });

            // Create enrollments if courseIds provided
            if (courseIds && courseIds.length > 0) {
              await createEnrollments(newStudent.id, courseIds, organizationId);
            }

            results.push({
              message: `Created student ${student.name}.`,
              student: newStudent,
            });
          }
        }

        return c.json(
          { message: "Bulk operation complete.", details: results },
          201
        );
      } catch (error) {
        console.error("Bulk create error:", error);
        return c.json({ error: "Failed to bulk create students" }, 500);
      }
    }
  )

  // POST: Create new student
  .post(
    "/",
    zValidator(
      "json",
      StudentSchema.extend({ courseIds: z.array(z.string()).optional() }).omit({
        id: true,
        orgId: true,
      })
    ),
    zValidator(
      "query",
      z.object({
        orgId: z.string().optional(),
      })
    ),
    async (c) => {
      const { courseIds, ...values } = c.req.valid("json");
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      try {
        const existingEmail = await featuresDBPrismaClient.student.findFirst({
          where: {
            email: values.email,
            orgId: organizationId,
          },
        });

        if (existingEmail) {
          return c.json({ error: "Email already exists" }, 409);
        }

        // Create student without courses relation
        const student = await featuresDBPrismaClient.student.create({
          data: {
            ...values,
            orgId: organizationId,
          },
        });

        // Create enrollments if courseIds provided
        if (courseIds && courseIds.length > 0) {
          await createEnrollments(student.id, courseIds, organizationId);
        }

        // Fetch student with courses to return
        const studentWithCourses =
          await featuresDBPrismaClient.student.findUnique({
            where: { id: student.id },
            include: { courses: { include: { course: true } } },
          });

        return c.json(studentWithCourses, 201);
      } catch (error) {
        console.error("Create student error:", error);
        return c.json({ error: "Failed to create student" }, 500);
      }
    }
  )

  // PATCH: Update existing student by ID
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    zValidator(
      "json",
      StudentSchema.extend({ courseIds: z.array(z.string()).optional() }).omit({
        id: true,
        orgId: true,
      })
    ),
    zValidator(
      "query",
      z.object({
        orgId: z.string().optional(),
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      if (!id) {
        return c.json({ error: "Invalid or missing ID" }, 400);
      }

      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult;
      const { organizationId } = authResult;

      const { courseIds, ...restValues } = c.req.valid("json");

      try {
        // Validate student exists
        const existingStudent = await featuresDBPrismaClient.student.findUnique(
          {
            where: { id, orgId: organizationId },
          }
        );

        if (!existingStudent) {
          return c.json({ error: "Student not found" }, 404);
        }

        // Step 1: Update student base data
        await featuresDBPrismaClient.student.update({
          where: { id, orgId: organizationId },
          data: {
            ...restValues,
          },
        });

        // Step 2: Fetch current enrollments
        const existingCourses =
          await featuresDBPrismaClient.studentCourse.findMany({
            where: { studentId: id },
            select: { id: true, courseId: true },
          });

        const existingCourseMap = new Map(
          existingCourses.map((sc) => [sc.courseId, sc.id])
        );

        const incomingCourseIds = new Set(courseIds ?? []);
        const existingCourseIds = new Set(existingCourseMap.keys());

        // Step 3: Compare for changes
        const toAdd = [...incomingCourseIds].filter(
          (cid) => !existingCourseIds.has(cid)
        );
        const toRemove = [...existingCourseIds].filter(
          (cid) => !incomingCourseIds.has(cid)
        );

        // Step 4: Add new enrollments with logs
        await Promise.all(
          toAdd.map(async (courseId) => {
            const enrollment =
              await featuresDBPrismaClient.studentCourse.create({
                data: {
                  studentId: id,
                  courseId,
                  status: "ENROLLED",
                  enrolledAt: new Date(),
                  orgId: organizationId,
                },
              });

            await featuresDBPrismaClient.courseStatusLog.create({
              data: {
                studentCourseId: enrollment.id,
                status: "ENROLLED",
                changedAt: new Date(),
                orgId: organizationId,
                note: "Enrolled via student update",
              },
            });
          })
        );

        // Step 5: Remove dropped enrollments with logs
        await Promise.all(
          toRemove.map(async (courseId) => {
            const studentCourseId = existingCourseMap.get(courseId);
            if (!studentCourseId) return;

            await featuresDBPrismaClient.courseStatusLog.create({
              data: {
                studentCourseId,
                status: "CANCELLED",
                changedAt: new Date(),
                orgId: organizationId,
                note: "Enrollment removed via update",
              },
            });

            await featuresDBPrismaClient.studentCourse.delete({
              where: { id: studentCourseId },
            });
          })
        );

        // Step 6: Return updated student with course info
        const studentWithCourses =
          await featuresDBPrismaClient.student.findUnique({
            where: { id },
            include: {
              courses: {
                include: { course: true },
              },
            },
          });

        return c.json(studentWithCourses);
      } catch {
        return c.json({ error: "Failed to update student" }, 500);
      }
    }
  )

  // GET: Retrieve all students
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        take: z.string().optional(),
        skip: z.string().optional(),
        orgId: z.string().optional(),
      })
    ),
    async (c) => {
      try {
        const { take, skip } = c.req.valid("query");

        // Convert to number (handling undefined values with a fallback)
        const takeNumber = take ? Number(take) : 10; // Default to 0 if take is undefined
        const skipNumber = skip ? Number(skip) : 0; // Default to 0 if skip is undefined
        const authResult = await ensureUserInOrganization(c);
        if ("json" in authResult) return authResult; // Return error if unauthorized
        const { organizationId } = authResult;

        const students = await featuresDBPrismaClient.student.findMany({
          where: { orgId: organizationId },
          take: takeNumber,
          skip: skipNumber,
          orderBy: { id: "asc" }, // Change "asc" to "desc" for descending order
          select: {
            id: true,
            name: true,
            number: true,
            rollNumber: true,
            phone: true,
            gender: true,
            image: true,
            email: true,
            orgId: true,
            birthDate: true,
            address: true,
            parentName: true,
            parentPhone: true,
            joinedAt: true,
            isActive: true,
            isArchived: true,
            isDeleted: true,
            isProspect: true,

            courses: {
              include: {
                course: true,
              },
            },
          },
        });

        // const allStudents = students
        //     .map((student) => {
        //         const validation = StudentSchema.safeParse(student);
        //         if (!validation.success) {
        //             console.error("Validation failed for student:", validation.error);
        //             return null; // Skip invalid students
        //         }
        //         return (validation.data);
        //     })
        //     .filter((student) => student !== null);

        return c.json({
          data: students,
          totalItems: await featuresDBPrismaClient.student.count({
            where: { orgId: organizationId },
          }),
        });
      } catch (err) {
        console.error(err);
        return c.json({ error: "Error fetching students" }, 500);
      }
    }
  )

  // GET: Retrieve all students by search
  .get(
    "/search",
    zValidator(
      "query",
      z.object({
        take: z.string().optional(),
        skip: z.string().optional(),
        searchQuery: z.string().optional(),
        orgId: z.string().optional(),
      })
    ),
    async (c) => {
      try {
        const { take, skip, searchQuery } = c.req.valid("query");

        // Convert to number (handling undefined values with a fallback)
        const takeNumber = take ? Number(take) : 10; // Default to 0 if take is undefined
        const skipNumber = skip ? Number(skip) : 0; // Default to 0 if skip is undefined

        const authResult = await ensureUserInOrganization(c);
        if ("json" in authResult) return authResult; // Return error if unauthorized
        const { organizationId } = authResult;

        // Build search query filter if searchQuery is provided
        const searchFilter =
          searchQuery && searchQuery.trim().length > 0
            ? {
                OR: [
                  {
                    name: {
                      contains: searchQuery,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    parentName: {
                      contains: searchQuery,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    email: {
                      contains: searchQuery,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    phone: {
                      contains: searchQuery,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                  {
                    courses: {
                      some: {
                        course: {
                          is: {
                            name: {
                              contains: searchQuery,
                              mode: Prisma.QueryMode.insensitive,
                            },
                          },
                        },
                      },
                    },
                  },
                ],
              }
            : {};

        const students = await featuresDBPrismaClient.student.findMany({
          where: { orgId: organizationId, ...searchFilter },
          take: takeNumber,
          skip: skipNumber,
          orderBy: { id: "asc" }, // Change "asc" to "desc" for descending order
          select: {
            id: true,
            name: true,
            number: true,
            rollNumber: true,
            phone: true,
            gender: true,
            image: true,
            notes: true,
            email: true,
            orgId: true,
            birthDate: true,
            address: true,
            parentName: true,
            parentPhone: true,
            joinedAt: true,
            isActive: true,
            isArchived: true,
            isDeleted: true,
            isProspect: true,
            courses: {
              include: {
                course: true,
              },
            },
          },
        });

        // const allStudents = students
        //     .map((student) => {
        //         const validation = StudentSchema.safeParse(student);
        //         if (!validation.success) {
        //             console.error("Validation failed for student:", validation.error);
        //             return null; // Skip invalid students
        //         }
        //         return (validation.data);
        //     })
        //     .filter((student) => student !== null);

        return c.json({
          data: students,
          totalItems: await featuresDBPrismaClient.student.count({
            where: { orgId: organizationId, ...searchFilter },
          }),
        });
      } catch (err) {
        console.error(err);
        return c.json({ error: "Error fetching students" }, 500);
      }
    }
  )

  // GET: Retrieve a specific student by ID (No changes needed)
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })), // Validate id as a string
    zValidator("query", z.object({ orgId: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("param"); // Extract id from params
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      try {
        const student = await featuresDBPrismaClient.student.findUnique({
          where: { id: id, orgId: organizationId },
          select: {
            id: true,
            number: true,
            name: true,
            phone: true,
            gender: true,
            image: true,
            email: true,
            orgId: true,
            birthDate: true,
            address: true,
            parentName: true,
            parentPhone: true,
            rollNumber: true,
            notes: true,
            isProspect: true,
            joinedAt: true,
            isActive: true,
            isArchived: true,
            isDeleted: true,
            courses: {
              include: {
                course: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });

        if (!student) {
          return c.json({ error: "Student not found" }, 404);
        }

        // const validation = StudentSchema.safeParse(student);
        // if (!validation.success) {
        //     console.error("Validation failed for student:", validation.error);
        //     return c.json({ error: "Invalid student data" }, 400);
        // }

        return c.json(student);
      } catch (err) {
        console.error("Error fetching student:", err);
        return c.json({ error: "Error fetching student" }, 500);
      }
    }
  )

  // GET: Retrieve stat
  .get(
    "/stats",
    zValidator(
      "query",
      z.object({
        orgId: z.string().optional(),
      })
    ),
    async (c) => {
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      try {
        const stats = await featuresDBPrismaClient.student.groupBy({
          by: ["isActive", "isArchived", "isProspect"],
          _count: true,
          where: { orgId: organizationId },
        });

        return c.json(stats);
      } catch (err) {
        console.error("Error fetching student stats:", err);
        return c.json({ error: "Error fetching student stats" }, 500);
      }
    }
  )

  // Endpoint to delete a student by ID
  .delete(
    "/:id",

    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "query",
      z.object({
        orgId: z.string().optional(),
      })
    ),
    async (c) => {
      // const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      if (!id || isNaN(Number(id))) {
        return c.json({ error: "Invalid or missing ID" }, 400);
      }

      // Validate ID and authentication
      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      // if (!auth?.userId) {
      //   return c.json({ error: "Unauthorized" }, 401);
      // }

      // Identify students to delete

      // Delete students
      const data = await featuresDBPrismaClient.student.delete({
        where: {
          id: id,
          orgId: organizationId,
        },
      });
      // Handle case where data is not found
      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json(data);
    }
  );

export default app;
