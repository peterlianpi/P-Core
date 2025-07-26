import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { handleError } from "@/lib/error-handler";
import { 
  organizationSecurityMiddleware, 
  getOrganizationContext,
  requirePermission 
} from "@/lib/security/tenant";
import { Prisma } from "@prisma/client";

// Validation schemas
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

const updatePurchaseSchema = purchaseSchema.partial();

const querySchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('20'),
  studentId: z.string().optional(),
  courseId: z.string().optional(),
  type: z.enum(["MONTHLY_FEE", "LESSON_BOOK", "OTHER"]).optional(),
  status: z.enum(["PENDING", "COMPLETED", "FAILED"]).optional(),
  method: z.enum(["CASH", "BANK", "ONLINE", "TRANSFER"]).optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
});

const purchases = new Hono()
  // Apply security middleware
  .use("*", organizationSecurityMiddleware)

  // GET /purchases - List purchases with pagination and filtering
  .get(
    "/",
    zValidator("query", querySchema),
    requirePermission("read:purchases"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const { 
          page, 
          limit, 
          studentId, 
          courseId, 
          type, 
          status, 
          method, 
          fromDate, 
          toDate 
        } = c.req.valid("query");
        const skip = (page - 1) * limit;

        // Build where clause with RLS
        const where: Prisma.PurchaseWhereInput = {
          orgId: orgContext.organizationId,
        };

        if (studentId) where.studentId = studentId;
        if (courseId) where.courseId = courseId;
        if (type) where.type = type;
        if (status) where.status = status;
        if (method) where.method = method;

        if (fromDate || toDate) {
          where.paidAt = {};
          if (fromDate) where.paidAt.gte = new Date(fromDate);
          if (toDate) where.paidAt.lte = new Date(toDate);
        }

        const [purchases, total] = await Promise.all([
          prisma.purchase.findMany({
            where,
            skip,
            take: limit,
            orderBy: [{ paidAt: 'desc' }],
            include: {
              student: {
                select: { id: true, name: true, rollNumber: true },
              },
              course: {
                select: { id: true, name: true },
              },
            },
          }),
          prisma.purchase.count({ where }),
        ]);

        return c.json({
          purchases,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        });
      } catch (error) {
        return handleError(c, error, 500, 'PURCHASES_FETCH_ERROR');
      }
    }
  )

  // GET /purchases/:id - Get single purchase
  .get(
    "/:id",
    requirePermission("read:purchases"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const id = c.req.param('id');

        const purchase = await prisma.purchase.findFirst({
          where: { 
            id, 
            orgId: orgContext.organizationId 
          },
          include: {
            student: {
              select: { id: true, name: true, rollNumber: true, email: true },
            },
            course: {
              select: { id: true, name: true, description: true },
            },
          },
        });

        if (!purchase) {
          return c.json({ error: 'Purchase not found' }, 404);
        }

        return c.json(purchase);
      } catch (error) {
        return handleError(c, error, 500, 'PURCHASE_FETCH_ERROR');
      }
    }
  )

  // POST /purchases - Create new purchase
  .post(
    "/",
    zValidator("json", purchaseSchema),
    requirePermission("create:purchases"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const data = c.req.valid("json");

        // Validate student exists in organization
        const student = await prisma.student.findFirst({
          where: {
            id: data.studentId,
            orgId: orgContext.organizationId,
          },
        });

        if (!student) {
          return c.json({ error: 'Student not found' }, 404);
        }

        // Validate course exists if provided
        if (data.courseId) {
          const course = await prisma.course.findFirst({
            where: {
              id: data.courseId,
              orgId: orgContext.organizationId,
            },
          });

          if (!course) {
            return c.json({ error: 'Course not found' }, 404);
          }
        }

        const purchase = await prisma.purchase.create({
          data: {
            ...data,
            orgId: orgContext.organizationId,
            paidAt: data.forMonth ? new Date(data.forMonth) : new Date(),
            amount: new Prisma.Decimal(data.amount),
          },
          include: {
            student: {
              select: { id: true, name: true, rollNumber: true },
            },
            course: {
              select: { id: true, name: true },
            },
          },
        });

        return c.json(purchase, 201);
      } catch (error) {
        return handleError(c, error, 500, 'PURCHASE_CREATION_ERROR');
      }
    }
  )

  // PATCH /purchases/:id - Update purchase
  .patch(
    "/:id",
    zValidator("json", updatePurchaseSchema),
    requirePermission("update:purchases"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const id = c.req.param('id');
        const data = c.req.valid("json");

        // Check if purchase exists in organization
        const existingPurchase = await prisma.purchase.findFirst({
          where: { 
            id, 
            orgId: orgContext.organizationId 
          },
        });

        if (!existingPurchase) {
          return c.json({ error: 'Purchase not found' }, 404);
        }

        const updateData: Prisma.PurchaseUpdateInput = {
          ...data,
        };

        if (data.amount !== undefined) {
          updateData.amount = new Prisma.Decimal(data.amount);
        }

        if (data.forMonth) {
          updateData.paidAt = new Date(data.forMonth);
        }

        const purchase = await prisma.purchase.update({
          where: { id },
          data: updateData,
          include: {
            student: {
              select: { id: true, name: true, rollNumber: true },
            },
            course: {
              select: { id: true, name: true },
            },
          },
        });

        return c.json(purchase);
      } catch (error) {
        return handleError(c, error, 500, 'PURCHASE_UPDATE_ERROR');
      }
    }
  )

  // DELETE /purchases/:id - Delete purchase
  .delete(
    "/:id",
    requirePermission("delete:purchases"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const id = c.req.param('id');

        const purchase = await prisma.purchase.findFirst({
          where: { 
            id, 
            orgId: orgContext.organizationId 
          },
        });

        if (!purchase) {
          return c.json({ error: 'Purchase not found' }, 404);
        }

        await prisma.purchase.delete({
          where: { id },
        });

        return c.json({ message: 'Purchase deleted successfully' });
      } catch (error) {
        return handleError(c, error, 500, 'PURCHASE_DELETION_ERROR');
      }
    }
  );

export default purchases;
