"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Actions } from "./actions";
 import { CustomCourseFormData } from "@/features/school-management/types/schemas";
import { CenteredCell } from "@/lib/utils/format-table";

// Define your columns for the DataTable
export const columns: ColumnDef<CustomCourseFormData>[] = [
  // {
  //   accessorKey: "image", // maps to `image` in member data
  //   header: "Profile",
  //   cell: ({ row }) => {
  //     const imageUrl = row.getValue("image") as string; // Get the image URL from the data
  //     return (
  //       <Avatar className="border border-emerald-600">
  //         <AvatarImage src={imageUrl} alt="User Photo" />
  //         <AvatarFallback className="bg-sky-500">
  //           <FaUser className="text-white" />
  //         </AvatarFallback>
  //       </Avatar>
  //     );
  //   },
  // },
  {
    accessorKey: "name", // maps to `name` in member data

    header: ({ column }) => {
      return (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      );
    },
  },

  {
    accessorKey: "price", // maps to `phone` in member data

    header: ({ column }) => {
      return (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      );
    }, // Hide phone on small screens
    cell: ({ row }) => {
      return <CenteredCell>{row.getValue("price")}</CenteredCell>; // Use the reusable component
    },
    meta: {
      hidden: false,
    },
  },
  {
    accessorKey: "level", // maps to `gender` in member data

    header: ({ column }) => {
      return (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Level
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      );
    }, // Hide phone on small screens
    cell: ({ row }) => {
      return <CenteredCell>{row.getValue("level")}</CenteredCell>; // Use the reusable component
    },
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: "isActive", // maps to `homeNumber` in member data
    header: ({ column }) => {
      return (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
          </Button>
        </CenteredCell>
      );
    }, // Hide phone on small screens
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
    accessorKey: "description", // maps to `vengName` in member data
    header: ({ column }) => {
      return (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      );
    },

    meta: {
      hidden: true,
    },
  },
  {
    id: "actions",
    header: () => {
      return <CenteredCell>Actions</CenteredCell>;
    },
    cell: ({ row }) => {
      const id = row.original.id; // Access the member's ID
      return (
        <CenteredCell>
          <Actions id={id.toString()} />
        </CenteredCell>
      );
    },
  },
];
