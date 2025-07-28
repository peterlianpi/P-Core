"use client"

import * as React from "react"
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface MetricsCardProps {
  /**
   * The title of the metric
   */
  title: string
  /**
   * The main value to display
   */
  value: string | number
  /**
   * Optional description or subtitle
   */
  description?: string
  /**
   * Icon to display in the header
   */
  icon?: LucideIcon
  /**
   * Trend information
   */
  trend?: {
    value: number
    label?: string
    period?: string
  }
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Loading state
   */
  isLoading?: boolean
  /**
   * Color variant for the card
   */
  variant?: "default" | "success" | "warning" | "destructive"
}

/**
 * MetricsCard component for displaying key metrics and statistics
 * 
 * Features:
 * - Clean metric display with icon
 * - Trend indicators with colors
 * - Loading state support
 * - Multiple color variants
 * - Responsive design
 * 
 * @example
 * ```tsx
 * <MetricsCard
 *   title="Total Users"
 *   value={1234}
 *   description="Active users"
 *   icon={Users}
 *   trend={{ value: 12.5, label: "vs last month" }}
 * />
 * ```
 */
export function MetricsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  isLoading = false,
  variant = "default"
}: MetricsCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null
    
    if (trend.value > 0) return TrendingUp
    if (trend.value < 0) return TrendingDown
    return Minus
  }

  const getTrendColor = () => {
    if (!trend) return "text-muted-foreground"
    
    if (trend.value > 0) return "text-green-600 dark:text-green-400"
    if (trend.value < 0) return "text-red-600 dark:text-red-400"
    return "text-muted-foreground"
  }

  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-green-200 dark:border-green-800"
      case "warning":
        return "border-yellow-200 dark:border-yellow-800"
      case "destructive":
        return "border-red-200 dark:border-red-800"
      default:
        return ""
    }
  }

  const TrendIcon = getTrendIcon()

  if (isLoading) {
    return (
      <Card className={cn("animate-pulse", getVariantStyles(), className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 bg-muted rounded w-24"></div>
          <div className="h-4 w-4 bg-muted rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-muted rounded w-20 mb-2"></div>
          <div className="h-3 bg-muted rounded w-32"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn(getVariantStyles(), className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        
        {(description || trend) && (
          <div className="flex items-center justify-between mt-2">
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
            
            {trend && (
              <div className={cn("flex items-center text-xs", getTrendColor())}>
                {TrendIcon && <TrendIcon className="h-3 w-3 mr-1" />}
                <span className="font-medium">
                  {trend.value > 0 ? '+' : ''}{trend.value}%
                </span>
                {trend.label && (
                  <span className="ml-1 text-muted-foreground">
                    {trend.label}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        
        {trend?.period && (
          <p className="text-xs text-muted-foreground mt-1">
            {trend.period}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export type { MetricsCardProps }