"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DynamicForm } from "@/features/system/dynamic-components/components/dynamic-form";
import { organizationSettingsSchema } from "./organization-settings-schema";
import { organizationSettingsFields } from "./organization-settings-fields";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function OrganizationSettingsDialog({ organization, onUpdate }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Organization</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
        </DialogHeader>
        <DynamicForm
          schema={organizationSettingsSchema}
          fields={organizationSettingsFields}
          defaultValues={organization}
          submitLabel="Save"
          onSubmit={async (data) => {
            const updateData = Object.fromEntries(
              Object.entries(data).filter(([_, v]) => v !== undefined && v !== "")
            );
            await onUpdate(updateData);
            toast.success("Organization updated!");
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
