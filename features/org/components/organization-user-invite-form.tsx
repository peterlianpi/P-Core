"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { OrganizationUserRole } from "@prisma/client";
import { useInviteMember } from "../api/use-invite-member";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "sonner";

type Props = {
  selectedOrgId: string;
};

export default function OrganizationInviteForm({ selectedOrgId }: Props) {
  const [addEmail, setAddEmail] = useState("");
  const [addRole, setAddRole] = useState("");
  const currentUser = useCurrentUser();
  const createInviteMember = useInviteMember(currentUser?.id ?? "");

  // Add user invite
  const handleAddUser = async () => {
    if (!addEmail || !selectedOrgId) return alert("Fill email and select org");

    const values = {
      email: addEmail,
      organizationId: selectedOrgId!,
      role: addRole as OrganizationUserRole,
    };

    createInviteMember.mutate(values, {
      onSuccess: () => {
        toast.success(`Invite mail sent to ${values.email} successfully!`);
        setAddEmail("");
        setAddRole("");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to send invite");
      },
    });
  };

  return (
    <div className="max-w-md space-y-4 py-4">
      <div>
        <Label htmlFor="addEmail">User Email to Invite</Label>
        <Input
          id="addEmail"
          type="email"
          placeholder="user@example.com"
          value={addEmail}
          onChange={(e) => setAddEmail(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="addRole">Select Role</Label>
        <Select value={addRole} onValueChange={(val) => setAddRole(val)}>
          <SelectTrigger id="addRole" className="w-full">
            <SelectValue placeholder="Choose a role" />
          </SelectTrigger>
          <SelectContent>
            {[
              // "OWNER",
              "ADMIN",
              "MEMBER",
              "ACCOUNTANT",
              "OFFICE_STAFF",
            ].map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleAddUser} disabled={!addEmail || !addRole}>
        Send Invite
      </Button>
    </div>
  );
}
