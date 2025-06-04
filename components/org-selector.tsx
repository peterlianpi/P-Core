"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetOrg } from "@/features/org/api/use-get-org";
import { useData } from "@/providers/data-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SettingsSchema = z.object({
  defaultOrgId: z.string().optional(),
});

const OrganizationSelector = () => {
  const { data: organizations, isPending } = useGetOrg();
  const { orgId, setOrgId } = useData();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      defaultOrgId: undefined,
    },
  });

  return (
    <>
      <Form {...form}>
        <FormField
          control={form.control}
          name="defaultOrgId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={(value) => {
                  field.onChange(value);
                  setOrgId(value);
                }} // Convert string to number
                defaultValue={field.value ? field.value : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an organization" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {organizations?.map((org) => (
                    <SelectItem key={org.id} value={org.id.toString()}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
      <p>Organization Id : {orgId}</p>
    </>
  );
};

export default OrganizationSelector;
