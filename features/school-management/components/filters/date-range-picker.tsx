"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
  className?: string;
  placeholder?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  date,
  onDateChange,
  className,
  placeholder = "Pick a date range",
}) => {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

// Quick preset buttons for common date ranges
interface DateRangePresetProps {
  onSelect: (range: DateRange) => void;
  className?: string;
}

export const DateRangePresets: React.FC<DateRangePresetProps> = ({
  onSelect,
  className,
}) => {
  const presets = [
    {
      label: "Last 7 days",
      range: {
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        to: new Date(),
      },
    },
    {
      label: "Last 30 days",
      range: {
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        to: new Date(),
      },
    },
    {
      label: "Last 3 months",
      range: {
        from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        to: new Date(),
      },
    },
    {
      label: "Last 6 months",
      range: {
        from: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
        to: new Date(),
      },
    },
    {
      label: "This year",
      range: {
        from: new Date(new Date().getFullYear(), 0, 1),
        to: new Date(),
      },
    },
  ];

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {presets.map((preset) => (
        <Button
          key={preset.label}
          variant="outline"
          size="sm"
          onClick={() => onSelect(preset.range)}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
};

// Enhanced date range picker with presets
interface EnhancedDateRangePickerProps extends DateRangePickerProps {
  showPresets?: boolean;
}

export const EnhancedDateRangePicker: React.FC<EnhancedDateRangePickerProps> = ({
  date,
  onDateChange,
  className,
  placeholder,
  showPresets = true,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <DateRangePicker
        date={date}
        onDateChange={onDateChange}
        placeholder={placeholder}
      />
      {showPresets && (
        <DateRangePresets
          onSelect={onDateChange}
          className="justify-start"
        />
      )}
    </div>
  );
};
