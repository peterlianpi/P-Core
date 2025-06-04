/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { toast } from "sonner";
import { z } from "zod";
import { teamFormSchema } from "@/schemas";
import { useCreateOrg } from "../api/use-create-org";
import { useCurrentUser } from "@/hooks/use-current-user";
import { TeamForm } from "./team-form";
import { useData } from "@/providers/data-provider";

const formSchema = teamFormSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

const AddNewTeam = () => {
  const user = useCurrentUser();
  const createMutation = useCreateOrg(user?.id ?? "");
  const { setIsAddTeam } = useData();

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
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
    name: "",
    description: "",
    logoImage: "",
    startedAt: undefined,
  };

  return (
    <div className="max-w-lg bg-background flex items-center justify-center p-2 rounded-lg mx-2 md:max-w-md w-full">
      <TeamForm onSubmit={onSubmit} defaultValues={defaultValues} />
    </div>
  );
};

export default AddNewTeam;
