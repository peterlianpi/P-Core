// EDGE RUNTIME-COMPATIBLE AUTH CONFIGURATION
// This file configures NextAuth.js for use in Edge environments (like Next.js Middleware).
// It avoids using database adapters (like Prisma) which are not compatible with the Edge.

import NextAuth from "next-auth";
import authConfig from "./auth.config";

// Initialize NextAuth.js with an Edge-compatible configuration
// This version of `auth` can be safely imported into `middleware.ts`
export const { auth } = NextAuth({
  ...authConfig,
  // Note: We do not include the PrismaAdapter here because it's not Edge-compatible.
  // The middleware only needs to know if a user is authenticated (via their JWT session),
  // not perform database operations. The main `auth.ts` file will handle DB interactions.
});
