import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { getOrganizationContext, requirePermission } from "@/lib/security/tenant";
import { ApiError } from "@/lib/utils/api-errors";
import { courseSchema } from "@/features/school-management/types/schemas";
import { Prisma } from "@prisma/client";

const courses = new Hono()

  .post(
    "/",
    zValidator("json", courseSchema.omit({ id: true, orgId: true })),
    requirePermission("write:courses"), // Example permission
    async (c) => {
      const orgContext = getOrganizationContext(c);
      const values = c.req.valid("json");

      const existingCourse = await prisma.course.findFirst({
        where: { name: values.name, orgId: orgContext.organizationId }
      });
      if (existingCourse) throw new ApiError("A course with this name already exists", 409);

      const created = await prisma.course.create({
        data: {
          ...values,
          price: values.price??0,
          orgId: orgContext.organizationId,
        },
      });

      return c.json(created, 201);
    }
  )

  .get(
    "/", 
    zValidator("query", z.object({ search: z.string().optional() })),
    requirePermission("read:courses"),
    async (c) => {
        const orgContext = getOrganizationContext(c);
        const { search } = c.req.valid("query");

        const where: Prisma.CourseWhereInput = { orgId: orgContext.organizationId };
        if (search) {
            where.name = { contains: search, mode: "insensitive" };
        }

        const all = await prisma.course.findMany({
            where,
            orderBy: { name: "asc" },
        });
        return c.json(all);
    }
  )

  .patch(
    "/:id",
    zValidator("json", courseSchema.partial().omit({ id: true, orgId: true })),
    requirePermission("write:courses"),
    async (c) => {
      const { id } = c.req.param();
      const orgContext = getOrganizationContext(c);
      const values = c.req.valid("json");

      const existingCourse = await prisma.course.findFirst({
        where: { id, orgId: orgContext.organizationId },
      });
      if (!existingCourse) throw new ApiError("Course not found", 404);

      const updated = await prisma.course.update({
        where: { id },
        data: values,
      });

      return c.json(updated);
    }
  )

  .get(
    "/:id",
    requirePermission("read:courses"),
    async (c) => {
      const orgContext = getOrganizationContext(c);
      const { id } = c.req.param();

      const course = await prisma.course.findFirst({
        where: { id, orgId: orgContext.organizationId },
      });
      if (!course) throw new ApiError("Course not found", 404);

      return c.json(course);
    }
  );

export default courses;
