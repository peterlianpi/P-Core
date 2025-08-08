"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetVersions } from "@/features/system/version/api/use-get-version";

export default function VersionButton() {
  const { data: versions, isLoading, error } = useGetVersions();
  const [open, setOpen] = useState(false);

  if (isLoading) return <>Loading version info...</>;

  if (error || !versions || versions.length === 0)
    return <Button variant="destructive">No Version Found</Button>;

  // Show the latest version (by createdAt or first in list)
  const latestVersion = versions[0];

  return (
    <section className="w-full">
      <Button
        variant="outline"
        className="bg-blue-500 text-white"
        onClick={() => setOpen(true)}
      >
        {latestVersion.name} (v{latestVersion.version})
      </Button>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <div>
            <DialogContent className="w-[90%] rounded-lg mx-auto">
              <DialogHeader className="py-2 mb-2">
                <DialogTitle>
                  Version {latestVersion.version} - {latestVersion.name}
                </DialogTitle>
              </DialogHeader>
              <p>{latestVersion.description || "No description available."}</p>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </section>
  );
}
