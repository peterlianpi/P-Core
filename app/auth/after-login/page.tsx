"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAcceptMember } from "@/features/org/api/use-accept-member";
import { useGetInviteDetailsByToken } from "@/features/org/api/invite-client";
import { useCurrentUser } from "@/hooks/use-current-user";

const AfterLoginPage = () => {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [showDialog, setShowDialog] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { data: invite, isLoading } = useGetInviteDetailsByToken(token ?? "");
  const acceptMember = useAcceptMember(currentUser?.id ?? "");

  useEffect(() => {
    const storedToken = localStorage.getItem("inviteToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (invite && !isLoading) {
      setShowDialog(true);
    }
  }, [invite, isLoading]);

  const handleAccept = () => {
    if (!token || !currentUser?.id) return;

    acceptMember.mutate(
      { token },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Invite accepted successfully!");
          localStorage.removeItem("inviteToken");
          setShowDialog(false);
          router.push("/settings");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to accept invite.");
          localStorage.removeItem("inviteToken");
          setShowDialog(false);
          router.push("/settings");
        },
      }
    );
  };

  const handleCancel = () => {
    localStorage.removeItem("inviteToken");
    toast.info("Invite was ignored.");
    setShowDialog(false);
    router.push("/settings");
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
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
