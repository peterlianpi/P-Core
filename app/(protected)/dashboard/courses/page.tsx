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
          image: "/image/profile.png",
          gender: "MALE",
          age: 12,
          status: "ENROLLED",
        },
        {
          id: "s2",
          name: "Peter Pau Sian Lian",
          image: "/image/profile.png",
          gender: "MALE",
          age: 10,
          status: "PAUSED",
        },
        {
          id: "s3",
          name: "Emma Grace",
          image: "/image/profile.png",
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
          image: "/image/profile.png",
          gender: "MALE",
          age: 14,
          status: "RESUMED",
        },
        {
          id: "s5",
          name: "Kevin Lee",
          image: "/image/profile.png",
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
          image: "/image/profile.png",
          gender: "FEMALE",
          age: 13,
          status: "FINISHED",
        },
        {
          id: "s7",
          name: "Liam Park",
          image: "/image/profile.png",
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
          image: "/image/profile.png",
          gender: "FEMALE",
          age: 10,
          status: "ENROLLED",
        },
        {
          id: "s9",
          name: "Noah Win",
          image: "/image/profile.png",
          gender: "MALE",
          age: 11,
          status: "CANCELLED",
        },
      ],
    },
  ];

  return (
    <main className="w-full mt-4">
      <h1 className="text-4xl font-bold mb-6">Course Overview</h1>
      <CourseOverview courses={courses} />
    </main>
  );
}
