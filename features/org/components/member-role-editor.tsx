/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentMemberRole } from "@/hooks/use-current-team-role";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";

type Member = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  organization: {
    id: string;
    role: OrganizationUserRole;
  }[];
};

type Props = {
  members: Member[];
  selectedOrgId: string;
  onSave: (roleEdits: Record<string, OrganizationUserRole>) => void;
};

const MemberRoleEditor = ({ members, selectedOrgId, onSave }: Props) => {
  const [roleEdits, setRoleEdits] = useState<
    Record<string, OrganizationUserRole>
  >({});
  const currentUserRole = useCurrentMemberRole(members, selectedOrgId);

  useEffect(() => {
    setRoleEdits({});
  }, [selectedOrgId]);

  const handleChange = (userId: string, newRole: OrganizationUserRole) => {
    setRoleEdits((prev) => ({ ...prev, [userId]: newRole }));
  };

  const handleSubmit = () => {
    onSave(roleEdits);
  };

  return (
    <div>
      <div className="flex py-4 flex-wrap justify-start md:justify-center items-center gap-4 w-full">
        {members.map((m) => {
          const currentRole =
            roleEdits[m.id] ??
            m.organization.find((o) => o.id === selectedOrgId)?.role ??
            "";

          // Filter role options: only OWNER can assign OWNER role
          const availableRoles =
            currentUserRole === "OWNER"
              ? ["OWNER", "ADMIN", "MEMBER", "ACCOUNTANT", "OFFICE_STAFF"]
              : ["ADMIN", "MEMBER", "ACCOUNTANT", "OFFICE_STAFF"];

          const isEditable =
            currentUserRole === "OWNER" || currentUserRole === "ADMIN";

          return (
            <div
              key={m.id}
              className="max-md:w-full w-64 border p-4 rounded-lg flex flex-col gap-4 bg-white shadow-sm "
            >
              <div className="flex gap-4 items-center">
                <img
                  src={m.image || "/image/profile.png"}
                  alt={m.name ?? "No name"}
                  className="items-center w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-grow truncate">
                  <p className="text-sm">{m.name ?? "(No name)"}</p>
                  <p className="text-xs">{m.email}</p>
                </div>
              </div>

              <Select
                disabled={!isEditable}
                value={currentRole}
                onValueChange={(val) =>
                  handleChange(m.id, val as OrganizationUserRole)
                }
              >
                <SelectTrigger className="w-24 p-2">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        })}
      </div>{" "}
      <div className="flex gap-4">
        <Button
          onClick={handleSubmit}
          disabled={Object.keys(roleEdits).length === 0}
        >
          Save Role Changes
        </Button>
        <Button variant="secondary" onClick={() => setRoleEdits({})}>
          Reset Changes
        </Button>
      </div>
    </div>
  );
};

export default MemberRoleEditor;
