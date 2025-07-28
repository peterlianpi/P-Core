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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/date-picker";
import { useEffect, useState } from "react";
import { teamFormSchema } from "@/lib/schemas";
import { useData } from "@/providers/data-provider";
import CustomUploadImagePage from "@/features/system/image-upload/components/upload-image";
 

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

  // Initialize FileReader only on the client side
  useEffect(() => {
    setIsClient(true); // Ensures code only runs on the client side
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(apiSchema),
    defaultValues: defaultValues,
  });

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
            type="team"
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
                      disabled={disabled || isPending}
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
                      value={field.value ?? undefined}
                      onChange={field.onChange}
                      disabled={disabled || isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    The date is used to calculate the age.
                  </FormDescription>
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
                      disabled={disabled || isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Actions */}
            <div className="md:col-span-3 flex flex-col  gap-2">
              <Button className="w-full" disabled={disabled || isPending}>
                {id ? "Save changes" : "Create team"}
              </Button>
              {ConfirmDialog && (
                <ConfirmDialog>
                  {!!id && (
                    <Button
                      type="button"
                      disabled={disabled || isPending}
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
