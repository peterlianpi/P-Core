/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";

type Role = "OWNER" | "ADMIN" | "MEMBER" | "ACCOUNTANT" | "OFFICE_STAFF";

type Member = {
  id: string;
  name: string | null;
  email: string;
  image?: string | null;
  organization: {
    id: string;
    role: Role | null;
  }[];
};

type Props = {
  members: Member[];
  onRemove: (id: string) => void;
};

const MemberRemoveList = ({ members, onRemove }: Props) => {
  return (
    <ul className="space-y-2 py-4">
      {members.map((m) => {
        const currentRole = m.organization.find((o) => o.id)?.role;

        return (
          <li
            key={m.id}
            className="border p-2 rounded-lg flex items-center gap-4"
          >
            <img
              src={m.image || "/image/profile.png"}
              alt={m.name ?? "No name"}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">{m.name ?? "(No name)"}</p>
              <p className="text-sm text-gray-600">{m.email}</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onRemove(m.id)}
              disabled={currentRole !== "OWNER"}
            >
              Remove
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default MemberRemoveList;
