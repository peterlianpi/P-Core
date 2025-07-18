"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ChartSwitcherProps {
  charts: { value: string; label: string }[]
  onSelect: (value: string) => void
  defaultValue: string
}

export function ChartSwitcher({ charts, onSelect, defaultValue }: ChartSwitcherProps) {
  return (
    <Select onValueChange={onSelect} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a chart" />
      </SelectTrigger>
      <SelectContent>
        {charts.map((chart) => (
          <SelectItem key={chart.value} value={chart.value}>
            {chart.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
