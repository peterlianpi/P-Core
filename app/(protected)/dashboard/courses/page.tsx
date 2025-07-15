// app/dashboard/courses/page.tsx

import { CourseOverview } from "@/features/students-management/components/course-overview";

export default async function Page() {
  const courses = [
    {
      id: "course_1",
      name: "Piano",
      students: [
        {
          id: "s1",
          name: "John Doe",
          gender: "MALE",
          age: 12,
          status: "ENROLLED",
        },
        {
          id: "s2",
          name: "Sarah Lin",
          gender: "FEMALE",
          age: 10,
          status: "PAUSED",
        },
        {
          id: "s3",
          name: "Emma Grace",
          gender: "FEMALE",
          age: 9,
          status: "ENROLLED",
        },
      ],
    },
    {
      id: "course_2",
      name: "Drums",
      students: [
        {
          id: "s4",
          name: "Mike Chan",
          gender: "MALE",
          age: 14,
          status: "RESUMED",
        },
        {
          id: "s5",
          name: "Kevin Lee",
          gender: "MALE",
          age: 11,
          status: "ENROLLED",
        },
      ],
    },
    {
      id: "course_3",
      name: "Guitar",
      students: [
        {
          id: "s6",
          name: "Olivia Kim",
          gender: "FEMALE",
          age: 13,
          status: "FINISHED",
        },
        {
          id: "s7",
          name: "Liam Park",
          gender: "MALE",
          age: 12,
          status: "ENROLLED",
        },
      ],
    },
    {
      id: "course_4",
      name: "Violin",
      students: [
        {
          id: "s8",
          name: "Ava Lian",
          gender: "FEMALE",
          age: 10,
          status: "ENROLLED",
        },
        {
          id: "s9",
          name: "Noah Win",
          gender: "MALE",
          age: 11,
          status: "CANCELLED",
        },
      ],
    },
  ];

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Course Overview</h1>
      <CourseOverview courses={courses} />
    </main>
  );
}
