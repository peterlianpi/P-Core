import { Hono } from "hono";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";

const app = new Hono()

  // GET: Retrieve all users
  .get("/", async (c) => {
    try {
      const role = await currentRole();

      if (role === UserRole.ADMIN) {
        return c.json(null, { status: 200 });
      }
      return c.json(null, { status: 403 });
    } catch (err) {
      console.error(err);
      return c.json({ error: "Error" }, 500);
    }
  });

export default app;
