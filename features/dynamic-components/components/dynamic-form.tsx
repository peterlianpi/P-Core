"use client";

import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label"; // <-- import Label here
import { ZodType } from "zod";
import React, { useState } from "react";
import { FieldConfig } from "../types/field-config";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props<T extends FieldValues> = {
  schema: ZodType<T>;
  fields: FieldConfig[];
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  submitLabel?: string;
};

export function DynamicForm<T extends FieldValues>({
  schema,
  fields,
  onSubmit,
  defaultValues,
  submitLabel = "Submit",
}: Props<T>) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (data: T) => {
    setIsPending(true);
    await onSubmit(data);
    setIsPending(false);
  };

  return (
    <Card>
      <CardHeader className="text-lg font-semibold">Dynamic Form</CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit, (error) => {
              console.error("Form submission error:", error);
            })}
            className="space-y-6 max-w-2xl"
          >
            {fields.map((f) => (
              <FormField
                key={f.name}
                control={form.control}
                name={f.name as Path<T>}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{f.label}</FormLabel>
                    <FormControl>
                      {f.type === "text" ||
                      f.type === "email" ||
                      f.type === "number" ? (
                        <Input
                          type={f.type}
                          placeholder={f.placeholder}
                          {...field}
                          disabled={isPending}
                        />
                      ) : f.type === "textarea" ? (
                        <Textarea
                          placeholder={f.placeholder}
                          {...field}
                          disabled={isPending}
                        />
                      ) : f.type === "select" ? (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                          disabled={isPending}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${f.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {f.options?.map((opt) => (
                              <SelectItem key={opt} value={opt}>
                                {opt}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : f.type === "date" ? (
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isPending}
                        />
                      ) : f.type === "checkbox" ? (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={field.value ?? false}
                            onCheckedChange={field.onChange}
                            disabled={isPending}
                          />
                          <Label
                            htmlFor={field.name as string}
                            className="cursor-pointer"
                          >
                            {f.label}
                          </Label>
                        </div>
                      ) : f.type === "checkbox-group" ? (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 border p-3 rounded-md max-h-48 overflow-y-auto">
                          {f.options?.map((option) => {
                            const values = (field.value as string[]) || [];
                            const checked = values.includes(option);

                            return (
                              <div
                                key={option}
                                className="flex items-center gap-2"
                              >
                                <Checkbox
                                  id={`${field.name}-${option}`}
                                  checked={checked}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([...values, option]);
                                    } else {
                                      field.onChange(
                                        values.filter((v) => v !== option)
                                      );
                                    }
                                  }}
                                  disabled={isPending}
                                />
                                <Label
                                  htmlFor={`${field.name}-${option}`}
                                  className="cursor-pointer"
                                >
                                  {option}
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" className="w-full" disabled={isPending}>
              {submitLabel}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
