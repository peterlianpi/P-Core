import { handleError } from "@/lib/error-handler";
import { 
  organizationSecurityMiddleware, 
  getOrganizationContext,
  requirePermission 
} from "@/lib/security/tenant";
import { prisma } from "@/lib/db/client";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// Validation schemas
const createLessonBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price must be positive"),
  coverImage: z.string().optional(),
  courseId: z.string().optional(),
  isActive: z.boolean().default(true),
});

const updateLessonBookSchema = createLessonBookSchema.partial();

const querySchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('20'),
  search: z.string().optional(),
  courseId: z.string().optional(),
  author: z.string().optional(),
  minPrice: z.string().transform(Number).optional(),
  maxPrice: z.string().transform(Number).optional(),
  isActive: z.string().transform(val => val === 'true').optional(),
});

const lessonBooks = new Hono()
  // Apply security middleware
  .use("*", organizationSecurityMiddleware)

  // GET /lesson-books - List lesson books with pagination and filtering
  .get(
    "/",
    zValidator("query", querySchema),
    requirePermission("read:lesson_books"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const { 
          page, 
          limit, 
          search, 
          courseId, 
          author, 
          minPrice, 
          maxPrice, 
          isActive 
        } = c.req.valid("query");
        const skip = (page - 1) * limit;

        // Build where clause with RLS
        const where: Prisma.LessonBookWhereInput = {
          orgId: orgContext.organizationId,
        };

        if (search) {
          where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { author: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ];
        }

        if (courseId) where.courseId = courseId;
        if (author) where.author = { contains: author, mode: 'insensitive' };
        if (isActive !== undefined) where.isActive = isActive;

        if (minPrice !== undefined || maxPrice !== undefined) {
          where.price = {};
          if (minPrice !== undefined) where.price.gte = new Prisma.Decimal(minPrice);
          if (maxPrice !== undefined) where.price.lte = new Prisma.Decimal(maxPrice);
        }

        const [lessonBooks, total] = await Promise.all([
          prisma.lessonBook.findMany({
            where,
            skip,
            take: limit,
            orderBy: [{ title: 'asc' }],
            include: {
              course: {
                select: { id: true, name: true },
              },
            },
          }),
          prisma.lessonBook.count({ where }),
        ]);

        return c.json({
          lessonBooks,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        });
      } catch (error) {
        return handleError(c, error, 500, 'LESSON_BOOKS_FETCH_ERROR');
      }
    }
  )

  // POST /lesson-books - Create new lesson book
  .post(
    "/",
    zValidator("json", createLessonBookSchema),
    requirePermission("create:lesson_books"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const values = c.req.valid("json");

        // Validate course exists if provided
        if (values.courseId) {
          const course = await prisma.course.findFirst({
            where: {
              id: values.courseId,
              orgId: orgContext.organizationId,
            },
          });

          if (!course) {
            return c.json({ error: 'Course not found' }, 404);
          }
        }

        const created = await prisma.lessonBook.create({
          data: {
            ...values,
            price: new Prisma.Decimal(values.price),
            orgId: orgContext.organizationId,
          },
          include: {
            course: {
              select: { id: true, name: true },
            },
          },
        });

        return c.json(created, 201);
      } catch (error) {
        return handleError(c, error, 500, 'LESSON_BOOK_CREATION_ERROR');
      }
    }
  )

  // GET /lesson-books/:id - Get single lesson book
  .get(
    "/:id",
    requirePermission("read:lesson_books"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const id = c.req.param('id');

        const lessonBook = await prisma.lessonBook.findFirst({
          where: { 
            id, 
            orgId: orgContext.organizationId 
          },
          include: {
            course: {
              select: { id: true, name: true, description: true },
            },
          },
        });

        if (!lessonBook) {
          return c.json({ error: 'Lesson book not found' }, 404);
        }

        return c.json(lessonBook);
      } catch (error) {
        return handleError(c, error, 500, 'LESSON_BOOK_FETCH_ERROR');
      }
    }
  )

  // PATCH /lesson-books/:id - Update lesson book
  .patch(
    "/:id",
    zValidator("json", updateLessonBookSchema),
    requirePermission("update:lesson_books"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const id = c.req.param('id');
        const values = c.req.valid("json");

        // Check if lesson book exists in organization
        const existingLessonBook = await prisma.lessonBook.findFirst({
          where: { 
            id, 
            orgId: orgContext.organizationId 
          },
        });

        if (!existingLessonBook) {
          return c.json({ error: 'Lesson book not found' }, 404);
        }

        // Validate course exists if updating courseId
        if (values.courseId) {
          const course = await prisma.course.findFirst({
            where: {
              id: values.courseId,
              orgId: orgContext.organizationId,
            },
          });

          if (!course) {
            return c.json({ error: 'Course not found' }, 404);
          }
        }

        // Prepare update data
        const updateData: Record<string, unknown> = {};
        if (values.title !== undefined) updateData.title = values.title;
        if (values.author !== undefined) updateData.author = values.author;
        if (values.description !== undefined) updateData.description = values.description;
        if (values.price !== undefined) updateData.price = new Prisma.Decimal(values.price);
        if (values.coverImage !== undefined) updateData.coverImage = values.coverImage;
        if (values.courseId !== undefined) updateData.courseId = values.courseId;
        if (values.isActive !== undefined) updateData.isActive = values.isActive;

        const updated = await prisma.lessonBook.update({
          where: { id },
          data: updateData,
          include: {
            course: {
              select: { id: true, name: true },
            },
          },
        });

        return c.json(updated);
      } catch (error) {
        return handleError(c, error, 500, 'LESSON_BOOK_UPDATE_ERROR');
      }
    }
  )

  // DELETE /lesson-books/:id - Delete lesson book
  .delete(
    "/:id",
    requirePermission("delete:lesson_books"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const id = c.req.param('id');

        const lessonBook = await prisma.lessonBook.findFirst({
          where: { 
            id, 
            orgId: orgContext.organizationId 
          },
        });

        if (!lessonBook) {
          return c.json({ error: 'Lesson book not found' }, 404);
        }

        // Soft delete by setting isActive to false
        await prisma.lessonBook.update({
          where: { id },
          data: { isActive: false },
        });

        return c.json({ message: 'Lesson book deleted successfully' });
      } catch (error) {
        return handleError(c, error, 500, 'LESSON_BOOK_DELETION_ERROR');
      }
    }
  );

export default lessonBooks;
