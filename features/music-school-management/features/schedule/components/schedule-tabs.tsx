// "use client"

// import { useState } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { MoreHorizontal } from "lucide-react"
// import type { Lesson, Teacher, Student } from "../types"

// interface ScheduleTabsProps {
//   lessons: Lesson[]
//   onEdit: (lesson: Lesson) => void
//   onDelete: (id: string) => void
//   teachers: Teacher[]
//   students: Student[]
// }

// export function ScheduleTabs({ lessons, onEdit, onDelete, teachers, students }: ScheduleTabsProps) {
//   const [activeTab, setActiveTab] = useState("all")
//   const [filter, setFilter] = useState("")

//   const getTeacherName = (teacherId: string) => {
//     return teachers.find((t) => t.id === teacherId)?.name || "Unknown Teacher"
//   }

//   const getStudentName = (studentId: string) => {
//     return students.find((s) => s.id === studentId)?.name || "Unknown Student"
//   }

//   const filteredLessons = lessons.filter((lesson) => {
//     const matchesFilter =
//       lesson.title.toLowerCase().includes(filter.toLowerCase()) ||
//       getTeacherName(lesson.teacherId).toLowerCase().includes(filter.toLowerCase()) ||
//       getStudentName(lesson.studentId).toLowerCase().includes(filter.toLowerCase()) ||
//       lesson.date.includes(filter) ||
//       lesson.status.toLowerCase().includes(filter.toLowerCase())

//     if (activeTab === "all") {
//       return matchesFilter
//     } else if (activeTab === "scheduled") {
//       return lesson.status === "Scheduled" && matchesFilter
//     } else if (activeTab === "completed") {
//       return lesson.status === "Completed" && matchesFilter
//     } else if (activeTab === "cancelled") {
//       return lesson.status === "Cancelled" && matchesFilter
//     }
//     return false
//   })

//   return (
//     <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//       <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
//         <TabsList className="grid w-full sm:w-auto grid-cols-2 sm:grid-cols-4">
//           <TabsTrigger value="all">All</TabsTrigger>
//           <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
//           <TabsTrigger value="completed">Completed</TabsTrigger>
//           <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
//         </TabsList>
//         <input
//           type="text"
//           placeholder="Filter lessons..."
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="w-full sm:w-auto p-2 border rounded-md"
//         />
//       </div>

//       <TabsContent value="all">
//         <LessonTable
//           lessons={filteredLessons}
//           onEdit={onEdit}
//           onDelete={onDelete}
//           getTeacherName={getTeacherName}
//           getStudentName={getStudentName}
//         />
//       </TabsContent>
//       <TabsContent value="scheduled">
//         <LessonTable
//           lessons={filteredLessons}
//           onEdit={onEdit}
//           onDelete={onDelete}
//           getTeacherName={getTeacherName}
//           getStudentName={getStudentName}
//         />
//       </TabsContent>
//       <TabsContent value="completed">
//         <LessonTable
//           lessons={filteredLessons}
//           onEdit={onEdit}
//           onDelete={onDelete}
//           getTeacherName={getTeacherName}
//           getStudentName={getStudentName}
//         />
//       </TabsContent>
//       <TabsContent value="cancelled">
//         <LessonTable
//           lessons={filteredLessons}
//           onEdit={onEdit}
//           onDelete={onDelete}
//           getTeacherName={getTeacherName}
//           getStudentName={getStudentName}
//         />
//       </TabsContent>
//     </Tabs>
//   )
// }

// // Helper component for rendering the lesson table to avoid repetition
// interface LessonTableProps {
//   lessons: Lesson[]
//   onEdit: (lesson: Lesson) => void
//   onDelete: (id: string) => void
//   getTeacherName: (teacherId: string) => string
//   getStudentName: (studentId: string) => string
// }

// function LessonTable({ lessons, onEdit, onDelete, getTeacherName, getStudentName }: LessonTableProps) {
//   return (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Title</TableHead>
//           <TableHead>Teacher</TableHead>
//           <TableHead>Student</TableHead>
//           <TableHead>Date</TableHead>
//           <TableHead>Time</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Actions</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {lessons.map((lesson) => (
//           <TableRow key={lesson.id}>
//             <TableCell className="font-medium">{lesson.title}</TableCell>
//             <TableCell>{getTeacherName(lesson.teacherId)}</TableCell>
//             <TableCell>{getStudentName(lesson.studentId)}</TableCell>
//             <TableCell>{new Date(lesson.date).toLocaleDateString()}</TableCell>
//             <TableCell>{`${lesson.startTime} - ${lesson.endTime}`}</TableCell>
//             <TableCell>{lesson.status}</TableCell>
//             <TableCell>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="h-8 w-8 p-0">
//                     <span className="sr-only">Open menu</span>
//                     <MoreHorizontal className="h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem onClick={() => onEdit(lesson)}>Edit</DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => onDelete(lesson.id)}>Delete</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )
// }
