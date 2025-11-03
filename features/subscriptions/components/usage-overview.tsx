/**
 * Usage Overview Component
 * Displays current usage against subscription limits
 */

'use client';

import { useUsageStats } from '../hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, HardDrive, Zap, AlertTriangle } from 'lucide-react';

export function UsageOverview() {
  const organizationId = 'current-org-id'; // TODO: Get from context
  const { data: usage, isLoading } = useUsageStats(organizationId);

  if (isLoading || !usage) {
    return null;
  }

  const metrics = [
    {
      label: 'Users',
      icon: Users,
      current: usage.users.current,
      limit: usage.users.limit,
      percentage: usage.users.percentage,
      unit: 'users',
    },
    {
      label: 'Storage',
      icon: HardDrive,
      current: usage.storage.current,
      limit: usage.storage.limit,
      percentage: usage.storage.percentage,
      unit: 'GB',
    },
    {
      label: 'API Calls',
      icon: Zap,
      current: usage.apiCalls.current,
      limit: usage.apiCalls.limit,
      percentage: usage.apiCalls.percentage,
      unit: 'calls',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Overview</CardTitle>
        <CardDescription>
          Current usage against your plan limits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <metric.icon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{metric.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {metric.current.toLocaleString()} / {metric.limit.toLocaleString()} {metric.unit}
                </span>
                {metric.percentage >= 80 && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    {Math.round(metric.percentage)}%
                  </Badge>
                )}
              </div>
            </div>
            <Progress
              value={metric.percentage}
              className={metric.percentage >= 80 ? 'bg-destructive/20' : ''}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}