// components/invite-card.tsx
"use client";

import { Button } from "@/components/ui/button";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";
import { capitalizeFormat } from "../../../helpers/custom-function";

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
    <div className="flex justify-between items-center border  rounded-lg shadow-sm hover:shadow-md transition-shadow  px-4 py-2">
      <div className="flex-grow">
        <p>{invite.email}</p>
        <div className="sm:flex gap-2">
          {" "}
          <p className="text-sm text-muted-foreground capitalize">
            Role: {invite.role ? capitalizeFormat(invite.role) : "Unknown"}
          </p>
          <p className="text-sm text-muted-foreground">
            Status: {invite.accepted ? "Accepted" : "Pending"}
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
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
