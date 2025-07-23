/**
 * SECURITY ENHANCEMENT: Organization-level access control middleware
 * 
 * This module provides utilities to ensure users can only access data 
 * from organizations they belong to. This prevents data leakage between
 * different tenants in the multi-tenant system.
 * 
 * WHY THIS IS NEEDED:
 * - Prevents users from accessing other organizations' data by manipulating orgId
 * - Enforces tenant isolation at the application level
 * - Provides consistent security checks across all API routes
 * - Reduces risk of data breaches in multi-tenant environments
 */

import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { userDBPrismaClient } from "./prisma-client/user-prisma-client";

/**
 * Interface for organization access validation result
 */
interface OrgAccessResult {
  hasAccess: boolean;
  userId?: string;
  userRole?: string;
  orgRole?: string;
  error?: string;
}

/**
 * SECURITY CORE: Validate user access to specific organization
 * 
 * This function performs multi-layer security checks:
 * 1. Verifies user is authenticated
 * 2. Checks user exists and is active
 * 3. Validates user membership in requested organization
 * 4. Returns user roles for further authorization
 * 
 * @param orgId - Organization ID to validate access for
 * @returns Promise<OrgAccessResult> - Access validation result
 */
export async function validateOrgAccess(orgId: string): Promise<OrgAccessResult> {
  try {
    // Step 1: Get current user session
    const session = await auth();
    
    if (!session?.user?.id) {
      return {
        hasAccess: false,
        error: "Authentication required"
      };
    }

    // Step 2: Verify user exists and is active
    const user = await getUserById(session.user.id);
    
    if (!user || !user.isActive) {
      return {
        hasAccess: false,
        error: "User account inactive or not found"
      };
    }

    // Step 3: Check organization membership
    const userOrg = await userDBPrismaClient.userOrganization.findFirst({
      where: {
        userId: user.id,
        organizationId: orgId,
        // Only active memberships
        user: {
          isActive: true
        },
        organization: {
          isActive: true
        }
      },
      include: {
        organization: true
      }
    });

    if (!userOrg) {
      return {
        hasAccess: false,
        error: "Access denied: User not member of organization"
      };
    }

    // Step 4: Return successful validation with user context
    return {
      hasAccess: true,
      userId: user.id,
      userRole: user.role,
      orgRole: userOrg.role,
    };

  } catch (error) {
    console.error("Organization access validation error:", error);
    return {
      hasAccess: false,
      error: "Internal security validation error"
    };
  }
}

/**
 * SECURITY MIDDLEWARE: Express/Hono middleware for API route protection
 * 
 * This middleware automatically validates organization access for API routes
 * that include orgId in their parameters. It should be used on all endpoints
 * that handle organization-scoped data.
 * 
 * HOW IT WORKS:
 * - Extracts orgId from request parameters
 * - Validates user access using validateOrgAccess()
 * - Sets validated user context for downstream handlers
 * - Returns 403 Forbidden if access is denied
 * 
 * @param req - Request object (Hono Context)
 * @param next - Next middleware function
 */
export async function orgSecurityMiddleware(c: any, next: () => Promise<void>) {
  // Extract orgId from URL parameters
  const orgId = c.req.param('orgId') || c.req.query('orgId');
  
  if (!orgId) {
    return c.json({ 
      error: 'Organization ID required',
      code: 'ORG_ID_MISSING' 
    }, 400);
  }

  // Validate organization access
  const accessResult = await validateOrgAccess(orgId);
  
  if (!accessResult.hasAccess) {
    return c.json({ 
      error: accessResult.error || 'Access denied',
      code: 'ORG_ACCESS_DENIED' 
    }, 403);
  }

  // Store validated context for downstream middleware
  c.set('validatedUser', {
    userId: accessResult.userId,
    userRole: accessResult.userRole,
    orgRole: accessResult.orgRole,
    orgId: orgId
  });

  await next();
}

/**
 * SECURITY UTILITY: Check if user has specific role in organization
 * 
 * This function provides fine-grained role-based access control within
 * an organization. Use this for endpoints that require specific permissions.
 * 
 * @param orgId - Organization ID
 * @param requiredRole - Minimum required role (OWNER, ADMIN, ACCOUNTANT, OFFICE_STAFF, MEMBER)
 * @returns Promise<boolean> - Whether user has required role or higher
 */
export async function hasOrgRole(orgId: string, requiredRole: string): Promise<boolean> {
  const accessResult = await validateOrgAccess(orgId);
  
  if (!accessResult.hasAccess || !accessResult.orgRole) {
    return false;
  }

  // Define role hierarchy (higher roles include lower role permissions)
  const roleHierarchy = {
    'OWNER': 5,
    'ADMIN': 4,
    'ACCOUNTANT': 3,
    'OFFICE_STAFF': 2,
    'MEMBER': 1
  };

  const userRoleLevel = roleHierarchy[accessResult.orgRole as keyof typeof roleHierarchy] || 0;
  const requiredRoleLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

  return userRoleLevel >= requiredRoleLevel;
}

/**
 * SECURITY UTILITY: Add organization filter to Prisma queries
 * 
 * This utility ensures all database queries are automatically scoped to
 * the user's accessible organizations. This prevents data leakage through
 * direct database access.
 * 
 * USAGE:
 * const students = await prisma.student.findMany({
 *   where: {
 *     ...addOrgFilter(orgId),
 *     // other conditions
 *   }
 * });
 * 
 * @param orgId - Organization ID to filter by
 * @returns Prisma where clause object
 */
export function addOrgFilter(orgId: string) {
  return {
    orgId: orgId,
    // Add soft delete filter
    deletedAt: null
  };
}

/**
 * SECURITY DECORATOR: Protect service methods with org access validation
 * 
 * This decorator can be used to automatically validate organization access
 * for service methods that operate on organization data.
 * 
 * @param target - Class instance
 * @param propertyName - Method name
 * @param descriptor - Method descriptor
 */
export function requireOrgAccess(orgIdParamIndex: number = 0) {
  return function (target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const orgId = args[orgIdParamIndex];
      
      if (!orgId) {
        throw new Error('Organization ID required for this operation');
      }

      const accessResult = await validateOrgAccess(orgId);
      
      if (!accessResult.hasAccess) {
        throw new Error(`Access denied: ${accessResult.error}`);
      }

      return method.apply(this, args);
    };

    return descriptor;
  };
}
