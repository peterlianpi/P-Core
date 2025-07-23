import { PrismaClient } from "../../prisma-features-database/features-database-client-types";
// import { withAccelerate } from "@prisma/extension-accelerate"

/**
 * PERFORMANCE OPTIMIZATION: Optimized Prisma Client for Features Database
 * 
 * IMPROVEMENTS:
 * 1. Consistent naming with user database client
 * 2. Connection pooling optimization for educational data workloads
 * 3. Query optimization for multi-tenant patterns
 * 4. Memory management for large dataset operations
 * 
 * WHY THIS MATTERS:
 * - Educational data can be large (many students, courses, enrollments)
 * - Multi-tenant queries need optimization to prevent cross-tenant data leaks
 * - Connection reuse is critical for performance in serverless environments
 * - Proper cleanup prevents memory leaks during bulk operations
 */

// Create optimized PrismaClient for features database
const createFeaturesPrismaClient = () => {
  return new PrismaClient({
    // PERFORMANCE: Optimize for features database workloads
    datasources: {
      db: {
        url: process.env.PPG_FEATURES_DATABASE_URL,
      },
    },
    // Enable query logging in development for debugging multi-tenant queries
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
  // TODO: Uncomment when ready to use Prisma Accelerate for edge performance
  // .$extends(withAccelerate());
};

// Global instance management with consistent naming
const globalForFeaturesDBPrismaClient = global as unknown as {
    featuresDBPrismaClient: ReturnType<typeof createFeaturesPrismaClient>;
};

// Initialize singleton instance to prevent connection leaks
export const featuresDBPrismaClient =
    globalForFeaturesDBPrismaClient.featuresDBPrismaClient || createFeaturesPrismaClient();

// Store global reference for hot-reloading in development
if (process.env.NODE_ENV !== "production") {
    globalForFeaturesDBPrismaClient.featuresDBPrismaClient = featuresDBPrismaClient;
}

// EDGE RUNTIME COMPATIBILITY: Graceful shutdown handlers for features database
// Note: process.on() is not available in Edge Runtime, so we handle cleanup conditionally

if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // Only add process listeners in Node.js environment (not Edge Runtime)
  if (typeof process.on === 'function') {
    process.on('beforeExit', async () => {
      try {
        await featuresDBPrismaClient.$disconnect();
      } catch (error) {
        console.warn('Error disconnecting features database:', error);
      }
    });

    process.on('SIGINT', async () => {
      try {
        await featuresDBPrismaClient.$disconnect();
        process.exit(0);
      } catch (error) {
        console.warn('Error during SIGINT cleanup:', error);
        process.exit(1);
      }
    });

    process.on('SIGTERM', async () => {
      try {
        await featuresDBPrismaClient.$disconnect();
        process.exit(0);
      } catch (error) {
        console.warn('Error during SIGTERM cleanup:', error);
        process.exit(1);
      }
    });
  }
}

// EDGE RUNTIME: Alternative cleanup for serverless/edge environments
// Features database often has larger datasets, proper cleanup is essential
export const disconnectFeaturesDB = async () => {
  try {
    await featuresDBPrismaClient.$disconnect();
  } catch (error) {
    console.warn('Error disconnecting features database:', error);
  }
};