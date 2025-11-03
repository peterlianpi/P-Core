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

  // Get the latest version by createdAt date (most recent first)
  const latest = versions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

  if (!latest) return <Button variant="outline">No Version</Button>;

  return (
    <section className="w-full">
      <Button
        variant="outline"
        className="bg-blue-500 text-white hover:bg-blue-600"
        onClick={() => setOpen(true)}
      >
        {latest.name} (v{latest.version})
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90%] rounded-lg mx-auto max-w-md">
          <DialogHeader className="py-2 mb-2">
            <DialogTitle>
              Version {latest.version} - {latest.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {latest.description || "No description available."}
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Created: {new Date(latest.createdAt).toLocaleDateString()}</p>
              <p>Updated: {new Date(latest.updatedAt).toLocaleDateString()}</p>
            </div>
            {versions.length > 1 && (
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium mb-2">All Versions:</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {versions.map((version) => (
                    <div key={version.id} className="text-xs flex justify-between">
                      <span>{version.name} (v{version.version})</span>
                      <span className="text-muted-foreground">
                        {new Date(version.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
