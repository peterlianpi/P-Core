import { Context } from "hono";

/**
 * Middleware for API key authentication
 */
export const authenticate = async (c: Context, next: () => Promise<void>) => {
  const publicKey = c.req.header("x-api-key");
  const apiKey = process.env.NEXT_PRIVATE_API_KEY;

  if (!publicKey || publicKey !== apiKey) {
    return c.json({ error: "Unauthorized: Invalid API Key" }, 401);
  }

  await next();
};
