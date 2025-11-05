/**
 * Admin Sidebar Navigation
 * Dedicated navigation for admin panel with system-wide management features
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
  Users,
  Settings,
  Bell,
  BarChart3,
  ChevronDown,
  ChevronRight,
  User,
  Shield,
  Crown,
  Building2,
  FileText,
  TrendingUp,
  Activity,
  Database,
  Key,
  Globe
} from 'lucide-react';

interface NavigationItem {
  title: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavigationItem[];
  description?: string;
}

const adminNavigationItems: NavigationItem[] = [
  {
    title: 'Admin Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'System overview and analytics'
  },
  {
    title: 'User Management',
    icon: Users,
    children: [
      {
        title: 'All Users',
        href: '/admin/users',
        icon: Users,
        description: 'Manage all system users'
      },
      {
        title: 'Roles & Permissions',
        href: '/admin/roles',
        icon: Shield,
        description: 'Role and permission management'
      },
      {
        title: 'Teams',
        href: '/admin/teams',
        icon: User,
        description: 'Team management'
      }
    ]
  },
  {
    title: 'Organization Management',
    icon: Building2,
    children: [
      {
        title: 'All Organizations',
        href: '/admin/organizations',
        icon: Building2,
        description: 'Manage all organizations'
      },
      {
        title: 'Plans & Billing',
        href: '/admin/plans',
        icon: Crown,
        description: 'Subscription and billing management'
      }
    ]
  },
  {
    title: 'System Analytics',
    icon: BarChart3,
    children: [
      {
        title: 'Analytics Dashboard',
        href: '/admin/analytics',
        icon: BarChart3,
        description: 'Advanced analytics and reporting'
      },
      {
        title: 'Performance Metrics',
        href: '/admin/performance',
        icon: Activity,
        description: 'System performance monitoring'
      },
      {
        title: 'Growth Reports',
        href: '/admin/growth',
        icon: TrendingUp,
        description: 'User acquisition and growth metrics'
      }
    ]
  },
  {
    title: 'System Administration',
    icon: Settings,
    children: [
      {
        title: 'System Settings',
        href: '/admin/settings',
        icon: Settings,
        description: 'Global system configuration'
      },
      {
        title: 'Notifications',
        href: '/admin/notifications',
        icon: Bell,
        description: 'System notifications'
      },
      {
        title: 'Version Management',
        href: '/admin/version',
        icon: Database,
        description: 'System version and updates'
      },
      {
        title: 'Security Audit',
        href: '/admin/security',
        icon: Key,
        description: 'Security monitoring and audit logs'
      }
    ]
  }
];

interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    // Auto-expand sections based on current path
    const expanded = new Set<string>();
    adminNavigationItems.forEach(item => {
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
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">P-Core Admin</h1>
            <p className="text-xs text-gray-500">System Administration</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {adminNavigationItems.map((item) => (
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
                        item.children.some(child => isActive(child.href)) && 'bg-red-50 text-red-700'
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
                            isActive(child.href) && 'bg-red-100 text-red-700 font-medium'
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
                      isActive(item.href) && 'bg-red-100 text-red-700 font-medium'
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

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <User className="h-4 w-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">System Admin</p>
            <p className="text-xs text-gray-500 truncate">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
