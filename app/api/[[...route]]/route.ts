/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";

import upload from "./upload";
import uploadImage from "./upload-image";
import org from "./org";
import versionInfo from "./version";
import feedback from "./feedback";
import invite from "./invite";
import students from "./students";
import studentCourses from "./studentCourses";
import courses from "./courses";
import lessonBooks from "./lessonBooks";
import purchases from "./purchases";
import courseStatusLogs from "./courseStatusLogs";
import schedules from "./schedules";

// Set runtime to edge for serverless deployment.
// This ensures the app is optimized for edge environments like Vercel.
// export const runtime = "edge";

// Initialize the Hono app with the base path "/api" for all routes.
// This sets a common prefix for all API endpoints, keeping the structure clean.
const app = new Hono().basePath("/api");

// SECURITY ENHANCEMENT: Add global security middleware
// This provides multiple layers of security for all API endpoints

// 1. Security Headers - Protect against common web vulnerabilities
app.use('*', secureHeaders({
  // Prevent pages from being embedded in frames (clickjacking protection)
  xFrameOptions: 'DENY',
  // Prevent MIME type sniffing attacks
  xContentTypeOptions: 'nosniff',
  // Enable XSS filtering in browsers
  xXssProtection: '1; mode=block',
  // Only load resources over HTTPS (in production)
  strictTransportSecurity: 'max-age=31536000; includeSubDomains',
  // Control which features can be used (privacy protection)
  permissionsPolicy: 'camera=(), microphone=(), geolocation=(), payment=()',
}));

// 2. CORS Configuration - Control cross-origin requests
app.use('*', cors({
  origin: (origin) => {
    // Allow same-origin requests
    if (!origin) return true;
    
    // Allow localhost for development
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return true;
    }
    
    // Allow your production domains
    const allowedOrigins = [
      'https://your-domain.com',
      'https://www.your-domain.com'
    ];
    
    return allowedOrigins.includes(origin);
  },
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true, // Allow cookies for authentication
}));

// 3. Request Logging - Security audit trail
app.use('*', async (c, next) => {
  const start = Date.now();
  const method = c.req.method;
  const url = c.req.url;
  const userAgent = c.req.header('user-agent') || 'unknown';
  
  // Log request for security monitoring
  console.log(`[${new Date().toISOString()}] ${method} ${url} - ${userAgent}`);
  
  await next();
  
  const end = Date.now();
  const status = c.res.status;
  
  // Log response with timing for performance monitoring
  console.log(`[${new Date().toISOString()}] ${method} ${url} - ${status} (${end - start}ms)`);
});

// Define routes for each API endpoint and associate them with respective handlers
// Each route points to the appropriate module handler for that resource.
const routes = app

  .route("/upload", upload)
  .route("/upload-image", uploadImage)
  .route("/org", org)
  .route("/versionInfo", versionInfo)
  .route("/feedback", feedback)
  .route("/invite", invite)
  .route("/students", students)
  .route("/studentCourses", studentCourses)
  .route("/courses", courses)
  .route("/lessonBooks", lessonBooks)
  .route("/purchases", purchases)
  .route("/courseStatusLogs", courseStatusLogs)
  .route("/schedules", schedules); // This handles requests to /api/*

// Define HTTP methods for each route handler.
// The handle function from Hono processes requests based on their methods (GET, POST, PATCH, DELETE).
// These exports allow your app to be deployed to an edge platform like Vercel.
export const GET = handle(app); // Handles GET requests
export const POST = handle(app); // Handles POST requests
export const PATCH = handle(app); // Handles PATCH requests
export const DELETE = handle(app); // Handles DELETE requests

// Export the type of the app for type safety across the application.
// This helps in maintaining type consistency when interacting with the routes elsewhere in the application.
export type AppType = typeof routes;
