// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { BarChartContent } from "./bar-chart-content";

// interface BarChartCardProps {
//   title: string;
//   description: string;
//   data: ChartData[];
//   dataKey: string;
//   barColor: string;
// }

// export function BarChartCard({
//   title,
//   description,
//   data,
//   dataKey,
//   barColor,
// }: BarChartCardProps) {
//   return (
//     <Card className="rounded-lg">
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//         <CardDescription>{description}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <BarChartContent data={data} dataKey={dataKey} barColor={barColor} />
//       </CardContent>
//     </Card>
//   );
// }
