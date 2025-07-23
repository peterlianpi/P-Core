"use client";

import { toast } from "sonner";
import { useData } from "@/providers/data-provider";
import { useEffect, useState } from "react";
import StudentFormSkeleton from "../../students-management/components/student-form-skeleton";
import { useParams } from "next/navigation";
import { useGetScheduleByIdAndOrgId } from "../api/use-get-schedule-by-id-and-orgId";
import { useEditSchedule } from "../api/use-edit-schedule";
import { ScheduleFormData } from "@/features/school-management/types/schemas";
import { ScheduleForm } from "./schedule-form";

export default function EditScheduleFormPage() {
  // Fetching orgId from data provider
  // This is necessary to ensure the course is created under the correct organization
  // This will be used in the mutation to create a new course
  const { orgId } = useData();
  const [isLoading, setIsLoading] = useState(true);
  const param = useParams();
  const id = param.id as string;

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

  const { data: scheduleData, isLoading: isScheduleLoading } =
    useGetScheduleByIdAndOrgId({ id, orgId });

  // Create course mutation
  // This will handle the creation of a edit course
  const editScheduleMutation = useEditSchedule({ orgId, id: id ?? "" }); // Replace with actual course ID

  // Schedule data fetching
  // This will fetch the available courses for the student to enroll in

  // Handle form submission
  // This function will be called when the form is submitted
  const handleSave = (values: ScheduleFormData) => {
    editScheduleMutation.mutate(
      {
        ...values,
        teacherId: values.teacherId ?? "",
      },
      {
        onSuccess: () => {
          toast.success(`Schedule updated successfully!`);
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update course!");
        },
      }
    );
  };

  if (isLoading || isScheduleLoading) {
    return (
      <>
        <StudentFormSkeleton />
      </>
    );
  }

  // Default values for the form
  // These values will be used to initialize the form fields
  const defaultValues: ScheduleFormData = {
    courseId: scheduleData?.courseId || "",
    roomId: scheduleData?.roomId || "",
    dayOfWeek: scheduleData?.dayOfWeek || 0,
    startTime: new Date(scheduleData?.startTime ?? "") || new Date(),
    endTime: new Date(scheduleData?.endTime ?? "") || new Date(),
    teacherId: scheduleData?.teacherId || "",
    status: scheduleData?.isActive ? "ACTIVE" : "ARCHIVED",
  };

  return (
    <div className="mt-4">
      <ScheduleForm
        id={id}
        title="Edit Schedule"
        onSubmit={handleSave}
        defaultValues={defaultValues}
        ConfirmDialog={null} // You can pass a confirmation dialog component if needed
        disabled={editScheduleMutation.isPending}
      />
    </div>
  );
}
