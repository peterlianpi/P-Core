// Enhanced Dashboard API Routes
// Comprehensive analytics and statistics for multi-feature management
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

const dashboard = new Hono()
  // Apply organization security middleware to all routes
  .use("*", organizationSecurityMiddleware)

  // GET /api/dashboard - Get comprehensive dashboard data
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        fromDate: z.string().optional(),
        toDate: z.string().optional(),
        includeStudents: z.string().optional(),
        includeMembers: z.string().optional(),
        includeChoirs: z.string().optional(),
        includeLibrary: z.string().optional(),
        includePurchases: z.string().optional(),
        includeEvents: z.string().optional(),
        includeGrowthTrends: z.string().optional(),
      })
    ),
    requirePermission("read:dashboard"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const {
          fromDate,
          toDate,
          includeStudents = "true",
          includeMembers = "true", 
          includeChoirs = "true",
          includeLibrary = "true",
          includePurchases = "true",
          includeEvents = "true",
          includeGrowthTrends = "true"
        } = c.req.valid("query");

        // Set date range defaults
        const dateRange = {
          from: fromDate ? new Date(fromDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          to: toDate ? new Date(toDate) : new Date()
        };

        // Get organization info
        const organization = await prisma.organization.findUnique({
          where: { id: orgContext.organizationId },
          select: {
            id: true,
            name: true,
            type: true,
            createdAt: true,
            description: true
          }
        });

        const results: any = { organization };

        // Student Statistics
        if (includeStudents === "true") {
          const [
            totalStudents,
            activeStudents,
            newStudentsThisMonth,
            studentsLastMonth
          ] = await Promise.all([
            prisma.student.count(),
            prisma.student.count({ where: { isActive: true } }),
            prisma.student.count({
              where: {
                createdAt: {
                  gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
              }
            }),
            prisma.student.count({
              where: {
                createdAt: {
                  gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                  lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
              }
            })
          ]);

          const growthRate = studentsLastMonth > 0 
            ? ((newStudentsThisMonth - studentsLastMonth) / studentsLastMonth) * 100 
            : newStudentsThisMonth > 0 ? 100 : 0;

          results.studentStats = {
            total: totalStudents,
            active: activeStudents,
            inactive: totalStudents - activeStudents,
            newThisMonth: newStudentsThisMonth,
            growthRate: Math.round(growthRate * 100) / 100
          };

          // Course statistics
          const [totalCourses, activeCourses, totalEnrollments] = await Promise.all([
            prisma.course.count(),
            prisma.course.count({ where: { isActive: true } }),
            prisma.studentCourse.count({ where: { status: "ENROLLED" } })
          ]);

          results.courseStats = {
            total: totalCourses,
            active: activeCourses,
            completed: await prisma.studentCourse.count({ where: { status: "COMPLETED" } }),
            enrollments: totalEnrollments
          };
        }

        // Member Statistics (Church)
        if (includeMembers === "true") {
          const [
            totalMembers,
            activeMembers,
            newMembersThisMonth,
            membersLastMonth
          ] = await Promise.all([
            prisma.member.count(),
            prisma.member.count({ where: { isActive: true } }),
            prisma.member.count({
              where: {
                createdAt: {
                  gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
              }
            }),
            prisma.member.count({
              where: {
                createdAt: {
                  gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                  lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
              }
            })
          ]);

          const memberGrowthRate = membersLastMonth > 0 
            ? ((newMembersThisMonth - membersLastMonth) / membersLastMonth) * 100 
            : newMembersThisMonth > 0 ? 100 : 0;

          // Family statistics
          const [totalHomes, marriedCouples, singleMembers] = await Promise.all([
            prisma.home.count(),
            prisma.member.count({ where: { spouseId: { not: null }, isActive: true } }),
            prisma.member.count({ where: { spouseId: null, isActive: true } })
          ]);

          results.memberStats = {
            total: totalMembers,
            active: activeMembers,
            inactive: totalMembers - activeMembers,
            newThisMonth: newMembersThisMonth,
            growthRate: Math.round(memberGrowthRate * 100) / 100,
            byHome: await prisma.member.groupBy({
              by: ['homeId'],
              _count: true,
              where: { isActive: true, homeId: { not: null } }
            }).then(groups => 
              groups.reduce((acc, group) => {
                if (group.homeId) acc[group.homeId] = group._count;
                return acc;
              }, {} as Record<string, number>)
            ),
            byVeng: {},
            byKhawk: {}
          };

          results.familyStats = {
            totalFamilies: totalHomes,
            averageFamilySize: totalHomes > 0 ? Math.round((activeMembers / totalHomes) * 100) / 100 : 0,
            singleMembers,
            marriedCouples: Math.floor(marriedCouples / 2) // Divide by 2 since each marriage involves 2 people
          };
        }

        // Choir Statistics
        if (includeChoirs === "true") {
          const [totalChoirs, activeChoirs, totalChoirMembers, totalSongs, upcomingEvents] = await Promise.all([
            prisma.choir.count(),
            prisma.choir.count({ where: { isActive: true } }),
            prisma.choirMember.count({ where: { status: "ACTIVE" } }),
            prisma.song.count({ where: { isActive: true } }),
            prisma.choirEvent.count({
              where: {
                eventDate: { gte: new Date() }
              }
            })
          ]);

          // Voice part distribution
          const voicePartDistribution = await prisma.choirMember.groupBy({
            by: ['voice'],
            _count: true,
            where: { status: "ACTIVE" }
          }).then(groups => 
            groups.reduce((acc, group) => {
              if (group.voice) {
                const voicePart = group.voice.toLowerCase();
                if (voicePart.includes('soprano')) acc.soprano = (acc.soprano || 0) + group._count;
                else if (voicePart.includes('alto')) acc.alto = (acc.alto || 0) + group._count;
                else if (voicePart.includes('tenor')) acc.tenor = (acc.tenor || 0) + group._count;
                else if (voicePart.includes('bass')) acc.bass = (acc.bass || 0) + group._count;
              }
              return acc;
            }, {} as Record<string, number>)
          );

          results.choirStats = {
            totalChoirs,
            activeChoirs,
            totalMembers: totalChoirMembers,
            totalSongs,
            upcomingEvents,
            voicePartDistribution
          };
        }

        // Library Statistics
        if (includeLibrary === "true") {
          const [
            totalBooks,
            availableBooks,
            loanedBooks,
            overdueBooks,
            totalLoans,
            activeLoans
          ] = await Promise.all([
            prisma.book.count({ where: { isActive: true } }),
            prisma.book.count({ where: { isActive: true, available: { gt: 0 } } }),
            prisma.bookLoan.count({ where: { status: "ACTIVE" } }),
            prisma.bookLoan.count({
              where: {
                status: "ACTIVE",
                dueDate: { lt: new Date() }
              }
            }),
            prisma.bookLoan.count(),
            prisma.bookLoan.count({ where: { status: "ACTIVE" } })
          ]);

          // Popular books
          const popularBooks = await prisma.book.findMany({
            where: { isActive: true },
            include: {
              loans: {
                where: { status: "RETURNED" }
              }
            },
            take: 5
          }).then(books => 
            books
              .map(book => ({
                id: book.id,
                title: book.title,
                author: book.author,
                loanCount: book.loans.length
              }))
              .sort((a, b) => b.loanCount - a.loanCount)
          );

          // Recent loans
          const recentLoans = await prisma.bookLoan.findMany({
            where: { status: "ACTIVE" },
            include: {
              book: { select: { title: true, author: true } },
              student: { select: { name: true } }
            },
            orderBy: { loanDate: "desc" },
            take: 5
          });

          results.libraryStats = {
            totalBooks,
            availableBooks,
            loanedBooks,
            overdueBooks,
            popularBooks,
            recentLoans
          };
        }

        // Financial Statistics
        if (includePurchases === "true") {
          const [
            totalRevenue,
            monthlyRevenue,
            pendingPayments,
            completedPayments
          ] = await Promise.all([
            prisma.purchase.aggregate({
              _sum: { amount: true },
              where: { status: "COMPLETED" }
            }),
            prisma.purchase.aggregate({
              _sum: { amount: true },
              where: {
                status: "COMPLETED",
                createdAt: {
                  gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
              }
            }),
            prisma.purchase.count({ where: { status: "PENDING" } }),
            prisma.purchase.count({ where: { status: "COMPLETED" } })
          ]);

          // Revenue last month for growth calculation
          const lastMonthRevenue = await prisma.purchase.aggregate({
            _sum: { amount: true },
            where: {
              status: "COMPLETED",
              createdAt: {
                gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
                lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
              }
            }
          });

          const currentMonth = Number(monthlyRevenue._sum.amount) || 0;
          const lastMonth = Number(lastMonthRevenue._sum.amount) || 0;
          const revenueGrowthRate = lastMonth > 0 
            ? ((currentMonth - lastMonth) / lastMonth) * 100 
            : currentMonth > 0 ? 100 : 0;

          results.financialStats = {
            totalRevenue: Number(totalRevenue._sum.amount) || 0,
            monthlyRevenue: currentMonth,
            pendingPayments,
            completedPayments,
            revenueGrowthRate: Math.round(revenueGrowthRate * 100) / 100
          };
        }

        // Recent Activity
        const recentActivity = await prisma.updateLog.findMany({
          where: {
            createdAt: {
              gte: dateRange.from,
              lte: dateRange.to
            }
          },
          include: {
            updatedByUser: {
              select: { name: true, email: true }
            }
          },
          orderBy: { createdAt: "desc" },
          take: 20
        });

        results.recentActivity = recentActivity;

        // Growth Trends
        if (includeGrowthTrends === "true") {
          // Get monthly growth data for the last 6 months
          const monthlyData = [];
          for (let i = 5; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            const [studentCount, memberCount, revenue] = await Promise.all([
              includeStudents === "true" ? 
                prisma.student.count({
                  where: { createdAt: { lte: endOfMonth } }
                }) : 0,
              includeMembers === "true" ?
                prisma.member.count({
                  where: { createdAt: { lte: endOfMonth } }
                }) : 0,
              includePurchases === "true" ?
                prisma.purchase.aggregate({
                  _sum: { amount: true },
                  where: {
                    status: "COMPLETED",
                    createdAt: {
                      gte: startOfMonth,
                      lte: endOfMonth
                    }
                  }
                }).then(result => Number(result._sum.amount) || 0) : 0
            ]);

            monthlyData.push({
              month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
              students: studentCount,
              members: memberCount,
              revenue
            });
          }

          results.growthTrends = {
            students: monthlyData.map(d => ({ month: d.month, value: d.students })),
            members: monthlyData.map(d => ({ month: d.month, value: d.members })),
            revenue: monthlyData.map(d => ({ month: d.month, value: d.revenue })),
            courses: [],
            choirs: []
          };
        }

        // Upcoming Events and Deadlines
        if (includeEvents === "true") {
          const upcomingEvents = await prisma.choirEvent.findMany({
            where: {
              eventDate: { gte: new Date() }
            },
            include: {
              choir: { select: { name: true } }
            },
            orderBy: { eventDate: "asc" },
            take: 10
          });

          const upcomingDeadlines = await prisma.bookLoan.findMany({
            where: {
              status: "ACTIVE",
              dueDate: {
                gte: new Date(),
                lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
              }
            },
            include: {
              book: { select: { title: true } },
              student: { select: { name: true } }
            },
            orderBy: { dueDate: "asc" },
            take: 10
          });

          results.upcomingEvents = upcomingEvents;
          results.upcomingDeadlines = upcomingDeadlines;
        }

        // Alerts and Notifications
        const alerts = [];
        const notifications = [];

        // Check for overdue books
        if (includeLibrary === "true") {
          const overdueCount = await prisma.bookLoan.count({
            where: {
              status: "ACTIVE",
              dueDate: { lt: new Date() }
            }
          });

          if (overdueCount > 0) {
            alerts.push({
              id: "overdue_books",
              type: "warning",
              level: "warning",
              title: "Overdue Books",
              message: `${overdueCount} book(s) are overdue and need attention`,
              count: overdueCount
            });
          }
        }

        // Check for pending payments
        if (includePurchases === "true") {
          const pendingCount = await prisma.purchase.count({
            where: { status: "PENDING" }
          });

          if (pendingCount > 0) {
            alerts.push({
              id: "pending_payments",
              type: "info",
              level: "info",
              title: "Pending Payments",
              message: `${pendingCount} payment(s) are pending`,
              count: pendingCount
            });
          }
        }

        results.alerts = alerts;
        results.notifications = notifications;

        // Performance Metrics
        const performanceMetrics = {
          enrollmentRate: 0,
          completionRate: 0,
          attendanceRate: 0,
          satisfactionScore: 0
        };

        if (includeStudents === "true") {
          const totalStudents = await prisma.student.count({ where: { isActive: true } });
          const enrolledStudents = await prisma.studentCourse.count({ where: { status: "ENROLLED" } });
          const completedCourses = await prisma.studentCourse.count({ where: { status: "COMPLETED" } });
          const totalEnrollments = await prisma.studentCourse.count();

          performanceMetrics.enrollmentRate = totalStudents > 0 ? (enrolledStudents / totalStudents) * 100 : 0;
          performanceMetrics.completionRate = totalEnrollments > 0 ? (completedCourses / totalEnrollments) * 100 : 0;
        }

        results.performanceMetrics = performanceMetrics;

        return c.json(results);

      } catch (error) {
        console.error("Dashboard error:", error);
        return c.json({ error: "Failed to fetch dashboard data" }, 500);
      }
    }
  );

export default dashboard;
