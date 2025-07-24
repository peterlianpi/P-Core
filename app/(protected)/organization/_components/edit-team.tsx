"use client";
import EditTeam from "@/features/organization-management/components/edit-team-server";
import { useData } from "@/providers/data-provider";
import React from "react";

const EditTeamPage = () => {
  const { isEditTeam } = useData();
  return (
    <>
      {isEditTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <EditTeam />
        </div>
      )}
    </>
  );
};

export default EditTeamPage;
