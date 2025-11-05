/**
 * Unified Sidebar Navigation - Clean, Responsive, Role-Aware
 *
 * Features:
 * - Fully responsive (desktop + mobile)
 * - Role-based access control
 * - Organization-aware filtering
 * - Clean, DRY code
 * - Modern React patterns
 * - TypeScript support
 * - Collapsible desktop sidebar
 */

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import {
  LayoutDashboard,
  GraduationCap,
  Church,
  Library,
  Users,
  Settings,
  Bell,
  BarChart3,
  ChevronDown,
  ChevronRight,
  User,
  Shield,
  Calendar,
  BookOpen,
  Heart,
  Music,
  Home,
  FileText,
  TrendingUp,
  Activity,
  Crown,
  LogOut,
  Menu,
  Sparkles,
  CreditCard,
  BadgeCheck,
  ChevronsUpDown,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

// Types
interface NavigationItem {
  id: string;
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  description?: string;
  // System-level roles (USER, ADMIN, SUPERADMIN)
  systemRoles?: ('USER' | 'ADMIN' | 'SUPERADMIN')[];
  // Organization-level roles (OWNER, ADMIN, EDITOR, MEMBER)
  orgRoles?: ('OWNER' | 'ADMIN' | 'EDITOR' | 'MEMBER')[];
  organizationTypes?: ('school' | 'church' | 'library' | 'general')[];
  children?: NavigationItem[];
}

interface UnifiedSidebarProps {
  className?: string;
  variant?: 'default' | 'admin' | 'minimal';
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

// Navigation Configuration
const NAVIGATION_CONFIG: NavigationItem[] = [
  // Core Navigation - Available to all authenticated users
  {
    id: 'dashboard',
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'System overview and analytics',
    organizationTypes: ['school', 'church', 'library', 'general'],
    systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
    orgRoles: ['OWNER', 'ADMIN', 'EDITOR', 'MEMBER']
  },

  // Organization-Specific Features - Require organization membership
  {
    id: 'school-management',
    title: 'School Management',
    icon: GraduationCap,
    organizationTypes: ['school'],
    systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
    orgRoles: ['OWNER', 'ADMIN', 'EDITOR', 'MEMBER'],
    children: [
      {
        id: 'school-students',
        title: 'Students',
        href: '/school/students',
        icon: Users,
        description: 'Student enrollment and management',
        organizationTypes: ['school'],
        systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
        orgRoles: ['OWNER', 'ADMIN', 'EDITOR']
      },
      {
        id: 'school-courses',
        title: 'Courses',
        href: '/school/courses',
        icon: BookOpen,
        description: 'Course catalog and curriculum',
        organizationTypes: ['school'],
        systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
        orgRoles: ['OWNER', 'ADMIN', 'EDITOR']
      },
      {
        id: 'school-schedules',
        title: 'Schedules',
        href: '/school/schedules',
        icon: Calendar,
        description: 'Class schedules and timetables',
        organizationTypes: ['school'],
        systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
        orgRoles: ['OWNER', 'ADMIN', 'EDITOR']
      }
    ]
  },

  {
    id: 'church-management',
    title: 'Church Management',
    icon: Church,
    organizationTypes: ['church'],
    systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
    orgRoles: ['OWNER', 'ADMIN', 'EDITOR', 'MEMBER'],
    children: [
      {
        id: 'church-members',
        title: 'Members',
        href: '/church/members',
        icon: Users,
        description: 'Church member management',
        organizationTypes: ['church'],
        systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
        orgRoles: ['OWNER', 'ADMIN', 'EDITOR']
      },
      {
        id: 'church-choirs',
        title: 'Choirs',
        href: '/church/choirs',
        icon: Music,
        description: 'Choir and music ministry',
        organizationTypes: ['church'],
        systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
        orgRoles: ['OWNER', 'ADMIN', 'EDITOR']
      },
      {
        id: 'church-families',
        title: 'Families',
        href: '/church/families',
        icon: Heart,
        description: 'Family ministry management',
        organizationTypes: ['church'],
        systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
        orgRoles: ['OWNER', 'ADMIN', 'EDITOR']
      }
    ]
  },

  {
    id: 'library-management',
    title: 'Library Management',
    icon: Library,
    organizationTypes: ['library'],
    systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
    orgRoles: ['OWNER', 'ADMIN', 'EDITOR', 'MEMBER'],
    children: [
      {
        id: 'library-books',
        title: 'Books',
        href: '/library/books',
        icon: BookOpen,
        description: 'Book catalog and inventory',
        organizationTypes: ['library'],
        systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
        orgRoles: ['OWNER', 'ADMIN', 'EDITOR']
      },
      {
        id: 'library-loans',
        title: 'Loans',
        href: '/library/loans',
        icon: FileText,
        description: 'Book loans and returns',
        organizationTypes: ['library'],
        systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
        orgRoles: ['OWNER', 'ADMIN', 'EDITOR']
      },
      {
        id: 'library-reservations',
        title: 'Reservations',
        href: '/library/reservations',
        icon: Calendar,
        description: 'Book reservations',
        organizationTypes: ['library'],
        systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
        orgRoles: ['OWNER', 'ADMIN', 'EDITOR']
      }
    ]
  },

  // System Admin Features - Require system admin role
  {
    id: 'user-management',
    title: 'User Management',
    href: '/users',
    icon: Users,
    description: 'System user administration',
    organizationTypes: ['school', 'church', 'library', 'general'],
    systemRoles: ['ADMIN', 'SUPERADMIN']
  },

  {
    id: 'notifications',
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
    badge: '3',
    description: 'System notifications and alerts',
    organizationTypes: ['school', 'church', 'library', 'general'],
    systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
    orgRoles: ['OWNER', 'ADMIN', 'EDITOR', 'MEMBER']
  },

  // Admin Panel - System-level administration
  {
    id: 'admin-panel',
    title: 'Admin Panel',
    icon: Settings,
    organizationTypes: ['school', 'church', 'library', 'general'],
    systemRoles: ['ADMIN', 'SUPERADMIN'],
    children: [
      {
        id: 'admin-overview',
        title: 'Overview',
        href: '/admin',
        icon: LayoutDashboard,
        description: 'Admin dashboard',
        organizationTypes: ['school', 'church', 'library', 'general'],
        systemRoles: ['ADMIN', 'SUPERADMIN']
      },
      {
        id: 'admin-users',
        title: 'Users',
        href: '/admin/users',
        icon: Users,
        description: 'User administration',
        organizationTypes: ['school', 'church', 'library', 'general'],
        systemRoles: ['ADMIN', 'SUPERADMIN']
      },
      {
        id: 'admin-roles',
        title: 'Roles & Permissions',
        href: '/admin/roles',
        icon: Shield,
        description: 'Role and permission management',
        organizationTypes: ['school', 'church', 'library', 'general'],
        systemRoles: ['ADMIN', 'SUPERADMIN']
      },
      {
        id: 'admin-teams',
        title: 'Teams',
        href: '/admin/teams',
        icon: User,
        description: 'Team management',
        organizationTypes: ['school', 'church', 'library', 'general'],
        systemRoles: ['ADMIN', 'SUPERADMIN']
      },
      {
        id: 'admin-analytics',
        title: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
        description: 'Advanced analytics and reporting',
        organizationTypes: ['school', 'church', 'library', 'general'],
        systemRoles: ['ADMIN', 'SUPERADMIN']
      },
      {
        id: 'admin-plans',
        title: 'Plans & Billing',
        href: '/admin/plans',
        icon: Crown,
        description: 'Subscription and billing management',
        organizationTypes: ['school', 'church', 'library', 'general'],
        systemRoles: ['SUPERADMIN']
      }
    ]
  },

  // Settings - Available to all authenticated users
  {
    id: 'settings',
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'User preferences and profile',
    organizationTypes: ['school', 'church', 'library', 'general'],
    systemRoles: ['USER', 'ADMIN', 'SUPERADMIN'],
    orgRoles: ['OWNER', 'ADMIN', 'EDITOR', 'MEMBER']
  }
];

export function UnifiedSidebar({
  className,
  variant = 'default',
  collapsed = false,
  onToggleCollapse
}: UnifiedSidebarProps) {
  const pathname = usePathname();
  const user = useCurrentUser();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Get current context
  const userRole = user?.role || 'USER';
  const currentOrgType: 'school' | 'church' | 'library' | 'general' = 'school'; // TODO: Get from context

  // Filter navigation items based on role and organization
  const filteredItems = useMemo(() => {
    return NAVIGATION_CONFIG.filter(item => {
      // System role check
      if (item.systemRoles && !item.systemRoles.includes(userRole as 'USER' | 'ADMIN' | 'SUPERADMIN')) {
        return false;
      }

      // Organization type check
      if (item.organizationTypes && !item.organizationTypes.includes(currentOrgType)) {
        return false;
      }

      return true;
    }).map(item => ({
      ...item,
      children: item.children?.filter(child => {
        // System role check for children
        if (child.systemRoles && !child.systemRoles.includes(userRole as 'USER' | 'ADMIN' | 'SUPERADMIN')) {
          return false;
        }

        // Organization type check for children
        if (child.organizationTypes && !child.organizationTypes.includes(currentOrgType)) {
          return false;
        }

        return true;
      })
    }));
  }, [userRole, currentOrgType]);

  // Auto-expand sections with active children
  React.useEffect(() => {
    const newExpanded = new Set<string>();
    filteredItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child =>
          child.href && (pathname === child.href || pathname.startsWith(child.href + '/'))
        );
        if (hasActiveChild) {
          newExpanded.add(item.id);
        }
      }
    });
    setExpandedSections(newExpanded);
  }, [pathname, filteredItems]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const handleLogout = async () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  // Mobile Navigation Component
  const MobileNavigation = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0 h-screen flex flex-col">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );

  // Sidebar Content Component
  const SidebarContent = () => (
    <div className="flex h-full flex-col min-h-0">
      {/* Header */}
      <div className={cn(
        "flex h-16 items-center border-b border-border px-6 flex-shrink-0",
        collapsed && !isMobile && "px-3 justify-center"
      )}>
        {!collapsed || isMobile ? (
          <div className="flex items-center gap-2 flex-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">P</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">P-Core</h1>
              <p className="text-xs text-muted-foreground">Management System</p>
            </div>
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">P</span>
          </div>
        )}
      </div>

      {/* Navigation - Scrollable area */}
      <ScrollArea className="flex-1 min-h-0">
        <nav className="px-3 py-4 space-y-2">
          {filteredItems.map((item) => (
            <NavigationItemComponent key={item.id} item={item} />
          ))}
        </nav>
      </ScrollArea>

      {/* User Menu - Fixed at bottom */}
      <div className="border-t border-border p-4 flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 px-3 py-2 h-auto data-[state=open]:bg-accent",
                collapsed && !isMobile && "px-2 justify-center"
              )}
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              {(!collapsed || isMobile) && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name || "User"}</span>
                  <span className="truncate text-xs text-muted-foreground">{user?.email || ""}</span>
                </div>
              )}
              {(!collapsed || isMobile) && <ChevronsUpDown className="ml-auto size-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side="top"
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                  <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name || "User"}</span>
                  <span className="truncate text-xs text-muted-foreground">{user?.email || ""}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck className="mr-2 h-4 w-4" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  // Navigation Item Component
  const NavigationItemComponent = ({ item }: { item: NavigationItem }) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.has(item.id);
    const isItemActive = isActive(item.href) || (hasChildren && item.children?.some(child => isActive(child.href)));

    if (hasChildren) {
      return (
        <Collapsible open={isExpanded} onOpenChange={() => toggleSection(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'w-full justify-between px-3 py-2 h-auto',
                isItemActive && 'bg-accent text-accent-foreground',
                collapsed && !isMobile && 'px-2 justify-center'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("h-4 w-4", collapsed && !isMobile && "h-5 w-5")} />
                {(!collapsed || isMobile) && (
                  <span className="text-sm font-medium">{item.title}</span>
                )}
                {(!collapsed || isMobile) && item.badge && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {item.badge}
                  </Badge>
                )}
              </div>
              {(!collapsed || isMobile) && (
                isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              )}
            </Button>
          </CollapsibleTrigger>
          {(!collapsed || isMobile) && (
            <CollapsibleContent className="space-y-1 pl-6">
              {item.children?.map((child) => (
                <Link key={child.id} href={child.href || '#'}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'w-full justify-start gap-3 px-3 py-2 h-auto text-sm',
                      isActive(child.href) && 'bg-accent/50 text-accent-foreground font-medium'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <child.icon className="h-3 w-3" />
                    <span>{child.title}</span>
                    {child.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {child.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    }

    return (
      <Link href={item.href || '#'}>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-3 px-3 py-2 h-auto',
            isItemActive && 'bg-accent text-accent-foreground font-medium',
            collapsed && !isMobile && 'px-2 justify-center'
          )}
          onClick={() => setIsOpen(false)}
        >
          <item.icon className={cn("h-4 w-4", collapsed && !isMobile && "h-5 w-5")} />
          {(!collapsed || isMobile) && (
            <>
              <span className="text-sm font-medium">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </Button>
      </Link>
    );
  };

  // Render based on device type
  if (isMobile) {
    return <MobileNavigation />;
  }

  // Desktop sidebar with collapse functionality
  return (
    <div className={cn(
      'hidden md:flex flex-col border-r bg-background transition-all duration-300 ease-in-out',
      collapsed ? 'w-16' : 'w-64',
      className
    )}>
      <SidebarContent />
    </div>
  );
}
