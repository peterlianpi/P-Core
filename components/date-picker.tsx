import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

type Props = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
  fromDate?: Date;
  toDate?: Date;
  disabledDays?: Date[] | ((date: Date) => boolean);
};

export const DatePicker = ({ 
  value, 
  onChange, 
  disabled, 
  placeholder = "Pick a date",
  fromDate,
  toDate,
  disabledDays
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const currentYear = new Date().getFullYear();
  
  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    if (date) {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="size-4 mr-2" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DayPicker
          mode="single"
          selected={value}
          onSelect={handleSelect}
          disabled={disabled ? true : disabledDays}
          // fromDate={fromDate}
          // hidden={{ before: fromDate??new Date() ,after: toDate??new Date()}}
          // toDate={toDate}
          showOutsideDays
          fixedWeeks
          captionLayout="dropdown"
          startMonth={new Date(1900, 0)}
          endMonth={new Date(currentYear + 10, 0)}
          className={cn("p-3")}
          classNames={{
            root:"p-4",
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            month_caption: "flex justify-center items-center",
            dropdowns:"space-x-4",
            dropdown:"rounded-sm bg-background border p-1",
            caption_label: "text-sm font-medium hidden",
            nav: "space-x-1 flex items-center",
            button_previous: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-1",
            button_next: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-1",
            month_grid: "w-full border-collapse space-y-1",
            weekdays: "flex",
            weekday: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
            week: "flex w-full mt-2",
            day: "relative py-1.5 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md h-8 w-8 font-normal aria-selected:opacity-100 rounded-md",
            selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            today: "bg-accent text-accent-foreground",
            outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
            disabled: "text-muted-foreground opacity-50",
            range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            hidden: "invisible",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

// Export types for better TypeScript support
export type { SelectSingleEventHandler } from "react-day-picker";
