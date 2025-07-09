"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { register } from "@/actions/auth/register";
import {
  getAndClearInviteToken,
  InviteTokenTracker,
} from "@/features/org/components/InviteTokenTracker";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useAcceptMember } from "@/features/org/api/use-accept-member";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const currentUser = useCurrentUser();
  const createAcceptMember = useAcceptMember(currentUser?.id ?? "");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const data = await register(values);
      setError(data.error);
      setSuccess(data.success);

      if (
        data.success
        // && data.userId
      ) {
        // After successful registration, check invite token

        const token = getAndClearInviteToken();
        if (token) {
          try {
            createAcceptMember.mutate(
              { token },
              {
                onSuccess: (data) => {
                  toast.success(
                    data.message || `Invite accepted successfully!`
                  );
                },
                onError: (error) => {
                  toast.error(error.message || "Failed to accept invite");
                },
              }
            );
          } catch {
            toast.error("Failed to accept invite.");
          }
        }
      }
    });
  };

  return (
    <>
      <InviteTokenTracker />
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Already have an account?"
        backButtonHref="/auth/login"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="John Doe"
                      />
                    </FormControl>
                    <FormMessage />
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
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
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
                        disabled={isPending}
                        placeholder="********"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button type="submit" disabled={isPending} className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
