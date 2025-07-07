import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { userDBPrismaClient } from '@/lib/prisma-client/user-prisma-client';
import { sendInviteEmail } from '@/lib/mail/send-invite';
import crypto from 'crypto';

const OrganizationUserRoleEnum = z.enum([
    'ACCOUNTANT',
    'OFFICE_STAFF',
    'OWNER',
    'MEMBER',
]);

const schema = z.object({
    email: z.string().email(),
    organizationId: z.string(),
    role: OrganizationUserRoleEnum.optional(),
});

const app = new Hono()
    .post('/',
        zValidator("query", z.object({
            userId: z.string(), // Changed to required field
        })),
        zValidator('json', schema), async (c) => {
            const { userId } = c.req.valid('query')
            const { email, organizationId, role } = c.req.valid('json')

            const organization = await userDBPrismaClient.organization.findUnique({
                where: { id: organizationId },
            });
            if (!organization) return c.json({ error: 'Organization not found' }, 404);

            const token = crypto.randomUUID();
            const organizationInvite = await userDBPrismaClient.organizationInvite.create({
                data: {
                    invitedBy: userId,
                    email,
                    organizationId,
                    role: role ?? 'MEMBER',
                    token,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
                },
            });

            // Send the invite email
            await sendInviteEmail(email, token, organization.name);

            return c.json(organizationInvite);
        });

export default app;
