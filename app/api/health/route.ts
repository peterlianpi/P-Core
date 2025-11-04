/**
 * Health Check API Route
 *
 * Simple endpoint to verify system is running
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mockDatabase: process.env.USE_MOCK_DB === 'true' || process.env.DATABASE_URL?.includes('mock')
  });
}
