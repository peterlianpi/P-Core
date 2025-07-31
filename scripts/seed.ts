import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const orgId = "cmcysksck0000jr04x1y1w2ep";

const COURSE_NAMES = ["Piano", "Guitar", "Drum", "Violin"];
const BOOK_PRICE_RANGE = [10000, 15000];
const MONTHLY_FEE = 30000;
const ORG_ID = orgId;
const JAN_TO_JUNE = [1, 2, 3, 4, 5, 6];

const randomDate = (month: number, year = 2025): Date => {
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(year, month - 1, day);
};

async function main() {
  console.log("🚀 Starting seed...");

  // 1. Create Courses
  const courses = await Promise.all(
    COURSE_NAMES.map((name: string) =>
      prisma.course.create({
        data: { 
          name, 
          orgId: ORG_ID,
          price: 100000, // 100,000 MMK
          duration: 60, // 60 minutes
        },
      })
    )
  );
  console.log(`✅ Created ${courses.length} courses`);

  // 2. Create Students
  const students = await Promise.all(
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

  // 3. Assign each student to a random course
  const studentCourses = await Promise.all(
    students.map((student) => {
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

  // 4. Create Lesson Books (5 per course)
  const lessonBookCount = 5 * courses.length;
  await Promise.all(
    courses.flatMap((course) =>
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

  // 5. Add Monthly Fee Payments Jan - June for all students
  let totalPayments = 0;
  for (const student of students) {
    for (const month of JAN_TO_JUNE) {
      await prisma.purchase.create({
        data: {
          studentId: student.id,
          amount: MONTHLY_FEE,
          method: "CASH",
          status: "COMPLETED",
          orgId: ORG_ID,
        },
      });
      totalPayments++;
    }
  }
  console.log(`✅ Added ${totalPayments} monthly payments (Jan–June)`);

  // 6. Add July payment for 60% of students
  const sixtyPercent = Math.floor(students.length * 0.6);
  const julyPayers = students.slice(0, sixtyPercent);
  let julyPayments = 0;

  for (const student of julyPayers) {
    await prisma.purchase.create({
      data: {
        studentId: student.id,
        amount: MONTHLY_FEE,
        method: "CASH",
        status: "COMPLETED",
        orgId: ORG_ID,
      },
    });
    julyPayments++;
  }
  console.log(`✅ Added ${julyPayments} July payments`);

  // 7. Create Schedules
  const schedules = [];
  for (const course of courses) {
    const schedule = await prisma.schedule.create({
      data: {
        orgId,
        title: `${course.name} Class`,
        courseId: course.id,
        startTime: new Date("2025-01-01T15:00:00"),
        endTime: new Date("2025-01-01T16:00:00"),
        dayOfWeek: "MONDAY",
        room: "Room 101",
      },
    });
    schedules.push(schedule);
  }

  console.log(`✅ Created ${schedules.length} schedules`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
