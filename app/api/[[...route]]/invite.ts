import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { sendInviteEmail } from "@/lib/mail/send-invite";
import { handleError } from "@/lib/error-handler";
import { 
  organizationSecurityMiddleware, 
  getOrganizationContext,
  requirePermission 
} from "@/lib/security/tenant";
import crypto from "crypto";
import { userDBPrismaClient as db } from "@/lib/db/client";

// Validation schemas
const acceptSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

const OrganizationUserRoleEnum = z.enum([
  "ACCOUNTANT",
  "OFFICE_STAFF",
  "OWNER",
  "MEMBER",
  "ADMIN",
]);

const inviteSchema = z.object({
  email: z.string().email("Invalid email format"),
  organizationId: z.string().min(1, "Organization ID is required"),
  role: OrganizationUserRoleEnum.optional(),
  actionType: z.enum(["invite", "resend"]).optional(),
});

const revokeRequestSchema = z.object({
  email: z.string().email("Invalid email format"),
  organizationId: z.string().min(1, "Organization ID is required"),
});

const queryInvitesSchema = z.object({
  token: z.string().optional(),
  orgId: z.string().optional(),
});

const app = new Hono()
  // Invite route

  .post(
    "/",
    zValidator(
      "query",
      z.object({
        userId: z.string(),
      })
    ),
    zValidator("json", schema),
    async (c) => {
      const { userId } = c.req.valid("query");
      const {
        email,
        organizationId,
        role,
        actionType = "invite",
      } = c.req.valid("json");

      const organization = await db.organization.findUnique({
        where: { id: organizationId },
      });

      if (!organization) {
        return c.json({ error: "Organization not found" }, 404);
      }

      const existingInvite = await db.organizationInvite.findFirst({
        where: { email, organizationId },
      });

      const now = new Date();
      const token = crypto.randomUUID();

      if (existingInvite) {
        if (actionType === "resend") {
          // update existing invite
          await db.organizationInvite.update({
            where: { id: existingInvite.id },
            data: {
              role: role ?? existingInvite.role,
              expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // extend expiry
              token,
            },
          });

          await sendInviteEmail(email, token, organization.name);

          return c.json({ message: "Invite resent successfully." });
        }

        if (existingInvite.expiresAt > now) {
          return c.json({ message: "An active invite already exists." }, 200);
        }

        // Expired, delete and create new
        await db.organizationInvite.delete({
          where: { id: existingInvite.id },
        });
      }

      // Create new invite
      await db.organizationInvite.create({
        data: {
          invitedBy: userId,
          email,
          organizationId,
          role: role ?? "MEMBER",
          token,
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      });

      await sendInviteEmail(email, token, organization.name);

      return c.json({ message: "New invite sent." });
    }
  )

  // Accept invite route
  .post(
    "/accept",
    zValidator(
      "query",
      z.object({
        userId: z.string(),
      })
    ),
    zValidator("json", acceptSchema),
    async (c) => {
      const { userId } = c.req.valid("query");
      const { token } = c.req.valid("json");

      // 1. Find invite by token
      const invite = await db.organizationInvite.findUnique({
        where: { token },
      });

      if (!invite) {
        return c.json({ error: "Invalid invite token" }, 404);
      }

      if (invite.expiresAt < new Date()) {
        return c.json({ error: "Invite token has expired" }, 400);
      }

      if (invite.accepted) {
        return c.json({ error: "Invite already accepted" }, 400);
      }

      // 2. Get the user
      const user = await db.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return c.json({ error: "User not found" }, 404);
      }

      // 3. Optional: verify email match
      if (user.email !== invite.email) {
        return c.json(
          { error: "Invite email does not match your account email" },
          403
        );
      }

      // ✅ Step 4 - Check for existing membership
      const existing = await db.userOrganization.findFirst({
        where: {
          userId: user.id,
          organizationId: invite.organizationId,
        },
      });

      if (existing) {
        return c.json(
          { error: "User is already a member of this organization" },
          409
        );
      }

      // ✅ Step 5 - Create if not exists
      await db.userOrganization.create({
        data: {
          userId: user.id,
          organizationId: invite.organizationId,
          role: invite.role ?? "MEMBER",
        },
      });

      // 6. Mark invite as accepted
      await db.organizationInvite.update({
        where: { id: invite.id },
        data: { accepted: true },
      });

      return c.json({
        message: "Invite accepted successfully",
        organizationId: invite.organizationId,
      });
    }
  )

  // Get invite details by token
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        token: z.string(),
      })
    ),
    async (c) => {
      const { token } = c.req.valid("query");

      const invite = await db.organizationInvite.findUnique({
        where: { token },
        include: {
          organization: true,
        },
      });

      if (!invite || invite.expiresAt < new Date()) {
        return c.json({ error: "Invalid or expired invite" }, 400);
      }

      return c.json({
        email: invite.email,
        organizationName: invite.organization.name,
        expiresAt: invite.expiresAt,
        accepted: invite.accepted,
        role: invite.role,
      });
    }
  )

  // Get all invites for an organization
  .get(
    "/invites",
    zValidator(
      "query",
      z.object({
        orgId: z.string(),
      })
    ),
    async (c) => {
      const { orgId } = c.req.valid("query");

      if (!orgId) {
        return c.json({ error: "Organization ID is required" }, 400);
      }

      const rawInvites = await db.organizationInvite.findMany({
        where: { organizationId: orgId },
        include: {
          organization: true,
        },
      });

      const invites = rawInvites.map((invite) => ({
        email: invite.email,
        organizationName: invite.organization.name,
        expiresAt: invite.expiresAt,
        accepted: invite.accepted,
        role: invite.role,
      }));

      return c.json(invites);
    }
  )

  // Revoke invite
  .delete("/", zValidator("json", RevokeRequestSchema), async (c) => {
    const { email, organizationId } = c.req.valid("json");

    const existingInvite = await db.organizationInvite.findFirst({
      where: {
        email,
        organizationId,
      },
    });

    if (!existingInvite) {
      return c.json({ error: "Invite not found" }, 404);
    }

    await db.organizationInvite.delete({
      where: { id: existingInvite.id },
    });

    return c.json({ message: "Invite revoked successfully." });
  });

export default app;
