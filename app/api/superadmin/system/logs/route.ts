import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/client';
import { UserRole } from '@prisma/client';
import { auth } from '@/lib/auth/auth';

/**
 * System Logs API Endpoint
 * 
 * Provides real-time system logs and activity monitoring
 * 
 * @route GET /api/superadmin/system/logs
 * @access SUPERADMIN only
 */
export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await auth();
    if (!session?.user || session.user.role !== UserRole.SUPERADMIN) {
      return NextResponse.json(
        { error: 'Unauthorized. Superadmin access required.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const level = searchParams.get('level'); // 'info', 'warning', 'error'
    const service = searchParams.get('service'); // Filter by service
    const since = searchParams.get('since'); // ISO date string

    // Build where clause for filtering
    const whereClause: any = {};

    if (level) {
      whereClause.type = level.toUpperCase();
    }

    if (since) {
      whereClause.createdAt = {
        gte: new Date(since),
      };
    }

    // Get system logs from UpdateLog table and format them
    const systemLogs = await prisma.updateLog.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      take: Math.min(limit, 100), // Cap at 100 logs
      include: {
        organization: {
          select: {
            name: true,
            type: true,
          },
        },
      },
    });

    // Transform logs to match the expected format
    const formattedLogs = systemLogs.map(log => ({
      id: log.id,
      timestamp: log.createdAt.toISOString(),
      level: log.type.toLowerCase() as 'info' | 'warning' | 'error',
      service: determineService(log.name, log.message),
      message: log.message,
      details: {
        name: log.name,
        updatedBy: log.updatedBy,
        organization: log.organization?.name,
        organizationType: log.organization?.type,
      },
    }));

    // Add some simulated real-time system logs for demonstration
    const simulatedLogs = generateSimulatedLogs(10);

    // Combine and sort by timestamp
    const allLogs = [...formattedLogs, ...simulatedLogs]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);

    return NextResponse.json({
      logs: allLogs,
      total: allLogs.length,
      hasMore: systemLogs.length === limit,
    });

  } catch (error) {
    console.error('System logs fetch failed:', error);

    return NextResponse.json(
      {
        error: 'Failed to retrieve system logs',
        logs: [],
        total: 0,
        hasMore: false,
      },
      { status: 500 }
    );
  }
}

/**
 * Determine service name based on log content
 */
function determineService(name: string, message: string): string {
  const lowerName = name.toLowerCase();
  const lowerMessage = message.toLowerCase();

  if (lowerName.includes('user') || lowerMessage.includes('login') || lowerMessage.includes('auth')) {
    return 'Authentication';
  }

  if (lowerName.includes('organization') || lowerMessage.includes('organization')) {
    return 'Organization';
  }

  if (lowerName.includes('database') || lowerMessage.includes('database') || lowerMessage.includes('prisma')) {
    return 'Database';
  }

  if (lowerName.includes('api') || lowerMessage.includes('api') || lowerMessage.includes('endpoint')) {
    return 'API';
  }

  if (lowerName.includes('system') || lowerMessage.includes('system')) {
    return 'System';
  }

  return 'Application';
}

/**
 * Generate simulated real-time system logs for demonstration
 * In a real implementation, these would come from your actual logging system
 */
function generateSimulatedLogs(count: number) {
  const services = ['Database', 'API', 'Authentication', 'Storage', 'System'];
  const levels: ('info' | 'warning' | 'error')[] = ['info', 'warning', 'error'];
  const messages = {
    info: [
      'Service health check completed successfully',
      'Background task completed',
      'Cache refreshed successfully',
      'Scheduled backup completed',
      'Performance metrics collected',
      'User session cleanup completed',
      'Database optimization task finished',
      'API rate limit reset',
    ],
    warning: [
      'High memory usage detected',
      'Slow query performance detected',
      'Rate limit threshold approaching',
      'Storage usage above 80%',
      'Unusual traffic pattern detected',
      'Failed login attempts increasing',
      'Response time degradation',
    ],
    error: [
      'Database connection timeout',
      'API endpoint returning errors',
      'Authentication service unavailable',
      'Storage write operation failed',
      'Critical service restart required',
      'Security alert: suspicious activity',
    ],
  };

  const logs = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const level = levels[Math.floor(Math.random() * levels.length)];
    const service = services[Math.floor(Math.random() * services.length)];
    const messageArray = messages[level];
    const message = messageArray[Math.floor(Math.random() * messageArray.length)];

    // Generate timestamps within the last hour
    const timestamp = new Date(now.getTime() - Math.random() * 60 * 60 * 1000);

    logs.push({
      id: `sim_${Date.now()}_${i}`,
      timestamp: timestamp.toISOString(),
      level,
      service,
      message,
      details: {
        simulated: true,
        severity: level === 'error' ? 'high' : level === 'warning' ? 'medium' : 'low',
        source: 'system-monitor',
      },
    });
  }

  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}