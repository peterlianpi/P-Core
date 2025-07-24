// app/(public)/invite/page.tsx
"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useAcceptMember } from "@/features/org/api/use-accept-member";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useInvite } from "@/features/org/hooks/use-invite";
import { InviteDetails } from "@/features/org/components/invite-details";

const AcceptInvitePage = () => {
  const router = useRouter();
  const { token, invite, isLoading } = useInvite();
  const currentUser = useCurrentUser();
  const acceptMember = useAcceptMember(currentUser?.id ?? "");

  const handleAccept = () => {
    if (!token || !currentUser?.id) {
      toast.error("Please log in to accept this invite.");
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

  const handleCancel = () => {
    localStorage.removeItem("inviteToken");
    toast.info("Invite was ignored.");
    router.push("/settings");
  };

  if (isLoading || !invite) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-sm text-muted-foreground">Validating invite...</p>
      </div>
    );
  }

  return (
    <InviteDetails
      invite={invite as any}
      isLoggedIn={!!currentUser}
      onAccept={handleAccept}
      onCancel={handleCancel}
      isPending={acceptMember.isPending}
      token={token}
    />
  );
};

export default AcceptInvitePage;
