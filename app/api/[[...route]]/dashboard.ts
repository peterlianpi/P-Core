// Enhanced Dashboard API Routes
// Comprehensive analytics and statistics for multi-feature management
// Integrates with RLS-based security for automatic tenant isolation

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/lib/db";
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
        const organization = await db.organization.findUnique({
          where: { id: orgContext.organizationId },
          select: {
            id: true,
            name: true,
            type: true,
            createdAt: true,
            description: true
          }
        });

        // Return mock data for now to fix build issues
        // TODO: Implement actual database queries when models are properly defined
        const results: Record<string, unknown> = {
          organization,
          studentStats: {
            total: 150,
            active: 140,
            inactive: 10,
            newThisMonth: 12,
            growthRate: 8.5
          },
          courseStats: {
            total: 25,
            active: 22,
            completed: 180,
            enrollments: 320
          },
          memberStats: {
            total: 200,
            active: 190,
            inactive: 10,
            newThisMonth: 15,
            growthRate: 7.5,
            byHome: {},
            byVeng: {},
            byKhawk: {}
          },
          familyStats: {
            totalFamilies: 45,
            averageFamilySize: 4.2,
            singleMembers: 25,
            marriedCouples: 88
          },
          choirStats: {
            totalChoirs: 3,
            activeChoirs: 3,
            totalMembers: 85,
            totalSongs: 120,
            upcomingEvents: 5,
            voicePartDistribution: {
              soprano: 25,
              alto: 20,
              tenor: 20,
              bass: 20
            }
          },
          libraryStats: {
            totalBooks: 500,
            availableBooks: 450,
            loanedBooks: 50,
            overdueBooks: 5,
            popularBooks: [],
            recentLoans: []
          },
          financialStats: {
            totalRevenue: 25000,
            monthlyRevenue: 3200,
            pendingPayments: 3,
            completedPayments: 45,
            revenueGrowthRate: 12.5
          },
          recentActivity: [],
          growthTrends: {
            students: [],
            members: [],
            revenue: [],
            courses: [],
            choirs: []
          },
          upcomingEvents: [],
          upcomingDeadlines: [],
          alerts: [],
          notifications: [],
          performanceMetrics: {
            enrollmentRate: 85,
            completionRate: 78,
            attendanceRate: 92,
            satisfactionScore: 4.2
          }
        };

        return c.json(results);

      } catch (error) {
        console.error("Dashboard error:", error);
        return c.json({ error: "Failed to fetch dashboard data" }, 500);
      }
    }
  )

  // GET /api/dashboard/analytics - Get analytics data for charts
  .get(
    "/analytics",
    zValidator(
      "query",
      z.object({
        timeRange: z.enum(['week', 'month', 'quarter', 'year']).optional(),
        organizationType: z.string().optional(),
        metrics: z.string().optional(), // comma-separated list
      })
    ),
    requirePermission("read:dashboard"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const { timeRange = 'month', organizationType, 
          // metrics 
        } = c.req.valid("query");
        
        // Get organization info
        const organization = await db.organization.findUnique({
          where: { id: orgContext.organizationId },
          select: { type: true }
        });

        const orgType = organizationType || organization?.type || 'business';

        // Mock data for now - replace with real queries later
        const data = {
          timeRange,
          organizationType: orgType,
          metrics: {
            ...(orgType === 'school' && {
              enrollments: Array.from({ length: 6 }, (_, i) => ({
                month: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
                value: Math.floor(Math.random() * 50) + 10
              })),
              revenue: Array.from({ length: 6 }, (_, i) => ({
                month: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
                value: Math.floor(Math.random() * 10000) + 1000
              }))
            })
          }
        };

        return c.json({ data });

      } catch (error) {
        console.error("Dashboard analytics error:", error);
        return c.json({ error: "Failed to fetch analytics data" }, 500);
      }
    }
  )

  // GET /api/dashboard/activity - Get recent activity
  .get(
    "/activity",
    zValidator(
      "query",
      z.object({
        limit: z.string().optional(),
        offset: z.string().optional(),
        types: z.string().optional(),
        timeRange: z.enum(['today', 'week', 'month']).optional(),
      })
    ),
    requirePermission("read:dashboard"),
    async (c) => {
      try {
        // const { limit = "20", offset = "0" } = c.req.valid("query");
        
        // Mock activity data
        const activities = [
          {
            id: '1',
            type: 'enrollment',
            title: 'New Student Enrollment',
            description: 'Student enrolled in course',
            user: { name: 'Admin User' },
            timestamp: new Date(),
            metadata: {}
          }
        ];

        return c.json({
          data: {
            activities,
            total: activities.length,
            hasMore: false
          }
        });

      } catch (error) {
        console.error("Dashboard activity error:", error);
        return c.json({ error: "Failed to fetch activity data" }, 500);
      }
    }
  )

  // GET /api/dashboard/stats - Get dashboard statistics
  .get(
    "/stats",
    zValidator(
      "query",
      z.object({
        timeRange: z.enum(['today', 'week', 'month', 'quarter', 'year']).optional(),
        organizationType: z.string().optional(),
        includeGrowth: z.string().optional(),
      })
    ),
    requirePermission("read:dashboard"),
    async (c) => {
      try {
        const orgContext = getOrganizationContext(c);
        const { organizationType } = c.req.valid("query");

        // Get organization info
        const organization = await db.organization.findUnique({
          where: { id: orgContext.organizationId },
          select: { type: true }
        });

        const orgType = organizationType || organization?.type || 'business';

        // Mock stats for now - replace with real queries later
        const stats = {
          totalUsers: 350,
          totalRevenue: 25000,
          activeMembers: 190,
          completionRate: 85,
          organizationType: orgType,
          periodGrowth: {
            users: 12,
            revenue: 8,
            members: 5,
            completion: 3
          }
        };

        return c.json({ data: stats });

      } catch (error) {
        console.error("Dashboard stats error:", error);
        return c.json({ error: "Failed to fetch stats data" }, 500);
      }
    }
  );

export default dashboard;
