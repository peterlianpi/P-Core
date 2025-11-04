/**
 * User Management Page - MVP Implementation
 *
 * Full-screen admin page for managing all users in the system using the User Management MVP
 * Uses tabbed interface instead of sidebar navigation for cleaner UX
 */

import { UserManagementTable } from '@/features/user-management/components/user-management-table';

export default function UserManagementPage() {
  return <UserManagementTable />;
}
