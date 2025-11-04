/**
 * User Management MVP Components
 *
 * Core React components for user CRUD operations (add, edit, update, remove users) using shadcn/ui
 */

'use client';

import React, { useState, useEffect } from 'react';
import { User, CreateUserData, UpdateUserData, UserFilters, UserRole } from './types';
import { getUsers, createUser, updateUser, deleteUser } from './api';

// shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, UserPlus, Edit, Trash2, Search, Filter, User as UserIcon, Mail, Shield, MoreHorizontal, Menu, Users, Settings, UserCheck } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const tabs = [
  { id: "users", label: "Users", icon: Users },
  { id: "roles", label: "Roles", icon: Shield },
  { id: "settings", label: "Settings", icon: Settings },
]

interface UserManagementProps {
  onUserUpdate?: () => void;
}

export function UserManagement({ onUserUpdate }: UserManagementProps) {
  const [activeTab, setActiveTab] = useState("users")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentTab = tabs.find((tab) => tab.id === activeTab)

  // Mobile Navigation Component
  const MobileNavigation = () => (
    <div className="md:hidden">
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Menu className="h-4 w-4 mr-2" />
            {currentTab?.label}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="space-y-2 mt-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab(tab.id)
                    setMobileMenuOpen(false)
                  }}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="w-full px-4 py-4 md:px-6 md:py-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Manage system users, roles, and permissions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 py-4 md:px-6 md:py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <MobileNavigation />

          {/* Settings Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
            {/* Desktop Tabs */}
            <TabsList className="hidden md:grid w-full grid-cols-3">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4 md:space-y-6 mt-0">
              <UsersTab onUserUpdate={onUserUpdate} />
            </TabsContent>

            {/* Roles Tab */}
            <TabsContent value="roles" className="space-y-4 md:space-y-6 mt-0">
              <RolesTab />
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4 md:space-y-6 mt-0">
              <UserManagementSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Users Tab Component
function UsersTab({ onUserUpdate }: { onUserUpdate?: () => void }) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    console.log('🔄 useEffect triggered with filters:', filters, 'searchTerm:', searchTerm);
    console.log('🔄 Current filters state:', JSON.stringify(filters, null, 2));
    loadUsers();
  }, [filters, searchTerm]);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('🔍 Loading users with filters:', { ...filters, search: searchTerm || undefined });
      const response = await getUsers({ ...filters, search: searchTerm || undefined });
      console.log('🔍 Users response:', response.users.length, 'users');
      setUsers(response.users);
    } catch (err) {
      console.error('❌ Error loading users:', err);
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (data: CreateUserData) => {
    try {
      await createUser(data);
      setIsCreateDialogOpen(false);
      loadUsers();
      onUserUpdate?.();
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  const handleUpdateUser = async (data: UpdateUserData) => {
    if (!editingUser) return;
    try {
      await updateUser(editingUser.id, data);
      setEditingUser(null);
      loadUsers();
      onUserUpdate?.();
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      loadUsers();
      onUserUpdate?.();
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;

    try {
      for (const userId of selectedUsers) {
        await deleteUser(userId);
      }
      setSelectedUsers([]);
      loadUsers();
      onUserUpdate?.();
    } catch (err) {
      console.error('Failed to delete users:', err);
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPERADMIN:
        return 'destructive';
      case UserRole.ADMIN:
        return 'default';
      case UserRole.USER:
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">Users</h2>
          <p className="text-sm text-muted-foreground">Manage system users and their permissions</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {selectedUsers.length > 0 && (
            <Button variant="destructive" onClick={handleBulkDelete} className="w-full sm:w-auto">
              <Trash2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Delete Selected ({selectedUsers.length})</span>
              <span className="sm:hidden">Delete ({selectedUsers.length})</span>
            </Button>
          )}
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-[500px] mx-4">
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Add a new user to the system with appropriate permissions.
                </DialogDescription>
              </DialogHeader>
              <CreateUserForm onSubmit={handleCreateUser} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  onKeyDown={(e) => e.key === 'Enter' && loadUsers()}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select
                value={filters.role || 'all'}
                onValueChange={(value) => {
                  console.log('🎯 Role filter changed:', value);
                  const newRole = value === 'all' ? undefined : value as UserRole;
                  console.log('🎯 Setting role to:', newRole);
                  setFilters(prev => ({ ...prev, role: newRole }));
                }}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value={UserRole.USER}>User</SelectItem>
                  <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                  <SelectItem value={UserRole.SUPERADMIN}>Super Admin</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.isActive === undefined ? 'all' : filters.isActive.toString()}
                onValueChange={(value) => {
                  console.log('🎯 Status filter changed:', value);
                  const newIsActive = value === 'all' ? undefined : value === 'true' ? true : false;
                  console.log('🎯 Setting isActive to:', newIsActive);
                  setFilters(prev => ({
                    ...prev,
                    isActive: newIsActive
                  }));
                }}
              >
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="pt-4 px-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading users...</span>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedUsers.length === users.length && users.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedUsers(users.map(u => u.id));
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead className="min-w-[140px]">Name</TableHead>
                    <TableHead className="min-w-[180px] hidden md:table-cell">Email</TableHead>
                    <TableHead className="min-w-[90px] hidden md:table-cell">Role</TableHead>
                    <TableHead className="min-w-[85px] hidden sm:table-cell">Status</TableHead>
                    <TableHead className="min-w-[110px] hidden lg:table-cell">Created</TableHead>
                    <TableHead className="w-12">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => toggleUserSelection(user.id)}
                        />
                      </TableCell>
                      <TableCell className="max-w-0">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 flex-shrink-0 hidden sm:flex">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-xs">
                              {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : user.email[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1 overflow-hidden">
                            <p className="font-medium truncate" title={user.name || 'No name'}>{user.name || 'No name'}</p>
                            <p className="text-sm text-muted-foreground truncate md:hidden" title={user.email}>{user.email}</p>
                            <div className="md:hidden mt-1">
                              <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs mr-2">
                                {user.role}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={user.isActive ? 'default' : 'secondary'} className="text-xs">
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setEditingUser(user)} className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-destructive flex items-center gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          {editingUser && (
            <UpdateUserForm
              user={editingUser}
              onSubmit={handleUpdateUser}
              onCancel={() => setEditingUser(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Roles Tab Component
function RolesTab() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-semibold">Roles & Permissions</h2>
        <p className="text-sm text-muted-foreground">Manage user roles and their associated permissions</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Roles Management</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Configure user roles and permissions for your organization.
            </p>
            <p className="text-xs text-muted-foreground">
              This feature is coming soon. Currently using default role system.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Settings Tab Component
function UserManagementSettings() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-semibold">User Management Settings</h2>
        <p className="text-sm text-muted-foreground">Configure user management preferences and defaults</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Management Settings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Configure default settings for user management operations.
            </p>
            <p className="text-xs text-muted-foreground">
              This feature is coming soon. Currently using default settings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface CreateUserFormProps {
  onSubmit: (data: CreateUserData) => Promise<void>;
  onCancel?: () => void;
}

function CreateUserForm({ onSubmit, onCancel }: CreateUserFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: UserRole.USER,
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await onSubmit(formData);
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : 'Operation failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter full name"
          required
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Enter email address"
          required
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="text-sm font-medium">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as UserRole }))}
        >
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={UserRole.USER}>User</SelectItem>
            <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
            <SelectItem value={UserRole.SUPERADMIN}>Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 py-2">
        <Checkbox
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: !!checked }))}
        />
        <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">Active user</Label>
      </div>

      {errors.general && (
        <Alert variant="destructive">
          <AlertDescription className="text-sm">{errors.general}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Create User
        </Button>
      </div>
    </form>
  );
}

interface UpdateUserFormProps {
  user: User;
  onSubmit: (data: UpdateUserData) => Promise<void>;
  onCancel?: () => void;
}

function UpdateUserForm({ user, onSubmit, onCancel }: UpdateUserFormProps) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    role: user.role,
    isActive: user.isActive,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await onSubmit(formData);
    } catch (err) {
      setErrors({ general: err instanceof Error ? err.message : 'Operation failed' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Enter full name"
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role" className="text-sm font-medium">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as UserRole }))}
        >
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={UserRole.USER}>User</SelectItem>
            <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
            <SelectItem value={UserRole.SUPERADMIN}>Super Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 py-2">
        <Checkbox
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: !!checked }))}
        />
        <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">Active user</Label>
      </div>

      {errors.general && (
        <Alert variant="destructive">
          <AlertDescription className="text-sm">{errors.general}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
          Update User
        </Button>
      </div>
    </form>
  );
}
