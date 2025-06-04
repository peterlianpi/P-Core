"use client";

import { useParams } from "next/navigation";
import React from "react";
import { Organization } from "../../_components/organizations-list";
import { $Enums } from "@/prisma/generated/client";

const OrganizationUserManagenentPage = ({
  organizations,
  users,
}: {
  organizations: Organization[];
  users:
    | {
        id: string;
        name: string | null;
        organization: {
          id: string;
          role: $Enums.OrganizationUserRole | null;
        }[];
      }[]
    | undefined;
}) => {
  const params = useParams();
  const orgId = params.id;

  const fOrg = organizations.filter((o) => o.organization.id === orgId);

  const organization = fOrg.map((f) => ({
    id: f.organization.id,
    name: f.organization.name,
    role: f.role,
  }));

  const user = users?.filter((u) =>
    u.organization.map((i) => organization.map((o) => o.id === i.id))
  );

  return (
    <div className="w-80">
      <div>
        {organization &&
          organization.map((org) => (
            <div key={org.id}>My Org : {org.name} </div>
          ))}
      </div>
      <div>
        {user &&
          user?.map((u) => (
            <div key={u.id}>
              User : {u.name} <br />
              Role: {}
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrganizationUserManagenentPage;
