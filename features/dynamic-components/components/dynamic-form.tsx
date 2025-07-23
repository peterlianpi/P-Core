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
import React, { useEffect, useState, useTransition } from "react";
import { FieldConfig } from "../types/field-config";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomUploadImagePage from "@/features/image-upload/components/upload-image";
import { Switch } from "@/components/ui/switch";

type Props<T extends FieldValues> = {
  id?: string;
  imageType?: "user" | "member" | "material" | "team"; // Specify the type of image being uploaded
  title?: string;
  schema: ZodType<T>;
  fields: FieldConfig[];
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  submitLabel?: string;
};

export function DynamicForm<T extends FieldValues>({
  id,
  title,
  imageType = undefined,
  schema,
  fields,
  onSubmit,
  defaultValues,
  submitLabel,
}: Props<T>) {
  const [isClient, setIsClient] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState(
    defaultValues?.image || defaultValues?.coverImage || null
  );

  // Initialize FileReader only on the client side
  useEffect(() => {
    setIsClient(true); // Ensures code only runs on the client side
  }, []);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const fileRef = form.register("image" as Path<T>);

  const handleSubmit = async (values: T) => {
    startTransition(async () => {
      onSubmit({
        ...values,
        image: imageUrl ?? undefined,
        coverImage: imageUrl ?? undefined,
        isActive: values.status === "ACTIVE",
        isArchived: values.status === "ARCHIVED",
        isProspect: values.status === "PROSPECT",
      });
      form.reset(); // Reset form fields after successful submission
    });
  };

  return (
    <Card>
      <CardHeader className="font-semibold text-lg">
        {title || "Dynamic Form"}
      </CardHeader>{" "}
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit, (error) => {
              console.error("Form submission error:", error);
            })}
            className="space-y-6 max-w-2xl"
          >
            {/* Image Section */}
{imageType &&
            <CustomUploadImagePage
              type={imageType}
              canEdit={true}
              isClient={isClient}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              fileRef={fileRef}
            />}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Dynamic Fields */}
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
                              {f.options?.map((opt) => {
                                const value =
                                  typeof opt === "string" ? opt : opt.value;
                                const label =
                                  typeof opt === "string" ? opt : opt.label;
                                return (
                                  <SelectItem key={value} value={value}>
                                    {label}
                                  </SelectItem>
                                );
                              })}
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
                          <div className="grid md:grid-cols-4 gap-2 border p-3 rounded-md max-h-48 overflow-y-auto">
                            {f.options?.map((option) => {
                              const { value, label } =
                                typeof option === "string"
                                  ? { value: option, label: option }
                                  : option;

                              const values = (field.value as string[]) || [];
                              const checked = values.includes(value);

                              return (
                                <div
                                  key={value}
                                  className="flex items-center gap-2"
                                >
                                  <Checkbox
                                    id={`${field.name}-${value}`}
                                    checked={checked}
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        field.onChange([...values, value]);
                                      } else {
                                        field.onChange(
                                          values.filter((v) => v !== value)
                                        );
                                      }
                                    }}
                                    disabled={isPending}
                                  />
                                  <Label
                                    htmlFor={`${field.name}-${value}`}
                                    className="cursor-pointer"
                                  >
                                    {label}
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                        ) : f.type === "switch" ? (
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={field.value ?? false}
                              onCheckedChange={(checked) => {
                                field.onChange(checked);
                              }}
                              disabled={isPending}
                            />
                            <Label
                              htmlFor={field.name}
                              className="cursor-pointer"
                            >
                              {f.label}
                            </Label>
                          </div>
                        ) : null}
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Submit Button */}
            <div className="grid grid-cols-1 md:grid-cols-4  gap-4">
              <Button type="submit" className="w-full" disabled={isPending}>
                {id ? `Update ${submitLabel}` : `Add ${submitLabel}`}
              </Button>
              {/* {ConfirmDialog && (
                <ConfirmDialog>
                  {!!id && (
                    <Button
                      type="button"
                      disabled={disabled || isPending}
                      // onClick={onDelete}
                      className="w-full"
                      variant="outline"
                    >
                      <Trash className="size-4 mr-2" />
                      Delete student
                    </Button>
                  )}
                </ConfirmDialog>
              )} */}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
