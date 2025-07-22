import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentFormSkeleton() {
  return (
    <Card>
      <CardHeader className="font-semibold text-lg">
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(10)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>

        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />

        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  );
}
