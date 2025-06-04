"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetVersions } from "@/features/version/api/use-get-version";
export default function VersionButton() {
  const { data: versions, isLoading, error } = useGetVersions();
  const [open, setOpen] = useState(false);

  if (isLoading) return <>Data Fetching</>;

  if (error || !versions || versions.length === 0)
    return <Button variant="destructive">Version Error</Button>;

  // Get the first version with the name "beta"
  const betaVersion = versions.find((v) => v.status.toLowerCase() === "beta");

  if (!betaVersion) return <Button variant="outline">No Beta Version</Button>;

  return (
    <section className="w-full">
      <Button
        variant="outline"
        className="bg-blue-500 text-white"
        onClick={() => setOpen(true)}
      >
        {betaVersion.status} (v{betaVersion.version})
      </Button>
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <div>
            <DialogContent className="w-[90%] rounded-lg mx-auto">
              <DialogHeader className="py-2 mb-2">
                <DialogTitle>
                  Version {betaVersion.version} - {betaVersion.status}
                </DialogTitle>
              </DialogHeader>
              <p>{betaVersion.description || "No description available."}</p>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </section>
  );
}
