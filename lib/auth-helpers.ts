import { db } from "@/lib/db";
import { Context } from "hono";
import { currentUser } from "./auth";

/**
 * Ensures that the authenticated user is part of an organization and has the required role.
 *
 * @param {Context} c - The API request context.
 * @param {boolean} [adminOnly=false] - If true, only admins can proceed.
 * @returns {Promise<{ userId: string, organizationId: number, role: string } | Response>}
 */
export const ensureUserInOrganization = async (
  c: Context,
  adminOnly = false
) => {
  // Get the current user from session
  const user = await currentUser();

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const orgIdStr = c.req.query("orgId"); // Get orgId as string | string[]
  const orgId = Array.isArray(orgIdStr) ? orgIdStr[0] : orgIdStr; // Handle array case

  if (!orgId?.trim()) {
    return c.json({ error: "Organization is required!" }, 400);
  }

  const organizationId = orgId; // Convert to a number safely

  // Check if the user belongs to the given organization and get their role
  const userOrg = await db.userOrganization.findFirst({
    where: { userId: user.id, organizationId },
    select: { role: true },
  });

  if (!userOrg) {
    return c.json({ error: "Access denied" }, 403);
  }

  // const FULL_ADMIN_ROLES = ["PASTOR", "ASSISTANT_PASTOR"];
  // const EDITOR_ROLES = ["LEADER", "ACCOUNTANT"];
  // const VIEWER_ROLES = ["OFFICE_STAFF", "MEMBER"];
  const ADMIN_ROLES = [
    "PASTOR",
    "ASSISTANT_PASTOR",
    "LEADER",
    "ACCOUNTANT",
    "OFFICE_STAFF",
    "MEMBER",
  ]; // Define roles that are allowed

  if (adminOnly && (!userOrg.role || !ADMIN_ROLES.includes(userOrg.role))) {
    return c.json({ error: "Admin access required" }, 403);
  }

  return { userId: user.id, organizationId, role: userOrg.role };
};
