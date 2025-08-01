// Device type for activity tracking
export type DeviceType = "desktop" | "mobile" | "tablet" | "bot" | "unknown";

// Additional context for activity events
export interface ActivityContext {
  deviceType?: DeviceType;
  ip?: string;
  userAgent?: string;
  [key: string]: any; // extensible for future
}
