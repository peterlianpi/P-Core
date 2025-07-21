"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, GraduationCap } from "lucide-react";

import { useData } from "@/providers/data-provider";
import { useGetStudents } from "@/features/music-school-management/features/students-management/api/use-get-students";
import { useRouter } from "next/navigation";
import SearchStudentPage from "@/features/music-school-management/features/students-management/components/students-search-box";
import { useImportData } from "@/components/import-data/import-helper/import-data";
import { useBulkCreateStudents } from "@/features/music-school-management/features/students-management/api/use-bulk-create-students";
import { ImportCard } from "@/components/import-data/import-card";
import { StudentActions } from "@/features/music-school-management/features/students-management/components/add-import-student";

export default function StudentsPage() {
  const { orgId } = useData();
  const router = useRouter();
  const { data: students, isLoading } = useGetStudents({ orgId });
  const createStudents = useBulkCreateStudents(orgId);

  const {
    variant,
    VARIANTS,
    importResults,
    onUpload,
    onCancelImport,
    onSubmitImport,
  } = useImportData({ entity: "Students", createMutation: createStudents });

  const handleAddNew = () => {
    router.push("/music-school-management/students/add");
  };

  // all students
  const allStudents = students?.data
    ? students.data.map((student) => ({
        id: student.id,
        number: student.number ?? undefined,
        name: student.name,
        email: student.email ?? "",
        phone: student.phone ?? "",
        birthDate: student.birthDate ? new Date(student.birthDate) : undefined,
        image: student.image ?? "",
        parentName: student.parentName ?? "",
        parentPhone: student.parentPhone ?? "",
        joinedAt: student.joinedAt ? new Date(student.joinedAt) : undefined,
        isActive: student.isActive,
        isArchived: student.isArchived,
        isDeleted: student.isDeleted,
        isProspect: student.isProspect,
        address: student.address ?? "",
        rollNumber: student.rollNumber ?? "",
        orgId: student.orgId,
        courseIds: student.courses?.map((c) => c.course.id) ?? [],
      }))
    : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const stats = {
    total: students?.data.length ?? 0,
    active: students?.data.filter((s) => s.isActive).length ?? 0,
    inactive: students?.data.filter((s) => s.isArchived).length ?? 0,
    graduated: students?.data.filter((s) => s.isProspect).length ?? 0,
  };

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ImportCard
          entity="Students"
          data={importResults.data}
          requiredFields={["name", "gender", "phone", "courses"]}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 mt-4 sm:p-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Students</h1>
            <p className="text-muted-foreground">
              Manage your music school students
            </p>
          </div>

          <div>
            <StudentActions onUpload={onUpload} handleAddNew={handleAddNew} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">enrolled students</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">currently learning</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            <UserX className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactive}</div>
            <p className="text-xs text-muted-foreground">not active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Graduated</CardTitle>
            <GraduationCap className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.graduated}</div>
            <p className="text-xs text-muted-foreground">completed courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <div>
        <SearchStudentPage
          students={allStudents}
          items={students?.totalItems ?? 0}
        />
      </div>
    </div>
  );
}
