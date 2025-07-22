"use client";

import { toast } from "sonner";
import { useData } from "@/providers/data-provider";
import { useEffect, useState } from "react";
import StudentFormSkeleton from "../../students-management/components/student-form-skeleton";
import { useParams } from "next/navigation";
import { LessonBookForm } from "./lesson-book-form";
import { useGetLessonBookByIdAndOrgId } from "../api/use-get-lesson-book-by-id-and-orgId";
import { useEditLessonBook } from "../api/use-edit-lesson-book";
import { LessonBookFormData } from "@/features/school-management/types/schemas";

export default function EditLessonBookFormPage() {
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

  const { data: lessonBook, isLoading: isLessonBookLoading } =
    useGetLessonBookByIdAndOrgId({ id, orgId });

  // Create course mutation
  // This will handle the creation of a edit course
  const editLessonBookMutation = useEditLessonBook({ orgId, id: id ?? "" }); // Replace with actual course ID

  // Lesson book data fetching
  // This will fetch the available courses for the student to enroll in

  // Handle form submission
  // This function will be called when the form is submitted
  const handleSave = (values: LessonBookFormData) => {
    editLessonBookMutation.mutate(
      {
        ...values,
        price: values.price ? Number(values.price.toString()) : 0,
      },
      {
        onSuccess: () => {
          toast.success(`Lesson book ${values.title} updated successfully!`);
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update lesson book!");
        },
      }
    );
  };

  if (isLoading || isLessonBookLoading) {
    return (
      <>
        <StudentFormSkeleton />
      </>
    );
  }

  // Default values for the form
  // These values will be used to initialize the form fields
  const defaultValues: LessonBookFormData = {
    title: lessonBook?.title || "",
    courseId: lessonBook?.courseId || "",
    author: lessonBook?.author || "",
    price: lessonBook?.price.toString() || "0",
    description: lessonBook?.description || "",
    isActive: lessonBook?.isActive,
    isArchived: lessonBook?.isArchived,
    coverImage: lessonBook?.coverImage || undefined,
    publicationDate:
      new Date(lessonBook?.publicationDate ?? new Date()) || undefined,
    image: lessonBook?.coverImage || undefined,
    status: lessonBook?.isActive ? "ACTIVE" : "ARCHIVED",
  };

  return (
    <div className="mt-4">
      <LessonBookForm
        id={id}
        title="Edit Lesson book"
        onSubmit={handleSave}
        defaultValues={defaultValues}
        ConfirmDialog={null} // You can pass a confirmation dialog component if needed
        disabled={editLessonBookMutation.isPending}
      />
    </div>
  );
}
