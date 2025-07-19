import { OverviewGrid } from "@/features/music-school-management/features/overview/components/overview-grid";
import { StatsCharts } from "@/features/music-school-management/features/overview/components/stats-charts";

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* Overview Grid for key statistics */}
      <OverviewGrid />
      {/* Charts for visualizing trends and data */}
      <StatsCharts />
    </div>
  );
}
