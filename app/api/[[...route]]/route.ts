/* eslint-disable @typescript-eslint/no-unused-vars */
// Enhanced Hono API Router - Main Entry Point

import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "hono/logger";
import { timeout } from "hono/timeout";

// Import Security & Utility Middleware/Functions
import { organizationSecurityMiddleware } from "@/lib/security/tenant";
import { checkDatabaseHealth } from "@/lib/db/client";
import { handleApiError } from "@/lib/utils/api-errors";

// Import Route Modules
// --- Public Routes ---
import upload from "./upload";
import uploadImage from "./upload-image";
import org from "./org";
import versionInfo from "./version";
import feedback from "./feedback";
import invite from "./invite";
// --- Protected Routes ---
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

const app = new Hono().basePath("/api");

// ============================================================================
// GLOBAL MIDDLEWARE
// ============================================================================

app.use("*", logger());
app.use("*", secureHeaders());
app.use("*", cors({
    origin: (origin, c) => {
        const allowedOrigins = [
            process.env.NEXT_PUBLIC_APP_URL,
        ].filter(Boolean) as string[];

        if (process.env.NODE_ENV === "development" || !origin) {
            return origin; // Allow in development or for same-origin
        }
        
        if (allowedOrigins.includes(origin)) {
            return origin; // Return the allowed origin string
        }
        
        return null; // Block all other origins
    },
    credentials: true,
}));
app.use("*", timeout(30000));

// Centralized Error Handling - Relies on routes throwing errors.
app.onError((err, c) => {
    return handleApiError(c, err);
});

// ============================================================================
// ROUTE DEFINITIONS
// ============================================================================

// --- Public Routes ---
// These routes do not require authentication or organization context.
app
    .route("/upload", upload)
    .route("/upload-image", uploadImage)
    .route("/org", org)
    .route("/version", versionInfo)
    .route("/feedback", feedback)
    .route("/invite", invite);

// --- Protected Route Group ---
// A single group for all routes that require the organization security middleware.
const protectedRoutes = new Hono()
    .use(organizationSecurityMiddleware)
    .route("/students", students)
    .route("/courses", courses)
    .route("/schedules", schedules)
    .route("/purchases", purchases)
    .route("/lessonBooks", lessonBooks)
    .route("/studentCourses", studentCourses)
    .route("/courseStatusLogs", courseStatusLogs)
    .route("/dashboard", dashboard)
    .route("/members", members)
    .route("/choirs", choirs)
    .route("/books", books);

// Mount the protected routes group onto the main app.
app.route("/", protectedRoutes);

// --- Health Check Endpoints ---
app.get("/health", (c) => c.json({ status: "healthy", timestamp: new Date() }));
app.get("/health/db", async (c) => {
    const dbHealth = await checkDatabaseHealth();
    return c.json(dbHealth, dbHealth.status === "healthy" ? 200 : 503);
});


// ============================================================================
// EXPORTS
// ============================================================================

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);
export const OPTIONS = handle(app);

export type AppType = typeof app;
