import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { prisma } from "@/lib/db/client";
import { UserRole } from "@prisma/client";

/**
 * GET /api/superadmin/stats
 * Fetch system-wide statistics for superadmin dashboard
 * Requires SUPERADMIN role
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Check if user is superadmin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    });

    if (user?.role !== UserRole.SUPERADMIN) {
      return NextResponse.json(
        { error: "Superadmin access required" },
        { status: 403 }
      );
    }

    // Calculate date ranges for growth metrics
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

    // Fetch system statistics
    const [
      totalUsers,
      totalOrganizations,
      activeOrganizations,
      totalStudents,
      totalMembers,
      totalCourses,
      totalBooks,
      recentSignups,
      usersLastMonth,
      usersTwoMonthsAgo,
      orgsLastMonth,
      orgsTwoMonthsAgo,
      recentActivity
    ] = await Promise.all([
      // Total users count
      prisma.user.count(),
      
      // Total organizations count
      prisma.organization.count(),
      
      // Active organizations (with activity in last 30 days)
      prisma.organization.count({
        where: {
          updatedAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Total students across all organizations
      prisma.userOrganization.count({
        where: {
          role: "MEMBER" // Assuming students are members
        }
      }),
      
      // Total members across all organizations
      prisma.userOrganization.count(),
      
      // Total courses (if you have a Course model)
      // For now, returning 0 as placeholder
      Promise.resolve(0),
      
      // Total books (if you have a Book model)
      // For now, returning 0 as placeholder
      Promise.resolve(0),
      
      // Recent signups (last 7 days)
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Users from last month for growth calculation
      prisma.user.count({
        where: {
          createdAt: {
            gte: lastMonth,
            lt: now
          }
        }
      }),
      
      // Users from two months ago for growth calculation
      prisma.user.count({
        where: {
          createdAt: {
            gte: twoMonthsAgo,
            lt: lastMonth
          }
        }
      }),
      
      // Organizations from last month
      prisma.organization.count({
        where: {
          createdAt: {
            gte: lastMonth,
            lt: now
          }
        }
      }),
      
      // Organizations from two months ago
      prisma.organization.count({
        where: {
          createdAt: {
            gte: twoMonthsAgo,
            lt: lastMonth
          }
        }
      }),
      
      // Recent activity (last 10 activities)
      prisma.user.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          createdAt: true,
          organizations: {
            take: 1,
            select: {
              organization: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      })
    ]);

    // Calculate growth rates
    const userGrowthRate = usersTwoMonthsAgo > 0 
      ? ((usersLastMonth - usersTwoMonthsAgo) / usersTwoMonthsAgo) * 100 
      : 0;
    
    const orgGrowthRate = orgsTwoMonthsAgo > 0 
      ? ((orgsLastMonth - orgsTwoMonthsAgo) / orgsTwoMonthsAgo) * 100 
      : 0;

    // Format recent activity
    const formattedActivity = recentActivity.map(user => ({
      id: user.id,
      name: user.name || 'Unknown User',
      message: 'User registered',
      type: 'user_registration',
      createdAt: user.createdAt.toISOString(),
      organization: user.organizations[0]?.organization || null
    }));

    // Calculate total revenue (placeholder - implement based on your billing system)
    const totalRevenue = 0;

    const stats = {
      overview: {
        totalUsers,
        totalOrganizations,
        activeOrganizations,
        totalStudents,
        totalMembers,
        totalCourses,
        totalBooks,
        totalRevenue,
        recentSignups,
        userGrowthRate: Math.round(userGrowthRate * 100) / 100,
        orgGrowthRate: Math.round(orgGrowthRate * 100) / 100,
      },
      recentActivity: formattedActivity
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error("Error fetching superadmin stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}