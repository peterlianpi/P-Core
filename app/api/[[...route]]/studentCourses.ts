import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { featuresDBPrismaClient } from '@/lib/prisma-client/features-prisma-client'


const enrollmentSchema = z.object({
    studentId: z.string(),
    courseId: z.string(),
    status: z.enum(['ENROLLED', 'PAUSED', 'RESUMED', 'FINISHED', 'CANCELLED'])
})

const studentCourses = new Hono()

// GET all by course or student
studentCourses.get('/', zValidator('query', z.object({ courseId: z.string().optional(), studentId: z.string().optional() })), async c => {
    const q = c.req.valid('query')
    const records = await featuresDBPrismaClient.studentCourse.findMany({ where: q })
    return c.json(records)
})

// GET one
studentCourses.get('/:id', async c => {
    const rec = await featuresDBPrismaClient.studentCourse.findUnique({ where: { id: c.req.param('id') } })
    return rec ? c.json(rec) : c.notFound()
})

// CREATE enrollment
studentCourses.post('/', zValidator('json', enrollmentSchema), async c => {
    const data = c.req.valid('json')
    const rec = await featuresDBPrismaClient.studentCourse.create({ data })
    return c.json(rec, 201)
})

// UPDATE status
studentCourses.patch('/:id', zValidator('json', z.object({ status: enrollmentSchema.shape.status })), async c => {
    const { status } = c.req.valid('json')
    const rec = await featuresDBPrismaClient.studentCourse.update({ where: { id: c.req.param('id') }, data: { status } })
    return c.json(rec)
})

// DELETE enrollment
studentCourses.delete('/:id', async c => {
    await featuresDBPrismaClient.studentCourse.delete({ where: { id: c.req.param('id') } })
    return c.json({ success: true })
})

export default studentCourses
