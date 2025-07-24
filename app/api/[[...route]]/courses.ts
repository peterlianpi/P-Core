import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { ensureUserInOrganization } from "@/lib/auth-helpers";
import { courseSchema } from "@/features/school-management/types/schemas";

const courses = new Hono()

  // Create course
  .post(
    "/",
    zValidator("json", courseSchema.omit({ id: true, orgId: true })),
    zValidator("query", z.object({ orgId: z.string() })),
    async (c) => {
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      const values = c.req.valid("json");

      const created = await prisma.course.create({
        data: {
          ...values,
          orgId: organizationId,
        },
      });

      return c.json(created);
    }
  )

  // GET all courses for org
  .get("/", zValidator("query", z.object({ orgId: z.string() })), async (c) => {
    const authResult = await ensureUserInOrganization(c);
    if ("json" in authResult) return authResult; // Return error if unauthorized
    const { organizationId } = authResult;
    const all = await prisma.course.findMany({
      where: { orgId: organizationId },
      select: {
        id: true,
        name: true,
        level: true,
        image: true,
        description: true,
        isActive: true,
        isArchived: true,
        price: true,
      },
    });
    return c.json(all);
  })

  // PATCH update course by id
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("query", z.object({ orgId: z.string() })),
    zValidator("json", courseSchema.omit({ id: true, orgId: true })),

    async (c) => {
      const { id } = c.req.valid("param");
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      const values = c.req.valid("json");

      try {
        const existingCourse = await prisma.course.findUnique({
          where: { id, orgId: organizationId },
        });

        if (!existingCourse) {
          return c.json({ error: "Course not found" }, 404);
        }

        const updated = await prisma.course.updateMany({
          where: {
            id,
            orgId: organizationId,
          },
          data: {
            ...values,
          },
        });

        return c.json(updated);
      } catch {
        return c.json(
          {
            error: "Failed to update course",
          },
          500
        );
      }
    }
  )

  // GET course by id
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("query", z.object({ orgId: z.string() })),
    async (c) => {
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      const { id } = c.req.valid("param");

      if (!id) return c.json({ error: "Course ID is required" }, 400);

      const course = await prisma.course.findFirst({
        where: {
          id,
          orgId: organizationId,
        },
      });
      if (!course) return c.json({ error: "Course not found" }, 404);

      return c.json(course);
    }
  );

export default courses;
