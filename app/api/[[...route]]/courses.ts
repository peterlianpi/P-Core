import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { featuresDBPrismaClient } from "@/lib/prisma-client/features-prisma-client";
import { ensureUserInOrganization } from "@/lib/auth-helpers";
import { courseSchema } from "@/features/music-school-management/types/schemas";

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

      const created = await featuresDBPrismaClient.course.create({
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
    const all = await featuresDBPrismaClient.course.findMany({
      where: { orgId: organizationId },
      select: {
        id: true,
        name: true,
        level: true,
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
    zValidator("json", courseSchema.omit({ id: true, orgId: true })),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("query", z.object({ orgId: z.string() })),
    async (c) => {
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      const values = c.req.valid("json");
      const { id } = c.req.valid("param");

      const updated = await featuresDBPrismaClient.course.updateMany({
        where: {
          id,
          orgId: organizationId,
        },
        data: {
          ...values,
        },
      });
      if (!updated) return c.notFound();

      return c.json(updated);
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

      const course = await featuresDBPrismaClient.course.findFirst({
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
