/**
 * Hono Client - Type-safe API client for frontend
 * Generated from Hono API routes with full type safety
 */

import { hc } from "hono/client";
import notifications from "@/app/api/[[...route]]/notifications";

const client = hc<typeof notifications>("/api");

export { client };
export default client;
