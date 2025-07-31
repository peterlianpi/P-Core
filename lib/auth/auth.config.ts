import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "@/lib/schemas";
import { UserRole } from "./roles";

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
        // Edge-runtime compatible validation only
        // Actual authentication happens in auth.ts signIn callback
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;
        
        // Return credentials for server-side verification in auth.ts
        // This keeps auth.config.ts edge-runtime compatible
        return {
          id: "temp", // Temporary ID, will be replaced in auth.ts
          email,
          password,
          // Add required fields from extended User interface
          role: UserRole.USER, // Will be replaced in auth.ts
          isTwoFactorEnabled: false, // Will be replaced in auth.ts
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

// Ensure the API runs in the Node.js runtime to avoid Edge Runtime warnings
// Updated runtime configuration
export const runtime = "nodejs";
