import { Hono } from "hono";
import { OrgSchema, teamFormSchema } from "@/lib/schemas";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { handleError } from "@/lib/error-handler";
import { 
  organizationSecurityMiddleware, 
  // getOrganizationContext,
  requirePermission 
} from "@/lib/security/tenant";

const org = new Hono()
  // Apply organization security middleware
  .use("*", organizationSecurityMiddleware)

  // ✅ Get Organizations (Superadmin only)
  .get("/org", requirePermission("read:organizations"), async (c) => {
    try {
      const organization = await prisma.organization.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          startedAt: true,
          logoImage: true,
          type: true,
        },
      });
      return c.json(organization);
    } catch (error) {
      return handleError(c, error, 500, 'DATABASE_ERROR');
    }
  })

  // ✅ Get Organizations by UserId (with RLS)
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        userId: z.string(),
      })
    ),
    requirePermission("read:user_organizations"),
    async (c) => {
      try {
        const { userId } = c.req.valid("query");

        const userOrganizations = await prisma.userOrganization.findMany({
          where: { userId, status: "ACTIVE" },
          select: {
            role: true,
            organization: {
              select: {
                id: true,
                name: true,
                description: true,
                startedAt: true,
                logoImage: true,
                type: true,
              },
            },
          },
        });

        if (!userOrganizations.length) {
          return c.json({ error: "No organizations found for the user" }, 404);
        }

        return c.json(userOrganizations);
      } catch (error) {
        return handleError(c, error, 500, 'DATABASE_ERROR');
      }
    }
  )

  // ✅ Create Organization with proper RLS
  .post(
    "/",
    zValidator(
      "query",
      z.object({
        userId: z.string(),
      })
    ),
    zValidator(
      "json",
      teamFormSchema.omit({
        id: true,
      })
    ),
    requirePermission("create:organizations"),
    async (c) => {
      try {
        const { userId } = c.req.valid("query");
        const body = c.req.valid("json");
        const parsed = OrgSchema.safeParse(body);

        if (!parsed.success) {
          return c.json({ error: "Invalid input data" }, 400);
        }

        // Transaction for atomic organization creation
        const result = await prisma.$transaction(async (tx) => {
          const organization = await tx.organization.create({
            data: {
              name: parsed.data.name,
              description: parsed.data.description,
              logoImage: parsed.data.logoImage,
              startedAt: parsed.data.startedAt,
              type: parsed.data.type,
              createdById: userId,
            },
          });

          await tx.userOrganization.create({
            data: {
              userId,
              organizationId: organization.id,
              role: "OWNER",
              status: "ACTIVE",
            },
          });

          return organization;
        });

        return c.json(result);
      } catch (error) {
        return handleError(c, error, 500, 'CREATION_ERROR');
      }
    }
  )

  // ✅ Get All Organizations with Details (Superadmin only)
  .get(
    "/org-details", 
    requirePermission("read:all_organizations"),
    async (c) => {
      try {
        const organizations = await prisma.organization.findMany({
          select: {
            id: true,
            name: true,
            description: true,
            startedAt: true,
            logoImage: true,
            type: true,
            createdAt: true,
            _count: {
              select: {
                users: true,
              },
            },
            users: {
              where: { status: "ACTIVE" },
              select: {
                role: true,
                user: {
                  select: { id: true, name: true, email: true, role: true },
                },
              },
            },
          },
        });

        return c.json(organizations);
      } catch (error) {
        return handleError(c, error, 500, 'DATABASE_ERROR');
      }
    }
  )

  // ✅ Get Single Organization by ID (with proper access control)
  .get(
    "/:id",
    zValidator(
      "query",
      z.object({
        userId: z.string(),
      })
    ),
    requirePermission("read:organization"),
    async (c) => {
      try {
        const orgId = c.req.param("id");
        const { userId } = c.req.valid("query");

        // Check if user is part of the organization
        const userOrg = await prisma.userOrganization.findUnique({
          where: {
            userId_organizationId: {
              userId,
              organizationId: orgId,
            },
          },
        });

        if (!userOrg) {
          return c.json({ error: "Access denied" }, 403);
        }

        const organization = await prisma.organization.findUnique({
          where: { id: orgId },
          include: {
            users: {
              where: { status: "ACTIVE" },
              include: {
                user: {
                  select: { id: true, name: true, email: true },
                },
              },
            },
          },
        });

        if (!organization) {
          return c.json({ error: "Organization not found" }, 404);
        }

        return c.json(organization);
      } catch (error) {
        return handleError(c, error, 500, 'DATABASE_ERROR');
      }
    }
  )

  // ✅ Update Organization (with proper permissions)
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    zValidator(
      "json",
      teamFormSchema.omit({
        id: true,
      }).partial()
    ),
    zValidator(
      "query",
      z.object({
        userId: z.string(),
      })
    ),
    requirePermission("update:organization"),
    async (c) => {
      try {
        const orgId = c.req.param("id");
        const { userId } = c.req.valid("query");
        const body = c.req.valid("json");
        const parsed = OrgSchema.partial().safeParse(body);

        if (!parsed.success) {
          return c.json({ error: "Invalid input data" }, 400);
        }

        // Check if user has permission to update
        const userOrg = await prisma.userOrganization.findUnique({
          where: {
            userId_organizationId: {
              userId,
              organizationId: orgId,
            },
          },
        });

        if (!userOrg || !["OWNER", "ADMIN"].includes(userOrg.role)) {
          return c.json({ error: "Insufficient permissions" }, 403);
        }

        const updatedOrg = await prisma.organization.update({
          where: { id: orgId },
          data: parsed.data,
        });

        return c.json(updatedOrg);
      } catch (error) {
        return handleError(c, error, 500, 'UPDATE_ERROR');
      }
    }
  )

  // ✅ Delete Organization (Owner only)
  .delete(
    "/:id",
    zValidator(
      "query",
      z.object({
        userId: z.string(),
      })
    ),
    requirePermission("delete:organization"),
    async (c) => {
      try {
        const orgId = c.req.param("id");
        const { userId } = c.req.valid("query");

        // Check if user is owner
        const userOrg = await prisma.userOrganization.findUnique({
          where: {
            userId_organizationId: {
              userId,
              organizationId: orgId,
            },
          },
        });

        if (!userOrg || userOrg.role !== "OWNER") {
          return c.json({ error: "Only organization owner can delete" }, 403);
        }

        await prisma.organization.delete({ where: { id: orgId } });
        return c.json({ message: "Organization deleted successfully" });
      } catch (error) {
        return handleError(c, error, 500, 'DELETION_ERROR');
      }
    }
  )

  // ✅ Update User Roles in Organization
  .patch(
    "/:id/update-roles",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    zValidator(
      "query",
      z.object({
        userId: z.string(),
      })
    ),
    zValidator(
      "json",
      z.object({
        updates: z.record(
          z.string(),
          z.enum([
            "OWNER",
            "ADMIN",
            "MANAGER", 
            "MEMBER",
            "ACCOUNTANT",
            "OFFICE_STAFF",
          ])
        ),
      })
    ),
    requirePermission("update:organization_roles"),
    async (c) => {
      const orgId = c.req.param("id");
      const { userId: adminUserId } = c.req.valid("query");
      const { updates } = c.req.valid("json");

      try {
        // Check admin permission
        const adminRecord = await prisma.userOrganization.findUnique({
          where: {
            userId_organizationId: {
              userId: adminUserId,
              organizationId: orgId,
            },
          },
        });

        if (!adminRecord || !["OWNER", "ADMIN"].includes(adminRecord.role)) {
          return c.json({ error: "Insufficient permissions to update roles" }, 403);
        }

        // Update roles in transaction
        await prisma.$transaction(async (tx) => {
          const updatePromises = Object.entries(updates).map(([userId, role]) =>
            tx.userOrganization.update({
              where: {
                userId_organizationId: {
                  userId,
                  organizationId: orgId,
                },
              },
              data: { role },
            })
          );

          await Promise.all(updatePromises);

          // Log the activity
          await tx.updateLog.create({
            data: {
              name: "Role Update",
              message: `Updated roles: ${Object.entries(updates)
                .map(([id, role]) => `${id} => ${role}`)
                .join(", ")}`,
              updatedBy: adminUserId,
              orgId: orgId,
              type: "INFO",
            },
          });
        });

        return c.json({ success: true, updated: Object.keys(updates).length });
      } catch (error) {
        return handleError(c, error, 500, 'ROLE_UPDATE_ERROR');
      }
    }
  )

  // ✅ Remove Member from Organization (Soft delete)
  .patch(
    "/:id/remove-member",
    zValidator(
      "param",
      z.object({
        id: z.string(),
      })
    ),
    zValidator(
      "query",
      z.object({
        adminUserId: z.string(),
      })
    ),
    zValidator(
      "json",
      z.object({
        userId: z.string(),
      })
    ),
    requirePermission("remove:organization_member"),
    async (c) => {
      try {
        const { id: orgId } = c.req.valid("param");
        const { userId } = c.req.valid("json");
        const { adminUserId } = c.req.valid("query");

        // Check if admin has permission
        const adminOrgRole = await prisma.userOrganization.findUnique({
          where: {
            userId_organizationId: {
              userId: adminUserId,
              organizationId: orgId,
            },
          },
          select: { role: true },
        });

        if (!adminOrgRole || !["OWNER", "ADMIN"].includes(adminOrgRole.role)) {
          return c.json({ error: "Insufficient permissions" }, 403);
        }

        // Check if user exists in organization
        const userOrg = await prisma.userOrganization.findUnique({
          where: {
            userId_organizationId: {
              userId,
              organizationId: orgId,
            },
          },
        });

        if (!userOrg) {
          return c.json({ error: "User not found in organization" }, 404);
        }

        // Soft remove member
        await prisma.userOrganization.update({
          where: {
            userId_organizationId: {
              userId,
              organizationId: orgId,
            },
          },
          data: {
            status: "REMOVED",
            removedAt: new Date(),
          },
        });

        return c.json({
          message: "Member removed successfully",
          userId,
          organizationId: orgId,
        });
      } catch (error) {
        return handleError(c, error, 500, 'MEMBER_REMOVAL_ERROR');
      }
    }
  );

export default org;
