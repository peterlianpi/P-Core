"use client";

import { useState } from "react";
import { StudentForm } from "@/features/music-school-management/features/students-management/components/student-form";
import { StudentFormData } from "@/features/music-school-management/types/schemas";
import { useSelectedOrg } from "@/features/org/context/selected-org-context";
import { useGetStudentByIdAndOrgId } from "../api/use-get-student-by-id-and-orgId";
import { useParams } from "next/navigation";

export default function EditStudentFormPage() {
  const { selectedOrgId } = useSelectedOrg();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const id = params.id as string;
  const { data: fetchedStudent, isLoading: isFetchingStudent } =
    useGetStudentByIdAndOrgId({ id, orgId: selectedOrgId });

  const student: StudentFormData | undefined = fetchedStudent
    ? {
        id: fetchedStudent.id,
        number: fetchedStudent.number ?? undefined,
        name: fetchedStudent.name,
        email: fetchedStudent.email ?? undefined,
        phone: fetchedStudent.phone ?? undefined,
        birthDate: fetchedStudent.birthDate
          ? new Date(fetchedStudent.birthDate)
          : undefined,
        gender: fetchedStudent.gender ?? undefined,
        image: fetchedStudent.image ?? undefined,
        rollNumber: fetchedStudent.rollNumber ?? undefined,
        parentName: fetchedStudent.parentName ?? undefined,
        parentPhone: fetchedStudent.parentPhone ?? undefined,
        notes: fetchedStudent.notes ?? undefined,
        address: fetchedStudent.address ?? undefined,
        courseIds: fetchedStudent.courses?.map((c) => c.course.id) ?? [],
        isActive: fetchedStudent.isActive ?? true,
        isArchived: fetchedStudent.isArchived ?? false,
        isDeleted: fetchedStudent.isDeleted ?? false,
        isProspect: fetchedStudent.isProspect ?? false,
        joinedAt: fetchedStudent.joinedAt
          ? new Date(fetchedStudent.joinedAt)
          : new Date(),
        orgId: fetchedStudent.orgId || selectedOrgId,
      }
    : undefined;

  const mockCourses = [
    { id: "course1", name: "Piano", levels: ["Beginner", "Advanced"] },
    { id: "course2", name: "Guitar", levels: ["Beginner", "Advanced"] },
    { id: "course3", name: "Violin", levels: ["Beginner", "Advanced"] },
  ];

  const handleSave = (data: StudentFormData) => {
    console.log("📦 Submitted Student Data:", data);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Open Student Form
      </button>

      <StudentForm
        open={open}
        onOpenChange={setOpen}
        onSave={handleSave}
        availableCourses={mockCourses}
        student={student} // ✅ Pass the transformed one
      />

      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={isFetchingStudent}
      >
        {isFetchingStudent ? "Loading..." : "Open Student Form"}
      </button>

      <div className="mt-4">
        <pre>
          {student ? JSON.stringify(student, null, 2) : "No student data yet."}
        </pre>
      </div>
    </div>
  );
}
