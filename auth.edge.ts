import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Edge-compatible auth configuration for middleware
// This version excludes Prisma adapter and database-dependent callbacks
const edgeConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // No credentials provider in edge runtime
  ],
  
  // Simplified callbacks for edge runtime
  callbacks: {
    // Simple session callback that doesn't query database
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as any;
        session.user.name = token.name;
        session.user.email = token.email as string;
      }
      return session;
    },
    
    // Simple JWT callback for edge runtime
    async jwt({ token }) {
      return token;
    },
  },
  
  // Use JWT strategy for edge runtime
  session: { 
    strategy: "jwt",
    maxAge: 3600,
  },
};

export const { auth } = NextAuth(edgeConfig);
