"use client";

import AddNewTeam from "@/features/org/components/add-team-server";
import { useData } from "@/providers/data-provider";
import React from "react";

const AddTeamPage = () => {
  const { isAddTeam } = useData();
  return (
    <>
      {isAddTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <AddNewTeam />
        </div>
      )}
    </>
  );
};

export default AddTeamPage;
