"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useVersionFields } from "@/features/system/version/hooks/use-version-fields";
import { DynamicForm } from "@/features/system/dynamic-components/components/dynamic-form";

const versionFormSchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/, "Please enter a valid semantic version"),
  name: z.string().min(3, "Release name must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  releaseDate: z.string().min(1, "Release date is required"),
  status: z.enum(["DEVELOPMENT", "TESTING", "STAGING", "PRODUCTION", "DEPRECATED"]),
  createdBy: z.string().optional(),
});

export type VersionFormData = z.infer<typeof versionFormSchema>;

interface VersionFormProps {
  onSubmit: (data: VersionFormData) => void;
  initialData?: Partial<VersionFormData>;
  isLoading?: boolean;
  submitButtonText?: string;
}

export const VersionForm: React.FC<VersionFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
  submitButtonText = "Create Version",
}) => {
  const versionFields = useVersionFields();

  const form = useForm<VersionFormData>({
    resolver: zodResolver(versionFormSchema),
    defaultValues: {
      version: "",
      name: "",
      description: "",
      releaseDate: new Date().toISOString().slice(0, 10),
      status: "DEVELOPMENT",
      createdBy: "",
      ...initialData,
    },
  });

  const handleSubmit = (data: VersionFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <DynamicForm
          fields={versionFields}
          form={form}
          className="space-y-4"
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : submitButtonText}
        </Button>
      </form>
    </Form>
  );
};
