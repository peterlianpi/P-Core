import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { featuresDBPrismaClient } from '@/lib/prisma-client/features-prisma-client'

const logSchema = z.object({
    studentCourseId: z.string(),
    status: z.enum(['ENROLLED', 'PAUSED', 'RESUMED', 'FINISHED', 'CANCELLED']),
    note: z.string().optional()
})

const courseStatusLogs = new Hono()

// GET all logs
courseStatusLogs.get('/', zValidator('query', z.object({ studentCourseId: z.string().optional() })), async c => {
    const q = c.req.valid('query')
    const logs = await featuresDBPrismaClient.courseStatusLog.findMany({ where: q, orderBy: { changedAt: 'asc' } })
    return c.json(logs)
})

// GET one log
courseStatusLogs.get('/:id', async c => {
    const log = await featuresDBPrismaClient.courseStatusLog.findUnique({ where: { id: c.req.param('id') } })
    return log ? c.json(log) : c.notFound()
})

// CREATE log
courseStatusLogs.post('/', zValidator('json', logSchema), async c => {
    const data = c.req.valid('json')
    const log = await featuresDBPrismaClient.courseStatusLog.create({ data })
    return c.json(log, 201)
})

// DELETE log
courseStatusLogs.delete('/:id', async c => {
    await featuresDBPrismaClient.courseStatusLog.delete({ where: { id: c.req.param('id') } })
    return c.json({ success: true })
})

export default courseStatusLogs
