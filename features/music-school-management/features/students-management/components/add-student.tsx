"use client";

import { StudentForm } from "@/features/music-school-management/features/students-management/components/student-form";
import { StudentFormData } from "@/features/music-school-management/types/schemas";
import { toast } from "sonner";
import { useData } from "@/providers/data-provider";
import { useCreateStudent } from "../api/use-create-student";

export default function AddStudentFormPage() {
  // Fetching orgId from data provider
  // This is necessary to ensure the student is created under the correct organization
  // This will be used in the mutation to create a new student
  const { orgId } = useData();

  // Create student mutation
  // This will handle the creation of a new student
  const createStudentMutation = useCreateStudent({ orgId });

  // Mock courses data
  // This is used to populate the available courses in the student form
  const mockCourses = [
    {
      id: "cmd93cmvz000195ecirwf2rw6",
      name: "Piano",
      levels: ["Beginner", "Advanced"],
    },
    { id: "course2", name: "Guitar", levels: ["Beginner", "Advanced"] },
    { id: "course3", name: "Violin", levels: ["Beginner", "Advanced"] },
  ];

  // Handle form submission
  // This function will be called when the form is submitted
  const handleSave = (values: StudentFormData) => {
    createStudentMutation.mutate(values, {
      onSuccess: () => {
        toast.success(`Student ${values.name} added successfully!`);
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to add student!");
      },
    });
  };

  // Default values for the form
  // These values will be used to initialize the form fields
  const defaultValues: StudentFormData = {
    id: "", // You may want to handle this conditionally
    number: undefined,
    name: "",
    email: "",
    phone: "",
    birthDate: undefined,
    gender: undefined,
    image: "",
    rollNumber: "",
    parentName: "",
    parentPhone: "",
    notes: "",
    address: "",
    courseIds: [],
    isActive: true,
    isArchived: false,
    isDeleted: false,
    isProspect: false,
    joinedAt: new Date(),
    orgId: "",
  };

  return (
    <div className="mt-4">
      <StudentForm
        onSubmit={handleSave}
        defaultValues={defaultValues}
        availableCourses={mockCourses}
      />
    </div>
  );
}
