import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

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
        try {
          const validatedFields = LoginSchema.safeParse(credentials);
          if (!validatedFields.success) {
            console.error("Invalid credentials format");
            return null;
          }

          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            console.error("User not found or password is missing");
            return null;
          }

          // Use bcryptjs for password comparison
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            console.error("Password mismatch");
            return null;
          }

          // Authentication successful, return user object
          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;

// Ensure the API runs in the Node.js runtime to avoid Edge Runtime warnings
// Updated runtime configuration
export const runtime = "nodejs";
