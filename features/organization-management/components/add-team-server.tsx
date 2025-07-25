"use client";

import { toast } from "sonner";
import { useTransition } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createOrganization } from "@/actions/features/org/organization";
import { TeamForm } from "./team-form";
import { useData } from "@/providers/data-provider";
import { organizationSchema, OrganizationSchema } from "@/features/organization-management/schemas";

const AddNewTeam = () => {
  const { setIsAddTeam } = useData();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: OrganizationSchema) => {
    if (!user?.id) {
      toast.error("You must be logged in to create an organization.");
      return;
    }

    startTransition(async () => {
      const result = await createOrganization(user.id, values);

      if (result.success) {
        toast.success(`Organization "${result.data.name}" created successfully!`);
        setIsAddTeam(false);
      } else {
        toast.error(result.error || "Failed to create organization.");
      }
    });
  };

  return (
    <div className="max-w-lg bg-background flex items-center justify-center p-2 rounded-lg mx-2 md:max-w-md w-full">
      <TeamForm
        schema={organizationSchema} // Pass the schema to the form
        isPending={isPending}
        onSubmit={onSubmit}
        defaultValues={{ name: "", description: "", logoImage: "" }}
      />
    </div>
  );
};

export default AddNewTeam;
