import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { ensureUserInOrganization } from "@/lib/auth-helpers";
import { scheduleSchema } from "@/features/school-management/types/schemas";

const schedules = new Hono()

  // Create schedule
  .post(
    "/",
    zValidator("json", scheduleSchema.omit({ id: true, orgId: true })),
    zValidator("query", z.object({ orgId: z.string() })),
    async (c) => {
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      const values = c.req.valid("json");

      const created = await prisma.schedule.create({
        data: {
          ...values,
          orgId: organizationId,
        },
      });

      return c.json(created);
    }
  )

  // GET all schedules for org
  .get("/", zValidator("query", z.object({ orgId: z.string() })), async (c) => {
    const authResult = await ensureUserInOrganization(c);
    if ("json" in authResult) return authResult; // Return error if unauthorized
    const { organizationId } = authResult;
    const all = await prisma.schedule.findMany({
      where: { orgId: organizationId },
    });
    return c.json(all);
  })

  // PATCH update schedule by id
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("query", z.object({ orgId: z.string() })),
    zValidator("json", scheduleSchema.omit({ id: true, orgId: true })),

    async (c) => {
      const { id } = c.req.valid("param");
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      const values = c.req.valid("json");

      try {
        const existingCourse = await prisma.schedule.findUnique(
          {
            where: { id, orgId: organizationId },
          }
        );

        if (!existingCourse) {
          return c.json({ error: "Course not found" }, 404);
        }

        const updated = await prisma.schedule.updateMany({
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
            error: "Failed to update schedule",
          },
          500
        );
      }
    }
  )

  // GET schedule by id
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

      const schedule = await prisma.schedule.findFirst({
        where: {
          id,
          orgId: organizationId,
        },
      });
      if (!schedule) return c.json({ error: "Course not found" }, 404);

      return c.json(schedule);
    }
  );

export default schedules;
