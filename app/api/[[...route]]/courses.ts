import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { featuresDBPrismaClient } from "@/lib/prisma-client/features-prisma-client";

const courseSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    level: z.string().optional(),
});

const courses = new Hono()

    // GET all courses for org
    .get("/", zValidator("query", z.object({ orgId: z.string() })), async (c) => {
        const { orgId } = c.req.valid("query");
        const all = await featuresDBPrismaClient.course.findMany({ where: { orgId } });
        return c.json(all);
    })

    // GET one course
    .get("/:id", async (c) => {
        const course = await featuresDBPrismaClient.course.findUnique({
            where: { id: c.req.param("id") },
        });
        return course ? c.json(course) : c.notFound();
    })

    // CREATE
    .post(
        "/",
        zValidator("query", z.object({ orgId: z.string() })),
        zValidator("json", courseSchema),
        async (c) => {
            const { orgId } = c.req.valid("query");
            const body = c.req.valid("json");
            const created = await featuresDBPrismaClient.course.create({
                data: { ...body, orgId },
            });
            return c.json(created, 201);
        }
    )

    // UPDATE
    .patch(
        "/:id",
        zValidator("json", courseSchema.partial()),
        async (c) => {
            const body = c.req.valid("json");
            const updated = await featuresDBPrismaClient.course.update({
                where: { id: c.req.param("id") },
                data: body,
            });
            return c.json(updated);
        }
    )

    // DELETE
    .delete("/:id", async (c) => {
        await featuresDBPrismaClient.course.delete({ where: { id: c.req.param("id") } });
        return c.json({ success: true });
    });

export default courses;
