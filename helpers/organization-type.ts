import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";

type Updated = {
  name: string;
};

type OrganizationResult = { success: Updated } | { error: string };

// ✅ Type guard to narrow the result type
export function isError(
  result: OrganizationResult
): result is { error: string } {
  return "error" in result;
}


// Invite data return
export type InviteSuccessResponse = {
  message: string;
  invite: {
    id: string;
    createdAt: string;
    email: string;
    role: OrganizationUserRole | null;
    organizationId: string;
    invitedBy: string;
    token: string;
    accepted: boolean;
    expiresAt: string;
  };
};

// Accept data return
export interface InviteAcceptSuccessResponse {
  message: string;            // e.g. "Invite accepted successfully"
  organizationId: string;     // ID of the organization user joined
}