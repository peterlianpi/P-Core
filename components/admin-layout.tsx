// AdminLayout - Main layout shell for all admin/management pages
// Wraps pages with navigation and a styled content area for consistency.
// Usage: Place <AdminLayout> around feature pages (see /docs/FOLDER_STRUCTURE.md)

import React from "react";
import { AdminNavigation } from "./admin-navigation";

/**
 * AdminLayout
 * Provides sidebar navigation and a main area for management UIs.
 * @param children - React nodes to render in the main content area.
 */
export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen bg-background">
      <AdminNavigation />
      <main className="flex-1 p-6 overflow-auto bg-background">
        {children}
      </main>
    </div>
  );
}
