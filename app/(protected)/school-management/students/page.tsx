import { StudentsTable } from "@/features/school-management/features/students-management/components/students-table"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function StudentsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <p className="text-muted-foreground">
          Manage your students, track their progress, and handle enrollments.
        </p>
      </div>
      
      <Suspense fallback={<StudentTableSkeleton />}>
        <StudentsTable />
      </Suspense>
    </div>
  )
}

function StudentTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  )
}
