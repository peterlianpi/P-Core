// "use client";

// import { useEffect, useState } from "react";
// import { TrendingUp } from "lucide-react";
// import { Pie, PieChart } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// interface PieChartProps {
//   title: string;
//   description?: string;
//   apiEndpoint: string; // API URL
//   dataKey: string; // Key for values (e.g., "count")
//   nameKey: string; // Key for labels (e.g., "age" or "category")
// }

// export function ReusablePieChart({
//   title,
//   description,
//   apiEndpoint,
//   dataKey,
//   nameKey,
// }: PieChartProps) {
//   const [chartData, setChartData] = useState<Array<{ [key: string]: any }>>([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(apiEndpoint);
//         const data = await response.json();

//         if (data) {
//           // Transform the data based on dynamic keys
//           const transformedData = Object.entries(data).map(([key, value]) => ({
//             [nameKey]: key,
//             [dataKey]: value,
//           }));

//           setChartData(transformedData);
//         }
//       } catch (error) {
//         console.error(`Error fetching data from ${apiEndpoint}:`, error);
//       }
//     }

//     fetchData();
//   }, [apiEndpoint, dataKey, nameKey]);

//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>{title}</CardTitle>
//         {description && <CardDescription>{description}</CardDescription>}
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
//           <PieChart>
//             <ChartTooltip content={<ChartTooltipContent hideLabel />} />
//             <Pie
//               data={chartData}
//               dataKey={dataKey}
//               nameKey={nameKey}
//               label
//               fill="hsl(var(--chart-1))"
//             />
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Data visualization for {title}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }
