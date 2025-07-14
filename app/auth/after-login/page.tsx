"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useAcceptMember } from "@/features/org/api/use-accept-member";
import { useInvite } from "@/features/org/hooks/use-invite";
import { InviteDialog } from "@/features/org/components/invite-dialog";

const AfterLoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUser = useCurrentUser();
  const [showDialog, setShowDialog] = useState(false);

  const { token, invite, isLoading, isError, isHydrated } = useInvite();
  const acceptMember = useAcceptMember(currentUser?.id ?? "");

  // ✅ Step 1: Handle routing and dialog visibility
  useEffect(() => {
    if (!isHydrated || isLoading) return;

    if (token && invite) {
      setShowDialog(true);
      return;
    }

    if (token && isError) {
      toast.error("Invalid or expired invite.");
      localStorage.removeItem("inviteToken");
      router.push("/settings");
      return;
    }

    // ✅ Only redirect when everything is loaded and no valid invite
    if (!token && !invite && !isError) {
      router.push("/settings");
    }
  }, [token, invite, isError, isLoading, isHydrated, router]);

  // ✅ Step 2: Clean token from URL after reading it
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

  // ✅ Step 3: Accept invite
  const handleAccept = () => {
    if (!token && !currentUser?.id) {
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

  // ✅ Step 5: Show loading screen while fetching
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // ✅ Step 6: Show Invite Dialog if valid
  return (
    <>
      <InviteDialog
        open={showDialog}
        onAccept={handleAccept}
        isAccepting={acceptMember.isPending}
        invite={invite}
      />
    </>
  );
};

export default AfterLoginPage;
