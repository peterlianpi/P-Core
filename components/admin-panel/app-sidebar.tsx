"use client";
import * as React from "react";
import {
  Server,
  Settings2,
  Users2,
  Laptop,
  KeySquare,
  Map,
  GemIcon,
  HomeIcon,
  ChartArea,
} from "lucide-react"; // Make sure these icons are correctly imported from the lucide library

import { NavUser } from "@/components/admin-panel/nav-user";
import { NavProjects } from "@/components/admin-panel/nav-projects";
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

// This is a mock user data that simulates how your data is structured
const data = {
  navMain: [
    {
      title: "Analytics",
      url: "#",
      icon: ChartArea,
      isActive: true,
      items: [{ title: "Dashboard", url: "/stat" }],
    },
    {
      title: "Goods",
      url: "/goods",
      icon: GemIcon,
      isActive: true,
      items: [
        { title: "Goods", url: "/goods" },
        { title: "Add goods", url: "/goods/add" },
      ],
    },
    {
      title: "Category",
      url: "/category",
      icon: Users2,
      items: [
        { title: "Category", url: "/category" },
        { title: "Add category", url: "/category/add" },
      ],
    },
    {
      title: "Organization",
      url: "/organization",
      icon: HomeIcon,
      items: [
        { title: "Organization", url: "/organization" },
        { title: "Add User", url: "/organization/add-user" },
      ],
    },
    {
      title: "All Users",
      url: "#",
      icon: Users2,
      items: [{ title: "General", url: "/users" }],
    },
    {
      title: "Server",
      url: "/server",
      icon: Server,
      items: [
        { title: "General", url: "/server" },
        { title: "Logs", url: "#" },
        { title: "API", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: [{ title: "Profile", url: "/settings" }],
    },
  ],
  projects: [
    {
      name: "Map",
      url: "/map",
      icon: Map,
    },
    {
      name: "Server",
      url: "/server",
      icon: Server,
    },
    {
      name: "Client",
      url: "/client",
      icon: Laptop,
    },
    {
      name: "Admin",
      url: "/admin",
      icon: KeySquare,
    },
    {
      name: "Users",
      url: "/users",
      icon: Users2,
    },
  ],
};

type Organizations = {
  organization: {
    name: string;
    id: string;
    description?: string | undefined;
    startedAt?: Date | null | undefined;
    logoImage?: string | undefined;
  };
  role?: string | undefined;
};

export function AppSidebar({
  organizations,
  ...props
}: {
  organizations: Organizations[];
}) {
  const users = useCurrentUser();
  const user = {
    name: users?.name as string,
    email: users?.email as string,
    avatar: users?.image as string,
    role: users?.role as UserRole,
  };

  const teams = organizations.map((org) => org.organization);

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
