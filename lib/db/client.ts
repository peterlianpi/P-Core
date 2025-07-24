// Unified Prisma Client with Singleton Pattern
// This replaces the dual-database setup with a single, optimized client instance
// Implements connection pooling best practices and RLS context management

import { PrismaClient } from "@prisma/client";

// Global variable to store the singleton instance
declare global {
  // Prevent multiple instances in development due to hot reloading
  var __globalPrismaClient: PrismaClient | undefined;
}

// Database configuration optimized for serverless environments
const createPrismaClient = () => {
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    
    // Connection pool configuration for optimal performance
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  // Add middleware for Row-Level Security (RLS) context setting
  client.$use(async (params, next) => {
    // Extract orgId from the query params if available
    const orgId = extractOrgIdFromParams(params);
    
    if (orgId) {
      // Set the organization context for RLS policies
      await client.$executeRaw`SELECT set_config('app.current_org_id', ${orgId}, true)`;
    }

    return next(params);
  });

  return client;
};

// Helper function to extract orgId from query parameters
function extractOrgIdFromParams(params: any): string | null {
  if (!params.args) return null;

  // Handle different query structures
  if (params.args.where?.orgId) {
    return params.args.where.orgId;
  }
  
  if (params.args.data?.orgId) {
    return params.args.data.orgId;
  }

  return null;
}

// Singleton pattern implementation
// Ensures single instance across the application lifecycle
export const prisma = globalThis.__globalPrismaClient ?? createPrismaClient();

// In development, store the client globally to prevent multiple instances
if (process.env.NODE_ENV === "development") {
  globalThis.__globalPrismaClient = prisma;
}

// Connection management utilities
export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};

export const disconnectFromDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log("✅ Database disconnected successfully");
  } catch (error) {
    console.error("❌ Database disconnection failed:", error);
    throw error;
  }
};

// Health check function for monitoring
export const checkDatabaseHealth = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: "healthy", timestamp: new Date().toISOString() };
  } catch (error) {
    return { 
      status: "unhealthy", 
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString() 
    };
  }
};

// Export the singleton client as default
export default prisma;

// Type exports for convenience
export type { PrismaClient } from "@prisma/client";
export * from "@prisma/client";
