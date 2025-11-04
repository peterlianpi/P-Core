/**
 * Task Filters Component
 * 
 * Provides filtering and sorting controls for task lists
 * 
 * @component
 * @example
 * ```tsx
 * <TaskFilters
 *   filters={filters}
 *   onFiltersChange={setFilters}
 *   sortOptions={sortOptions}
 *   onSortChange={setSortOptions}
 * />
 * ```
 */

'use client';

import React from 'react';
import type { TaskFilters, TaskSortOptions } from '../types';
import { TaskStatus, TaskPriority } from '../types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Search, SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskFiltersProps {
  /** Current filter values */
  filters: TaskFilters;
  /** Callback when filters change */
  onFiltersChange: (filters: TaskFilters) => void;
  /** Current sort options */
  sortOptions: TaskSortOptions;
  /** Callback when sort options change */
  onSortChange: (options: TaskSortOptions) => void;
  /** Available tags for filtering */
  availableTags?: string[];
}

/**
 * TaskFilters - Filter and sort controls for tasks
 */
export function TaskFilters({
  filters,
  onFiltersChange,
  sortOptions,
  onSortChange,
  availableTags = [],
}: TaskFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hasActiveFilters =
    (filters.status && filters.status.length > 0) ||
    (filters.priority && filters.priority.length > 0) ||
    (filters.tags && filters.tags.length > 0) ||
    !!filters.search;

  const activeFilterCount =
    (filters.status?.length || 0) +
    (filters.priority?.length || 0) +
    (filters.tags?.length || 0) +
    (filters.search ? 1 : 0);

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value || undefined });
  };

  const toggleStatus = (status: TaskStatus) => {
    const current = filters.status || [];
    const updated = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    onFiltersChange({ ...filters, status: updated.length > 0 ? updated : undefined });
  };

  const togglePriority = (priority: TaskPriority) => {
    const current = filters.priority || [];
    const updated = current.includes(priority)
      ? current.filter(p => p !== priority)
      : [...current, priority];
    onFiltersChange({ ...filters, priority: updated.length > 0 ? updated : undefined });
  };

  const toggleTag = (tag: string) => {
    const current = filters.tags || [];
    const updated = current.includes(tag)
      ? current.filter(t => t !== tag)
      : [...current, tag];
    onFiltersChange({ ...filters, tags: updated.length > 0 ? updated : undefined });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Filters</h4>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-auto p-1 text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <Separator />

              {/* Status Filter */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Status</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.values(TaskStatus).map((status) => (
                    <Badge
                      key={status}
                      variant={filters.status?.includes(status) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => toggleStatus(status)}
                    >
                      {status.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Priority Filter */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Priority</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.values(TaskPriority).map((priority) => (
                    <Badge
                      key={priority}
                      variant={filters.priority?.includes(priority) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => togglePriority(priority)}
                    >
                      {priority}
                    </Badge>
                  ))}
                </div>
              </div>

              {availableTags.length > 0 && (
                <>
                  <Separator />

                  {/* Tags Filter */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {availableTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={filters.tags?.includes(tag) ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Sort Options */}
        <Select
          value={`${sortOptions.field}-${sortOptions.direction}`}
          onValueChange={(value) => {
            const [field, direction] = value.split('-') as [TaskSortOptions['field'], TaskSortOptions['direction']];
            onSortChange({ field, direction });
          }}
        >
          <SelectTrigger className="w-[180px]">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt-desc">Newest First</SelectItem>
            <SelectItem value="createdAt-asc">Oldest First</SelectItem>
            <SelectItem value="dueDate-asc">Due Date (Soon)</SelectItem>
            <SelectItem value="dueDate-desc">Due Date (Later)</SelectItem>
            <SelectItem value="priority-desc">Priority (High)</SelectItem>
            <SelectItem value="priority-asc">Priority (Low)</SelectItem>
            <SelectItem value="title-asc">Title (A-Z)</SelectItem>
            <SelectItem value="title-desc">Title (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.status?.map((status) => (
            <Badge key={status} variant="secondary" className="gap-1">
              Status: {status.replace('_', ' ')}
              <button
                onClick={() => toggleStatus(status)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.priority?.map((priority) => (
            <Badge key={priority} variant="secondary" className="gap-1">
              Priority: {priority}
              <button
                onClick={() => togglePriority(priority)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {filters.tags?.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              Tag: {tag}
              <button
                onClick={() => toggleTag(tag)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}