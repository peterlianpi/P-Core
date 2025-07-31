/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { z } from "zod";
import { teamFormSchema } from "@/lib/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { TeamForm } from "./team-form";
import { useData } from "@/providers/data-provider";
import { useEditOrg } from "../api/use-edit-org";
import { isValidTeamType } from "./team-type-helper";

const formSchema = teamFormSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

const EditTeam = ({
  organization,
}: {
  organization: {
    id: string;
    name: string;
    logoImage: string | undefined;
    description: string | undefined;
    startedAt: Date | null | undefined;
    role: string | undefined;
    type: string | undefined;
  };
}) => {
  const user = useCurrentUser();
  const editMutation = useEditOrg(user?.id ?? "", organization.id);
  const { setIsAddTeam } = useData();

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        toast.success(`${values.name} is added successfully!`);
        setIsAddTeam(false); // set isAddTeam to true to show the add team button in the dashboard page
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const defaultValues = {
    name: organization.name,
    description: organization?.description,
    logoImage: organization?.logoImage,
    startedAt: organization?.startedAt ?? undefined,
    type: isValidTeamType(organization.type) ? organization.type : undefined,
  };

  return (
    <div className="max-w-lg bg-background flex items-center justify-center p-2 rounded-lg mx-2 md:max-w-md w-full">
      <TeamForm
        id={organization.id}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default EditTeam;
