import { Hono } from "hono";
import { KhawkSchema } from "@/lib/schemas";
import { prisma } from "@/lib/db/client";

const khawkApi = new Hono();

// Create
khawkApi.post("/", async (c) => {
  const data = await c.req.json();
  const parsed = KhawkSchema.parse(data);
  const khawk = await prisma.khawk.create({ data: parsed });
  return c.json({ data: khawk });
});

// List with pagination/filtering
khawkApi.get("/", async (c) => {
  const { orgId, page = "1", pageSize = "20", search } = c.req.query();
  const take = parseInt(pageSize, 10);
  const skip = (parseInt(page, 10) - 1) * take;
  const where: Record<string, unknown> = { orgId };
  if (search) where.name = { contains: search, mode: "insensitive" };
  const [data, total] = await Promise.all([
    prisma.khawk.findMany({ where, skip, take }),
    prisma.khawk.count({ where }),
  ]);
  return c.json({ data, total, page: Number(page), pageSize: take });
});

// Read single
khawkApi.get("/:id", async (c) => {
  const { id } = c.req.param();
  const khawk = await prisma.khawk.findUnique({ where: { id } });
  if (!khawk) return c.json({ error: "Not found" }, 404);
  return c.json({ data: khawk });
});

// Update
khawkApi.put("/:id", async (c) => {
  const { id } = c.req.param();
  const data = await c.req.json();
  const parsed = KhawkSchema.partial().parse(data);
  const khawk = await prisma.khawk.update({ where: { id }, data: parsed });
  return c.json({ data: khawk });
});

// Delete
khawkApi.delete("/:id", async (c) => {
  const { id } = c.req.param();
  await prisma.khawk.delete({ where: { id } });
  return c.json({ success: true });
});

export default khawkApi;
