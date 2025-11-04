/**
 * Tasks Page
 * 
 * Main page for task management with CRUD operations,
 * filtering, sorting, and statistics
 */

'use client';

import React, { useState } from 'react';
import type { Task, TaskFilters, TaskSortOptions } from '@/features/task-management/types';
import { TaskStatus } from '@/features/task-management/types';
import {
  useTasks,
  useUpdateTask,
  useDeleteTask,
  useTaskStats,
} from '@/features/task-management/hooks/use-tasks';
import {
  TaskList,
  TaskFilters as TaskFiltersComponent,
  TaskStats,
  TaskDialog,
} from '@/features/task-management/components';
import { getAllTags } from '@/features/task-management/utils/helpers';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function TasksPage() {
  const [filters, setFilters] = useState<TaskFilters>({});
  const [sortOptions, setSortOptions] = useState<TaskSortOptions>({
    field: 'createdAt',
    direction: 'desc',
  });
  const [activeTab, setActiveTab] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  // Queries and mutations
  const { data: tasks = [], isLoading, refetch } = useTasks(filters, sortOptions);
  const { data: stats } = useTaskStats();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  // Get available tags
  const availableTags = tasks ? getAllTags(tasks) : [];

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === 'all') {
      setFilters({});
    } else if (value === 'active') {
      setFilters({ status: [TaskStatus.TODO, TaskStatus.IN_PROGRESS] });
    } else if (value === 'completed') {
      setFilters({ status: [TaskStatus.COMPLETED] });
    }
  };

  // Handle create new task
  const handleCreateNew = () => {
    setDialogMode('create');
    setSelectedTask(undefined);
    setDialogOpen(true);
  };

  // Handle edit task
  const handleEdit = (task: Task) => {
    setDialogMode('edit');
    setSelectedTask(task);
    setDialogOpen(true);
  };

  // Handle delete task
  const handleDelete = (taskId: string) => {
    setTaskToDelete(taskId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask.mutate(taskToDelete, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setTaskToDelete(null);
        },
      });
    }
  };

  // Handle status change
  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    updateTask.mutate({ taskId, data: { status } });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Manage your tasks and stay organized
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={handleCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-8">
        <TaskStats stats={stats} isLoading={isLoading} />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Filters */}
          <TaskFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            sortOptions={sortOptions}
            onSortChange={setSortOptions}
            availableTags={availableTags}
          />

          {/* Task List */}
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onCreateNew={handleCreateNew}
          />
        </TabsContent>
      </Tabs>

      {/* Task Dialog */}
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode={dialogMode}
        task={selectedTask}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}