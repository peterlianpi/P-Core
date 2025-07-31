// Type-Safe Hono Client with Enhanced Error Handling
// Provides consistent API interaction patterns and error management
// Integrates with the new unified architecture and RLS-based security

import { hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";

// Enhanced error types for better error handling
export interface APIError {
  error: string;
  code?: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

export class APIClientError extends Error {
  constructor(
    public apiError: APIError,
    public response?: Response
  ) {
    super(apiError.error);
    this.name = "APIClientError";
  }
}

// Client configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== "undefined" ? `${window.location.origin}` : "");

// Create the typed Hono client
export const client = hc<AppType>(API_BASE_URL, {
  // Global request configuration
  init: {
    // Default headers for all requests
    headers: {
      "Content-Type": "application/json",
    },
  },

  // Global fetch wrapper for error handling and logging
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    const startTime = Date.now();

    try {
      // Log request in development
      if (process.env.NODE_ENV === "development") {
        console.log(`🚀 API Request: ${init?.method || "GET"} ${input}`);
      }

      // Make the request
      const response = await fetch(input, init);

      // Log timing
      const duration = Date.now() - startTime;
      if (process.env.NODE_ENV === "development") {
        console.log(`⏱️  API Response: ${response.status} (${duration}ms)`);
      }

      // Handle non-ok responses
      if (!response.ok) {
        await handleAPIError(response);
      }

      return response;
    } catch (error) {
      // Log errors in development
      if (process.env.NODE_ENV === "development") {
        console.error("❌ API Error:", error);
      }

      // Re-throw for upstream handling
      throw error;
    }
  },
});

// Enhanced error handler
async function handleAPIError(response: Response): Promise<never> {
  let errorData: APIError;

  try {
    // Try to parse error response as JSON
    const data = await response.json();
    errorData = {
      error: data.error || "Unknown API error",
      code: data.code,
      statusCode: response.status,
      details: data.details,
    };
  } catch {
    // Fallback if response is not JSON
    errorData = {
      error: response.statusText || "Unknown API error",
      statusCode: response.status,
    };
  }

  throw new APIClientError(errorData, response);
}

// Utility functions for common API operations
export const apiUtils = {
  // Check if error is an API error
  isAPIError(error: unknown): error is APIClientError {
    return error instanceof APIClientError;
  },

  // Extract error message from various error types
  getErrorMessage(error: unknown): string {
    if (error instanceof APIClientError) {
      return error.apiError.error;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return "An unexpected error occurred";
  },

  // Get error code from API error
  getErrorCode(error: unknown): string | undefined {
    if (error instanceof APIClientError) {
      return error.apiError.code;
    }

    return undefined;
  },

  // Check if error is a specific type
  isErrorCode(error: unknown, code: string): boolean {
    return this.getErrorCode(error) === code;
  },

  // Handle network errors
  isNetworkError(error: unknown): boolean {
    return error instanceof TypeError && error.message.includes("fetch");
  },

  // Create organization query parameters
  createOrgQuery(orgId: string, additionalParams?: Record<string, string>) {
    return {
      orgId,
      ...additionalParams,
    };
  },

  // Format response data with error handling
  async safeParseResponse<T>(response: Response): Promise<T> {
    try {
      return await response.json();
    } catch {
      throw new APIClientError(
        {
          error: "Failed to parse response",
          code: "PARSE_ERROR",
          statusCode: response.status,
        },
        response
      );
    }
  },
};

// Type exports for convenience
export type Client = typeof client;
export type { AppType };

// Default export
export default client;

// Re-export types for better developer experience
export type { InferRequestType, InferResponseType } from "hono";
