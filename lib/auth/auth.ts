import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById, getUserByEmail } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { UserRole } from "@prisma/client";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { mapUserFieldsForAuth } from "./user-field-mapper";
import { getAccountByUserId } from "@/data/account/getAccountByUserId";

// Exporting NextAuth handlers to use for authentication in the application
export const { handlers, signIn, signOut, auth } = NextAuth({
  // Pages configuration
  pages: {
    signIn: "/auth/login", // Custom sign-in page
    error: "/auth/error", // Custom error page for authentication issues
  },

  // Event listeners to handle account linking (e.g., after a successful OAuth login)
  events: {
    async linkAccount({ user }) {
      try {
        // TODO: Implement when user model is properly defined
        // Mock successful account linking
        console.log("Account linked for user:", user.id);
      } catch (error) {
        console.error("Error linking account:", error); // Log errors if any occur
      }
    },
  },

  // Callbacks are functions executed during various stages of the authentication flow
  callbacks: {
    // signIn callback: Additional validation after successful authentication
    async signIn({ user, account }) {
      // Allow OAuth sign-in
      if (account?.provider !== "credentials") return true;

      // For credentials, authentication already happened in authorize function
      // Just do any additional validation here if needed
      console.log("✅ SignIn callback - user authenticated:", user.email);
      return true;
    },

    // session callback: This function runs every time the session data is accessed
    // PERFORMANCE OPTIMIZATION: Use cached data from JWT token instead of DB queries
    // This reduces database load from ~2 queries per request to 0 queries per request
    async session({ token, session }) {
      try {
        // Update session user details from the cached token data
        // All user data is now cached in JWT token during login/refresh
        if (token.sub && session.user) {
          // Use the mapping utility to keep user fields in sync
          Object.assign(session.user, mapUserFieldsForAuth({
            id: token.sub,
            name: token.name,
            email: token.email as string,
            role: token.role as UserRole,
            isTwoFactorEnabled: token.isTwoFactorEnabled as boolean,
            defaultOrgId: token.defaultOrgId as string | undefined,
            image: token.image as string | null,
            isOAuth: token.isOAuth as boolean,
          }));
        }

        return session; // Return the updated session object with cached data
      } catch (error) {
        console.error("Error during session callback:", error); // Log errors during session handling
        return session; // Return the session even in case of an error
      }
    },

    // jwt callback: This function is called whenever a JWT token is created or updated
    // PERFORMANCE OPTIMIZATION: Cache user data in JWT to avoid repeated DB queries
    // This callback runs less frequently (token refresh) vs session callback (every request)
    async jwt({ token, trigger }) {


      if (!token.sub) return token; // If no user ID in token, return the token as-is

      try {
        // Only fetch fresh data during initial login or explicit refresh
        // This prevents unnecessary DB queries on every token access
        const shouldRefreshUserData =
          !token.name || // Initial login - no cached data
          !token.role || // Role is not cached
          !token.isTwoFactorEnabled || // 2FA status is not cached
          !token.defaultOrgId || // Default organization ID is not cached
          !token.image || // Image is not cached

          trigger === "update" || // Explicit refresh requested
          // Refresh if token is older than 15 minutes (900 seconds)
          (token.iat && Date.now() / 1000 - (token.iat as number) > 900);

        if (shouldRefreshUserData) {
          // Fetch user data using the user ID from the token
          const existingUser = await getUserById(token.sub);

          if (existingUser) {
            // Fetch user account details to check OAuth status
            const existingAccount = await getAccountByUserId(existingUser.id);

            // Use the mapping utility to keep user fields in sync
            const mapped = mapUserFieldsForAuth({
              ...existingUser,
              isOAuth: !!existingAccount,
            });
            Object.assign(token, mapped);
          }
        }
      } catch (error) {
        console.error("Error during JWT callback:", error); // Log errors during JWT processing
      }

      return token; // Return the updated JWT token
    },
  },

  // Adapter to integrate with Prisma ORM for managing authentication data
  // Commented out for mock database compatibility
  // adapter: PrismaAdapter(prisma),

  // Session configuration: Use JWT (JSON Web Tokens) for session management
  // PERFORMANCE OPTIMIZATION: Reduce token refresh frequency to minimize DB queries
  session: {
    strategy: "jwt",
    maxAge: 3600, // 1 hour - shorter sessions for security
    updateAge: 900, // 15 minutes - refresh token every 15 minutes instead of default 24 hours
  },

  // Additional configuration options loaded from the external authConfig file
  ...authConfig,
});
