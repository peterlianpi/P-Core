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
const createScheduleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  courseId: z.string().min(1, "Course ID is required"),
  startTime: z.string().transform(str => new Date(str)),
  endTime: z.string().transform(str => new Date(str)),
  dayOfWeek: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]),
  room: z.string().optional(),
  notes: z.string().optional(),
  isActive: z.boolean().default(true),
});

const updateScheduleSchema = createScheduleSchema.partial();

const querySchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('20'),
  search: z.string().optional(),
  courseId: z.string().optional(),
  dayOfWeek: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
});

const schedules = new Hono()
  // Apply security middleware
  .use("*", organizationSecurityMiddleware)

  // GET /schedules - List schedules with pagination and filtering
  .get(
    "/",
    zValidator("query", querySchema),
    requirePermission("read:schedules"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const { page, limit, search, courseId, dayOfWeek } = c.req.valid("query");
        const skip = (page - 1) * limit;

        // Build where clause with RLS
        const where: Prisma.ScheduleWhereInput = {
          orgId: orgContext.organizationId,
        };

        if (search) {
          where.OR = [
            { course: { name: { contains: search, mode: 'insensitive' } } },
            { title: { contains: search, mode: 'insensitive' } },
          ];
        }

        if (courseId) where.courseId = courseId;
        if (dayOfWeek) where.dayOfWeek = dayOfWeek;

        const [schedules, total] = await Promise.all([
          prisma.schedule.findMany({
            where,
            skip,
            take: limit,
            orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
            include: {
              course: {
                select: { id: true, name: true, description: true },
              },
            },
          }),
          prisma.schedule.count({ where }),
        ]);

        return c.json({
          schedules,
          pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit),
          },
        });
      } catch (error) {
        return handleError(c, error, 500, 'SCHEDULES_FETCH_ERROR');
      }
    }
  )

  // POST /schedules - Create new schedule
  .post(
    "/",
    zValidator("json", createScheduleSchema),
    requirePermission("create:schedules"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const values = c.req.valid("json");

        // Validate course exists in organization
        const course = await prisma.course.findFirst({
          where: {
            id: values.courseId,
            orgId: orgContext.organizationId,
          },
        });

        if (!course) {
          return c.json({ error: 'Course not found' }, 404);
        }

        const created = await prisma.schedule.create({
          data: {
            title: values.title,
            courseId: values.courseId,
            startTime: values.startTime,
            endTime: values.endTime,
            dayOfWeek: values.dayOfWeek,
            room: values.room,
            notes: values.notes,
            isActive: values.isActive,
            orgId: orgContext.organizationId,
          },
          include: {
            course: {
              select: { id: true, name: true, description: true },
            },
          },
        });

        return c.json(created, 201);
      } catch (error) {
        return handleError(c, error, 500, 'SCHEDULE_CREATION_ERROR');
      }
    }
  )

  // GET /schedules/:id - Get single schedule
  .get(
    "/:id",
    requirePermission("read:schedules"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const id = c.req.param('id');

        const schedule = await prisma.schedule.findFirst({
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

        if (!schedule) {
          return c.json({ error: 'Schedule not found' }, 404);
        }

        return c.json(schedule);
      } catch (error) {
        return handleError(c, error, 500, 'SCHEDULE_FETCH_ERROR');
      }
    }
  )

  // PATCH /schedules/:id - Update schedule
  .patch(
    "/:id",
    zValidator("json", updateScheduleSchema),
    requirePermission("update:schedules"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const id = c.req.param('id');
        const values = c.req.valid("json");

        // Check if schedule exists in organization
        const existingSchedule = await prisma.schedule.findFirst({
          where: { 
            id, 
            orgId: orgContext.organizationId 
          },
        });

        if (!existingSchedule) {
          return c.json({ error: 'Schedule not found' }, 404);
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

        // Build update data with only defined fields
        const updateData: Record<string, unknown> = {};
        if (values.title !== undefined) updateData.title = values.title;
        if (values.courseId !== undefined) updateData.courseId = values.courseId;
        if (values.startTime !== undefined) updateData.startTime = values.startTime;
        if (values.endTime !== undefined) updateData.endTime = values.endTime;
        if (values.dayOfWeek !== undefined) updateData.dayOfWeek = values.dayOfWeek;
        if (values.room !== undefined) updateData.room = values.room;
        if (values.notes !== undefined) updateData.notes = values.notes;
        if (values.isActive !== undefined) updateData.isActive = values.isActive;

        const updated = await prisma.schedule.update({
          where: { id },
          data: updateData,
          include: {
            course: {
              select: { id: true, name: true, description: true },
            },
          },
        });

        return c.json(updated);
      } catch (error) {
        return handleError(c, error, 500, 'SCHEDULE_UPDATE_ERROR');
      }
    }
  )

  // DELETE /schedules/:id - Delete schedule
  .delete(
    "/:id",
    requirePermission("delete:schedules"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const id = c.req.param('id');

        const schedule = await prisma.schedule.findFirst({
          where: { 
            id, 
            orgId: orgContext.organizationId 
          },
        });

        if (!schedule) {
          return c.json({ error: 'Schedule not found' }, 404);
        }

        await prisma.schedule.delete({
          where: { id },
        });

        return c.json({ message: 'Schedule deleted successfully' });
      } catch (error) {
        return handleError(c, error, 500, 'SCHEDULE_DELETION_ERROR');
      }
    }
  );

export default schedules;
