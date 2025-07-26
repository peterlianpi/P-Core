import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeRange = searchParams.get('timeRange') || 'month';
    const organizationType = searchParams.get('organizationType') || 'business';
    const includeGrowth = searchParams.get('includeGrowth') !== 'false';

    // Mock stats data for now - in production this would fetch real data
    const baseStats = {
      totalUsers: Math.floor(Math.random() * 1000) + 100,
      totalRevenue: Math.floor(Math.random() * 100000) + 10000,
      activeMembers: Math.floor(Math.random() * 500) + 50,
      completionRate: Math.floor(Math.random() * 50) + 50,
      organizationType,
      periodGrowth: {
        users: Math.floor(Math.random() * 20) + 5,
        revenue: Math.floor(Math.random() * 30) + 10,
        members: Math.floor(Math.random() * 15) + 5,
        completion: Math.floor(Math.random() * 10) + 2
      }
    };

    // Organization-specific stats
    const orgSpecificStats: any = {};

    if (organizationType === 'school') {
      orgSpecificStats.school = {
        totalStudents: Math.floor(Math.random() * 500) + 100,
        totalCourses: Math.floor(Math.random() * 50) + 10,
        totalEnrollments: Math.floor(Math.random() * 1000) + 200,
        averageGrade: Math.floor(Math.random() * 30) + 70
      };
    }

    if (organizationType === 'church') {
      orgSpecificStats.church = {
        totalMembers: Math.floor(Math.random() * 300) + 50,
        totalFamilies: Math.floor(Math.random() * 100) + 20,
        totalChoirs: Math.floor(Math.random() * 10) + 2,
        totalEvents: Math.floor(Math.random() * 20) + 5
      };
    }

    if (organizationType === 'library') {
      orgSpecificStats.library = {
        totalBooks: Math.floor(Math.random() * 5000) + 1000,
        totalLoans: Math.floor(Math.random() * 200) + 50,
        availableBooks: Math.floor(Math.random() * 4000) + 800,
        overdueLoans: Math.floor(Math.random() * 20) + 2
      };
    }

    const stats = {
      ...baseStats,
      ...orgSpecificStats
    };

    return NextResponse.json({ data: stats });

  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats data" }, { status: 500 });
  }
}
