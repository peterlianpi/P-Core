"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartData } from "@/features/overview/types"

interface PieChartContentProps {
  data: ChartData[]
  nameKey: string
  valueKey: string
  colors: string[]
}

export function PieChartContent({ data, nameKey, valueKey, colors }: PieChartContentProps) {
  const chartConfig = {
    [valueKey]: {
      label: valueKey.charAt(0).toUpperCase() + valueKey.slice(1),
    },
  } as const

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey={nameKey} />} />
          <Pie data={data} dataKey={valueKey} nameKey={nameKey} cx="50%" cy="50%" outerRadius={80} label>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
