"use client";

import { toast } from "sonner";
import { useData } from "@/providers/data-provider";
import { useCreateLessonBook } from "../api/use-create-lesson-book";
import { useEffect, useState } from "react";
import StudentFormSkeleton from "../../students-management/components/student-form-skeleton";
import { LessonBookForm } from "./lesson-book-form";
import { LessonBookFormData } from "@/features/school-management/types/schemas";

export default function AddLessonBookFormPage() {
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
  const createLessonBookMutation = useCreateLessonBook({ orgId });

  // Lesson book data fetching
  // This will fetch the available courses for the student to enroll in

  // Handle form submission
  // This function will be called when the form is submitted
  const handleSave = (values: LessonBookFormData) => {
    createLessonBookMutation.mutate(
      {
        ...values,
        price: values.price ? parseFloat(values.price.toString()) : 0,
      },
      {
        onSuccess: () => {
          toast.success(`Lesson book ${values.title} added successfully!`);
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
  const defaultValues: LessonBookFormData = {
    title: "",
    courseId: "",
    author: "",
    price: "0",
    description: "",
    isActive: true,
    isArchived: false,
    isDeleted: false,
    coverImage: undefined,
    publicationDate: undefined,
    image: undefined,
    status: "ACTIVE",
  };

  return (
    <div className="mt-4">
      <LessonBookForm
        title="Add Lesson book"
        onSubmit={handleSave}
        defaultValues={defaultValues}
      />
    </div>
  );
}
