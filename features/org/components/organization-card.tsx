/* eslint-disable @next/next/no-img-element */
import React from "react";

type Organization = {
  id: string;
  name: string;
  logoImage: string | undefined;
  description: string | undefined;
  startedAt: Date | null | undefined;
  role: string | undefined;
};

function OrganizationCard({ organization }: { organization: Organization }) {
  return (
    <div
      key={organization.id}
      className="flex flex-col w-40 h-64 p-3 rounded-lg border shadow-lg border-green-400"
    >
      <img
        src={
          organization.logoImage ? organization.logoImage : "/image/profile.png"
        }
        alt={organization.name}
        className="w-full object-cover rounded-2xl py-2 h-[70%]"
      />
      <div className="text-sm font-semibold">{organization.name}</div>
      <div className="text-sm">Role : {organization.role}</div>
      <div className="text-sm">
        Since :{organization.startedAt?.getDate() ?? "-"}/
        {organization.startedAt?.getMonth() ?? "-"}/
        {organization.startedAt?.getFullYear() ?? "-"}
      </div>
    </div>
  );
}

export default OrganizationCard;
