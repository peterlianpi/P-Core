"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CustomCourseFormData,
  StudentFormData,
  studentFormSchema,
} from "@/features/music-school-management/types/schemas";

interface StudentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: StudentFormData;
  onSave: (data: StudentFormData) => void;
  availableCourses: CustomCourseFormData[];
}

export function StudentForm({
  open,
  onOpenChange,
  student,
  onSave,
  availableCourses,
}: StudentFormProps) {
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      // Initialize with empty values or student data if available
      id: "", // You may want to handle this conditionally
      number: undefined,
      name: "",
      email: "",
      phone: "",
      birthDate: new Date(),
      gender: undefined,
      image: "",
      rollNumber: "",
      parentName: "",
      parentPhone: "",
      notes: "",
      address: "",
      courseIds: [],
      isActive: true,
      isArchived: false,
      isDeleted: false,
      isProspect: false,
      joinedAt: undefined,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    // setValue
  } = form;

  useEffect(() => {
    if (student) {
      reset(student);
    } else {
      reset({
        name: "",
        email: "",
        phone: "",
        address: "",
        orgId: "",
        courseIds: [],
        isActive: true,
        isArchived: false,
        isDeleted: false,
      });
    }
  }, [student, reset, open]);

  const onSubmit = (values: StudentFormData) => {
    onSave(values);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {student ? "Edit Student" : "Add New Student"}
          </DialogTitle>
          <DialogDescription>
            {student
              ? "Update the student's information and enrolled courses."
              : "Add a new student and assign them to courses."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Fields */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+959123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Full address..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Course Selection */}
            <FormField
              control={control}
              name="courseIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Courses</FormLabel>
                  <FormControl>
                    <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-2">
                      {availableCourses.map((course) => (
                        <label
                          key={course.id}
                          className="flex items-center space-x-2 cursor-pointer"
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
                            className="cursor-pointer"
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

            <Button type="submit" className="w-full mt-4">
              {student ? "Save Changes" : "Add Student"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
