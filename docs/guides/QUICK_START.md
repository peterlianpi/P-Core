# 🚀 P-Core Quick Start Guide

Get P-Core up and running in **5 minutes** with this step-by-step guide.

---

## 📋 **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **Bun**: Latest version (recommended) or npm/yarn
- **PostgreSQL**: Version 14 or higher
- **Git**: For version control

### **Quick Installation Check**
```bash
# Check versions
node --version    # Should be 18.0.0+
bun --version     # Latest version
psql --version    # PostgreSQL 14+
git --version     # Any recent version
```

---

## ⚡ **5-Minute Setup**

### **Step 1: Clone the Repository**
```bash
# Clone P-Core repository
git clone https://github.com/your-username/p-core.git
cd p-core

# Verify you're in the right directory
ls -la  # Should see package.json, prisma/, app/, etc.
```

### **Step 2: Install Dependencies**
```bash
# Install with Bun (recommended for speed)
bun install

# Alternative: Use npm if you prefer
# npm install
```

### **Step 3: Environment Configuration**
```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables
# Use your preferred editor (nano, vim, code, etc.)
nano .env.local
```

**Required Environment Variables:**
```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/p_core_dev"

# Authentication (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Telegram Logging
TELEGRAM_BOT_TOKEN="your-bot-token"
TELEGRAM_CHAT_ID="your-chat-id"
```

### **Step 4: Database Setup**
```bash
# Create database and run migrations
bun run db:setup

# This command does:
# 1. Generates Prisma client
# 2. Runs database migrations
# 3. Seeds initial data
```

### **Step 5: Start Development Server**
```bash
# Start the development server
bun run dev

# Server will start at http://localhost:3000
```

---

## 🎉 **Verify Installation**

### **1. Open Your Browser**
Navigate to [http://localhost:3000](http://localhost:3000)

You should see the P-Core welcome page with:
- ✅ Login/Register options
- ✅ Feature overview
- ✅ System status indicators

### **2. Create Your First Account**
1. Click **"Sign Up"**
2. Fill in your details:
   - **Name**: Your full name
   - **Email**: Valid email address
   - **Password**: Strong password (8+ characters)
3. Click **"Create Account"**

### **3. Create Your First Organization**
1. After login, you'll be prompted to create an organization
2. Choose organization type:
   - 🎓 **School**: For educational institutions
   - ⛪ **Church**: For religious organizations
   - 📚 **Library**: For library management
   - 🏢 **Other**: For general organizations
3. Fill in organization details and click **"Create"**

### **4. Explore the Dashboard**
You should now see:
- **Navigation Sidebar**: Feature-based navigation
- **Dashboard**: Analytics and quick actions
- **User Menu**: Profile and settings access

---

## 🔧 **Development Commands**

### **Essential Commands**
```bash
# Development server with hot reload
bun run dev

# Build for production
bun run build

# Start production server
bun run start

# Database operations
bun run db:generate    # Generate Prisma client
bun run db:migrate     # Run migrations
bun run db:studio      # Open Prisma Studio
bun run db:seed        # Seed database
bun run db:reset       # Reset database (careful!)

# Code quality
bun run lint           # Run ESLint
bun run lint:fix       # Fix ESLint issues
bun run type-check     # TypeScript checking
```

### **Useful Development Tools**
```bash
# Open Prisma Studio (Database GUI)
bun run db:studio
# Opens at http://localhost:5555

# View database in terminal
psql $DATABASE_URL

# Monitor logs in development
tail -f .next/trace
```

---

## 🎯 **Next Steps**

### **1. Explore Features**
- **School Management**: Add students, courses, and schedules
- **Church Management**: Manage members, families, and choirs
- **Library Management**: Catalog books and track loans
- **Organization Settings**: Configure your organization

### **2. Customize Your Setup**
- **User Roles**: Invite team members with appropriate roles
- **Organization Settings**: Configure preferences and branding
- **Feature Toggles**: Enable/disable features as needed
- **Integrations**: Set up Telegram notifications (optional)

### **3. Development Learning Path**
1. **Read Documentation**: Start with [Project Overview](../PROJECT_OVERVIEW.md)
2. **Understand Architecture**: Review [System Architecture](../status/SYSTEM_OVERVIEW.md)
3. **Explore Code**: Check out the feature-based folder structure
4. **Build Features**: Follow [Feature Development Guide](./FEATURE_DEVELOPMENT.md)

---

## 🐛 **Common Issues & Solutions**

### **Database Connection Issues**
```bash
# Check if PostgreSQL is running
pg_isready

# If not running, start PostgreSQL
# macOS with Homebrew:
brew services start postgresql

# Ubuntu/Debian:
sudo systemctl start postgresql

# Windows: Start PostgreSQL service from Services panel
```

### **Port Already in Use**
```bash
# If port 3000 is busy, use a different port
bun run dev -- --port 3001

# Or kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### **Environment Variables Not Loading**
```bash
# Ensure .env.local exists and has correct format
cat .env.local

# Restart development server after changes
# Ctrl+C to stop, then bun run dev
```

### **Prisma Client Issues**
```bash
# Regenerate Prisma client
bun run db:generate

# If schema changes aren't reflected
bun run db:migrate
bun run db:generate
```

### **TypeScript Errors**
```bash
# Check for type errors
bun run type-check

# Clear Next.js cache
rm -rf .next
bun run dev
```

---

## 📚 **Learning Resources**

### **P-Core Specific**
- [**Project Overview**](../PROJECT_OVERVIEW.md) - Complete system understanding
- [**Architecture Guide**](../status/SYSTEM_OVERVIEW.md) - Technical deep dive
- [**Feature Development**](./FEATURE_DEVELOPMENT.md) - Building new features
- [**API Development**](./API_DEVELOPMENT.md) - Creating APIs with Hono

### **Technology Stack**
- [**Next.js Documentation**](https://nextjs.org/docs) - React framework
- [**Prisma Documentation**](https://www.prisma.io/docs) - Database ORM
- [**Hono Documentation**](https://hono.dev/) - API framework
- [**ShadCN UI**](https://ui.shadcn.com/) - Component library
- [**Tailwind CSS**](https://tailwindcss.com/docs) - Styling framework

---

## 🤝 **Getting Help**

### **Community Support**
- **GitHub Issues**: [Report bugs or request features](https://github.com/your-username/p-core/issues)
- **Discussions**: [Community Q&A and discussions](https://github.com/your-username/p-core/discussions)
- **Documentation**: [Comprehensive guides](../README.md)

### **Direct Support**
- **Email**: peterpausianlian2020@gmail.com
- **Maintainer**: Peter Pau Sian Lian
- **Location**: Kalaymyo, Myanmar 🇲🇲

### **Before Asking for Help**
1. **Check Documentation**: Search existing guides and FAQs
2. **Review Issues**: Look for similar problems in GitHub issues
3. **Provide Context**: Include error messages, environment details, and steps to reproduce
4. **Share Code**: Use code blocks or GitHub Gists for code samples

---

## ✅ **Success Checklist**

After completing this guide, you should have:

- [ ] **P-Core running locally** at http://localhost:3000
- [ ] **Database connected** and migrations applied
- [ ] **User account created** and logged in
- [ ] **Organization set up** with appropriate type
- [ ] **Dashboard accessible** with navigation working
- [ ] **Development tools** (Prisma Studio) accessible
- [ ] **Basic understanding** of the project structure

---

**🎉 Congratulations! You're now ready to explore and develop with P-Core.**

**Next recommended reading**: [Project Overview](../PROJECT_OVERVIEW.md) to understand the full system architecture.

---

*Last Updated: July 28, 2025*  
*Estimated Setup Time: 5 minutes*  
*Difficulty: Beginner-friendly*