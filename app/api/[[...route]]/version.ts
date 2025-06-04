import { Hono } from "hono";
import { db } from "@/lib/db";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const versionSchema = z.object({
  version: z.string(),
  name: z.string(),
  description: z.string().optional(),
  status: z.string(),
});

const app = new Hono()
  // POST: Create new versionInfo
  .post("/", zValidator("json", versionSchema), async (c) => {
    const values = c.req.valid("json");

    try {
      const data = await db.versionInfo.create({
        data: values,
      });
      return c.json(data, 201);
    } catch (err) {
      console.error(err);
      return c.json({ error: "Error creating version info" }, 500);
    }
  })

  // PATCH: Update existing versionInfo by ID
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", versionSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      try {
        const data = await db.versionInfo.update({
          where: { id },
          data: values,
        });
        return c.json(data);
      } catch (err) {
        console.error(err);
        return c.json({ error: "Error updating version info" }, 500);
      }
    }
  )

  // GET: Retrieve all versionInfo
  .get("/", async (c) => {
    try {
      const versions = await db.versionInfo.findMany({
        orderBy: { createdAt: "desc" },
      });
      return c.json(versions);
    } catch (err) {
      console.error(err);
      return c.json({ error: "Error fetching version info" }, 500);
    }
  })

  // GET: Retrieve specific versionInfo by ID
  .get("/:id", zValidator("param", z.object({ id: z.string() })), async (c) => {
    const { id } = c.req.valid("param");

    try {
      const version = await db.versionInfo.findUnique({
        where: { id },
      });
      if (!version) return c.json({ error: "Version not found" }, 404);
      return c.json(version);
    } catch (err) {
      console.error(err);
      return c.json({ error: "Error fetching version info" }, 500);
    }
  })

  // DELETE: Remove versionInfo by ID
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");

      try {
        await db.versionInfo.delete({ where: { id } });
        return c.json({ message: "Version info deleted successfully" });
      } catch (err) {
        console.error(err);
        return c.json({ error: "Error deleting version info" }, 500);
      }
    }
  );

export default app;
