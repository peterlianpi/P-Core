import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { prisma, UserRole } from "@/lib/db/client";
import { handleError } from "@/lib/error-handler";
import type { Context } from "hono";
// import type { User, UserRole } from "@prisma/client";
import { getUser } from "@/lib/types/hono";

const superadmin = new Hono()
  // Middleware to check superadmin role
  .use("*", async (c: Context, next) => {
    const user = getUser(c);
    if (!user || user.role !== "SUPERADMIN") {
      return c.json({ error: "Superadmin access required" }, 403);
    }
    await next();
  })

  // ✅ Get System Overview Statistics
  .get("/stats", async (c) => {
    try {
      const [
        totalUsers,
        totalOrganizations,
        activeOrganizations,
        totalStudents,
        totalMembers,
        totalCourses,
        totalBooks,
        totalRevenue,
        recentSignups,
        recentActivity
      ] = await Promise.all([
        // Users count
        prisma.user.count(),
        
        // Organizations count
        prisma.organization.count(),
        
        // Active organizations (with recent activity)
        prisma.organization.count({
          where: {
            updatedAt: {
              gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
            }
          }
        }),
        
        // Total students across all orgs
        prisma.student.count({ where: { isActive: true } }),
        
        // Total members across all orgs  
        prisma.member.count({ where: { isActive: true } }),
        
        // Total courses across all orgs
        prisma.course.count({ where: { isActive: true } }),
        
        // Total books across all orgs
        prisma.book.count({ where: { isActive: true } }),
        
        // Total revenue across all orgs
        prisma.purchase.aggregate({
          _sum: { amount: true },
          where: { status: "COMPLETED" }
        }),
        
        // Recent user signups (last 7 days)
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          }
        }),
        
        // Recent system activity
        prisma.updateLog.findMany({
          take: 10,
          orderBy: { createdAt: "desc" },
          include: {
            organization: { select: { name: true } }
          }
        })
      ]);

      // Calculate growth rates
      const [usersLastMonth, orgsLastMonth] = await Promise.all([
        prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
              lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          }
        }),
        prisma.organization.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
              lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            }
          }
        })
      ]);

      const userGrowthRate = usersLastMonth > 0 
        ? ((totalUsers - usersLastMonth) / usersLastMonth) * 100 
        : totalUsers > 0 ? 100 : 0;
        
      const orgGrowthRate = orgsLastMonth > 0 
        ? ((totalOrganizations - orgsLastMonth) / orgsLastMonth) * 100 
        : totalOrganizations > 0 ? 100 : 0;

      return c.json({
        overview: {
          totalUsers,
          totalOrganizations,
          activeOrganizations,
          totalStudents,
          totalMembers,
          totalCourses,
          totalBooks,
          totalRevenue: Number(totalRevenue._sum.amount) || 0,
          recentSignups,
          userGrowthRate: Math.round(userGrowthRate * 100) / 100,
          orgGrowthRate: Math.round(orgGrowthRate * 100) / 100
        },
        recentActivity
      });
    } catch (error) {
      return handleError(c, error, 500, 'STATS_ERROR');
    }
  })

  // ✅ Get All Users with Organizations
  .get("/users", 
    zValidator(
      "query", 
      z.object({
        page: z.string().optional().default("1"),
        limit: z.string().optional().default("50"),
        search: z.string().optional(),
        role: z.enum(["USER", "ADMIN", "SUPERADMIN"]).optional()
      })
    ),
    async (c) => {
      try {
        const { page, limit, search, role } = c.req.valid("query");
        const skip = (parseInt(page) - 1) * parseInt(limit);

        interface UserWhereInput {
          OR?: Array<{
            name?: { contains: string; mode: "insensitive" };
            email?: { contains: string; mode: "insensitive" };
          }>;
          role?: UserRole;
        }

        const where: UserWhereInput = {};
        if (search) {
          where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } }
          ];
        }
        if (role) {
          where.role = role;
        }

        const [users, totalCount] = await Promise.all([
          prisma.user.findMany({
            where,
            skip,
            take: parseInt(limit),
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              createdAt: true,
              isTwoFactorEnabled: true,
              organizations: {
                where: { status: "ACTIVE" },
                select: {
                  role: true,
                  organization: {
                    select: { id: true, name: true, type: true }
                  }
                }
              }
            },
            orderBy: { createdAt: "desc" }
          }),
          prisma.user.count({ where })
        ]);

        return c.json({
          users,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: totalCount,
            pages: Math.ceil(totalCount / parseInt(limit))
          }
        });
      } catch (error) {
        return handleError(c, error, 500, 'USERS_FETCH_ERROR');
      }
    }
  )

  // ✅ Get All Organizations with Details
  .get("/organizations",
    zValidator(
      "query",
      z.object({
        page: z.string().optional().default("1"),
        limit: z.string().optional().default("20"),
        type: z.enum(["SCHOOL", "CHURCH", "CORPORATE", "OTHER"]).optional()
      })
    ),
    async (c) => {
      try {
        const { page, limit, type } = c.req.valid("query");
        const skip = (parseInt(page) - 1) * parseInt(limit);

        interface OrgWhereInput {
          type?: "SCHOOL" | "CHURCH" | "CORPORATE" | "OTHER";
        }

        const where: OrgWhereInput = {};
        if (type) {
          where.type = type;
        }

        const [organizations, totalCount] = await Promise.all([
          prisma.organization.findMany({
            where,
            skip,
            take: parseInt(limit),
            include: {
              _count: {
                select: {
                  users: { where: { status: "ACTIVE" } }
                }
              },
              createdBy: {
                select: { name: true, email: true }
              },
              users: {
                where: { status: "ACTIVE" },
                take: 5,
                include: {
                  user: {
                    select: { name: true, email: true }
                  }
                }
              }
            },
            orderBy: { createdAt: "desc" }
          }),
          prisma.organization.count({ where })
        ]);

        return c.json({
          organizations,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total: totalCount,
            pages: Math.ceil(totalCount / parseInt(limit))
          }
        });
      } catch (error) {
        return handleError(c, error, 500, 'ORGANIZATIONS_FETCH_ERROR');
      }
    }
  )

  // ✅ Update User Role (Superadmin only)
  .patch("/users/:id/role",
    zValidator(
      "param",
      z.object({
        id: z.string()
      })
    ),
    zValidator(
      "json",
      z.object({
        role: z.enum(["USER", "ADMIN", "SUPERADMIN"])
      })
    ),
    async (c) => {
      try {
        const { id } = c.req.valid("param");
        const { role } = c.req.valid("json");

        const user = await prisma.user.findUnique({
          where: { id },
          select: { name: true, email: true, role: true }
        });

        if (!user) {
          return c.json({ error: "User not found" }, 404);
        }

        const updatedUser = await prisma.user.update({
          where: { id },
          data: { role },
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            updatedAt: true
          }
        });

        // Log the role change
        const currentUser = getUser(c);
        if (currentUser) {
          await prisma.updateLog.create({
            data: {
              name: "User Role Update",
              message: `User ${user.email} role changed from ${user.role} to ${role}`,
              type: "INFO",
              updatedBy: currentUser.id
            }
          });
        }

        return c.json({
          message: "User role updated successfully",
          user: updatedUser
        });
      } catch (error) {
        return handleError(c, error, 500, 'ROLE_UPDATE_ERROR');
      }
    }
  )

  // ✅ System Health Check
  .get("/health", async (c) => {
    try {
      const [dbHealth, systemLoad] = await Promise.all([
        // Database connectivity test
        prisma.$queryRaw`SELECT 1 as status`,
        
        // System load indicators
        Promise.all([
          prisma.user.count(),
          prisma.organization.count(),
          prisma.updateLog.count({
            where: {
              createdAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
              }
            }
          })
        ])
      ]);

      const [userCount, orgCount, recentLogs] = systemLoad;

      return c.json({
        status: "healthy",
        database: {
          connected: Array.isArray(dbHealth) && dbHealth.length > 0,
          responseTime: Date.now() // Simple timestamp
        },
        metrics: {
          totalUsers: userCount,
          totalOrganizations: orgCount,
          recentActivity: recentLogs,
          uptime: process.uptime()
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      return c.json({
        status: "unhealthy",
        error: "Health check failed",
        timestamp: new Date().toISOString()
      }, 500);
    }
  })

  // ✅ Get System Analytics
  .get("/analytics",
    zValidator(
      "query",
      z.object({
        period: z.enum(["7d", "30d", "90d", "1y"]).optional().default("30d")
      })
    ),
    async (c) => {
      try {
        const { period } = c.req.valid("query");
        
        const days = {
          "7d": 7,
          "30d": 30,
          "90d": 90,
          "1y": 365
        }[period];

        const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

        // User growth over time
        const userGrowth = await prisma.user.groupBy({
          by: ['createdAt'],
          _count: true,
          where: {
            createdAt: { gte: startDate }
          },
          orderBy: { createdAt: 'asc' }
        });

        // Organization growth
        const orgGrowth = await prisma.organization.groupBy({
          by: ['createdAt'],
          _count: true,
          where: {
            createdAt: { gte: startDate }
          },
          orderBy: { createdAt: 'asc' }
        });

        // Organization types distribution
        const orgTypes = await prisma.organization.groupBy({
          by: ['type'],
          _count: true
        });

        // Most active organizations
        const activeOrgs = await prisma.organization.findMany({
          take: 10,
          select: {
            id: true,
            name: true,
            type: true,
            _count: {
              select: {
                users: { where: { status: "ACTIVE" } }
              }
            }
          },
          orderBy: {
            users: {
              _count: "desc"
            }
          }
        });

        return c.json({
          userGrowth,
          orgGrowth,
          orgTypes,
          activeOrgs,
          period
        });
      } catch (error) {
        return handleError(c, error, 500, 'ANALYTICS_ERROR');
      }
    }
  );

export default superadmin;
