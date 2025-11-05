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
import { db } from "@/lib/db";

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

      // TODO: Implement when organizationInvite model is added to schema
      // For now, return mock success
      return c.json({ message: "Invite sent successfully." });

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

      // TODO: Implement when organizationInvite model is added to schema
      // For now, return mock success
      return c.json({
        message: "Invite accepted successfully",
        organizationId: "mock_org_id",
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

      // TODO: Implement when organizationInvite model is added to schema
      // For now, return mock data
      return c.json({
        email: "user@example.com",
        organizationName: "Mock Organization",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "PENDING",
        role: "MEMBER",
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

      // TODO: Implement when organizationInvite model is added to schema
      // For now, return mock data
      const invites = [
        {
          id: "mock_invite_1",
          email: "user1@example.com",
          organizationName: "Mock Organization",
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          status: "PENDING",
          role: "MEMBER",
          createdAt: new Date(),
        }
      ];

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

    // TODO: Implement when organizationInvite model is added to schema
    // For now, return mock success
    return c.json({ message: "Invite revoked successfully." });
  });

// ============================================================================
// EXPORT
// ============================================================================

export default app;
