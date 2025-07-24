"use client";

import {
  LessonBookFormData,
  lessonBookFormSchema,
} from "@/features/school-management/types/schemas";
import { DynamicForm } from "@/features/system/dynamic-components/components/dynamic-form";
import { useLessonBookFields } from "@/features/system/dynamic-components/schemas/lessonBook-field";

interface LessonBookFormProps {
  title: string;
  defaultValues?: LessonBookFormData;
  onSubmit: (values: LessonBookFormData) => void;
  disabled?: boolean;
  ConfirmDialog?: React.FC<{ children: React.ReactNode }> | null;
  id?: string;
}

export function LessonBookForm({
  title,
  defaultValues,
  onSubmit,
  id,
}: LessonBookFormProps) {
  const courseFields = useLessonBookFields();

  const handleSubmit = async (values: LessonBookFormData) => {
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
        schema={lessonBookFormSchema}
        fields={courseFields}
        onSubmit={handleSubmit}
        imageType="material"
        submitLabel="LessonBook"
        defaultValues={defaultValues}
      />
    </>
  );
}
