'use client';

/**
 * Enhanced Protected Layout with Navigation
 * Comprehensive layout with collapsible sidebar, enhanced header, mobile support, and organization context
 */

import { useState } from 'react';
import { UnifiedSidebar } from '@/components/navigation/unified-sidebar';
import { BreadcrumbNav } from '@/components/navigation/breadcrumb-nav';
import { OrganizationSelector } from '@/components/organization/organization-selector';
import { ModeToggle } from '@/components/mode-toggle';
import { usePathname } from 'next/navigation';
import { useNotifications, useUnreadCount, useMarkAsRead } from '@/features/notifications/mvp/hooks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
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
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  HelpCircle,
  MessageSquare,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useCurrentUser } from '@/hooks/use-current-user';
import ThemeSelector from '@/components/theme/theme-selector';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const pathname = usePathname();
  const user = useCurrentUser();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Real notification data
  const { data: notifications = [] } = useNotifications(5, 0); // Get first 5 notifications
  const { data: unreadCountData } = useUnreadCount();
  const markAsRead = useMarkAsRead();

  const unreadCount = unreadCountData?.count || 0;

  // Function to get page name from pathname
  const getPageName = (path: string) => {
    const pathMap: Record<string, string> = {
      // Dashboard
      '/dashboard': 'Dashboard',

      // School Management
      '/school/students': 'Students',
      '/school/courses': 'Courses',
      '/school/schedules': 'Schedules',

      // Church Management
      '/church/members': 'Members',
      '/church/choirs': 'Choirs',
      '/church/families': 'Families',

      // Library Management
      '/library/books': 'Books',
      '/library/loans': 'Loans',
      '/library/reservations': 'Reservations',

      // User Management
      '/users': 'Users',

      // System
      '/notifications': 'Notifications',
      '/settings': 'Settings',
      '/profile': 'Profile',
    };

    // Check for exact matches first
    if (pathMap[path]) {
      return pathMap[path];
    }

    // Check for partial matches (for nested routes)
    for (const [route, name] of Object.entries(pathMap)) {
      if (path.startsWith(route)) {
        return name;
      }
    }

    return 'P-Core';
  };



  // Function to get organization logo/initial
  const getOrganizationLogo = () => {
    // Mock current organization - in real app this would come from context
    const currentOrganization = {
      id: 'school-1',
      name: 'Springfield High School',
      type: 'school' as 'school' | 'church' | 'library' | 'general',
      subdomain: 'springfield',
    };

    // Return first letter of organization name, or type-specific icon
    switch (currentOrganization.type) {
      case 'school':
        return '🎓'; // School icon
      case 'church':
        return '⛪'; // Church icon
      case 'library':
        return '📚'; // Library icon
      default:
        return currentOrganization.name.charAt(0).toUpperCase();
    }
  };

  const currentPageName = getPageName(pathname);

  const handleLogout = async () => {
    // TODO: Implement logout logic
    console.log('Logout clicked');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="h-screen bg-background">
      {/* Mobile Navigation Header */}
      <div className="sticky top-0 z-40 md:hidden">
        <div className="flex h-16 items-center justify-between border-b border-border bg-card px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">{getOrganizationLogo()}</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{currentPageName}</h1>
            </div>

          </div>

          <div className='flex gap-2'>
            {/* Theme Toggle */}
             <ThemeSelector />
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-80 mx-2">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={`flex flex-col items-start p-4 cursor-pointer ${!notification.isRead ? 'bg-accent' : ''
                          }`}
                        onClick={() => markAsRead.mutate(notification.id)}
                      >
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground">{notification.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No notifications
                    </div>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
           
            <UnifiedSidebar />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen overflow-hidden">
        {/* Sidebar */}
        <UnifiedSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />

        {/* Main Content */}
        <div className='flex-1 transition-all h-full duration-300 ease-in-out mx-2'>
          {/* Enhanced Desktop Header */}
          <div className="rounded-lg sticky top-0 z-40 border-b border-border bg-card px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section - Breadcrumbs and Page Title */}
              <div className="flex items-center gap-4">
                {/* Sidebar Toggle Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="h-8 w-8"
                >
                  {sidebarCollapsed ? (
                    <PanelLeftOpen className="h-4 w-4" />
                  ) : (
                    <PanelLeftClose className="h-4 w-4" />
                  )}
                </Button>

                {/* Breadcrumbs */}
                <BreadcrumbNav />
              </div>

              {/* Right Section - Actions and User Menu */}
              <div className="flex items-center gap-3">
                {/* Search */}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Search className="h-4 w-4" />
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 relative">
                      <Bell className="h-4 w-4" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {unreadCount > 99 ? '99+' : unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <DropdownMenuItem
                            key={notification.id}
                            className={`flex flex-col items-start p-4 cursor-pointer ${!notification.isRead ? 'bg-accent' : ''
                              }`}
                            onClick={() => markAsRead.mutate(notification.id)}
                          >
                            <div className="font-medium">{notification.title}</div>
                            <div className="text-sm text-muted-foreground">{notification.message}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </div>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No notifications
                        </div>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-center">
                      View all notifications
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Theme Toggle */}
                <ThemeSelector />

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 h-8 px-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{user?.name || "User"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help & Support
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Feedback
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <main className="py-4 h-full overflow-auto scrollbar-hide">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
