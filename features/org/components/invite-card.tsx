// components/invite-card.tsx
"use client";

import { Button } from "@/components/ui/button";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";

type Invite = {
  email: string;
  role: OrganizationUserRole | null;
  accepted: boolean;
};

type Props = {
  invite: Invite;
  onResend?: (invite: Invite) => void;
  onRevoke?: (email: string) => void;
};

export default function InviteCard({ invite, onResend, onRevoke }: Props) {
  return (
    <div className="flex justify-between items-center border p-2 rounded">
      <div>
        <p>{invite.email}</p>
        <p className="text-sm text-muted-foreground">
          Role: {invite.role ?? "Unknown"} | Status:{" "}
          {invite.accepted ? "Accepted" : "Pending"}
        </p>
      </div>
      <div className="space-x-2">
        {!invite.accepted && (
          <>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onResend?.(invite)}
            >
              Resend
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onRevoke?.(invite.email)}
            >
              Revoke
            </Button>
          </>
        )}
        {invite.accepted && (
          <span className="text-sm text-green-600">✔ Accepted</span>
        )}
      </div>
    </div>
  );
}
