/**
 * User Management Page - MVP Implementation
 *
 * Full-screen admin page for managing all users in the system using the User Management MVP
 * Uses tabbed interface instead of sidebar navigation for cleaner UX
 */

import { UserManagement } from '@/features/user-management/mvp/components';

export default function UserManagementPage() {
  return <UserManagement />;
}
