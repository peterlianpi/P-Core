"use client";

import React, { useState } from "react";
import { PieBirthdayChart } from "./pie-birthday-chart";
import { BarBirthdayChart } from "./bar-birthday-chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ChartSelector = ({ data }: { data: number[] }) => {
  // State to manage which chart is selected
  const [selectedChart, setSelectedChart] = useState<string>("chartPage");

  const handleChange = (value: string) => {
    setSelectedChart(value);
  };

  return (
    <div className="grid gap-6">
      <div className="col-span-1 lg:col-span-2">
        {/* Drop-down selector using the custom Select component */}
        <Select value={selectedChart} onValueChange={handleChange}>
          <SelectTrigger className="w-[180px] mb-4 p-2 border rounded-md">
            <SelectValue placeholder="Select Chart" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Chart Type</SelectLabel>
              <SelectItem value="chartPage">Bar Chart</SelectItem>
              <SelectItem value="pieChart">Pie Chart</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Conditionally render the selected chart component */}
        {selectedChart === "chartPage" && <BarBirthdayChart data={data} />}
        {selectedChart === "pieChart" && <PieBirthdayChart data={data} />}
      </div>
    </div>
  );
};

export default ChartSelector;
