import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";
import { UserRole } from "./prisma-user-database/user-database-client-types";
import { userDBPrismaClient } from "./lib/prisma-client/user-prisma-client";

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
        // Update the `emailVerified` field when the account is linked
        await userDBPrismaClient.user.update({
          where: { id: user.id },
          data: { emailVerified: new Date() }, // Mark the email as verified
        });
      } catch (error) {
        console.error("Error linking account:", error); // Log errors if any occur
      }
    },
  },

  // Callbacks are functions executed during various stages of the authentication flow
  callbacks: {
    // signIn callback: This function handles the sign-in process for the user
    async signIn({ user, account }) {
      // Allow OAuth sign-in without email verification (i.e., for non-credentials login)
      if (account?.provider !== "credentials") return true;

      // Check if user ID is defined (it should always be, but good to validate)
      if (!user.id) {
        console.error("User ID is undefined.");
        return false; // Prevent sign-in if the user ID is missing
      }

      try {
        // Fetch the user from the database using the user ID
        const existingUser = await getUserById(user.id);

        // Prevent sign-in if the user's email is not verified
        if (!existingUser?.emailVerified) return false;

        // If two-factor authentication is enabled for the user, ensure they pass the 2FA check
        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.id
          );

          // Prevent sign-in if no two-factor confirmation exists
          if (!twoFactorConfirmation) return false;

          // Remove the two-factor confirmation for the next sign-in attempt
          await userDBPrismaClient.twoFactorConfirmation.delete({
            where: {
              id: twoFactorConfirmation.id,
            },
          });
        }

        return true; // Allow sign-in if all checks pass
      } catch (error) {
        console.error("Error during sign-in:", error); // Log errors during the sign-in process
        return false; // Prevent sign-in on failure
      }
    },

    // session callback: This function runs every time the session data is accessed
    // PERFORMANCE OPTIMIZATION: Use cached data from JWT token instead of DB queries
    // This reduces database load from ~2 queries per request to 0 queries per request
    async session({ token, session }) {
      try {
        // Update session user details from the cached token data
        // All user data is now cached in JWT token during login/refresh
        if (token.sub && session.user) {
          session.user.id = token.sub; // Set user ID from the token
          session.user.role = token.role as UserRole; // Set user role from the token
          session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
          session.user.name = token.name;
          session.user.email = token.email as string;
          session.user.isOAuth = token.isOAuth as boolean;
          session.user.defaultOrgId = token.defaultOrgId as string;
          // Use cached image from token instead of fresh DB query
          session.user.image = token.image as string | null;
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
          trigger === "update" || // Explicit refresh requested
          // Refresh if token is older than 15 minutes (900 seconds)
          (token.iat && Date.now() / 1000 - (token.iat as number) > 900);

        if (shouldRefreshUserData) {
          // Fetch user data using the user ID from the token
          const existingUser = await getUserById(token.sub);

          if (existingUser) {
            // Fetch user account details to check OAuth status
            const existingAccount = await getAccountByUserId(existingUser.id);

            // Cache all user data in JWT token for session callback
            token.isOAuth = !!existingAccount; // Set whether the user signed in via OAuth
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role; // Set user role
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled; // Set 2FA status
            token.defaultOrgId = existingUser.defaultOrgId; // Set default organization ID
            token.image = existingUser.image; // Cache user image to avoid DB queries in session
          }
        }
      } catch (error) {
        console.error("Error during JWT callback:", error); // Log errors during JWT processing
      }

      return token; // Return the updated JWT token
    },
  },

  // Adapter to integrate with Prisma ORM for managing authentication data
  adapter: PrismaAdapter(userDBPrismaClient),

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
