import {
  PrismaClient,
  Student,
  Course,
  Teacher,
  Room,
  Schedule,
} from "@/prisma-features-database/features-database-client-types";

const prisma = new PrismaClient();
const orgId = "cmcysksck0000jr04x1y1w2ep";

const COURSE_NAMES = ["Piano", "Guitar", "Drum", "Violin"];
const TEACHER_NAMES = [
  "Alice Smith",
  "Bob Johnson",
  "Charlie Brown",
  "Diana Prince",
  "Edward King",
];
const ROOM_NAMES = ["Room 101", "Room 102", "Room 103", "Room 104", "Room 105"];
const BOOK_PRICE_RANGE = [10000, 15000];
const MONTHLY_FEE = 30000;
const ORG_ID = orgId;
const JAN_TO_JUNE = [1, 2, 3, 4, 5, 6];

const randomDate = (month: number, year = 2025): Date => {
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(year, month - 1, day);
};

function getNextDateByWeekday(weekday: number): Date {
  const today = new Date();
  const day = today.getDay();
  const diff = (weekday + 7 - day) % 7;
  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + diff);
  return nextDate;
}

async function main() {
  console.log("🚀 Starting seed...");

  // 1. Create Courses
  const courses: Course[] = await Promise.all(
    COURSE_NAMES.map((name: string) =>
      prisma.course.create({
        data: { name, orgId: ORG_ID },
      })
    )
  );
  console.log(`✅ Created ${courses.length} courses`);

  // 2. Create Teachers
  const teachers: Teacher[] = await Promise.all(
    TEACHER_NAMES.map((name: string) =>
      prisma.teacher.create({
        data: { name, orgId: ORG_ID },
      })
    )
  );
  console.log(`✅ Created ${teachers.length} teachers`);

  // 3. Create Rooms
  const rooms: Room[] = await Promise.all(
    ROOM_NAMES.map((name: string) =>
      prisma.room.create({
        data: { name, orgId: ORG_ID },
      })
    )
  );
  console.log(`✅ Created ${rooms.length} rooms`);

  // 4. Create Students
  const students: Student[] = await Promise.all(
    Array.from({ length: 50 }).map((_, i: number) =>
      prisma.student.create({
        data: {
          name: `Student ${i + 1}`,
          phone: `+95912345${1000 + i}`,
          email: `student${i + 1}@test.com`,
          address: `Street ${i + 1}`,
          orgId: ORG_ID,
        },
      })
    )
  );
  console.log(`✅ Created ${students.length} students`);

  // 5. Assign each student to a random course
  const studentCourses = await Promise.all(
    students.map((student: Student) => {
      const course = courses[Math.floor(Math.random() * courses.length)];
      return prisma.studentCourse.create({
        data: {
          orgId,
          studentId: student.id,
          courseId: course.id,
        },
      });
    })
  );
  console.log(`✅ Linked ${studentCourses.length} students to courses`);

  // 6. Create Lesson Books (5 per course)
  const lessonBookCount = 5 * courses.length;
  await Promise.all(
    courses.flatMap((course: Course) =>
      Array.from({ length: 5 }).map((_, i: number) =>
        prisma.lessonBook.create({
          data: {
            orgId,
            title: `${course.name} Book ${i + 1}`,
            courseId: course.id,
            price:
              Math.floor(
                Math.random() * (BOOK_PRICE_RANGE[1] - BOOK_PRICE_RANGE[0])
              ) + BOOK_PRICE_RANGE[0],
          },
        })
      )
    )
  );
  console.log(`✅ Created ${lessonBookCount} lesson books`);

  // 7. Add Monthly Fee Payments Jan - June for all students
  let totalPayments = 0;
  for (const student of students) {
    for (const month of JAN_TO_JUNE) {
      await prisma.purchase.create({
        data: {
          studentId: student.id,
          type: "MONTHLY_FEE",
          amount: MONTHLY_FEE,
          method: "CASH",
          paidAt: randomDate(month),
          forMonth: new Date(2025, month - 1, 1),
          orgId: ORG_ID,
        },
      });
      totalPayments++;
    }
  }
  console.log(`✅ Added ${totalPayments} monthly payments (Jan–June)`);

  // 8. Add July payment for 60% of students
  const sixtyPercent = Math.floor(students.length * 0.6);
  const julyPayers: Student[] = students.slice(0, sixtyPercent);
  let julyPayments = 0;

  for (const student of julyPayers) {
    await prisma.purchase.create({
      data: {
        studentId: student.id,
        type: "MONTHLY_FEE",
        amount: MONTHLY_FEE,
        method: "CASH",
        paidAt: randomDate(7),
        forMonth: new Date(2025, 6, 1),
        orgId: ORG_ID,
      },
    });
    julyPayments++;
  }
  console.log(`✅ Added ${julyPayments} July payments`);

  // 9. Create Schedules
  const WEEKDAY_TIME_SLOTS = [
    { start: "15:00", end: "16:00" },
    { start: "16:00", end: "17:00" },
    { start: "17:00", end: "18:00" },
  ];
  const SATURDAY_TIME_SLOT = [{ start: "08:00", end: "09:00" }];

  const schedules: Schedule[] = [];

  for (let weekday = 1; weekday <= 5; weekday++) {
    for (const course of courses) {
      for (const slot of WEEKDAY_TIME_SLOTS) {
        const date = getNextDateByWeekday(weekday);
        const [startHour, startMin] = slot.start.split(":").map(Number);
        const [endHour, endMin] = slot.end.split(":").map(Number);

        const startTime = new Date(date);
        startTime.setHours(startHour, startMin, 0, 0);
        const endTime = new Date(date);
        endTime.setHours(endHour, endMin, 0, 0);

        const teacher = teachers[Math.floor(Math.random() * teachers.length)];
        const room = rooms[Math.floor(Math.random() * rooms.length)];

        const schedule = await prisma.schedule.create({
          data: {
            orgId,
            courseId: course.id,
            teacherId: teacher.id,
            roomId: room.id,
            dayOfWeek: 5,
            startTime,
            endTime,
          },
        });

        schedules.push(schedule);
      }
    }
  }

  const saturday = 6;
  for (const course of courses) {
    for (const slot of SATURDAY_TIME_SLOT) {
      const date = getNextDateByWeekday(saturday);
      const [startHour, startMin] = slot.start.split(":").map(Number);
      const [endHour, endMin] = slot.end.split(":").map(Number);

      const startTime = new Date(date);
      startTime.setHours(startHour, startMin, 0, 0);
      const endTime = new Date(date);
      endTime.setHours(endHour, endMin, 0, 0);

      const teacher = teachers[Math.floor(Math.random() * teachers.length)];
      const room = rooms[Math.floor(Math.random() * rooms.length)];

      const schedule = await prisma.schedule.create({
        data: {
          orgId,
          courseId: course.id,
          teacherId: teacher.id,
          roomId: room.id,
          dayOfWeek: 1,
          startTime,
          endTime,
        },
      });

      schedules.push(schedule);
    }
  }

  console.log(`✅ Created ${schedules.length} schedules`);

  // 10. Assign students to schedules randomly (10-15 students each)
  let totalStudentSchedules = 0;

  for (const schedule of schedules) {
    const numStudents = 10 + Math.floor(Math.random() * 6);
    const selectedStudents: Student[] = [];

    while (selectedStudents.length < numStudents) {
      const randomStudent =
        students[Math.floor(Math.random() * students.length)];
      if (!selectedStudents.includes(randomStudent)) {
        selectedStudents.push(randomStudent);
      }
    }

    for (const student of selectedStudents) {
      await prisma.studentSchedule.create({
        data: {
          orgId,
          scheduleId: schedule.id,
          studentId: student.id,
          attended: false,
        },
      });
      totalStudentSchedules++;
    }
  }

  console.log(`✅ Created ${totalStudentSchedules} student schedules`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
