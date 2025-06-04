import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction } from "react";
import { OrganizationType } from "./organizations-list";

const SelectedOrganizationPage = ({
  data,
  isSelected,
  setIsSelected,
}: {
  data: OrganizationType;
  isSelected: true;
  setIsSelected: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Button
        onClick={() =>
          !isSelected ? setIsSelected(true) : setIsSelected(false)
        }
      >
        X
      </Button>
      <div key={data.id}>
        <p>Name : {data.name}</p>
        <p>Role : {data.role}</p>
        <p>Description : {data.description}</p>
      </div>
    </div>
  );
};

export default SelectedOrganizationPage;
