"use client";

import {
  studentFormData,
  studentFormDataSchema,
} from "@/features/school-management/types/schemas";
import { DynamicForm } from "@/features/dynamic-components/components/dynamic-form";
import { useStudentFields } from "@/features/dynamic-components/schemas/student-field";

interface StudentFormProps {
  title: string;
  defaultValues?: studentFormData;
  onSubmit: (values: studentFormData) => void;
  disabled?: boolean;
  ConfirmDialog?: React.FC<{ children: React.ReactNode }> | null;
  id?: string;
}

export function StudentForm({
  title,
  defaultValues,
  onSubmit,
  id,
}: StudentFormProps) {
  const studentFields = useStudentFields();

  const handleSubmit = async (values: studentFormData) => {
    onSubmit({
      ...values,
    });
  };

  return (
    <>
      <DynamicForm
        id={id}
        title={title}
        schema={studentFormDataSchema}
        fields={studentFields}
        onSubmit={handleSubmit}
        imageType="member"
        submitLabel="Student"
        defaultValues={defaultValues}
      />
    </>
  );
}
