import { OverviewGrid } from "@/features/school-management/features/overview/components/overview-grid";
import { StatsCharts } from "@/features/school-management/features/overview/components/stats-charts";

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          School Management Overview
        </h1>
        <p className="text-muted-foreground">
          Get insights into your school&apos;s performance, student enrollment,
          and financial metrics.
        </p>
      </div>

      <OverviewGrid />

      <StatsCharts />
    </div>
  );
}
