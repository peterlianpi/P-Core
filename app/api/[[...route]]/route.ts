/* eslint-disable @typescript-eslint/no-unused-vars */
// Enhanced Hono API Router with Security & Performance Optimizations
// Consolidates CORS configuration and implements comprehensive security middleware
// Uses new unified database client and RLS-based tenant isolation

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { timeout } from "hono/timeout";

// Import route modules
import upload from "./upload";
import uploadImage from "./upload-image";
import org from "./org";
import versionInfo from "./version";
import feedback from "./feedback";
import invite from "./invite";
import { studentsRouter as students } from "./students";
import studentCourses from "./studentCourses";
import courses from "./courses";
import lessonBooks from "./lessonBooks";
import purchases from "./purchases";
import courseStatusLogs from "./courseStatusLogs";
import schedules from "./schedules";
import dashboard from "./dashboard";
import members from "./members";
import choirs from "./choirs";
import books from "./books";

// Import security middleware
import { organizationSecurityMiddleware } from "@/lib/security/tenant";
import { checkDatabaseHealth } from "@/lib/db/client";

// Initialize Hono app with base path
const app = new Hono().basePath("/api");

// ============================================================================
// GLOBAL MIDDLEWARE - Applied to all routes for security and performance
// ============================================================================

// 1. Request timeout protection (30 seconds)
app.use("*", timeout(30000));

// 2. Security headers - Defense against common web vulnerabilities
app.use(
  "*",
  secureHeaders({
    // Clickjacking protection
    xFrameOptions: "DENY",

    // MIME type sniffing protection
    xContentTypeOptions: "nosniff",

    // XSS filtering
    xXssProtection: "1; mode=block",

    // HTTPS enforcement (production only)
    strictTransportSecurity:
      process.env.NODE_ENV === "production"
        ? "max-age=31536000; includeSubDomains; preload"
        : undefined,

    // Content Security Policy
    contentSecurityPolicy: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      "style-src": ["'self'", "'unsafe-inline'"],
      "img-src": ["'self'", "data:", "https:"],
      "connect-src": ["'self'"],
      "font-src": ["'self'"],
      "object-src": ["'none'"],
      "media-src": ["'self'"],
      "frame-src": ["'none'"],
    },

    // Feature policy for privacy protection
    permissionsPolicy: {
      camera: [],
      microphone: [],
      geolocation: [],
      payment: [],
      usb: [],
    },
  })
);

// 3. CORS Configuration - Centralized and secure
app.use(
  "*",
  cors({
    origin: (origin) => {
      // Development: Allow localhost
      if (process.env.NODE_ENV === "development") {
        if (
          !origin ||
          origin.includes("localhost") ||
          origin.includes("127.0.0.1") ||
          origin.includes("3000") ||
          origin.includes("3001")
        ) {
          return true;
        }
      }

      // Production: Whitelist specific domains
      const allowedOrigins = [
        process.env.NEXT_PUBLIC_APP_URL,
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : undefined,
        // Add your production domains here
        "https://your-domain.com",
        "https://www.your-domain.com",
      ].filter(Boolean);

      return origin ? allowedOrigins.includes(origin) : false;
    },

    allowHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-Organization-Id",
      "Accept",
      "Origin",
    ],

    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    maxAge: 86400, // 24 hours
  })
);

// 4. Request logging for security monitoring
app.use(
  "*",
  logger((message) => {
    // Enhanced logging with security context
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  })
);

// 5. Pretty JSON response formatting (development only)
if (process.env.NODE_ENV === "development") {
  app.use("*", prettyJSON());
}

// 6. Global error handling middleware
app.use("*", async (c, next) => {
  try {
    await next();
  } catch (error) {
    console.error("API Error:", error);

    // Security: Don't leak internal errors in production
    const isDevelopment = process.env.NODE_ENV === "development";

    if (error instanceof Error) {
      return c.json(
        {
          error: isDevelopment ? error.message : "Internal server error",
          code: "INTERNAL_ERROR",
          ...(isDevelopment && { stack: error.stack }),
        },
        500
      );
    }

    return c.json(
      {
        error: "An unexpected error occurred",
        code: "UNKNOWN_ERROR",
      },
      500
    );
  }
});

// ============================================================================
// HEALTH CHECK ENDPOINTS
// ============================================================================

// Basic health check
app.get("/health", async (c) => {
  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || "unknown",
  });
});

// Database health check
app.get("/health/db", async (c) => {
  const dbHealth = await checkDatabaseHealth();
  const statusCode = dbHealth.status === "healthy" ? 200 : 503;

  return c.json(dbHealth, statusCode);
});

// Comprehensive system health check
app.get("/health/system", async (c) => {
  const dbHealth = await checkDatabaseHealth();

  const systemHealth = {
    api: { status: "healthy" },
    database: dbHealth,
    environment: {
      nodeEnv: process.env.NODE_ENV,
      runtime: "edge",
    },
    timestamp: new Date().toISOString(),
  };

  const isHealthy = dbHealth.status === "healthy";
  return c.json(systemHealth, isHealthy ? 200 : 503);
});

// ============================================================================
// ROUTE DEFINITIONS
// ============================================================================

// Apply organization security middleware to protected routes
const protectedRoutes = [
  "students",
  "courses",
  "schedules",
  "purchases",
  "lessonBooks",
  "studentCourses",
  "courseStatusLogs",
  "dashboard",
];

// Configure routes with appropriate middleware
const routes = app
  // Public routes (no organization context required)
  .route("/upload", upload)
  .route("/upload-image", uploadImage)
  .route("/org", org)
  .route("/versionInfo", versionInfo)
  .route("/feedback", feedback)
  .route("/invite", invite)

  // Protected routes (require organization context and RLS)
  .route(
    "/students",
    new Hono().use("*", organizationSecurityMiddleware).route("/", students)
  )
  .route(
    "/courses",
    new Hono().use("*", organizationSecurityMiddleware).route("/", courses)
  )
  .route(
    "/schedules",
    new Hono().use("*", organizationSecurityMiddleware).route("/", schedules)
  )
  .route(
    "/purchases",
    new Hono().use("*", organizationSecurityMiddleware).route("/", purchases)
  )
  .route(
    "/lessonBooks",
    new Hono().use("*", organizationSecurityMiddleware).route("/", lessonBooks)
  )
  .route(
    "/studentCourses",
    new Hono()
      .use("*", organizationSecurityMiddleware)
      .route("/", studentCourses)
  )
  .route(
    "/courseStatusLogs",
    new Hono()
      .use("*", organizationSecurityMiddleware)
      .route("/", courseStatusLogs)
  )
  .route(
    "/members",
    new Hono().use("*", organizationSecurityMiddleware).route("/", members)
  )
  .route(
    "/choirs",
    new Hono().use("*", organizationSecurityMiddleware).route("/", choirs)
  )
  .route(
    "/books",
    new Hono().use("*", organizationSecurityMiddleware).route("/", books)
  )
  .route(
    "/dashboard",
    new Hono().use("*", organizationSecurityMiddleware).route("/", dashboard)
  );

// ============================================================================
// HTTP METHOD HANDLERS
// ============================================================================

// Export handlers for each HTTP method
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);
export const OPTIONS = handle(app);

// Export app type for client-side type safety
export type AppType = typeof routes;

// Export the app for testing (commented out to fix build)
// export { app };
