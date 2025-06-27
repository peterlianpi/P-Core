"use client";

import { settings } from "@/actions/settings/settings";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import ImageUpload from "@/features/image-upload/components/upload-image-show";
import { useCurrentUser } from "@/hooks/use-current-user";
import { UserRole } from "@/prisma-user-database/user-database-client-types";
import { useData } from "@/providers/data-provider";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Organizations = {
  organization: {
    name: string;
    id: string;
    description?: string | undefined;
    startedAt?: Date | null | undefined;
    logoImage?: string | undefined;
  };
  role?: string | undefined;
};

type TelegramSetting = {
  telegramChatId: string | undefined;
  telegramBotToken: string | undefined;
};

type Props = {
  telegram: TelegramSetting;
  organizations: Organizations[];
};

const SettingsComponentPage = ({ telegram, organizations }: Props) => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const { update, status } = useSession();
  const { setLoading, setOrgId } = useData();
  // State to track if FileReader should be initialized
  const [isClient, setIsClient] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organizations | undefined>();

  // Initialize FileReader only on the client side
  useEffect(() => {
    setIsClient(true); // Ensures code only runs on the client side
  }, []);

  // Use useEffect to synchronize loading state
  useEffect(() => {
    setLoading(status === "loading"); // Update the loading state in the provider
  }, [setLoading, status]);

  useEffect(() => {
    if (user?.defaultOrgId) {
      setOrgId(user.defaultOrgId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?.defaultOrgId && organizations?.length) {
      const defaultOrg = organizations.find(
        (org) => org.organization.id === user.defaultOrgId
      );
      setSelectedOrg(defaultOrg ?? undefined);
    }
  }, [user?.defaultOrgId, organizations]);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      image: user?.image || undefined,
      defaultOrgId: user?.defaultOrgId || undefined,
      telegramChatId: telegram?.telegramChatId || undefined,
      telegramBotToken: telegram?.telegramBotToken || undefined,
    },
  });

  const fileRef = form.register("image");

  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    startTransition(async () => {
      let fileLink = ""; // initialize an empty file link

      // Handle image upload if there's an image in the form
      if (values.image && values.image.length > 0) {
        const file = values.image[0]; // Get the first file from the FileList

        // Check if the file has the necessary properties
        if (!file.name) {
          setError("Invalid file object: missing 'name' property.");
          return; // Stop submission if the file is invalid
        }

        // Initialize FileReader only on client-side
        if (isClient) {
          const reader = new FileReader();
          reader.onload = () => {
            fileLink = reader.result as string;

            // Proceed with updating the settings, including fileLink if available
            settings({
              ...values,
              image: fileLink, // Add the image URL if successfully uploaded
            })
              .then((data) => {
                if (data.error) {
                  setError(data.error);
                }
                if (data.success) {
                  update(); // Update session or state after success
                  setSuccess(data.success);
                }
              })
              .catch(() => setError("Something went wrong!"));
          };
          reader.readAsDataURL(file);
        }
      } else {
        // Proceed without file
        settings({
          ...values,
          image: fileLink, // Empty image if no file selected
        })
          .then((data) => {
            if (data.error) {
              setError(data.error);
            }
            if (data.success) {
              update(); // Update session or state after success
              setSuccess(data.success);
            }
          })
          .catch(() => setError("Something went wrong!"));
      }
    });
  };

  if (status === "loading") {
    return (
      <Card className="p-2 text-xs">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">⚙ Settings</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-4 w-full">
            <div className="flex flex-col gap-4 w-full">
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
            </div>
            <div className="flex flex-col gap-4 w-full">
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
              <Skeleton className="w-full h-16" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-2 text-xs">
      <CardHeader>
        <p className="text-2xl font-semibold text-left">⚙ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex items-center text-center justify-center gap-4 w-64 mx-auto">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <ImageUpload fileRef={fileRef} isPending={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="defaultOrgId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Organization</FormLabel>
                    <Select
                      disabled={isPending}
                      // onValueChange={field.onChange}
                      onValueChange={(value) => {
                        field.onChange(value);
                        const org = organizations?.find(
                          (org) => org.organization.id === value
                        );
                        setSelectedOrg(org ?? undefined); // Ensure it's either an object or `undefined`
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an organization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {organizations?.length === 0 ? (
                          <div className="px-4 py-2 text-sm text-muted-foreground">
                            No organizations available
                          </div>
                        ) : (
                          /* Map through organizations */
                          organizations?.map((org) => (
                            <SelectItem
                              key={org.organization.id}
                              value={org.organization.id}
                            >
                              {org.organization.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="organizationRole"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Organization Role</FormLabel>
                    <FormControl>
                      <Input
                        value={selectedOrg?.role || ""}
                        placeholder="Organization Role"
                        disabled={true}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Telegram Chat ID and Bot API */}
              <FormField
                control={form.control}
                name="telegramChatId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram Chat Id</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="12345678"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegramBotToken"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telegram Bot Token</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="12345678abcdef"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="john.doe@example.com"
                            type="email"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="******"
                            type="password"
                            autoComplete="new-password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="******"
                            type="password"
                            autoComplete="new-password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending || user?.role !== UserRole.SUPERADMIN}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <SelectItem value={UserRole.SUPERADMIN}>
                          Super Admin
                        </SelectItem>{" "}
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.MANAGER}>
                          Manager
                        </SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>{" "}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {user?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable or disable two-factor authentication for your
                          account.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsComponentPage;
