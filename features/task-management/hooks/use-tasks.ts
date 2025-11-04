/**
 * Task Management Hooks
 * 
 * Custom React hooks for task CRUD operations with local persistence
 * and optimistic updates using TanStack Query
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import type { Task, CreateTaskData, UpdateTaskData, TaskFilters, TaskSortOptions } from '../types';
import {
  getTasksFromStorage,
  saveTasksToStorage,
  addTaskToStorage,
  updateTaskInStorage,
  removeTaskFromStorage,
  updateSyncStatus,
  addPendingChange,
} from '../utils/local-storage';
import { generateTaskId, filterTasks, sortTasks, calculateTaskStats } from '../utils/helpers';
import { validateCreateTask, validateUpdateTask } from '../utils/validators';
import { toast } from 'sonner';

const QUERY_KEY = 'tasks';

/**
 * Hook to fetch all tasks with filtering and sorting
 * @param filters - Optional filters to apply
 * @param sortOptions - Optional sort options
 * @returns Query result with tasks
 */
export function useTasks(filters?: TaskFilters, sortOptions?: TaskSortOptions) {
  return useQuery({
    queryKey: [QUERY_KEY, filters, sortOptions],
    queryFn: () => {
      let tasks = getTasksFromStorage();
      
      if (filters) {
        tasks = filterTasks(tasks, filters);
      }
      
      if (sortOptions) {
        tasks = sortTasks(tasks, sortOptions);
      }
      
      return tasks;
    },
    staleTime: 0, // Always fetch fresh data from localStorage
  });
}

/**
 * Hook to fetch a single task by ID
 * @param taskId - ID of the task to fetch
 * @returns Query result with task
 */
export function useTask(taskId: string) {
  return useQuery({
    queryKey: [QUERY_KEY, taskId],
    queryFn: () => {
      const tasks = getTasksFromStorage();
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      return task;
    },
    enabled: !!taskId,
  });
}

/**
 * Hook to create a new task
 * @returns Mutation object for creating tasks
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTaskData) => {
      // Validate data
      const validation = validateCreateTask(data);
      if (!validation.success) {
        throw new Error(validation.error.errors[0].message);
      }

      const newTask: Task = {
        id: generateTaskId(),
        ...validation.data,
        userId: 'current-user', // Replace with actual user ID from auth
        createdAt: new Date(),
        updatedAt: new Date(),
        isSynced: false,
      };

      // Save to local storage
      addTaskToStorage(newTask);
      
      // Track pending change
      addPendingChange({ type: 'create', taskId: newTask.id, data: newTask });

      return newTask;
    },
    onSuccess: (newTask) => {
      // Invalidate and refetch tasks
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success('Task created successfully');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create task');
    },
  });
}

/**
 * Hook to update an existing task
 * @returns Mutation object for updating tasks
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, data }: { taskId: string; data: UpdateTaskData }) => {
      // Validate data
      const validation = validateUpdateTask(data);
      if (!validation.success) {
        throw new Error(validation.error.errors[0].message);
      }

      // Get current task
      const tasks = getTasksFromStorage();
      const currentTask = tasks.find(t => t.id === taskId);
      if (!currentTask) {
        throw new Error('Task not found');
      }

      const updatedTask: Task = {
        ...currentTask,
        ...validation.data,
        updatedAt: new Date(),
        isSynced: false,
      };

      // Update in local storage
      updateTaskInStorage(taskId, updatedTask);
      
      // Track pending change
      addPendingChange({ type: 'update', taskId, data: validation.data });

      return updatedTask;
    },
    onMutate: async ({ taskId, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });

      // Snapshot previous value
      const previousTasks = queryClient.getQueryData([QUERY_KEY]);

      // Optimistically update
      queryClient.setQueryData([QUERY_KEY], (old: Task[] | undefined) => {
        if (!old) return old;
        return old.map(task =>
          task.id === taskId
            ? { ...task, ...data, updatedAt: new Date() }
            : task
        );
      });

      return { previousTasks };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousTasks) {
        queryClient.setQueryData([QUERY_KEY], context.previousTasks);
      }
      toast.error(error instanceof Error ? error.message : 'Failed to update task');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success('Task updated successfully');
    },
  });
}

/**
 * Hook to delete a task
 * @returns Mutation object for deleting tasks
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      // Remove from local storage
      removeTaskFromStorage(taskId);
      
      // Track pending change
      addPendingChange({ type: 'delete', taskId });

      return taskId;
    },
    onMutate: async (taskId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] });

      // Snapshot previous value
      const previousTasks = queryClient.getQueryData([QUERY_KEY]);

      // Optimistically update
      queryClient.setQueryData([QUERY_KEY], (old: Task[] | undefined) => {
        if (!old) return old;
        return old.filter(task => task.id !== taskId);
      });

      return { previousTasks };
    },
    onError: (error, taskId, context) => {
      // Rollback on error
      if (context?.previousTasks) {
        queryClient.setQueryData([QUERY_KEY], context.previousTasks);
      }
      toast.error('Failed to delete task');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success('Task deleted successfully');
    },
  });
}

/**
 * Hook to get task statistics
 * @returns Query result with task stats
 */
export function useTaskStats() {
  return useQuery({
    queryKey: [QUERY_KEY, 'stats'],
    queryFn: () => {
      const tasks = getTasksFromStorage();
      return calculateTaskStats(tasks);
    },
  });
}

/**
 * Hook to sync tasks with server (placeholder for future implementation)
 * @returns Mutation object for syncing tasks
 */
export function useSyncTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Placeholder for server sync logic
      updateSyncStatus({ isSyncing: true });
      
      // Simulate sync delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateSyncStatus({
        isSyncing: false,
        lastSyncAt: new Date(),
        pendingChanges: 0,
      });
      
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      toast.success('Tasks synced successfully');
    },
    onError: () => {
      updateSyncStatus({ isSyncing: false, error: 'Sync failed' });
      toast.error('Failed to sync tasks');
    },
  });
}