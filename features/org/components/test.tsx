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

type User = { id: string; name: string | null; email: string; role: string };
type Organization = { id: string; name: string };

export default function OrgUserManager({
  organizations,
}: {
  organizations: Organization[];
}) {
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<
    "members" | "add" | "remove" | "roles"
  >("members");
  const [addEmail, setAddEmail] = useState("");
  const [roleEdits, setRoleEdits] = useState<Record<string, string>>({}); // userId => new role

  // Fetch members when org changes or after changes
  const fetchMembers = async () => {
    if (!selectedOrgId) return;
    const res = await fetch(`/api/organizations/${selectedOrgId}/members`);
    const data = await res.json();
    setMembers(data.members);
    setRoleEdits({});
  };

  useEffect(() => {
    fetchMembers();
  }, [selectedOrgId]);

  // Add user by email (invite)
  const handleAddUser = async () => {
    if (!addEmail || !selectedOrgId) return alert("Fill email and select org");
    const res = await fetch("/api/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: addEmail, organizationId: selectedOrgId }),
    });
    if (res.ok) {
      alert("Invite sent!");
      setAddEmail("");
      setActiveTab("members");
      fetchMembers();
    } else alert("Failed to send invite");
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
      fetchMembers();
    } else alert("Failed to remove user");
  };

  // Save role edits
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
    fetchMembers();
  };

  return (
    <div>
      {/* Organization Selector */}
      <Select
        onValueChange={setSelectedOrgId}
        value={selectedOrgId ?? ""}
        className="w-64"
      >
        <SelectTrigger>
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
      <div className="mt-4 flex space-x-4">
        {["members", "add", "remove", "roles"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="mt-6">
        {activeTab === "members" && (
          <ul className="space-y-2">
            {members.map((m) => (
              <li
                key={m.id}
                className="border p-2 rounded flex justify-between"
              >
                <span>
                  {m.name ?? "(No name)"} — {m.email} — Role: {m.role}
                </span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "add" && (
          <div className="max-w-md space-y-4">
            <Label htmlFor="addEmail">User Email to Invite</Label>
            <Input
              id="addEmail"
              type="email"
              placeholder="user@example.com"
              value={addEmail}
              onChange={(e) => setAddEmail(e.target.value)}
            />
            <Button onClick={handleAddUser} disabled={!addEmail}>
              Send Invite
            </Button>
          </div>
        )}

        {activeTab === "remove" && (
          <ul className="space-y-2">
            {members.map((m) => (
              <li
                key={m.id}
                className="border p-2 rounded flex justify-between items-center"
              >
                <span>
                  {m.name ?? "(No name)"} — {m.email}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveUser(m.id)}
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "roles" && (
          <div className="space-y-4 max-w-lg">
            {members.map((m) => (
              <div key={m.id} className="flex items-center space-x-4">
                <div className="flex-grow">
                  {m.name ?? "(No name)"} — {m.email}
                </div>
                <Select
                  value={roleEdits[m.id] ?? m.role}
                  onValueChange={(val) =>
                    setRoleEdits((prev) => ({ ...prev, [m.id]: val }))
                  }
                  className="w-48"
                >
                  <SelectTrigger>
                    <SelectValue />
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
            ))}
            <Button onClick={handleSaveRoles}>Save Role Changes</Button>
          </div>
        )}
      </div>
    </div>
  );
}
