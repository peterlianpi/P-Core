import { PrismaClient } from "@prisma/client";

// Extend the globalThis type to include the prisma property
declare global {
  // `var` is used to declare a globally scoped variable that works with hot-reloading
  var prisma: PrismaClient | undefined;
}

// Initialize the PrismaClient instance
// If `globalThis.prisma` is already defined (e.g., during development with hot-reloading), reuse it.
// Otherwise, create a new PrismaClient instance.
export const db = globalThis.prisma || new PrismaClient();

// In non-production environments, assign the PrismaClient instance to `globalThis.prisma`
// to prevent multiple instances being created during hot-reloading.
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
