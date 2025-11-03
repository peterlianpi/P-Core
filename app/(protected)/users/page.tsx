/**
 * User Management Page - MVP Implementation
 * 
 * Admin page for managing all users in the system
 */

import type { Metadata } from 'next';
import { AdminLayout } from '@/components/admin-layout';
import { UserManagementTable } from '@/features/user-management/components/user-management-table';
import { UserStatsCards } from '@/features/user-management/components/user-stats-cards';

export const metadata: Metadata = {
  title: 'User Management | P-Core',
  description: 'Manage users, roles, and permissions',
};

export default function UserManagementPage() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage users, roles, and permissions across the platform
            </p>
          </div>
        </div>

        <UserStatsCards />
        <UserManagementTable />
      </div>
    </AdminLayout>
  );
}