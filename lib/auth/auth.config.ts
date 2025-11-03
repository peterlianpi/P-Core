import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { LoginSchema } from "@/lib/schemas";
import { UserRole } from "./roles";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import bcrypt from "bcryptjs";

// Force Node.js runtime to avoid Edge Runtime warnings
export const runtime = "nodejs";

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
        const validatedFields = LoginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        try {
          console.log('🔐 Attempting login for:', email);
          const user = await getUserByEmail(email);
          console.log('🔐 User found:', !!user, user?.email);

          if (!user || !user.password) {
            console.log('❌ User not found or no password');
            return null;
          }

          console.log('🔐 Stored hash (first 20):', user.password.substring(0, 20) + '...');
          console.log('🔐 Input password:', password);
          console.log('🔐 Checking password...');
          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log('🔐 bcrypt.compare result:', passwordMatch);

          if (!passwordMatch) {
            console.log('❌ Password mismatch');
            return null;
          }

          if (!user.emailVerified) {
            console.log('❌ Email not verified');
            return null;
          }

          // Check 2FA if enabled
          if (user.isTwoFactorEnabled) {
            console.log('🔐 Checking 2FA...');
            const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(user.id);
            if (!twoFactorConfirmation) {
              console.log('❌ 2FA not confirmed');
              return null;
            }
          }

          console.log('✅ Authentication successful');
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            isTwoFactorEnabled: user.isTwoFactorEnabled,
            defaultOrgId: user.defaultOrgId,
            image: user.image,
          };
        } catch (error) {
          console.error('❌ Authentication error:', error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
