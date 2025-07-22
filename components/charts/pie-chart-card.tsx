// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { PieChartContent } from "./pie-chart-content"
// import type { ChartData } from "@/features/overview/types"

// interface PieChartCardProps {
//   title: string
//   description: string
//   data: ChartData[]
//   nameKey: string
//   valueKey: string
//   colors: string[]
// }

// export function PieChartCard({ title, description, data, nameKey, valueKey, colors }: PieChartCardProps) {
//   return (
//     <Card className="rounded-lg">
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//         <CardDescription>{description}</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <PieChartContent data={data} nameKey={nameKey} valueKey={valueKey} colors={colors} />
//       </CardContent>
//     </Card>
//   )
// }
