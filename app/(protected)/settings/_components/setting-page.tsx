"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import { settings } from "@/actions/settings/settings";
import { SettingsSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import ImageUpload from "@/features/system/image-upload/components/upload-image-show";

type Organization = {
  organization: { id: string; name: string; };
};
type SettingsComponentPageProps = {
  organizations?: Organization[];
};

const SettingsComponentPage = ({ organizations }: SettingsComponentPageProps) => {
  const user = useCurrentUser();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      newPassword: "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
      defaultOrgId: user?.defaultOrgId || "",
      image: user?.image || "",
    },
  });

  const fileRef = form.register("image");

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) toast.error(data.error);
          if (data.success) {
            update();
            toast.success(data.success);
            form.reset(); // Reset form state after successful submission
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Profile Settings Card */}
        <Card>
          <CardHeader>
            <p className="text-xl font-semibold">Profile</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <ImageUpload fileRef={fileRef} isPending={isPending} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Name" disabled={isPending} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="email" 
                      placeholder="your.email@example.com" 
                      disabled={user?.isOAuth || true} 
                    />
                  </FormControl>
                  <FormDescription>
                    {user?.isOAuth 
                      ? "Your email is managed by your OAuth provider and cannot be changed here."
                      : "Email changes require additional verification (currently disabled)."
                    }
                  </FormDescription>
                </FormItem>
              )}
            />
            
            {/* User Role Display */}
            <div className="space-y-2">
              <FormLabel>Current Role</FormLabel>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={
                    user?.role === "SUPERADMIN" ? "destructive" : 
                    user?.role === "ADMIN" ? "default" : "secondary"
                  }
                >
                  {user?.role || 'USER'}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Your system role determines your access level
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings Card */}
        {user?.isOAuth === false && (
          <Card>
            <CardHeader>
              <p className="text-xl font-semibold">Security</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="******" autoComplete="off" disabled={isPending} />
                    </FormControl>
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
                      <Input {...field} type="password" placeholder="******" autoComplete="off" disabled={isPending} />
                    </FormControl>
                    <FormDescription>Leave blank to keep your current password.</FormDescription>
                  </FormItem>
                )}
              />
               <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Two-Factor Authentication</FormLabel>
                        <FormDescription>Enable 2FA for your account.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                      </FormControl>
                    </FormItem>
                  )}
                />
            </CardContent>
          </Card>
        )}

        {/* Organization Settings Card */}
        {organizations && organizations.length > 0 && (
          <Card>
            <CardHeader>
              <p className="text-xl font-semibold">Organization</p>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="defaultOrgId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Organization</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your default organization" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {organizations.map((org) => (
                          <SelectItem key={org.organization.id} value={org.organization.id}>
                            {org.organization.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>This will be the default organization you see when you log in.</FormDescription>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        <Button type="submit" disabled={isPending}>
          Save All Settings
        </Button>
      </form>
    </Form>
  );
};

export default SettingsComponentPage;
