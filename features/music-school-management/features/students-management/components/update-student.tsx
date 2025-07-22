"use client";

import { StudentForm } from "@/features/music-school-management/features/students-management/components/student-form";
import { studentFormData } from "@/features/music-school-management/types/schemas";
import { useGetStudentByIdAndOrgId } from "../api/use-get-student-by-id-and-orgId";

import { useData } from "@/providers/data-provider";
import { toast } from "sonner";
import { useEditStudent } from "../api/use-edit-student";
import StudentFormSkeleton from "./student-form-skeleton";
import { useParams } from "next/navigation";

export default function EditStudentFormPage() {
  const { orgId } = useData();
  const params = useParams();
  const id = params.id as string;
  // ||
  // "cmd939z07000095ec1xbgcf95"; // Use fallback only for dev
  const { data: fetchedStudent, isLoading } = useGetStudentByIdAndOrgId({
    id,
    orgId,
  });

  const editStudentMutation = useEditStudent({ orgId, id });

  const defaultValues: studentFormData = fetchedStudent
    ? {
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
        joinedAt: fetchedStudent.joinedAt
          ? new Date(fetchedStudent.joinedAt)
          : new Date(),
        status: fetchedStudent.isActive
          ? "ACTIVE"
          : fetchedStudent.isArchived
            ? "ARCHIVED"
            : fetchedStudent.isProspect
              ? "PROSPECT"
              : "ACTIVE",
      }
    : {
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
        isProspect: false,
        joinedAt: new Date(),
      };

  const handleSave = (data: studentFormData) => {
    editStudentMutation.mutate(data, {
      onSuccess: () => {
        toast.success(`Student "${data.name}" updated successfully.`);
      },
      onError: (error) => {
        toast.error(`${error.message || "Failed to update student!"}`);
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

  return (
    <>
      <StudentForm
        id={id}
        disabled={isLoading}
        title="Edit Student"
        onSubmit={handleSave}
        defaultValues={defaultValues}
      />
    </>
  );
}
