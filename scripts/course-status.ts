import {
  CourseStatus,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();
const orgId = "cmcysksck0000jr04x1y1w2ep";

const possibleStatuses = [
  CourseStatus.ENROLLED,
  CourseStatus.PAUSED,
  CourseStatus.RESUMED,
  CourseStatus.FINISHED,
];

const randomDateBetween = (start: Date, end: Date): Date => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

async function seedCourseStatusLogs() {
  console.log("🚀 Starting CourseStatusLog seed...");

  // Fetch all StudentCourse records
  const studentCourses = await prisma.studentCourse.findMany();

  let totalLogs = 0;

  for (const sc of studentCourses) {
    // Always create an initial ENROLLED status log at enrolledAt
    await prisma.courseStatusLog.create({
      data: {
        orgId,
        studentCourseId: sc.id,
        status: CourseStatus.ENROLLED,
        changedAt: sc.enrolledAt,
        note: "Initial enrollment",
      },
    });
    totalLogs++;

    // Randomly create 0-2 more status logs to simulate status changes
    const numberOfChanges = Math.floor(Math.random() * 3); // 0,1, or 2

    let lastChangeDate = sc.enrolledAt;

    for (let i = 0; i < numberOfChanges; i++) {
      // Pick a random status excluding ENROLLED because that is initial
      const statuses = possibleStatuses.filter(
        (s) => s !== CourseStatus.ENROLLED
      );

      // Random status
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      // Random changedAt after lastChangeDate but before now
      const changedAt = randomDateBetween(lastChangeDate, new Date());

      await prisma.courseStatusLog.create({
        data: {
          orgId,
          studentCourseId: sc.id,
          status,
          changedAt,
          note: `Status changed to ${status}`,
        },
      });
      totalLogs++;
      lastChangeDate = changedAt;
    }
  }

  console.log(`✅ Created ${totalLogs} course status logs.`);
}

seedCourseStatusLogs()
  .catch((e) => {
    console.error("❌ Seed failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
