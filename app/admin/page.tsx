"use client";

import React from "react";
import { EnhancedAdminLayout } from "@/components/admin-panel/enhanced-admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Settings,
  Database,
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  Crown,
  BarChart3,
  PieChart,
  Calendar,
  Clock,
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  Zap,
  Lock,
  Key,
  UserCheck,
  Building,
  FileText,
  Mail,
} from "lucide-react";
import { mockSystemHealth } from "@/data/dashboard/mock-dashboard";

export default function AdminDashboardPage() {
  const systemHealth = mockSystemHealth;

  const adminStats = [
    {
      title: "System Uptime",
      value: "99.9%",
      change: "Last 30 days",
      icon: Server,
      description: "Service availability",
      color: "text-green-600"
    },
    {
      title: "Active Sessions",
      value: "1,247",
      change: "+12%",
      icon: Users,
      description: "Current user sessions",
      color: "text-blue-600"
    },
    {
      title: "API Requests",
      value: "45.2K",
      change: "+8%",
      icon: Activity,
      description: "This month",
      color: "text-purple-600"
    },
    {
      title: "Security Score",
      value: "98/100",
      change: "Excellent",
      icon: Shield,
      description: "System security rating",
      color: "text-green-600"
    },
  ];

  const systemServices = [
    { name: "Database", status: "healthy", uptime: "99.9%", icon: Database },
    { name: "API Gateway", status: "healthy", uptime: "99.8%", icon: Server },
    { name: "Authentication", status: "healthy", uptime: "99.9%", icon: Lock },
    { name: "Cache Layer", status: "healthy", uptime: "99.7%", icon: Zap },
    { name: "Email Service", status: "warning", uptime: "98.5%", icon: Mail },
    { name: "File Storage", status: "healthy", uptime: "99.9%", icon: HardDrive },
  ];

  return (
    <EnhancedAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Control Panel</h1>
            <p className="text-muted-foreground">
              Advanced system administration and monitoring tools.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
            <Button variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Security Audit
            </Button>
          </div>
        </div>

        {/* Admin Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {adminStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Admin Tabs */}
        <Tabs defaultValue="system" className="space-y-6">
          <div className="overflow-x-auto">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-max min-w-full sm:w-full sm:grid sm:grid-cols-4">
              <TabsTrigger value="system" className="whitespace-nowrap">System Health</TabsTrigger>
              <TabsTrigger value="security" className="whitespace-nowrap">Security</TabsTrigger>
              <TabsTrigger value="performance" className="whitespace-nowrap">Performance</TabsTrigger>
              <TabsTrigger value="maintenance" className="whitespace-nowrap">Maintenance</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="system" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* System Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    System Resources
                  </CardTitle>
                  <CardDescription>Current resource utilization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        <span>CPU Usage</span>
                      </div>
                      <span className="font-medium">{systemHealth.cpuUsage}%</span>
                    </div>
                    <Progress value={systemHealth.cpuUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <MemoryStick className="h-4 w-4" />
                        <span>Memory</span>
                      </div>
                      <span className="font-medium">{systemHealth.memoryUsage}%</span>
                    </div>
                    <Progress value={systemHealth.memoryUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4" />
                        <span>Storage</span>
                      </div>
                      <span className="font-medium">{systemHealth.diskUsage}%</span>
                    </div>
                    <Progress value={systemHealth.diskUsage} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* System Services Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Service Status
                  </CardTitle>
                  <CardDescription>Core system services health</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemServices.map((service) => (
                      <div key={service.name} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <service.icon className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{service.name}</p>
                            <p className="text-xs text-muted-foreground">{service.uptime} uptime</p>
                          </div>
                        </div>
                        <Badge
                          variant={service.status === 'healthy' ? 'secondary' : 'destructive'}
                          className={service.status === 'healthy' ? 'text-green-600' : ''}
                        >
                          {service.status === 'healthy' ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <AlertTriangle className="mr-1 h-3 w-3" />
                          )}
                          {service.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Logs */}
            <Card>
              <CardHeader>
                <CardTitle>Recent System Logs</CardTitle>
                <CardDescription>Latest system events and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Database backup completed</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">High memory usage detected</p>
                      <p className="text-xs text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Settings className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">System configuration updated</p>
                      <p className="text-xs text-muted-foreground">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Security Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Overview
                  </CardTitle>
                  <CardDescription>Current security status and threats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-xs text-muted-foreground">Active Threats</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <div className="text-xs text-muted-foreground">Secure Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">98%</div>
                      <div className="text-xs text-muted-foreground">2FA Adoption</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">24</div>
                      <div className="text-xs text-muted-foreground">Failed Logins (24h)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Access Control */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Access Control
                  </CardTitle>
                  <CardDescription>User permissions and roles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Super Admins</span>
                      <Badge variant="destructive">2</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Admins</span>
                      <Badge variant="default">5</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Regular Users</span>
                      <Badge variant="secondary">1,240</Badge>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Shield className="mr-2 h-4 w-4" />
                    Manage Permissions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>System performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Response Time</span>
                      <span className="font-medium">245ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Requests per Second</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Error Rate</span>
                      <span className="font-medium text-green-600">0.01%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cache Hit Rate</span>
                      <span className="font-medium">94.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Database Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Database Performance
                  </CardTitle>
                  <CardDescription>Database health and query performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Connection Pool</span>
                      <span className="font-medium">95% utilized</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Slow Queries</span>
                      <span className="font-medium text-yellow-600">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Index Usage</span>
                      <span className="font-medium text-green-600">98.5%</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Optimize Database
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Backup Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5" />
                    Backup Status
                  </CardTitle>
                  <CardDescription>System backup and recovery</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">Last backup: 2 hours ago</p>
                    <p className="text-xs text-muted-foreground">Automated daily backups</p>
                  </div>
                  <Button className="w-full" variant="outline">
                    <HardDrive className="mr-2 h-4 w-4" />
                    Manual Backup
                  </Button>
                </CardContent>
              </Card>

              {/* System Updates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    System Updates
                  </CardTitle>
                  <CardDescription>Available updates and patches</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                    <p className="text-sm font-medium">3 updates available</p>
                    <p className="text-xs text-muted-foreground">Security patches included</p>
                  </div>
                  <Button className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    Install Updates
                  </Button>
                </CardContent>
              </Card>

              {/* Maintenance Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Maintenance
                  </CardTitle>
                  <CardDescription>Scheduled maintenance tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Cache Cleanup</span>
                      <Badge variant="secondary">Scheduled</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Log Rotation</span>
                      <Badge variant="secondary">Running</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Index Optimization</span>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    Run Maintenance
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </EnhancedAdminLayout>
  );
}
