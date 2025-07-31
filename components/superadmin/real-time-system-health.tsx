"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  Database,
  Server,
  Shield,
  HardDrive,
  Cpu,
  MemoryStick,
  Clock,
  RefreshCw,
  Wifi,
  WifiOff,
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useSystemHealth } from '@/hooks/use-system-health';

interface RealTimeSystemHealthProps {
  /**
   * Whether to enable real-time updates
   */
  enabled?: boolean;
  /**
   * Polling interval in milliseconds
   */
  refreshInterval?: number;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Real-Time System Health Component
 * 
 * Features:
 * - Live system health monitoring
 * - Real-time status updates
 * - Performance metrics visualization
 * - Connection status indicator
 * - Manual refresh capability
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <RealTimeSystemHealth 
 *   enabled={true}
 *   refreshInterval={30000}
 * />
 * ```
 */
export function RealTimeSystemHealth({
  enabled = true,
  refreshInterval = 30000,
  className
}: RealTimeSystemHealthProps) {
  const {
    health,
    logs,
    isLoading,
    error,
    isOnline,
    overallStatus,
    getStatusColor,
    getStatusVariant,
    formatUptime,
    formatBytes,
    refetch,
  } = useSystemHealth({
    enabled,
    refetchInterval: refreshInterval,
  });

  // Status icon mapping
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'operational':
      case 'active':
      case 'available':
        return CheckCircle;
      case 'warning':
      case 'degraded':
      case 'issues':
        return AlertTriangle;
      case 'error':
      case 'down':
      case 'full':
        return XCircle;
      default:
        return Activity;
    }
  };

  // Loading skeleton
  if (isLoading && !health) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error && !health) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <XCircle className="h-5 w-5" />
            System Health Unavailable
          </CardTitle>
          <CardDescription>
            Unable to fetch system health data. Please check your connection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={refetch} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {/* System Health Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <CardTitle>System Health</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              {/* Connection status indicator */}
              {isOnline ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              
              {/* Manual refresh button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={refetch}
                disabled={isLoading}
                className="h-8 w-8 p-0"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
          <CardDescription>
            Current system status and health metrics
            {health?.system.lastUpdated && (
              <span className="block text-xs mt-1">
                Last updated: {new Date(health.system.lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Database Status */}
            {health?.database && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Database</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={getStatusVariant(health.database.status)}
                    className={getStatusColor(health.database.status)}
                  >
                    {health.database.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {health.database.responseTime}ms
                  </span>
                </div>
              </motion.div>
            )}

            {/* API Services Status */}
            {health?.api && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">API Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={getStatusVariant(health.api.status)}
                    className={getStatusColor(health.api.status)}
                  >
                    {health.api.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {health.api.errorRate}% errors
                  </span>
                </div>
              </motion.div>
            )}

            {/* Authentication Status */}
            {health?.authentication && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={getStatusVariant(health.authentication.status)}
                    className={getStatusColor(health.authentication.status)}
                  >
                    {health.authentication.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {health.authentication.activeUsers} users
                  </span>
                </div>
              </motion.div>
            )}

            {/* Storage Status */}
            {health?.storage && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={getStatusVariant(health.storage.status)}
                    className={getStatusColor(health.storage.status)}
                  >
                    {health.storage.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {health.storage.usagePercentage}% used
                  </span>
                </div>
              </motion.div>
            )}

            <Separator />

            {/* System Metrics */}
            {health?.system && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Uptime</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {health.system.uptimePercentage}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatUptime(health.system.uptime)}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <MemoryStick className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Memory Usage</span>
                    </div>
                    <span className="text-sm font-medium">{health.system.memoryUsage}%</span>
                  </div>
                  <Progress value={health.system.memoryUsage} className="h-2" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">CPU Usage</span>
                    </div>
                    <span className="text-sm font-medium">{health.system.cpuUsage}%</span>
                  </div>
                  <Progress value={health.system.cpuUsage} className="h-2" />
                </motion.div>

                {/* Storage Usage Progress */}
                {health.storage && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Storage Usage</span>
                      </div>
                      <span className="text-sm font-medium">
                        {formatBytes(health.storage.usedSpace)} / {formatBytes(health.storage.totalSpace)}
                      </span>
                    </div>
                    <Progress 
                      value={health.storage.usagePercentage} 
                      className="h-2"
                    />
                  </motion.div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* System Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Logs
          </CardTitle>
          <CardDescription>Recent system activities and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No recent logs available</p>
              </div>
            ) : (
              logs.slice(0, 8).map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    log.level === 'error' ? 'bg-red-500' :
                    log.level === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium truncate">{log.message}</p>
                      <Badge 
                        variant={
                          log.level === 'error' ? 'destructive' :
                          log.level === 'warning' ? 'secondary' :
                          'outline'
                        }
                        className="text-xs shrink-0"
                      >
                        {log.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{log.service}</span>
                      <span>•</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RealTimeSystemHealth;