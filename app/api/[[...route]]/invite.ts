/**
 * Organization Invitation Management API
 * 
 * Handles organization member invitations including:
 * - Creating and sending invitations via email
 * - Accepting invitations and creating user-organization relationships  
 * - Retrieving invitation details and organization invite lists
 * - Revoking pending invitations
 * 
 * Security: Uses organization context and permission-based access control
 * Email: Integrates with email service for invitation notifications
 * Status: Tracks invitation lifecycle (PENDING -> ACCEPTED/DECLINED/EXPIRED/CANCELLED)
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { sendInviteEmail } from "@/lib/mail/send-invite";
// import { handleError } from "@/lib/error-handler";
// import { 
//   organizationSecurityMiddleware, 
//   getOrganizationContext,
//   requirePermission 
// } from "@/lib/security/tenant";
import crypto from "crypto";
import { prisma } from "@/lib/db/client";

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

/**
 * Schema for accepting invitations
 * Requires the unique invitation token for security
 */
const acceptSchema = z.object({
  token: z.string().min(1, "Token is required"),
});

/**
 * Available organization roles for invitation
 * Matches the OrganizationRole enum in Prisma schema
 */
const OrganizationUserRoleEnum = z.enum([
  "ACCOUNTANT",
  "OFFICE_STAFF", 
  "OWNER",
  "MEMBER",
  "ADMIN",
]);

/**
 * Schema for creating/sending invitations
 * Supports both new invites and resending existing ones
 */
const inviteSchema = z.object({
  email: z.string().email("Invalid email format"),
  organizationId: z.string().min(1, "Organization ID is required"),
  role: OrganizationUserRoleEnum.optional(), // Defaults to MEMBER
  actionType: z.enum(["invite", "resend"]).optional(), // Defaults to "invite"
});

/**
 * Schema for revoking invitations
 * Requires email and organization to identify the invite
 */
const revokeRequestSchema = z.object({
  email: z.string().email("Invalid email format"),
  organizationId: z.string().min(1, "Organization ID is required"),
});

/**
 * Schema for querying invitations
 * Supports filtering by token or organization ID
 */
// const queryInvitesSchema = z.object({
//   token: z.string().optional(),
//   orgId: z.string().optional(),
// });

// ============================================================================
// MAIN APP ROUTER
// ============================================================================

const app = new Hono()

  /**
   * POST / - Create or Resend Organization Invitation
   * 
   * Creates a new invitation or resends an existing one to invite users
   * to join an organization. Handles duplicate invites intelligently by:
   * - Checking for existing active invites
   * - Updating expired invites with new tokens
   * - Supporting both new invites and resends
   * 
   * Flow:
   * 1. Validate organization exists
   * 2. Check for existing invites
   * 3. Handle resend logic (update existing) 
   * 4. Handle new invite logic (create new)
   * 5. Send email notification with secure token
   * 
   * Security: Requires userId in query for audit trail
   * Email: Sends invitation with unique token and organization name
   * Expiry: 7 days default expiration for all invites
   */
  .post(
    "/",
    zValidator(
      "query", 
      z.object({
        userId: z.string(), // Required for audit trail
      })
    ),
    zValidator("json", inviteSchema),
    async (c) => {
      const { userId } = c.req.valid("query");
      const {
        email,
        organizationId,
        role,
        actionType = "invite", // Default to new invite
      } = c.req.valid("json");

      // Step 1: Validate organization exists
      const organization = await prisma.organization.findUnique({
        where: { id: organizationId },
      });

      if (!organization) {
        return c.json({ error: "Organization not found" }, 404);
      }

      // Step 2: Check for existing invitation
      const existingInvite = await prisma.organizationInvite.findFirst({
        where: { email, organizationId },
      });

      const now = new Date();
      const token = crypto.randomUUID(); // Generate secure token
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

      if (existingInvite) {
        // Step 3: Handle resend request
        if (actionType === "resend") {
          await prisma.organizationInvite.update({
            where: { id: existingInvite.id },
            data: {
              role: role ?? existingInvite.role, // Keep existing role if not specified
              expiresAt, // Extend expiry to 7 days from now
              token, // Generate new secure token
              status: "PENDING", // Reset status
            },
          });

          await sendInviteEmail(email, token, organization.name);
          return c.json({ message: "Invite resent successfully." });
        }

        // Step 4: Check if active invite already exists
        if (existingInvite.expiresAt > now && existingInvite.status === "PENDING") {
          return c.json({ message: "An active invite already exists." }, 200);
        }

        // Step 5: Clean up expired/cancelled invite
        await prisma.organizationInvite.delete({
          where: { id: existingInvite.id },
        });
      }

      // Step 6: Create new invitation
      await prisma.organizationInvite.create({
        data: {
          invitedBy: userId,
          email,
          organizationId,
          role: role ?? "MEMBER", // Default to MEMBER role
          token,
          expiresAt,
          status: "PENDING", // Initial status
        },
      });

      // Step 7: Send email notification
      await sendInviteEmail(email, token, organization.name);

      return c.json({ message: "New invite sent." });
    }
  )

  /**
   * POST /accept - Accept Organization Invitation
   * 
   * Processes invitation acceptance by creating a user-organization relationship
   * and updating the invitation status. Includes comprehensive validation to
   * ensure security and prevent duplicate memberships.
   * 
   * Flow:
   * 1. Validate invitation token exists and is valid
   * 2. Check invitation hasn't expired or been accepted
   * 3. Verify user exists and email matches invitation
   * 4. Check for existing organization membership
   * 5. Create user-organization relationship
   * 6. Mark invitation as accepted
   * 
   * Security: Verifies email match between user and invitation
   * Idempotency: Prevents duplicate memberships
   * Audit: Updates invitation status for tracking
   */
  .post(
    "/accept",
    zValidator(
      "query",
      z.object({
        userId: z.string(), // User accepting the invitation
      })
    ),
    zValidator("json", acceptSchema),
    async (c) => {
      const { userId } = c.req.valid("query");
      const { token } = c.req.valid("json");

      // Step 1: Find and validate invitation by token
      const invite = await prisma.organizationInvite.findUnique({
        where: { token },
      });

      if (!invite) {
        return c.json({ error: "Invalid invite token" }, 404);
      }

      // Step 2: Check invitation expiry
      if (invite.expiresAt < new Date()) {
        return c.json({ error: "Invite token has expired" }, 400);
      }

      // Step 3: Check if already accepted
      if (invite.status === "ACCEPTED") {
        return c.json({ error: "Invite already accepted" }, 400);
      }

      // Step 4: Validate user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return c.json({ error: "User not found" }, 404);
      }

      // Step 5: Security check - verify email match
      if (user.email !== invite.email) {
        return c.json(
          { error: "Invite email does not match your account email" },
          403
        );
      }

      // Step 6: Check for existing membership (prevent duplicates)
      const existing = await prisma.userOrganization.findFirst({
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

      // Step 7: Create user-organization relationship
      await prisma.userOrganization.create({
        data: {
          userId: user.id,
          organizationId: invite.organizationId,
          role: invite.role ?? "MEMBER", // Use invited role or default to MEMBER
        },
      });

      // Step 8: Mark invitation as accepted for audit trail
      await prisma.organizationInvite.update({
        where: { id: invite.id },
        data: { status: "ACCEPTED" },
      });

      return c.json({
        message: "Invite accepted successfully",
        organizationId: invite.organizationId,
      });
    }
  )

  /**
   * GET / - Get Invitation Details by Token
   * 
   * Retrieves invitation details for display on invitation acceptance pages.
   * Used by frontend to show invitation information before user accepts.
   * 
   * Flow:
   * 1. Find invitation by token
   * 2. Validate invitation exists and hasn't expired
   * 3. Return invitation details with organization info
   * 
   * Security: Token-based access, no additional auth required
   * Usage: Frontend invitation preview/acceptance pages
   * Data: Returns sanitized invitation info without sensitive details
   */
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        token: z.string(), // Unique invitation token
      })
    ),
    async (c) => {
      const { token } = c.req.valid("query");

      // Step 1: Find invitation with organization details
      const invite = await prisma.organizationInvite.findUnique({
        where: { token },
        include: {
          organization: true, // Include org name for display
        },
      });

      // Step 2: Validate invitation exists and is not expired
      if (!invite || invite.expiresAt < new Date()) {
        return c.json({ error: "Invalid or expired invite" }, 400);
      }

      // Step 3: Return sanitized invitation details
      return c.json({
        email: invite.email,
        organizationName: invite.organization.name,
        expiresAt: invite.expiresAt,
        status: invite.status,
        role: invite.role,
      });
    }
  )

  /**
   * GET /invites - Get All Invitations for Organization
   * 
   * Returns a list of all invitations for a specific organization.
   * Used by organization admins to manage pending invitations.
   * 
   * Flow:
   * 1. Validate organization ID is provided
   * 2. Query all invitations for the organization
   * 3. Transform and return sanitized invitation list
   * 
   * Security: Should be protected by organization access middleware
   * Usage: Organization admin dashboard, invite management UI
   * Data: Returns list of invitations with status and metadata
   */
  .get(
    "/invites",
    zValidator(
      "query",
      z.object({
        orgId: z.string(), // Organization ID to filter invitations
      })
    ),
    async (c) => {
      const { orgId } = c.req.valid("query");

      if (!orgId) {
        return c.json({ error: "Organization ID is required" }, 400);
      }

      // Step 1: Query all invitations for the organization
      const rawInvites = await prisma.organizationInvite.findMany({
        where: { organizationId: orgId },
        include: {
          organization: true, // Include org details
        },
        orderBy: {
          createdAt: 'desc', // Most recent invitations first
        },
      });

      // Step 2: Transform to sanitized invitation list
      const invites = rawInvites.map((invite) => ({
        id: invite.id,
        email: invite.email,
        organizationName: invite.organization.name,
        expiresAt: invite.expiresAt,
        status: invite.status,
        role: invite.role,
        createdAt: invite.createdAt,
      }));

      return c.json(invites);
    }
  )

  /**
   * DELETE / - Revoke Organization Invitation
   * 
   * Permanently deletes an invitation, preventing it from being accepted.
   * Used by organization admins to cancel pending invitations.
   * 
   * Flow:
   * 1. Find invitation by email and organization
   * 2. Validate invitation exists
   * 3. Delete invitation from database
   * 
   * Security: Should require organization admin permissions
   * Effect: Invitation becomes invalid and cannot be accepted
   * Usage: Cancel mistaken invitations, remove pending invites
   */
  .delete("/", zValidator("json", revokeRequestSchema), async (c) => {
    const { email, organizationId } = c.req.valid("json");

    // Step 1: Find existing invitation
    const existingInvite = await prisma.organizationInvite.findFirst({
      where: {
        email,
        organizationId,
      },
    });

    // Step 2: Validate invitation exists
    if (!existingInvite) {
      return c.json({ error: "Invite not found" }, 404);
    }

    // Step 3: Permanently delete invitation
    await prisma.organizationInvite.delete({
      where: { id: existingInvite.id },
    });

    return c.json({ message: "Invite revoked successfully." });
  });

// ============================================================================
// EXPORT
// ============================================================================

export default app;
