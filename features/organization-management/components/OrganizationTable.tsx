"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Users, Calendar } from "lucide-react";
import { useOrgData } from "../context/org-context";

export function OrganizationTable() {
  const { organizations } = useOrgData();

  // Transform data for table display
  const tableData = organizations.map((org) => ({
    id: org.organization.id,
    name: org.organization.name,
    type: org.organization.type,
    description: org.organization.description,
    startedAt: org.organization.startedAt,
    memberCount: 1, // Mock data - would come from API
    role: org.role,
  }));

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "SCHOOL":
        return "default";
      case "CHURCH":
        return "secondary";
      case "COMPANY":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "default";
      case "USER":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Organization</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Started</TableHead>
            <TableHead>Members</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No organizations found
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="font-medium">{org.name}</TableCell>
                <TableCell>
                  <Badge variant={getTypeBadgeVariant(org.type || 'OTHER')}>
                    {org.type || 'OTHER'}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {org.description || "No description"}
                </TableCell>
                <TableCell>
                  {org.startedAt ? (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(org.startedAt).toLocaleDateString()}
                    </div>
                  ) : (
                    "Not set"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {org.memberCount}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(org.role || 'USER')}>
                    {org.role || 'USER'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
