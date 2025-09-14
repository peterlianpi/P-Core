"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useVersionFields } from "@/features/system/version/hooks/use-version-fields";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const versionFormSchema = z.object({
  version: z.string().min(1, "Version is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  releaseDate: z.string().min(1, "Release date is required"),
  status: z.enum(["DEVELOPMENT", "TESTING", "STAGING", "PRODUCTION", "DEPRECATED"]),
  createdBy: z.string().optional(),
});

export type VersionFormData = z.infer<typeof versionFormSchema>;

interface VersionFormDynamicProps {
  onSubmit: (data: VersionFormData) => void;
  initialData?: Partial<VersionFormData>;
  isLoading?: boolean;
  submitButtonText?: string;
}

export const VersionFormDynamic: React.FC<VersionFormDynamicProps> = ({
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
        {versionFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name as keyof VersionFormData}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {(() => {
                    switch (field.type) {
                      case "text":
                        return (
                          <Input
                            {...formField}
                            placeholder={field.placeholder}
                            disabled={field.name === "createdBy"}
                          />
                        );
                      case "textarea":
                        return (
                          <Textarea
                            {...formField}
                            placeholder={field.placeholder}
                            rows={4}
                          />
                        );
                      case "date":
                        return (
                          <Input
                            {...formField}
                            type="date"
                          />
                        );
                      case "select":
                        return (
                          <Select
                            onValueChange={formField.onChange}
                            defaultValue={formField.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option) => {
                                const optionValue = typeof option === 'string' ? option : option.value;
                                const optionLabel = typeof option === 'string' ? option : option.label;
                                return (
                                  <SelectItem key={optionValue} value={optionValue}>
                                    {optionLabel}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        );
                      default:
                        return null;
                    }
                  })()}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : submitButtonText}
        </Button>
      </form>
    </Form>
  );
};
