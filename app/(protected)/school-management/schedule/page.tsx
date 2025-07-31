import { SchedulesTable } from "@/features/school-management/features/schedule/components/schedules-table"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Class Schedule</h1>
        <p className="text-muted-foreground">
          Manage class schedules, assign rooms, and track course timings.
        </p>
      </div>
      
      <Suspense fallback={<SchedulesTableSkeleton />}>
        <SchedulesTable />
      </Suspense>
    </div>
  )
}

function SchedulesTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <div className="space-y-1">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-16 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
