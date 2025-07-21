import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { featuresDBPrismaClient } from "@/lib/prisma-client/features-prisma-client";

const purchaseSchema = z.object({
  studentId: z.string(),
  courseId: z.string().optional(),
  type: z.enum(["MONTHLY_FEE", "LESSON_BOOK", "OTHER"]),
  amount: z.number().min(0),
  description: z.string().optional(),
  forMonth: z.string().optional(),
  method: z.enum(["CASH", "BANK", "ONLINE", "TRANSFER"]),
  invoiceId: z.string().optional(),
});

const purchases = new Hono()

  // GET all by student or course
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        studentId: z.string().optional(),
        courseId: z.string().optional(),
      })
    ),
    async (c) => {
      const q = c.req.valid("query");
      const recs = await featuresDBPrismaClient.purchase.findMany({
        where: { ...q, paidAt: undefined },
        orderBy: { paidAt: "desc" },
      });
      return c.json(recs);
    }
  )

  // GET one
  .get("/:id", async (c) => {
    const rec = await featuresDBPrismaClient.purchase.findUnique({
      where: { id: c.req.param("id") },
    });
    return rec ? c.json(rec) : c.notFound();
  })

  // CREATE purchase
  .post(
    "/",
    zValidator(
      "query",
      z.object({
        orgId: z.string(),
      })
    ),
    zValidator("json", purchaseSchema),
    async (c) => {
      const { orgId } = c.req.valid("query");
      const data = c.req.valid("json");
      const rec = await featuresDBPrismaClient.purchase.create({
        data: {
          ...data,
          orgId,
          paidAt: new Date(data.forMonth ?? new Date().toISOString()),
        },
      });
      return c.json(rec, 201);
    }
  )

  // UPDATE purchase
  .patch("/:id", zValidator("json", purchaseSchema.partial()), async (c) => {
    const data = c.req.valid("json");
    const rec = await featuresDBPrismaClient.purchase.update({
      where: { id: c.req.param("id") },
      data: {
        ...data,
        paidAt: data.forMonth ? new Date(data.forMonth) : undefined,
      },
    });
    return c.json(rec);
  })

  // DELETE purchase
  .delete("/:id", async (c) => {
    await featuresDBPrismaClient.purchase.delete({
      where: { id: c.req.param("id") },
    });
    return c.json({ success: true });
  });

export default purchases;
