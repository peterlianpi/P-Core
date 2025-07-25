import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { prisma as db } from '@/lib/db/client'; // Corrected DB import
import { ApiError } from '@/lib/utils/api-errors';
import { Prisma } from '@prisma/client';
import { getOrganizationContext } from '@/lib/security/tenant';

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


const app = new Hono()



// GET /students - List students with pagination and filtering
.get(
  '/',
  zValidator('query', querySchema),
  async (c) => {
    const orgContext = getOrganizationContext(c); // Correctly get context
    const { page, limit, search, status, gradeLevel, section } = c.req.valid('query');
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.StudentWhereInput = {
      organizationId: orgContext.organizationId,
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

    const [students, total] = await db.$transaction([
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
  }
)

// GET /students/:id - Get student by ID
.get('/:id', async (c) => {
  const orgContext = getOrganizationContext(c);
  const id = c.req.param('id');
  const student = await db.student.findFirst({
    where: {
      id,
      organizationId: orgContext.organizationId,
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
});

// POST /students - Create new student
.post(
  '/',
  zValidator('json', createStudentSchema),
  async (c) => {
    const orgContext = getOrganizationContext(c);
    const data = c.req.valid('json');

    if (!['OWNER', 'ADMIN', 'MANAGER'].includes(orgContext.role)) {
      throw new ApiError('Insufficient permissions', 403);
    }

    // Check if student ID already exists
    const existingStudent = await db.student.findFirst({
      where: {
        studentId: data.studentId,
        organizationId: orgContext.organizationId,
      },
    });

    if (existingStudent) {
      throw new ApiError('Student ID already exists', 400);
    }

    const student = await db.student.create({
      data: {
        ...data,
        organizationId: orgContext.organizationId,
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
  }
);

// PUT /students/:id - Update student
.put(
  '/:id',
  zValidator('json', updateStudentSchema),
  async (c) => {
    const orgContext = getOrganizationContext(c);
    const id = c.req.param('id');
    const data = c.req.valid('json');

    if (!['OWNER', 'ADMIN', 'MANAGER'].includes(orgContext.role)) {
      throw new ApiError('Insufficient permissions', 403);
    }

    // Check if student exists
    const existingStudent = await db.student.findFirst({
      where: {
        id,
        organizationId: orgContext.organizationId,
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
  }
);

// DELETE /students/:id - Delete student
.delete('/:id', async (c) => {
  const orgContext = getOrganizationContext(c);
  const id = c.req.param('id');

  if (!['OWNER', 'ADMIN'].includes(orgContext.role)) {
    throw new ApiError('Insufficient permissions', 403);
  }

  // Check if student exists
  const existingStudent = await db.student.findFirst({
    where: {
      id,
      organizationId: orgContext.organizationId,
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
});

// GET /students/:id/enrollments - Get student enrollments
.get('/:id/enrollments', async (c) => {
  const orgContext = getOrganizationContext(c);
  const id = c.req.param('id');

  // Check if student exists and belongs to organization
  const student = await db.student.findFirst({
    where: {
      id,
      organizationId: orgContext.organizationId,
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
});

// GET /students/:id/grades - Get student grades
.get('/:id/grades', async (c) => {
  const orgContext = getOrganizationContext(c);
  const id = c.req.param('id');

  // Check if student exists and belongs to organization
  const student = await db.student.findFirst({
    where: {
      id,
      organizationId: orgContext.organizationId,
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
});

export { app as studentsRouter };
