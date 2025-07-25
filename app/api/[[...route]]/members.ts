// Enhanced Members API Routes
// Church member management with family relationships and role tracking
// Integrates with RLS-based security for automatic tenant isolation

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma } from "@/lib/db/client";
import { getOrganizationContext, requirePermission } from "@/lib/security/tenant";
import { ApiError } from "@/lib/utils/api-errors";
import { Prisma } from "@prisma/client";

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
  // Middleware is now applied in the main router, no need for .use() here.

  .get(
    "/",
    zValidator("query", z.object({
      take: z.string().optional(),
      skip: z.string().optional(),
      searchQuery: z.string().optional(),
      homeId: z.string().optional(),
      vengId: z.string().optional(),
      khawkId: z.string().optional(),
      roleId: z.string().optional(),
      isActive: z.string().optional(),
    })),
    requirePermission("read:members"),
    async (c) => {
      const orgContext = getOrganizationContext(c);
      const { take = "20", skip = "0", searchQuery, homeId, vengId, khawkId, roleId, isActive = "true" } = c.req.valid("query");

      const where: Prisma.MemberWhereInput = { orgId: orgContext.organizationId }; // Use specific Prisma type
      
      if (searchQuery) {
        where.OR = [
          { name: { contains: searchQuery, mode: "insensitive" } },
          { email: { contains: searchQuery, mode: "insensitive" } },
          { phone: { contains: searchQuery, mode: "insensitive" } },
        ];
      }

      if (homeId) where.homeId = homeId;
      if (vengId) {
        where.home = { vengId };
      }
      if (khawkId) {
        where.home = { veng: { khawkId } };
      }

      if (roleId) {
        where.roles = {
          some: { roleId, endedAt: null }
        };
      }

      const activeFilter = isActive === "true";
      where.isActive = activeFilter;

      const [members, totalCount, activeCount, inactiveCount] = await Promise.all([
        prisma.member.findMany({
          where,
          take: parseInt(take),
          skip: parseInt(skip),
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
    }
  )

  .post(
    "/",
    zValidator("json", MemberSchema.omit({ roleIds: true, familyRelationships: true })),
    requirePermission("write:members"),
    async (c) => {
      const orgContext = getOrganizationContext(c);
      const memberData = c.req.valid("json");

      // Simplified validation checks that throw ApiError
      if (memberData.email) {
          const existing = await prisma.member.findFirst({ where: { email: memberData.email, orgId: orgContext.organizationId } });
          if (existing) throw new ApiError("Email already exists", 409);
      }

      if (memberData.phone) {
          const existing = await prisma.member.findFirst({ where: { phone: memberData.phone, orgId: orgContext.organizationId } });
          if (existing) throw new ApiError("Phone already exists", 409);
      }

      // Validate home exists
      if (memberData.homeId) {
        const home = await prisma.home.findUnique({
          where: { id: memberData.homeId }
        });
        if (!home) throw new ApiError("Invalid home", 400);
      }

      // Validate spouse exists and is not already married
      if (memberData.spouseId) {
        const spouse = await prisma.member.findUnique({
          where: { id: memberData.spouseId }
        });
        if (!spouse) throw new ApiError("Invalid spouse", 400);
        if (spouse.spouseId && spouse.spouseId !== memberData.spouseId) {
          throw new ApiError("Spouse is already married", 400);
        }
      }

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
    }
  )

  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    requirePermission("read:members"),
    async (c) => {
      const { id } = c.req.valid("param");
      const orgContext = getOrganizationContext(c);
      
      const member = await prisma.member.findUnique({
        where: { id, orgId: orgContext.organizationId },
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

      if (!member) throw new ApiError("Member not found", 404);
      return c.json(member);
    }
  )

  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", MemberSchema.partial()),
    requirePermission("write:members"),
    async (c) => {
      const { id } = c.req.valid("param");
      const updateData = c.req.valid("json");
      const orgContext = getOrganizationContext(c);

      const existingMember = await prisma.member.findUnique({ where: { id, orgId: orgContext.organizationId } });
      if (!existingMember) throw new ApiError("Member not found", 404);
      
      // Simplified uniqueness validation for email/phone
      if (updateData.email && updateData.email !== existingMember.email) {
        const emailExists = await prisma.member.findFirst({
          where: { 
            email: updateData.email, 
            id: { not: id },
            orgId: orgContext.organizationId,
            isActive: true 
          }
        });
        if (emailExists) throw new ApiError("Email already exists", 409);
      }

      if (updateData.phone && updateData.phone !== existingMember.phone) {
        const phoneExists = await prisma.member.findFirst({
          where: { 
            phone: updateData.phone, 
            id: { not: id },
            orgId: orgContext.organizationId,
            isActive: true 
          }
        });
        if (phoneExists) throw new ApiError("Phone already exists", 409);
      }

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
    }
  )

  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    requirePermission("delete:members"),
    async (c) => {
      const { id } = c.req.valid("param");
      const orgContext = getOrganizationContext(c);

      const member = await prisma.member.findUnique({ where: { id, orgId: orgContext.organizationId } });
      if (!member) throw new ApiError("Member not found", 404);

      // Soft delete logic
      await prisma.member.update({
        where: { id },
        data: { isActive: false, isDeleted: true }
      });

      // End all role assignments
      await prisma.memberRoleAssignment.updateMany({
        where: { 
          memberId: id,
          orgId: orgContext.organizationId,
          endedAt: null 
        },
        data: { endedAt: new Date() }
      });

      return c.json({ message: "Member archived successfully" });
    }
  )

  .post(
    "/:id/roles",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", z.object({
      roleId: z.string(),
      startedAt: z.string().optional(),
    })),
    requirePermission("write:members"),
    async (c) => {
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

      if (existingAssignment) throw new ApiError("Role already assigned", 409);

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
    }
  )

  .delete(
    "/:id/roles/:roleId",
    zValidator("param", z.object({ 
      id: z.string(),
      roleId: z.string() 
    })),
    requirePermission("write:members"),
    async (c) => {
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

      if (assignment.count === 0) throw new ApiError("Role assignment not found", 404);

      return c.json({ message: "Role removed successfully" });
    }
  )

  .get(
    "/stats",
    requirePermission("read:members"),
    async (c) => {
      const orgContext = getOrganizationContext(c);
      const stats = await Promise.all([
        // Basic counts
        prisma.member.count({ where: { isActive: true, orgId: orgContext.organizationId } }),
        prisma.member.count({ where: { isActive: false, orgId: orgContext.organizationId } }),
        
        // Gender distribution
        prisma.member.groupBy({
          by: ['gender'],
          _count: true,
          where: { isActive: true, orgId: orgContext.organizationId }
        }),
        
        // Age groups (approximate)
        prisma.member.count({
          where: {
            isActive: true,
            orgId: orgContext.organizationId,
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
            orgId: orgContext.organizationId,
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
    }
  );

export default members;
