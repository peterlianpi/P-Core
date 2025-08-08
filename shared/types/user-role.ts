// Shared UserRole enum for use in both client and server code
// Keep this in sync with the Prisma schema
export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  DEVELOPMENT = "DEVELOPMENT",
  SUPERADMIN = "SUPERADMIN"
}
