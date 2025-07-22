"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { Actions } from "./actions";
import { CenteredCell } from "@/helpers/format-table";
import { StudentFormData } from "@/features/music-school-management/types/schemas";

type CourseInfo = {
  id: string;
  name: string;
  levels?: string[];
};

export function getStudentColumns(
  courses: CourseInfo[]
): ColumnDef<StudentFormData>[] {
  return [
    {
      accessorKey: "image",
      header: "Profile",
      cell: ({ row }) => {
        const imageUrl = row.getValue("image") as string;
        return (
          <Avatar className="border border-emerald-600">
            <AvatarImage src={imageUrl} alt="User Photo" />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
        );
      },
      meta: { hidden: true },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      ),
      cell: ({ row }) => <CenteredCell>{row.getValue("name")}</CenteredCell>,
    },
    {
      accessorKey: "phone",
      header: ({ column }) => (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      ),
      cell: ({ row }) => <CenteredCell>{row.getValue("phone")}</CenteredCell>,
      meta: { hidden: true },
    },
    {
      accessorKey: "gender",
      header: ({ column }) => (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Gender
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      ),
      cell: ({ row }) => <CenteredCell>{row.getValue("gender")}</CenteredCell>,
      meta: { hidden: true },
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
          </Button>
        </CenteredCell>
      ),
      cell: ({ row }) =>
        row.getValue("isActive") ? (
          <CenteredCell>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CenteredCell>
        ) : (
          <CenteredCell>
            <XCircle className="h-4 w-4 text-red-500" />
          </CenteredCell>
        ),
    },
    {
      accessorKey: "courseIds",
      header: ({ column }) => (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Courses
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      ),
      cell: ({ row }) => {
        const courseIds = row.getValue("courseIds") as string[];
        const courseNames = courseIds
          .map((id) => {
            const found = courses.find((c) => c.id === id);
            return found?.name ?? "Unknown";
          })
          .join(", ");

        return <CenteredCell>{courseNames || "No courses"}</CenteredCell>;
      },
      meta: { hidden: false },
    },
    {
      accessorKey: "parentName",
      header: ({ column }) => (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Parent Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      ),
      cell: ({ row }) => (
        <CenteredCell>{row.getValue("parentName")}</CenteredCell>
      ),
      meta: { hidden: true },
    },
    {
      accessorKey: "roles",
      header: ({ column }) => (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Roles
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      ),
      cell: ({ row }) => {
        const roles = row.getValue("roles") as string[] | undefined;
        return <CenteredCell>{roles?.join(", ") ?? "-"}</CenteredCell>;
      },
      meta: { hidden: true },
    },
    {
      id: "actions",
      header: () => <CenteredCell>Actions</CenteredCell>,
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <CenteredCell>
            <Actions id={id.toString()} />
          </CenteredCell>
        );
      },
    },
  ];
}
