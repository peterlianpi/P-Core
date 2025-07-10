"use client";

import { toast } from "sonner";
import { z } from "zod";
import { teamFormSchema } from "@/schemas";
import { TeamForm } from "./team-form";
import { useData } from "@/providers/data-provider";
import { updateOrganization } from "@/actions/features/org/organization";
import { useTransition } from "react";
import { isError } from "@/helpers/organization-type";
import { OrganizationUserRole } from "@/prisma-user-database/user-database-client-types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = teamFormSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;
type Users = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  organization: {
    id: string;
    role: OrganizationUserRole;
  }[];
};

const EditTeam = ({
  users,

  organization,
}: {
  users?: Users[];

  organization: {
    id: string;
    name: string;
    logoImage: string | undefined;
    description: string | undefined;
    startedAt: Date | undefined;
    role: string | undefined;
  };
}) => {
  const { setIsAddTeam } = useData();
  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: FormValues) => {
    startTransition(async () => {
      const result = await updateOrganization({
        organizationId: organization.id,
        value: {
          ...values,
          startedAt: values.startedAt ? new Date(values.startedAt) : undefined,
        },
      });

      setIsAddTeam(false); // set isAddTeam to true to show the add team button in the dashboard page

      if (isError(result)) {
        // ❌ onError
        toast("Failed to update: " + result.error);
      } else if (result?.success) {
        // ✅ onSuccess
        toast(`${result.success.name} updated!`);
      }
    });
  };

  const defaultValues = {
    name: organization.name,
    description: organization?.description,
    logoImage: organization?.logoImage,
    startedAt: organization?.startedAt,
  };

  return (
    <div className="max-w-lg bg-background flex items-center justify-center p-2 rounded-lg mx-2 md:max-w-md w-full">
      <TeamForm
        users={users}
        isPending={isPending}
        id={organization.id}
        onSubmit={onSubmit}
        defaultValues={defaultValues}
      />
    </div>
  );
};

export default EditTeam;
