// AdminNavigation - Sidebar navigation for P-Core management domains
// See: /docs/FOLDER_STRUCTURE.md and PROJECT_DEVELOPMENT_GUIDELINES.md for architecture/conventions.

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Users, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

// ShadCN UI Button (unstyled for nav-item role)
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/features/organization-management", label: "Organizations", icon: Building2 },
  { href: "/features/system-management", label: "Systems", icon: Settings },
  { href: "/features/user-management", label: "Users", icon: Users },
  { href: "/features/profile-management", label: "Profile", icon: User },
];

/**
 * AdminNavigation
 * Sidebar for quickly switching between admin/management features.
 * Uses Tailwind for layout & ShadCN UI for style.
 */
export function AdminNavigation() {
  const pathname = usePathname();

  return (
    <aside className="h-full p-4 min-w-[200px] bg-muted border-r flex flex-col gap-2">
      <nav className="flex flex-col gap-1 w-full">
        {/* Home/Dashboard shortcut (optional) */}
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start mb-4">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link href={href} key={href}>
            <Button
              variant={pathname.startsWith(href) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2 transition-colors",
                pathname.startsWith(href) && "font-semibold"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
