/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { useIsOrgOwner } from "@/hooks/use-current-team-role";
import { useCurrentUser } from "@/hooks/use-current-user";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";
import { useConfirmDialog } from "@/providers/confirm-dialog-provider";
import { useRemoveOrgMember } from "../api/use-remove-member";
import { toast } from "sonner";

type Member = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  organization: {
    id: string;
    role: OrganizationUserRole;
    status: string;
  }[];
};

type Props = {
  members: Member[];
  selectedOrgId: string | null;
};

const MemberRemoveList = ({ members, selectedOrgId }: Props) => {
  const isOwner = useIsOrgOwner(members, selectedOrgId);
  const currentUser = useCurrentUser();
  const removeOrgMember = useRemoveOrgMember({
    adminUserId: currentUser?.id ?? "",
    orgId: selectedOrgId ?? "",
  });
  const confirm = useConfirmDialog();

  // Remove user from org
  const handleRemoveUser = async (userId: string) => {
    if (!selectedOrgId) return;

    const ok = await confirm(`Are you sure you want to remove this user?`);
    if (!ok) return;

    removeOrgMember.mutate(
      { userId },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Member removed successfully!");
        },
        onError: (error: Error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <div className="flex py-4 flex-wrap justify-start md:justify-center items-center gap-4 w-full">
      {members.map((m) => {
        const status =
          m.organization.find((o) => o.id === selectedOrgId)?.status ?? "N/A";
        return (
          <div
            key={m.id}
            className="max-md:w-full w-64 border p-4 rounded-lg flex flex-col gap-4 bg-white shadow-sm  "
          >
            <div className="flex flex-row gap-4 items-center w-full">
              <img
                src={m.image || "/image/profile.png"}
                alt={m.name ?? "No name"}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 overflow-hidden">
                <p className="font-medium truncate">{m.name ?? "(No name)"}</p>
                <p className="text-sm text-gray-600 truncate">{m.email}</p>
              </div>
            </div>
            <Button
              variant={status === "REMOVED" ? "secondary" : "destructive"}
              size="sm"
              onClick={() => handleRemoveUser(m.id)}
              disabled={
                !isOwner || // viewer must be owner
                currentUser?.id === m.id || // don't allow self-remove
                status === "REMOVED"
              }
            >
              {status === "REMOVED" ? "Removed" : "Remove"}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default MemberRemoveList;
