import { Hono } from "hono";
import { HomeSchema } from "../types/schemas";
import { prisma } from "@/lib/db/client";

const homeApi = new Hono();

// Create
homeApi.post("/", async (c) => {
  const data = await c.req.json();
  const parsed = HomeSchema.parse(data);
  const home = await prisma.home.create({ data: parsed });
  return c.json({ data: home });
});

// List with pagination/filtering
homeApi.get("/", async (c) => {
  const { orgId, page = "1", pageSize = "20", search } = c.req.query();
  const take = parseInt(pageSize, 10);
  const skip = (parseInt(page, 10) - 1) * take;
  const where: Record<string, unknown> = { orgId };
  if (search) where.homeNumber = { contains: search, mode: "insensitive" };
  const [data, total] = await Promise.all([
    prisma.home.findMany({ where, skip, take }),
    prisma.home.count({ where }),
  ]);
  return c.json({ data, total, page: Number(page), pageSize: take });
});

// Read single
homeApi.get("/:id", async (c) => {
  const { id } = c.req.param();
  const home = await prisma.home.findUnique({ where: { id } });
  if (!home) return c.json({ error: "Not found" }, 404);
  return c.json({ data: home });
});

// Update
homeApi.put("/:id", async (c) => {
  const { id } = c.req.param();
  const data = await c.req.json();
  const parsed = HomeSchema.partial().parse(data);
  const home = await prisma.home.update({ where: { id }, data: parsed });
  return c.json({ data: home });
});

// Delete
homeApi.delete("/:id", async (c) => {
  const { id } = c.req.param();
  await prisma.home.delete({ where: { id } });
  return c.json({ success: true });
});

export default homeApi;
