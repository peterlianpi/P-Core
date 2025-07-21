"use client";

import { DynamicForm } from "@/features/dynamic-components/components/dynamic-form";
import {
  studentFormData,
  studentFormDataSchema,
} from "@/features/music-school-management/types/schemas";
import { useStudentFields } from "@/features/dynamic-components/schemas/student-field";

export default function StudentDynamicFormPage() {
  const studentFields = useStudentFields();

  const defaultValues: studentFormData = {
    name: "",
    number: undefined,
    email: "",
    birthDate: undefined,
    gender: undefined,
    courseIds: [],
    address: "",
    image: undefined,
    phone: "",
    rollNumber: "",
    parentName: "",
    parentPhone: "",
    notes: "",
    joinedAt: undefined,
  };

  return (
    <div className="p-6">
      <DynamicForm
        title="Add New Student"
        schema={studentFormDataSchema}
        fields={studentFields}
        onSubmit={(data) => console.log(data)}
        submitLabel="Create Student"
        defaultValues={defaultValues}
      />
    </div>
  );
}
