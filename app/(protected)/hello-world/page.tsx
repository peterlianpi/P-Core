"use client";

import { DynamicForm } from "@/features/dynamic-components/components/dynamic-form";
import { studentFields } from "@/features/dynamic-components/schemas/student-field";
import { studentFormDataSchema } from "../../../features/music-school-management/types/schemas/index";
import { studentFormData } from "@/features/music-school-management/types/schemas";

export default function StudentDynamicFormPage() {
  const defaultValues: studentFormData = {
    name: "",
    isActive: false,
    isArchived: false,
    isDeleted: false,
    isProspect: false,
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
      <h2 className="text-xl font-semibold mb-4">Dynamic Student Form</h2>
      <DynamicForm
        schema={studentFormDataSchema}
        fields={studentFields}
        onSubmit={(data) => console.log(data)}
        submitLabel="Create Student"
        defaultValues={defaultValues}
      />
    </div>
  );
}
