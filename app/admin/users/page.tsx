import { Suspense } from "react";
import { currentUser } from "@/lib/auth";
import { getAllUsers } from "@/actions/admin/users";
import { AdminUserManagement } from "@/components/admin-panel/user-management";
import { ProtectedRoute } from "@/hooks/use-access-control";

export default async function AdminUsersPage() {
  // Check if user has admin access
  const user = await currentUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600">Access Denied</h2>
          <p className="text-muted-foreground mt-2">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  // Fetch users data
  const usersResult = await getAllUsers();
  const users = usersResult.success && usersResult.data ? usersResult.data : [];

  return (
    <ProtectedRoute requiredRole="ADMIN">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-muted-foreground mt-2">
                Manage system users, roles, and permissions
              </p>
            </div>
          </div>

          {/* User Management Component */}
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUserManagement initialUsers={users} />
          </Suspense>
        </div>
      </div>
    </ProtectedRoute>
  );
}
