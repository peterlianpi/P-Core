import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { featuresDBPrismaClient } from "@/lib/prisma-client/features-prisma-client";


// Define the schema for student data validation
// This schema ensures that the data sent to the API meets the required structure and types.
const studentSchema = z.object({
    name: z.string().min(1),
    birthDate: z.string(), // parse to Date in backend
    gender: z.enum(["MALE", "FEMALE", "OTHER"]),
    phone: z.string(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    guardian: z.string().optional(),
});

const students = new Hono()

    // GET all students for org
    .get("/", zValidator("query", z.object({ orgId: z.string() })), async (c) => {
        const { orgId } = c.req.valid("query");

        // Validate orgId is provided
        if (!orgId) { return c.json({ error: "Organization ID is required" }, 400); }

        // Fetch all students for the given organization ID
        const allStudents = await featuresDBPrismaClient.student.findMany({ where: { orgId } });
        return c.json(allStudents);
    })

    // GET one student by ID
    .get("/:id", async (c) => {
        const student = await featuresDBPrismaClient.student.findUnique({
            where: { id: c.req.param("id") },
        });
        return student ? c.json(student) : c.notFound();
    })

    // CREATE student
    .post(
        "/",
        zValidator("query", z.object({ orgId: z.string() })),
        zValidator("json", studentSchema),
        async (c) => {
            const { orgId } = c.req.valid("query");
            const body = c.req.valid("json");
            const student = await featuresDBPrismaClient.student.create({
                data: { ...body, orgId, birthDate: new Date(body.birthDate) },
            });
            return c.json(student, 201);
        }
    )

    // UPDATE student
    .patch(
        "/:id",
        zValidator("json", studentSchema.partial()),
        async (c) => {
            const id = c.req.param("id");
            const body = c.req.valid("json");
            const updated = await featuresDBPrismaClient.student.update({
                where: { id },
                data: { ...body, birthDate: body.birthDate ? new Date(body.birthDate) : undefined },
            });
            return c.json(updated);
        }
    )

    // DELETE student
    .delete("/:id", async (c) => {
        await featuresDBPrismaClient.student.delete({ where: { id: c.req.param("id") } });
        return c.json({ success: true });
    });

export default students;
