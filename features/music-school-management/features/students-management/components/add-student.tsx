"use client";

import { useState } from "react";
import { StudentForm } from "@/features/music-school-management/features/students-management/components/student-form";
import { StudentFormData } from "@/features/music-school-management/types/schemas";
import { toast } from "sonner";

export default function AddStudentFormPage() {
  // const { orgId } = useData();
  const [student, setStudent] = useState<StudentFormData | undefined>({
    // Initialize with empty values or student data if available
    id: "", // You may want to handle this conditionally
    number: undefined,
    name: "",
    email: "",
    phone: "",
    birthDate: new Date(),
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
  });

  // const createStudentMutation = useCreateStudent({ orgId });

  const mockCourses = [
    {
      id: "cmd93cmvz000195ecirwf2rw6",
      name: "Piano",
      levels: ["Beginner", "Advanced"],
    },
    { id: "course2", name: "Guitar", levels: ["Beginner", "Advanced"] },
    { id: "course3", name: "Violin", levels: ["Beginner", "Advanced"] },
  ];

  const handleSave = (values: StudentFormData) => {
    toast("Saved changed!");
    setStudent(values);
    console.log("Create student!");
    // createStudentMutation.mutate(values, {
    //   onSuccess: () => {
    //     console.log(`Student ${values.name} added successfully:`);
    //     setOpen(false);
    //   },
    //   onError: (error) => {
    //     console.error("Failed to add student:", error);
    //   },
    // });
  };

  return (
    <div className="p-4">
      <StudentForm
        onSubmit={handleSave}
        defaultValues={student}
        availableCourses={mockCourses}
      />

      <br />

      <div className="mt-4">
        <pre>{student ? JSON.stringify(student, null, 2) : "No student"}</pre>
      </div>
    </div>
  );
}
