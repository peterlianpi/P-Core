import { Hono } from "hono";
import { db } from "@/lib/db";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()

  // GET: Retrieve all users
  .get("/", async (c) => {
    try {
      // Fetch all users with related data
      const users = await db.user.findMany({
        orderBy: { id: "asc" }, // Change "asc" to "desc" for descending order
      });
      return c.json(users);
    } catch (err) {
      console.error(err);
      return c.json({ error: "Error fetching users" }, 500);
    }
  })

  // GET: Retrieve a specific user by ID
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })), // Validate the ID parameter
    async (c) => {
      const { id } = c.req.valid("param");

      try {
        // Fetch a specific user by ID with related data
        const user = await db.user.findUnique({
          where: { id },
        });

        if (!user) {
          return c.json({ error: "User not found" }, 404);
        }
        return c.json(user);
      } catch (err) {
        console.error(err);
        return c.json({ error: "Error fetching user" }, 500);
      }
    }
  );

export default app;
