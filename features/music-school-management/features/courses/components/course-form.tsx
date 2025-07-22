"use client";

import {
  CourseFormData,
  courseFormSchema,
} from "@/features/music-school-management/types/schemas";
import { DynamicForm } from "@/features/dynamic-components/components/dynamic-form";
import { useCourseFields } from "@/features/dynamic-components/schemas/course-field";

interface CourseFormProps {
  title: string;
  defaultValues?: CourseFormData;
  onSubmit: (values: CourseFormData) => void;
  disabled?: boolean;
  ConfirmDialog?: React.FC<{ children: React.ReactNode }> | null;
  id?: string;
}

export function CourseForm({
  title,
  defaultValues,
  onSubmit,
  id,
}: CourseFormProps) {
  const courseFields = useCourseFields();

  const handleSubmit = async (values: CourseFormData) => {
    console.log("Form submitted with values:", values);
    onSubmit({
      ...values,
      isActive: values.status === "ACTIVE" ? true : false,
      isArchived: values.status === "ARCHIVED" ? true : false,
    });
  };

  return (
    <>
      <DynamicForm
        id={id}
        title={title}
        schema={courseFormSchema}
        fields={courseFields}
        onSubmit={handleSubmit}
        imageType="material"
        submitLabel="Course"
        defaultValues={defaultValues}
      />
    </>
  );
}
