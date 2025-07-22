"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";

type InviteDialogProps = {
  open: boolean;
  onAccept: () => void;
  isAccepting: boolean;
  invite:
    | {
        organizationName: string;
        email: string;
        expiresAt: string;
        role: OrganizationUserRole | null;
      }
    | undefined;
};

export const InviteDialog = ({
  open,
  onAccept,
  isAccepting,
  invite,
}: InviteDialogProps) => {
  const router = useRouter();

  const handleClose = () => {
    localStorage.removeItem("inviteToken");
    toast.info("Invite ignored.");
    router.push("/settings");
  };

  if (!invite) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Accept Organization Invite</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <p>
            You’ve been invited to join{" "}
            <strong>{invite.organizationName}</strong>.
          </p>
          <p>
            Invite sent to: <strong>{invite.email}</strong>
          </p>
          <p>
            Role: <strong>{invite.role}</strong>
          </p>
          <p className="text-xs text-muted-foreground">
            Expires at:{" "}
            {invite.expiresAt
              ? new Date(invite.expiresAt).toLocaleString()
              : "Unknown"}
          </p>
        </div>

        <DialogFooter className="pt-4 gap-4">
          <Button onClick={onAccept} disabled={isAccepting}>
            {isAccepting ? "Accepting..." : "Accept"}
          </Button>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isAccepting}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
