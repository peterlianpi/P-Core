import { Hono } from "hono";
// Import Prisma client
import { OrgSchema, teamFormSchema } from "@/schemas";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { userDBPrismaClient } from "@/lib/prisma-client/user-prisma-client";

const org = new Hono()

  // ✅ Get Organizations

  .get("/org", async (c) => {
    try {
      // Fetch organizations linked to the user
      const organization = await userDBPrismaClient.organization.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          startedAt: true,
          logoImage: true,
        },
      });

      // Return the organizations associated with the user
      return c.json(organization);
    } catch (error) {
      console.error("Error fetching organizations:", error); // Log error
      return c.json({ error: "Failed to fetch organization by user ID" }, 500);
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
        const userOrganizations = await userDBPrismaClient.userOrganization.findMany({
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
        const result = await userDBPrismaClient.$transaction(async (prisma) => {
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
      const organizations = await userDBPrismaClient.organization.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          startedAt: true,
          logoImage: true,
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
        const userOrg = await userDBPrismaClient.userOrganization.findUnique({
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

        const organization = await userDBPrismaClient.organization.findUnique({
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
        const userOrg = await userDBPrismaClient.userOrganization.findUnique({
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

        const updatedOrg = await userDBPrismaClient.organization.update({
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
        const userOrg = await userDBPrismaClient.userOrganization.findUnique({
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

        await userDBPrismaClient.organization.delete({ where: { id: orgId } });
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
        const adminOrg = await userDBPrismaClient.userOrganization.findUnique({
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

        const user = await userDBPrismaClient.user.findUnique({ where: { id: userId } });
        const organization = await userDBPrismaClient.organization.findUnique({
          where: { id: orgId },
        });

        if (!user || !organization)
          return c.json({ error: "User or Organization not found" }, 404);

        await userDBPrismaClient.userOrganization.create({
          data: { userId, organizationId: orgId, role: "OWNER" }, // Default role for the added user
        });

        return c.json({ message: "User added to organization" });
      } catch {
        return c.json({ error: "Failed to add user to organization" }, 500);
      }
    }
  );

export default org;
