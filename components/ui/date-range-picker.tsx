"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangePickerProps {
  /**
   * The selected date range
   */
  date?: DateRange
  /**
   * Callback when date range changes
   */
  onDateChange?: (date: DateRange | undefined) => void
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Placeholder text when no date is selected
   */
  placeholder?: string
  /**
   * Whether the picker is disabled
   */
  disabled?: boolean
  /**
   * Preset date ranges for quick selection
   */
  presets?: Array<{
    label: string
    value: DateRange
  }>
}

/**
 * DateRangePicker component for selecting date ranges
 * 
 * Features:
 * - Calendar-based date range selection
 * - Preset date ranges for quick selection
 * - Responsive design
 * - Keyboard navigation support
 * - Customizable styling
 * 
 * @example
 * ```tsx
 * const [dateRange, setDateRange] = useState<DateRange | undefined>()
 * 
 * <DateRangePicker
 *   date={dateRange}
 *   onDateChange={setDateRange}
 *   presets={[
 *     { label: "Last 7 days", value: { from: addDays(new Date(), -7), to: new Date() } },
 *     { label: "Last 30 days", value: { from: addDays(new Date(), -30), to: new Date() } }
 *   ]}
 * />
 * ```
 */
export function DateRangePicker({
  date,
  onDateChange,
  className,
  placeholder = "Pick a date range",
  disabled = false,
  presets = []
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  // Default presets if none provided
  const defaultPresets = [
    {
      label: "Today",
      value: {
        from: new Date(),
        to: new Date(),
      },
    },
    {
      label: "Yesterday",
      value: {
        from: addDays(new Date(), -1),
        to: addDays(new Date(), -1),
      },
    },
    {
      label: "Last 7 days",
      value: {
        from: addDays(new Date(), -7),
        to: new Date(),
      },
    },
    {
      label: "Last 30 days",
      value: {
        from: addDays(new Date(), -30),
        to: new Date(),
      },
    },
    {
      label: "Last 90 days",
      value: {
        from: addDays(new Date(), -90),
        to: new Date(),
      },
    },
    {
      label: "This month",
      value: {
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
      },
    },
    {
      label: "Last month",
      value: {
        from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      },
    },
  ]

  const availablePresets = presets.length > 0 ? presets : defaultPresets

  const handlePresetSelect = (preset: { label: string; value: DateRange }) => {
    onDateChange?.(preset.value)
    setIsOpen(false)
  }

  const formatDateRange = (dateRange: DateRange | undefined) => {
    if (!dateRange?.from) {
      return placeholder
    }

    if (dateRange.to) {
      return `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to, "LLL dd, y")}`
    }

    return format(dateRange.from, "LLL dd, y")
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange(date)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            {/* Presets sidebar */}
            <div className="border-r border-border">
              <div className="p-3">
                <h4 className="text-sm font-medium mb-2">Presets</h4>
                <div className="grid gap-1">
                  {availablePresets.map((preset) => (
                    <Button
                      key={preset.label}
                      variant="ghost"
                      className="justify-start text-sm h-8"
                      onClick={() => handlePresetSelect(preset)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Calendar */}
            <div className="p-3">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={onDateChange}
                numberOfMonths={2}
                className="rounded-md"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export type { DateRangePickerProps }