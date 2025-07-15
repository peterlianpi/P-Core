"use client";

import { toast } from "sonner";
import { z } from "zod";
import { teamFormSchema } from "@/schemas";
import { TeamForm } from "./team-form";
import { useData } from "@/providers/data-provider";
import { createOrganization } from "@/actions/features/org/organization";
import { useTransition } from "react";
import { isError } from "@/features/org/helper/organization-type";
import { useCurrentUser } from "@/hooks/use-current-user";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = teamFormSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

const AddNewTeam = () => {
  const { setIsAddTeam } = useData();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: FormValues) => {
    startTransition(async () => {
      const result = await createOrganization({
        userId: user?.id ?? "",
        value: {
          ...values,
          startedAt: values.startedAt ? new Date(values.startedAt) : undefined,
        },
      });

      setIsAddTeam(false); // set isAddTeam to true to show the add team button in the dashboard page

      if (isError(result)) {
        // ❌ onError
        toast("Failed to create: " + result.error);
      } else if (result?.success) {
        // ✅ onSuccess
        toast(`${result.success.name} created!`);
      }
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
      <TeamForm
        isPending={isPending}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default AddNewTeam;
