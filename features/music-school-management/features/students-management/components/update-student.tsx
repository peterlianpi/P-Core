"use client";

import { StudentForm } from "@/features/music-school-management/features/students-management/components/student-form";
import { StudentFormData } from "@/features/music-school-management/types/schemas";
import { useGetStudentByIdAndOrgId } from "../api/use-get-student-by-id-and-orgId";
import { useParams } from "next/navigation";
import { useData } from "@/providers/data-provider";
import { useEditStudent } from "../api/use-edit-student";

export default function EditStudentFormPage() {
  const { orgId } = useData();
  const params = useParams();
  const id = (params.id as string) || "cmd939z07000095ec1xbgcf95"; // Use fallback only for dev

  const { data: fetchedStudent, isLoading } = useGetStudentByIdAndOrgId({
    id,
    orgId,
  });

  const editStudentMutation = useEditStudent({ orgId, id });

  const mockCourses = [
    {
      id: "cmd93cmvz000195ecirwf2rw6",
      name: "Piano",
      levels: ["Beginner", "Advanced"],
    },
    { id: "course2", name: "Guitar", levels: ["Beginner", "Advanced"] },
    { id: "course3", name: "Violin", levels: ["Beginner", "Advanced"] },
  ];

  const defaultValues: StudentFormData = fetchedStudent
    ? {
        id: fetchedStudent.id,
        number: fetchedStudent.number ?? undefined,
        name: fetchedStudent.name,
        email: fetchedStudent.email ?? "",
        phone: fetchedStudent.phone ?? "",
        birthDate: fetchedStudent.birthDate
          ? new Date(fetchedStudent.birthDate)
          : undefined,
        gender: fetchedStudent.gender ?? undefined,
        image: fetchedStudent.image ?? "",
        rollNumber: fetchedStudent.rollNumber ?? "",
        parentName: fetchedStudent.parentName ?? "",
        parentPhone: fetchedStudent.parentPhone ?? "",
        notes: fetchedStudent.notes ?? "",
        address: fetchedStudent.address ?? "",
        courseIds: fetchedStudent.courses?.map((c) => c.course.id) ?? [],
        isActive: fetchedStudent.isActive ?? true,
        isArchived: fetchedStudent.isArchived ?? false,
        isDeleted: fetchedStudent.isDeleted ?? false,
        isProspect: fetchedStudent.isProspect ?? false,
        joinedAt: fetchedStudent.joinedAt
          ? new Date(fetchedStudent.joinedAt)
          : new Date(),
        orgId: fetchedStudent.orgId || orgId,
      }
    : {
        id: "",
        number: undefined,
        name: "",
        email: "",
        phone: "",
        birthDate: new Date(),
        gender: "MALE",
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
        orgId: orgId,
      };

  const handleSave = (data: StudentFormData) => {
    console.log("Student information:", data);

    console.log("Update student!");
    editStudentMutation.mutate(data, {
      onSuccess: () => {
        console.log(`Student ${data.name} updated successfully:`);
      },
      onError: (error) => {
        console.error("Failed to update student:", error);
      },
    });
  };

  return (
    <>
      <StudentForm
        id={id}
        disabled={isLoading}
        onSubmit={handleSave}
        availableCourses={mockCourses}
        defaultValues={defaultValues}
      />
    </>
  );
}
