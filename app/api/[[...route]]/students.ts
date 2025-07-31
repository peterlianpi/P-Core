import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { handleError } from "@/lib/error-handler";
import {
  organizationSecurityMiddleware,
  getOrganizationContext,
  requirePermission,
} from "@/lib/security/tenant";

// Validation schemas
const createStudentSchema = z.object({
  number: z.string().optional(),
  rollNumber: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format").optional(),
  phone: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  birthDate: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  address: z.string().optional(),
  parentName: z.string().optional(),
  parentPhone: z.string().optional(),
  image: z.string().optional(),
  notes: z.string().optional(),
  isActive: z.boolean().default(true),
  isProspect: z.boolean().default(false),
});

const updateStudentSchema = createStudentSchema.partial();

const querySchema = z.object({
  page: z.string().transform(Number).default("1"),
  limit: z.string().transform(Number).default("20"),
  search: z.string().optional(),
  isActive: z.boolean().optional(),
  isProspect: z.boolean().optional(),
});

export const studentsRouter = new Hono()
  // Apply security middleware
  .use("*", organizationSecurityMiddleware)

  // GET /students - List students with pagination and filtering
  .get(
    "/",
    zValidator("query", querySchema),
    requirePermission("read:students"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const { page, limit, search, isActive, isProspect } =
          c.req.valid("query");
        const skip = (page - 1) * limit;

        // Build where clause with RLS
        const where: any = {
          orgId: orgContext.organizationId,
        };

        if (search) {
          where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { number: { contains: search, mode: "insensitive" } },
            { rollNumber: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ];
        }

        if (isActive !== undefined) where.isActive = isActive;
        if (isProspect !== undefined) where.isProspect = isProspect;

        const [students, total] = await Promise.all([
          prisma.student.findMany({
            where,
            skip,
            take: limit,
            orderBy: [{ name: "asc" }],
            include: {
              courses: {
                include: {
                  course: {
                    select: { id: true, name: true },
                  },
                },
              },
              purchases: {
                select: { id: true, amount: true, status: true },
              },
            },
          }),
          prisma.student.count({ where }),
        ]);

        return c.json({
          students,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        });
      } catch (error) {
        return handleError(c, error, 500, "STUDENTS_FETCH_ERROR");
      }
    }
  )

  // GET /students/:id - Get single student
  .get("/:id", requirePermission("read:students"), async (c) => {
    try {
      const orgContext = getOrganizationContext(c);
      const id = c.req.param("id");

      const student = await prisma.student.findFirst({
        where: {
          id,
          orgId: orgContext.organizationId,
        },
        include: {
          courses: {
            include: {
              course: true,
            },
          },
          purchases: true,
          bookLoans: {
            include: {
              book: {
                select: { title: true, author: true },
              },
            },
          },
        },
      });

      if (!student) {
        return c.json({ error: "Student not found" }, 404);
      }

      return c.json(student);
    } catch (error) {
      return handleError(c, error, 500, "STUDENT_FETCH_ERROR");
    }
  })

  // POST /students - Create new student
  .post(
    "/",
    zValidator("json", createStudentSchema),
    requirePermission("create:students"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const data = c.req.valid("json");

        // Check for duplicate email within organization
        if (data.email) {
          const existingStudent = await prisma.student.findFirst({
            where: {
              email: data.email,
              orgId: orgContext.organizationId,
            },
          });

          if (existingStudent) {
            return c.json(
              { error: "Student with this email already exists" },
              409
            );
          }
        }

        const student = await prisma.student.create({
          data: {
            ...data,
            orgId: orgContext.organizationId,
          },
          include: {
            courses: {
              include: {
                course: true,
              },
            },
          },
        });

        return c.json(student, 201);
      } catch (error) {
        return handleError(c, error, 500, "STUDENT_CREATION_ERROR");
      }
    }
  )

  // PATCH /students/:id - Update student
  .patch(
    "/:id",
    zValidator("json", updateStudentSchema),
    requirePermission("update:students"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const id = c.req.param("id");
        const data = c.req.valid("json");

        // Check if student exists in organization
        const existingStudent = await prisma.student.findFirst({
          where: {
            id,
            orgId: orgContext.organizationId,
          },
        });

        if (!existingStudent) {
          return c.json({ error: "Student not found" }, 404);
        }

        // Check for duplicate email if updating email
        if (data.email && data.email !== existingStudent.email) {
          const duplicateStudent = await prisma.student.findFirst({
            where: {
              email: data.email,
              orgId: orgContext.organizationId,
              id: { not: id },
            },
          });

          if (duplicateStudent) {
            return c.json(
              { error: "Another student with this email already exists" },
              409
            );
          }
        }

        const student = await prisma.student.update({
          where: { id },
          data,
          include: {
            courses: {
              include: {
                course: true,
              },
            },
          },
        });

        return c.json(student);
      } catch (error) {
        return handleError(c, error, 500, "STUDENT_UPDATE_ERROR");
      }
    }
  )

  // DELETE /students/:id - Soft delete student
  .delete("/:id", requirePermission("delete:students"), async (c) => {
    try {
      const orgContext = getOrganizationContext(c);
      const id = c.req.param("id");

      const student = await prisma.student.findFirst({
        where: {
          id,
          orgId: orgContext.organizationId,
        },
      });

      if (!student) {
        return c.json({ error: "Student not found" }, 404);
      }

      // Soft delete
      await prisma.student.update({
        where: { id },
        data: {
          isDeleted: true,
          isActive: false,
        },
      });

      return c.json({ message: "Student deleted successfully" });
    } catch (error) {
      return handleError(c, error, 500, "STUDENT_DELETION_ERROR");
    }
  });

export default studentsRouter;
