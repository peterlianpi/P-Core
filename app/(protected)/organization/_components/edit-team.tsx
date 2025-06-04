"use client";
import EditTeam from "@/features/org/components/edit-team-server";
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

const EditTeamPage = ({ organization }: { organization: OrganizationType }) => {
  const { isEditTeam } = useData();
  return (
    <>
      {isEditTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <EditTeam organization={organization} />
        </div>
      )}
    </>
  );
};

export default EditTeamPage;
