"use client";

/**
 * MOBILE LAYOUT COMPONENT
 *
 * Provides a mobile-first layout with:
 * 1. Mobile navigation system
 * 2. Responsive content area
 * 3. Safe area handling for mobile devices
 * 4. Touch-friendly interactions
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import { MobileNavigation } from "./mobile-navigation";
import { useIsMobile } from "@/hooks/use-mobile";

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

interface MobileLayoutProps {
  children: React.ReactNode;
  organizations: Organizations[];
  className?: string;
  showNavigation?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function MobileLayout({
  children,
  organizations,
  className,
  showNavigation = true,
  header,
  footer
}: MobileLayoutProps) {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className={cn(
      "min-h-screen bg-background",
      "safe-area-inset-top safe-area-inset-bottom",
      className
    )}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-inset-top">
          <div className="container flex h-14 items-center px-4">
            {header}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={cn(
        "flex-1",
        showNavigation ? "pb-20" : "", // Add bottom padding for navigation
        header ? "pt-0" : "pt-safe"
      )}>
        <div className="container px-4 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      {footer && (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-inset-bottom">
          <div className="container px-4 py-4">
            {footer}
          </div>
        </footer>
      )}

      {/* Mobile Navigation */}
      {showNavigation && (
        <MobileNavigation organizations={organizations} />
      )}
    </div>
  );
}

// Mobile Page Wrapper for consistent mobile pages
interface MobilePageProps {
  children: React.ReactNode;
  organizations: Organizations[];
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
}

export function MobilePage({
  children,
  organizations,
  title,
  subtitle,
  actions,
  className,
  showNavigation = true
}: MobilePageProps) {
  const header = title ? (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        {title && (
          <h1 className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  ) : null;

  return (
    <MobileLayout
      organizations={organizations}
      showNavigation={showNavigation}
      header={header}
      className={className}
    >
      {children}
    </MobileLayout>
  );
}

// Mobile Card component for consistent content blocks
interface MobileCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

export function MobileCard({
  children,
  className,
  padding = "md"
}: MobileCardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6"
  };

  return (
    <div className={cn(
      "bg-card text-card-foreground rounded-lg border shadow-sm",
      paddingClasses[padding],
      className
    )}>
      {children}
    </div>
  );
}

// Mobile Section component for grouping content
interface MobileSectionProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  spacing?: "none" | "sm" | "md" | "lg";
}

export function MobileSection({
  children,
  title,
  className,
  spacing = "md"
}: MobileSectionProps) {
  const spacingClasses = {
    none: "",
    sm: "space-y-2",
    md: "space-y-4",
    lg: "space-y-6"
  };

  return (
    <section className={cn(spacingClasses[spacing], className)}>
      {title && (
        <h2 className="text-base font-semibold leading-none tracking-tight">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
