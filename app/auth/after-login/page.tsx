"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useAcceptMember } from "@/features/org/api/use-accept-member";
import { useInvite } from "@/features/org/hooks/use-invite";

const AfterLoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUser = useCurrentUser();
  const [showDialog, setShowDialog] = useState(false);

  const { token, invite, isLoading, isError } = useInvite();
  const acceptMember = useAcceptMember(currentUser?.id ?? "");

  // ✅ Redirect if no invite token (normal login)
  // ✅ Show dialog if invite is valid
  useEffect(() => {
    if (isLoading) return;

    if (!isLoading && !token) {
      // router.push("/settings");
      console.log("Invalid :", !isLoading && !token);
      return;
    }

    if (token && invite) {
      console.log("Invite :", token && invite);
      setShowDialog(true);
      return;
    }

    if (token && isError) {
      toast.error("Invalid or expired invite.");
      localStorage.removeItem("inviteToken");
      console.log("Invalid :", token);
      router.push("/settings");
    }
  }, [isLoading, token, invite, router, isError]);

  // ✅ Remove token from URL
  useEffect(() => {
    if (searchParams.get("token")) {
      const params = new URLSearchParams(window.location.search);
      params.delete("token");

      const newUrl =
        window.location.pathname +
        (params.toString() ? `?${params.toString()}` : "");
      window.history.replaceState({}, "", newUrl);
    }
  }, [searchParams]);

  // ✅ Accept invite
  const handleAccept = () => {
    if (!token || !currentUser?.id) {
      router.push("/settings");
      return;
    }

    acceptMember.mutate(
      { token },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Invite accepted!");
          localStorage.removeItem("inviteToken");
          router.push("/settings");
        },
        onError: (err) => {
          toast.error(err.message || "Failed to accept invite.");
          localStorage.removeItem("inviteToken");
          router.push("/settings");
        },
      }
    );
  };

  // ✅ Cancel invite
  const handleCancel = () => {
    localStorage.removeItem("inviteToken");
    toast.info("Invite was ignored.");
    router.push("/settings");
  };

  // ✅ Show loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm text-muted-foreground">Loading invite...</p>
      </div>
    );
  }

  // ✅ Dialog (if token & invite are valid)
  return (
    <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
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
            <strong>{invite?.organizationName}</strong>.
          </p>
          <p>
            Invite sent to: <strong>{invite?.email}</strong>
          </p>
          <p className="text-xs text-muted-foreground">
            Expires at:{" "}
            {invite?.expiresAt
              ? new Date(invite.expiresAt).toLocaleString()
              : "Unknown"}
          </p>
        </div>

        <DialogFooter className="pt-4 gap-4">
          <Button onClick={handleAccept} disabled={acceptMember.isPending}>
            {acceptMember.isPending ? "Accepting..." : "Accept"}
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={acceptMember.isPending}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AfterLoginPage;
