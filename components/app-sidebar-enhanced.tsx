"use client";

/**
 * ENHANCED APP SIDEBAR - P-Core Feature-Based Navigation
 * 
 * This component provides:
 * 1. Feature-based navigation using the new feature registry
 * 2. Dynamic loading of enabled features
 * 3. Role-based access control
 * 4. Organization context integration
 * 5. Modern UI with theme integration
 */

import * as React from "react";
import { usePathname } from "next/navigation";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Building2, 
  Settings, 
  Activity,
  Palette,
  Shield,
  BarChart3,
  ShieldCheck,
  User
} from "lucide-react";

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
} from "@/components/ui/sidebar";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useData } from "@/providers/data-provider";
import { usePerformanceToggle } from "@/components/performance/performance-monitor";
import { 
  featureRegistry, 
  getEnabledFeatures,
  hasFeaturePermission,
  type FeatureConfig 
} from "@/features/feature-registry";
import { OrganizationRole } from "@/shared/types/organization-role";
import { UserRole } from "@/shared/types/user-role";

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

const FEATURE_ICONS = {
  "organization-management": Building2,
  "school-management": GraduationCap,
  "church-management": Users,
  "library-management": BookOpen,
  "dashboard": BarChart3,
  "site": Settings,
  "version": Shield,
  "dynamic-components": Activity,
  "feedback": Users,
  "image-upload": Palette,
} as const;

function generateNavFromFeatures(
  enabledFeatures: FeatureConfig[],
  orgRole: OrganizationRole,
  userRole: UserRole,
  pathname: string,
  orgType?: string
) {
  const domainFeatures = enabledFeatures.filter(f => f.category === "domain");
  const systemFeatures = enabledFeatures.filter(f => f.category === "system");

  const navItems = [];

  // Add domain features based on organization type
  for (const feature of domainFeatures) {
    if (!hasFeaturePermission(feature.id, orgRole)) continue;

    const icon = FEATURE_ICONS[feature.id as keyof typeof FEATURE_ICONS] || Settings;
    // Skip features that don't match organization type
    if (feature.id === "school-management" && orgType !== "school") continue;
    if (feature.id === "church-management" && orgType !== "church") continue;
    if (feature.id === "library-management" && !["school", "public"].includes(orgType || "")) continue;

    const baseUrl = getFeatureBaseUrl(feature.id);
    const subItems = getFeatureSubItems(feature.id, orgRole, orgType);

    // Always add organization-management even if no subitems
    if (feature.id === "organization-management" || subItems.length > 0) {
      navItems.push({
        title: feature.name,
        url: baseUrl,
        icon,
        isActive: pathname.startsWith(baseUrl),
        items: subItems,
      });
    }
  }

  // Add system features (limited access)
  const systemNavItems = [];
  for (const feature of systemFeatures) {
    if (!hasFeaturePermission(feature.id, orgRole)) continue;
    if (feature.id === "dashboard") continue; // Dashboard is handled separately

    const icon = FEATURE_ICONS[feature.id as keyof typeof FEATURE_ICONS] || Settings;
    systemNavItems.push({
      title: feature.name,
      url: getFeatureBaseUrl(feature.id),
      icon,
      isActive: pathname.startsWith(getFeatureBaseUrl(feature.id)),
    });
  }

  // Add superadmin section (system-level, not org-level)
  if (userRole === UserRole.SUPERADMIN) {
    navItems.push({
      title: "System Admin",
      url: "/superadmin",
      icon: ShieldCheck,
      isActive: pathname.startsWith("/superadmin"),
      items: [
        { title: "Dashboard", url: "/superadmin" },
      ],
    });
  }

  // Always add settings section
  navItems.push({
    title: "Settings",
    url: "/settings",
    icon: Settings,
    isActive: pathname.startsWith("/settings"),
    items: [
      { title: "Profile", url: "/settings" },
      { title: "Account", url: "/settings/account" },
      { title: "Notifications", url: "/settings/notifications" },
      ...systemNavItems.map(item => ({
        title: item.title,
        url: item.url,
      })),
    ],
  });

  return navItems;
}

function getFeatureBaseUrl(featureId: string): string {
  switch (featureId) {
    case "organization-management": return "/organization";
    case "school-management": return "/school";
    case "church-management": return "/church";
    case "library-management": return "/library";
    case "dashboard": return "/dashboard";
    case "site": return "/settings/site";
    case "version": return "/admin/version";
    default: return `/${featureId}`;
  }
}

function getFeatureSubItems(featureId: string, orgRole: OrganizationRole, orgType?: string): Array<{title: string, url: string}> {
  const isAdmin = [OrganizationRole.SUPER_ADMIN, OrganizationRole.ADMIN, OrganizationRole.OWNER].includes(orgRole);
  const isEditor = [
    OrganizationRole.SUPER_ADMIN,
    OrganizationRole.ADMIN,
    OrganizationRole.EDITOR,
    OrganizationRole.OWNER
  ].includes(orgRole);

  switch (featureId) {
    case "organization-management":
      return [
        { title: "Overview", url: "/organization" },
        ...(isAdmin ? [{ title: "Manage Members", url: "/organization/manage-member" }] : []),
      ];
    case "school-management":
      return [
        { title: "Overview", url: "/school/overview" },
        { title: "Students", url: "/school/students" },
        { title: "Courses", url: "/school/courses" },
        ...(isEditor ? [
          { title: "Enrollments", url: "/school/enrollments" },
          { title: "Grades", url: "/school/grades" },
          { title: "Attendance", url: "/school/attendance" },
          { title: "Lesson Books", url: "/school/lesson-books" },
        ] : []),
        ...(isAdmin ? [
          { title: "Schedule", url: "/school/schedule" },
          { title: "Transactions", url: "/school/transactions" },
          { title: "Reports", url: "/school/reports" },
        ] : []),
      ];
    case "church-management":
      return [
        { title: "Members", url: "/church/members" },
        { title: "Choirs", url: "/church/choirs" },
        ...(isEditor ? [
          { title: "Families", url: "/church/families" },
          { title: "Groups", url: "/church/groups" },
        ] : []),
        ...(isAdmin ? [
          { title: "Add Member", url: "/church/members/add" },
          { title: "Manage Groups", url: "/church/groups/manage" },
        ] : []),
      ];
    case "library-management":
      return [
        { title: "Books", url: "/library/books" },
        { title: "Loans", url: "/library/loans" },
        ...(isEditor ? [
          { title: "Inventory", url: "/library/inventory" },
        ] : []),
        ...(isAdmin ? [
          { title: "Add Book", url: "/library/books/add" },
          { title: "Reports", url: "/library/reports" },
        ] : []),
      ];
    default:
      return [];
  }
}

export function AppSidebarEnhanced({
  organizations,
  ...props
}: {
  organizations: Organizations[];
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const user = useCurrentUser();
  const { orgId } = useData();
  const performanceToggle = usePerformanceToggle();

  // Get enabled features
  const enabledFeatures = getEnabledFeatures();
  
  // Current organization context
  const currentOrg = organizations.find((org) => org.organization.id === orgId);
  const orgType = currentOrg?.organization?.type;
  const orgRole = currentOrg?.role ? OrganizationRole[currentOrg.role as keyof typeof OrganizationRole] : OrganizationRole.MEMBER;
  const userRole: UserRole = user?.role && typeof user.role === "string"
    ? UserRole[user.role as keyof typeof UserRole]
    : UserRole.USER;

  // Generate navigation from features
  const navMain = generateNavFromFeatures(enabledFeatures, orgRole, userRole, pathname, orgType);

  // User data for sidebar
  const userData = {
    name: user?.name || "User",
    email: user?.email || "",
    avatar: user?.image || "",
    role: userRole,
    orgRole: orgRole,
  };

  // Teams data
  const teams = organizations.map((org) => org.organization);

  // Feature statistics
  const domainFeaturesCount = enabledFeatures.filter(f => f.category === "domain").length;
  const systemFeaturesCount = enabledFeatures.filter(f => f.category === "system").length;

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

        {/* Feature Status */}
        <div className="px-2 pb-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{domainFeaturesCount} features</span>
            <span>{systemFeaturesCount} tools</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <NavMain items={navMain} />
        
        {/* Quick Actions */}
        <div className="mt-auto pt-4">
          <Separator className="mb-4" />
          
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="px-2 pb-2">
                <p className="text-xs font-medium text-sidebar-foreground/70 mb-2">
                  Quick Tools
                </p>
                <div className="space-y-2">
                  {/* Theme Selector */}
                  <div className="flex justify-center">
                    <ThemeSelector />
                  </div>
                  
                  {/* Performance Monitor Toggle */}
                  {hasFeaturePermission("dynamic-components", orgRole) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={performanceToggle.toggle}
                      className="w-full justify-start text-xs"
                    >
                      <Activity className="mr-2 h-3 w-3" />
                      Performance Monitor
                    </Button>
                  )}
                </div>
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <NavUser user={userData} />
      </SidebarFooter>
      
      <SidebarRail />
    </Sidebar>
  );
}
