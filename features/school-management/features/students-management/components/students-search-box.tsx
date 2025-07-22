import { useData } from "@/providers/data-provider";
import { useEffect, useState } from "react";
import { StudentFormData } from "@/features/school-management/types/schemas";
import { usePagination } from "@/helpers/use-pagination";
import { useSearchStudents } from "../api/use-search-students";
import ErrorBox from "@/components/error-box";
import { SearchBar } from "@/components/use-server-table-with-search/search-bar";
import { DataTable } from "@/components/use-server-table-with-search/data-table";
import { useGetCourses } from "../../courses/api/use-get-courses";
import { getStudentColumns } from "@/app/(protected)/music-school-management/students/_components/columns";

type Props = {
  students: StudentFormData[];
  items: number;
};

export default function SearchStudentPage({ students, items }: Props) {
  const [searchQuery, setSearchQuery] = useState(""); // Track search input
  const { orgId, setLoading } = useData();
  const { take, skip, onPaginationChange, pagination } = usePagination();
  const [total, setTotal] = useState(items);
  const [myMembers, setMyMembers] = useState<StudentFormData[]>(students);

  // Call the hook **at the top level** of the component
  const { data, isLoading, isError, error } = useSearchStudents(
    take,
    skip,
    searchQuery,
    orgId
  );
  const { data: courses, isLoading: isLoadingCourses } = useGetCourses({
    orgId,
  });

  const columns = getStudentColumns(courses ?? []);

  useEffect(() => {
    if (isLoading || isLoadingCourses) {
      setLoading(isLoading);
    }
  }, [isLoading, isLoadingCourses, setLoading]);

  // Update myMembers and total based on search query and API response
  useEffect(() => {
    // Extract students data safely
    const searchStudents = data?.data || [];

    const students: StudentFormData[] = searchStudents.map((student) => ({
      id: student.id,
      number: student.number ?? undefined,
      name: student.name,
      email: student.email ?? "",
      phone: student.phone ?? "",
      birthDate: student.birthDate ? new Date(student.birthDate) : undefined,
      gender: student.gender ?? undefined,
      image: student.image ?? "",
      rollNumber: student.rollNumber ?? "",
      parentName: student.parentName ?? "",
      parentPhone: student.parentPhone ?? "",
      notes: student.notes ?? "",
      address: student.address ?? "",
      courseIds: student.courses?.map((c) => c.course.id) ?? [],
      isActive: student.isActive ?? true,
      isArchived: student.isArchived ?? false,
      isDeleted: student.isDeleted ?? false,
      isProspect: student.isProspect ?? false,
      joinedAt: student.joinedAt ? new Date(student.joinedAt) : new Date(),
      orgId: student.orgId || orgId,
      status: student.isActive
        ? "ACTIVE"
        : student.isArchived
          ? "ARCHIVED"
          : student.isProspect
            ? "PROSPECT"
            : "SELECT",
    }));

    setMyMembers(students);
    setTotal(data?.totalItems ?? 0);
  }, [data?.data, data?.totalItems, error, orgId]);

  if (isError) {
    return <ErrorBox error={error} />;
  }

  // Handle search updates
  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update searchQuery state
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4 px-2 border rounded-md py-4">
        <SearchBar onSearch={handleSearch} placeholder="Search ..." />
      </div>
      <DataTable
        data={myMembers}
        items={total}
        columns={columns}
        searchField="name"
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />
    </section>
  );
}
