import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./data/user";

import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";
import { UserRole } from "@prisma/client";

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
        await db.user.update({
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
          await db.twoFactorConfirmation.delete({
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
    async session({ token, session }) {
      try {
        // Update session user details from the token
        if (token.sub && session.user) {
          session.user.id = token.sub; // Set user ID from the token
          session.user.role = token.role as UserRole; // Set user role from the token
          session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
          session.user.name = token.name;
          session.user.email = token.email as string;
          session.user.isOAuth = token.isOAuth as boolean;
          session.user.defaultOrgId = token.defaultOrgId as string;
        }

        // Fetch the latest user data (like profile image) from the database to update the session
        if (session.user?.id) {
          const updatedUser = await db.user.findUnique({
            where: { id: session.user.id },
          });

          if (updatedUser) {
            session.user.image = updatedUser.image || null; // Update image in session if available
          }
        }

        return session; // Return the updated session object
      } catch (error) {
        console.error("Error during session callback:", error); // Log errors during session handling
        return session; // Return the session even in case of an error
      }
    },

    // jwt callback: This function is called whenever a JWT token is created or updated
    async jwt({ token }) {
      if (!token.sub) return token; // If no user ID in token, return the token as-is

      try {
        // Fetch user data using the user ID from the token
        const existingUser = await getUserById(token.sub);

        if (existingUser) {
          // Fetch user account details to check OAuth status
          const existingAccount = await getAccountByUserId(existingUser.id);

          // Set additional fields in the token
          token.isOAuth = !!existingAccount; // Set whether the user signed in via OAuth
          token.name = existingUser.name;
          token.email = existingUser.email;
          token.role = existingUser.role; // Set user role
          token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled; // Set 2FA status
          token.defaultOrgId = existingUser.defaultOrgId; // Set default organization ID
        }
      } catch (error) {
        console.error("Error during JWT callback:", error); // Log errors during JWT processing
      }

      return token; // Return the updated JWT token
    },
  },

  // Adapter to integrate with Prisma ORM for managing authentication data
  adapter: PrismaAdapter(db),

  // Session configuration: Use JWT (JSON Web Tokens) for session management
  session: { strategy: "jwt" },

  // Additional configuration options loaded from the external authConfig file
  ...authConfig,
});
