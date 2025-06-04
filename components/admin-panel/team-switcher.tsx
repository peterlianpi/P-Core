"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useData } from "@/providers/data-provider";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function TeamSwitcher({
  teams = [],
}: {
  teams: {
    name: string;
    id: string;
    description?: string | undefined;
    startedAt?: Date | null | undefined;
    logoImage?: string | undefined;
  }[];
}) {
  const user = useCurrentUser();
  const { isMobile } = useSidebar();
  const { setIsAddTeam, orgId, setOrgId } = useData();

  // Determine the default team priority order
  const initialTeam =
    teams.find((team) => team.id === user?.defaultOrgId) ??
    teams.find((team) => team.id === orgId) ??
    // teams[0] ??
    null;

  // Store the active team in state
  const [activeTeam, setActiveTeam] = React.useState(initialTeam);

  // Update activeTeam when orgId or teams change
  React.useEffect(() => {
    const newTeam =
      teams.find((team) => team.id === orgId) ??
      // teams[0] ??
      null;

    if (newTeam && newTeam.id !== activeTeam?.id) {
      setActiveTeam(newTeam);
    }
  }, [activeTeam?.id, orgId, teams]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                  {activeTeam?.logoImage ? (
                    <AvatarImage
                      src={activeTeam.logoImage}
                      alt={activeTeam.name}
                    />
                  ) : (
                    <AvatarFallback className="rounded-lg">
                      {activeTeam?.name?.[0]?.toUpperCase() || "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam?.name || "No Team"}
                </span>
                <span className="truncate text-xs">
                  {activeTeam?.description || "No description"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="max-md:w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => {
                  setActiveTeam(team);
                  setOrgId(team.id.toString());
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {team.logoImage ? (
                      <AvatarImage src={team.logoImage} alt={team.name} />
                    ) : (
                      <AvatarFallback className="rounded-lg">
                        {team.name?.[0]?.toUpperCase() || "?"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0 h-10">
              {/* <AddNewTeam /> */}
              <div
                className="flex gap-2 p-2 w-full"
                onClick={() => setIsAddTeam(true)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Add New Team
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
