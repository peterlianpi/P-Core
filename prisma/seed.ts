// Prisma seed script for P-Core
// Run with: npx prisma db seed
// This script seeds foundational and related data for all models, respecting relationships.
// For more info: https://www.prisma.io/docs/guides/database/seed

import { PrismaClient, UserRole, OrganizationType, OrganizationRole, Gender, StaffPosition, LibraryType } from '@prisma/client';
import { addDays } from 'date-fns';
import bcrypt from 'bcryptjs'; // For password hashing

const prisma = new PrismaClient();

async function main() {
  // --- Seed Users ---
  // Hash passwords before storing them in the database for security
  const adminPasswordHash = await bcrypt.hash('adminpass', 10);
  const userPasswordHash = await bcrypt.hash('userpass', 10);

  const user1 = await prisma.user.upsert({
    where: { email: 'admin@p-core.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@p-core.com',
      password: adminPasswordHash, // Store hashed password
      role: UserRole.SUPERADMIN,
      isTwoFactorEnabled: false,
    },
  });
  console.log('Seeded user1:', user1.email);

  const user2 = await prisma.user.upsert({
    where: { email: 'user@p-core.com' },
    update: {},
    create: {
      name: 'Regular User',
      email: 'user@p-core.com',
      password: userPasswordHash, // Store hashed password
      role: UserRole.USER,
      isTwoFactorEnabled: false,
    },
  });
  console.log('Seeded user2:', user2.email);

  // --- Seed Organization ---
  const org1 = await prisma.organization.upsert({
    where: { id: 'org1' },
    update: {},
    create: {
      id: 'org1',
      name: 'P-Core School',
      type: OrganizationType.SCHOOL,
      createdById: user1.id,
    },
  });
  console.log('Seeded organization:', org1.name);

  // --- Seed UserOrganization (many-to-many) ---
  await prisma.userOrganization.upsert({
    where: { userId_organizationId: { userId: user1.id, organizationId: org1.id } },
    update: {},
    create: {
      userId: user1.id,
      organizationId: org1.id,
      role: OrganizationRole.SUPER_ADMIN,
    },
  });
  console.log('Linked user1 to org1 as SUPER_ADMIN');
  await prisma.userOrganization.upsert({
    where: { userId_organizationId: { userId: user2.id, organizationId: org1.id } },
    update: {},
    create: {
      userId: user2.id,
      organizationId: org1.id,
      role: OrganizationRole.MEMBER,
    },
  });
  console.log('Linked user2 to org1 as MEMBER');

  // --- Seed Khawk, Veng, Home, Member ---
  const khawk = await prisma.khawk.create({
    data: {
      name: 'Central Khawk',
      orgId: org1.id,
    },
  });
  console.log('Seeded khawk:', khawk.name);
  const veng = await prisma.veng.create({
    data: {
      name: 'Main Veng',
      orgId: org1.id,
      khawkId: khawk.id,
    },
  });
  console.log('Seeded veng:', veng.name);
  const home = await prisma.home.create({
    data: {
      homeNumber: 'H-001',
      orgId: org1.id,
      vengId: veng.id,
      address: '123 Main St',
    },
  });
  console.log('Seeded home:', home.homeNumber);
  const member = await prisma.member.create({
    data: {
      name: 'John Doe',
      orgId: org1.id,
      homeId: home.id,
      gender: Gender.MALE,
      isActive: true,
    },
  });
  console.log('Seeded member:', member.name);

  // --- Seed Library, Section, Staff, Book ---
  const library = await prisma.library.create({
    data: {
      name: 'Main Library',
      orgId: org1.id,
      type: LibraryType.PUBLIC,
      address: 'Library Ave',
      city: 'Cityville',
      state: 'State',
      country: 'Myanmar',
      isActive: true,
    },
  });
  console.log('Seeded library:', library.name);
  const section = await prisma.librarySection.create({
    data: {
      name: 'General',
      libraryId: library.id,
      orgId: org1.id,
      isActive: true,
    },
  });
  console.log('Seeded library section:', section.name);
  const staff = await prisma.libraryStaff.create({
    data: {
      firstName: 'Libby',
      lastName: 'Staff',
      email: 'libby@p-core.com',
      hireDate: new Date(),
      position: StaffPosition.LIBRARIAN,
      libraryId: library.id,
      orgId: org1.id,
      isActive: true,
    },
  });
  console.log('Seeded library staff:', staff.email);
  const book = await prisma.book.create({
    data: {
      title: 'Seeded Book',
      author: 'Author A',
      orgId: org1.id,
      libraryId: library.id,
      sectionId: section.id,
      total: 10,
      available: 10,
      isActive: true,
    },
  });
  console.log('Seeded book:', book.title);

  // --- Seed Student, Course, StudentCourse, Purchase ---
  const student = await prisma.student.create({
    data: {
      name: 'Student One',
      orgId: org1.id,
      isActive: true,
    },
  });
  console.log('Seeded student:', student.name);
  const course = await prisma.course.create({
    data: {
      name: 'Math 101',
      orgId: org1.id,
      price: 100.00,
      isActive: true,
    },
  });
  console.log('Seeded course:', course.name);
  const studentCourse = await prisma.studentCourse.create({
    data: {
      studentId: student.id,
      courseId: course.id,
      orgId: org1.id,
    },
  });
  console.log('Linked student to course:', studentCourse.id);
  await prisma.purchase.create({
    data: {
      studentId: student.id,
      courseId: course.id,
      orgId: org1.id,
      amount: 100.00,
    },
  });
  console.log('Seeded purchase for student:', student.name);

  // --- Seed Choir, ChoirMember, Song, ChoirEvent ---
  const choir = await prisma.choir.create({
    data: {
      name: 'Main Choir',
      orgId: org1.id,
      isActive: true,
    },
  });
  console.log('Seeded choir:', choir.name);
  const choirMember = await prisma.choirMember.create({
    data: {
      choirId: choir.id,
      memberId: member.id,
      orgId: org1.id,
    },
  });
  console.log('Seeded choir member:', choirMember.id);
  const song = await prisma.song.create({
    data: {
      title: 'Seed Song',
      choirId: choir.id,
      orgId: org1.id,
      isActive: true,
    },
  });
  console.log('Seeded song:', song.title);
  await prisma.choirEvent.create({
    data: {
      title: 'Opening Event',
      choirId: choir.id,
      orgId: org1.id,
      eventDate: addDays(new Date(), 7),
    },
  });
  console.log('Seeded choir event: Opening Event');

  // --- Seed Feedback ---
  await prisma.feedback.create({
    data: {
      name: 'Feedback User',
      message: 'This is a seeded feedback.',
      orgId: org1.id,
    },
  });
  console.log('Seeded feedback');

  // --- Seed TelegramSetting ---
  await prisma.telegramSetting.create({
    data: {
      userId: user1.id,
      orgId: org1.id,
      chatId: '123456',
      botToken: 'bot:token',
      isActive: true,
    },
  });
  console.log('Seeded telegram setting');

  // --- Seed VersionInfo ---
  await prisma.versionInfo.create({
    data: {
      version: '1.0.0',
      name: 'Initial Release',
      releaseDate: new Date(),
      createdBy: user1.id,
      orgId: org1.id,
      isActive: true,
    },
  });
  console.log('Seeded version info');

  // --- Seed BookLoan ---
  await prisma.bookLoan.create({
    data: {
      bookId: book.id,
      memberId: member.id,
      orgId: org1.id,
      dueDate: addDays(new Date(), 14),
    },
  });
  console.log('Seeded book loan');

  // --- Add more seeding as needed for other models ---
}

main()
  .then(() => {
    console.log('Seeding complete.');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('Seeding error:', e);
    return prisma.$disconnect().then(() => process.exit(1));
  });
