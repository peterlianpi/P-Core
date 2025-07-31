# P-Core Features Architecture

Modern feature-based architecture with dynamic loading, registry system, and cooperative functionality. Features are organized into **Domain Features** (business logic) and **System Features** (infrastructure).

## 🏗️ Architecture Overview

```
/features
├── feature-registry.ts         # Feature registry & dependency management
├── feature-loader.tsx          # Dynamic loading & permission system
├── index.ts                   # Main exports with legacy compatibility
│
├── organization-management/    # 🏢 Organization Management (Unified)
│   ├── api/                   # All org-related API hooks
│   ├── components/            # Organization UI components
│   ├── context/               # Organization state management
│   ├── helper/                # Utility functions
│   ├── hooks/                 # Custom hooks
│   └── index.ts               # Feature exports
│
├── school-management/          # 🎓 School & Education Management
│   ├── features/
│   │   ├── students/          # Student management
│   │   ├── students-management/ # Enhanced student management
│   │   ├── courses/           # Course management  
│   │   ├── schedule/          # Class scheduling
│   │   ├── lesson-books/      # Learning materials
│   │   ├── overview/          # Dashboard & analytics
│   │   └── transactions/      # Payments & billing
│   ├── lib/
│   │   └── api-client.ts      # Type-safe API client
│   └── types/                 # Feature-specific types
│
├── church-management/          # ⛪ Church & Community Management
│   ├── features/
│   │   ├── members/           # Member management
│   │   ├── choirs/            # Choir management  
│   │   ├── homes/             # Family/household management
│   │   ├── khawk/             # Khawk groups
│   │   ├── youth/             # Youth programs
│   │   └── veng/              # Veng groups
│   ├── lib/
│   │   └── api-client.ts      # Type-safe API client
│   └── types/                 # Feature-specific types
│
├── library-management/         # 📚 Library & Resource Management
│   ├── features/
│   │   ├── books/             # Book catalog
│   │   ├── loans/             # Lending system
│   │   └── inventory/         # Stock management
│   ├── lib/
│   │   └── api-client.ts      # Type-safe API client
│   └── types/                 # Feature-specific types
│
└── system/                    # ⚙️ System Features
    ├── dashboard/             # System dashboard & analytics
    ├── site/                  # Site configuration
    ├── version/               # Version management
    ├── dynamic-components/    # Dynamic component loading
    ├── feedback/              # User feedback system
    ├── image-upload/          # Image upload utilities
    └── index.ts               # System exports
```

## 🚀 Key Features

### 1. **Feature Registry System**
- **Dynamic Enable/Disable**: Turn features on/off at runtime
- **Dependency Management**: Automatic dependency resolution
- **Permission Control**: Role-based feature access
- **Version Management**: Feature versioning and compatibility

```typescript
import { featureRegistry, isFeatureEnabled } from '@/features/feature-registry';

// Check if feature is enabled
if (isFeatureEnabled('school-management')) {
  // Load school management features
}

// Enable/disable features dynamically
await featureRegistry.enableFeature('library-management');
featureRegistry.disableFeature('church-management');
```

### 2. **Dynamic Feature Loading**
- **Lazy Loading**: Features load only when needed
- **Code Splitting**: Automatic bundle splitting per feature
- **Error Boundaries**: Graceful failure handling
- **Loading States**: Built-in loading and error UI

```tsx
import { FeatureLoader, FeatureGuard } from '@/features/feature-loader';

// Dynamic feature loading with permissions
<FeatureLoader featureId="school-management">
  <SchoolDashboard />
</FeatureLoader>

// Feature permission guard
<FeatureGuard featureId="organization-management">
  <OrganizationSettings />
</FeatureGuard>
```

### 3. **Cooperative Features**
- **Inter-feature Communication**: Features can integrate with each other
- **Shared State Management**: Organization context across features
- **Common APIs**: Unified API patterns and error handling
- **Cross-feature Components**: Reusable components across domains

## 📋 Feature Categories

### Domain Features (Business Logic)
| Feature | Description | Dependencies | Role Required |
|---------|-------------|--------------|---------------|
| `organization-management` | Core org, team, member management | None | ADMIN |
| `school-management` | Student, course, academic management | organization-management | EDITOR |
| `church-management` | Member, choir, ministry management | organization-management | EDITOR |
| `library-management` | Book catalog, loans, inventory | organization-management | EDITOR |

### System Features (Infrastructure)
| Feature | Description | Critical | Role Required |
|---------|-------------|----------|---------------|
| `dashboard` | System dashboard & analytics | Yes | VIEWER |
| `site` | Site configuration | Yes | SUPER_ADMIN |
| `version` | Version management | Yes | SUPER_ADMIN |
| `dynamic-components` | Dynamic component system | No | - |
| `feedback` | User feedback system | No | VIEWER |
| `image-upload` | Image upload utilities | No | - |

## 🔧 Usage Examples

### Basic Feature Usage
```typescript
// Import specific feature components
import { StudentsTable } from '@/features/school-management';
import { OrganizationCard } from '@/features/organization-management';

// Use feature hooks
import { useFeature } from '@/features/feature-loader';

function MyComponent() {
  const schoolFeature = useFeature('school-management');
  
  if (!schoolFeature.isEnabled) {
    return <div>School management is disabled</div>;
  }
  
  return <StudentsTable />;
}
```

### Feature Administration
```typescript
import { EnabledFeaturesList } from '@/features/feature-loader';

// Show enabled domain features
<EnabledFeaturesList category="domain" />

// Show all system features  
<EnabledFeaturesList category="system" />
```

### Organization Context Integration
```typescript
// Features automatically integrate with organization context
import { useOrganizationContext } from '@/features/organization-management';

function FeatureComponent() {
  const { currentOrg, orgId } = useOrganizationContext();
  
  // Feature operates within org context automatically
  return <div>Working with org: {currentOrg.name}</div>;
}
```

## 🔒 Security & Permissions

### Role-Based Access Control
- **SUPER_ADMIN**: All features + system administration
- **ADMIN**: Organization management + domain features
- **EDITOR**: Domain features within organization
- **VIEWER**: Read-only access to enabled features

### Automatic Security
- **RLS Integration**: Row-level security for multi-tenant data
- **Permission Checking**: Automatic permission validation
- **Organization Isolation**: Data automatically scoped to organization
- **API Security**: Protected endpoints with role validation

## 🔗 Migration Guide

### From Old Structure
```typescript
// OLD (deprecated)
import { useCreateOrg } from '@/features/org';

// NEW (recommended)
import { useCreateOrg } from '@/features/organization-management';
```

### Legacy Compatibility
The system maintains backward compatibility for existing imports during migration period.

## 🏗️ Development Guidelines

### Adding New Features
1. **Choose Category**: Domain (business) or System (infrastructure)
2. **Define Dependencies**: What features does this depend on?
3. **Set Permissions**: What role is required?
4. **Register Feature**: Add to feature registry
5. **Create Structure**: Follow established patterns

### Feature Structure
```
new-feature/
├── api/                 # API hooks and clients
├── components/          # UI components
├── lib/                # Utilities and helpers
├── types/              # TypeScript types
├── context/            # State management (if needed)
├── hooks/              # Custom hooks
└── index.ts            # Feature exports
```

### Best Practices
- **Single Responsibility**: Each feature should have a clear, focused purpose
- **Loose Coupling**: Features should be independent and modular
- **High Cohesion**: Related functionality should be grouped together
- **API Consistency**: Follow established patterns for APIs and hooks
- **Type Safety**: Use TypeScript throughout with proper type definitions
- **Error Handling**: Implement comprehensive error boundaries and fallbacks

This architecture provides a robust, scalable foundation for the P-Core system with clear separation of concerns, dynamic capabilities, and excellent developer experience.
