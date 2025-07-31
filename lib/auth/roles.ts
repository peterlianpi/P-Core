// UserRole enum for use in both Edge and Node.js environments
// Do NOT import from @prisma/client in Edge code (middleware, edge auth, etc.)

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
}

// Add more roles as needed, keeping in sync with your Prisma schema
