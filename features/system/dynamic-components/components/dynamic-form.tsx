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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ZodType } from "zod";
import React, { useEffect, useState, useTransition } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomUploadImagePage from "@/features/system/image-upload/components/upload-image";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { ImageOwnerType } from "@/lib/schemas/image-schemas";

// Improved FieldConfig type
export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<string | { value: string; label: string }>;
  helperText?: string;
}

type Props<T extends FieldValues> = {
  id?: string;
  imageType?: ImageOwnerType;
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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsClient(true);
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
      form.reset();
    });
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="font-semibold text-lg">
        {title || "Dynamic Form"}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit, (error) => {
              console.error("Form submission error:", error);
            })}
            className="space-y-6 max-w-2xl mx-auto"
          >
            {/* Image Section */}
            {imageType && (
              <CustomUploadImagePage
              ownerId={id??''}
                ownerType={imageType?? "OTHER"}
              feature={imageType?.toUpperCase() === "USER" ? "profile" : "cover"}
                canEdit={true}
                isClient={isClient}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                fileRef={fileRef}
              />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Dynamic Fields */}
              {fields.map((f) => (
                <FormField
                  key={f.name}
                  control={form.control}
                  name={f.name as Path<T>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {f.label}
                        {f.required && <span className="text-red-500 ml-1">*</span>}
                      </FormLabel>
                      <FormControl>
                        {f.type === "text" ||
                        f.type === "email" ||
                        f.type === "number" ? (
                          <Input
                            type={f.type}
                            placeholder={f.placeholder}
                            aria-required={f.required}
                            {...field}
                            disabled={isPending}
                          />
                        ) : f.type === "password" ? (
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder={f.placeholder}
                              aria-required={f.required}
                              {...field}
                              disabled={isPending}
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              className="absolute right-2 top-2 text-muted-foreground"
                              onClick={() => setShowPassword((v) => !v)}
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        ) : f.type === "textarea" ? (
                          <Textarea
                            placeholder={f.placeholder}
                            aria-required={f.required}
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
                        ) : f.type === "radio" ? (
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex flex-col gap-2"
                          >
                            {f.options?.map((opt) => {
                              const value = typeof opt === "string" ? opt : opt.value;
                              const label = typeof opt === "string" ? opt : opt.label;
                              return (
                                <div key={value} className="flex items-center gap-2">
                                  <RadioGroupItem value={value} id={`${field.name}-${value}`} />
                                  <Label htmlFor={`${field.name}-${value}`}>{label}</Label>
                                </div>
                              );
                            })}
                          </RadioGroup>
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
                      {f.helperText && (
                        <div className="text-xs text-muted-foreground mt-1">{f.helperText}</div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            {/* Submit Button */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin mr-2 h-4 w-4 inline" />}
                {id ? `Update ${submitLabel}` : `Add ${submitLabel}`}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
