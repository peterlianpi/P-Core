/**
 * Task Dialog Component
 * 
 * Modal dialog for creating and editing tasks
 * 
 * @component
 * @example
 * ```tsx
 * <TaskDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   mode="create"
 *   onSuccess={(task) => console.log('Success:', task)}
 * />
 * ```
 */

'use client';

import React from 'react';
import type { Task } from '../types';
import { TaskForm } from './task-form';
import { useCreateTask, useUpdateTask } from '../hooks/use-tasks';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TaskDialogProps {
  /** Whether dialog is open */
  open: boolean;
  /** Callback when open state changes */
  onOpenChange: (open: boolean) => void;
  /** Dialog mode - create or edit */
  mode: 'create' | 'edit';
  /** Task data for edit mode */
  task?: Task;
  /** Callback on successful operation */
  onSuccess?: (task: Task) => void;
}

/**
 * TaskDialog - Modal for creating/editing tasks
 */
export function TaskDialog({
  open,
  onOpenChange,
  mode,
  task,
  onSuccess,
}: TaskDialogProps) {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const handleSuccess = (taskData: Task) => {
    if (mode === 'create') {
      createTask.mutate(taskData, {
        onSuccess: (newTask) => {
          onSuccess?.(newTask);
          onOpenChange(false);
        },
      });
    } else if (task) {
      updateTask.mutate(
        { taskId: task.id, data: taskData },
        {
          onSuccess: (updatedTask) => {
            onSuccess?.(updatedTask);
            onOpenChange(false);
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create New Task' : 'Edit Task'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Add a new task to your list. Fill in the details below.'
              : 'Update the task details below.'}
          </DialogDescription>
        </DialogHeader>

        <TaskForm
          mode={mode}
          initialData={task}
          onSuccess={handleSuccess}
          onCancel={() => onOpenChange(false)}
          isLoading={createTask.isPending || updateTask.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}