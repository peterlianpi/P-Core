"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Cell,
  LabelList,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define colors in chartConfig for each month

const chartConfig = {
  birthdays: {
    label: "Birthdays",
    color: "#4F46E5", // Default color (if needed)
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

// Define a color palette for months
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

export function BarBirthdayChart({ data }: BirthdayChartPageProps) {
  // Sample birthday data with `birthdays` being 1 for months that have birthdays
  const chartData = data.map((hasBirthday, index) => ({
    month: new Date(0, index).toLocaleString("default", { month: "long" }), // Get month name
    birthdays: hasBirthday, // If there's a birthday, set count to 1, otherwise 0
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Birthday Distribution</CardTitle>
        <CardDescription>January - December</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            layout="vertical"
            data={chartData}
            margin={{
              right: 16,
            }}
          > 
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Shows first 3 letters of the month
              hide
            />
            <XAxis dataKey="birthdays" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="birthdays" layout="vertical" radius={4}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={monthColors[index] || chartConfig.birthdays.color}
                />
              ))}
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="birthdays"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        
        <div className="leading-none text-muted-foreground">
          Showing total birthdays
        </div>
      </CardFooter>
    </Card>
  );
}
