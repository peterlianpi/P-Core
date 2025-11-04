// LIGHTWEIGHT EDGE-COMPATIBLE MIDDLEWARE
// This middleware only checks for session cookies without importing heavy dependencies
// Authorization logic is handled in API routes to keep middleware lightweight
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./lib/auth/routes";
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const isLoggedIn = checkIfLoggedIn(req);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow API auth routes to pass through (they handle their own auth)
  if (nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Handle auth routes (login, register, etc.)
  if (isAuthRoute) {
    if (isLoggedIn) {
      // SECURITY FIX: Prevent redirect loops
      if (nextUrl.pathname !== DEFAULT_LOGIN_REDIRECT) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
    }
    return NextResponse.next();
  }

  // Redirect to login if not logged in and not on a public route
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
}

// Lightweight function to check if user is logged in by checking for session cookie
function checkIfLoggedIn(req: NextRequest): boolean {
  // Check for NextAuth session token cookie
  const cookies = req.cookies;
  return cookies.has('next-auth.session-token') ||
         cookies.has('__Secure-next-auth.session-token');
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
