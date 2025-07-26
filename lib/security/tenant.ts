// Multi-Tenant Security Utilities
// Provides type-safe tenant isolation and organization context management
// Replaces manual orgId filtering with automated RLS-based security

import { Context } from "hono";
import { prisma } from "@/lib/db/client";
import { auth } from "@/lib/auth/auth";
import { ContentfulStatusCode } from "hono/utils/http-status";

// Types for organization context
export interface OrganizationContext {
  organizationId: string;
  userId: string;
  role: string;
  permissions: string[];
}

// Enhanced error types for better error handling
export class TenantSecurityError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 403
  ) {
    super(message);
    this.name = "TenantSecurityError";
  }
}

// Organization role hierarchy for permission checking
const ROLE_HIERARCHY = {
  SUPERADMIN: 6, // System-level superadmin access
  OWNER: 5,
  ADMIN: 4,
  MANAGER: 3,
  MEMBER: 2,
  ACCOUNTANT: 2,
  OFFICE_STAFF: 1,
} as const;

// Permission matrix based on roles
const ROLE_PERMISSIONS = {
  SUPERADMIN: [
    "read:all",
    "write:all",
    "delete:all",
    "manage:users",
    "manage:organization",
    "manage:billing",
    "manage:system",
    "read:dashboard",
    "access:superadmin"
  ],
  OWNER: [
    "read:all",
    "write:all", 
    "delete:all",
    "manage:users",
    "manage:organization",
    "manage:billing"
  ],
  ADMIN: [
    "read:all",
    "write:all",
    "delete:most",
    "manage:users",
    "view:analytics",
    "read:dashboard"
  ],
  MANAGER: [
    "read:all",
    "write:most",
    "delete:some",
    "manage:courses",
    "manage:students"
  ],
  MEMBER: [
    "read:assigned",
    "write:assigned"
  ],
  ACCOUNTANT: [
    "read:all",
    "write:financial",
    "manage:purchases",
    "view:reports"
  ],
  OFFICE_STAFF: [
    "read:basic",
    "write:basic",
    "manage:schedules"
  ],
} as const;

/**
 * Set organization context in the database session
 * This enables automatic RLS filtering for all subsequent queries
 */
export async function setOrganizationContext(
  organizationId: string,
  userId: string
): Promise<void> {
  try {
    // Use raw SQL to call the RLS context function
    await prisma.$executeRaw`SELECT set_org_context(${organizationId}, ${userId})`;
  } catch (error) {
    throw new TenantSecurityError(
      "Failed to set organization context",
      "CONTEXT_SET_FAILED",
      500
    );
  }
}

/**
 * Clear organization context from the database session
 */
export async function clearOrganizationContext(): Promise<void> {
  try {
    await prisma.$executeRaw`SELECT clear_org_context()`;
  } catch (error) {
    console.warn("Failed to clear organization context:", error);
  }
}

/**
 * Validate user access to organization and return context
 */
export async function validateOrganizationAccess(
  userId: string,
  organizationId: string
): Promise<OrganizationContext> {
  try {
    // First check if user is a SUPERADMIN
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    });

    // SUPERADMIN users have access to all organizations
    if (user?.role === "SUPERADMIN") {
      return {
        organizationId,
        userId,
        role: "SUPERADMIN",
        permissions: [...ROLE_PERMISSIONS.SUPERADMIN],
      };
    }

    // Query user's organization membership
    const userOrg = await prisma.userOrganization.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!userOrg) {
      throw new TenantSecurityError(
        "User does not have access to this organization",
        "ACCESS_DENIED",
        403
      );
    }

    if (userOrg.status !== "ACTIVE") {
      throw new TenantSecurityError(
        "User access to organization is not active",
        "ACCESS_INACTIVE",
        403
      );
    }

    // Get permissions for the user's role
    const permissions = ROLE_PERMISSIONS[userOrg.role] || [];

    return {
      organizationId,
      userId,
      role: userOrg.role,
      permissions: [...permissions],
    };
  } catch (error) {
    if (error instanceof TenantSecurityError) {
      throw error;
    }
    
    throw new TenantSecurityError(
      "Failed to validate organization access",
      "VALIDATION_FAILED",
      500
    );
  }
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  context: OrganizationContext,
  permission: string
): boolean {
  return context.permissions.includes(permission) || 
         context.permissions.includes("read:all") ||
         context.permissions.includes("write:all");
}

/**
 * Check if user has sufficient role level
 */
export function hasRoleLevel(
  userRole: string,
  requiredRole: string
): boolean {
  const userLevel = ROLE_HIERARCHY[userRole as keyof typeof ROLE_HIERARCHY] || 0;
  const requiredLevel = ROLE_HIERARCHY[requiredRole as keyof typeof ROLE_HIERARCHY] || 0;
  
  return userLevel >= requiredLevel;
}

/**
 * Hono middleware for organization security
 * Automatically validates access and sets RLS context
 */
export async function organizationSecurityMiddleware(
  c: Context,
  next: () => Promise<void>
) {
  try {
    // Get organization ID from query parameters
    const orgId = c.req.query("orgId");
    
    if (!orgId) {
      return c.json(
        { error: "Organization ID is required" },
        400
      );
    }

    // Get authenticated user from session
    const session = await auth();
    
    if (!session?.user?.id) {
      return c.json(
        { error: "Authentication required" },
        401
      );
    }

    // Validate organization access
    const orgContext = await validateOrganizationAccess(
      session.user.id,
      orgId
    );

    // Set RLS context for automatic tenant filtering
    await setOrganizationContext(orgContext.organizationId, orgContext.userId);

    // Store context in Hono context for use in route handlers
    c.set("orgContext", orgContext);

    await next();

    // Clean up context after request
    await clearOrganizationContext();

  } catch (error) {
    // Clean up context on error
    await clearOrganizationContext();

    if (error instanceof TenantSecurityError) {
      return c.json(
        { error: error.message, code: error.code },
        error.statusCode as ContentfulStatusCode
      );
    }

    console.error("Organization security middleware error:", error);
    return c.json(
      { error: "Internal security error" },
      500
    );
  }
}

/**
 * Get organization context from Hono context
 */
export function getOrganizationContext(c: Context): OrganizationContext {
  const context = c.get("orgContext");
  
  if (!context) {
    throw new TenantSecurityError(
      "Organization context not found",
      "CONTEXT_MISSING",
      500
    );
  }

  return context;
}

/**
 * Get organization context from Hono context (optional - returns null if not found)
 */
export function getOptionalOrganizationContext(c: Context): OrganizationContext | null {
  const context = c.get("orgContext");
  return context || null;
}

/**
 * Require specific permission for route access
 */
export function requirePermission(permission: string) {
  return async (c: Context, next: () => Promise<void>) => {
    const orgContext = getOrganizationContext(c);
    
    if (!hasPermission(orgContext, permission)) {
      return c.json(
        { 
          error: `Permission required: ${permission}`,
          code: "INSUFFICIENT_PERMISSIONS" 
        },
        403
      );
    }

    await next();
  };
}

/**
 * Optional permission check - allows access if no org context exists
 */
export function optionalPermission(permission: string) {
  return async (c: Context, next: () => Promise<void>) => {
    const orgContext = getOptionalOrganizationContext(c);
    
    // If no org context, allow access (for global operations)
    if (!orgContext) {
      await next();
      return;
    }
    
    if (!hasPermission(orgContext, permission)) {
      return c.json(
        { 
          error: `Permission required: ${permission}`,
          code: "INSUFFICIENT_PERMISSIONS" 
        },
        403
      );
    }

    await next();
  };
}

/**
 * Require minimum role level for route access
 */
export function requireRole(minRole: string) {
  return async (c: Context, next: () => Promise<void>) => {
    const orgContext = getOrganizationContext(c);
    
    if (!hasRoleLevel(orgContext.role, minRole)) {
      return c.json(
        { 
          error: `Minimum role required: ${minRole}`,
          code: "INSUFFICIENT_ROLE" 
        },
        403
      );
    }

    await next();
  };
}

/**
 * Require SUPERADMIN role for global/system routes
 * Use for /api/superadmin/* endpoints
 */
export function requireSuperadmin() {
  return async (c: Context, next: () => Promise<void>) => {
    // Get authenticated user from session
    const session = await auth();
    if (!session?.user?.id) {
      return c.json(
        { error: "Authentication required", code: "AUTH_REQUIRED" },
        401
      );
    }
    // Fetch user role from DB
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });
    if (user?.role !== "SUPERADMIN") {
      // Log unauthorized attempt for auditing
      console.warn(`Forbidden: User ${session.user.id} attempted superadmin access.`);
      return c.json(
        { error: "Forbidden: Superadmin access required", code: "SUPERADMIN_REQUIRED" },
        403
      );
    }
    // Attach user info for downstream handlers if needed
    c.set("superadmin", true);
    await next();
  };
}
// Export types and utilities
export { ROLE_HIERARCHY, ROLE_PERMISSIONS };
