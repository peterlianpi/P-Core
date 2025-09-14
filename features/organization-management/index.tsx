// Organization Management Main Page
// This feature module provides UI and logic to list, create, update, and manage organizations within the P-Core system.
// See: /docs/features and PROJECT_DEVELOPMENT_GUIDELINES.md for architectural conventions.

import React from "react";
import { OrganizationTable } from "./components/OrganizationTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AdminLayout } from "@/components/admin-layout";

/**
 * OrganizationManagementPage - Top-level UI for managing organizations
 * - Table view for all organizations
 * - Add/Edit organization modal actions
 * - Consistent styling via Tailwind and ShadCN UI
 * - Integrated into the admin shell for consistent navigation
 */
export default function OrganizationManagementPage() {
  // TODO: Connect to data fetching via TanStack Query / Hono API
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Organizations</h1>
          <Button variant="default" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Organization
          </Button>
        </div>
        <OrganizationTable />
      </div>
    </AdminLayout>
  );
}
