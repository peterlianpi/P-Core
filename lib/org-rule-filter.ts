import { db } from "@/lib/db";
import { Context } from "hono";
import { currentUser } from "./auth";

/**
 * Ensures that the authenticated user belongs to a specific organization
 * and has the appropriate role within the organization.
 *
 * @param {Context} c - The API request context.
 * @param {boolean} [adminOnly=false] - If true, ensures the user has an admin role.
 * @param {boolean} [editOnly=false] - If true, ensures the user can edit.
 * @returns {Promise<{ userId: string, organizationId: number, role: string } | Response>}
 * - If authorized, returns an object with userId, organizationId, and role.
 * - Otherwise, returns a JSON response with an error.
 */
export const ensureUserInOrganization = async (
  c: Context,
  adminOnly = false,
  editOnly = false
) => {
  // Get the current user from session
  const user = await currentUser();

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const orgIdStr = c.req.query("orgId"); // Get orgId as string | string[]
  console.log("Org Id : ", orgIdStr);
  const orgId = Array.isArray(orgIdStr) ? orgIdStr[0] : orgIdStr; // Handle array case

  if (!orgId?.trim()) {
    return c.json({ error: "Organization is required!" }, 400);
  }

  const organizationId = orgId; // Convert to a number safely

  // Fetch the user's organization role from the userOrganization table
  const userOrg = await db.userOrganization.findFirst({
    where: { userId: user.id, organizationId },
    select: { role: true },
  });

  if (!userOrg || !userOrg.role) {
    return c.json({ error: "Access denied" }, 403);
  }

  // Define roles allowed for different access levels
  const FULL_ADMIN_ROLES = ["PASTOR", "ASSISTANT_PASTOR"]; // Full admin access
  const EDITOR_ROLES = ["LEADER", "ACCOUNTANT", "OFFICE_STAFF"]; // Roles that can edit

  // If adminOnly flag is true, only users with admin roles can proceed
  if (adminOnly && !FULL_ADMIN_ROLES.includes(userOrg.role)) {
    return c.json({ error: "Admin access required" }, 403);
  }

  // If editOnly flag is true, ensure user has editing permissions
  if (
    editOnly &&
    ![...FULL_ADMIN_ROLES, ...EDITOR_ROLES].includes(userOrg.role)
  ) {
    return c.json({ error: "Editing access required" }, 403);
  }

  // Return userId, organizationId, and role
  return { userId: user.id, organizationId, role: userOrg.role };
};
