"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  className?: string;
  variant?: "skeleton" | "spinner" | "pulse";
  size?: "sm" | "md" | "lg";
  text?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  className,
  variant = "skeleton",
  size = "md",
  text = "Loading...",
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8",
  };

  if (variant === "spinner") {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
          {text && <p className="text-sm text-muted-foreground">{text}</p>}
        </div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="flex flex-col items-center space-y-3">
          <div className={cn("bg-primary rounded-full animate-pulse", sizeClasses[size])} />
          {text && <p className="text-sm text-muted-foreground">{text}</p>}
        </div>
      </div>
    );
  }

  // Default skeleton variant
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[180px]" />
        <Skeleton className="h-4 w-[220px]" />
      </div>
    </div>
  );
};

// Card loading skeleton
export const CardLoadingSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <Card className={className}>
    <CardHeader>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[160px]" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[80%]" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </CardContent>
  </Card>
);

// Table loading skeleton
export const TableLoadingSkeleton: React.FC<{ rows?: number; className?: string }> = ({ 
  rows = 5, 
  className 
}) => (
  <div className={cn("space-y-3", className)}>
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4 p-4 border rounded">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-3 w-[180px]" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    ))}
  </div>
);

// Dashboard stats loading skeleton
export const StatsLoadingSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
    {Array.from({ length: 4 }).map((_, index) => (
      <Card key={index}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-[120px]" />
          <Skeleton className="h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-[80px] mb-2" />
          <Skeleton className="h-3 w-[100px]" />
        </CardContent>
      </Card>
    ))}
  </div>
);

// Chart loading skeleton
export const ChartLoadingSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <Card className={className}>
    <CardHeader>
      <Skeleton className="h-6 w-[200px]" />
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex justify-between items-end space-x-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className={`w-12 h-${20 + (index % 3) * 8}`} />
          ))}
        </div>
        <div className="flex justify-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-3 w-8" />
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Form loading skeleton
export const FormLoadingSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <Card className={className}>
    <CardHeader>
      <Skeleton className="h-6 w-[200px]" />
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-20 w-full" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="h-10 w-[120px]" />
        <Skeleton className="h-10 w-[80px]" />
      </div>
    </CardContent>
  </Card>
);

export default LoadingState;
