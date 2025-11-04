# Task Management Feature

A comprehensive task management system with full CRUD operations, local persistence, filtering, sorting, and statistics.

## Features

- ✅ **Full CRUD Operations**: Create, Read, Update, and Delete tasks
- 💾 **Local Persistence**: Tasks are saved to localStorage and persist across sessions
- 🔍 **Advanced Filtering**: Filter by status, priority, tags, and search
- 📊 **Statistics Dashboard**: View task completion rates and metrics
- 🎨 **Modern UI**: Clean, responsive design with Radix UI components
- ⚡ **Optimistic Updates**: Instant UI feedback with TanStack Query
- 🏷️ **Tag System**: Organize tasks with custom tags
- 📅 **Due Dates**: Set and track task deadlines
- 🎯 **Priority Levels**: Assign priority (Low, Medium, High, Urgent)
- ✨ **Empty States**: Helpful guidance when no tasks exist
- 🔔 **Toast Notifications**: User feedback for all actions
- ♿ **Accessible**: WCAG compliant with keyboard navigation

## Installation

The feature is already integrated into the project. No additional installation required.

## Usage

### Basic Usage

```tsx
import { TaskList, TaskDialog } from '@/features/task-management';
import { useTasks, useCreateTask } from '@/features/task-management/hooks/use-tasks';

function MyTaskPage() {
  const { data: tasks, isLoading } = useTasks();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        onCreateNew={() => setDialogOpen(true)}
      />
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode="create"
      />
    </>
  );
}
```

### With Filtering and Sorting

```tsx
import { TaskFilters, TaskList } from '@/features/task-management';
import { useTasks } from '@/features/task-management/hooks/use-tasks';
import { TaskStatus } from '@/features/task-management/types';

function FilteredTasks() {
  const [filters, setFilters] = useState({
    status: [TaskStatus.TODO],
    priority: [TaskPriority.HIGH],
  });
  
  const [sortOptions, setSortOptions] = useState({
    field: 'dueDate',
    direction: 'asc',
  });

  const { data: tasks } = useTasks(filters, sortOptions);

  return (
    <>
      <TaskFilters
        filters={filters}
        onFiltersChange={setFilters}
        sortOptions={sortOptions}
        onSortChange={setSortOptions}
      />
      <TaskList tasks={tasks} />
    </>
  );
}
```

## Components

### TaskList

Displays a list of tasks with support for empty states and loading states.

**Props:**
- `tasks: Task[]` - Array of tasks to display
- `isLoading?: boolean` - Loading state
- `error?: string | null` - Error message
- `onEdit?: (task: Task) => void` - Edit callback
- `onDelete?: (taskId: string) => void` - Delete callback
- `onStatusChange?: (taskId: string, status: TaskStatus) => void` - Status change callback
- `onTaskClick?: (task: Task) => void` - Task click callback
- `onCreateNew?: () => void` - Create new task callback

**Example:**
```tsx
<TaskList
  tasks={tasks}
  isLoading={false}
  onEdit={(task) => console.log('Edit:', task)}
  onDelete={(id) => console.log('Delete:', id)}
  onStatusChange={(id, status) => console.log('Status:', status)}
/>
```

### TaskCard

Displays a single task in card format with actions.

**Props:**
- `task: Task` - Task data to display
- `onEdit?: (task: Task) => void` - Edit callback
- `onDelete?: (taskId: string) => void` - Delete callback
- `onStatusChange?: (taskId: string, status: TaskStatus) => void` - Status change callback
- `onClick?: (task: Task) => void` - Click callback

**Example:**
```tsx
<TaskCard
  task={task}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onStatusChange={handleStatusChange}
/>
```

### TaskForm

Form component for creating and editing tasks with validation.

**Props:**
- `mode: 'create' | 'edit'` - Form mode
- `initialData?: Task` - Initial task data (for edit mode)
- `onSuccess?: (task: Task) => void` - Success callback
- `onCancel?: () => void` - Cancel callback
- `isLoading?: boolean` - Loading state

**Example:**
```tsx
<TaskForm
  mode="create"
  onSuccess={(task) => console.log('Created:', task)}
  onCancel={() => console.log('Cancelled')}
/>
```

### TaskDialog

Modal dialog for creating and editing tasks.

**Props:**
- `open: boolean` - Dialog open state
- `onOpenChange: (open: boolean) => void` - Open state change callback
- `mode: 'create' | 'edit'` - Dialog mode
- `task?: Task` - Task data (for edit mode)
- `onSuccess?: (task: Task) => void` - Success callback

**Example:**
```tsx
<TaskDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  mode="create"
  onSuccess={(task) => console.log('Success:', task)}
/>
```

### TaskFilters

Filter and sort controls for task lists.

**Props:**
- `filters: TaskFilters` - Current filter values
- `onFiltersChange: (filters: TaskFilters) => void` - Filter change callback
- `sortOptions: TaskSortOptions` - Current sort options
- `onSortChange: (options: TaskSortOptions) => void` - Sort change callback
- `availableTags?: string[]` - Available tags for filtering

**Example:**
```tsx
<TaskFilters
  filters={filters}
  onFiltersChange={setFilters}
  sortOptions={sortOptions}
  onSortChange={setSortOptions}
  availableTags={['work', 'personal']}
/>
```

### TaskStats

Displays task statistics and metrics.

**Props:**
- `stats: TaskStats | undefined` - Task statistics data
- `isLoading?: boolean` - Loading state

**Example:**
```tsx
<TaskStats stats={stats} isLoading={false} />
```

## Hooks

### useTasks

Fetches tasks with optional filtering and sorting.

**Parameters:**
- `filters?: TaskFilters` - Optional filters
- `sortOptions?: TaskSortOptions` - Optional sort options

**Returns:** `UseQueryResult<Task[]>`

**Example:**
```tsx
const { data: tasks, isLoading, error } = useTasks(
  { status: [TaskStatus.TODO] },
  { field: 'dueDate', direction: 'asc' }
);
```

### useTask

Fetches a single task by ID.

**Parameters:**
- `taskId: string` - Task ID

**Returns:** `UseQueryResult<Task>`

**Example:**
```tsx
const { data: task, isLoading } = useTask('task-123');
```

### useCreateTask

Creates a new task.

**Returns:** `UseMutationResult<Task, Error, CreateTaskData>`

**Example:**
```tsx
const createTask = useCreateTask();

createTask.mutate({
  title: 'New Task',
  description: 'Task description',
  priority: TaskPriority.HIGH,
});
```

### useUpdateTask

Updates an existing task.

**Returns:** `UseMutationResult<Task, Error, { taskId: string; data: UpdateTaskData }>`

**Example:**
```tsx
const updateTask = useUpdateTask();

updateTask.mutate({
  taskId: 'task-123',
  data: { status: TaskStatus.COMPLETED },
});
```

### useDeleteTask

Deletes a task.

**Returns:** `UseMutationResult<string, Error, string>`

**Example:**
```tsx
const deleteTask = useDeleteTask();

deleteTask.mutate('task-123');
```

### useTaskStats

Fetches task statistics.

**Returns:** `UseQueryResult<TaskStats>`

**Example:**
```tsx
const { data: stats } = useTaskStats();
```

## Types

### Task

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  tags: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isSynced?: boolean;
}
```

### TaskStatus

```typescript
enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}
```

### TaskPriority

```typescript
enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}
```

### TaskFilters

```typescript
interface TaskFilters {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  tags?: string[];
  search?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}
```

### TaskSortOptions

```typescript
interface TaskSortOptions {
  field: 'createdAt' | 'updatedAt' | 'dueDate' | 'priority' | 'title';
  direction: 'asc' | 'desc';
}
```

## Local Storage

Tasks are automatically persisted to localStorage. The following keys are used:

- `tasks_local_storage` - Task data
- `tasks_sync_status` - Sync status information
- `tasks_pending_changes` - Pending changes for sync

### Storage Utilities

```typescript
import {
  getTasksFromStorage,
  saveTasksToStorage,
  addTaskToStorage,
  updateTaskInStorage,
  removeTaskFromStorage,
  clearTasksFromStorage,
} from '@/features/task-management/utils/local-storage';
```

## Validation

All task data is validated using Zod schemas:

```typescript
import { validateCreateTask, validateUpdateTask } from '@/features/task-management/utils/validators';

const result = validateCreateTask({
  title: 'New Task',
  description: 'Description',
});

if (result.success) {
  // Use result.data
} else {
  // Handle result.error
}
```

## Helper Functions

```typescript
import {
  generateTaskId,
  filterTasks,
  sortTasks,
  isTaskOverdue,
  calculateTaskStats,
  getAllTags,
  formatDate,
  getPriorityColor,
  getStatusColor,
} from '@/features/task-management/utils/helpers';
```

## Error Handling

All mutations include comprehensive error handling with toast notifications:

```tsx
const createTask = useCreateTask();

createTask.mutate(data, {
  onSuccess: (task) => {
    toast.success('Task created successfully');
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
```

## Accessibility

- All components support keyboard navigation
- Proper ARIA labels and roles
- Focus management in dialogs
- Screen reader friendly
- Color contrast compliant

## Performance

- Optimistic updates for instant feedback
- Query caching with TanStack Query
- Efficient re-renders with React.memo
- Lazy loading for large lists
- Debounced search input

## Future Enhancements

- [ ] Server-side sync
- [ ] Real-time collaboration
- [ ] Task templates
- [ ] Recurring tasks
- [ ] Subtasks
- [ ] File attachments
- [ ] Comments and activity log
- [ ] Task dependencies
- [ ] Kanban board view
- [ ] Calendar view

## License

MIT