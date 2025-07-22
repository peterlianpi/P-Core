// components/invite/invite-details.tsx
"use client";

import { Button } from "@/components/ui/button";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";
import { useRouter } from "next/navigation";

type Props = {
  invite: {
    email: string;
    organizationName: string;
    expiresAt: string;
    accepted: boolean;
    role: OrganizationUserRole | null;
  };
  isLoggedIn: boolean;
  onAccept?: () => void;
  onCancel?: () => void;
  isPending?: boolean;
  token: string;
};

export const InviteDetails = ({
  invite,
  isLoggedIn,
  onAccept,
  onCancel,
  isPending,
  token,
}: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <h1 className="text-2xl font-semibold mb-2">You&apos;re Invited!</h1>

      <p className="text-muted-foreground mb-4 max-w-md">
        You&apos;ve been invited to join{" "}
        <strong>{invite?.organizationName}</strong>.
      </p>

      <p className="text-sm text-muted-foreground mb-6">
        Invite sent to: <strong>{invite?.email}</strong>
        <br />
        Expires at:{" "}
        <span className="text-xs">
          {invite?.expiresAt
            ? new Date(invite.expiresAt).toLocaleString()
            : "Unknown expiration"}
        </span>
      </p>

      {isLoggedIn ? (
        <div className="flex gap-4">
          <Button onClick={onAccept} disabled={isPending}>
            {isPending ? "Accepting..." : "Accept"}
          </Button>
          <Button variant="outline" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Button
            onClick={() =>
              router.push(
                `/auth/login?callbackUrl=/auth/after-login?token=${token}`
              )
            }
          >
            Log In
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              router.push(
                `/auth/register?callbackUrl=/auth/after-login?token=${token}`
              )
            }
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
};
