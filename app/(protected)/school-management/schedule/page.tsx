"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScheduleTabs } from "@/features/school-management/features/schedule/components/schedule-tabs";

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-6 p-2 md:p-4">
      <Card className="rounded-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold">Schedule</CardTitle>
            <CardDescription>
              Manage your music school&apos;s lesson schedule.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          {/* <ScheduleTabs /> */}
        </CardContent>
      </Card>
    </div>
  );
}
