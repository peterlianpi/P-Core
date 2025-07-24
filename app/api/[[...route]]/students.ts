import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { currentUser } from '@/lib/auth';
import { handleApiError, ApiError } from '@/lib/utils/api-errors';
import { Prisma } from '@prisma/client';

const app = new Hono();

// Validation schemas
const createStudentSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  dateOfBirth: z.string().transform((str) => new Date(str)).optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  enrollmentDate: z.string().transform((str) => new Date(str)),
  status: z.enum(['ACTIVE', 'INACTIVE', 'GRADUATED', 'TRANSFERRED']).default('ACTIVE'),
  gradeLevel: z.string().optional(),
  section: z.string().optional(),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  guardianEmail: z.string().email().optional(),
  medicalInfo: z.string().optional(),
  notes: z.string().optional(),
});

const updateStudentSchema = createStudentSchema.partial().omit({ studentId: true });

const querySchema = z.object({
  page: z.string().transform(Number).default('1'),
  limit: z.string().transform(Number).default('10'),
  search: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'GRADUATED', 'TRANSFERRED']).optional(),
  gradeLevel: z.string().optional(),
  section: z.string().optional(),
});

// GET /students - List students with pagination and filtering
app.get(
  '/',
  zValidator('query', querySchema),
  async (c) => {
    try {
      const user = await currentUser();
      if (!user) {
        throw new ApiError('Unauthorized', 401);
      }

      const { page, limit, search, status, gradeLevel, section } = c.req.valid('query');
      const skip = (page - 1) * limit;

      // Build where clause
      const where: Prisma.StudentWhereInput = {
        organizationId: user.organizationId,
      };

      if (search) {
        where.OR = [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { studentId: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ];
      }

      if (status) where.status = status;
      if (gradeLevel) where.gradeLevel = gradeLevel;
      if (section) where.section = section;

      const [students, total] = await Promise.all([
        db.student.findMany({
          where,
          skip,
          take: limit,
          orderBy: [
            { lastName: 'asc' },
            { firstName: 'asc' },
          ],
          include: {
            enrollments: {
              include: {
                course: {
                  select: { id: true, name: true, code: true },
                },
              },
            },
            _count: {
              select: {
                enrollments: true,
              },
            },
          },
        }),
        db.student.count({ where }),
      ]);

      return c.json({
        data: students,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      return handleApiError(c, error);
    }
  }
);

// GET /students/:id - Get student by ID
app.get('/:id', async (c) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new ApiError('Unauthorized', 401);
    }

    const id = c.req.param('id');
    const student = await db.student.findFirst({
      where: {
        id,
        organizationId: user.organizationId,
      },
      include: {
        enrollments: {
          include: {
            course: {
              select: { id: true, name: true, code: true, credits: true },
            },
          },
        },
        grades: {
          include: {
            course: {
              select: { id: true, name: true, code: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        attendance: {
          include: {
            course: {
              select: { id: true, name: true, code: true },
            },
          },
          orderBy: { date: 'desc' },
          take: 10,
        },
      },
    });

    if (!student) {
      throw new ApiError('Student not found', 404);
    }

    return c.json({ data: student });
  } catch (error) {
    return handleApiError(c, error);
  }
});

// POST /students - Create new student
app.post(
  '/',
  zValidator('json', createStudentSchema),
  async (c) => {
    try {
      const user = await currentUser();
      if (!user) {
        throw new ApiError('Unauthorized', 401);
      }

      if (!['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(user.role)) {
        throw new ApiError('Insufficient permissions', 403);
      }

      const data = c.req.valid('json');

      // Check if student ID already exists
      const existingStudent = await db.student.findFirst({
        where: {
          studentId: data.studentId,
          organizationId: user.organizationId,
        },
      });

      if (existingStudent) {
        throw new ApiError('Student ID already exists', 400);
      }

      const student = await db.student.create({
        data: {
          ...data,
          organizationId: user.organizationId,
        },
        include: {
          _count: {
            select: {
              enrollments: true,
            },
          },
        },
      });

      return c.json({ data: student }, 201);
    } catch (error) {
      return handleApiError(c, error);
    }
  }
);

// PUT /students/:id - Update student
app.put(
  '/:id',
  zValidator('json', updateStudentSchema),
  async (c) => {
    try {
      const user = await currentUser();
      if (!user) {
        throw new ApiError('Unauthorized', 401);
      }

      if (!['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(user.role)) {
        throw new ApiError('Insufficient permissions', 403);
      }

      const id = c.req.param('id');
      const data = c.req.valid('json');

      // Check if student exists
      const existingStudent = await db.student.findFirst({
        where: {
          id,
          organizationId: user.organizationId,
        },
      });

      if (!existingStudent) {
        throw new ApiError('Student not found', 404);
      }

      const student = await db.student.update({
        where: { id },
        data,
        include: {
          _count: {
            select: {
              enrollments: true,
            },
          },
        },
      });

      return c.json({ data: student });
    } catch (error) {
      return handleApiError(c, error);
    }
  }
);

// DELETE /students/:id - Delete student
app.delete('/:id', async (c) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new ApiError('Unauthorized', 401);
    }

    if (!['SUPER_ADMIN', 'ADMIN'].includes(user.role)) {
      throw new ApiError('Insufficient permissions', 403);
    }

    const id = c.req.param('id');

    // Check if student exists
    const existingStudent = await db.student.findFirst({
      where: {
        id,
        organizationId: user.organizationId,
      },
    });

    if (!existingStudent) {
      throw new ApiError('Student not found', 404);
    }

    // Check if student has enrollments or grades
    const hasData = await db.student.findFirst({
      where: { id },
      include: {
        _count: {
          select: {
            enrollments: true,
            grades: true,
            attendance: true,
          },
        },
      },
    });

    if (hasData && (hasData._count.enrollments > 0 || hasData._count.grades > 0 || hasData._count.attendance > 0)) {
      // Soft delete by marking as inactive
      await db.student.update({
        where: { id },
        data: { status: 'INACTIVE' },
      });
      
      return c.json({ 
        message: 'Student has associated data and has been marked as inactive instead of deleted' 
      });
    }

    // Hard delete if no associated data
    await db.student.delete({
      where: { id },
    });

    return c.json({ message: 'Student deleted successfully' });
  } catch (error) {
    return handleApiError(c, error);
  }
});

// GET /students/:id/enrollments - Get student enrollments
app.get('/:id/enrollments', async (c) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new ApiError('Unauthorized', 401);
    }

    const id = c.req.param('id');

    // Check if student exists and belongs to organization
    const student = await db.student.findFirst({
      where: {
        id,
        organizationId: user.organizationId,
      },
    });

    if (!student) {
      throw new ApiError('Student not found', 404);
    }

    const enrollments = await db.enrollment.findMany({
      where: { studentId: id },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            code: true,
            credits: true,
            description: true,
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });

    return c.json({ data: enrollments });
  } catch (error) {
    return handleApiError(c, error);
  }
});

// GET /students/:id/grades - Get student grades
app.get('/:id/grades', async (c) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new ApiError('Unauthorized', 401);
    }

    const id = c.req.param('id');

    // Check if student exists and belongs to organization
    const student = await db.student.findFirst({
      where: {
        id,
        organizationId: user.organizationId,
      },
    });

    if (!student) {
      throw new ApiError('Student not found', 404);
    }

    const grades = await db.grade.findMany({
      where: { studentId: id },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
      },
      orderBy: [
        { createdAt: 'desc' },
        { course: { name: 'asc' } },
      ],
    });

    return c.json({ data: grades });
  } catch (error) {
    return handleApiError(c, error);
  }
});

export { app as studentsRouter };
