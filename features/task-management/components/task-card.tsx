/**
 * Task Card Component
 * 
 * Displays a single task in a card format with actions
 * 
 * @component
 * @example
 * ```tsx
 * <TaskCard
 *   task={task}
 *   onEdit={(task) => console.log('Edit:', task)}
 *   onDelete={(id) => console.log('Delete:', id)}
 *   onStatusChange={(id, status) => console.log('Status:', status)}
 * />
 * ```
 */

'use client';

import React from 'react';
import type { Task } from '../types';
import { TaskStatus } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import {
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { formatDate, getPriorityColor, getStatusColor, isTaskOverdue } from '../utils/helpers';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  /** Task data to display */
  task: Task;
  /** Callback when edit is clicked */
  onEdit?: (task: Task) => void;
  /** Callback when delete is clicked */
  onDelete?: (taskId: string) => void;
  /** Callback when task status changes */
  onStatusChange?: (taskId: string, status: TaskStatus) => void;
  /** Callback when task is clicked */
  onClick?: (task: Task) => void;
}

/**
 * TaskCard - Displays a task with actions
 */
export function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  onClick,
}: TaskCardProps) {
  const isOverdue = isTaskOverdue(task);
  const isCompleted = task.status === TaskStatus.COMPLETED;

  const handleToggleComplete = () => {
    const newStatus = isCompleted ? TaskStatus.TODO : TaskStatus.COMPLETED;
    onStatusChange?.(task.id, newStatus);
  };

  return (
    <Card
      className={cn(
        'group hover:shadow-md transition-all duration-200 cursor-pointer',
        isCompleted && 'opacity-75',
        isOverdue && !isCompleted && 'border-destructive'
      )}
      onClick={() => onClick?.(task)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Checkbox
              checked={isCompleted}
              onCheckedChange={handleToggleComplete}
              onClick={(e) => e.stopPropagation()}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  'font-semibold text-base leading-tight',
                  isCompleted && 'line-through text-muted-foreground'
                )}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(task)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete?.(task.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={cn('text-xs', getStatusColor(task.status))}>
            {task.status.replace('_', ' ')}
          </Badge>
          <Badge variant="outline" className={cn('text-xs', getPriorityColor(task.priority))}>
            {task.priority}
          </Badge>
          {task.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground w-full">
          {task.dueDate && (
            <div className={cn('flex items-center gap-1', isOverdue && !isCompleted && 'text-destructive font-medium')}>
              {isOverdue && !isCompleted ? (
                <AlertCircle className="h-3 w-3" />
              ) : (
                <Calendar className="h-3 w-3" />
              )}
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
          <div className="flex items-center gap-1 ml-auto">
            <Clock className="h-3 w-3" />
            <span>{formatDate(task.updatedAt)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}