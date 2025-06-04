"use client";
import React from "react";
import { ModeToggle } from "../mode-toggle";
import { CustomTrigger } from "./custom-trigger";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useData } from "@/providers/data-provider";
import VersionButtonServerPage from "../version-button/server-version-button";

type Version = {
  status: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  version: string;
  description?: string | null | undefined;
};

type Props = {
  versions: Version[];
};

export default function HeaderPage({ versions }: Props) {
  const { loading } = useData();

  return (
    <div className="flex items-center gap-2 px-4">
      <CustomTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/">P-Core</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            {loading && <BreadcrumbPage>Data Fetching</BreadcrumbPage>}
            {!loading && (
              <BreadcrumbPage>
                <VersionButtonServerPage versions={versions} />
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="fixed top-2 right-4">
        <ModeToggle />
      </div>
    </div>
  );
}
