"use client";

import React, { useState } from "react";
import OrganizationCard from "./organization-card";
import { useData } from "@/providers/data-provider";
import EditTeamPage from "./edit-team";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";

type Organization = {
  organization: {
    id: string;
    name: string;
    description?: string | undefined;
    startedAt?: Date | null | undefined;
    logoImage?: string | undefined;
  };
  role?: string | undefined;
};

type OrganizationType = {
  id: string;
  name: string;
  description: string | undefined;
  startedAt: Date | undefined;
  logoImage: string | undefined;
  role: string | undefined;
};

type Users = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  organization: {
    id: string;
    role: OrganizationUserRole;
  }[];
};

function OrganizationListsPage({
  organizations,
  users,
}: {
  organizations: Organization[];
  users?: Users[];
}) {
  const { isEditTeam, setIsEditTeam } = useData();
  const [isOrg, setIsOrg] = useState<OrganizationType>({
    id: "",
    name: "",
    logoImage: "",
    description: "",
    startedAt: undefined,
    role: "",
  });
  const result = organizations.map((org) => ({
    id: org.organization.id,
    name: org.organization.name,
    logoImage: org.organization.logoImage,
    description: org.organization.description,
    startedAt: org.organization.startedAt ?? undefined,
    role: org.role,
  }));

  return (
    <div className="flex flex-wrap justify-start items-center w-full gap-2">
      {isEditTeam && <EditTeamPage users={users} organization={isOrg} />}
      {result &&
        result.map((r) => (
          <div
            className=""
            key={r.id}
            onClick={() => (
              setIsOrg(r),
              !isEditTeam ? setIsEditTeam(true) : setIsEditTeam(false)
            )}
          >
            <OrganizationCard organization={r} />
          </div>
        ))}
    </div>
  );
}

export default OrganizationListsPage;
