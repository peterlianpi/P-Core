"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import { Teacher } from "@/features/music-school-management/features/teachers/types";
import { Course } from "@/features/music-school-management/lib/types";
import { Room } from "@/prisma-features-database/features-database-client-types";

// Mock Data Generation Functions
const generateMockTeachers = (): Teacher[] => [
  { id: "t1", name: "Alice Smith", instrument: "Piano" },
  { id: "t2", name: "Bob Johnson", instrument: "Guitar" },
  { id: "t3", name: "Charlie Brown", instrument: "Drums" },
  { id: "t4", name: "Diana Prince", instrument: "Violin" },
];

const generateMockCourses = (): Course[] => [
  {
    id: "c1",
    name: "Piano Course",
    levels: ["Beginner Part I", "Beginner Part II", "Intermediate"],
  },
  { id: "c2", name: "Guitar Course", levels: ["Level 1", "Level 2"] },
  { id: "c3", name: "Drum Course", levels: ["Book 1", "Book 2"] },
  { id: "c4", name: "Violin Course", levels: ["Grade 1", "Grade 2"] },
];

const generateMockRooms = (): Room[] => [
  { id: "r1", name: "Room 101" },
  { id: "r2", name: "Room 102" },
  { id: "r3", name: "Room 103" },
];

const generateMockStudents = (
  count: number,
  courses: Course[]
): MockStudentData[] => {
  const students: MockStudentData[] = [];
  for (let i = 0; i < count; i++) {
    const randomCourse = courses[Math.floor(Math.random() * courses.length)];
    const randomLevel = randomCourse.levels
      ? randomCourse.levels[
          Math.floor(Math.random() * randomCourse.levels.length)
        ]
      : undefined;
    students.push({
      id: `s${i + 1}`,
      name: `Student ${i + 1}`,
      email: `student${i + 1}@example.com`,
      phone: `555-123-${String(i + 1).padStart(3, "0")}`,
      enrollmentDate: new Date(
        2023,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ),
      status:
        Math.random() > 0.8
          ? "inactive"
          : Math.random() > 0.9
            ? "trial"
            : "active",
      rollNumber: `R${String(i + 1).padStart(3, "0")}`,
      currentLessonBook:
        randomCourse.name + (randomLevel ? ` - ${randomLevel}` : ""),
    });
  }
  return students;
};

const generateMockPurchases = (
  students: MockStudentData[],
  numMonths = 3
): MockPurchaseData[] => {
  const purchases: MockPurchaseData[] = [];
  const today = new Date();

  students.forEach((student) => {
    for (let i = 0; i < numMonths; i++) {
      const purchaseDate = new Date(
        today.getFullYear(),
        today.getMonth() - i,
        Math.floor(Math.random() * 20) + 1
      );
      if (Math.random() > 0.3) {
        // 70% chance of monthly tuition
        purchases.push({
          id: `p${uuidv4()}`,
          studentId: student.id,
          amount: 150 + Math.floor(Math.random() * 50),
          type: "tuition",
          date: purchaseDate,
          description: `Monthly tuition for ${purchaseDate.toLocaleString("default", { month: "long" })}`,
        });
      }
      if (Math.random() > 0.7) {
        // 30% chance of book purchase
        purchases.push({
          id: `p${uuidv4()}`,
          studentId: student.id,
          amount: 20 + Math.floor(Math.random() * 30),
          type: "book",
          date: purchaseDate,
          description: `Lesson book purchase`,
        });
      }
    }
  });
  return purchases;
};

const generateMockLessonPeriods = (
  teachers: Teacher[],
  courses: Course[],
  rooms: Room[],
  students: MockStudentData[],
  numDays = 14
): MockLessonPeriodData[] => {
  const lessonPeriods: MockLessonPeriodData[] = [];
  const today = new Date();
  const timeSlots = [
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
    "05:00 PM - 06:00 PM",
    "06:00 PM - 07:00 PM",
  ];

  for (let d = 0; d < numDays; d++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + d);

    // Only generate for weekdays (Monday to Friday)
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue; // Skip Sunday (0) and Saturday (6)

    timeSlots.forEach((time) => {
      const randomCourse = courses[Math.floor(Math.random() * courses.length)];
      const randomTeacher =
        teachers[Math.floor(Math.random() * teachers.length)];
      const randomRoom = rooms[Math.floor(Math.random() * rooms.length)];

      const numStudentsInPeriod = 10 + Math.floor(Math.random() * 11); // 10 to 20 students
      const periodStudents = Array.from({ length: numStudentsInPeriod }, () => {
        const randomIndex = Math.floor(Math.random() * students.length);
        return students[randomIndex].id;
      });

      lessonPeriods.push({
        id: `lp${uuidv4()}`,
        courseId: randomCourse.id,
        time: time,
        date: currentDate,
        teacherId: randomTeacher.id,
        roomId: randomRoom.id,
        studentIds: periodStudents,
      });
    });
  }
  return lessonPeriods;
};

// Mock data for a teacher's schedule
const mockTeacherSchedule: TeacherScheduleEntry[] = [
  {
    id: "ts1",
    lessonTitle: "Piano Lesson - Alice Smith",
    studentName: "Alice Smith",
    date: "2024-07-20",
    startTime: "10:00",
    endTime: "11:00",
    status: "Scheduled",
    paymentStatus: "Pending",
  },
  {
    id: "ts2",
    lessonTitle: "Piano Lesson - Bob Johnson",
    studentName: "Bob Johnson",
    date: "2024-07-20",
    startTime: "11:00",
    endTime: "12:00",
    status: "Completed",
    paymentStatus: "Paid",
  },
  {
    id: "ts3",
    lessonTitle: "Piano Lesson - Charlie Brown",
    studentName: "Charlie Brown",
    date: "2024-07-21",
    startTime: "09:00",
    endTime: "10:00",
    status: "Cancelled",
    paymentStatus: "N/A",
  },
  {
    id: "ts4",
    lessonTitle: "Piano Lesson - Diana Prince",
    studentName: "Diana Prince",
    date: "2024-07-21",
    startTime: "13:00",
    endTime: "14:00",
    status: "Scheduled",
    paymentStatus: "Pending",
  },
];

export default function TeachersPage() {
  // In a real application, this would likely be fetched based on the logged-in teacher
  const [teacherName, setTeacherName] = useState("Mr. David Lee");
  const [schedule, setSchedule] =
    useState<TeacherScheduleEntry[]>(mockTeacherSchedule);

  const mockTeachers = useMemo(() => generateMockTeachers(), []);
  const mockCourses = useMemo(() => generateMockCourses(), []);
  const mockRooms = useMemo(() => generateMockRooms(), []);
  const mockStudents = useMemo(
    () => generateMockStudents(100, mockCourses),
    [mockCourses]
  ); // 100 students
  const mockPurchases = useMemo(
    () => generateMockPurchases(mockStudents),
    [mockStudents]
  );

  const getEnrichedLessonPeriods = useMemo((): TeacherLessonPeriod[] => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const mockLessonPeriods = generateMockLessonPeriods(
      mockTeachers,
      mockCourses,
      mockRooms,
      mockStudents
    );

    return mockLessonPeriods
      .map((period) => {
        const course = mockCourses.find((c) => c.id === period.courseId);
        const teacher = mockTeachers.find((t) => t.id === period.teacherId);
        const room = mockRooms.find((r) => r.id === period.roomId);

        if (!course || !teacher || !room) {
          // This should ideally not happen with correctly generated mock data
          console.warn("Missing data for lesson period:", period);
          return null as any; // Or handle error appropriately
        }

        const enrichedStudents: EnrichedStudent[] = period.studentIds
          .map((studentId) => {
            const studentData = mockStudents.find((s) => s.id === studentId);
            if (!studentData) {
              console.warn("Student not found for ID:", studentId);
              return null as any; // Or handle error
            }

            // Check for payment in the current month
            const hasPaidThisMonth = mockPurchases.some(
              (purchase) =>
                purchase.studentId === studentData.id &&
                purchase.type === "tuition" &&
                purchase.date.getMonth() === currentMonth &&
                purchase.date.getFullYear() === currentYear
            );

            const paymentStatus: PaymentStatus = hasPaidThisMonth
              ? "Paid"
              : "Unpaid";

            return {
              ...studentData,
              paymentStatus,
            };
          })
          .filter(Boolean) as EnrichedStudent[]; // Filter out any nulls if data was missing

        return {
          id: period.id,
          course: course,
          time: period.time,
          date: period.date,
          teacher: teacher,
          room: room,
          students: enrichedStudents,
        };
      })
      .filter(Boolean) as TeacherLessonPeriod[]; // Filter out any null periods
  }, [mockTeachers, mockCourses, mockRooms, mockStudents, mockPurchases]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <Card className="rounded-lg">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
          <div className="flex flex-col">
            <CardTitle className="text-2xl font-bold">
              Teacher Dashboard: {teacherName}
            </CardTitle>
            <CardDescription>
              View your upcoming lessons and student payment statuses.
            </CardDescription>
          </div>
          {/* Add any teacher-specific actions here if needed */}
        </CardHeader>
        <CardContent className="pt-4">
          <h3 className="text-xl font-semibold mb-4">My Schedule</h3>
          <TeacherSchedule schedule={schedule} />
        </CardContent>
      </Card>
      <div className="flex-1 space-y-4">
        <TeacherSchedule
          teachers={mockTeachers}
          courses={mockCourses}
          rooms={mockRooms}
          lessonPeriods={getEnrichedLessonPeriods}
        />
      </div>
    </div>
  );
}
