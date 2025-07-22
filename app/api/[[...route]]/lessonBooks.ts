import { lessonBookSchema } from "@/features/school-management/types/schemas";
import { ensureUserInOrganization } from "@/lib/auth-helpers";
import { featuresDBPrismaClient } from "@/lib/prisma-client/features-prisma-client";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";

const lessonBooks = new Hono()

  // Create lessonBook
  .post(
    "/",
    zValidator("json", lessonBookSchema.omit({ id: true, orgId: true })),
    zValidator("query", z.object({ orgId: z.string() })),
    async (c) => {
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      const values = c.req.valid("json");

      const created = await featuresDBPrismaClient.lessonBook.create({
        data: {
          ...values,
          orgId: organizationId,
        },
      });

      return c.json(created);
    }
  )

  // GET all lessonBooks for org
  .get("/", zValidator("query", z.object({ orgId: z.string() })), async (c) => {
    const authResult = await ensureUserInOrganization(c);
    if ("json" in authResult) return authResult; // Return error if unauthorized
    const { organizationId } = authResult;
    const all = await featuresDBPrismaClient.lessonBook.findMany({
      where: { orgId: organizationId },
      select: {
        id: true,
        title: true,
        coverImage: true,
        description: true,
        price: true,
        isActive: true,
        author: true,
        course: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json(all);
  })

  // PATCH update lessonBook by id
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("query", z.object({ orgId: z.string() })),
    zValidator("json", lessonBookSchema.omit({ id: true, orgId: true })),

    async (c) => {
      const { id } = c.req.valid("param");
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      const values = c.req.valid("json");

      try {
        const existingLessonBook =
          await featuresDBPrismaClient.lessonBook.findUnique({
            where: { id, orgId: organizationId },
          });

        if (!existingLessonBook) {
          return c.json({ error: "LessonBook not found" }, 404);
        }

        const updated = await featuresDBPrismaClient.lessonBook.updateMany({
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
            error: "Failed to update lessonBook",
          },
          500
        );
      }
    }
  )

  // GET lessonBook by id
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("query", z.object({ orgId: z.string() })),
    async (c) => {
      const authResult = await ensureUserInOrganization(c);
      if ("json" in authResult) return authResult; // Return error if unauthorized
      const { organizationId } = authResult;

      const { id } = c.req.valid("param");

      if (!id) return c.json({ error: "LessonBook ID is required" }, 400);

      const lessonBook = await featuresDBPrismaClient.lessonBook.findFirst({
        where: {
          id,
          orgId: organizationId,
        },
      });
      if (!lessonBook) return c.json({ error: "Lesson book not found" }, 404);

      return c.json(lessonBook);
    }
  );

export default lessonBooks;
