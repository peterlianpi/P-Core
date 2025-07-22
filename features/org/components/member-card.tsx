/* eslint-disable @next/next/no-img-element */
// components/member-card.tsx
import { Button } from "@/components/ui/button";
import React from "react";
import { capitalizeFormat } from "../../../helpers/custom-function";

type MemberCardProps = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  role: string;
  status: string;
};

const MemberCardPage = ({
  id,
  name,
  email,
  image,
  role,
  status,
}: MemberCardProps) => {
  return (
    <div
      key={id}
      className="max-md:w-full w-64 border p-6 shadow-md rounded-md flex flex-col items-center text-center"
    >
      <img
        src={image ? image : "/image/profile.png"}
        alt={name ?? "No name"}
        className="w-16 h-16 rounded-full object-cover mb-2"
      />

      <h3 className="font-semibold">{name ?? "(No name)"}</h3>
      <p className="text-xs text-gray-600">{email}</p>
      <p className="text-xs mt-1 px-2 py-1 rounded bg-gray-100 text-gray-700">
        Role: {role ? capitalizeFormat(role) : "N/A"}
      </p>
      <Button
        variant={status === "REMOVED" ? "destructive" : "default"}
        className="text-xs mt-2 rounded-full pointer-events-none"
      >
        {status}
      </Button>
    </div>
  );
};

export default MemberCardPage;
