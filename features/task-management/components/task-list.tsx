/**
 * Task List Component
 * 
 * Displays a list of tasks with filtering, sorting, and empty states
 * 
 * @component
 * @example
 * ```tsx
 * <TaskList
 *   tasks={tasks}
 *   isLoading={false}
 *   onEdit={(task) => console.log('Edit:', task)}
 *   onDelete={(id) => console.log('Delete:', id)}
 * />
 * ```
 */

'use client';

import React from 'react';
import type { Task } from '../types';
import { TaskStatus } from '../types';
import { TaskCard } from './task-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ListTodo, Plus, Inbox } from 'lucide-react';

interface TaskListProps {
  /** Array of tasks to display */
  tasks: Task[];
  /** Loading state */
  isLoading?: boolean;
  /** Error message */
  error?: string | null;
  /** Callback when edit is clicked */
  onEdit?: (task: Task) => void;
  /** Callback when delete is clicked */
  onDelete?: (taskId: string) => void;
  /** Callback when task status changes */
  onStatusChange?: (taskId: string, status: TaskStatus) => void;
  /** Callback when task is clicked */
  onTaskClick?: (task: Task) => void;
  /** Callback when create new task is clicked */
  onCreateNew?: () => void;
}

/**
 * TaskList - Displays a list of tasks
 */
export function TaskList({
  tasks,
  isLoading = false,
  error = null,
  onEdit,
  onDelete,
  onStatusChange,
  onTaskClick,
  onCreateNew,
}: TaskListProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full" />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Empty state
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <Inbox className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-sm">
          Get started by creating your first task. Stay organized and productive!
        </p>
        {onCreateNew && (
          <Button onClick={onCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Task
          </Button>
        )}
      </div>
    );
  }

  // Task list
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
          onClick={onTaskClick}
        />
      ))}
    </div>
  );
}

/**
 * TaskListSkeleton - Loading skeleton for task list
 */
export function TaskListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-40 w-full" />
      ))}
    </div>
  );
}