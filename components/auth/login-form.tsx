"use client";

import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/auth/login";
import { useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import {
  getAndClearInviteToken,
  InviteTokenTracker,
} from "@/features/org/components/InviteTokenTracker";
import { toast } from "sonner";
import { useAcceptMember } from "@/features/org/api/use-accept-member";
import { useCurrentUser } from "@/hooks/use-current-user";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const callbackUrl = searchParams.get("callbackUrl");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { status } = useSession();
  const currentUser = useCurrentUser();
  const createAcceptMember = useAcceptMember(currentUser?.id ?? "");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      await login(values, callbackUrl)
        .then(async (data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (
            data?.success
            // && data.userId
          ) {
            form.reset();
            setSuccess(data.success);

            // After successful login, check invite token
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

            if (data.redirectTo) {
              window.location.href = data.redirectTo;
            }
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() =>
          setError("An unexpected error occurred. Please try again.")
        );
    });
  };

  useEffect(() => {
    if (status === "authenticated") {
      const fetchSession = async () => {
        await getSession();
      };
      fetchSession();
    }
  }, [status]);

  return (
    <>
      <InviteTokenTracker />
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/auth/register"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              {showTwoFactor && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Two Factor Code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your phone.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {!showTwoFactor && (
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
                        <Button
                          size="sm"
                          variant="link"
                          className="px-0 font-normal"
                          asChild
                        >
                          <Link href="/auth/reset">Forgot password?</Link>
                        </Button>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <FormSuccess message={success} />
            <FormError message={error || urlError} />
            <Button type="submit" disabled={isPending} className="w-full">
              {showTwoFactor ? "Confirm" : "Login"}
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};
