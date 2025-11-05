"use client";

import React, { useState } from "react";
import { EnhancedAdminLayout } from "@/components/admin-panel/enhanced-admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Users,
  UserCheck,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Crown,
  Key,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Save,
} from "lucide-react";
import { mockUsers } from "@/data/user-management/mock-users";
import { toast } from "sonner";

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  color: string;
  isSystem: boolean;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "1",
      name: "Super Admin",
      description: "Full system access with all permissions",
      permissions: ["all"],
      userCount: 1,
      color: "destructive",
      isSystem: true,
    },
    {
      id: "2",
      name: "Admin",
      description: "Administrative access to most features",
      permissions: ["users.manage", "content.manage", "analytics.view"],
      userCount: 2,
      color: "default",
      isSystem: true,
    },
    {
      id: "3",
      name: "User",
      description: "Standard user access",
      permissions: ["profile.edit", "content.view"],
      userCount: 5,
      color: "secondary",
      isSystem: true,
    },
    {
      id: "4",
      name: "Developer",
      description: "Development team access",
      permissions: ["api.access", "logs.view", "settings.developer"],
      userCount: 0,
      color: "outline",
      isSystem: false,
    },
  ]);

  const [permissions] = useState<Permission[]>([
    { id: "users.manage", name: "Manage Users", description: "Create, edit, and delete users", category: "Users" },
    { id: "users.view", name: "View Users", description: "View user profiles and information", category: "Users" },
    { id: "content.manage", name: "Manage Content", description: "Create and edit content", category: "Content" },
    { id: "content.view", name: "View Content", description: "View content and media", category: "Content" },
    { id: "analytics.view", name: "View Analytics", description: "Access analytics and reports", category: "Analytics" },
    { id: "settings.system", name: "System Settings", description: "Modify system configuration", category: "Settings" },
    { id: "settings.developer", name: "Developer Settings", description: "Access developer tools", category: "Settings" },
    { id: "api.access", name: "API Access", description: "Access system APIs", category: "API" },
    { id: "logs.view", name: "View Logs", description: "Access system logs", category: "System" },
    { id: "profile.edit", name: "Edit Profile", description: "Modify own profile", category: "Profile" },
  ]);

  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleCreateRole = (roleData: any) => {
    const newRole: Role = {
      id: Date.now().toString(),
      name: roleData.name,
      description: roleData.description,
      permissions: selectedPermissions,
      userCount: 0,
      color: "outline",
      isSystem: false,
    };

    setRoles(prev => [...prev, newRole]);
    toast.success("Role created successfully!");
    setIsCreateRoleOpen(false);
    setSelectedPermissions([]);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isSystem) {
      toast.error("Cannot delete system roles");
      return;
    }

    if (role?.userCount && role.userCount > 0) {
      toast.error("Cannot delete role with assigned users");
      return;
    }

    setRoles(prev => prev.filter(r => r.id !== roleId));
    toast.success("Role deleted successfully!");
  };

  const getPermissionCategories = () => {
    const categories = [...new Set(permissions.map(p => p.category))];
    return categories;
  };

  const getPermissionsByCategory = (category: string) => {
    return permissions.filter(p => p.category === category);
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  return (
    <EnhancedAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Roles & Permissions</h1>
            <p className="text-muted-foreground">
              Manage user roles and their associated permissions.
            </p>
          </div>
          <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>
                  Define a new role with specific permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role-name" className="text-right">Name</Label>
                  <Input id="role-name" placeholder="Role name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="role-description" className="text-right pt-2">Description</Label>
                  <Textarea
                    id="role-description"
                    placeholder="Role description..."
                    className="col-span-3"
                    rows={3}
                  />
                </div>

                {/* Permissions Selection */}
                <div className="space-y-4">
                  <Label>Permissions</Label>
                  <div className="border rounded-lg p-4 max-h-64 overflow-y-auto">
                    {getPermissionCategories().map((category) => (
                      <div key={category} className="mb-4 last:mb-0">
                        <h4 className="font-medium text-sm mb-2 text-muted-foreground uppercase tracking-wide">
                          {category}
                        </h4>
                        <div className="space-y-2 ml-4">
                          {getPermissionsByCategory(category).map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-3">
                              <Checkbox
                                id={`perm-${permission.id}`}
                                checked={selectedPermissions.includes(permission.id)}
                                onCheckedChange={() => togglePermission(permission.id)}
                              />
                              <div className="flex-1">
                                <Label
                                  htmlFor={`perm-${permission.id}`}
                                  className="text-sm font-medium cursor-pointer"
                                >
                                  {permission.name}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => handleCreateRole({
                  name: "New Role",
                  description: "Custom role description"
                })}>
                  <Save className="mr-2 h-4 w-4" />
                  Create Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roles.length}</div>
              <p className="text-xs text-muted-foreground">Active role definitions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Roles</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {roles.filter(r => r.isSystem).length}
              </div>
              <p className="text-xs text-muted-foreground">Built-in system roles</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {roles.filter(r => !r.isSystem).length}
              </div>
              <p className="text-xs text-muted-foreground">User-defined roles</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Permissions</CardTitle>
              <Key className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{permissions.length}</div>
              <p className="text-xs text-muted-foreground">Available permissions</p>
            </CardContent>
          </Card>
        </div>

        {/* Roles Table */}
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>
              View and manage all user roles and their permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={role.color as any}>
                          {role.name}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">{role.description}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {role.userCount} user{role.userCount !== 1 ? 's' : ''}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary">
                          {role.permissions.includes("all")
                            ? "All Permissions"
                            : `${role.permissions.length} permissions`}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {role.isSystem ? (
                        <Badge variant="default">
                          <Crown className="mr-1 h-3 w-3" />
                          System
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <Settings className="mr-1 h-3 w-3" />
                          Custom
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {!role.isSystem && role.userCount === 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteRole(role.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Permissions Overview */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Permission Categories</CardTitle>
              <CardDescription>Available permission groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getPermissionCategories().map((category) => (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category}</span>
                    <Badge variant="outline">
                      {getPermissionsByCategory(category).length}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Distribution</CardTitle>
              <CardDescription>How users are distributed across roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{role.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${role.userCount > 0 ? (role.userCount / mockUsers.length) * 100 : 0}%`
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">
                        {role.userCount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common role and permission management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Shield className="h-6 w-6" />
                <span className="text-sm">Audit Roles</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Bulk Assign</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Key className="h-6 w-6" />
                <span className="text-sm">Permission Matrix</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Settings className="h-6 w-6" />
                <span className="text-sm">Access Control</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </EnhancedAdminLayout>
  );
}
