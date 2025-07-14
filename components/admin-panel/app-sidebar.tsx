"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Settings2, TextIcon, GroupIcon } from "lucide-react";

import { NavUser } from "@/components/admin-panel/nav-user";
import { NavMain } from "@/components/admin-panel/nav-main";
import { TeamSwitcher } from "@/components/admin-panel/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@/prisma-user-database/user-database-client-types";

type Organizations = {
  organization: {
    name: string;
    id: string;
    description?: string;
    startedAt?: Date | null;
    logoImage?: string;
  };
  role?: string;
};

export function AppSidebar({
  organizations,
  ...props
}: {
  organizations: Organizations[];
}) {
  const pathname = usePathname(); // <-- Get current route
  const users = useCurrentUser();

  const user = {
    name: users?.name as string,
    email: users?.email as string,
    avatar: users?.image as string,
    role: users?.role as UserRole,
  };

  const teams = organizations.map((org) => org.organization);
  // const hasAdminOrg = organizations.some(
  //   (org) => org.role === "OWNER" || org.role === "ADMIN"
  // );
  const hasOrg = organizations.length > 0;
  // Dynamic nav with isActive
  const navMain = [
    ...(hasOrg
      ? [
          {
            title: "Organization",
            url: "/organization",
            icon: GroupIcon,
            isActive: pathname.startsWith("/organization"),
            items: [
              { title: "Organization", url: "/organization" },
              { title: "Manage Member", url: "/organization/manage-member" },
            ],
          },
        ]
      : []),
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      isActive: pathname.startsWith("/settings"),
      items: [{ title: "Profile", url: "/settings" }],
    },
  ];

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
