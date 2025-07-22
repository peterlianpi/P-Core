// "use client"

// import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
// import type { ChartData } from "@/features/overview/types"

// interface LineChartContentProps {
//   data: ChartData[]
//   dataKey: string
//   lineColor: string
// }

// export function LineChartContent({ data, dataKey, lineColor }: LineChartContentProps) {
//   const chartConfig = {
//     [dataKey]: {
//       label: dataKey.charAt(0).toUpperCase() + dataKey.slice(1), // Capitalize first letter
//       color: lineColor,
//     },
//     month: {
//       label: "Month",
//     },
//   } as const

//   return (
//     <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart
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
//           <Line dataKey={dataKey} type="monotone" stroke={`var(--color-${dataKey})`} strokeWidth={2} dot={false} />
//         </LineChart>
//       </ResponsiveContainer>
//     </ChartContainer>
//   )
// }
