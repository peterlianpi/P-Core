/**
 * P-Core Sidebar Navigation
 * Comprehensive navigation for all management systems
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
  LogOut
} from 'lucide-react';
import { UserRole } from '@/types/auth';
import { useSession } from 'next-auth/react';
import { useCurrentUser } from '@/hooks/use-current-user';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  Sparkles,
} from "lucide-react"

interface NavigationItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavigationItem[];
  description?: string;
  organizationTypes?: ('school' | 'church' | 'library' | 'general')[];
  roles?: ('USER' | 'ADMIN' | 'SUPERADMIN')[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'System overview and analytics',
    organizationTypes: ['school', 'church', 'library', 'general']
  },
  {
    title: 'School Management',
    icon: GraduationCap,
    organizationTypes: ['school'],
    children: [
      {
        title: 'Students',
        href: '/school/students',
        icon: Users,
        description: 'Student enrollment and management',
        organizationTypes: ['school']
      },
      {
        title: 'Courses',
        href: '/school/courses',
        icon: BookOpen,
        description: 'Course catalog and curriculum',
        organizationTypes: ['school']
      },
      {
        title: 'Schedules',
        href: '/school/schedules',
        icon: Calendar,
        description: 'Class schedules and timetables',
        organizationTypes: ['school']
      }
    ]
  },
  {
    title: 'Church Management',
    icon: Church,
    organizationTypes: ['church'],
    children: [
      {
        title: 'Members',
        href: '/church/members',
        icon: Users,
        description: 'Church member management',
        organizationTypes: ['church']
      },
      {
        title: 'Choirs',
        href: '/church/choirs',
        icon: Music,
        description: 'Choir and music ministry',
        organizationTypes: ['church']
      },
      {
        title: 'Families',
        href: '/church/families',
        icon: Heart,
        description: 'Family ministry management',
        organizationTypes: ['church']
      }
    ]
  },
  {
    title: 'Library Management',
    icon: Library,
    organizationTypes: ['library'],
    children: [
      {
        title: 'Books',
        href: '/library/books',
        icon: BookOpen,
        description: 'Book catalog and inventory',
        organizationTypes: ['library']
      },
      {
        title: 'Loans',
        href: '/library/loans',
        icon: FileText,
        description: 'Book loans and returns',
        organizationTypes: ['library']
      },
      {
        title: 'Reservations',
        href: '/library/reservations',
        icon: Calendar,
        description: 'Book reservations',
        organizationTypes: ['library']
      }
    ]
  },
  {
    title: 'User Management',
    href: '/users',
    icon: Users,
    description: 'System user administration',
    organizationTypes: ['school', 'church', 'library', 'general'],
    roles: ['ADMIN', 'SUPERADMIN']
  },
  {
    title: 'Notifications',
    href: '/notifications',
    icon: Bell,
    badge: '3',
    description: 'System notifications and alerts',
    organizationTypes: ['school', 'church', 'library', 'general']
  },
  {
    title: 'Admin Panel',
    icon: Settings,
    organizationTypes: ['school', 'church', 'library', 'general'],
    roles: ['ADMIN', 'SUPERADMIN'],
    children: [
      {
        title: 'Overview',
        href: '/admin',
        icon: LayoutDashboard,
        description: 'Admin dashboard',
        organizationTypes: ['school', 'church', 'library', 'general'],
        roles: ['ADMIN', 'SUPERADMIN']
      },
      {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
        description: 'User administration',
        organizationTypes: ['school', 'church', 'library', 'general'],
        roles: ['ADMIN', 'SUPERADMIN']
      },
      {
        title: 'Roles & Permissions',
        href: '/admin/roles',
        icon: Shield,
        description: 'Role and permission management',
        organizationTypes: ['school', 'church', 'library', 'general'],
        roles: ['ADMIN', 'SUPERADMIN']
      },
      {
        title: 'Teams',
        href: '/admin/teams',
        icon: User,
        description: 'Team management',
        organizationTypes: ['school', 'church', 'library', 'general'],
        roles: ['ADMIN', 'SUPERADMIN']
      },
      {
        title: 'Plans & Billing',
        href: '/admin/plans',
        icon: Crown,
        description: 'Subscription and billing management',
        organizationTypes: ['school', 'church', 'library', 'general'],
        roles: ['SUPERADMIN']
      },
      {
        title: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
        description: 'Advanced analytics and reporting',
        organizationTypes: ['school', 'church', 'library', 'general'],
        roles: ['ADMIN', 'SUPERADMIN']
      },
      {
        title: 'Notifications',
        href: '/admin/notifications',
        icon: Bell,
        description: 'System notifications',
        organizationTypes: ['school', 'church', 'library', 'general'],
        roles: ['ADMIN', 'SUPERADMIN']
      },
      {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
        description: 'System configuration',
        organizationTypes: ['school', 'church', 'library', 'general'],
        roles: ['ADMIN', 'SUPERADMIN']
      }
    ]
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'User preferences and profile',
    organizationTypes: ['school', 'church', 'library', 'general']
  }
];

interface PCoreSidebarProps {
  className?: string;
}

export function PCoreSidebar({ className }: PCoreSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = useCurrentUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Mock current organization - in real app this would come from context/state
  const currentOrganizationType: 'school' | 'church' | 'library' | 'general' = 'school';

  // Get user role - default to USER if not available
  const userRole = user?.role || 'USER';

  // Filter navigation items based on organization type and user role
  const filteredNavigationItems = navigationItems.filter(item => {
    // Check organization type filter
    if (item.organizationTypes && !item.organizationTypes.includes(currentOrganizationType)) {
      return false;
    }

    // Check role filter - if roles are specified, user must have one of them
    if (item.roles && !item.roles.includes(userRole as 'USER' | 'ADMIN' | 'SUPERADMIN')) {
      return false;
    }

    return true;
  }).map(item => ({
    ...item,
    children: item.children?.filter(child => {
      // Check organization type for children
      if (child.organizationTypes && !child.organizationTypes.includes(currentOrganizationType)) {
        return false;
      }

      // Check role filter for children
      if (child.roles && !child.roles.includes(userRole as 'USER' | 'ADMIN' | 'SUPERADMIN')) {
        return false;
      }

      return true;
    })
  }));

  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    // Auto-expand sections based on current path
    const expanded = new Set<string>();
    filteredNavigationItems.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child =>
          child.href && pathname.startsWith(child.href)
        );
        if (hasActiveChild) {
          expanded.add(item.title);
        }
      }
    });
    return expanded;
  });

  const toggleSection = (title: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(title)) {
      newOpenSections.delete(title);
    } else {
      newOpenSections.add(title);
    }
    setOpenSections(newOpenSections);
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <div className={cn('flex h-full w-64 flex-col border-r bg-white', className)}>
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 flex-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-sm font-bold text-white">P</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">P-Core</h1>
            <p className="text-sm text-gray-500">Management System</p>
          </div>
        </div>


      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {filteredNavigationItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <Collapsible
                  open={openSections.has(item.title)}
                  onOpenChange={() => toggleSection(item.title)}
                >
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        'w-full justify-between px-3 py-2 h-auto',
                        item.children.some(child => isActive(child.href)) && 'bg-blue-50 text-blue-700'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      {openSections.has(item.title) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 pl-6">
                    {item.children.map((child) => (
                      <Link key={child.title} href={child.href || '#'}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            'w-full justify-start gap-3 px-3 py-2 h-auto text-sm',
                            isActive(child.href) && 'bg-blue-100 text-blue-700 font-medium'
                          )}
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
                </Collapsible>
              ) : (
                <Link href={item.href || '#'}>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start gap-3 px-3 py-2 h-auto',
                      isActive(item.href) && 'bg-blue-100 text-blue-700 font-medium'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer - User Navigation */}
      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2 h-auto data-[state=open]:bg-gray-100"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                <AvatarFallback className="rounded-lg bg-blue-600 text-white">
                  {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{session?.user?.name || "User"}</span>
                <span className="truncate text-xs text-muted-foreground">{session?.user?.email || ""}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
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
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                  <AvatarFallback className="rounded-lg bg-blue-600 text-white">
                    {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{session?.user?.name || "User"}</span>
                  <span className="truncate text-xs text-muted-foreground">{session?.user?.email || ""}</span>
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
              disabled={isLoggingOut}
              onClick={async () => {
                if (confirm('Are you sure you want to sign out?')) {
                  setIsLoggingOut(true);
                  try {
                    // Call the logout server action
                    const response = await fetch('/api/auth/logout', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });

                    if (response.ok) {
                      // Redirect to login page after successful logout
                      window.location.href = '/auth/login';
                    } else {
                      console.error('Logout failed');
                      setIsLoggingOut(false);
                      // Fallback redirect
                      window.location.href = '/auth/login';
                    }
                  } catch (error) {
                    console.error('Logout error:', error);
                    setIsLoggingOut(false);
                    // Fallback redirect
                    window.location.href = '/auth/login';
                  }
                }
              }}
            >
              {isLoggingOut ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                  Signing out...
                </>
              ) : (
                <>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
