// Hono Context Extensions for P-Core
import type { Context } from "hono";
import type { User } from "@prisma/client";

// Extend Hono Context with custom variables
export interface HonoContext extends Context {
  get(key: "user"): User | undefined;
  get(key: "requestId"): string | undefined;
  get(key: string): unknown;
  set(key: "user", value: User): void;
  set(key: "requestId", value: string): void;
  set(key: string, value: unknown): void;
}

// Type-safe context getter
export function getUser(c: Context): User | undefined {
  return c.get("user") as User | undefined;
}

export function getRequestId(c: Context): string | undefined {
  return c.get("requestId") as string | undefined;
}

export function setUser(c: Context, user: User): void {
  c.set("user", user);
}

export function setRequestId(c: Context, requestId: string): void {
  c.set("requestId", requestId);
}
