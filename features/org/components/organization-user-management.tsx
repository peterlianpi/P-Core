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
import { useInviteMember } from "../api/use-invite-member";
import { toast } from "sonner";
import { useUpdateOrgRoles } from "../api/use-change-role";
import { useCurrentMemberRole } from "@/hooks/use-current-team-role";
import { useRemoveOrgMember } from "../api/use-remove-member";
import { useOrgData } from "@/context/org-context";
import { useSelectedOrg } from "@/context/selected-org-context";
import { useData } from "@/providers/data-provider";

type User = {
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

export default function OrganizationUserManagementPage() {
  // Get current user (assumes it's the first user in the users array)
  const currentUser = useCurrentUser();
  const { orgId } = useData();
  const createInviteMember = useInviteMember(currentUser?.id ?? "");

  const { organizations, users } = useOrgData();

  // Map to OrganizationType for display
  const resultOrg = organizations.map((org) => ({
    id: org.organization.id,
    name: org.organization.name,
  }));
  const { selectedOrgId, setSelectedOrgId } = useSelectedOrg();

  useEffect(() => setSelectedOrgId(orgId), []);

  const changeMemberRole = useUpdateOrgRoles({
    adminUserId: currentUser?.id ?? "",
    orgId: selectedOrgId ?? "",
  });
  const removeOrgMember = useRemoveOrgMember({
    adminUserId: currentUser?.id ?? "",
    orgId: selectedOrgId ?? "",
  });
  const [activeTab, setActiveTab] = useState<
    "members" | "add" | "remove" | "roles"
  >("members");
  const [orgMembers, setOrgMembers] = useState<User[]>([]);
  const [addEmail, setAddEmail] = useState("");
  const [addRole, setAddRole] = useState("");
  const currentUserRole = useCurrentMemberRole(users ?? [], selectedOrgId);

  // Filter users in selected org
  useEffect(() => {
    if (!selectedOrgId) {
      setOrgMembers([]);
      return;
    }
    const filtered = users.filter((u) =>
      u.organization.some((org) => {
        const inOrg = org.id === selectedOrgId;
        if (!inOrg) return false;
        return currentUserRole === "OWNER" ? true : org.status === "ACTIVE";
      })
    );

    setOrgMembers(filtered);
  }, [currentUserRole, selectedOrgId, users]);

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
    console.log("org id 222 : ", selectedOrgId);
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

  // Save edited roles
  const handleSaveRoles = (roleEdits: Record<string, OrganizationUserRole>) => {
    if (!selectedOrgId || !currentUser?.id) return;

    changeMemberRole.mutate(
      { updates: roleEdits },
      {
        onSuccess: (data) => {
          toast.success(`${data.updated} roles updated successfully!`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <div className="p-4 w-full">
      {/* Org Selector */}
      <Select onValueChange={setSelectedOrgId} value={selectedOrgId ?? ""}>
        <SelectTrigger className="w-full sm:w-64">
          <SelectValue placeholder="Select Organization" />
        </SelectTrigger>
        <SelectContent>
          {resultOrg.map((org) => (
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

        {currentUserRole === "OWNER" && (
          <>
            <Button
              variant={activeTab === "add" ? "default" : "outline"}
              onClick={() => setActiveTab("add")}
            >
              Add
            </Button>
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
          <div className="flex py-4 flex-wrap justify-start md:justify-center items-center gap-4">
            {orgMembers.map((m) => {
              const role =
                m.organization.find((o) => o.id === selectedOrgId)?.role ??
                "N/A";
              const status =
                m.organization.find((o) => o.id === selectedOrgId)?.status ??
                "N/A";
              return (
                <MemberCardPage
                  key={m.id}
                  id={m.id}
                  name={m.name}
                  email={m.email}
                  image={m.image}
                  role={role}
                  status={status}
                />
              );
            })}
          </div>
        )}

        {activeTab === "add" && currentUserRole === "OWNER" && (
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
