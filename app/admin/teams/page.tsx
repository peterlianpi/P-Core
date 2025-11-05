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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users,
  UserPlus,
  Search,
  Plus,
  Edit,
  Trash2,
  Crown,
  Shield,
  UserCheck,
  Settings,
} from "lucide-react";
import { mockUsers } from "@/data/user-management/mock-users";
import { toast } from "sonner";

interface Team {
  id: string;
  name: string;
  description: string;
  leader: string;
  members: string[];
  createdAt: Date;
  status: "active" | "inactive";
}

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "1",
      name: "Development Team",
      description: "Core development and engineering team",
      leader: "user-1",
      members: ["user-1", "user-2", "user-3"],
      createdAt: new Date("2024-01-15"),
      status: "active",
    },
    {
      id: "2",
      name: "Design Team",
      description: "UI/UX design and creative team",
      leader: "user-4",
      members: ["user-4", "user-5"],
      createdAt: new Date("2024-02-01"),
      status: "active",
    },
    {
      id: "3",
      name: "Operations Team",
      description: "System operations and maintenance",
      leader: "user-6",
      members: ["user-6", "user-7"],
      createdAt: new Date("2024-03-10"),
      status: "active",
    },
  ]);

  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleCreateTeam = (teamData: any) => {
    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamData.name,
      description: teamData.description,
      leader: teamData.leader,
      members: selectedMembers,
      createdAt: new Date(),
      status: "active",
    };

    setTeams(prev => [...prev, newTeam]);
    toast.success("Team created successfully!");
    setIsCreateTeamOpen(false);
    setSelectedMembers([]);
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeams(prev => prev.filter(team => team.id !== teamId));
    toast.success("Team deleted successfully!");
  };

  const getUserById = (userId: string) => {
    return mockUsers.find(user => user.id === userId);
  };

  const getTeamStats = () => {
    const totalTeams = teams.length;
    const activeTeams = teams.filter(team => team.status === "active").length;
    const totalMembers = teams.reduce((acc, team) => acc + team.members.length, 0);
    const avgMembersPerTeam = totalTeams > 0 ? Math.round(totalMembers / totalTeams) : 0;

    return { totalTeams, activeTeams, totalMembers, avgMembersPerTeam };
  };

  const stats = getTeamStats();

  return (
    <EnhancedAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
            <p className="text-muted-foreground">
              Create and manage teams, assign members, and organize your workforce.
            </p>
          </div>
          <Dialog open={isCreateTeamOpen} onOpenChange={setIsCreateTeamOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Team
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Team</DialogTitle>
                <DialogDescription>
                  Set up a new team with members and leadership.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team-name" className="text-right">Name</Label>
                  <Input id="team-name" placeholder="Team name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="team-description" className="text-right pt-2">Description</Label>
                  <Textarea
                    id="team-description"
                    placeholder="Team description..."
                    className="col-span-3"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team-leader" className="text-right">Team Leader</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select team leader" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockUsers.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name || user.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Member Selection */}
                <div className="space-y-4">
                  <Label>Team Members</Label>
                  <div className="border rounded-lg p-4 max-h-48 overflow-y-auto space-y-2">
                    {mockUsers.map((user) => (
                      <div key={user.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={`member-${user.id}`}
                          checked={selectedMembers.includes(user.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedMembers(prev => [...prev, user.id]);
                            } else {
                              setSelectedMembers(prev => prev.filter(id => id !== user.id));
                            }
                          }}
                        />
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.image || ""} />
                          <AvatarFallback>
                            {user.name?.[0]?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Label htmlFor={`member-${user.id}`} className="text-sm font-medium cursor-pointer">
                            {user.name || "Unknown"}
                          </Label>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => handleCreateTeam({
                  name: "New Team",
                  description: "Team description",
                  leader: mockUsers[0]?.id
                })}>
                  Create Team
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTeams}</div>
              <p className="text-xs text-muted-foreground">Active teams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTeams}</div>
              <p className="text-xs text-muted-foreground">Currently operational</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMembers}</div>
              <p className="text-xs text-muted-foreground">Across all teams</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Team Size</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgMembersPerTeam}</div>
              <p className="text-xs text-muted-foreground">Members per team</p>
            </CardContent>
          </Card>
        </div>

        {/* Teams Table */}
        <Card>
          <CardHeader>
            <CardTitle>Teams</CardTitle>
            <CardDescription>
              Manage your organization teams and their members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Leader</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((team) => {
                  const leader = getUserById(team.leader);
                  return (
                    <TableRow key={team.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{team.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {team.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={leader?.image || ""} />
                            <AvatarFallback className="text-xs">
                              {leader?.name?.[0]?.toUpperCase() || "L"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{leader?.name || "Unknown"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={team.status === 'active' ? 'default' : 'secondary'}>
                          {team.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {team.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTeam(team.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common team management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Bulk Assign</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Shield className="h-6 w-6" />
                <span className="text-sm">Team Permissions</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Settings className="h-6 w-6" />
                <span className="text-sm">Team Settings</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Crown className="h-6 w-6" />
                <span className="text-sm">Leadership</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </EnhancedAdminLayout>
  );
}
