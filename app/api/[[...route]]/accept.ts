// import { Hono } from 'hono';
// import { zValidator } from '@hono/zod-validator';
// import { z } from 'zod';
// import { userDBPrismaClient } from '@/lib/prisma-client/user-prisma-client';

// const acceptSchema = z.object({
//     token: z.string(),
//     userId: z.string(), // from session or frontend
// });

// const app = new Hono()

//     // Accept invite route
//     .post(
//         '/accept',
//         zValidator('json', acceptSchema),
//         async (c) => {
//             const { token, userId } = c.req.valid('json');

//             // 1. Find invite by token
//             const invite = await userDBPrismaClient.organizationInvite.findUnique({
//                 where: { token },
//             });

//             if (!invite) {
//                 return c.json({ error: 'Invalid invite token' }, 404);
//             }

//             if (invite.expiresAt < new Date()) {
//                 return c.json({ error: 'Invite token has expired' }, 400);
//             }

//             if (invite.accepted) {
//                 return c.json({ error: 'Invite already accepted' }, 400);
//             }

//             // 2. Get the user
//             const user = await userDBPrismaClient.user.findUnique({
//                 where: { id: userId },
//             });

//             if (!user) {
//                 return c.json({ error: 'User not found' }, 404);
//             }

//             // 3. Optional: verify email match
//             if (user.email !== invite.email) {
//                 return c.json({ error: 'Invite email does not match your account email' }, 403);
//             }

//             // 4. Add user to the organization
//             await userDBPrismaClient.userOrganization.create({
//                 data: {
//                     userId: user.id,
//                     organizationId: invite.organizationId,
//                     role: invite.role ?? 'MEMBER',
//                 },
//             });

//             // 5. Mark invite as accepted
//             await userDBPrismaClient.organizationInvite.update({
//                 where: { id: invite.id },
//                 data: { accepted: true },
//             });

//             return c.json({ message: 'Invite accepted successfully', organizationId: invite.organizationId });
//         }
//     );

// export default app;
