import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById, getUserByEmail } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { UserRole } from "@prisma/client";
import { prisma } from "@/lib/db/client";
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
        // Update the `emailVerified` field when the account is linked
        await prisma.user.update({
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

      // Handle credentials authentication (moved from auth.config.ts for edge compatibility)
      if (account?.provider === "credentials" && user.email && user.password) {
        try {
          const existingUser = await getUserByEmail(user.email);
          if (!existingUser || !existingUser.password) {
            console.error("User not found or password is missing");
            return false;
          }

          // Use bcryptjs for password comparison
          const passwordMatch = await bcrypt.compare(user.password, existingUser.password);
          if (!passwordMatch) {
            console.error("Password mismatch");
            return false;
          }

          // Check email verification
          if (!existingUser.emailVerified) return false;

          // Check 2FA if enabled
          if (existingUser.isTwoFactorEnabled) {
            const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
            if (!twoFactorConfirmation) return false;

            // Remove the two-factor confirmation for the next sign-in attempt
            await prisma.twoFactorConfirmation.delete({
              where: { id: twoFactorConfirmation.id },
            });
          }

          // Update user object with database user data
          user.id = existingUser.id;
          user.name = existingUser.name;
          user.email = existingUser.email;
          user.role = existingUser.role;
          user.isTwoFactorEnabled = Boolean(existingUser.isTwoFactorEnabled);
          user.defaultOrgId = existingUser.defaultOrgId ?? undefined;

          return true;
        } catch (error) {
          console.error("Error during credentials sign-in:", error);
          return false;
        }
      }

      // For existing user ID validation (OAuth users)
      if (!user.id || user.id === "temp") {
        console.error("User ID is undefined or temporary.");
        return false;
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
          await prisma.twoFactorConfirmation.delete({
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
  adapter: PrismaAdapter(prisma),

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
