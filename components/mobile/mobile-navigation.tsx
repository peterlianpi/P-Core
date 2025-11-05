"use client";

/**
 * MOBILE NAVIGATION SYSTEM
 *
 * Features:
 * 1. Bottom tab navigation for primary sections
 * 2. Drawer navigation for secondary features
 * 3. Floating action button for quick actions
 * 4. Adaptive navigation based on user role and organization type
 * 5. Gesture-based interactions
 * 6. Accessibility support
 */

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Users,
  Settings,
  Menu,
  Plus,
  Bell,
  Search,
  Building2,
  BarChart3,
  Shield,
  MessageSquare,
  Calendar,
  FileText,
  ChevronUp,
  X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useData } from "@/providers/data-provider";
import { useOrgData } from "@/features";
import {
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

// Primary navigation items (always visible in bottom tabs)
const PRIMARY_NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Home",
    icon: Home,
    url: "/dashboard",
    badge: null,
  },
  {
    id: "organization",
    label: "Org",
    icon: Building2,
    url: "/organization",
    badge: null,
  },
  {
    id: "users",
    label: "People",
    icon: Users,
    url: "/users",
    badge: null,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    url: "/settings",
    badge: null,
  },
] as const;

// Quick action items for FAB menu
const QUICK_ACTIONS = [
  {
    id: "add-user",
    label: "Add User",
    icon: Plus,
    action: "add-user",
    color: "bg-blue-500",
  },
  {
    id: "create-task",
    label: "New Task",
    icon: FileText,
    action: "create-task",
    color: "bg-green-500",
  },
  {
    id: "schedule-meeting",
    label: "Meeting",
    icon: Calendar,
    action: "schedule-meeting",
    color: "bg-purple-500",
  },
  {
    id: "send-message",
    label: "Message",
    icon: MessageSquare,
    action: "send-message",
    color: "bg-orange-500",
  },
] as const;

interface MobileNavigationProps {
  organizations: Organizations[];
  className?: string;
}

export function MobileNavigation({ organizations, className }: MobileNavigationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useIsMobile();
  const user = useCurrentUser();
  const { orgId } = useData();
  const { users } = useOrgData();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [fabOpen, setFabOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("dashboard");

  // Get current context
  const currentOrg = organizations.find((org) => org.organization.id === orgId);
  const orgType = currentOrg?.organization?.type;
  const orgRole = currentOrg?.role ? OrganizationRole[currentOrg.role as keyof typeof OrganizationRole] : OrganizationRole.MEMBER;
  const userRole: UserRole = user?.role && typeof user.role === "string"
    ? UserRole[user.role as keyof typeof UserRole]
    : UserRole.USER;

  // Generate drawer navigation items based on features and permissions
  const drawerNavItems = React.useMemo(() => {
    const enabledFeatures = getEnabledFeatures();
    const items = [];

    // Add primary sections
    items.push(
      { title: "Dashboard", url: "/dashboard", icon: BarChart3, category: "main" },
      { title: "Notifications", url: "/notifications", icon: Bell, category: "main" },
      { title: "Tasks", url: "/tasks", icon: FileText, category: "main" },
    );

    // Add feature-based items
    for (const feature of enabledFeatures) {
      if (!hasFeaturePermission(feature.id, orgRole)) continue;

      const featureItems = getFeatureDrawerItems(feature.id, orgRole, orgType);
      items.push(...featureItems);
    }

    // Add admin sections
    if ([OrganizationRole.SUPER_ADMIN, OrganizationRole.ADMIN, OrganizationRole.OWNER].includes(orgRole)) {
      items.push(
        { title: "Admin Panel", url: "/admin", icon: Shield, category: "admin" },
      );
    }

    if (userRole === UserRole.SUPERADMIN) {
      items.push(
        { title: "Super Admin", url: "/superadmin", icon: Shield, category: "admin" },
      );
    }

    return items;
  }, [orgRole, userRole, orgType]);

  // Handle navigation
  const handleNavigation = (url: string, tabId?: string) => {
    router.push(url);
    if (tabId) setActiveTab(tabId);
    setDrawerOpen(false);
  };

  // Handle quick actions
  const handleQuickAction = (action: string) => {
    switch (action) {
      case "add-user":
        router.push("/users/add");
        break;
      case "create-task":
        router.push("/tasks/create");
        break;
      case "schedule-meeting":
        router.push("/calendar/new-meeting");
        break;
      case "send-message":
        router.push("/messages/compose");
        break;
    }
    setFabOpen(false);
  };

  // Determine active tab
  React.useEffect(() => {
    const activeItem = PRIMARY_NAV_ITEMS.find(item =>
      pathname.startsWith(item.url)
    );
    if (activeItem) {
      setActiveTab(activeItem.id);
    }
  }, [pathname]);

  if (!isMobile) return null;

  return (
    <>
      {/* Bottom Tab Navigation */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t",
        className
      )}>
        <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
          {PRIMARY_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.url, item.id)}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-w-0 flex-1",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg scale-105"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium truncate">{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                    {item.badge}
                  </Badge>
                )}
              </button>
            );
          })}

          {/* Menu Button */}
          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted">
                <Menu className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-xl">
              <SheetHeader className="text-left pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <Menu className="w-5 h-5" />
                  Navigation Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col h-full overflow-y-auto">
                {/* Main Sections */}
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-muted-foreground px-2 py-1">Main</h3>
                  {drawerNavItems
                    .filter(item => item.category === "main")
                    .map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname.startsWith(item.url);

                      return (
                        <button
                          key={item.url}
                          onClick={() => handleNavigation(item.url)}
                          className={cn(
                            "flex items-center gap-3 w-full px-3 py-3 rounded-lg text-left transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </button>
                      );
                    })}
                </div>

                <Separator className="my-4" />

                {/* Feature Sections */}
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-muted-foreground px-2 py-1">Features</h3>
                  {drawerNavItems
                    .filter(item => !item.category || item.category === "feature")
                    .map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname.startsWith(item.url);

                      return (
                        <button
                          key={item.url}
                          onClick={() => handleNavigation(item.url)}
                          className={cn(
                            "flex items-center gap-3 w-full px-3 py-3 rounded-lg text-left transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </button>
                      );
                    })}
                </div>

                {/* Admin Sections */}
                {drawerNavItems.some(item => item.category === "admin") && (
                  <>
                    <Separator className="my-4" />
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-muted-foreground px-2 py-1">Administration</h3>
                      {drawerNavItems
                        .filter(item => item.category === "admin")
                        .map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname.startsWith(item.url);

                          return (
                            <button
                              key={item.url}
                              onClick={() => handleNavigation(item.url)}
                              className={cn(
                                "flex items-center gap-3 w-full px-3 py-3 rounded-lg text-left transition-colors",
                                isActive
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-muted"
                              )}
                            >
                              <Icon className="w-5 h-5" />
                              <span className="font-medium">{item.title}</span>
                            </button>
                          );
                        })}
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-40">
        {/* FAB Menu Items */}
        {fabOpen && (
          <div className="absolute bottom-16 right-0 space-y-3 mb-2">
            {QUICK_ACTIONS.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.action)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg transform transition-all duration-200 hover:scale-105",
                    action.color
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    transform: fabOpen ? 'scale(1)' : 'scale(0)',
                  }}
                >
                  <span className="text-sm font-medium">{action.label}</span>
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        )}

        {/* Main FAB */}
        <Button
          onClick={() => setFabOpen(!fabOpen)}
          size="lg"
          className={cn(
            "w-14 h-14 rounded-full shadow-lg transition-all duration-200 hover:scale-105",
            fabOpen ? "rotate-45" : ""
          )}
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Overlay for FAB menu */}
      {fabOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setFabOpen(false)}
        />
      )}
    </>
  );
}

// Helper function to get drawer items for features
function getFeatureDrawerItems(featureId: string, orgRole: OrganizationRole, orgType?: string): Array<{title: string, url: string, icon: any, category?: string}> {
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
        { title: "Organization Overview", url: "/organization", icon: Building2, category: "feature" },
        ...(isAdmin ? [{ title: "Manage Members", url: "/organization/manage-member", icon: Users, category: "feature" }] : []),
      ];
    case "school-management":
      if (orgType !== "school") return [];
      return [
        { title: "School Overview", url: "/school/overview", icon: Building2, category: "feature" },
        { title: "Students", url: "/school/students", icon: Users, category: "feature" },
        { title: "Courses", url: "/school/courses", icon: FileText, category: "feature" },
        ...(isEditor ? [
          { title: "Enrollments", url: "/school/enrollments", icon: Calendar, category: "feature" },
          { title: "Grades", url: "/school/grades", icon: BarChart3, category: "feature" },
        ] : []),
        ...(isAdmin ? [
          { title: "Schedule", url: "/school/schedule", icon: Calendar, category: "feature" },
          { title: "Reports", url: "/school/reports", icon: FileText, category: "feature" },
        ] : []),
      ];
    case "church-management":
      if (orgType !== "church") return [];
      return [
        { title: "Members", url: "/church/members", icon: Users, category: "feature" },
        { title: "Choirs", url: "/church/choirs", icon: Users, category: "feature" },
        ...(isEditor ? [
          { title: "Families", url: "/church/families", icon: Users, category: "feature" },
          { title: "Groups", url: "/church/groups", icon: Users, category: "feature" },
        ] : []),
        ...(isAdmin ? [
          { title: "Add Member", url: "/church/members/add", icon: Plus, category: "feature" },
          { title: "Manage Groups", url: "/church/groups/manage", icon: Settings, category: "feature" },
        ] : []),
      ];
    case "library-management":
      if (!["school", "public"].includes(orgType || "")) return [];
      return [
        { title: "Books", url: "/library/books", icon: FileText, category: "feature" },
        { title: "Loans", url: "/library/loans", icon: Calendar, category: "feature" },
        ...(isEditor ? [
          { title: "Inventory", url: "/library/inventory", icon: BarChart3, category: "feature" },
        ] : []),
        ...(isAdmin ? [
          { title: "Add Book", url: "/library/books/add", icon: Plus, category: "feature" },
          { title: "Reports", url: "/library/reports", icon: FileText, category: "feature" },
        ] : []),
      ];
    default:
      return [];
  }
}
