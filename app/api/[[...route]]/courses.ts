import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { featuresDBPrismaClient } from "@/lib/prisma-client/features-prisma-client";
import { ensureUserInOrganization } from "@/lib/auth-helpers";

const courses = new Hono()

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
      },
    });
    return c.json(all);
  });

export default courses;
