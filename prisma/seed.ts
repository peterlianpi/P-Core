// Prisma seed script for P-Core (feature-based, idempotent, multi-tenant)
// Run with: bunx prisma db seed
// - Seeds authentication, organizations, academic (students/courses/schedules), church, choir, library, media, and system data
// - Uses upsert/find-first patterns to be idempotent
// - Ensures orgId is set for all domain data (multi-tenancy)
// - Adds clear comments per project guidelines

import {
  PrismaClient,
  UserRole,
  OrganizationType,
  OrganizationRole,
  Gender,
  StaffPosition,
  LibraryType,
  TelegramScope,
  DayOfWeek,
  PurchaseStatus,
  PaymentMethod,
  ChoirMemberStatus,
  ImageOwner,
  StudentCourseStatus,
} from '@prisma/client';
import { addDays } from 'date-fns';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// -----------------------------
// AUTH & ORG FEATURE
// -----------------------------
async function seedAuthAndOrg() {
  // Hash passwords (never store plain text)
  const adminPasswordHash = await bcrypt.hash('adminpass', 10);
  const userPasswordHash = await bcrypt.hash('userpass', 10);

  // Users
  const user1 = await prisma.user.upsert({
    where: { email: 'admin@p-core.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@p-core.com',
      password: adminPasswordHash,
      role: UserRole.SUPERADMIN,
      isTwoFactorEnabled: false,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user@p-core.com' },
    update: {},
    create: {
      name: 'Regular User',
      email: 'user@p-core.com',
      password: userPasswordHash,
      role: UserRole.USER,
      isTwoFactorEnabled: false,
    },
  });

  // Organization (single tenant for seed)
  const org = await prisma.organization.upsert({
    where: { id: 'org1' },
    update: {},
    create: {
      id: 'org1',
      name: 'P-Core School',
      type: OrganizationType.SCHOOL,
      createdById: user1.id,
    },
  });

  // Link users to organization with roles
  await prisma.userOrganization.upsert({
    where: { userId_organizationId: { userId: user1.id, organizationId: org.id } },
    update: {},
    create: {
      userId: user1.id,
      organizationId: org.id,
      role: OrganizationRole.SUPER_ADMIN,
    },
  });

  await prisma.userOrganization.upsert({
    where: { userId_organizationId: { userId: user2.id, organizationId: org.id } },
    update: {},
    create: {
      userId: user2.id,
      organizationId: org.id,
      role: OrganizationRole.MEMBER,
    },
  });

  // Set default organization
  await prisma.user.update({ where: { id: user1.id }, data: { defaultOrgId: org.id } });
  await prisma.user.update({ where: { id: user2.id }, data: { defaultOrgId: org.id } });

  // Optional: Invite a new user to org (idempotent via composite unique)
  await prisma.organizationInvite.upsert({
    where: { email_organizationId: { email: 'invitee@p-core.com', organizationId: org.id } },
    update: {},
    create: {
      invitedBy: user1.id,
      email: 'invitee@p-core.com',
      organizationId: org.id,
      role: OrganizationRole.MEMBER,
      token: 'seed-token-invitee-org1',
      expiresAt: addDays(new Date(), 14),
    },
  });

  // Update log (non-unique; create if not exists to avoid duplicates on repeated seeds)
  const existingLog = await prisma.updateLog.findFirst({ where: { orgId: org.id, name: 'Seed: Initial' } });
  if (!existingLog) {
    await prisma.updateLog.create({
      data: {
        name: 'Seed: Initial',
        message: 'Initial seed data created',
        orgId: org.id,
        updatedBy: user1.id,
      },
    });
  }

  // Telegram setting (unique per user/org/scope)
  await prisma.telegramSetting.upsert({
    where: { userId_orgId_scope: { userId: user1.id, orgId: org.id, scope: TelegramScope.ORG } },
    update: {},
    create: {
      userId: user1.id,
      orgId: org.id,
      chatId: '123456',
      botToken: 'bot:token',
      scope: TelegramScope.ORG,
      isActive: true,
    },
  });

  // Version info (unique by version)
  await prisma.versionInfo.upsert({
    where: { version: '1.0.0' },
    update: { isActive: true },
    create: {
      version: '1.0.0',
      name: 'Initial Release',
      releaseDate: new Date(),
      createdBy: user1.id,
      orgId: org.id,
      isActive: true,
    },
  });

  // Feedback (non-unique)
  const existingFeedback = await prisma.feedback.findFirst({ where: { orgId: org.id, message: 'This is a seeded feedback.' } });
  if (!existingFeedback) {
    await prisma.feedback.create({
      data: {
        name: 'Feedback User',
        message: 'This is a seeded feedback.',
        orgId: org.id,
      },
    });
  }

  return { user1, user2, org };
}

// -----------------------------
// CHURCH FEATURE (Khawk/Veng/Home/Member + Relationships/Roles)
// -----------------------------
async function seedChurch(orgId: string) {
  const khawk = await prisma.khawk.upsert({
    where: { name_orgId: { name: 'Central Khawk', orgId } },
    update: {},
    create: { name: 'Central Khawk', orgId },
  });

  const veng = await prisma.veng.upsert({
    where: { name_orgId: { name: 'Main Veng', orgId } },
    update: {},
    create: { name: 'Main Veng', orgId, khawkId: khawk.id },
  });

  const home = await prisma.home.upsert({
    where: { homeNumber_orgId: { homeNumber: 'H-001', orgId } },
    update: {},
    create: { homeNumber: 'H-001', orgId, vengId: veng.id, address: '123 Main St' },
  });

  const member = await prisma.member.upsert({
    where: { number_orgId: { number: 'MBR-001', orgId } },
    update: { homeId: home.id },
    create: {
      number: 'MBR-001',
      name: 'John Doe',
      orgId,
      homeId: home.id,
      gender: Gender.MALE,
      isActive: true,
    },
  });

  // Relationship types (global and org-specific)
  const spouseTypeExisting = await prisma.relationshipType.findFirst({
    where: { name: 'Spouse', orgId: { equals: null } },
  });
  const spouseType = spouseTypeExisting ?? (await prisma.relationshipType.create({
    data: { name: 'Spouse' },
  }));
  const parentType = await prisma.relationshipType.upsert({
    where: { name_orgId: { name: 'Parent', orgId } },
    update: {},
    create: { name: 'Parent', orgId },
  });

  // Member roles and assignment
  const choirRoleExisting = await prisma.memberRole.findFirst({
    where: { name: 'Choir', orgId: { equals: null } },
  });
  const choirRole = choirRoleExisting ?? (await prisma.memberRole.create({
    data: { name: 'Choir' },
  }));
  await prisma.memberRoleAssignment.upsert({
    where: { memberId_roleId: { memberId: member.id, roleId: choirRole.id } },
    update: {},
    create: { memberId: member.id, roleId: choirRole.id },
  });

  return { khawk, veng, home, member, spouseType, parentType };
}

// -----------------------------
// LIBRARY FEATURE
// -----------------------------
async function seedLibrary(orgId: string) {
  const library = await prisma.library.upsert({
    where: { orgId_code: { orgId, code: 'MAIN' } },
    update: {},
    create: {
      name: 'Main Library',
      code: 'MAIN',
      orgId,
      type: LibraryType.PUBLIC,
      address: 'Library Ave',
      city: 'Cityville',
      state: 'State',
      country: 'Myanmar',
      isActive: true,
      operatingHours: {
        mon: '9:00-17:00',
        tue: '9:00-17:00',
        wed: '9:00-17:00',
        thu: '9:00-17:00',
        fri: '9:00-17:00',
      },
      finePerDay: '100.00', // Decimal as string
    },
  });

  const section = await prisma.librarySection.upsert({
    where: { libraryId_code: { libraryId: library.id, code: 'GEN' } },
    update: {},
    create: { name: 'General', code: 'GEN', libraryId: library.id, orgId, isActive: true },
  });

  const staff = await prisma.libraryStaff.upsert({
    where: { libraryId_email: { libraryId: library.id, email: 'libby@p-core.com' } },
    update: {},
    create: {
      firstName: 'Libby',
      lastName: 'Staff',
      email: 'libby@p-core.com',
      hireDate: new Date(),
      position: StaffPosition.LIBRARIAN,
      salary: '300000.00', // Decimal as string
      libraryId: library.id,
      orgId,
      isActive: true,
    },
  });

  const book = await prisma.book.upsert({
    where: { isbn_orgId: { isbn: '978-0000000001', orgId } },
    update: { libraryId: library.id, sectionId: section.id },
    create: {
      title: 'Seeded Book',
      author: 'Author A',
      isbn: '978-0000000001',
      orgId,
      libraryId: library.id,
      sectionId: section.id,
      total: 10,
      available: 10,
      isActive: true,
    },
  });

  // Book loan (create once) - check any existing loan for this book in this org
  const existingLoan = await prisma.bookLoan.findFirst({ where: { orgId, bookId: book.id } });
  if (!existingLoan) {
    // A member reference is needed; linking is handled in the orchestrator after church seed
  }

  return { library, section, staff, book };
}

// -----------------------------
// ACADEMICS FEATURE (Students/Courses/Schedules)
// -----------------------------
async function seedAcademics(orgId: string) {
  const student = await prisma.student.upsert({
    where: { number_orgId: { number: 'STU-001', orgId } },
    update: {},
    create: {
      number: 'STU-001',
      name: 'Student One',
      email: 'student1@p-core.com',
      phone: '091111111',
      gender: Gender.FEMALE,
      orgId,
      isActive: true,
    },
  });

  const courseMath = await prisma.course.upsert({
    where: { name_orgId: { name: 'Math 101', orgId } },
    update: {},
    create: {
      name: 'Math 101',
      description: 'Fundamentals of Algebra',
      orgId,
      price: '100.00', // Decimal as string
      duration: 90,
      isActive: true,
    },
  });

  const courseEng = await prisma.course.upsert({
    where: { name_orgId: { name: 'English 101', orgId } },
    update: {},
    create: {
      name: 'English 101',
      description: 'Basic English Grammar',
      orgId,
      price: '120.00',
      duration: 90,
      isActive: true,
    },
  });

  // Lesson book for Math 101
  const existingLessonBook = await prisma.lessonBook.findFirst({ where: { orgId, courseId: courseMath.id, title: 'Algebra Basics' } });
  const lessonBook = existingLessonBook
    ? existingLessonBook
    : await prisma.lessonBook.create({
        data: {
          title: 'Algebra Basics',
          author: 'Prof. X',
          isbn: 'LB-ALGB-001',
          price: '25.50',
          courseId: courseMath.id,
          orgId,
          isActive: true,
        },
      });

  // Schedule (Math 101 - Monday 9:00-10:30)
  const existingSchedule = await prisma.schedule.findFirst({
    where: { orgId, courseId: courseMath.id, dayOfWeek: DayOfWeek.MONDAY },
  });
  const schedule = existingSchedule
    ? existingSchedule
    : await prisma.schedule.create({
        data: {
          title: 'Math 101 - Morning',
          courseId: courseMath.id,
          startTime: new Date(new Date().setHours(9, 0, 0, 0)),
          endTime: new Date(new Date().setHours(10, 30, 0, 0)),
          dayOfWeek: DayOfWeek.MONDAY,
          room: 'Room A',
          orgId,
          isActive: true,
        },
      });

  // Enrollment
  const studentCourse = await prisma.studentCourse.upsert({
    where: { studentId_courseId_orgId: { studentId: student.id, courseId: courseMath.id, orgId } },
    update: {},
    create: { studentId: student.id, courseId: courseMath.id, orgId },
  });

  // Course status log (create once)
  const existingStatusLog = await prisma.courseStatusLog.findFirst({ where: { orgId, studentCourseId: studentCourse.id } });
  if (!existingStatusLog) {
    await prisma.courseStatusLog.create({
      data: {
        studentCourseId: studentCourse.id,
        status: StudentCourseStatus.ENROLLED,
        note: 'Initial enrollment',
        orgId,
      },
    });
  }

  // Purchase
  const existingPurchase = await prisma.purchase.findFirst({ where: { orgId, studentId: student.id, courseId: courseMath.id } });
  if (!existingPurchase) {
    await prisma.purchase.create({
      data: {
        studentId: student.id,
        courseId: courseMath.id,
        amount: '100.00',
        status: PurchaseStatus.COMPLETED,
        method: PaymentMethod.CASH,
        reference: 'INV-1001',
        orgId,
      },
    });
  }

  return { student, courseMath, courseEng, lessonBook, schedule, studentCourse };
}

// -----------------------------
// CHOIR FEATURE
// -----------------------------
async function seedChoir(orgId: string, memberId: string) {
  const choir = await prisma.choir.upsert({
    where: { name_orgId: { name: 'Main Choir', orgId } },
    update: {},
    create: { name: 'Main Choir', orgId, isActive: true },
  });

  await prisma.choirMember.upsert({
    where: { choirId_memberId_orgId: { choirId: choir.id, memberId, orgId } },
    update: {},
    create: { choirId: choir.id, memberId, orgId, status: ChoirMemberStatus.ACTIVE },
  });

  const existingSong = await prisma.song.findFirst({ where: { orgId, choirId: choir.id, title: 'Seed Song' } });
  const song = existingSong
    ? existingSong
    : await prisma.song.create({ data: { title: 'Seed Song', choirId: choir.id, orgId, isActive: true } });

  const existingEvent = await prisma.choirEvent.findFirst({ where: { orgId, choirId: choir.id, title: 'Opening Event' } });
  const event = existingEvent
    ? existingEvent
    : await prisma.choirEvent.create({
        data: { title: 'Opening Event', choirId: choir.id, orgId, eventDate: addDays(new Date(), 7), location: 'Auditorium' },
      });

  return { choir, song, event };
}

// -----------------------------
// MEDIA FEATURE (Images)
// -----------------------------
async function seedImages(orgId: string, deps: { userId: string; studentId: string; bookId: string; }) {
  // Images have unique publicId; use deterministic ones for idempotency
  await prisma.image.upsert({
    where: { publicId: 'usr_admin_avatar' },
    update: {},
    create: {
      publicId: 'usr_admin_avatar',
      url: 'https://example.com/images/user-admin.png',
      folder: 'user-profile',
      feature: 'user-profile',
      ownerId: deps.userId,
      ownerType: ImageOwner.USER,
      orgId,
    },
  });

  await prisma.image.upsert({
    where: { publicId: 'org_logo_main' },
    update: {},
    create: {
      publicId: 'org_logo_main',
      url: 'https://example.com/images/org-logo.png',
      folder: 'org-logo',
      feature: 'org-logo',
      ownerId: orgId,
      ownerType: ImageOwner.ORGANIZATION,
      orgId,
    },
  });

  await prisma.image.upsert({
    where: { publicId: 'student_001_avatar' },
    update: {},
    create: {
      publicId: 'student_001_avatar',
      url: 'https://example.com/images/student-1.png',
      folder: 'student-profile',
      feature: 'student-profile',
      ownerId: deps.studentId,
      ownerType: ImageOwner.STUDENT,
      orgId,
    },
  });

  await prisma.image.upsert({
    where: { publicId: 'book_9780000000001_cover' },
    update: {},
    create: {
      publicId: 'book_9780000000001_cover',
      url: 'https://example.com/images/book-1.png',
      folder: 'book-covers',
      feature: 'book',
      ownerId: deps.bookId,
      ownerType: ImageOwner.BOOK,
      orgId,
    },
  });
}

// -----------------------------
// ORCHESTRATOR
// -----------------------------
async function main() {
  // Seed by feature
  const { user1, user2, org } = await seedAuthAndOrg();
  const church = await seedChurch(org.id);
  const library = await seedLibrary(org.id);
  const academics = await seedAcademics(org.id);
  const choir = await seedChoir(org.id, church.member.id);

  // Link a library book loan to a member if not already linked
  const existingLoan = await prisma.bookLoan.findFirst({ where: { orgId: org.id, bookId: library.book.id, memberId: church.member.id } });
  if (!existingLoan) {
    await prisma.bookLoan.create({
      data: {
        bookId: library.book.id,
        memberId: church.member.id,
        orgId: org.id,
        dueDate: addDays(new Date(), 14),
      },
    });
  }

  // Optionally loan book to a student as well (if none exists)
  const existingStudentLoan = await prisma.bookLoan.findFirst({ where: { orgId: org.id, bookId: library.book.id, studentId: academics.student.id } });
  if (!existingStudentLoan) {
    await prisma.bookLoan.create({
      data: {
        bookId: library.book.id,
        memberId: church.member.id, // Required by schema
        studentId: academics.student.id,
        orgId: org.id,
        dueDate: addDays(new Date(), 7),
      },
    });
  }

  // Seed images for key entities
  await seedImages(org.id, { userId: user1.id, studentId: academics.student.id, bookId: library.book.id });

  // Final console outputs for quick verification
  console.log('Seed complete:');
  console.log({
    org: org.name,
    users: [user1.email, user2.email],
    church: { member: church.member.name },
    library: { name: library.library.name, section: library.section.name },
    academics: { student: academics.student.name, courses: [academics.courseMath.name, academics.courseEng.name] },
    choir: { name: choir.choir.name },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
