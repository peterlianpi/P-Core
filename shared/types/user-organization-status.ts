// Shared UserOrganizationStatus enum for use in both client and server code
// Keep this in sync with the Prisma schema
export enum UserOrganizationStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  REMOVED = "REMOVED"
}
