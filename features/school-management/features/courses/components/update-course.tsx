"use client";

import { CourseFormData } from "@/features/school-management/types/schemas";
import { toast } from "sonner";
import { useData } from "@/providers/data-provider";
import { useEffect, useState } from "react";
import { CourseForm } from "./course-form";
import StudentFormSkeleton from "../../students-management/components/student-form-skeleton";
import { useEditCourse } from "../api/use-edit-course";
import { useParams } from "next/navigation";
import { useGetCourseByIdAndOrgId } from "../api/use-get-course-by-id-and-orgId";

export default function EditCourseFormPage() {
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

  const { data: courseData, isLoading: isCourseLoading } =
    useGetCourseByIdAndOrgId({ id, orgId });

  // Create course mutation
  // This will handle the creation of a edit course
  const editCourseMutation = useEditCourse({ orgId, id: id ?? "" }); // Replace with actual course ID

  // Course data fetching
  // This will fetch the available courses for the student to enroll in

  // Handle form submission
  // This function will be called when the form is submitted
  const handleSave = (values: CourseFormData) => {
    editCourseMutation.mutate(
      {
        ...values,
        price: values.price ? parseFloat(values.price.toString()) : 0,
        duration: values.duration
          ? parseInt(values.duration.toString())
          : undefined,
      },
      {
        onSuccess: () => {
          toast.success(`Course ${values.name} updated successfully!`);
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update course!");
        },
      }
    );
  };

  if (isLoading || isCourseLoading) {
    return (
      <>
        <StudentFormSkeleton />
      </>
    );
  }

  // Default values for the form
  // These values will be used to initialize the form fields
  const defaultValues: CourseFormData = {
    name: courseData?.name || "",
    level: courseData?.level || undefined,
    description: courseData?.description || "",
    startDate: courseData?.startDate
      ? new Date(courseData.startDate)
      : undefined,
    duration: courseData?.duration ? courseData.duration.toString() : undefined,
    price: courseData?.price ? courseData.price.toString() : "0",
    endDate: courseData?.endDate ? new Date(courseData.endDate) : undefined,
    status: courseData?.isActive ? "ACTIVE" : "ARCHIVED",
  };

  return (
    <div className="mt-4">
      <CourseForm
        id={id}
        title="Edit Course"
        onSubmit={handleSave}
        defaultValues={defaultValues}
        ConfirmDialog={null} // You can pass a confirmation dialog component if needed
        disabled={editCourseMutation.isPending}
      />
    </div>
  );
}
