import { Hono } from "hono";
import { OrgSchema, teamFormSchema } from "@/lib/schemas";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { handleError } from "@/lib/error-handler";
import { 
  organizationSecurityMiddleware, 
  getOrganizationContext,
  requirePermission 
} from "@/lib/security/tenant";

const org = new Hono()
  // Apply organization security middleware
  .use("*", organizationSecurityMiddleware)

  // ✅ Get Organizations
  .get("/org", requirePermission("read:organizations"), async (c) => {
    try {
      // Fetch organizations linked to the user
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

      // Return the organizations associated with the user
      return c.json(organization);
    } catch (error) {
      return handleError(c, error, 500, 'DATABASE_ERROR');
    }
  })

  // ✅ Get Organization by UserId
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        userId: z.string(), // Changed to required field
      })
    ),
    async (c) => {
      try {
        const { userId } = c.req.valid("query");

        // Fetch organizations linked to the user  
        const userOrganizations = await db.userOrganization.findMany({
            where: { userId },
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
              }, // Include organization details
            },
          });

        if (!userOrganizations.length)
          return c.json({ error: "No organizations found for the user" }, 404);

        // Return the organizations associated with the user
        return c.json(userOrganizations);
      } catch (error) {
        console.error("Error fetching organizations:", error); // Log error
        return c.json(
          { error: "Failed to fetch organization by user ID" },
          500
        );
      }
    }
  )

  // ✅ Create Organization and link to user
  .post(
    "/",
    zValidator(
      "query",
      z.object({
        userId: z.string(), // The user ID to associate with the new organization
      })
    ),
    zValidator(
      "json",
      teamFormSchema.omit({
        id: true,
      })
    ),
    async (c) => {
      try {
        const { userId } = c.req.valid("query");
        const body = c.req.valid("json");
        const parsed = OrgSchema.safeParse(body);

        if (!parsed.success) return c.json({ error: "Invalid input" }, 400);

        // Start a transaction to create both the organization and the UserOrganization relation
        const result = await db.$transaction(async (prisma) => {
          // Create the organization
          const organization = await prisma.organization.create({
            data: {
              name: parsed.data.name, // Ensure you're passing the necessary fields
              description: parsed.data.description,
              logoImage: parsed.data.logoImage,
              startedAt: parsed.data.startedAt,
              createdBy: {
                connect: {
                  id: userId, // Associate the organization with the user
                },
              },
              type: parsed.data.type,
            },
          });

          // Create the relation between the user and the organization
          await prisma.userOrganization.create({
            data: {
              userId, // Associate the user with the organization
              organizationId: organization.id,
              role: "OWNER", // You can customize the role as needed
            },
          });

          return organization; // Return the newly created organization
        });

        return c.json(result); // Return the created organization and its link to the user
      } catch (err) {
        console.error(err); // Optional: log the error
        return c.json({ error: "Failed to create organization" }, 500);
      }
    }
  )

  // ✅ Get All Organizations with Counts Only
  .get("/org-details", async (c) => {
    try {
      const organizations = await db.organization.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          startedAt: true,
          logoImage: true,
          type: true,
          _count: {
            select: {},
          },
          UserOrganization: {
            select: {
              user: {
                select: { id: true, name: true, email: true, role: true },
              },
            },
          },
        },
      });

      return c.json(organizations);
    } catch {
      return c.json({ error: "Failed to fetch organizations" }, 500);
    }
  })

  // ✅ Get Single Organization by ID
  .get(
    "/:id",
    zValidator(
      "query",
      z.object({
        userId: z.string(), // The user ID to associate with the new organization
      })
    ),
    async (c) => {
      try {
        const orgId = c.req.param("id");
        const { userId } = c.req.valid("query"); // You need to extract userId from query

        // Check if user is part of the organization
        const userOrg = await prisma.userOrganization.findUnique({
          where: {
            userId_organizationId: {
              userId,
              organizationId: orgId,
            },
          },
        });

        if (!userOrg)
          return c.json(
            { error: "User is not part of this organization" },
            403
          );

        const organization = await prisma.organization.findUnique({
          where: { id: orgId },
        });

        if (!organization)
          return c.json({ error: "Organization not found" }, 404);

        return c.json(organization);
      } catch {
        return c.json({ error: "Failed to fetch organization" }, 500);
      }
    }
  )

  // ✅ Update Organization
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
      })
    ),
    zValidator(
      "query",
      z.object({
        userId: z.string(),
      })
    ),
    async (c) => {
      try {
        const orgId = c.req.param("id");
        const { userId } = c.req.valid("query"); // Extract userId from query
        const body = c.req.valid("json");
        const parsed = OrgSchema.partial().safeParse(body);

        if (!parsed.success) return c.json({ error: "Invalid input" }, 400);

        // Check if the user is part of the organization
        const userOrg = await prisma.userOrganization.findUnique({
          where: {
            userId_organizationId: {
              userId,
              organizationId: orgId,
            },
          },
        });

        if (!userOrg)
          return c.json(
            { error: "User is not part of this organization" },
            403
          );

        const updatedOrg = await prisma.organization.update({
          where: { id: orgId },
          data: parsed.data,
        });

        return c.json(updatedOrg);
      } catch {
        return c.json({ error: "Failed to update organization" }, 500);
      }
    }
  )

  // ✅ Delete Organization
  .delete(
    "/:id",
    zValidator(
      "query",
      z.object({
        userId: z.string(), // The user ID to associate with the new organization
      })
    ),
    async (c) => {
      try {
        const orgId = c.req.param("id");
        const { userId } = c.req.valid("query"); // Extract userId from query

        // Check if the user is part of the organization
        const userOrg = await prisma.userOrganization.findUnique({
          where: {
            userId_organizationId: {
              userId,
              organizationId: orgId,
            },
          },
        });

        if (!userOrg)
          return c.json(
            { error: "User is not part of this organization" },
            403
          );

        await prisma.organization.delete({ where: { id: orgId } });
        return c.json({ message: "Organization deleted" });
      } catch {
        return c.json({ error: "Failed to delete organization" }, 500);
      }
    }
  )

  // ✅ Add User to Organization
  .post(
    "/:id/add-user",
    zValidator(
      "query",
      z.object({
        userId: z.string(), // The user ID to associate with the new organization
        adminUserId: z.string(), // The admin user ID making the request
      })
    ),
    async (c) => {
      try {
        const orgId = c.req.param("id");

        const { userId, adminUserId } = c.req.valid("query"); // Assuming the user making the request is an admin or authorized user

        // Check if the admin user is part of the organization
        const adminOrg = await prisma.userOrganization.findUnique({
          where: {
            userId_organizationId: {
              userId: adminUserId,
              organizationId: orgId,
            },
          },
        });

        if (!adminOrg || adminOrg.role !== "OWNER")
          return c.json(
            { error: "User is not authorized to add members" },
            403
          );

        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
        const organization = await prisma.organization.findUnique({
          where: { id: orgId },
        });

        if (!user || !organization)
          return c.json({ error: "User or Organization not found" }, 404);

        await prisma.userOrganization.create({
          data: { userId, organizationId: orgId, role: "OWNER" }, // Default role for the added user
        });

        return c.json({ message: "User added to organization" });
      } catch {
        return c.json({ error: "Failed to add user to organization" }, 500);
      }
    }
  )

  .patch(
    "/:id/update-roles",
    zValidator(
      "param",
      z.object({
        id: z.string(), // organizationId
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
            "MEMBER",
            "ACCOUNTANT",
            "OFFICE_STAFF",
            "ADMIN",
          ])
        ),
      })
    ),
    async (c) => {
      const orgId = c.req.param("id");
      const { userId: adminUserId } = c.req.valid("query");
      const { updates } = c.req.valid("json");

      // Check permission
      const adminRecord = await prisma.userOrganization.findUnique({
        where: {
          userId_organizationId: {
            userId: adminUserId,
            organizationId: orgId,
          },
        },
      });

      if (
        !adminRecord ||
        (adminRecord.role !== "OWNER" && adminRecord.role !== "ADMIN")
      ) {
        return c.json({ error: "You are not authorized to update roles" }, 403);
      }

      // Loop and update roles
      const updatePromises = Object.entries(updates).map(([userId, role]) =>
        prisma.userOrganization.update({
          where: {
            userId_organizationId: {
              userId,
              organizationId: orgId,
            },
          },
          data: {
            role: role,
          },
        })
      );

      try {
        await Promise.all(updatePromises);
        // Log to UpdateLog table
        await prisma.updateLog.create({
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

        return c.json({ success: true, updated: Object.keys(updates).length });
      } catch (error) {
        console.error("Error updating roles:", error);
        return c.json({ error: "Failed to update roles" }, 500);
      }
    }
  )

  // PATCH /api/org/remove-member
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
    async (c) => {
      try {
        const { id: orgId } = c.req.valid("param");
        const { userId } = c.req.valid("json");
        const { adminUserId } = c.req.valid("query");

        // 🔐 Step 1: Check if adminUserId is OWNER of org
        const adminOrgRole =
          await prisma.userOrganization.findUnique({
            where: {
              userId_organizationId: {
                userId: adminUserId,
                organizationId: orgId,
              },
            },
            select: { role: true },
          });

        if (!adminOrgRole || adminOrgRole.role !== "OWNER") {
          return c.json(
            { error: "Only organization OWNER can remove members." },
            403
          );
        }

        // ✅ Step 2: Check if user is in organization
        const userOrg = await prisma.userOrganization.findUnique({
          where: {
            userId_organizationId: {
              userId,
              organizationId: orgId,
            },
          },
        });

        if (!userOrg) {
          return c.json(
            { error: "User is not part of this organization" },
            404
          );
        }

        // ✅ Step 3: Soft-remove member
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
      } catch {
        return c.json({ error: "Failed to remove member" }, 500);
      }
    }
  );

export default org;
