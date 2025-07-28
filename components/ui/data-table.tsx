"use client"

import * as React from "react"
import { Search, Filter, X, ChevronDown, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Column<T> {
  /**
   * Unique identifier for the column
   */
  key: keyof T | string
  /**
   * Display label for the column header
   */
  label: string
  /**
   * Custom render function for the cell content
   */
  render?: (value: any, row: T) => React.ReactNode
  /**
   * Whether the column is sortable
   */
  sortable?: boolean
  /**
   * CSS classes for responsive visibility
   */
  className?: string
  /**
   * Width of the column
   */
  width?: string
}

interface FilterOption {
  /**
   * Unique identifier for the filter
   */
  key: string
  /**
   * Display label for the filter
   */
  label: string
  /**
   * Available options for the filter
   */
  options: Array<{ value: string; label: string }>
  /**
   * Current selected value
   */
  value: string
  /**
   * Callback when filter value changes
   */
  onChange: (value: string) => void
}

interface DataTableProps<T> {
  /**
   * Array of data to display
   */
  data: T[]
  /**
   * Column definitions
   */
  columns: Column<T>[]
  /**
   * Search configuration
   */
  search?: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
  }
  /**
   * Filter configurations
   */
  filters?: FilterOption[]
  /**
   * Loading state
   */
  isLoading?: boolean
  /**
   * Empty state message
   */
  emptyMessage?: string
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Row actions
   */
  actions?: Array<{
    label: string
    onClick: (row: T) => void
    variant?: "default" | "destructive"
  }>
}

/**
 * DataTable component with search, filtering, and responsive design
 * 
 * Features:
 * - Responsive column hiding
 * - Search functionality
 * - Multiple filters
 * - Loading states
 * - Row actions
 * - Mobile-optimized layout
 * 
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={[
 *     { key: 'name', label: 'Name' },
 *     { key: 'email', label: 'Email', className: 'hidden sm:table-cell' },
 *     { key: 'role', label: 'Role', render: (value) => <Badge>{value}</Badge> }
 *   ]}
 *   search={{
 *     value: searchTerm,
 *     onChange: setSearchTerm,
 *     placeholder: "Search users..."
 *   }}
 *   filters={[
 *     {
 *       key: 'role',
 *       label: 'Role',
 *       options: [
 *         { value: 'all', label: 'All Roles' },
 *         { value: 'admin', label: 'Admin' }
 *       ],
 *       value: roleFilter,
 *       onChange: setRoleFilter
 *     }
 *   ]}
 * />
 * ```
 */
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  search,
  filters = [],
  isLoading = false,
  emptyMessage = "No data available",
  className,
  actions = []
}: DataTableProps<T>) {
  const hasActiveFilters = filters.some(filter => filter.value !== 'all' && filter.value !== '')
  const hasActiveSearch = search?.value && search.value.trim() !== ''

  const clearAllFilters = () => {
    search?.onChange('')
    filters.forEach(filter => filter.onChange('all'))
  }

  const renderCell = (column: Column<T>, row: T) => {
    const value = typeof column.key === 'string' && column.key.includes('.') 
      ? column.key.split('.').reduce((obj, key) => obj?.[key], row)
      : row[column.key as keyof T]

    if (column.render) {
      return column.render(value, row)
    }

    return value
  }

  if (isLoading) {
    return (
      <div className={cn("space-y-4", className)}>
        {/* Loading skeleton for search and filters */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <Skeleton className="h-10 w-64" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        
        {/* Loading skeleton for table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index} className={column.className}>
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                ))}
                {actions.length > 0 && (
                  <TableHead>
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} className={column.className}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                  {actions.length > 0 && (
                    <TableCell>
                      <Skeleton className="h-8 w-8" />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filters */}
      {(search || filters.length > 0) && (
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          {/* Search */}
          {search && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={search.placeholder || "Search..."}
                value={search.value}
                onChange={(e) => search.onChange(e.target.value)}
                className="pl-8"
              />
              {search.value && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => search.onChange("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}

          {/* Filters */}
          {filters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Select
                  key={filter.key}
                  value={filter.value}
                  onValueChange={filter.onChange}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
              
              {(hasActiveFilters || hasActiveSearch) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="px-3"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={cn(column.className)}
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </TableHead>
                ))}
                {actions.length > 0 && (
                  <TableHead className="w-[70px]">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                    className="h-24 text-center text-muted-foreground"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                data.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell
                        key={String(column.key)}
                        className={cn(column.className)}
                      >
                        {renderCell(column, row)}
                      </TableCell>
                    ))}
                    {actions.length > 0 && (
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {actions.map((action, actionIndex) => (
                              <DropdownMenuItem
                                key={actionIndex}
                                onClick={() => action.onClick(row)}
                                className={cn(
                                  action.variant === "destructive" && "text-destructive"
                                )}
                              >
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export type { DataTableProps, Column, FilterOption }