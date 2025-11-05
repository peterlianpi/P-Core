"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { z } from "zod";
import { RegisterSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { useState, useTransition } from "react";
import { register } from "@/actions/auth/register";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Building2, Shield, User, Eye, EyeOff } from "lucide-react";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
      companyName: "",
    },
  });

  const selectedRole = form.watch("role");

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const data = await register(values);
      setError(data.error);
      setSuccess(data.success);
    });
  };

  const roleOptions = [
    {
      value: "user",
      label: "Individual User",
      description: "Personal workspace and features",
      icon: User,
    },
    {
      value: "company",
      label: "Company/Organization",
      description: "Create and manage your organization",
      icon: Building2,
    },
    {
      value: "admin",
      label: "Administrator",
      description: "Full system access and management",
      icon: Shield,
    },
  ];

  return (
    <CardWrapper
      headerLabel="Create your account"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Desktop: 2-column grid, Mobile: single column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
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
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                      type={showPassword ? "text" : "password"}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isPending}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={selectedRole ? "h-16" : "h-12"}>
                      <SelectValue placeholder="Select your account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-80 w-full min-w-[var(--radix-select-trigger-width)]">
                    {roleOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="flex items-start gap-2 py-1.5 px-1 min-h-[44px]">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className={`p-1.5 rounded-md ${
                              option.value === 'user' ? 'bg-blue-50 text-blue-600' :
                              option.value === 'company' ? 'bg-green-50 text-green-600' :
                              'bg-purple-50 text-purple-600'
                            }`}>
                              <option.icon className="h-3.5 w-3.5" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm leading-tight mb-0.5">
                              {option.label}
                            </div>
                            <div className="text-xs text-muted-foreground leading-snug line-clamp-2">
                              {option.description}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedRole === "company" && (
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company/Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Your Company Name"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    This will create a new organization and make you the owner.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" disabled={isPending} className="w-full">
            Create Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
