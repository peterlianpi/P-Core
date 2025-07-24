// components/invite-card.tsx
"use client";

import { Button } from "@/components/ui/button";
import type { OrganizationRole } from "@/lib/types/database";
import { capitalizeFormat } from "../../../helpers/custom-function";

type Invite = {
  email: string;
  role: OrganizationRole | null;
  accepted: boolean;
};

type Props = {
  invite: Invite;
  onResend?: (invite: Invite) => void;
  onRevoke?: (email: string) => void;
};

export default function InviteCard({ invite, onResend, onRevoke }: Props) {
  return (
    <div className="flex justify-start items-center shadow-sm hover:shadow-md transition-shadow py-2 w-full">
      <div className="flex-grow">
        <span className="text-sm">{invite.email}</span>
        <div className="sm:flex gap-2">
          <p className="text-sm text-muted-foreground capitalize">
            Role: {invite.role ? capitalizeFormat(invite.role) : "Unknown"}
          </p>
          <p className="text-sm text-muted-foreground">
            Status: {invite.accepted ? "Accepted" : "Pending"}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 pl-2">
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
