import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const orgId = "cmd1zpyxg0000954wiao2l4zc";

// Helper to generate a random date within a month/year
const randomDate = (month: number, year = 2025): Date => {
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(year, month - 1, day);
};

async function seedLessonProgress() {
  console.log("🚀 Starting lesson progress seed...");

  // Fetch all students with their courses
  const studentsWithCourses = await prisma.student.findMany({
    include: {
      courses: true, // StudentCourse[]
    },
  });

  let totalProgressRecords = 0;

  for (const student of studentsWithCourses) {
    // For each enrolled course of the student
    for (const studentCourse of student.courses) {
      // Fetch lesson books for the student's course
      const lessonBooks = await prisma.lessonBook.findMany({
        where: { courseId: studentCourse.courseId },
      });

      for (const lessonBook of lessonBooks) {
        // Randomly decide if completed or not
        const completed = Math.random() > 0.3; // 70% chance completed

        await prisma.lessonProgress.create({
          data: {
            orgId,
            studentId: student.id,
            lessonBookId: lessonBook.id,
            completed,
            completedAt: completed
              ? randomDate(new Date().getMonth() + 1)
              : null,
            notes: completed ? "Completed successfully" : null,
          },
        });

        totalProgressRecords++;
      }
    }
  }

  console.log(`✅ Created ${totalProgressRecords} lesson progress records.`);
}

seedLessonProgress()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
