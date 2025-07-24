"use client";

/**
 * ENHANCED APP SIDEBAR: Modern Admin Navigation with Theme Integration
 * 
 * This component provides:
 * 1. Role-based navigation with improved organization
 * 2. Integrated theme selector for system-wide theming
 * 3. Enhanced user experience with modern design
 * 4. Performance optimized navigation
 * 5. Responsive design for all screen sizes
 * 
 * IMPROVEMENTS:
 * - Added theme selector integration
 * - Enhanced visual hierarchy
 * - Better organization structure
 * - Improved accessibility
 * - Modern UI patterns
 */

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Palette, Settings, Activity } from "lucide-react";

import { NavUser } from "@/components/admin-panel/nav-user";
import { NavMain } from "@/components/admin-panel/nav-main";
import { TeamSwitcher } from "@/components/admin-panel/team-switcher";
import ThemeSelector from "@/components/theme/theme-selector";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { useCurrentUser } from "@/hooks/use-current-user";
import type { UserRole } from "@/lib/types/database";
import { getNavByRole } from "@/features/system/site/config";
import { useData } from "@/providers/data-provider";
import { usePerformanceToggle } from "@/components/performance/performance-monitor";

type Organizations = {
  organization: {
    name: string;
    id: string;
    description?: string;
    startedAt?: Date | null;
    logoImage?: string;
    type?: string;
  };
  role?: string;
};

export function AppSidebar({
  organizations,
  ...props
}: {
  organizations: Organizations[];
}) {
  const pathname = usePathname();
  const users = useCurrentUser();
  const { orgId } = useData();
  const performanceToggle = usePerformanceToggle();

  // Current organization context
  const currentOrg = organizations.find((org) => org.organization.id === orgId);
  const orgType = currentOrg?.organization?.type;
  const userRole = currentOrg?.role;

  const user = {
    name: users?.name as string,
    email: users?.email as string,
    avatar: users?.image as string,
    role: users?.role as UserRole,
    orgRole: userRole,
  };

  const teams = organizations.map((org) => org.organization);
  const navMain = getNavByRole(pathname, organizations, orgId);

  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader className="border-b border-sidebar-border">
        <TeamSwitcher teams={teams} />
        
        {/* Organization Context Badge */}
        {currentOrg && (
          <div className="px-2 pb-2">
            <Badge variant="secondary" className="w-full justify-center text-xs">
              {orgType === 'school' && '🎓 School'}
              {orgType === 'church' && '⛪ Church'} 
              {orgType === 'business' && '🏢 Business'}
              {orgType === 'nonprofit' && '🤝 Non-Profit'}
              {!orgType && '🏢 Organization'}
            </Badge>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2">
        <NavMain items={navMain} />
        
        {/* Additional Tools Section */}
        <div className="mt-auto pt-4">
          <Separator className="mb-4" />
          
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="px-2 pb-2">
                <p className="text-xs font-medium text-sidebar-foreground/70 mb-2">
                  Customization
                </p>
                <div className="space-y-2">
                  {/* Theme Selector */}
                  <div className="flex justify-center">
                    <ThemeSelector />
                  </div>
                  
                  {/* Performance Monitor Toggle */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={performanceToggle.toggle}
                    className="w-full justify-start text-xs"
                  >
                    <Activity className="mr-2 h-3 w-3" />
                    Performance Monitor
                  </Button>
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <NavUser user={user} />
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
}
