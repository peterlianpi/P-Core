// "use client"

// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import type { ChartData } from "@/features/overview/types"

// interface BarChartContentProps {
//   data: ChartData[]
//   dataKey: string
//   barColor: string
// }

// export function BarChartContent({ data, dataKey, barColor }: BarChartContentProps) {
//   const chartConfig = {
//     [dataKey]: {
//       label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1),
//       color: barColor,
//     },
//     month: {
//       label: "Month",
//     },
//   } as const

//   return (
//     <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           accessibilityLayer
//           data={data}
//           margin={{
//             left: 12,
//             right: 12,
//           }}
//         >
//           <CartesianGrid vertical={false} />
//           <XAxis
//             dataKey="month"
//             tickLine={false}
//             axisLine={false}
//             tickMargin={8}
//             tickFormatter={(value) => value.slice(0, 3)}
//           />
//           <YAxis />
//           <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
//           <Bar dataKey={dataKey} fill={`var(--color-${dataKey})`} radius={8} />
//         </BarChart>
//       </ResponsiveContainer>
//     </ChartContainer>
//   )
// }
