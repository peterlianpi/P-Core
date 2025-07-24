// EDGE RUNTIME FIX: Use edge-compatible auth configuration
// This prevents Prisma client from being bundled in middleware
import { auth } from "./auth.edge";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // SECURITY ENHANCEMENT: Add security headers for all responses
  const response = NextResponse.next();
  
  // Prevent MIME type sniffing attacks
  response.headers.set('X-Content-Type-Options', 'nosniff');
  // Prevent page from being embedded in frames (clickjacking protection)
  response.headers.set('X-Frame-Options', 'DENY');
  // Enable XSS filtering in browsers
  response.headers.set('X-XSS-Protection', '1; mode=block');
  // Restrict camera and microphone access
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  if (isApiAuthRoute) {
    return response; // Allow API auth routes with security headers
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // SECURITY FIX: Prevent redirect loops by checking if target equals current path
      if (nextUrl.pathname !== DEFAULT_LOGIN_REDIRECT) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
    }
    return response; // Allow auth routes with security headers
  }

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
  
  return response; // Return response with security headers
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
