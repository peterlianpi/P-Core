"use client";

import React from "react";
import OrganizationCard from "./organization-card";
import EditTeamPage from "../../../app/(protected)/organization/_components/edit-team";
import { useData } from "@/providers/data-provider"; // for isEditTeam
import { useOrgData } from "@/features/org/context/org-context";
import { useSelectedOrg } from "@/features/org/context/selected-org-context";

function OrganizationListsPage() {
  const { isEditTeam, setIsEditTeam } = useData();
  const { organizations } = useOrgData(); // 👈 access context
  const { setSelectedOrg, setSelectedOrgId } = useSelectedOrg();

  // Map to OrganizationType for display
  const result = organizations.map((org) => ({
    id: org.organization.id,
    name: org.organization.name,
    logoImage: org.organization.logoImage,
    description: org.organization.description,
    startedAt: org.organization.startedAt ?? undefined,
    role: org.role,
  }));

  return (
    <div className="flex flex-wrap justify-start items-center w-full mt-4 gap-2">
      {isEditTeam && <EditTeamPage />}
      {result.map((r) => (
        <div
          key={r.id}
          onClick={() => {
            setSelectedOrg(r);
            setSelectedOrgId(r.id);
            setIsEditTeam(!isEditTeam);
          }}
        >
          <OrganizationCard organization={r} />
        </div>
      ))}
    </div>
  );
}

export default OrganizationListsPage;
