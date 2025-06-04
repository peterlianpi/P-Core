# 🧩 P-Core System

A **flexible**, **pluggable**, and **reusable management system** designed to support multiple domain types like:

- 🎓 Student Management  
- ⛪ Church Member Management  
- 📦 Goods/Inventory Management  

Each domain has its own custom fields and logic, but they all share the same **core CRUD structure**, **authentication**, **RBAC**, and **UI components**.

---

## ⚙️ Tech Stack (PORN Stack)

- **PostgreSQL** – Reliable, scalable relational database  
- **OpenAI API** – Smart features (e.g., summarization, search)  
- **React / Next.js (App Router)** – Frontend + backend in one  
- **Node.js with Hono.js** – Lightweight backend layer (optional)  

---

## 🔧 Core Architecture

### Shared Core Modules

- ✅ User Authentication (via [NextAuth.js](https://next-auth.js.org) or [Auth.js](https://authjs.dev))
- ✅ Role-Based Access Control (Super Admin, Admin, Editor, Viewer)
- ✅ Reusable Table with Pagination and Filtering
- ✅ Dynamic Form Renderer (based on schema)
- ✅ CSV Import/Export support
- ✅ Notification System (e.g. [Resend](https://resend.com))
- ✅ Dashboard with charts (customizable per domain)

---

## 📦 Domain-Specific Features

| Feature Type     | Student Management          | Church Members              | Goods Management          |
|------------------|-----------------------------|-----------------------------|---------------------------|
| **Entity Name**  | Student                     | Member                      | Product                   |
| **Categories**   | Grade, Class                | Home, Veng, Khawk           | Type, Material            |
| **Custom Fields**| GPA, Enrollment Date        | Baptized?, Talent Support   | Price, Stock              |
| **Extra Logic**  | Assign to Class             | YF Talent Tracking          | Inventory Monitoring      |

> 📁 Each domain is mounted as a module under `/features/{domain}`.

---

## 🧠 Dynamic Field System (Optional)

To avoid repeating form and table code, you can define a JSON schema per entity:

- Fields definition
- Validation rules
- Filters
- Table headers

Example JSON config:
```json
{
  "entity": "Student",
  "fields": [
    { "name": "name", "type": "text", "required": true },
    { "name": "gpa", "type": "number", "required": false },
    { "name": "class", "type": "select", "options": ["A", "B", "C"] }
  ]
}
```

---

## 📁 Folder Structure

```bash
/features
  ├── students/
  ├── members/
  ├── goods/
  ├── common/         # Shared utilities: auth, roles, table, charts, etc.
/app
  ├── dashboard/       # Chart dashboards
  ├── login/
  ├── api/             # API routes
/utils
  ├── schema/          # JSON schemas for entities
  ├── crypto/          # Encryption utils
  ├── notifications/   # Email/SMS functions
```

---

## 🔐 Roles and Permissions

| Role         | Permissions                              |
|--------------|-------------------------------------------|
| Super Admin  | Full access across all domains            |
| Admin        | Full access per assigned domain           |
| Editor       | Can create, update, delete in domain      |
| Viewer       | Read-only access                         |

---

## 🧪 Reusable Features

- 📊 **Dashboard Chart** – Plug different data sources into shared chart components  
- 🧾 **Dynamic Form Generator** – Rendered based on schema  
- 📋 **Paginated Table** – With filters, actions, and responsive design  

---

## 👥 User & Org Management

Supports:
- User profiles
- Organization creation
- Organization-based role management
- Billing structure (future feature)
- Invitations via links or email
- Member role editing

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/p-core.git
cd p-core
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the app.

---

## 🌐 Deployment

Deploy on [Vercel](https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template):

```bash
# Add environment variables in .env file
DATABASE_URL=...
NEXTAUTH_SECRET=...
RESEND_API_KEY=...
```

More info: [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma](https://www.prisma.io)
- [Hono.js](https://hono.dev)
- [Resend](https://resend.com)
- [OpenAI API](https://platform.openai.com/docs)

---

## 📬 Contact

Maintained by **Peter Pau Sian Lian**  
Email: `peterpausianlian2020@gmail.com`  
Location: Kalaymyo, Myanmar 🇲🇲  
