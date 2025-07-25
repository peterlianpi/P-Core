import { Hono } from "hono";
import { FamilyRelationshipSchema } from "../types/schemas";
import { prisma } from "@/lib/db/client";

const familyRelationshipApi = new Hono();

// Create
familyRelationshipApi.post("/", async (c) => {
  const data = await c.req.json();
  const parsed = FamilyRelationshipSchema.parse(data);
  const rel = await prisma.familyRelationship.create({ data: parsed });
  return c.json({ data: rel });
});

// List with pagination/filtering
familyRelationshipApi.get("/", async (c) => {
  const { orgId, page = "1", pageSize = "20", fromId, toId } = c.req.query();
  const take = parseInt(pageSize, 10);
  const skip = (parseInt(page, 10) - 1) * take;
  const where: Record<string, unknown> = { orgId };
  if (fromId) where.fromId = fromId;
  if (toId) where.toId = toId;
  const [data, total] = await Promise.all([
    prisma.familyRelationship.findMany({ where, skip, take }),
    prisma.familyRelationship.count({ where }),
  ]);
  return c.json({ data, total, page: Number(page), pageSize: take });
});

// Read single
familyRelationshipApi.get("/:id", async (c) => {
  const { id } = c.req.param();
  const rel = await prisma.familyRelationship.findUnique({ where: { id } });
  if (!rel) return c.json({ error: "Not found" }, 404);
  return c.json({ data: rel });
});

// Update
familyRelationshipApi.put("/:id", async (c) => {
  const { id } = c.req.param();
  const data = await c.req.json();
  const parsed = FamilyRelationshipSchema.partial().parse(data);
  const rel = await prisma.familyRelationship.update({
    where: { id },
    data: parsed,
  });
  return c.json({ data: rel });
});

// Delete
familyRelationshipApi.delete("/:id", async (c) => {
  const { id } = c.req.param();
  await prisma.familyRelationship.delete({ where: { id } });
  return c.json({ success: true });
});

export default familyRelationshipApi;
