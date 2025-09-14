// import { useData } from "@/providers/data-provider";
// import { FieldConfig } from "../types/field-config";
// import { useGetCourses } from "@/features/school-management/features/courses/api/use-get-courses";

// export const useScheduleFields = () => {
//   const { orgId } = useData();
//   const { data: courses } = useGetCourses({ orgId });

//   const scheduleFields: FieldConfig[] = [
//     {
//       name: "teacherId",
//       label: "Teacher",
//       type: "select",
//       options: [], // 🔁 Populate dynamically from teacher list
//     },
//     {
//       name: "roomId",
//       label: "Room",
//       type: "select",
//       options: [], // 🔁 Populate dynamically from room list
//     },
//     {
//       name: "dayOfWeek",
//       label: "Day of Week",
//       type: "select",
//       options: [
//         { label: "Sunday", value: "0" },
//         { label: "Monday", value: "1" },
//         { label: "Tuesday", value: "2" },
//         { label: "Wednesday", value: "3" },
//         { label: "Thursday", value: "4" },
//         { label: "Friday", value: "5" },
//         { label: "Saturday", value: "6" },
//       ],
//     },
//     {
//       name: "startTime",
//       label: "Start Time",
//       type: "date", // You can replace with `time` if using a TimePicker
//     },
//     {
//       name: "endTime",
//       label: "End Time",
//       type: "date", // You can replace with `time` if using a TimePicker
//     },

//     {
//       name: "courseId",
//       label: "Courses",
//       type: "select",
//       options:
//         courses?.map((c) => ({
//           label: c.name,
//           value: c.id,
//         })) || [],
//     },

//     {
//       name: "status",
//       label: "Status",
//       type: "select",
//       options: ["ACTIVE", "ARCHIVED"],
//     },
//   ];

//   return scheduleFields;
// };
