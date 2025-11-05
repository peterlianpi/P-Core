"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight,
  type LucideIcon,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Settings,
  Activity,
  Palette,
  Shield,
  BarChart3,
  ShieldCheck,
  User,
  Bell,
  CreditCard,
  Database,
  Globe,
  Zap,
  Monitor,
  Sun,
  Moon,
  Crown,
  Layers,
  MessageSquare,
  Receipt,
  ListTodo
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useData } from "@/providers/data-provider";
import { useOrgData } from "@/features";
import { OrganizationRole } from "@/shared/types/organization-role";
import { UserRole } from "@/shared/types/user-role";

import { useMemo } from "react";

/**
 * Enhanced Navigation Component with Smart Routing and Dynamic Features
 *
 * Features:
 * 1. Detects hash fragments in URLs (e.g., /superadmin#users)
 * 2. Handles tab switching for same-page navigation
 * 3. Uses Next.js routing for different pages
 * 4. Provides visual feedback for active states
 * 5. Supports both route-based and hash-based navigation
 * 6. Dynamic menu items based on user roles and organization types
 */

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Get user and organization context
  const user = useCurrentUser();
  const { orgId } = useData();
  const { organizations } = useOrgData();

  // Current organization context
  const currentOrg = organizations.find((org) => org.organization.id === orgId);
  const orgType = currentOrg?.organization?.type;
  const orgRole = currentOrg?.role ? OrganizationRole[currentOrg.role as keyof typeof OrganizationRole] : OrganizationRole.MEMBER;
  const userRole: UserRole = user?.role && typeof user.role === "string"
    ? UserRole[user.role as keyof typeof UserRole]
    : UserRole.USER;

  // Check if user is superuser (admin/owner/superadmin)
  const isSuperUser = [OrganizationRole.SUPER_ADMIN, OrganizationRole.ADMIN, OrganizationRole.OWNER].includes(orgRole) ||
                     userRole === UserRole.SUPERADMIN;

  // Check if user is admin level
  const isAdmin = [OrganizationRole.SUPER_ADMIN, OrganizationRole.ADMIN, OrganizationRole.OWNER].includes(orgRole);

  /**
   * Smart navigation handler that determines whether to:
   * 1. Navigate to a new route (different page)
   * 2. Scroll to a section with hash (same page)
   * 3. Trigger tab switching (for dashboard-like interfaces)
   */
  const handleNavigation = (url: string, event: React.MouseEvent) => {
    // Check if URL contains a hash fragment
    const hasHash = url.includes('#');

    if (hasHash) {
      const [basePath, hash] = url.split('#');

      // If we're already on the base path, just handle the hash
      if (pathname === basePath || (basePath === '' && pathname === '/')) {
        event.preventDefault();

        // Try to find and trigger tab switching first
        const tabElement = document.querySelector(`[data-value="${hash}"]`) as HTMLElement;
        if (tabElement) {
          // This is likely a tab interface - trigger the tab
          tabElement.click();
        } else {
          // Fallback to scrolling to the element
          const targetElement = document.getElementById(hash);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
          }
        }

        // Update URL without page reload
        if (typeof window !== 'undefined') {
          window.history.pushState(null, '', url);
        }
        return;
      }
    }

    // For all other cases, use Next.js routing
    // The Link component will handle this automatically
  };

  /**
   * Enhanced active state detection that considers:
   * 1. Exact path matches
   * 2. Path prefixes
   * 3. Hash fragments
   * 4. Current tab state
   */
  const isLinkActive = (url: string): boolean => {
    // Handle hash-based URLs
    if (url.includes('#')) {
      const [basePath, hash] = url.split('#');
      const currentBasePath = pathname;

      // Check if we're on the same base path
      if (currentBasePath === basePath || (basePath === '' && currentBasePath === '/')) {
        // Check if the hash matches current tab or URL hash (client-side only)
        if (typeof window !== 'undefined') {
          const currentHash = window.location.hash.slice(1);
          if (currentHash === hash) return true;

          // Check if tab is active
          const tabElement = document.querySelector(`[data-value="${hash}"][data-state="active"]`);
          return !!tabElement;
        }
      }

      return false;
    }

    // Standard path-based matching
    return pathname === url || pathname.startsWith(url + '/');
  };

  // Mock data for testing purposes
  const mockData = {
    organizations: [
      { id: '1', name: 'Tech Corp', type: 'business', members: 25 },
      { id: '2', name: 'Global School', type: 'school', members: 150 },
      { id: '3', name: 'Community Church', type: 'church', members: 80 },
    ],
    users: [
      { id: '1', name: 'John Doe', role: 'admin', status: 'active' },
      { id: '2', name: 'Jane Smith', role: 'editor', status: 'active' },
      { id: '3', name: 'Bob Johnson', role: 'viewer', status: 'inactive' },
    ],
    notifications: [
      { id: '1', title: 'System Update', type: 'system', unread: true },
      { id: '2', title: 'New User Registration', type: 'user', unread: false },
    ],
    subscriptions: [
      { id: '1', plan: 'Pro', status: 'active', expiresAt: '2025-12-31' },
      { id: '2', plan: 'Basic', status: 'expired', expiresAt: '2024-10-15' },
    ],
  };

  // Lazy loaded icons for performance optimization - removed due to complexity
  // Icons are imported directly for now to maintain performance

  // Memoized navigation items generation for performance
  const navItems = useMemo(() => {
    const navItems = [...items]; // Start with provided items

    // Remove unnecessary child elements like #profile
    const filteredItems = navItems.filter(item => !item.url.includes('#profile'));

    // Add organizations management for superusers with role-based access
    if (isSuperUser) {
      filteredItems.splice(filteredItems.length - 1, 0, {
        title: "Organizations",
        url: "/superadmin/organizations",
        icon: Building2,
        isActive: pathname.startsWith("/superadmin/organizations"),
        items: [
          { title: "All Organizations", url: "/superadmin/organizations" },
          { title: "Create Organization", url: "/superadmin/organizations/create" },
          { title: "Organization Types", url: "/superadmin/organizations/types" },
          { title: "Organization Settings", url: "/superadmin/organizations/settings" },
        ],
      });
    }

    // Add management section for admins with enhanced permissions
    if (isAdmin) {
      filteredItems.splice(filteredItems.length - 1, 0, {
        title: "Management",
        url: "/admin",
        icon: ShieldCheck,
        isActive: pathname.startsWith("/admin"),
        items: [
          { title: "User Management", url: "/admin/users" },
          { title: "System Health", url: "/admin/health" },
          { title: "Version Control", url: "/admin/versions" },
          { title: "System Logs", url: "/admin/logs" },
          { title: "Audit Trail", url: "/admin/audit" },
        ],
      });
    }

    // Add MVP features section with quick access items
    filteredItems.splice(filteredItems.length - 1, 0, {
      title: "MVP Features",
      url: "/features",
      icon: Zap,
      isActive: pathname.startsWith("/features"),
      items: [
        { title: "Dashboard", url: "/dashboard" },
        { title: "Analytics", url: "/admin/analytics" },
        { title: "Reports", url: "/reports" },
        { title: "API Access", url: "/api-access" },
        { title: "Quick Actions", url: "/features/quick-actions" },
      ],
    });

    // Add users section with role-based visibility
    filteredItems.splice(filteredItems.length - 1, 0, {
      title: "Users",
      url: "/users",
      icon: Users,
      isActive: pathname.startsWith("/users"),
      items: [
        { title: `All Users (${mockData.users.length})`, url: "/users" },
        { title: "User Profiles", url: "/users/profiles" },
        { title: "User Roles", url: "/users/roles" },
        { title: "User Activity", url: "/users/activity" },
      ],
    });

    // Add notifications section with unread count
    const unreadCount = mockData.notifications.filter(n => n.unread).length;
    filteredItems.splice(filteredItems.length - 1, 0, {
      title: "Notifications",
      url: "/notifications",
      icon: Bell,
      isActive: pathname.startsWith("/notifications"),
      items: [
        { title: `All Notifications ${unreadCount > 0 ? `(${unreadCount})` : ''}`, url: "/notifications" },
        { title: "System Alerts", url: "/notifications/system" },
        { title: "User Messages", url: "/notifications/messages" },
        { title: "Notification Settings", url: "/notifications/settings" },
      ],
    });

    // Add subscriptions section with status indicators
    const activeSubscriptions = mockData.subscriptions.filter(s => s.status === 'active').length;
    filteredItems.splice(filteredItems.length - 1, 0, {
      title: "Subscriptions",
      url: "/subscriptions",
      icon: Receipt,
      isActive: pathname.startsWith("/subscriptions"),
      items: [
        { title: `Active Subscriptions (${activeSubscriptions})`, url: "/subscriptions" },
        { title: "Billing History", url: "/subscriptions/billing" },
        { title: "Payment Methods", url: "/subscriptions/payment" },
        { title: "Subscription Plans", url: "/subscriptions/plans" },
      ],
    });

    // Add system core section with restricted access (only for superusers)
    if (userRole === UserRole.SUPERADMIN) {
      filteredItems.splice(filteredItems.length, 0, {
        title: "System Core",
        url: "/system",
        icon: Database,
        isActive: pathname.startsWith("/system"),
        items: [
          { title: "Database", url: "/system/database" },
          { title: "API Endpoints", url: "/system/api" },
          { title: "Performance", url: "/system/performance" },
          { title: "Security", url: "/system/security" },
          { title: "System Configuration", url: "/system/config" },
        ],
      });
    }

    return filteredItems;
  }, [items, isSuperUser, isAdmin, pathname, userRole]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
        Platform
      </SidebarGroupLabel>
      <SidebarMenu>
        {navItems.map((item) => {
          // Enhanced active state detection for main items
          const isItemActive = item.isActive ||
            isLinkActive(item.url) ||
            item.items?.some(subItem => isLinkActive(subItem.url));

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isItemActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isItemActive}
                    className={`peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:scale-[1.02] hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:scale-[0.98] active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:border-l-2 hover:border-l-primary/30 ${
                      isItemActive ? 'bg-primary/15 text-primary border-l-2 border-primary shadow-none' : ''
                    }`}
                    asChild
                  >
                    <Link
                      href={item.url}
                      onClick={(e) => handleNavigation(item.url, e)}
                      className="flex items-center gap-3"
                    >
                      {item.icon && (
                        isCollapsed ? (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <item.icon className={`h-5 w-5 ${isItemActive ? 'text-primary' : ''}`} />
                          </div>
                        ) : (
                          <item.icon className="h-5 w-5" />
                        )
                      )}
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      {item.items && item.items.length > 0 && !isCollapsed && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                {item.items && item.items.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubItemActive = isLinkActive(subItem.url);

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={isSubItemActive}
                              className={`flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring transition-all duration-200 ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground ${
                                isSubItemActive ? 'bg-primary/10 text-primary font-medium' : ''
                              }`}
                            >
                              <Link
                                href={subItem.url}
                                onClick={(e) => handleNavigation(subItem.url, e)}
                                className="text-sm"
                              >
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>


    </SidebarGroup>
  );
}
