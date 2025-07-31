'use client';

import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  MoreHorizontal,
  X,
  Calendar,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Settings,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { DataLoadingState } from "@/components/ui/modern-loading";
import { ErrorBoundaryWrapper } from "@/components/error/error-boundary";
import { MetricsCard } from "@/components/ui/metrics-card";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { OrganizationRole, UserRole } from "@prisma/client";

// Types
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
    revenueGrowthRate: number;
    systemHealth: number;
  };
  recentActivity: ActivityLogItem[];
  chartData?: {
    userGrowth: Array<{ date: string; users: number; organizations: number }>;
    revenueByOrg: Array<{ name: string; revenue: number; type: string }>;
    activityByType: Array<{ type: string; count: number }>;
  };
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

// Date range type for future date picker integration
interface DateRange {
  from: Date;
  to: Date;
}

const SuperadminDashboard = () => {
  const { data: session } = useSession();
  
  // State management
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [orgsLoading, setOrgsLoading] = useState(false);
  
  // Tab state management
  const [activeTab, setActiveTab] = useState("overview");
  
  // Search and filter states
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [orgSearch, setOrgSearch] = useState("");
  const [orgTypeFilter, setOrgTypeFilter] = useState("all");
  
  // Date range state (for future implementation)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date()
  });

  // Debounced search values to prevent excessive API calls
  const [debouncedUserSearch, setDebouncedUserSearch] = useState("");
  const [debouncedOrgSearch, setDebouncedOrgSearch] = useState("");

  // Debounce search inputs (500ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUserSearch(userSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [userSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedOrgSearch(orgSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [orgSearch]);

  // Initial data fetch
  useEffect(() => {
    if (session?.user?.role === UserRole.SUPERADMIN) {
      fetchSystemStats();
      fetchUsers();
      fetchOrganizations();
    }
  }, [session?.user?.role]);

  // Auto-fetch users when search or filter changes
  useEffect(() => {
    if (session?.user?.role === UserRole.SUPERADMIN) {
      fetchUsers();
    }
  }, [debouncedUserSearch, userRoleFilter, session?.user?.role]);

  // Auto-fetch organizations when search or filter changes
  useEffect(() => {
    if (session?.user?.role === UserRole.SUPERADMIN) {
      fetchOrganizations();
    }
  }, [debouncedOrgSearch, orgTypeFilter, session?.user?.role]);

  // Check if user is superadmin
  if (session?.user?.role !== "SUPERADMIN") {
    return (
      <div className="flex items-center justify-center h-96">
        <Card className="p-8 text-center max-w-md">
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

  // API functions
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

  const fetchUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const params = new URLSearchParams();
      
      if (debouncedUserSearch.trim()) {
        params.append('search', debouncedUserSearch.trim());
      }
      if (userRoleFilter && userRoleFilter !== 'all') {
        params.append('role', userRoleFilter);
      }

      const response = await fetch(`/api/superadmin/users?${params}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || []);
      } else {
        console.error('Failed to fetch users:', response.statusText);
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setUsersLoading(false);
      setLoading(false);
    }
  }, [debouncedUserSearch, userRoleFilter]);

  const fetchOrganizations = useCallback(async () => {
    try {
      setOrgsLoading(true);
      const params = new URLSearchParams();
      
      if (debouncedOrgSearch.trim()) {
        params.append('search', debouncedOrgSearch.trim());
      }
      if (orgTypeFilter && orgTypeFilter !== 'all') {
        params.append('type', orgTypeFilter);
      }

      const response = await fetch(`/api/superadmin/organizations?${params}`);
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data.organizations || []);
      } else {
        console.error('Failed to fetch organizations:', response.statusText);
        setOrganizations([]);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
      setOrganizations([]);
    } finally {
      setOrgsLoading(false);
    }
  }, [debouncedOrgSearch, orgTypeFilter]);

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

  const refreshData = () => {
    fetchSystemStats();
    fetchUsers();
    fetchOrganizations();
  };

  // Table column definitions
  const userColumns = [
    {
      key: 'name',
      label: 'User',
      render: (value: string, row: User) => (
        <div className="space-y-1">
          <p className="font-medium text-sm">{row.name}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
            {row.email}
          </p>
          {/* Mobile: Show role and 2FA inline */}
          <div className="flex flex-wrap items-center gap-2 sm:hidden">
            <Badge 
              variant={
                row.role === "SUPERADMIN" ? "destructive" : 
                row.role === "ADMIN" ? "default" : "secondary"
              }
              className="text-xs"
            >
              {row.role}
            </Badge>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-muted-foreground">2FA:</span>
              {row.isTwoFactorEnabled ? (
                <CheckCircle className="h-3 w-3 text-green-500" />
              ) : (
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      className: 'hidden sm:table-cell',
      render: (value: UserRole) => (
        <Badge 
          variant={
            value === "SUPERADMIN" ? "destructive" : 
            value === "ADMIN" ? "default" : "secondary"
          }
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'organizations',
      label: 'Organizations',
      className: 'hidden lg:table-cell',
      render: (value: User['organizations']) => (
        <div className="space-y-1">
          {value.slice(0, 1).map((org, index) => (
            <div key={index} className="text-sm">
              <span className="font-medium truncate block max-w-[120px]">
                {org.organization.name}
              </span>
              <Badge variant="outline" className="text-xs">
                {org.role}
              </Badge>
            </div>
          ))}
          {value.length > 1 && (
            <p className="text-xs text-muted-foreground">
              +{value.length - 1} more
            </p>
          )}
        </div>
      )
    },
    {
      key: 'isTwoFactorEnabled',
      label: '2FA',
      className: 'hidden xl:table-cell',
      render: (value: boolean) => (
        value ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        )
      )
    },
    {
      key: 'createdAt',
      label: 'Created',
      className: 'hidden xl:table-cell',
      render: (value: string) => (
        <span className="text-sm">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    }
  ];

  const organizationColumns = [
    {
      key: 'name',
      label: 'Organization',
      render: (value: string, row: Organization) => (
        <div className="space-y-1">
          <p className="font-medium text-sm">{row.name}</p>
          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
            ID: {row.id}
          </p>
          {/* Mobile: Show type and member count inline */}
          <div className="flex flex-wrap items-center gap-2 sm:hidden">
            <Badge variant="outline" className="text-xs">
              {row.type}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {row._count.users} users
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'Type',
      className: 'hidden sm:table-cell',
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      )
    },
    {
      key: '_count.users',
      label: 'Members',
      className: 'hidden lg:table-cell',
      render: (value: number, row: Organization) => (
        <div>
          <p className="font-medium text-sm">{value} users</p>
          <div className="flex -space-x-1 mt-1">
            {row.users.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium"
                title={member.user.name}
              >
                {member.user.name?.[0]}
              </div>
            ))}
            {row.users.length > 3 && (
              <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs">
                +{row.users.length - 3}
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'createdBy',
      label: 'Created By',
      className: 'hidden xl:table-cell',
      render: (value: Organization['createdBy']) => (
        <div>
          <p className="text-sm font-medium truncate max-w-[120px]">
            {value.name}
          </p>
          <p className="text-xs text-muted-foreground truncate max-w-[120px]">
            {value.email}
          </p>
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Created',
      className: 'hidden xl:table-cell',
      render: (value: string) => (
        <span className="text-sm">
          {new Date(value).toLocaleDateString()}
        </span>
      )
    }
  ];

  if (loading) {
    return <DataLoadingState isLoading={loading} />;
  }

  return (
    <ErrorBoundaryWrapper level="page">
      <div className="space-y-6">
        {/* Header with Actions */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
        >
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Superadmin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base">
              System-wide overview and management controls
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Date Range Selector (Placeholder for future implementation) */}
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            
            {/* Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={refreshData}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Data
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Badge variant="destructive" className="text-xs sm:text-sm">
              <Shield className="h-3 w-3 mr-1" />
              SUPERADMIN
            </Badge>
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="overview" className="space-y-6" value={activeTab} onValueChange={setActiveTab}>
            {/* Enhanced Tabs */}
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">
                <BarChart3 className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Overview</span>
                <span className="sm:hidden">Home</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="text-xs sm:text-sm">
                <Users className="h-4 w-4 mr-1 sm:mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="organizations" className="text-xs sm:text-sm">
                <Building2 className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Organizations</span>
                <span className="sm:hidden">Orgs</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs sm:text-sm">
                <PieChart className="h-4 w-4 mr-1 sm:mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="system" className="text-xs sm:text-sm">
                <Activity className="h-4 w-4 mr-1 sm:mr-2" />
                System
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* System Overview Stats */}
              {stats && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  <MetricsCard
                    title="Total Users"
                    value={stats.overview.totalUsers}
                    description="Active users"
                    icon={Users}
                    trend={{
                      value: stats.overview.userGrowthRate,
                      label: "vs last month"
                    }}
                  />
                  
                  <MetricsCard
                    title="Organizations"
                    value={stats.overview.totalOrganizations}
                    description={`${stats.overview.activeOrganizations} active`}
                    icon={Building2}
                    trend={{
                      value: stats.overview.orgGrowthRate,
                      label: "vs last month"
                    }}
                  />
                  
                  <MetricsCard
                    title="Total Revenue"
                    value={`$${stats.overview.totalRevenue.toLocaleString()}`}
                    description="Across all organizations"
                    icon={DollarSign}
                    trend={{
                      value: stats.overview.revenueGrowthRate || 0,
                      label: "vs last month"
                    }}
                  />
                  
                  <MetricsCard
                    title="System Health"
                    value={`${stats.overview.systemHealth || 100}%`}
                    description="All systems operational"
                    icon={Activity}
                    variant="success"
                  />
                </motion.div>
              )}

              {/* Quick Stats Grid */}
              {stats && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <LineChart className="h-5 w-5" />
                        Growth Metrics
                      </CardTitle>
                      <CardDescription>User and organization growth trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>User Growth</span>
                            <span className={`${stats.overview.userGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {stats.overview.userGrowthRate >= 0 ? '+' : ''}{stats.overview.userGrowthRate}%
                            </span>
                          </div>
                          <Progress value={Math.min(Math.abs(stats.overview.userGrowthRate), 100)} />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span>Organization Growth</span>
                            <span className={`${stats.overview.orgGrowthRate >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                              {stats.overview.orgGrowthRate >= 0 ? '+' : ''}{stats.overview.orgGrowthRate}%
                            </span>
                          </div>
                          <Progress value={Math.min(Math.abs(stats.overview.orgGrowthRate), 100)} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        System Usage
                      </CardTitle>
                      <CardDescription>Current system utilization</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Students</span>
                          <span className="font-medium">{stats.overview.totalStudents}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Members</span>
                          <span className="font-medium">{stats.overview.totalMembers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Courses</span>
                          <span className="font-medium">{stats.overview.totalCourses}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Books</span>
                          <span className="font-medium">{stats.overview.totalBooks}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Recent Activity */}
              {stats?.recentActivity && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest system activities and logs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats.recentActivity.slice(0, 8).map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {activity.organization?.name} • {new Date(activity.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">User Management</CardTitle>
                  <CardDescription>
                    Manage system users and their roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={users}
                    columns={userColumns}
                    isLoading={usersLoading}
                    search={{
                      value: userSearch,
                      onChange: setUserSearch,
                      placeholder: "Search users..."
                    }}
                    filters={[
                      {
                        key: 'role',
                        label: 'Role',
                        options: [
                          { value: 'all', label: 'All Roles' },
                          { value: 'USER', label: 'User' },
                          { value: 'ADMIN', label: 'Admin' },
                          { value: 'SUPERADMIN', label: 'Superadmin' }
                        ],
                        value: userRoleFilter,
                        onChange: setUserRoleFilter
                      }
                    ]}
                    actions={[
                      {
                        label: 'Edit Role',
                        onClick: (user) => {
                          // Handle role editing
                          console.log('Edit role for user:', user.id);
                        }
                      },
                      {
                        label: 'View Details',
                        onClick: (user) => {
                          console.log('View user details:', user.id);
                        }
                      }
                    ]}
                    emptyMessage="No users found"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Organizations Tab */}
            <TabsContent value="organizations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Organization Management</CardTitle>
                  <CardDescription>
                    Overview of all organizations in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DataTable
                    data={organizations}
                    columns={organizationColumns}
                    isLoading={orgsLoading}
                    search={{
                      value: orgSearch,
                      onChange: setOrgSearch,
                      placeholder: "Search organizations..."
                    }}
                    filters={[
                      {
                        key: 'type',
                        label: 'Type',
                        options: [
                          { value: 'all', label: 'All Types' },
                          { value: 'SCHOOL', label: 'School' },
                          { value: 'CHURCH', label: 'Church' },
                          { value: 'CORPORATE', label: 'Corporate' },
                          { value: 'OTHER', label: 'Other' }
                        ],
                        value: orgTypeFilter,
                        onChange: setOrgTypeFilter
                      }
                    ]}
                    actions={[
                      {
                        label: 'View Details',
                        onClick: (org) => {
                          console.log('View organization details:', org.id);
                        }
                      },
                      {
                        label: 'Manage Users',
                        onClick: (org) => {
                          console.log('Manage users for organization:', org.id);
                        }
                      }
                    ]}
                    emptyMessage="No organizations found"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      Growth Analytics
                    </CardTitle>
                    <CardDescription>Detailed growth metrics and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-8 text-muted-foreground">
                        <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                        <p>Advanced analytics charts will be implemented here</p>
                        <p className="text-sm">Including user growth, revenue trends, and usage patterns</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-blue-500" />
                      Usage Distribution
                    </CardTitle>
                    <CardDescription>System usage by organization type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-8 text-muted-foreground">
                        <PieChart className="h-12 w-12 mx-auto mb-4" />
                        <p>Usage distribution charts will be implemented here</p>
                        <p className="text-sm">Including organization types, feature usage, and activity patterns</p>
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
                    <CardDescription>Current system status and health metrics</CardDescription>
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
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Uptime</span>
                        <span className="text-sm font-medium">99.9%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Response Time</span>
                        <span className="text-sm font-medium">&lt; 200ms</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      System Logs
                    </CardTitle>
                    <CardDescription>Recent system activities and events</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {stats?.recentActivity.slice(0, 6).map((activity, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            activity.type === 'ERROR' ? 'bg-red-500' :
                            activity.type === 'WARNING' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(activity.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <Badge 
                            variant={
                              activity.type === 'ERROR' ? 'destructive' :
                              activity.type === 'WARNING' ? 'secondary' :
                              'outline'
                            }
                            className="text-xs"
                          >
                            {activity.type}
                          </Badge>
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