import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { featuresDBPrismaClient } from '@/lib/prisma-client/features-prisma-client'


const bookSchema = z.object({
    title: z.string(),
    author: z.string().optional(),
    price: z.number().min(0),
    courseId: z.string()
})

const lessonBooks = new Hono()

// GET all by course
lessonBooks.get('/', zValidator('query', z.object({ courseId: z.string() })), async c => {
    const { courseId } = c.req.valid('query')
    const books = await featuresDBPrismaClient.lessonBook.findMany({ where: { courseId } })
    return c.json(books)
})

// GET one
lessonBooks.get('/:id', async c => {
    const book = await featuresDBPrismaClient.lessonBook.findUnique({ where: { id: c.req.param('id') } })
    return book ? c.json(book) : c.notFound()
})

// CREATE
lessonBooks.post('/', zValidator('json', bookSchema), async c => {
    const data = c.req.valid('json')
    const book = await featuresDBPrismaClient.lessonBook.create({ data })
    return c.json(book, 201)
})

// UPDATE
lessonBooks.patch('/:id', zValidator('json', bookSchema.partial()), async c => {
    const data = c.req.valid('json')
    const updated = await featuresDBPrismaClient.lessonBook.update({
        where: { id: c.req.param('id') },
        data
    })
    return c.json(updated)
})

// DELETE
lessonBooks.delete('/:id', async c => {
    await featuresDBPrismaClient.lessonBook.delete({ where: { id: c.req.param('id') } })
    return c.json({ success: true })
})

export default lessonBooks
