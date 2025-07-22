"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TeachersPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <Card className="rounded-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold">
              Teacher Dashboard: Teacher Name
            </CardTitle>
            <CardDescription>
              View your upcoming lessons and student payment statuses.
            </CardDescription>
          </div>
          {/* Add any teacher-specific actions here if needed */}
        </CardHeader>
        <CardContent className="pt-4">
          <h3 className="text-xl font-semibold mb-4">My Schedule</h3>
        </CardContent>
      </Card>
      <div className="flex-1 space-y-4"></div>
    </div>
  );
}
