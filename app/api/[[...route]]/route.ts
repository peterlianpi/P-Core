/* eslint-disable @typescript-eslint/no-unused-vars */
import { Hono } from "hono";
import { handle } from "hono/vercel";

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

// Set runtime to edge for serverless deployment.
// This ensures the app is optimized for edge environments like Vercel.
// export const runtime = "edge";

// Initialize the Hono app with the base path "/api" for all routes.
// This sets a common prefix for all API endpoints, keeping the structure clean.
const app = new Hono().basePath("/api");

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
  .route("/courseStatusLogs", courseStatusLogs); // This handles requests to /api/*

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
