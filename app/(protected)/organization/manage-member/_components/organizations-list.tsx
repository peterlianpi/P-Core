"use client";

import React from "react";
import OrganizationCard from "../../_components/organization-card";
import { useRouter } from "next/navigation";

export type Organization = {
  organization: {
    id: string;
    name: string;
    description?: string | undefined;
    startedAt?: Date | null | undefined;
    logoImage?: string | undefined;
  };
  role?: string | undefined;
};

export type OrganizationType = {
  id: string;
  name: string;
  description: string | undefined;
  startedAt: Date | undefined;
  logoImage: string | undefined;
  role: string | undefined;
};

function OrganizationListsPage({
  organizations,
}: {
  organizations: Organization[];
}) {
  const router = useRouter();
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
      {result &&
        result.map((r) => (
          <div
            key={r.id}
            onClick={() => router.push(`/organization/manage-member/${r.id}`)}
          >
            <OrganizationCard organization={r} />
          </div>
        ))}
    </div>
  );
}

export default OrganizationListsPage;
