/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { useIsOrgOwner } from "@/hooks/use-current-team-role";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";

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
  onRemove: (id: string) => void;
  selectedOrgId: string | null;
};

const MemberRemoveList = ({ members, onRemove, selectedOrgId }: Props) => {
  const isOwner = useIsOrgOwner(members, selectedOrgId);

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
              onClick={() => onRemove(m.id)}
              disabled={!isOwner || status === "REMOVED"}
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
