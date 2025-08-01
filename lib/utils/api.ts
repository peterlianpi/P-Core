// lib/utils/api.ts

/**
 * A utility function to fetch and parse JSON from an API endpoint.
 * Ensures you always get a parsed object, never a raw Response.
 */
export async function apiFetch<T = any>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  // Optionally, handle non-2xx status codes here if you want
  return res.json();
}
