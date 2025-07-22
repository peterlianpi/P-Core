"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/date-picker";
import { useEffect, useState } from "react";
import { teamFormSchema } from "@/schemas";
import { useData } from "@/providers/data-provider";
import CustomUploadImagePage from "@/features/image-upload/components/upload-image";
import { useIsOrgOwner } from "@/hooks/use-current-team-role";
import { useOrgData } from "@/features/org/context/org-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const apiSchema = teamFormSchema.omit({
  id: true,
});

type FormValues = z.input<typeof apiSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  isPending?: boolean;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  ConfirmDialog?: React.FC<{ children: React.ReactNode }> | null;
};

export function TeamForm({
  id,
  defaultValues,
  isPending,
  onSubmit,
  onDelete,
  disabled,
  ConfirmDialog,
}: Props) {
  // State to track if FileReader should be initialized
  const { setIsAddTeam, setIsEditTeam, isEditTeam } = useData();
  const [isClient, setIsClient] = useState(false);
  const [imageUrl, setImageUrl] = useState(defaultValues?.logoImage || null);
  const { users } = useOrgData();

  // Initialize FileReader only on the client side
  useEffect(() => {
    setIsClient(true); // Ensures code only runs on the client side
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(apiSchema),
    defaultValues: defaultValues,
  });

  const isOwner = useIsOrgOwner(users ?? [], id);
  const isEditing = !!id;
  const canEdit = !isEditing || isOwner; // new team: anyone, existing: only owner

  const fileRef = form.register("logoImage");

  const handleSubmit = async (values: FormValues) => {
    onSubmit({
      ...values,
      logoImage: imageUrl ?? "",
    });
    setIsAddTeam(false);
    setIsEditTeam(false);
  };

  return (
    <section className="relative w-full rounded-lg shadow-lg">
      <Button
        variant="outline"
        onClick={() => (
          setIsAddTeam(false), isEditTeam && setIsEditTeam(false)
        )}
        className="absolute top-2 right-2 w-2"
      >
        ✖
      </Button>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="pt-6 grid grid-cols-1 md:grid-cols-4 gap-4 w-full p-4"
        >
          {/* Image Section */}
          <CustomUploadImagePage
            canEdit={canEdit}
            isClient={isClient}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            fileRef={fileRef}
          />

          {/* Form Section */}
          <section className="md:col-span-3 flex flex-col gap-4">
            {/* Organization Name */}

            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Organization Name"
                      value={field.value}
                      disabled={disabled || isPending || !canEdit}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* started Date */}
            <FormField
              name="startedAt"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Started At</FormLabel>
                  <FormControl>
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      disabled={disabled || isPending || !canEdit}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Team Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? undefined}
                    disabled={disabled || isPending || !canEdit}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem key="school" value="school">
                        School
                      </SelectItem>
                      <SelectItem value="church" key="church">
                        Church
                      </SelectItem>
                      <SelectItem value="business" key="business">
                        Business
                      </SelectItem>
                      <SelectItem value="nonprofit" key="nonprofit">
                        Nonprofit
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remaining Fields */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Description"
                      value={field.value}
                      disabled={disabled || isPending || !canEdit}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="md:col-span-3 flex flex-col  gap-2">
              <Button
                className="w-full"
                disabled={disabled || isPending || !canEdit}
              >
                {id ? "Save changes" : "Create team"}
              </Button>
              {ConfirmDialog && (
                <ConfirmDialog>
                  {!!id && (
                    <Button
                      type="button"
                      disabled={disabled || isPending || !canEdit}
                      onClick={onDelete}
                      className="w-full"
                      variant="outline"
                    >
                      <Trash className="size-4 mr-2" />
                      Delete team
                    </Button>
                  )}
                </ConfirmDialog>
              )}
            </div>
          </section>
        </form>
      </Form>
    </section>
  );
}
