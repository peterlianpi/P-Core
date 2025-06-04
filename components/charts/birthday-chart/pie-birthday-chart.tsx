/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const monthColors = [
  "#FF5733", // January
  "#33FF57", // February
  "#3357FF", // March
  "#FF33A1", // April
  "#A133FF", // May
  "#33FFF1", // June
  "#FFC733", // July
  "#33FF8D", // August
  "#8D33FF", // September
  "#FF3385", // October
  "#33A1FF", // November
  "#FF8333", // December
];

// Define the type for the props
interface BirthdayChartPageProps {
  data: number[]; // Array of 1's and 0's representing the birthday months
}

export function PieBirthdayChart({ data }: BirthdayChartPageProps) {
  const chartData = data.map((count, index) => ({
    month: new Date(0, index).toLocaleString("default", { month: "long" }), // Converts index to month name
    count,
    fill: monthColors[index], // Use the corresponding color from monthColors
  }));

  const totalBirthdays = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Birthday Distribution</CardTitle>
        <CardDescription>January - December</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalBirthdays.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Birthdays
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        
        <div className="leading-none text-muted-foreground">
          Showing total birthdays
        </div>
      </CardFooter>
    </Card>
  );
}
