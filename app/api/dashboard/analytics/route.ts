import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { getOrganizationContext } from '@/lib/security/tenant';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeRange = searchParams.get('timeRange') || 'month';
    const organizationType = searchParams.get('organizationType');
    const metrics = searchParams.get('metrics');

    // For now, return mock data until proper authentication is implemented
    const orgType = organizationType || 'business';

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'quarter':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default: // month
        startDate.setMonth(now.getMonth() - 1);
    }

    const data: Record<string, any> = {
      timeRange,
      organizationType: orgType,
      metrics: {}
    };

    // Get monthly data for charts
    const monthlyData = [];
    const periods = timeRange === 'week' ? 7 : timeRange === 'year' ? 12 : 6;
    
    for (let i = periods - 1; i >= 0; i--) {
      const date = new Date();
      if (timeRange === 'week') {
        date.setDate(date.getDate() - i);
      } else if (timeRange === 'year') {
        date.setMonth(date.getMonth() - i);
      } else {
        date.setMonth(date.getMonth() - i);
      }

      const label = timeRange === 'week' 
        ? date.toLocaleDateString('en-US', { weekday: 'short' })
        : date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      const monthData: any = { month: label };

      // Mock data based on organization type
      if (orgType === 'school') {
        monthData.enrollments = Math.floor(Math.random() * 50) + 10;
        monthData.revenue = Math.floor(Math.random() * 10000) + 1000;
        monthData.attendance = Math.floor(Math.random() * 100) + 50;
      }

      if (orgType === 'church') {
        monthData.active = Math.floor(Math.random() * 100) + 20;
        monthData.inactive = Math.floor(Math.random() * 20) + 5;
        monthData.donations = Math.floor(Math.random() * 5000) + 500;
        monthData.services = Math.floor(Math.random() * 10) + 2;
      }

      if (orgType === 'library') {
        monthData.loans = Math.floor(Math.random() * 50) + 10;
        monthData.returns = Math.floor(Math.random() * 45) + 5;
      }

      monthlyData.push(monthData);
    }

    data.metrics = {
      ...(orgType === 'school' && {
        enrollments: monthlyData.map(d => ({ month: d.month, value: d.enrollments || 0 })),
        revenue: monthlyData.map(d => ({ month: d.month, value: d.revenue || 0 })),
        attendance: monthlyData.map(d => ({ month: d.month, value: d.attendance || 0 }))
      }),
      ...(orgType === 'church' && {
        members: monthlyData.map(d => ({ month: d.month, active: d.active || 0, inactive: d.inactive || 0 })),
        donations: monthlyData.map(d => ({ month: d.month, value: d.donations || 0 })),
        services: monthlyData.map(d => ({ month: d.month, value: d.services || 0 }))
      }),
      ...(orgType === 'library' && {
        loans: monthlyData.map(d => ({ month: d.month, loans: d.loans || 0, returns: d.returns || 0 })),
        inventory: [
          { category: 'Fiction', value: Math.floor(Math.random() * 1000) },
          { category: 'Non-Fiction', value: Math.floor(Math.random() * 800) },
          { category: 'Reference', value: Math.floor(Math.random() * 300) },
          { category: 'Periodicals', value: Math.floor(Math.random() * 200) }
        ]
      })
    };

    return NextResponse.json({ data });

  } catch (error) {
    console.error("Dashboard analytics error:", error);
    return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 });
  }
}
