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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";
import MemberCardPage from "./member-card";
import MemberRemoveList from "./member-remove-list";
import MemberRoleEditor from "./member-role-editor";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useData } from "@/providers/data-provider";
import { useInviteMember } from "../api/use-invite-member";
import { toast } from "sonner";

type User = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  organization: {
    id: string;
    role: OrganizationUserRole;
  }[];
};

type Organization = {
  id: string;
  name: string;
};

export default function OrganizationUserManagementPage({
  organizations,
  users,
}: {
  organizations: Organization[];
  users: User[];
}) {
  // Get current user (assumes it's the first user in the users array)
  const currentUser = useCurrentUser();
  const createInviteMember = useInviteMember(currentUser?.id ?? "");

  const { orgId } = useData();
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(orgId);
  const [activeTab, setActiveTab] = useState<
    "members" | "add" | "remove" | "roles"
  >("members");
  const [orgMembers, setOrgMembers] = useState<User[]>([]);
  const [addEmail, setAddEmail] = useState("");
  const [addRole, setAddRole] = useState("");
  const [roleEdits, setRoleEdits] = useState<Record<string, string>>({});
  // Filter users in selected org
  useEffect(() => {
    if (!selectedOrgId) {
      setOrgMembers([]);
      return;
    }
    const filtered = users.filter((u) =>
      u.organization.some((org) => org.id === selectedOrgId)
    );
    setOrgMembers(filtered);
    setRoleEdits({});
  }, [selectedOrgId, users]);

  const currentUserRole = users
    .find((u) => u.id === currentUser?.id)
    ?.organization.find((org) => org.id === selectedOrgId)?.role;

  // Add user invite
  const handleAddUser = async () => {
    if (!addEmail || !selectedOrgId) return alert("Fill email and select org");

    const values = {
      email: addEmail,
      organizationId: selectedOrgId!,
      role: addRole as OrganizationUserRole,
    };

    createInviteMember.mutate(values, {
      onSuccess: (data) => {
        toast.success(
          data.message || `Invite mail sent to ${values.email} successfully!`
        );
        setAddEmail("");
        setActiveTab("members");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to send invite");
      },
    });
  };

  // Remove user from org
  const handleRemoveUser = async (userId: string) => {
    if (!selectedOrgId) return;
    if (!confirm("Are you sure you want to remove this user?")) return;
    const res = await fetch(
      `/api/organizations/${selectedOrgId}/members/${userId}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      alert("User removed");
    } else alert("Failed to remove user");
  };

  // Save edited roles
  const handleSaveRoles = async () => {
    if (!selectedOrgId) return;
    const updates = Object.entries(roleEdits).map(([userId, role]) =>
      fetch(`/api/organizations/${selectedOrgId}/members/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      })
    );
    await Promise.all(updates);
    alert("Roles updated");
  };

  return (
    <div className="p-4 w-full">
      {/* Org Selector */}
      <Select onValueChange={setSelectedOrgId} value={selectedOrgId ?? ""}>
        <SelectTrigger className="w-full sm:w-64">
          <SelectValue placeholder="Select Organization" />
        </SelectTrigger>
        <SelectContent>
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Tabs */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button
          variant={activeTab === "members" ? "default" : "outline"}
          onClick={() => setActiveTab("members")}
        >
          Members
        </Button>

        <Button
          variant={activeTab === "add" ? "default" : "outline"}
          onClick={() => setActiveTab("add")}
        >
          Add
        </Button>

        {currentUserRole === "OWNER" && (
          <>
            <Button
              variant={activeTab === "remove" ? "default" : "outline"}
              onClick={() => setActiveTab("remove")}
            >
              Remove
            </Button>

            <Button
              variant={activeTab === "roles" ? "default" : "outline"}
              onClick={() => setActiveTab("roles")}
            >
              Roles
            </Button>
          </>
        )}
      </div>

      {/* Tab Content */}
      <div className="mt-6 w-full h-full">
        {activeTab === "members" && (
          <div className="flex py-4 flex-wrap   justify-start md:justify-center items-center gap-4">
            {orgMembers.map((m) => {
              const role =
                m.organization.find((o) => o.id === selectedOrgId)?.role ??
                "N/A";
              return (
                <MemberCardPage
                  key={m.id}
                  id={m.id}
                  name={m.name}
                  email={m.email}
                  image={m.image}
                  role={role}
                />
              );
            })}
          </div>
        )}

        {activeTab === "add" && (
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
                    "OWNER",
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
        )}

        {activeTab === "remove" && currentUserRole === "OWNER" && (
          <div className="w-full">
            <MemberRemoveList
              members={orgMembers}
              onRemove={handleRemoveUser}
              selectedOrgId={selectedOrgId}
            />
          </div>
        )}

        {activeTab === "roles" &&
          selectedOrgId &&
          currentUserRole === "OWNER" && (
            <div className="w-full">
              <MemberRoleEditor
                members={orgMembers}
                selectedOrgId={selectedOrgId}
                onSave={handleSaveRoles}
              />
            </div>
          )}
      </div>
    </div>
  );
}
