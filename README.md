 🧩 P-Core - Next-Generation Multi-Tenant Management Platform

<div align="center">

![P-Core Logo](https://via.placeholder.com/200x80/4F46E5/FFFFFF?text=P-Core)

**A modern, secure, and scalable multi-tenant platform for educational institutions, churches, and organizations.**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](./docs/CHANGELOG.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black.svg)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/your-username/p-core/graphs/commit-activity)

[**🚀 Quick Start**](./docs/guides/QUICK_START.md) • [**📚 Documentation**](./docs/README.md) • [**🎯 Features**](#-core-features) • [**🏗️ Architecture**](./docs/PROJECT_OVERVIEW.md) • [**🤝 Contributing**](#-contributing)

</div>

---

## 🌟 **What is P-Core?**

P-Core is a **next-generation, multi-tenant management platform** designed to revolutionize how organizations manage their operations. Built with modern web technologies and enterprise-grade security, P-Core provides a unified solution for:

- 🎓 **Educational Institutions**: Schools, universities, training centers
- ⛪ **Religious Organizations**: Churches, temples, community centers  
- 📚 **Libraries**: Public, academic, and specialized libraries
- 🏢 **Corporate Training**: Employee development and certification programs

### **Why Choose P-Core?**

✨ **Modern Architecture**: Built with Next.js 15, React 18, TypeScript, and Hono.js  
🔐 **Enterprise Security**: Row-Level Security (RLS) with automatic tenant isolation  
🎨 **Beautiful UI**: ShadCN UI components with Tailwind CSS  
⚡ **High Performance**: Optimized with Bun runtime and Turbopack  
🧩 **Modular Design**: Feature-based architecture for easy customization  
📱 **Responsive**: Mobile-first design that works on all devices  

---

## 🎯 **Core Features**

### **🚀 MVP Features (v2.0)**

- **👥 User Management** - Complete user lifecycle management with role-based access control
- **🔔 Notifications Management** - In-app and email notifications with user preferences  
- **🏢 Organizations Management** - Multi-tenant organization and membership management
- **💳 Subscriptions Management** - Flexible subscription plans with usage tracking

📖 See [MVP Features Documentation](./docs/MVP_FEATURES.md) for detailed information.

### **🏢 Multi-Tenant Architecture**
- **Secure Isolation**: Database-level tenant separation with RLS
- **Organization Management**: Create and manage multiple organizations
- **Role-Based Access**: Flexible permissions and user management
- **Scalable Design**: Supports unlimited organizations and users

### **🎓 School Management System**
```typescript
// Complete educational management
Student ←→ Course ←→ Schedule
Student ←→ Purchase ←→ Payment
Course ←→ LessonBook ←→ Curriculum
```
- Student enrollment and academic tracking
- Course creation and scheduling
- Grade management and reporting
- Payment and financial tracking

### **⛪ Church Management System**
```typescript
// Hierarchical organization structure
Khawk ←→ Veng ←→ Home ←→ Member
Member ←→ Choir ←→ Talent
Member ←→ Family ←→ Relationships
```
- Member registration and profiles
- Family relationship tracking
- Choir and talent management
- Event planning and coordination

### **📚 Library Management System**
```typescript
// Complete library operations
Library ←→ Section ←→ Book
Book ←→ Loan ←→ Member/Student
Staff ←→ Library ←→ Management
```
- Book catalog and inventory
- Loan tracking and management
- Fine calculation and collection
- Staff and access management

### **📊 Analytics & Reporting**
- **Real-time Dashboards**: Live data visualization
- **Custom Reports**: Configurable reporting system
- **Export Capabilities**: PDF, Excel, and CSV exports
- **Performance Metrics**: System health and usage analytics

---

## ⚙️ **Technology Stack**

### **Core Technologies**
```
Frontend:  Next.js 15.4.4 + React 18.3.1 + TypeScript 5.8.3
Backend:   Hono.js 4.8.9 + Edge Runtime
Database:  PostgreSQL + Prisma ORM 6.12.0
Auth:      NextAuth.js 5.0.0-beta.29
UI:        Tailwind CSS 3.4.17 + ShadCN UI
Runtime:   Bun (Development & Build)
```

### **Key Libraries**
- **State Management**: Zustand 5.0.6 + TanStack Query 5.83.0
- **Forms**: React Hook Form 7.61.1 + Zod 3.25.76
- **Animations**: Framer Motion 11.18.2
- **Icons**: Lucide React 0.468.0
- **Testing**: Vitest 2.1.9 + React Testing Library

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18.0.0+
- PostgreSQL 14+
- Bun (recommended) or npm/yarn

### **Bun & Environment Setup**
- **Bun is required** for development and build. [Install Bun](https://bun.sh/docs/installation).
- Copy `.env.example` to `.env.local` and fill in all required environment variables:
  - `DATABASE_URL` (PostgreSQL connection string)
  - `NEXTAUTH_SECRET`, `NEXTAUTH_URL` (for authentication)
  - Any custom keys referenced in `next.config.ts` or your codebase
- See [Deployment Checklist](./docs/guides/DEPLOYMENT_CHECKLIST.md) for all required variables.

### **5-Minute Setup**
```bash
# 1. Clone the repository
git clone https://github.com/your-username/p-core.git
cd p-core

# 2. Install dependencies
bun install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local with your database URL and secrets

# 4. Set up database
bun run db:setup

# 5. Start development server
bun run dev
```

🎉 **That's it!** Open [http://localhost:3000](http://localhost:3000) to see P-Core in action.

**Need more details?** Check out our [**Complete Quick Start Guide**](./docs/guides/QUICK_START.md).

---

## 📁 **Project Structure**

```
p-core/
├── 📁 app/                    # Next.js App Router (pages & layouts)
├── 📁 components/             # Reusable UI components
├── 📁 features/               # Domain-specific feature modules
│   ├── school-management/     # School management features
│   ├── church-management/     # Church management features
│   ├── library-management/    # Library management features
│   └── organization-management/ # Organization features
├── 📁 lib/                    # Core libraries and utilities
│   ├── auth/                  # Authentication system
│   ├── db/                    # Database utilities
│   ├── api/                   # API utilities
│   └── utils/                 # General utilities
├── 📁 prisma/                 # Database schema and migrations
├── 📁 docs/                   # Comprehensive documentation
└── 📁 public/                 # Static assets
```

**Learn more**: [**Complete Folder Structure Guide**](./docs/FOLDER_STRUCTURE.md)

---

## 🔐 **Security & Architecture**

### **Multi-Tenant Security**
- **Row-Level Security (RLS):** Automatic database-level tenant isolation. See [RLSDocumentation.md](./docs/architecture/RLSDocumentation.md) for details.
- **Organization Context:** Secure data separation across organizations
- **Authentication:** Multi-provider support with NextAuth.js
- **Authorization:** Role-based access control (RBAC)

### **Performance & Scalability**
- **Edge Runtime:** Optimized for serverless deployment
- **Connection Pooling:** Efficient database connection management
- **Lazy Loading:** Dynamic feature loading for optimal performance
- **Caching:** Intelligent caching with TanStack Query

**Deep dive**: [**Security Architecture Guide**](./docs/architecture/SECURITY_ARCHITECTURE.md)

---

## 📚 **Documentation**

Our documentation is comprehensive and designed to help you succeed:

### **🚀 Getting Started**
- [**Quick Start Guide**](./docs/guides/QUICK_START.md) - Get running in 5 minutes
- [**Project Overview**](./docs/PROJECT_OVERVIEW.md) - Complete system understanding
- [**Development Setup**](./docs/guides/DEVELOPMENT_SETUP.md) - Detailed setup instructions

### **🏗️ Architecture & Design**
- [**System Architecture**](./docs/status/SYSTEM_OVERVIEW.md) - Technical deep dive
- [**Database Design**](./docs/architecture/DATABASE_DESIGN.md) - Schema and RLS
- [**API Architecture**](./docs/architecture/API_DESIGN.md) - Hono.js patterns

### **💻 Development**
- [**Coding Standards**](./docs/development/CODING_STANDARDS.md) - Code quality guidelines
- [**Feature Development**](./docs/guides/FEATURE_DEVELOPMENT.md) - Building new features
- [**Testing Guide**](./docs/development/TESTING_GUIDE.md) - Complete guide to writing and running tests

**Explore all documentation**: [**📚 Documentation Hub**](./docs/README.md)

---

## 🎨 **Screenshots**

<div align="center">

### **Dashboard Overview**
![Dashboard](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Dashboard+Screenshot)

### **Student Management**
![Student Management](https://via.placeholder.com/800x400/059669/FFFFFF?text=Student+Management)

### **Mobile Responsive**
![Mobile View](https://via.placeholder.com/400x600/DC2626/FFFFFF?text=Mobile+View)

</div>

---

## 🚀 **Performance Tips**

- Use `bun run dev:fast` for the fastest local development experience.
- Only include relevant folders in your `tailwind.config.ts` content array (already optimized).
- Exclude test, build, and node_modules folders in `tsconfig.json` (already optimized).
- Use `bun run bundle:analyze` to analyze your Next.js bundle and find slow/large modules.
- Remove unused dependencies and keep all dependencies up to date.
- Use server components and dynamic imports for large/rarely-used features.
- Restart your dev server after large dependency or config changes.

## 🛠️ **Development Commands**

```bash
# Development
bun run dev              # Start development server
bun run dev:fast         # Fast development mode
bun run build            # Build for production
bun run start            # Start production server

# Database
bun run db:generate      # Generate Prisma client
bun run db:migrate       # Run database migrations
bun run db:studio        # Open Prisma Studio
bun run db:seed          # Seed database with sample data
bun run db:reset         # Reset database (careful!)

# Code Quality
bun run lint             # Run ESLint
bun run lint:fix         # Fix ESLint issues
bun run type-check       # TypeScript type checking
bun run format           # Format code with Prettier

# Testing
bun run test             # Run tests (Vitest)
bun run test:watch       # Run tests in watch mode
bun run test:ui          # Run Vitest UI
bun run test:coverage    # Generate coverage report
```

---

## 🤝 **Contributing**

We welcome contributions from the community! Here's how you can help:

### **Ways to Contribute**
- 🐛 **Report Bugs**: [Create an issue](https://github.com/your-username/p-core/issues)
- 💡 **Suggest Features**: [Start a discussion](https://github.com/your-username/p-core/discussions)
- 📝 **Improve Documentation**: Help us make docs better
- 🔧 **Submit Code**: Fix bugs or add features

### **Development Process**
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes following our [coding standards](./docs/development/CODING_STANDARDS.md)
4. **Add** tests for new functionality
5. **Update** documentation as needed
6. **Submit** a pull request

**Read more**: [**Contributing Guide**](./docs/CONTRIBUTING.md)

---

## 📊 **Project Stats**

<div align="center">

| Metric | Value |
|--------|-------|
| **Version** | 2.0.0 |
| **Lines of Code** | 50,000+ |
| **Components** | 100+ |
| **API Endpoints** | 50+ |
| **Database Tables** | 30+ |
| **Documentation Pages** | 25+ |
| **TypeScript Coverage** | 100% |

</div>

---

## 🌐 **Deployment**

### **Recommended Platforms**
- **Vercel**: Optimized for Next.js applications
- **Railway**: Easy PostgreSQL + app deployment
- **Docker**: Containerized deployment anywhere
- **AWS/GCP/Azure**: Enterprise cloud deployment

### **Environment Variables**
```env
# Database
DATABASE_URL="postgresql://user:pass@host:5432/db"

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://your-domain.com"

# Optional: Telegram Notifications
TELEGRAM_BOT_TOKEN="your-bot-token"
TELEGRAM_CHAT_ID="your-chat-id"
```

**Detailed guide**: [**Deployment Checklist**](./docs/guides/DEPLOYMENT_CHECKLIST.md)

---

## 📈 **Roadmap**

### **🔄 Current (v2.0.x)**
- ✅ Multi-tenant architecture
- ✅ Core feature modules
- ✅ Enhanced security
- 🔄 Testing framework
- 🔄 Performance monitoring

### **📋 Next (v2.1.x)**
- Plugin system for extensions
- Advanced analytics dashboard
- Mobile app (React Native)
- Real-time notifications

### **🔮 Future (v3.0.x)**
- Microservices architecture
- AI-powered insights
- Enterprise SSO
- White-label solutions

**Full roadmap**: [**Project Roadmap**](./docs/PROJECT_ROADMAP.md)

---

## 📞 **Support & Community**

### **Getting Help**
- 📖 **Documentation**: [Comprehensive guides](./docs/README.md)
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/p-core/issues)
- 💬 **Discussions**: [Community Q&A](https://github.com/your-username/p-core/discussions)
- 📧 **Email**: peterpausianlian2020@gmail.com

### **Maintainer**
<div align="center">

**Peter Pau Sian Lian**  
🌍 Kalaymyo, Myanmar 🇲🇲  
📧 peterpausianlian2020@gmail.com  
🐙 [@your-username](https://github.com/your-username)

</div>

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 **Acknowledgments**

Special thanks to:
- **Next.js Team** for the amazing React framework
- **Prisma Team** for the excellent ORM
- **ShadCN** for the beautiful UI components
- **Hono.js Team** for the lightweight API framework
- **Open Source Community** for inspiration and contributions

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

**Built with ❤️ by the P-Core team**

[**🚀 Get Started**](./docs/guides/QUICK_START.md) • [**📚 Documentation**](./docs/README.md) • [**🤝 Contribute**](#-contributing)

</div>

---

*Last Updated: July 28, 2025 • Version 2.0.0*  
