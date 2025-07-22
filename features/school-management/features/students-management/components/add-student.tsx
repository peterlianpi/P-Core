"use client";

import { StudentForm } from "@/features/school-management/features/students-management/components/student-form";
import { studentFormData } from "@/features/school-management/types/schemas";
import { toast } from "sonner";
import { useData } from "@/providers/data-provider";
import { useCreateStudent } from "../api/use-create-student";
import StudentFormSkeleton from "./student-form-skeleton";
import { useEffect, useState } from "react";

export default function AddStudentFormPage() {
  // Fetching orgId from data provider
  // This is necessary to ensure the student is created under the correct organization
  // This will be used in the mutation to create a new student
  const { orgId } = useData();
  const [isLoading, setIsLoading] = useState(true);

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

  // Create student mutation
  // This will handle the creation of a new student
  const createStudentMutation = useCreateStudent({ orgId });

  // Course data fetching
  // This will fetch the available courses for the student to enroll in

  // Handle form submission
  // This function will be called when the form is submitted
  const handleSave = (values: studentFormData) => {
    createStudentMutation.mutate(values, {
      onSuccess: () => {
        toast.success(`Student ${values.name} added successfully!`);
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to add student!");
      },
    });
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
  const defaultValues: studentFormData = {
    number: undefined,
    name: "",
    email: "",
    phone: "",
    birthDate: undefined,
    gender: undefined,
    image: "",
    rollNumber: undefined,
    parentName: "",
    parentPhone: "",
    notes: "",
    address: "",
    courseIds: [],
    joinedAt: new Date(),
    status: "ACTIVE",
  };

  return (
    <div className="mt-4">
      <StudentForm
        title="Add New Student"
        onSubmit={handleSave}
        defaultValues={defaultValues}
      />
    </div>
  );
}
