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
import type { OrganizationRole } from "@/lib/types/database";
import MemberCardPage from "./member-card";
import MemberRemoveList from "./member-remove-list";
import MemberRoleEditor from "./member-role-editor";
import { useCurrentMemberRole } from "@/hooks/use-current-team-role";
import { useOrgData } from "../context/org-context";
import { useSelectedOrg } from "../context/selected-org-context";
import { useData } from "@/providers/data-provider";
import OrganizationInviteList from "./organization-invite-list";
import OrganizationInviteForm from "./organization-user-invite-form";

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
  const { orgId } = useData();

  const { organizations, users } = useOrgData();

  // Map to OrganizationType for display
  const resultOrg = organizations.map((org) => ({
    id: org.organization.id,
    name: org.organization.name,
  }));
  const { selectedOrgId, setSelectedOrgId } = useSelectedOrg();

  useEffect(() => setSelectedOrgId(orgId), [orgId, setSelectedOrgId]);

  const [activeTab, setActiveTab] = useState<
    "members" | "add" | "remove" | "roles" | "invites"
  >("members");
  const [orgMembers, setOrgMembers] = useState<User[]>([]);
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
            <Button
              variant={activeTab === "invites" ? "default" : "outline"}
              onClick={() => setActiveTab("invites")}
            >
              Invites
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
          <>
            <OrganizationInviteForm selectedOrgId={selectedOrgId} />
          </>
        )}

        {activeTab === "remove" && currentUserRole === "OWNER" && (
          <div className="w-full">
            <MemberRemoveList
              members={orgMembers}
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
              />
            </div>
          )}

        {activeTab === "invites" &&
          currentUserRole === "OWNER" &&
          selectedOrgId && <OrganizationInviteList orgId={selectedOrgId} />}
      </div>
    </div>
  );
}
