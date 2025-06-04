"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { BarHomeKhawkChart } from "./bar-home-khawk-chart";
import { PieHomeKhawkChart } from "./pie-home-khawk-chart";

type Props ={
  data: { khawkName: string; totalHomes: number }[] | undefined;
  totalHomes? : number;
}

const HomeKhawkChartSelector = ({
  data,
  totalHomes 
}:Props) => {
  const [selectedChart, setSelectedChart] = useState<string>("chartPage");

  const handleChange = (value: string) => {
    setSelectedChart(value);
  };

  return (
    <div className="grid gap-6">
      <div className="col-span-1 lg:col-span-2">
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

        {selectedChart === "chartPage" && data && (
          <BarHomeKhawkChart data={data} />
        )}
        {selectedChart === "pieChart" && data && (
          <PieHomeKhawkChart data={data} totalHomes={totalHomes} />
        )}
      </div>
    </div>
  );
};

export default HomeKhawkChartSelector;
