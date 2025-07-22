"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/use-client-table/data-table";
import { columns } from "./_components/columns";
import { useData } from "@/providers/data-provider";
import { useGetLessonBooks } from "@/features/school-management/features/lesson-books/api/use-get-lesson-books";
import StudentFormSkeleton from "@/features/school-management/features/students-management/components/student-form-skeleton";

export default function LessonBooksPage() {
  const { orgId } = useData();
  const { data: fetchedLessonBooks, isLoading } = useGetLessonBooks({ orgId });
  const router = useRouter();

  if (isLoading) {
    return <StudentFormSkeleton />;
  }

  const lessonBooks =
    fetchedLessonBooks &&
    fetchedLessonBooks.map((l) => {
      return {
        id: l.id,
        title: l.title,
        description: l.description || "",
        isActive: l.isActive,
        course: l.course.name,
        price: l.price,

        author: l.author || "",
        coverImage: l.coverImage || undefined,
      };
    });

  const handleAddBook = () => {
    router.push("/school-management/lesson-books/add");
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <Card className="rounded-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold">Lesson Books</CardTitle>
            <CardDescription>
              Manage your music school&apos;s lesson book inventory.
            </CardDescription>
          </div>
          <Button
            onClick={handleAddBook}
            className="w-full sm:w-auto rounded-lg"
          >
            Add New Book
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          <DataTable
            columns={columns}
            data={lessonBooks ?? []}
            searchField="title"
          />
        </CardContent>
      </Card>
    </div>
  );
}
