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

// Define colors in chartConfig for each vengName

const chartConfig = {
  totalHomes: {
    label: "Homes",
    color: "#4F46E5", // Default color (if needed)
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

// Function to generate random colors
function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Generate 18 random colors
const randomColors = Array.from({ length: 18 }, generateRandomColor);

// Define the type for the props
interface HomeVengChartProps {
  data: { vengName: string; totalHomes: number }[];
}

export function BarHomeVengChart({ data }: HomeVengChartProps) {
  const chartData = data.map((entry) => ({
    vengName: entry.vengName, // Use `vengName` as the label
    totalHomes: entry.totalHomes, // Use `totalHomes` as the count
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Homes Distribution</CardTitle>
        <CardDescription>Total Homes per Veng</CardDescription>
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
              dataKey="vengName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Shows first 3 letters of the vengName
              hide
            />
            <XAxis dataKey="totalHomes" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="totalHomes" layout="vertical" radius={4}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    randomColors[index % randomColors.length] ||
                    chartConfig.totalHomes.color
                  }
                />
              ))}
              <LabelList
                dataKey="vengName"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="totalHomes"
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
          Showing total total homes
        </div>
      </CardFooter>
    </Card>
  );
}
