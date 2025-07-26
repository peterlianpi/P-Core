import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const types = searchParams.get('types')?.split(',');
    const timeRange = searchParams.get('timeRange') || 'week';

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeRange) {
      case 'today':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      default: // week
        startDate.setDate(now.getDate() - 7);
    }

    // Mock activity data for now
    const mockActivities = [
      {
        id: '1',
        type: 'enrollment',
        title: 'New Student Enrollment',
        description: 'John Doe enrolled in Mathematics course',
        user: { name: 'Admin User', avatar: undefined },
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        metadata: { course: 'Mathematics', student: 'John Doe' }
      },
      {
        id: '2',
        type: 'payment',
        title: 'Payment Received',
        description: 'Course fee payment completed',
        user: { name: 'Finance Team', avatar: undefined },
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        metadata: { amount: 250.00 }
      },
      {
        id: '3',
        type: 'member_join',
        title: 'New Member Added',
        description: 'Sarah Johnson joined the organization',
        user: { name: 'HR Manager', avatar: undefined },
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        metadata: { member: 'Sarah Johnson' }
      },
      {
        id: '4',
        type: 'course_completion',
        title: 'Course Completed',
        description: 'Mike Wilson completed Advanced Physics',
        user: { name: 'System', avatar: undefined },
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        metadata: { course: 'Advanced Physics', student: 'Mike Wilson' }
      },
      {
        id: '5',
        type: 'event',
        title: 'Event Scheduled',
        description: 'Monthly meeting scheduled for next week',
        user: { name: 'Event Coordinator', avatar: undefined },
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
        metadata: { event: 'Monthly Meeting' }
      }
    ];

    // Filter by types if specified
    let filteredActivities = mockActivities;
    if (types && types.length > 0) {
      filteredActivities = mockActivities.filter(activity => 
        types.includes(activity.type)
      );
    }

    // Apply pagination
    const paginatedActivities = filteredActivities.slice(offset, offset + limit);

    return NextResponse.json({
      data: {
        activities: paginatedActivities,
        total: filteredActivities.length,
        hasMore: filteredActivities.length > offset + limit
      }
    });

  } catch (error) {
    console.error("Dashboard activity error:", error);
    return NextResponse.json({ error: "Failed to fetch activity data" }, { status: 500 });
  }
}
