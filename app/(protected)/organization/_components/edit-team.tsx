"use client";
import EditTeam from "@/features/org/components/edit-team-server";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";
import { useData } from "@/providers/data-provider";
import React from "react";

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

const EditTeamPage = ({
  users,

  organization,
}: {
  users?: Users[];

  organization: OrganizationType;
}) => {
  const { isEditTeam } = useData();
  return (
    <>
      {isEditTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <EditTeam users={users} organization={organization} />
        </div>
      )}
    </>
  );
};

export default EditTeamPage;
