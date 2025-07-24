// Enhanced Members API Routes
// Church member management with family relationships and role tracking
// Integrates with RLS-based security for automatic tenant isolation

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { 
  organizationSecurityMiddleware, 
  getOrganizationContext,
  requirePermission 
} from "@/lib/security/tenant";

// Member schemas
const MemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthDate: z.string().optional().nullable(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  bloodType: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  fbLink: z.string().url().optional().nullable(),
  homeId: z.string().optional().nullable(),
  spouseId: z.string().optional().nullable(),
  roleIds: z.array(z.string()).optional(),
  familyRelationships: z.array(z.object({
    relatedMemberId: z.string(),
    relationshipTypeId: z.string(),
  })).optional(),
});

const members = new Hono()
  // Apply organization security middleware to all routes
  .use("*", organizationSecurityMiddleware)

  // GET /api/members - Get all members with filtering
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        take: z.string().optional(),
        skip: z.string().optional(),
        searchQuery: z.string().optional(),
        homeId: z.string().optional(),
        vengId: z.string().optional(),
        khawkId: z.string().optional(),
        roleId: z.string().optional(),
        isActive: z.string().optional(),
      })
    ),
    requirePermission("read:members"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const { 
          take = "20", 
          skip = "0", 
          searchQuery, 
          homeId, 
          vengId, 
          khawkId, 
          roleId,
          isActive = "true"
        } = c.req.valid("query");

        const takeNumber = parseInt(take);
        const skipNumber = parseInt(skip);
        const activeFilter = isActive === "true";

        // Build where clause with filters
        const where: any = {
          isActive: activeFilter,
        };

        // Add search filter
        if (searchQuery) {
          where.OR = [
            { name: { contains: searchQuery, mode: "insensitive" } },
            { email: { contains: searchQuery, mode: "insensitive" } },
            { phone: { contains: searchQuery, mode: "insensitive" } },
          ];
        }

        // Add location filters
        if (homeId) where.homeId = homeId;
        if (vengId) {
          where.home = { vengId };
        }
        if (khawkId) {
          where.home = { veng: { khawkId } };
        }

        // Add role filter
        if (roleId) {
          where.roles = {
            some: { roleId, endedAt: null }
          };
        }

        // Get members with related data
        const [members, totalCount, activeCount, inactiveCount] = await Promise.all([
          prisma.member.findMany({
            where,
            take: takeNumber,
            skip: skipNumber,
            orderBy: { name: "asc" },
            include: {
              home: {
                include: {
                  veng: {
                    include: {
                      khawk: true
                    }
                  }
                }
              },
              spouse: {
                select: { id: true, name: true }
              },
              roles: {
                where: { endedAt: null },
                include: {
                  role: {
                    select: { id: true, name: true }
                  }
                }
              },
              familyFrom: {
                include: {
                  to: { select: { id: true, name: true } },
                  type: { select: { id: true, name: true } }
                }
              },
              familyTo: {
                include: {
                  from: { select: { id: true, name: true } },
                  type: { select: { id: true, name: true } }
                }
              }
            }
          }),
          prisma.member.count({ where }),
          prisma.member.count({ where: { isActive: true } }),
          prisma.member.count({ where: { isActive: false } })
        ]);

        // Get statistics
        const homeStats = await prisma.member.groupBy({
          by: ['homeId'],
          _count: true,
          where: { isActive: true, homeId: { not: null } }
        });

        return c.json({
          data: members,
          totalItems: totalCount,
          active: activeCount,
          inactive: inactiveCount,
          homeStats: homeStats.reduce((acc, stat) => {
            if (stat.homeId) {
              acc[stat.homeId] = stat._count;
            }
            return acc;
          }, {} as Record<string, number>)
        });

      } catch (error) {
        console.error("Get members error:", error);
        return c.json({ error: "Failed to fetch members" }, 500);
      }
    }
  )

  // POST /api/members - Create new member
  .post(
    "/",
    zValidator("json", MemberSchema.omit({ roleIds: true, familyRelationships: true })),
    requirePermission("write:members"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const memberData = c.req.valid("json");

        // Check for existing email/phone
        if (memberData.email) {
          const existingEmail = await prisma.member.findFirst({
            where: { email: memberData.email, isActive: true }
          });
          if (existingEmail) {
            return c.json({ error: "Email already exists", code: "EMAIL_ALREADY_EXISTS" }, 409);
          }
        }

        if (memberData.phone) {
          const existingPhone = await prisma.member.findFirst({
            where: { phone: memberData.phone, isActive: true }
          });
          if (existingPhone) {
            return c.json({ error: "Phone already exists", code: "PHONE_ALREADY_EXISTS" }, 409);
          }
        }

        // Validate home exists
        if (memberData.homeId) {
          const home = await prisma.home.findUnique({
            where: { id: memberData.homeId }
          });
          if (!home) {
            return c.json({ error: "Invalid home", code: "INVALID_HOME" }, 400);
          }
        }

        // Validate spouse exists and is not already married
        if (memberData.spouseId) {
          const spouse = await prisma.member.findUnique({
            where: { id: memberData.spouseId }
          });
          if (!spouse) {
            return c.json({ error: "Invalid spouse", code: "INVALID_SPOUSE" }, 400);
          }
          if (spouse.spouseId && spouse.spouseId !== memberData.spouseId) {
            return c.json({ error: "Spouse is already married", code: "SPOUSE_ALREADY_MARRIED" }, 400);
          }
        }

        // Create member
        const member = await prisma.member.create({
          data: {
            ...memberData,
            birthDate: memberData.birthDate ? new Date(memberData.birthDate) : null,
            orgId: orgContext.organizationId,
          },
          include: {
            home: {
              include: {
                veng: {
                  include: { khawk: true }
                }
              }
            },
            spouse: {
              select: { id: true, name: true }
            },
            roles: {
              include: {
                role: { select: { id: true, name: true } }
              }
            }
          }
        });

        // Update spouse relationship if specified
        if (memberData.spouseId) {
          await prisma.member.update({
            where: { id: memberData.spouseId },
            data: { spouseId: member.id }
          });
        }

        return c.json(member, 201);

      } catch (error) {
        console.error("Create member error:", error);
        return c.json({ error: "Failed to create member" }, 500);
      }
    }
  )

  // GET /api/members/:id - Get specific member
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    requirePermission("read:members"),
    async (c) => {
      try {
        const { id } = c.req.valid("param");

        const member = await prisma.member.findUnique({
          where: { id },
          include: {
            home: {
              include: {
                veng: {
                  include: { khawk: true }
                }
              }
            },
            spouse: {
              select: { id: true, name: true, image: true }
            },
            roles: {
              where: { endedAt: null },
              include: {
                role: {
                  select: { id: true, name: true, description: true }
                }
              }
            },
            familyFrom: {
              include: {
                to: { 
                  select: { id: true, name: true, image: true, birthDate: true }
                },
                type: { 
                  select: { id: true, name: true, description: true }
                }
              }
            },
            familyTo: {
              include: {
                from: { 
                  select: { id: true, name: true, image: true, birthDate: true }
                },
                type: { 
                  select: { id: true, name: true, description: true }
                }
              }
            },
            user: {
              select: { id: true, email: true, role: true }
            }
          }
        });

        if (!member) {
          return c.json({ error: "Member not found", code: "MEMBER_NOT_FOUND" }, 404);
        }

        return c.json(member);

      } catch (error) {
        console.error("Get member error:", error);
        return c.json({ error: "Failed to fetch member" }, 500);
      }
    }
  )

  // PATCH /api/members/:id - Update member
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", MemberSchema.partial()),
    requirePermission("write:members"),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const updateData = c.req.valid("json");

        // Check member exists
        const existingMember = await prisma.member.findUnique({
          where: { id }
        });

        if (!existingMember) {
          return c.json({ error: "Member not found", code: "MEMBER_NOT_FOUND" }, 404);
        }

        // Validate email/phone uniqueness if being updated
        if (updateData.email && updateData.email !== existingMember.email) {
          const emailExists = await prisma.member.findFirst({
            where: { 
              email: updateData.email, 
              id: { not: id },
              isActive: true 
            }
          });
          if (emailExists) {
            return c.json({ error: "Email already exists", code: "EMAIL_ALREADY_EXISTS" }, 409);
          }
        }

        if (updateData.phone && updateData.phone !== existingMember.phone) {
          const phoneExists = await prisma.member.findFirst({
            where: { 
              phone: updateData.phone, 
              id: { not: id },
              isActive: true 
            }
          });
          if (phoneExists) {
            return c.json({ error: "Phone already exists", code: "PHONE_ALREADY_EXISTS" }, 409);
          }
        }

        // Update member
        const updatedMember = await prisma.member.update({
          where: { id },
          data: {
            ...updateData,
            birthDate: updateData.birthDate ? new Date(updateData.birthDate) : undefined,
          },
          include: {
            home: {
              include: {
                veng: {
                  include: { khawk: true }
                }
              }
            },
            spouse: {
              select: { id: true, name: true }
            },
            roles: {
              include: {
                role: { select: { id: true, name: true } }
              }
            }
          }
        });

        return c.json(updatedMember);

      } catch (error) {
        console.error("Update member error:", error);
        return c.json({ error: "Failed to update member" }, 500);
      }
    }
  )

  // DELETE /api/members/:id - Soft delete member
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    requirePermission("delete:members"),
    async (c) => {
      try {
        const { id } = c.req.valid("param");

        // Check member exists
        const member = await prisma.member.findUnique({
          where: { id }
        });

        if (!member) {
          return c.json({ error: "Member not found", code: "MEMBER_NOT_FOUND" }, 404);
        }

        // Soft delete by setting isActive to false
        await prisma.member.update({
          where: { id },
          data: { 
            isActive: false,
            // Clear sensitive data
            email: null,
            phone: null,
            spouseId: null,
          }
        });

        // End all role assignments
        await prisma.memberRoleAssignment.updateMany({
          where: { 
            memberId: id,
            endedAt: null 
          },
          data: { endedAt: new Date() }
        });

        return c.json({ message: "Member deleted successfully" });

      } catch (error) {
        console.error("Delete member error:", error);
        return c.json({ error: "Failed to delete member" }, 500);
      }
    }
  )

  // POST /api/members/:id/roles - Assign role to member
  .post(
    "/:id/roles",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", z.object({
      roleId: z.string(),
      startedAt: z.string().optional(),
    })),
    requirePermission("write:members"),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const { roleId, startedAt } = c.req.valid("json");
        const orgContext = getOrganizationContext(c);

        // Check if role assignment already exists
        const existingAssignment = await prisma.memberRoleAssignment.findUnique({
          where: {
            memberId_roleId_orgId: {
              memberId: id,
              roleId,
              orgId: orgContext.organizationId
            }
          }
        });

        if (existingAssignment) {
          return c.json({ error: "Role already assigned", code: "ROLE_ALREADY_ASSIGNED" }, 409);
        }

        // Create role assignment
        const assignment = await prisma.memberRoleAssignment.create({
          data: {
            memberId: id,
            roleId,
            orgId: orgContext.organizationId,
            startedAt: startedAt ? new Date(startedAt) : new Date(),
          },
          include: {
            role: {
              select: { id: true, name: true, description: true }
            }
          }
        });

        return c.json(assignment, 201);

      } catch (error) {
        console.error("Assign role error:", error);
        return c.json({ error: "Failed to assign role" }, 500);
      }
    }
  )

  // DELETE /api/members/:id/roles/:roleId - Remove role from member
  .delete(
    "/:id/roles/:roleId",
    zValidator("param", z.object({ 
      id: z.string(),
      roleId: z.string() 
    })),
    requirePermission("write:members"),
    async (c) => {
      try {
        const { id, roleId } = c.req.valid("param");
        const orgContext = getOrganizationContext(c);

        // End the role assignment
        const assignment = await prisma.memberRoleAssignment.updateMany({
          where: {
            memberId: id,
            roleId,
            orgId: orgContext.organizationId,
            endedAt: null
          },
          data: {
            endedAt: new Date()
          }
        });

        if (assignment.count === 0) {
          return c.json({ error: "Role assignment not found", code: "ASSIGNMENT_NOT_FOUND" }, 404);
        }

        return c.json({ message: "Role removed successfully" });

      } catch (error) {
        console.error("Remove role error:", error);
        return c.json({ error: "Failed to remove role" }, 500);
      }
    }
  )

  // GET /api/members/stats - Get member statistics
  .get(
    "/stats",
    requirePermission("read:members"),
    async (c) => {
      try {
        const stats = await Promise.all([
          // Basic counts
          prisma.member.count({ where: { isActive: true } }),
          prisma.member.count({ where: { isActive: false } }),
          
          // Gender distribution
          prisma.member.groupBy({
            by: ['gender'],
            _count: true,
            where: { isActive: true }
          }),
          
          // Age groups (approximate)
          prisma.member.count({
            where: {
              isActive: true,
              birthDate: {
                gte: new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)
              }
            }
          }),
          
          // Home distribution
          prisma.member.groupBy({
            by: ['homeId'],
            _count: true,
            where: { 
              isActive: true,
              homeId: { not: null }
            }
          })
        ]);

        const [activeCount, inactiveCount, genderStats, youthCount, homeStats] = stats;

        return c.json({
          total: activeCount + inactiveCount,
          active: activeCount,
          inactive: inactiveCount,
          youth: youthCount,
          adults: activeCount - youthCount,
          gender: genderStats.reduce((acc, stat) => {
            acc[stat.gender || 'UNKNOWN'] = stat._count;
            return acc;
          }, {} as Record<string, number>),
          byHome: homeStats.reduce((acc, stat) => {
            if (stat.homeId) {
              acc[stat.homeId] = stat._count;
            }
            return acc;
          }, {} as Record<string, number>)
        });

      } catch (error) {
        console.error("Get member stats error:", error);
        return c.json({ error: "Failed to fetch member statistics" }, 500);
      }
    }
  );

export default members;
