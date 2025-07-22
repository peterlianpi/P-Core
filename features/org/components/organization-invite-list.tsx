// components/organization-invite-list.tsx
"use client";

import { toast } from "sonner";
import { useGetInvitesByOrgId } from "../api/use-get-invites-by-org-id";
import { useResendInviteMember } from "../api/use-resend-invite-member";
// import { useRevokeInvite } from "../api/use-revoke-invite"; // Optional

import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";
import InviteCard from "./invite-card";
import { useRevokeInvite } from "../api/use-revoke-invite";
import { useConfirmDialog } from "@/providers/confirm-dialog-provider";

type Props = {
  orgId: string;
};

export default function OrganizationInviteList({ orgId }: Props) {
  const { data: invites, isLoading } = useGetInvitesByOrgId(orgId);
  const resendInvite = useResendInviteMember(orgId);
  const revokeInvite = useRevokeInvite(orgId); // If implemented
  const confirm = useConfirmDialog();

  const handleResend = (invite: {
    email: string;
    role: OrganizationUserRole | null;
  }) => {
    resendInvite.mutate(
      {
        email: invite.email,
        organizationId: orgId,
        role: invite.role ?? "MEMBER",
        actionType: "resend",
      },
      {
        onSuccess: () => {
          toast.success(`Invite resent to ${invite.email}`);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to resend invite");
        },
      }
    );
  };

  const handleRevoke = async (email: string) => {
    const ok = await confirm(
      `Are you sure you want to revoke ${email}'s invite?`
    );
    if (!ok) return;

    revokeInvite.mutate(
      { email, organizationId: orgId },
      {
        onSuccess: () => {
          toast.success(`Invite for ${email} revoked successfully.`);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to revoke invite");
        },
      }
    );
    toast(`Revoke not yet implemented for ${email}`);
  };

  if (isLoading) return <p>Loading invites...</p>;

  if (!invites || invites.length === 0) {
    return <p>No invites for this organization.</p>;
  }

  const pendingInvites = invites.filter((i) => !i.accepted);
  const acceptedInvites = invites.filter((i) => i.accepted);

  return (
    <div className="space-y-6 mt-4 w-full">
      {/* Pending Invites */}
      {pendingInvites.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Pending Invites</h3>
          {pendingInvites.map((invite) => (
            <>
              <InviteCard
                key={invite.email}
                invite={invite}
                onResend={handleResend}
                onRevoke={handleRevoke}
              />
              <hr className="mt-2 border-t border-gray-500" />
            </>
          ))}
        </div>
      )}

      {/* Accepted Invites */}
      {acceptedInvites.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Accepted Invites</h3>
          <div className="space-y-2">
            {acceptedInvites.map((invite) => (
              <InviteCard key={invite.email} invite={invite} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
