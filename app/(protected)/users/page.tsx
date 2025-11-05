import React from "react";
import { AdminLayout } from "../../../components/admin-layout";
import { UserManagementTable } from "../../../features/user-management/components/user-management-table";
import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";

/**
 * UserManagementPage
 * Admin-facing UI for managing users and roles.
 */
export default function UserManagementPage() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <Button variant="default" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
        <UserManagementTable />
      </div>
    </AdminLayout>
  );
}
