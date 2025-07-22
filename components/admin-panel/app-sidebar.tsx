"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

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
import { getNavByRole } from "../../features/site/config";
import { useData } from "@/providers/data-provider";

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
  const { orgId } = useData();

  const user = {
    name: users?.name as string,
    email: users?.email as string,
    avatar: users?.image as string,
    role: users?.role as UserRole,
  };

  const teams = organizations.map((org) => org.organization);
  const navMain = getNavByRole(pathname, organizations, orgId);

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
