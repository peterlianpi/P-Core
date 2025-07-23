"use client";

import { DynamicForm } from "@/features/dynamic-components/components/dynamic-form";
import { useScheduleFields } from "@/features/dynamic-components/schemas/schedule-field";
import {
  ScheduleFormData,
  scheduleFormSchema,
} from "@/features/school-management/types/schemas/schedule";

interface ScheduleFormProps {
  title: string;
  defaultValues?: ScheduleFormData;
  onSubmit: (values: ScheduleFormData) => void;
  disabled?: boolean;
  ConfirmDialog?: React.FC<{ children: React.ReactNode }> | null;
  id?: string;
}

export function ScheduleForm({
  title,
  defaultValues,
  onSubmit,
  id,
}: ScheduleFormProps) {
  const scheduleFields = useScheduleFields();

  const handleSubmit = async (values: ScheduleFormData) => {
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
        schema={scheduleFormSchema}
        fields={scheduleFields}
        onSubmit={handleSubmit}
        imageType="material"
        submitLabel="Schedule"
        defaultValues={defaultValues}
      />
    </>
  );
}
