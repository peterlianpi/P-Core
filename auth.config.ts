import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas";
// Note: Database operations moved to server-side auth.ts
// This keeps auth.config.ts edge-runtime compatible

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        // Edge runtime compatible - validation only
        // Actual authentication logic moved to server-side login action
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        // Return credentials for server-side verification
        // The actual user authentication happens in login server action
        return {
          id: "temp",
          email: validatedFields.data.email,
          password: validatedFields.data.password,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

// Ensure the API runs in the Node.js runtime to avoid Edge Runtime warnings
// Updated runtime configuration
export const runtime = "nodejs";
