"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetCourses } from "@/features/music-school-management/features/courses/api/use-get-courses";
import { useData } from "@/providers/data-provider";
import { DataTable } from "@/components/use-client-table/data-table";
import { columns } from "./_components/columns";
export default function CoursesPage() {
  const { orgId } = useData();
  const router = useRouter();
  const { data: courses, isLoading } = useGetCourses({ orgId });

  const handleAddNew = () => {
    router.push("/music-school-management/courses/add");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!courses) {
    return <p>No Courses yet!</p>;
  }

  return (
    <div className="flex flex-col gap-6 mt-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
            <p className="text-muted-foreground">
              Manage your music school courses and levels
            </p>
          </div>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses?.length ?? 0}</div>
            <p className="text-xs text-muted-foreground">
              {courses.filter((c) => c.isActive).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Fee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {Math.round(
                courses.reduce((sum, c) => sum + c.price, 0) / courses.length
              )}
            </div>
            <p className="text-xs text-muted-foreground">per month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Levels</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* {courses.reduce((sum, c) => sum + c?.level?.length, 0)} */}
            </div>
            <p className="text-xs text-muted-foreground">across all courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>
            A list of all courses in your music school
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={courses} searchField="name" />
        </CardContent>
      </Card>
    </div>
  );
}
