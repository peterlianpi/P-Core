"use client";

import { toast } from "sonner";
import { z } from "zod";
import { teamFormSchema } from "@/lib/schemas";
import { TeamForm } from "./team-form";
import { useData } from "@/providers/data-provider";
import { updateOrganization } from "@/actions/features/org/organization";
import { useTransition } from "react";
import { useSelectedOrg } from "../context/selected-org-context";
import { isValidTeamType } from "./team-type-helper";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = teamFormSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

const EditTeam = () => {
  const { setIsAddTeam } = useData();
  const [isPending, startTransition] = useTransition();
  const { selectedOrg: organization } = useSelectedOrg();

  const onSubmit = async (values: FormValues) => {
    startTransition(async () => {
      const result = await updateOrganization({
        organizationId: organization.id,
        value: {
          ...values,
          type: values.type ?? undefined,
          startedAt: values.startedAt ? new Date(values.startedAt) : undefined,
        },
      });

      setIsAddTeam(false); // set isAddTeam to true to show the add team button in the dashboard page

      if (!result.success) {
        // ❌ onError
        toast("Failed to update: " + (result.error || "Unknown error"));
      } else if (result.data) {
        // ✅ onSuccess
        toast(`${result.data.name} updated!`);
      }
    });
  };

  const defaultValues = {
    name: organization.name,
    description: organization?.description,
    logoImage: organization?.logoImage,
    startedAt: organization?.startedAt,
    type: isValidTeamType(organization?.type)
      ? (organization.type?.toUpperCase() as
          | "SCHOOL"
          | "TRAINING_CENTER"
          | "CORPORATE"
          | "CHURCH"
          | "OTHER")
      : undefined,
  };

  return (
    <div className="max-w-lg bg-background flex items-center justify-center p-2 rounded-lg mx-2 md:max-w-md w-full">
      <TeamForm
        isPending={isPending}
        id={organization.id}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default EditTeam;
