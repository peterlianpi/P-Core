// Shared LogType enum for use in both client and server code
// Keep this in sync with the Prisma schema
export enum LogType {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}
