"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  Home,
  BarChart3,
  PieChart,
  Shield,
  GraduationCap,
  Church,
  Library,
  Users,
  BookOpen,
  Calendar
} from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useRouter, usePathname } from "next/navigation";

export function MobileNav() {
  const user = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  // Mock current organization - in real app this would come from context
  const currentOrganization = {
    id: 'school-1',
    name: 'Springfield High School',
    type: 'school' as 'school' | 'church' | 'library' | 'general',
    subdomain: 'springfield',
  };

  // Function to get organization logo/initial
  const getOrganizationLogo = () => {
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

  const handleLogout = () => {
    // For demo purposes, just redirect to login
    router.push("/auth/login");
  };

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/school/students", label: "Students", icon: GraduationCap },
    { href: "/school/courses", label: "Courses", icon: BookOpen },
    { href: "/school/schedules", label: "Schedules", icon: Calendar },
    { href: "/church/members", label: "Church", icon: Church },
    { href: "/library/books", label: "Library", icon: Library },
    { href: "/users", label: "Users", icon: Users },
    { href: "/notifications", label: "Notifications", icon: Bell },
    { href: "/admin", label: "Admin", icon: Shield },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <span className="text-sm font-bold text-white">{getOrganizationLogo()}</span>
              </div>
              <span className="truncate max-w-[180px]">{currentOrganization.name}</span>
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Button
                  key={item.href}
                  variant={active ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    router.push(item.href);
                    setIsOpen(false);
                  }}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* Notifications */}
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          3
        </span>
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />
              <AvatarFallback>
                {user?.name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.name || "Demo User"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email || "demo@example.com"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
