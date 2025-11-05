# Type-Safe Data Architecture

A comprehensive, type-safe data layer for modern React applications with caching, error handling, and modular service architecture.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                REACT COMPONENTS                     │    │
│  │  - useUserData, useNotificationData                │    │
│  │  - useDashboardStats, useAnalyticsData             │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 DATA PROVIDER LAYER                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            DataProvider Context                     │    │
│  │  - Global state management                          │    │
│  │  - Connection monitoring                            │    │
│  │  - Cache management                                 │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 SERVICE LAYER                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Domain Services (User, Notification)        │    │
│  │  - Business logic encapsulation                      │    │
│  │  - Data validation & sanitization                    │    │
│  │  - Error handling                                    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 API CLIENT LAYER                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            ApiClient & CacheManager                 │    │
│  │  - HTTP requests with retry logic                    │    │
│  │  - Intelligent caching                               │    │
│  │  - Request/response transformation                   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 TYPE DEFINITIONS                           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Centralized Type System                     │    │
│  │  - All data models in one place                      │    │
│  │  - Type-safe API contracts                          │    │
│  │  - Utility types & helpers                          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### 1. Wrap your app with DataProvider

```tsx
import { DataProvider } from '@/lib/data';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider config={{ enableOfflineMode: true }}>
      {children}
    </DataProvider>
  );
}
```

### 2. Use data hooks in components

```tsx
import { useUserData, useNotificationData } from '@/lib/data';

function UserDashboard() {
  const { useUsers, useUserStats } = useUserData;
  const { users, loading, error } = useUsers({ page: 1, limit: 10 });
  const { stats } = useUserStats();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Total Users: {stats?.totalUsers}</h1>
      {/* Render users */}
    </div>
  );
}
```

### 3. Direct service usage (imperative)

```tsx
import { UserService } from '@/lib/data';

// Create a new user
const result = await UserService.createUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'USER'
});

if (result.success) {
  console.log('User created:', result.data);
} else {
  console.error('Error:', result.error);
}
```

## 📋 Core Features

### ✅ Type Safety Throughout
- **Centralized Types**: All data models defined in `lib/types/database.ts`
- **API Contracts**: Type-safe request/response interfaces
- **Runtime Validation**: Data validation and sanitization
- **Type Guards**: Runtime type checking utilities

### ✅ Intelligent Caching
- **LRU Cache**: Least Recently Used eviction strategy
- **TTL Support**: Configurable time-to-live for cache entries
- **Cache Invalidation**: Automatic cache clearing on mutations
- **Cache Statistics**: Performance monitoring and analytics

### ✅ Error Handling & Resilience
- **Retry Logic**: Exponential backoff for failed requests
- **Timeout Handling**: Configurable request timeouts
- **Error Boundaries**: Graceful error recovery
- **Offline Support**: Connection status monitoring

### ✅ Modular Service Architecture
- **Domain Separation**: Services organized by business domain
- **Dependency Injection**: Easy to mock and test
- **Extensible**: Simple to add new services and endpoints
- **Consistent API**: Unified interface across all services

## 📚 API Reference

### DataProvider

```tsx
interface DataProviderProps {
  children: ReactNode;
  config?: {
    enableOfflineMode?: boolean;
    syncInterval?: number;
    cacheConfig?: CacheConfig;
  };
}
```

### Service Methods

#### UserService

```tsx
// CRUD Operations
UserService.getUsers(options) // Paginated users
UserService.getUserById(id) // Single user
UserService.createUser(data) // Create user
UserService.updateUser(id, data) // Update user
UserService.deleteUser(id) // Delete user

// Bulk Operations
UserService.bulkDeleteUsers(ids)
UserService.bulkUpdateRoles(ids, role)

// Analytics
UserService.getUserStats()
UserService.getRegistrationTrends()

// Search & Filter
UserService.searchUsers(query, options)
UserService.getUsersByRole(role)
```

#### NotificationService

```tsx
// CRUD Operations
NotificationService.getNotifications(options)
NotificationService.createNotification(data)
NotificationService.updateNotification(id, data)
NotificationService.deleteNotification(id)

// Bulk Operations
NotificationService.bulkDeleteNotifications(ids)
NotificationService.markMultipleAsRead(ids)

// Broadcasting
NotificationService.broadcastToAll(data)
NotificationService.sendToUsers(ids, data)
NotificationService.sendByRole(role, data)

// Templates
NotificationService.getTemplates()
NotificationService.createTemplate(data)
```

### React Hooks

#### User Data Hooks

```tsx
const { useUsers, useUser, useUserStats, useUserSearch } = useUserData;

// Paginated users
const { data: users, loading, error, refetch } = useUsers({
  page: 1,
  limit: 10,
  search: 'john',
  role: 'ADMIN'
});

// Single user
const { data: user } = useUser('user-id');

// User statistics
const { data: stats } = useUserStats();

// User search
const { data: searchResults } = useUserSearch('query');
```

#### Notification Data Hooks

```tsx
const { useNotifications, useNotificationTemplates } = useNotificationData;

// Notifications
const { data: notifications } = useNotifications({
  page: 1,
  limit: 20,
  isRead: false
});

// Templates
const { data: templates } = useNotificationTemplates();
```

#### Specialized Hooks

```tsx
// Dashboard data
const { stats, loading, error } = useDashboardStats();

// System health
const { health } = useSystemHealth();

// Analytics data
const { data: analytics } = useAnalyticsData(timeRange);

// Connection status
const { isOnline, lastSync } = useConnectionStatus();

// Cache management
const { clearAllCache, getCacheStats } = useCache();
```

## 🔧 Configuration

### Default Configuration

```typescript
const defaultConfig = {
  cache: {
    defaultTtl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100,
    strategy: 'lru',
  },
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
  timeout: 10000, // 10 seconds
};
```

### Custom Configuration

```tsx
<DataProvider config={{
  enableOfflineMode: true,
  syncInterval: 10 * 60 * 1000, // 10 minutes
  cacheConfig: {
    defaultTtl: 10 * 60 * 1000, // 10 minutes
    maxSize: 200,
    strategy: 'lru'
  }
}}>
  <App />
</DataProvider>
```

## 🧪 Testing

### Mock Data Setup

```typescript
import { apiClient } from '@/lib/data';

// Mock API responses for testing
jest.mock('@/lib/data/api-client', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  }
}));
```

### Component Testing

```tsx
import { render, screen } from '@testing-library/react';
import { DataProvider } from '@/lib/data';

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <DataProvider>
      {component}
    </DataProvider>
  );
};

test('renders user data', async () => {
  renderWithProvider(<UserDashboard />);
  expect(await screen.findByText('Total Users:')).toBeInTheDocument();
});
```

## 🚀 Advanced Usage

### Custom Service Creation

```typescript
import { apiClient, DataValidator } from '@/lib/data';
import type { ApiResponse, Organization } from '@/lib/types/database';

export class OrganizationService {
  private static readonly BASE_ENDPOINT = '/organizations';

  static async getOrganizations(options: {
    page?: number;
    limit?: number;
    industry?: string;
  } = {}): Promise<ApiResponse<Organization[]>> {
    const params = new URLSearchParams();

    if (options.page) params.set('page', options.page.toString());
    if (options.limit) params.set('limit', options.limit.toString());
    if (options.industry) params.set('industry', options.industry);

    return apiClient.get<Organization[]>(
      `${this.BASE_ENDPOINT}?${params}`,
      { useCache: true, cacheTtl: 10 * 60 * 1000 }
    );
  }

  static async createOrganization(data: {
    name: string;
    description?: string;
    industry?: string;
  }): Promise<ApiResponse<Organization>> {
    const sanitizedData = DataValidator.sanitizeObject(data);

    if (!DataValidator.validateRequired(sanitizedData.name)) {
      return {
        success: false,
        error: 'Organization name is required',
      };
    }

    return apiClient.post<Organization>(this.BASE_ENDPOINT, sanitizedData);
  }
}
```

### Custom Hooks

```tsx
import { useApi } from '@/lib/data';
import { OrganizationService } from './organization-service';

export function useOrganizations(options: Parameters<typeof OrganizationService.getOrganizations>[0] = {}) {
  return useApi(() => OrganizationService.getOrganizations(options));
}

export function useOrganization(id: string) {
  return useApi(() => apiClient.get(`/organizations/${id}`));
}
```

### Cache Management

```typescript
import { apiClient } from '@/lib/data';

// Manual cache control
apiClient.invalidateCache('/users'); // Clear user-related cache
apiClient.clearCache(); // Clear all cache

// Cache statistics
const stats = apiClient.getCacheStats();
console.log('Cache hit rate:', stats.hitRate);
console.log('Cache size:', stats.size);
```

## 📊 Performance Monitoring

### Development Helpers

```typescript
// In browser console (development only)
window.dataLayer.getHealth(); // Get data layer status
window.dataLayer.clearCache(); // Clear all cache
window.dataLayer.getCacheStats(); // Get cache statistics
window.dataLayer.reset(); // Reset data layer
```

### Production Monitoring

```typescript
import { getDataLayerHealth } from '@/lib/data';

// Health check endpoint
app.get('/api/health/data-layer', (req, res) => {
  const health = getDataLayerHealth();
  res.json(health);
});
```

## 🔒 Security Features

### Data Sanitization

```typescript
import { DataValidator } from '@/lib/data';

// Automatic sanitization
const sanitizedData = DataValidator.sanitizeObject(userInput);

// Manual validation
const isValid = DataValidator.validateEmail(email);
const isValidLength = DataValidator.validateLength(name, 1, 100);
```

### Request Security

- **Input Validation**: All inputs validated before API calls
- **Data Sanitization**: XSS protection through input cleaning
- **Type Safety**: Runtime type checking prevents malformed data
- **Error Boundaries**: Secure error handling without data leakage

## 🎯 Best Practices

### 1. Use Hooks for Components

```tsx
// ✅ Good - Declarative data fetching
function UserList() {
  const { data: users, loading } = useUsers({ page: 1 });
  // ...
}

// ❌ Avoid - Imperative data fetching in components
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    UserService.getUsers().then(result => {
      if (result.success) setUsers(result.data);
    });
  }, []);
}
```

### 2. Handle Loading States

```tsx
// ✅ Good - Proper loading states
function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error } = useUser(userId);

  if (loading) return <Skeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <NotFound />;

  return <UserCard user={user} />;
}
```

### 3. Cache Strategy

```tsx
// ✅ Good - Appropriate cache TTL
const { data } = useUsers({ page: 1 }); // Uses default 2min cache
const { data: stats } = useUserStats(); // Uses 15min cache for stats
const { data: search } = useUserSearch(query); // No cache for search
```

### 4. Error Handling

```tsx
// ✅ Good - Comprehensive error handling
function DataComponent() {
  const { data, loading, error, refetch } = useApi(someApiCall);

  if (error) {
    return (
      <ErrorFallback
        error={error}
        onRetry={refetch}
      />
    );
  }

  // Handle success case
}
```

## 📈 Migration Guide

### From Old Data Fetching

```tsx
// Old way
const [users, setUsers] = useState([]);
useEffect(() => {
  fetch('/api/users')
    .then(res => res.json())
    .then(data => setUsers(data))
    .catch(err => console.error(err));
}, []);

// New way
const { data: users, loading, error } = useUsers();
```

### Adding New Services

1. **Define Types** in `lib/types/database.ts`
2. **Create Service** in `lib/data/services/`
3. **Add Hooks** to data provider
4. **Export** from `lib/data/index.ts`

## 🤝 Contributing

### Adding New Data Types

1. Add interfaces to `lib/types/database.ts`
2. Export from the types section
3. Update service interfaces if needed

### Adding New Services

1. Create service file in `lib/data/services/`
2. Implement service class with static methods
3. Add React hooks for the service
4. Update data provider exports
5. Add to main index exports

### Testing New Features

1. Add unit tests for service methods
2. Add integration tests for hooks
3. Test error scenarios and edge cases
4. Verify TypeScript compilation

---

## 📚 Additional Resources

- [API Client Documentation](./api-client.md)
- [Service Layer Patterns](./services.md)
- [Caching Strategies](./caching.md)
- [Error Handling Guide](./error-handling.md)
- [Testing Guide](./testing.md)

---

**🎉 Happy coding with type-safe data architecture!**
