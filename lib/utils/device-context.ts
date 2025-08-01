// Utility to extract device type, OS, browser, and IP address from a server request (Hono/Next.js API route)
// Requires: npm install ua-parser-js
import { UAParser } from "ua-parser-js";
import type { DeviceType } from "@/lib/types/activity";

export interface DeviceContext {
  deviceType: DeviceType;
  ip: string;
  userAgent: string;
  os?: string;
  browser?: string;
}

/**
 * Extract device context (type, IP, user agent, OS, browser) from a server request.
 * @param req - HonoRequest, NextRequest, or standard Request object
 * @returns DeviceContext with fallbacks for unknown values
 */
export function getDeviceContext(
  req: Request | { headers: { get: (key: string) => string | null }, socket?: { remoteAddress?: string } }
): DeviceContext {
  // User-Agent
  const userAgent = req.headers.get("user-agent") || "Unknown device";
  const parser = new UAParser(userAgent);
  let deviceType = parser.getDevice().type as DeviceType | undefined;
  const allowedDeviceTypes: DeviceType[] = ["desktop", "mobile", "tablet", "bot", "unknown"];
  if (!deviceType || !allowedDeviceTypes.includes(deviceType)) {
    deviceType = "unknown";
  }

  // OS and browser for more context
  const os = parser.getOS().name || "Unknown OS";
  const browser = parser.getBrowser().name || "Unknown Browser";

  // IP address
  let ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    // @ts-ignore: Node.js only
    (req.socket?.remoteAddress as string | undefined) ||
    "Unknown IP";

  // Debug log
  console.log("DeviceContext Debug:", { userAgent, deviceType, os, browser, ip });

  return {
    deviceType,
    ip,
    userAgent,
    os,
    browser,
  };
}
