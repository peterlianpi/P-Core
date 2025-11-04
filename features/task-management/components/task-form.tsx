/**
 * Task Form Component
 * 
 * Reusable form component for creating and editing tasks
 * with comprehensive validation and error handling
 * 
 * @component
 * @example
 * ```tsx
 * <TaskForm
 *   mode="create"
 *   onSuccess={(task) => console.log('Created:', task)}
 *   onCancel={() => console.log('Cancelled')}
 * />
 * ```
 */

'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Task, CreateTaskData, UpdateTaskData } from '../types';
import { TaskStatus, TaskPriority } from '../types';
import { createTaskSchema, updateTaskSchema } from '../utils/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Calendar as CalendarIcon, X, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TaskFormProps {
  /** Form mode - create new task or edit existing */
  mode: 'create' | 'edit';
  /** Initial task data (required for edit mode) */
  initialData?: Task;
  /** Callback when form is submitted successfully */
  onSuccess?: (task: Task) => void;
  /** Callback when form is cancelled */
  onCancel?: () => void;
  /** Whether form is in loading state */
  isLoading?: boolean;
}

/**
 * TaskForm - Form component for creating and editing tasks
 */
export function TaskForm({
  mode,
  initialData,
  onSuccess,
  onCancel,
  isLoading = false,
}: TaskFormProps) {
  const [tagInput, setTagInput] = React.useState('');
  const [tags, setTags] = React.useState<string[]>(initialData?.tags || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateTaskData | UpdateTaskData>({
    resolver: zodResolver(mode === 'create' ? createTaskSchema : updateTaskSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          status: initialData.status,
          priority: initialData.priority,
          dueDate: initialData.dueDate,
          tags: initialData.tags,
        }
      : {
          title: '',
          description: '',
          status: TaskStatus.TODO,
          priority: TaskPriority.MEDIUM,
          dueDate: null,
          tags: [],
        },
  });

  const dueDate = watch('dueDate');

  useEffect(() => {
    setValue('tags', tags);
  }, [tags, setValue]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = (data: CreateTaskData | UpdateTaskData) => {
    const taskData = {
      ...data,
      tags,
    };
    
    // In a real implementation, this would call the mutation
    // For now, we'll just call the success callback
    if (onSuccess) {
      onSuccess(taskData as Task);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Enter task title"
          {...register('title')}
          disabled={isLoading}
          className={cn(errors.title && 'border-destructive')}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter task description"
          rows={4}
          {...register('description')}
          disabled={isLoading}
          className={cn(errors.description && 'border-destructive')}
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      {/* Status and Priority */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            defaultValue={initialData?.status || TaskStatus.TODO}
            onValueChange={(value) => setValue('status', value as TaskStatus)}
            disabled={isLoading}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TaskStatus.TODO}>To Do</SelectItem>
              <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
              <SelectItem value={TaskStatus.COMPLETED}>Completed</SelectItem>
              <SelectItem value={TaskStatus.ARCHIVED}>Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            defaultValue={initialData?.priority || TaskPriority.MEDIUM}
            onValueChange={(value) => setValue('priority', value as TaskPriority)}
            disabled={isLoading}
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TaskPriority.LOW}>Low</SelectItem>
              <SelectItem value={TaskPriority.MEDIUM}>Medium</SelectItem>
              <SelectItem value={TaskPriority.HIGH}>High</SelectItem>
              <SelectItem value={TaskPriority.URGENT}>Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Due Date */}
      <div className="space-y-2">
        <Label>Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !dueDate && 'text-muted-foreground'
              )}
              disabled={isLoading}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate ? format(dueDate, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dueDate || undefined}
              onSelect={(date) => setValue('dueDate', date || null)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <div className="flex gap-2">
          <Input
            id="tags"
            placeholder="Add a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleAddTag}
            disabled={isLoading || !tagInput.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:text-destructive"
                  disabled={isLoading}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex gap-3 justify-end pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === 'create' ? 'Create Task' : 'Update Task'}
        </Button>
      </div>
    </form>
  );
}