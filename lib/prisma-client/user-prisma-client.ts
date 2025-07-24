import { PrismaClient } from "../../prisma-user-database/user-database-client-types";

// Extend the globalThis type to include the userPrisma property
declare global {
    // `var` is used to declare a globally scoped variable that works with hot-reloading
    var userPrisma: PrismaClient | undefined;
}

// Initialize the PrismaClient instance
// If `globalThis.userPrisma` is already defined (e.g., during development with hot-reloading), reuse it.
// Otherwise, create a new PrismaClient instance.
export const userDBPrismaClient = globalThis.userPrisma || new PrismaClient();

// In non-production environments, assign the PrismaClient instance to `globalThis.userPrisma`
// to prevent multiple instances being created during hot-reloading.
if (process.env.NODE_ENV !== "production") {
    globalThis.userPrisma = userDBPrismaClient;
}