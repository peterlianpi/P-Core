"use client";

import { ScheduleFormData } from "@/features/school-management/types/schemas";
import { toast } from "sonner";
import { useData } from "@/providers/data-provider";
import { useEffect, useState } from "react";
import { useCreateSchedule } from "../api/use-create-schedule";
import StudentFormSkeleton from "../../students-management/components/student-form-skeleton";
import { ScheduleForm } from "./schedule-form";

export default function AddScheduleFormPage() {
  // Fetching orgId from data provider
  // This is necessary to ensure the course is created under the correct organization
  // This will be used in the mutation to create a new course
  const { orgId } = useData();
  const [isLoading, setIsLoading] = useState(true);

  // Set loading state to true when orgId is available
  useEffect(() => {
    if (orgId) {
      setIsLoading(true);
    }
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [orgId]);

  // Create course mutation
  // This will handle the creation of a new course
  const createScheduleMutation = useCreateSchedule({ orgId });

  // Schedule data fetching
  // This will fetch the available courses for the student to enroll in

  // Handle form submission
  // This function will be called when the form is submitted
  const handleSave = (values: ScheduleFormData) => {
    createScheduleMutation.mutate(
      {
        ...values,
      },
      {
        onSuccess: () => {
          toast.success(`Schedule ${values.name} added successfully!`);
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to add course!");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <>
        <StudentFormSkeleton />
      </>
    );
  }

  // Default values for the form
  // These values will be used to initialize the form fields
  const defaultValues: ScheduleFormData = {
    isActive: true,
    isArchived: false,
    status: "ACTIVE",
  };

  return (
    <div className="mt-4">
      <ScheduleForm
        title="Add New Schedule"
        onSubmit={handleSave}
        defaultValues={defaultValues}
      />
    </div>
  );
}
