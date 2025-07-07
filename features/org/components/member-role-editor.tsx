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

type Role = "OWNER" | "ADMIN" | "MEMBER" | "ACCOUNTANT" | "OFFICE_STAFF";

type Member = {
  id: string;
  name: string | null;
  email: string;
  organization: {
    id: string;
    role: Role | null;
  }[];
};

type Props = {
  members: Member[];
  selectedOrgId: string;
  onSave: (roleEdits: Record<string, Role>) => void;
};

const MemberRoleEditor = ({ members, selectedOrgId, onSave }: Props) => {
  const [roleEdits, setRoleEdits] = useState<Record<string, Role>>({});

  useEffect(() => {
    setRoleEdits({});
  }, [selectedOrgId]);

  const handleChange = (userId: string, newRole: Role) => {
    setRoleEdits((prev) => ({ ...prev, [userId]: newRole }));
  };

  const handleSubmit = () => {
    onSave(roleEdits);
  };

  return (
    <div className="space-y-4 py-4 w-full">
      {members.map((m) => {
        const currentRole =
          roleEdits[m.id] ??
          m.organization.find((o) => o.id === selectedOrgId)?.role ??
          "";

        // Filter role options: only OWNER can assign OWNER role
        const availableRoles =
          currentRole === "OWNER"
            ? ["OWNER", "ADMIN", "MEMBER", "ACCOUNTANT", "OFFICE_STAFF"]
            : ["ADMIN", "MEMBER", "ACCOUNTANT", "OFFICE_STAFF"];

        const isEditable = currentRole === "OWNER" || currentRole === "ADMIN";

        return (
          <div
            key={m.id}
            className="flex rounded-lg p-2 border items-center space-x-4"
          >
            <div className="flex-grow">
              {m.name ?? "(No name)"} - {m.email}
            </div>

            <Select
              disabled={!isEditable}
              value={currentRole}
              onValueChange={(val) => handleChange(m.id, val as Role)}
            >
              <SelectTrigger className="w-48">
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
      <Button onClick={handleSubmit}>Save Role Changes</Button>
    </div>
  );
};

export default MemberRoleEditor;
