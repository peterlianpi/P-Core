import { Hono } from "hono";
import { VengSchema } from "../types/schemas";
import { prisma } from "@/lib/db/client";

const vengApi = new Hono();

// Create
vengApi.post("/", async (c) => {
  const data = await c.req.json();
  const parsed = VengSchema.parse(data);
  const veng = await prisma.veng.create({ data: parsed });
  return c.json({ data: veng });
});

// List with pagination/filtering
vengApi.get("/", async (c) => {
  const { orgId, page = "1", pageSize = "20", search } = c.req.query();
  const take = parseInt(pageSize, 10);
  const skip = (parseInt(page, 10) - 1) * take;
  const where: Record<string, unknown> = { orgId };
  if (search) where.name = { contains: search, mode: "insensitive" };
  const [data, total] = await Promise.all([
    prisma.veng.findMany({ where, skip, take }),
    prisma.veng.count({ where }),
  ]);
  return c.json({ data, total, page: Number(page), pageSize: take });
});

// Read single
vengApi.get("/:id", async (c) => {
  const { id } = c.req.param();
  const veng = await prisma.veng.findUnique({ where: { id } });
  if (!veng) return c.json({ error: "Not found" }, 404);
  return c.json({ data: veng });
});

// Update
vengApi.put("/:id", async (c) => {
  const { id } = c.req.param();
  const data = await c.req.json();
  const parsed = VengSchema.partial().parse(data);
  const veng = await prisma.veng.update({ where: { id }, data: parsed });
  return c.json({ data: veng });
});

// Delete
vengApi.delete("/:id", async (c) => {
  const { id } = c.req.param();
  await prisma.veng.delete({ where: { id } });
  return c.json({ success: true });
});

export default vengApi;
