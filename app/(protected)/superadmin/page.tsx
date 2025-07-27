'use client';

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Users, 
  Building2, 
  DollarSign,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  MoreHorizontal
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { DataLoadingState } from "@/components/ui/modern-loading";
import { ErrorBoundaryWrapper } from "@/components/error/error-boundary";
import { OrganizationRole, UserRole } from "@prisma/client";

interface ActivityLogItem {
  id: string;
  name: string;
  message: string;
  type: string;
  createdAt: string;
  organization?: {
    name: string;
  } | null;
}

interface SystemStats {
  overview: {
    totalUsers: number;
    totalOrganizations: number;
    activeOrganizations: number;
    totalStudents: number;
    totalMembers: number;
    totalCourses: number;
    totalBooks: number;
    totalRevenue: number;
    recentSignups: number;
    userGrowthRate: number;
    orgGrowthRate: number;
  };
  recentActivity: ActivityLogItem[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  isTwoFactorEnabled: boolean;
  organizations: {
    role: OrganizationRole;
    organization: {
      id: string;
      name: string;
      type: string;
    };
  }[];
}

interface Organization {
  id: string;
  name: string;
  type: string;
  createdAt: string;
  _count: {
    users: number;
  };
  createdBy: {
    name: string;
    email: string;
  };
  users: {
    role: string;
    user: {
      name: string;
      email: string;
    };
  }[];
}

const SuperadminDashboard = () => {
  const { data: session } = useSession();
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("");
  const [orgTypeFilter, setOrgTypeFilter] = useState("");

  useEffect(() => {
    if (session?.user?.role === UserRole.SUPERADMIN) {
      fetchSystemStats();
      fetchUsers();
      fetchOrganizations();
    }
  }, [session?.user?.role]);

  // Check if user is superadmin
  if (session?.user?.role !== "SUPERADMIN") {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-8 text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-red-500" />
            </div>
            <CardTitle className="text-red-600">Access Denied</CardTitle>
            <CardDescription>
              You need superadmin privileges to access this dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const fetchSystemStats = async () => {
    try {
      const response = await fetch('/api/superadmin/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching system stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const params = new URLSearchParams();
      if (userSearch) params.append('search', userSearch);
      if (userRoleFilter) params.append('role', userRoleFilter);

      const response = await fetch(`/api/superadmin/users?${params}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrganizations = async () => {
    try {
      const params = new URLSearchParams();
      if (orgTypeFilter) params.append('type', orgTypeFilter);

      const response = await fetch(`/api/superadmin/organizations?${params}`);
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data.organizations);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/superadmin/users/${userId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });

      if (response.ok) {
        fetchUsers(); // Refresh users list
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  if (loading) {
    return <DataLoadingState isLoading={loading}  />;
  }

  return (
    <ErrorBoundaryWrapper level="page">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Superadmin Dashboard</h1>
            <p className="text-muted-foreground">
              System-wide overview and management controls
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <Badge variant="destructive" className="text-sm">
              <Shield className="h-3 w-3 mr-1" />
              SUPERADMIN
            </Badge>
          </div>
        </motion.div>

        {/* System Overview Stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.overview.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={`${stats.overview.userGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.overview.userGrowthRate >= 0 ? '+' : ''}{stats.overview.userGrowthRate}%
                  </span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Organizations</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.overview.totalOrganizations}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.overview.activeOrganizations} active this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.overview.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across all organizations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Healthy</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  All systems operational
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>
                        Manage system users and their roles
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
                          className="pl-8 w-64"
                        />
                      </div>
                      <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All Roles</SelectItem>
                          <SelectItem value="USER">User</SelectItem>
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="SUPERADMIN">Superadmin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={fetchUsers} variant="outline">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Organizations</TableHead>
                        <TableHead>2FA</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                user.role === "SUPERADMIN" ? "destructive" : 
                                user.role === "ADMIN" ? "default" : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {user.organizations.slice(0, 2).map((org, index) => (
                                <div key={index} className="text-sm">
                                  <span className="font-medium">{org.organization.name}</span>
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    {org.role}
                                  </Badge>
                                </div>
                              ))}
                              {user.organizations.length > 2 && (
                                <p className="text-xs text-muted-foreground">
                                  +{user.organizations.length - 2} more
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {user.isTwoFactorEnabled ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            )}
                          </TableCell>
                          <TableCell>
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={user.role}
                              onValueChange={(value) => updateUserRole(user.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USER">User</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                                <SelectItem value="SUPERADMIN">Superadmin</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Organizations Tab */}
            <TabsContent value="organizations" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div>
                      <CardTitle>Organization Management</CardTitle>
                      <CardDescription>
                        Overview of all organizations in the system
                      </CardDescription>
                    </div>
                    <Select value={orgTypeFilter} onValueChange={setOrgTypeFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="All Types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Types</SelectItem>
                        <SelectItem value="SCHOOL">School</SelectItem>
                        <SelectItem value="CHURCH">Church</SelectItem>
                        <SelectItem value="CORPORATE">Corporate</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Organization</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {organizations.map((org) => (
                        <TableRow key={org.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{org.name}</p>
                              <p className="text-xs text-muted-foreground">ID: {org.id}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{org.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{org._count.users} users</p>
                              <div className="flex -space-x-1 mt-1">
                                {org.users.slice(0, 3).map((member, index) => (
                                  <div
                                    key={index}
                                    className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium"
                                    title={member.user.name}
                                  >
                                    {member.user.name?.[0]}
                                  </div>
                                ))}
                                {org.users.length > 3 && (
                                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs">
                                    +{org.users.length - 3}
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm font-medium">{org.createdBy.name}</p>
                              <p className="text-xs text-muted-foreground">{org.createdBy.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(org.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Growth Metrics</CardTitle>
                    <CardDescription>User and organization growth trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>User Growth</span>
                          <span className="text-green-600">+{stats?.overview.userGrowthRate}%</span>
                        </div>
                        <Progress value={Math.min(Math.abs(stats?.overview.userGrowthRate || 0), 100)} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Organization Growth</span>
                          <span className="text-blue-600">+{stats?.overview.orgGrowthRate}%</span>
                        </div>
                        <Progress value={Math.min(Math.abs(stats?.overview.orgGrowthRate || 0), 100)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Usage</CardTitle>
                    <CardDescription>Current system utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Students</span>
                        <span className="font-medium">{stats?.overview.totalStudents}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Members</span>
                        <span className="font-medium">{stats?.overview.totalMembers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Courses</span>
                        <span className="font-medium">{stats?.overview.totalCourses}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Books</span>
                        <span className="font-medium">{stats?.overview.totalBooks}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* System Tab */}
            <TabsContent value="system" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      System Health
                    </CardTitle>
                    <CardDescription>Current system status and health</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Database</span>
                        <Badge variant="default" className="bg-green-500">Healthy</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">API Services</span>
                        <Badge variant="default" className="bg-green-500">Operational</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Authentication</span>
                        <Badge variant="default" className="bg-green-500">Active</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Storage</span>
                        <Badge variant="default" className="bg-green-500">Available</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest system activities and logs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats?.recentActivity.slice(0, 5).map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.organization?.name} • {new Date(activity.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </ErrorBoundaryWrapper>
  );
};

export default SuperadminDashboard;
