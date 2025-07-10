import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { userDBPrismaClient } from '@/lib/prisma-client/user-prisma-client';
import { sendInviteEmail } from '@/lib/mail/send-invite';
import crypto from 'crypto';

const acceptSchema = z.object({
    token: z.string(),
});

const OrganizationUserRoleEnum = z.enum([
    'ACCOUNTANT',
    'OFFICE_STAFF',
    'OWNER',
    'MEMBER',
    'ADMIN',
]);

const schema = z.object({
    email: z.string().email(),
    organizationId: z.string(),
    role: OrganizationUserRoleEnum.optional(),
});

const app = new Hono()
    .post(
        '/',
        zValidator(
            'query',
            z.object({
                userId: z.string(),
            })
        ),
        zValidator('json', schema),
        async (c) => {
            const { userId } = c.req.valid('query');
            const { email, organizationId, role } = c.req.valid('json');

            const organization = await userDBPrismaClient.organization.findUnique({
                where: { id: organizationId },
            });

            if (!organization) {
                return c.json({ error: 'Organization not found' }, 404);
            }

            // Check for existing invite
            const existingInvite = await userDBPrismaClient.organizationInvite.findFirst({
                where: {
                    email,
                    organizationId,
                },
            });

            // If there's an existing invite
            if (existingInvite) {
                const now = new Date();

                // If it's expired, delete it
                if (existingInvite.expiresAt < now) {
                    await userDBPrismaClient.organizationInvite.delete({
                        where: { id: existingInvite.id },
                    });
                } else {
                    // Optional: return early or continue with resending new invite anyway
                    return c.json({ message: 'An active invite already exists.', invite: existingInvite }, 200);
                }
            }

            // Create new invite
            const token = crypto.randomUUID();
            const newInvite = await userDBPrismaClient.organizationInvite.create({
                data: {
                    invitedBy: userId,
                    email,
                    organizationId,
                    role: role ?? 'MEMBER',
                    token,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
                },
            });

            // Send invite email
            await sendInviteEmail(email, token, organization.name);

            return c.json({ message: 'New invite sent', invite: newInvite });
        }
    )

    // Accept invite route
    .post(
        '/accept', zValidator(
            'query',
            z.object({
                userId: z.string(),
            })
        ),
        zValidator('json', acceptSchema),
        async (c) => {
            const { userId } = c.req.valid("query")
            const { token } = c.req.valid('json');

            // 1. Find invite by token
            const invite = await userDBPrismaClient.organizationInvite.findUnique({
                where: { token },
            });

            if (!invite) {
                return c.json({ error: 'Invalid invite token' }, 404);
            }

            if (invite.expiresAt < new Date()) {
                return c.json({ error: 'Invite token has expired' }, 400);
            }

            if (invite.accepted) {
                return c.json({ error: 'Invite already accepted' }, 400);
            }

            // 2. Get the user
            const user = await userDBPrismaClient.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                return c.json({ error: 'User not found' }, 404);
            }

            // 3. Optional: verify email match
            if (user.email !== invite.email) {
                return c.json({ error: 'Invite email does not match your account email' }, 403);
            }

            // 4. Add user to the organization
            await userDBPrismaClient.userOrganization.create({
                data: {
                    userId: user.id,
                    organizationId: invite.organizationId,
                    role: invite.role ?? 'MEMBER',
                },
            });

            // 5. Mark invite as accepted
            await userDBPrismaClient.organizationInvite.update({
                where: { id: invite.id },
                data: { accepted: true },
            });

            return c.json({ message: 'Invite accepted successfully', organizationId: invite.organizationId });
        }
    )

    .get("/", zValidator(
        'query',
        z.object({
            token: z.string(),
        })), async (c) => {
            const { token } = c.req.valid("query");

            const invite = await userDBPrismaClient.organizationInvite.findUnique({
                where: { token },
                include: {
                    organization: true,
                },
            });

            if (!invite || invite.expiresAt < new Date()) {
                return c.json({ error: "Invalid or expired invite" }, 400);
            }

            return c.json({
                id: invite.id,
                email: invite.email,
                organizationId: invite.organizationId,
                organizationName: invite.organization.name,
                expiresAt: invite.expiresAt,
                accepted: invite.accepted,
                role: invite.role,
            })
        })

export default app;
