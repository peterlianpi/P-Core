'use client';

/**
 * Breadcrumb Navigation Component
 * Displays hierarchical navigation path with proper styling and accessibility
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbNavProps {
  className?: string;
  items?: BreadcrumbItem[];
  showHome?: boolean;
}

export function BreadcrumbNav({
  className,
  items,
  showHome = true
}: BreadcrumbNavProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if not provided
  const breadcrumbs = items || generateBreadcrumbsFromPath(pathname, showHome);

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const Icon = crumb.icon;

        return (
          <div key={crumb.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
            )}

            {isLast ? (
              <span className="flex items-center gap-2 font-medium text-foreground">
                {Icon && <Icon className="h-4 w-4" />}
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbsFromPath(pathname: string, showHome: boolean): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  if (showHome) {
    breadcrumbs.push({
      label: 'Dashboard',
      href: '/dashboard',
      icon: Home
    });
  }

  if (segments.length === 0) {
    return breadcrumbs;
  }

  // Handle different route patterns
  const [section, subsection] = segments;

  switch (section) {
    case 'dashboard':
      // Already added home/dashboard
      break;

    case 'school':
      breadcrumbs.push({
        label: 'School Management',
        href: '/school'
      });
      if (subsection) {
        breadcrumbs.push({
          label: formatBreadcrumbLabel(subsection),
          href: `/school/${subsection}`
        });
      }
      break;

    case 'church':
      breadcrumbs.push({
        label: 'Church Management',
        href: '/church'
      });
      if (subsection) {
        breadcrumbs.push({
          label: formatBreadcrumbLabel(subsection),
          href: `/church/${subsection}`
        });
      }
      break;

    case 'library':
      breadcrumbs.push({
        label: 'Library Management',
        href: '/library'
      });
      if (subsection) {
        breadcrumbs.push({
          label: formatBreadcrumbLabel(subsection),
          href: `/library/${subsection}`
        });
      }
      break;

    case 'admin':
      breadcrumbs.push({
        label: 'Admin Panel',
        href: '/admin'
      });
      if (subsection) {
        breadcrumbs.push({
          label: formatBreadcrumbLabel(subsection),
          href: `/admin/${subsection}`
        });
      }
      break;

    case 'users':
      breadcrumbs.push({
        label: 'User Management',
        href: '/users'
      });
      break;

    case 'notifications':
      breadcrumbs.push({
        label: 'Notifications',
        href: '/notifications'
      });
      break;

    case 'settings':
      breadcrumbs.push({
        label: 'Settings',
        href: '/settings'
      });
      break;

    case 'profile':
      breadcrumbs.push({
        label: 'Profile',
        href: '/profile'
      });
      break;

    default:
      // Generic handling for other routes
      if (subsection) {
        breadcrumbs.push({
          label: formatBreadcrumbLabel(section),
          href: `/${section}`
        });
        breadcrumbs.push({
          label: formatBreadcrumbLabel(subsection),
          href: `/${section}/${subsection}`
        });
      } else {
        breadcrumbs.push({
          label: formatBreadcrumbLabel(section),
          href: `/${section}`
        });
      }
  }

  return breadcrumbs;
}

// Helper function to format breadcrumb labels
function formatBreadcrumbLabel(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
