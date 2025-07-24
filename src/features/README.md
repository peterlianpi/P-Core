# P-Core Features Architecture

## 📁 Feature Organization Structure

This directory contains all domain-specific features organized by business capability. Each feature follows a consistent structure for maintainability and scalability.

## 🏗️ Feature Structure Pattern

```
src/features/[feature-name]/
├── api/                    # API hooks and data fetching
│   ├── use-create-*.ts     # Creation hooks
│   ├── use-get-*.ts        # Query hooks  
│   ├── use-update-*.ts     # Update hooks
│   ├── use-delete-*.ts     # Deletion hooks
│   └── index.ts            # Centralized exports
├── components/             # Feature-specific components
│   ├── forms/              # Form components
│   ├── tables/             # Data table components
│   ├── cards/              # Display cards
│   └── modals/             # Modal dialogs
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript type definitions
├── utils/                  # Feature-specific utilities
├── constants/              # Feature constants
└── index.ts                # Feature exports
```

## 🎯 Available Features

### 📚 School Management
- **students** - Student enrollment, profiles, and academic tracking
- **courses** - Course management, scheduling, and curriculum
- **library** - Book management, loans, and inventory
- **purchases** - Payment processing and financial tracking

### ⛪ Church Management  
- **members** - Church member profiles and information
- **families** - Family relationship tracking
- **homes** - Geographic organization (Homes, Vengs, Khawks)
- **roles** - Member role and ministry assignments

### 🎵 Activities Management
- **choirs** - Choir management and member tracking
- **songs** - Music library and repertoire management
- **events** - Event planning and scheduling

### 🏢 Organization Management
- **organizations** - Multi-tenant organization setup
- **users** - User accounts and authentication
- **permissions** - Role-based access control

### 📊 System Features
- **dashboard** - Analytics and overview displays
- **feedback** - User feedback and support
- **version** - Version tracking and updates

## 🔐 Security & Multi-Tenancy

All features implement:
- **Row-Level Security (RLS)** for automatic tenant isolation
- **Organization context validation** in API hooks
- **Type-safe API contracts** with comprehensive error handling
- **Permission-based access control** at component level

## 🚀 Performance Optimizations

Features utilize:
- **Optimized caching strategies** with React Query
- **Pagination and infinite scrolling** for large datasets
- **Optimistic updates** for immediate UI feedback
- **Code splitting** for reduced bundle sizes

## 📝 Development Guidelines

### Adding a New Feature

1. **Create feature directory** following the standard structure
2. **Define types** in `types/index.ts` with proper schemas
3. **Implement API hooks** with error handling and caching
4. **Create components** following the design system
5. **Add tests** for critical functionality
6. **Update exports** in feature and main index files

### API Hook Patterns

```typescript
// Query Hook Example
export const useGetItems = ({ orgId, ...params }: UseGetItemsParams) => {
  return useQuery({
    enabled: !!orgId,
    queryKey: ["items", { orgId, ...params }],
    queryFn: async () => {
      const response = await client.api.items.$get({
        query: apiUtils.createOrgQuery(orgId, params)
      });
      return await response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (apiUtils.isAPIError(error) && error.apiError.statusCode < 500) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Mutation Hook Example  
export const useCreateItem = ({ orgId }: { orgId: string }) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await client.api.items.$post({
        query: apiUtils.createOrgQuery(orgId),
        json: data,
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", { orgId }] });
    },
  });
};
```

### Component Patterns

```typescript
// Feature Component Example
interface ItemListProps {
  orgId: string;
  searchQuery?: string;
}

export const ItemList = ({ orgId, searchQuery }: ItemListProps) => {
  const { items, isLoading, error } = useGetItems({ orgId, searchQuery });
  
  if (isLoading) return <ItemListSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  
  return (
    <div className="space-y-4">
      {items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
```

## 🧪 Testing Strategy

Each feature should include:
- **Unit tests** for utilities and hooks
- **Integration tests** for API interactions  
- **Component tests** for UI behavior
- **E2E tests** for critical user flows

## 📚 Documentation

Feature documentation should include:
- **Purpose and scope** of the feature
- **API endpoints** and data models
- **Component usage examples**
- **Configuration options**
- **Known limitations** and considerations

---

*This architecture supports scalable, maintainable, and secure feature development across multiple business domains.*
