/* eslint-disable @next/next/no-img-element */
// components/member-card.tsx
import React from "react";

type MemberCardProps = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  role: string;
};

const MemberCardPage = ({ id, name, email, image, role }: MemberCardProps) => {
  return (
    <div
      key={id}
      className="bg-white border p-4 shadow-md rounded-md w-60 flex flex-col items-center text-center"
    >
      <img
        src={image ? image : "/image/profile.png"}
        alt={name ?? "No name"}
        className="w-16 h-16 rounded-full object-cover mb-2"
      />
      <h3 className="font-semibold">{name ?? "(No name)"}</h3>
      <p className="text-sm text-gray-600">{email}</p>
      <p className="text-xs mt-1 px-2 py-1 rounded bg-gray-100 text-gray-700">
        Role: {role}
      </p>
    </div>
  );
};

export default MemberCardPage;
