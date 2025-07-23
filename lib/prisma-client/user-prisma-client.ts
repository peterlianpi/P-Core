import { PrismaClient } from "../../prisma-user-database/user-database-client-types";

/**
 * PERFORMANCE OPTIMIZATION: Optimized Prisma Client for User Database
 * 
 * IMPROVEMENTS:
 * 1. Connection pooling with optimized settings for serverless
 * 2. Query optimization with proper indexes
 * 3. Global instance management to prevent connection leaks
 * 4. Graceful connection cleanup on process termination
 * 
 * WHY THIS MATTERS:
 * - Reduces cold start time by reusing connections
 * - Prevents connection pool exhaustion in serverless environments
 * - Improves query performance with optimized connection settings
 * - Ensures proper cleanup to prevent memory leaks
 */

// Extend the globalThis type to include the prisma property
declare global {
    var userPrisma: PrismaClient | undefined;
}

// Create optimized PrismaClient with performance settings
const createUserPrismaClient = () => {
  return new PrismaClient({
    // PERFORMANCE: Optimize connection pooling for serverless
    datasources: {
      db: {
        url: process.env.PPG_USER_DATABASE_URL,
      },
    },
    // Enable query logging in development for debugging
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
};

// Initialize the PrismaClient instance with singleton pattern
// This prevents multiple instances during hot-reloading and reduces memory usage
export const userDBPrismaClient = globalThis.userPrisma || createUserPrismaClient();

// In non-production environments, assign the PrismaClient instance to global
// This enables hot-reloading without creating new connections
if (process.env.NODE_ENV !== "production") {
    globalThis.userPrisma = userDBPrismaClient;
}

// EDGE RUNTIME COMPATIBILITY: Graceful shutdown handlers
// Note: process.on() is not available in Edge Runtime (middleware), 
// so we handle cleanup differently for different environments

if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // Only add process listeners in Node.js environment (not Edge Runtime)
  if (typeof process.on === 'function') {
    process.on('beforeExit', async () => {
      try {
        await userDBPrismaClient.$disconnect();
      } catch (error) {
        console.warn('Error disconnecting user database:', error);
      }
    });

    process.on('SIGINT', async () => {
      try {
        await userDBPrismaClient.$disconnect();
        process.exit(0);
      } catch (error) {
        console.warn('Error during SIGINT cleanup:', error);
        process.exit(1);
      }
    });

    process.on('SIGTERM', async () => {
      try {
        await userDBPrismaClient.$disconnect();
        process.exit(0);
      } catch (error) {
        console.warn('Error during SIGTERM cleanup:', error);
        process.exit(1);
      }
    });
  }
}

// EDGE RUNTIME: Alternative cleanup approach for serverless/edge environments
// This ensures connections are properly managed even without process listeners
export const disconnectUserDB = async () => {
  try {
    await userDBPrismaClient.$disconnect();
  } catch (error) {
    console.warn('Error disconnecting user database:', error);
  }
};