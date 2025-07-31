# 📁 P-Core Folder Structure

## Root Level
```
/
├── 📁 app/                    # Next.js App Router pages and layouts
├── 📁 components/             # Reusable UI components
├── 📁 features/               # Domain-specific feature modules
├── 📁 lib/                    # Core libraries and utilities
├── 📁 docs/                   # Documentation and guides
├── 📁 config/                 # Build and development configurations
├── 📁 actions/                # Server actions
├── 📁 providers/              # React context providers
├── 📁 hooks/                  # Custom React hooks
├── 📁 public/                 # Static assets
├── 📁 prisma/                 # Database schemas and migrations
├── 📁 scripts/                # Build and utility scripts
├── 📁 test/                   # Test files and utilities
├── 📁 data/                   # Static data files
└── 📄 package.json            # Project dependencies and scripts
```

## Core Directories Detail

### `/lib` - Core Libraries
```
lib/
├── 📁 auth/                   # Authentication system
│   ├── auth.ts               # Main auth configuration
│   ├── auth.config.ts        # Auth provider configuration
│   ├── auth.edge.ts          # Edge-compatible auth
│   ├── routes.ts             # Auth route definitions
│   └── index.ts              # Auth exports
├── 📁 db/                     # Database utilities
├── 📁 utils/                  # Utility functions (consolidated)
├── 📁 types/                  # TypeScript type definitions
├── 📁 schemas/                # Validation schemas
├── 📁 security/               # Security utilities
├── 📁 mail/                   # Email utilities
├── 📁 telegram/               # Telegram integration
└── 📁 api/                    # API utilities
```

### `/features` - Domain Modules
```
features/
├── 📁 system/                 # Core system features
├── 📁 school-management/      # School management domain
├── 📁 church-management/      # Church management domain
├── 📁 library-management/     # Library management domain
├── 📁 organization-management/ # Organization features
├── 📁 dashboard/              # Dashboard components
├── feature-registry.ts       # Feature registration
└── index.ts                  # Feature exports
```

### `/docs` - Documentation
```
docs/
├── 📁 guides/                 # Implementation guides
│   ├── ARCHITECTURE_REFACTOR_PLAN.md
│   ├── DEPLOYMENT_CHECKLIST.md
│   ├── FEATURE_MIGRATION_GUIDE.md
│   ├── IMPLEMENTATION_NOTES.md
│   └── TELEGRAM_SETTINGS_FIX.md
├── 📁 status/                 # System status reports
│   ├── CORE_SYSTEM_STATUS.md
│   ├── SCHOOL_MANAGEMENT_FEATURES_SUMMARY.md
│   ├── SECURITY_IMPROVEMENTS.md
│   ├── SYSTEM_IMPROVEMENTS_SUMMARY.md
│   └── SYSTEM_OVERVIEW.md
└── FOLDER_STRUCTURE.md       # This file
```

### `/config` - Configuration Files
```
config/
├── eslint.config.mjs         # ESLint configuration
├── postcss.config.mjs        # PostCSS configuration
├── vitest.config.ts          # Vitest test configuration
└── bunfig.toml               # Bun configuration
```

## Key Benefits of This Structure

1. **Clear Separation**: Each folder has a specific purpose
2. **Scalability**: Easy to add new features without clutter
3. **Maintainability**: Related files are grouped together
4. **Developer Experience**: Intuitive navigation and imports
5. **Build Optimization**: Configuration files are organized
6. **Documentation**: Comprehensive guides and status tracking

## Import Path Examples

```typescript
// Auth system
import { auth } from "@/lib/auth";

// Utilities
import { formatDate } from "@/lib/utils/date-format";

// Types
import type { UserRole } from "@/lib/types/database";

// Schemas
import { imageSchema } from "@/lib/schemas/image-schemas";

// Features
import { SchoolDashboard } from "@/features/school-management";

// Components
import { Button } from "@/components/ui/button";
```

## Migration Notes

✅ **Completed**:
- Moved auth files to `/lib/auth/`
- Consolidated utilities from `/helpers/` to `/lib/utils/`
- Organized documentation in `/docs/`
- Updated all import paths
- Created index files for better exports

🔧 **Next Steps**:
- Run build verification
- Update any remaining path references
- Test all features after reorganization
