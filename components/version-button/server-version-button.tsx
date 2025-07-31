"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Version = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: string;
  description?: string | null | undefined;
};

type Props = {
  versions: Version[];
};

export default function VersionButtonServerPage({ versions }: Props) {
  const [open, setOpen] = useState(false);

  const betaVersion = versions.find((v) => v.name.toLowerCase() === "beta");
  if (!betaVersion) return <Button variant="outline">No Beta Version</Button>;
  return (
    <section className="w-full">
      <Button
        variant="outline"
        className="bg-blue-500 text-white"
        onClick={() => setOpen(true)}
      >
        {betaVersion.name} (v{betaVersion.version})
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90%] rounded-lg mx-auto">
          <DialogHeader className="py-2 mb-2">
            <DialogTitle>
              Version {betaVersion.version} - {betaVersion.name}
            </DialogTitle>
          </DialogHeader>
          <p>{betaVersion.description || "No description available."}</p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
