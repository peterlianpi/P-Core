import { PrismaClient } from "../../prisma-features-database/features-database-client-types";
// import { withAccelerate } from "@prisma/extension-accelerate"

const getPrisma = () => new PrismaClient()
// .$extends(withAccelerate());

const globalForFeaturesDBPrismaClient = global as unknown as {
    featuresDBPrismaClient: ReturnType<typeof getPrisma>;
};

export const featuresDBPrismaClient =
    globalForFeaturesDBPrismaClient.featuresDBPrismaClient || getPrisma();

if (process.env.NODE_ENV !== "production")
    globalForFeaturesDBPrismaClient.featuresDBPrismaClient = featuresDBPrismaClient;