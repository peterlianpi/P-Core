"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  CustomCourseFormData,
  StudentFormData,
  studentFormSchema,
} from "@/features/music-school-management/types/schemas";
import { useEffect, useState, useTransition } from "react";
import { DatePicker } from "@/components/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomUploadImagePage from "@/features/image-upload/components/upload-image";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface StudentFormProps {
  defaultValues?: StudentFormData;
  onSubmit: (values: StudentFormData) => void;
  disabled?: boolean;
  ConfirmDialog?: React.FC<{ children: React.ReactNode }> | null;
  id?: string;
  availableCourses: CustomCourseFormData[];
}

export function StudentForm({
  defaultValues,
  onSubmit,
  disabled = false,
  ConfirmDialog = null,
  id,
  availableCourses,
}: StudentFormProps) {
  const [isClient, setIsClient] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState(defaultValues?.image || null);

  // Initialize FileReader only on the client side
  useEffect(() => {
    setIsClient(true); // Ensures code only runs on the client side
  }, []);

  // Initialize form with default values from defaultValues prop
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema.omit({ id: true })),
    defaultValues: defaultValues,
  });

  const fileRef = form.register("image");

  const handleSubmit = async (values: StudentFormData) => {
    startTransition(async () => {
      console.log("Form submitted with values:", values);
      onSubmit({
        ...values,
        image: imageUrl ?? undefined,
      });
    });
  };

  return (
    <Card>
      <CardHeader className="font-semibold text-lg">
        Student Information
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Image Section */}
            <CustomUploadImagePage
              type="member"
              canEdit={!disabled}
              isClient={isClient}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              fileRef={fileRef}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={disabled || isPending}
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={disabled || isPending}
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={disabled || isPending}
                        placeholder="+959123456789"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        disabled={disabled || isPending}
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key="gender-male" value="MALE">
                            Male
                          </SelectItem>
                          <SelectItem key="gender-female" value="FEMALE">
                            Female
                          </SelectItem>
                          <SelectItem key="gender-other" value="OTHER">
                            Other
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Roll Number */}
              <FormField
                control={form.control}
                name="rollNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Roll Number</FormLabel>
                    <FormControl>
                      <Input
                        disabled={disabled || isPending}
                        placeholder="MS001"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Birth Date */}
              <FormField
                name="birthDate"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={disabled || isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Your date of birth is used to calculate your age.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Joined At */}
              <FormField
                control={form.control}
                name="joinedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Joined Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={disabled || isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Your joined date is used to track your enrollment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Parent Name */}
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={disabled || isPending}
                        placeholder="Parent Full Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Parent Phone */}
              <FormField
                control={form.control}
                name="parentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Phone</FormLabel>
                    <FormControl>
                      <Input
                        disabled={disabled || isPending}
                        placeholder="+959..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Full Address..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Extra notes..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Course Selection */}
            <FormField
              control={form.control}
              name="courseIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Courses</FormLabel>
                  <FormControl>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 border rounded p-3 max-h-48 overflow-y-auto">
                      {availableCourses.map((course) => (
                        <label
                          key={course.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={course.id}
                            checked={field.value?.includes(course.id) ?? false}
                            onChange={() => {
                              const current = field.value || [];
                              if (current.includes(course.id)) {
                                field.onChange(
                                  current.filter((id) => id !== course.id)
                                );
                              } else {
                                field.onChange([...current, course.id]);
                              }
                            }}
                          />
                          <span>{course.name}</span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                  <div className="text-sm mt-1 text-muted-foreground">
                    Selected: {field.value?.length || 0} course(s)
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button type="submit" className="w-full">
                {id ? "Update Student" : "Add Student"}
              </Button>
              {ConfirmDialog && (
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
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
