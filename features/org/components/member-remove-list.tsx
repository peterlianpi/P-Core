/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { useCurrentMemberRole } from "@/hooks/use-current-team-role";

type Role = "OWNER" | "ADMIN" | "MEMBER" | "ACCOUNTANT" | "OFFICE_STAFF";

type Member = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  organization: {
    id: string;
    role: Role | null;
  }[];
};

type Props = {
  members: Member[];
  onRemove: (id: string) => void;
  selectedOrgId: string | null;
};

const MemberRemoveList = ({ members, onRemove, selectedOrgId }: Props) => {
  const currentUserRole = useCurrentMemberRole(members, selectedOrgId);

  return (
    <div className="flex py-4 flex-wrap justify-start md:justify-center items-center gap-4 w-full">
      {members.map((m) => (
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
            variant="destructive"
            size="sm"
            onClick={() => onRemove(m.id)}
            disabled={currentUserRole !== "OWNER"}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};

export default MemberRemoveList;
