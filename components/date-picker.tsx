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
  className?: string;
};

export const DatePicker = ({ 
  value, 
  onChange, 
  disabled, 
  placeholder = "Pick a date",
  fromDate,
  toDate,
  disabledDays,
  className
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const currentYear = new Date().getFullYear();
  
  const handleSelect = (date: Date | undefined) => {
    onChange?.(date);
    if (date) {
      setOpen(false);
    }
  };

  const hidden = fromDate || toDate ? {
    ...(fromDate && { before: fromDate }),
    ...(toDate && { after: toDate })
  } : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            "hover:bg-accent hover:text-accent-foreground",
            "focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "transition-colors duration-200",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0" 
        align="start"
        sideOffset={4}
      >
        <div className="rounded-lg border bg-popover p-3 shadow-lg">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={handleSelect}
            disabled={disabled ? true : disabledDays}
            hidden={hidden}
            showOutsideDays
            fixedWeeks
            captionLayout="dropdown"
            fromYear={1970}
            toYear={currentYear + 10}
            className="p-3"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                "hover:bg-accent hover:text-accent-foreground",
                "rounded-md transition-colors duration-200"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
              day: cn(
                "h-9 w-9 p-0 font-normal",
                "hover:bg-accent hover:text-accent-foreground",
                "rounded-md transition-colors duration-200"
              ),
              day_selected: cn(
                "bg-primary text-primary-foreground",
                "hover:bg-primary hover:text-primary-foreground",
                "focus:bg-primary focus:text-primary-foreground"
              ),
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
              caption_dropdowns: "flex gap-2",
              dropdown: "rounded-md border bg-background px-2 py-1 text-sm",
              dropdown_month: "flex items-center gap-1",
              dropdown_year: "flex items-center gap-1"
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
