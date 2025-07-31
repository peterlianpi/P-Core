import { CoursesTable } from "@/features/school-management/features/courses/components/courses-table"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoursesPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          Manage your courses, set pricing, and track student enrollments.
        </p>
      </div>
      
      <Suspense fallback={<CoursesTableSkeleton />}>
        <CoursesTable />
      </Suspense>
    </div>
  )
}

function CoursesTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    </div>
  )
}
