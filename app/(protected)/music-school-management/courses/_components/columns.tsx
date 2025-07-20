"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { Member } from "@/helpers/formatMember";
import { Actions } from "./actions";
import { CenteredCell } from "@/helpers/format-table";

// Define your columns for the DataTable
export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "image", // maps to `image` in member data
    header: "Profile",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string; // Get the image URL from the data
      return (
        <Avatar className="border border-emerald-600">
          <AvatarImage src={imageUrl} alt="User Photo" />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      );
    },
  },
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
    accessorKey: "phone", // maps to `phone` in member data

    header: ({ column }) => {
      return (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      );
    }, // Hide phone on small screens
    cell: ({ row }) => {
      return <CenteredCell>{row.getValue("phone")}</CenteredCell>; // Use the reusable component
    },
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: "gender", // maps to `gender` in member data

    header: ({ column }) => {
      return (
        <CenteredCell>
          {" "}
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Gender
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      );
    }, // Hide phone on small screens
    cell: ({ row }) => {
      return <CenteredCell>{row.getValue("gender")}</CenteredCell>; // Use the reusable component
    },
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: "homeNumber", // maps to `homeNumber` in member data
    header: ({ column }) => {
      return (
        <CenteredCell>
          {" "}
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Home No.
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      );
    }, // Hide phone on small screens
    cell: ({ row }) => {
      return <CenteredCell>{row.getValue("homeNumber")}</CenteredCell>; // Use the reusable component
    },
    meta: {
      hidden: true,
    },
  },

  {
    accessorKey: "vengName", // maps to `vengName` in member data
    header: ({ column }) => {
      return (
        <CenteredCell>
          {" "}
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Veng
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      );
    },
    sortingFn: (rowA, rowB) => {
      // Sort using vengId
      const vengIdA = rowA.original.vengId as number; // Access `vengId` from the row's data
      const vengIdB = rowB.original.vengId as number; // Access `vengId` from the row's data
      return vengIdA - vengIdB; // Sort numerically
    }, // Hide phone on small screens
    cell: ({ row }) => {
      return <CenteredCell>{row.getValue("vengName")}</CenteredCell>; // Use the reusable component
    },
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: "khawkName", // maps to `khawkName` in member data

    header: ({ column }) => {
      return (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Khawk
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      );
    }, // Hide phone on small screens
    cell: ({ row }) => {
      return <CenteredCell>{row.getValue("khawkName")}</CenteredCell>; // Use the reusable component
    },
    meta: {
      hidden: true,
    },
  },
  {
    accessorKey: "roles", // maps to `roles` in member data
    header: ({ column }) => {
      return (
        <CenteredCell>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Roles
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </CenteredCell>
      );
    },
    cell: (info) => {
      const roles = info.getValue() as string[]; // Cast to string array
      return roles.join(", "); // Safely call join on the string array
    }, // Hide phone on small screens
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
