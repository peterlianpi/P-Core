// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { DollarSign, Users, Book, CalendarCheck } from "lucide-react"
// import type { OverviewStat } from "../types"

// // Mock data for overview statistics
// const mockStats: OverviewStat[] = [
//   {
//     id: "stat1",
//     title: "Total Revenue",
//     value: "$45,231.89",
//     change: "+20.1% from last month",
//     icon: DollarSign,
//   },
//   {
//     id: "stat2",
//     title: "Total Students",
//     value: "2,350",
//     change: "+180 since last month",
//     icon: Users,
//   },
//   {
//     id: "stat3",
//     title: "Books Sold",
//     value: "12,234",
//     change: "+19% from last month",
//     icon: Book,
//   },
//   {
//     id: "stat4",
//     title: "Lessons Completed",
//     value: "573",
//     change: "+201 since last month",
//     icon: CalendarCheck,
//   },
// ]

// export function OverviewGrid() {
//   return (
//     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//       {mockStats.map((stat) => (
//         <Card key={stat.id} className="rounded-lg">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//             <stat.icon className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stat.value}</div>
//             <p className="text-xs text-muted-foreground">{stat.change}</p>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }
