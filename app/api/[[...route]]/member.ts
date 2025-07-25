import { Hono } from "hono";
import { MemberSchema } from "../types/schemas";
import { prisma } from "@/lib/db/client";

const memberApi = new Hono();

// Create
memberApi.post("/", async (c) => {
  const data = await c.req.json();
  const parsed = MemberSchema.parse(data);
  const member = await prisma.member.create({ data: parsed });
  return c.json({ data: member });
});

// Read
memberApi.get("/:id", async (c) => {
  const { id } = c.req.param();
  const member = await prisma.member.findUnique({ where: { id } });
  if (!member) return c.json({ error: "Not found" }, 404);
  return c.json({ data: member });
});

// Update
memberApi.put("/:id", async (c) => {
  const { id } = c.req.param();
  const data = await c.req.json();
  const parsed = MemberSchema.partial().parse(data);
  const member = await prisma.member.update({ where: { id }, data: parsed });
  return c.json({ data: member });
});

// Delete
memberApi.delete("/:id", async (c) => {
  const { id } = c.req.param();
  await prisma.member.delete({ where: { id } });
  return c.json({ success: true });
});

export default memberApi;
