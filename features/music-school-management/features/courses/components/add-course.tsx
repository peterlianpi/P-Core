"use client";

import { CourseFormData } from "@/features/music-school-management/types/schemas";
import { toast } from "sonner";
import { useData } from "@/providers/data-provider";
import { useCreateCourse } from "../api/use-create-course";
import { useEffect, useState } from "react";
import { CourseForm } from "./course-form";
import StudentFormSkeleton from "../../students-management/components/student-form-skeleton";

export default function AddCourseFormPage() {
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
  const createCourseMutation = useCreateCourse({ orgId });

  // Course data fetching
  // This will fetch the available courses for the student to enroll in

  // Handle form submission
  // This function will be called when the form is submitted
  const handleSave = (values: CourseFormData) => {
    createCourseMutation.mutate(
      {
        ...values,
        price: values.price ? parseFloat(values.price.toString()) : 0,
        duration: values.duration
          ? parseInt(values.duration.toString())
          : undefined,
      },
      {
        onSuccess: () => {
          toast.success(`Course ${values.name} added successfully!`);
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
  const defaultValues: CourseFormData = {
    name: "",
    level: undefined,
    description: "",
    startDate: undefined,
    endDate: undefined,
    duration: undefined,
    price: "0",
    isActive: true,
    isArchived: false,
    status: "ACTIVE",
  };

  return (
    <div className="mt-4">
      <CourseForm
        title="Add New Course"
        onSubmit={handleSave}
        defaultValues={defaultValues}
      />
    </div>
  );
}
