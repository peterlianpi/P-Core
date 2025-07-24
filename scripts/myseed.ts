import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean existing data (development only)
  if (process.env.NODE_ENV === 'development') {
    console.log('🧹 Cleaning existing data...');
    
    // Domain schema cleanup
    await prisma.purchase.deleteMany();
    await prisma.courseStatusLog.deleteMany();
    await prisma.studentCourse.deleteMany();
    await prisma.schedule.deleteMany();
    await prisma.lessonBook.deleteMany();
    await prisma.student.deleteMany();
    await prisma.course.deleteMany();
    
    // Auth schema cleanup
    await prisma.updateLog.deleteMany();
    await prisma.userOrganization.deleteMany();
    await prisma.organization.deleteMany();
    await prisma.twoFactorConfirmation.deleteMany();
    await prisma.twoFactorToken.deleteMany();
    await prisma.passwordResetToken.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();
  }

  // Create sample users
  console.log('👥 Creating users...');
  
  const hashedPassword = await hash('password123', 12);
  
  const superAdmin = await prisma.user.create({
    data: {
      id: 'user_superadmin',
      name: 'Super Admin',
      email: 'admin@pcore.com',
      password: hashedPassword,
      role: 'SUPERADMIN',
      emailVerified: new Date(),
    },
  });

  const schoolOwner = await prisma.user.create({
    data: {
      id: 'user_school_owner',
      name: 'John Smith',
      email: 'john@greenwood.edu',
      password: hashedPassword,
      role: 'USER',
      emailVerified: new Date(),
    },
  });

  const teacher = await prisma.user.create({
    data: {
      id: 'user_teacher',
      name: 'Sarah Johnson',
      email: 'sarah@greenwood.edu',
      password: hashedPassword,
      role: 'USER',
      emailVerified: new Date(),
    },
  });

  const student1 = await prisma.user.create({
    data: {
      id: 'user_student1',
      name: 'Alice Brown',
      email: 'alice@student.edu',
      password: hashedPassword,
      role: 'USER',
      emailVerified: new Date(),
    },
  });

  const student2 = await prisma.user.create({
    data: {
      id: 'user_student2',
      name: 'Bob Wilson',
      email: 'bob@student.edu',
      password: hashedPassword,
      role: 'USER',
      emailVerified: new Date(),
    },
  });

  // Create sample organizations
  console.log('🏢 Creating organizations...');
  
  const school = await prisma.organization.create({
    data: {
      id: 'org_greenwood_school',
      name: 'Greenwood Elementary School',
      description: 'A progressive elementary school focused on holistic education and character development.',
      type: 'SCHOOL',
      startedAt: new Date('2010-09-01'),
      createdById: schoolOwner.id,
    },
  });

  const university = await prisma.organization.create({
    data: {
      id: 'org_tech_university',
      name: 'Tech University',
      description: 'Leading university in technology and engineering education.',
      type: 'UNIVERSITY',
      startedAt: new Date('1995-01-15'),
      createdById: superAdmin.id,
    },
  });

  const trainingCenter = await prisma.organization.create({
    data: {
      id: 'org_skills_center',
      name: 'Professional Skills Training Center',
      description: 'Specialized training center for professional development and skill enhancement.',
      type: 'TRAINING_CENTER',
      startedAt: new Date('2018-03-01'),
      createdById: superAdmin.id,
    },
  });

  // Create user-organization relationships
  console.log('🔗 Creating user-organization relationships...');
  
  await prisma.userOrganization.createMany({
    data: [
      {
        userId: schoolOwner.id,
        organizationId: school.id,
        role: 'OWNER',
      },
      {
        userId: teacher.id,
        organizationId: school.id,
        role: 'MEMBER',
      },
      {
        userId: student1.id,
        organizationId: school.id,
        role: 'MEMBER',
      },
      {
        userId: student2.id,
        organizationId: school.id,
        role: 'MEMBER',
      },
      {
        userId: superAdmin.id,
        organizationId: university.id,
        role: 'OWNER',
      },
      {
        userId: superAdmin.id,
        organizationId: trainingCenter.id,
        role: 'OWNER',
      },
    ],
  });

  // Create sample courses for the school
  console.log('📚 Creating courses...');
  
  const mathCourse = await prisma.course.create({
    data: {
      id: 'course_math_grade5',
      name: 'Mathematics Grade 5',
      description: 'Comprehensive mathematics curriculum for 5th grade students covering arithmetic, basic geometry, and problem solving.',
      price: 150.00,
      duration: 45, // 45 minutes
      orgId: school.id,
    },
  });

  const englishCourse = await prisma.course.create({
    data: {
      id: 'course_english_grade5',
      name: 'English Language Arts Grade 5',
      description: 'Reading comprehension, creative writing, grammar, and literature for 5th grade students.',
      price: 120.00,
      duration: 50,
      orgId: school.id,
    },
  });

  const scienceCourse = await prisma.course.create({
    data: {
      id: 'course_science_grade5',
      name: 'Science Grade 5',
      description: 'Basic concepts in biology, chemistry, and physics with hands-on experiments.',
      price: 180.00,
      duration: 60,
      orgId: school.id,
    },
  });

  const artCourse = await prisma.course.create({
    data: {
      id: 'course_art_grade5',
      name: 'Creative Arts Grade 5',
      description: 'Drawing, painting, sculpture, and creative expression for young artists.',
      price: 100.00,
      duration: 40,
      orgId: school.id,
    },
  });

  // Create sample students
  console.log('👨‍🎓 Creating students...');
  
  const student1Record = await prisma.student.create({
    data: {
      id: 'student_alice',
      number: 'STU001',
      rollNumber: 'GW2024001',
      name: 'Alice Brown',
      email: 'alice.brown@student.greenwood.edu',
      phone: '+1-555-0101',
      gender: 'FEMALE',
      birthDate: new Date('2014-03-15'),
      address: '123 Oak Street, Springfield, IL 62701',
      parentName: 'David Brown',
      parentPhone: '+1-555-0102',
      notes: 'Excellent student with strong academic performance. Shows particular interest in mathematics and science.',
      orgId: school.id,
    },
  });

  const student2Record = await prisma.student.create({
    data: {
      id: 'student_bob',
      number: 'STU002',
      rollNumber: 'GW2024002',
      name: 'Bob Wilson',
      email: 'bob.wilson@student.greenwood.edu',
      phone: '+1-555-0201',
      gender: 'MALE',
      birthDate: new Date('2013-11-22'),
      address: '456 Maple Avenue, Springfield, IL 62702',
      parentName: 'Linda Wilson',
      parentPhone: '+1-555-0202',
      notes: 'Creative student with artistic talents. Enjoys group activities and collaborative learning.',
      orgId: school.id,
    },
  });

  const student3Record = await prisma.student.create({
    data: {
      id: 'student_emma',
      number: 'STU003',
      rollNumber: 'GW2024003',
      name: 'Emma Davis',
      email: 'emma.davis@student.greenwood.edu',
      phone: '+1-555-0301',
      gender: 'FEMALE',
      birthDate: new Date('2014-07-08'),
      address: '789 Pine Road, Springfield, IL 62703',
      parentName: 'Michael Davis',
      parentPhone: '+1-555-0302',
      notes: 'Enthusiastic learner with excellent communication skills. Natural leader in group projects.',
      orgId: school.id,
    },
  });

  const student4Record = await prisma.student.create({
    data: {
      id: 'student_james',
      number: 'STU004',
      rollNumber: 'GW2024004',
      name: 'James Miller',
      email: 'james.miller@student.greenwood.edu',
      phone: '+1-555-0401',
      gender: 'MALE',
      birthDate: new Date('2014-01-30'),
      address: '321 Elm Street, Springfield, IL 62704',
      parentName: 'Jennifer Miller',
      parentPhone: '+1-555-0402',
      notes: 'Quiet but highly observant student. Excels in reading and shows strong analytical thinking.',
      orgId: school.id,
    },
  });

  // Create student-course enrollments
  console.log('📝 Creating student enrollments...');
  
  await prisma.studentCourse.createMany({
    data: [
      // Alice Brown enrollments
      {
        studentId: student1Record.id,
        courseId: mathCourse.id,
        status: 'IN_PROGRESS',
        grade: 'A',
        orgId: school.id,
      },
      {
        studentId: student1Record.id,
        courseId: englishCourse.id,
        status: 'IN_PROGRESS',
        grade: 'A-',
        orgId: school.id,
      },
      {
        studentId: student1Record.id,
        courseId: scienceCourse.id,
        status: 'IN_PROGRESS',
        grade: 'A+',
        orgId: school.id,
      },
      
      // Bob Wilson enrollments
      {
        studentId: student2Record.id,
        courseId: artCourse.id,
        status: 'IN_PROGRESS',
        grade: 'A',
        orgId: school.id,
      },
      {
        studentId: student2Record.id,
        courseId: englishCourse.id,
        status: 'IN_PROGRESS',
        grade: 'B+',
        orgId: school.id,
      },
      {
        studentId: student2Record.id,
        courseId: mathCourse.id,
        status: 'IN_PROGRESS',
        grade: 'B',
        orgId: school.id,
      },
      
      // Emma Davis enrollments
      {
        studentId: student3Record.id,
        courseId: englishCourse.id,
        status: 'IN_PROGRESS',
        grade: 'A+',
        orgId: school.id,
      },
      {
        studentId: student3Record.id,
        courseId: scienceCourse.id,
        status: 'IN_PROGRESS',
        grade: 'A',
        orgId: school.id,
      },
      {
        studentId: student3Record.id,
        courseId: artCourse.id,
        status: 'ENROLLED',
        orgId: school.id,
      },
      
      // James Miller enrollments
      {
        studentId: student4Record.id,
        courseId: englishCourse.id,
        status: 'IN_PROGRESS',
        grade: 'A+',
        orgId: school.id,
      },
      {
        studentId: student4Record.id,
        courseId: mathCourse.id,
        status: 'IN_PROGRESS',
        grade: 'A-',
        orgId: school.id,
      },
    ],
  });

  // Create lesson books
  console.log('📖 Creating lesson books...');
  
  await prisma.lessonBook.createMany({
    data: [
      {
        title: 'Elementary Mathematics Workbook Grade 5',
        author: 'Dr. Sarah Peterson',
        isbn: '978-0-123456-78-9',
        price: 35.99,
        courseId: mathCourse.id,
        orgId: school.id,
      },
      {
        title: 'Creative Writing Adventures',
        author: 'Mark Thompson',
        isbn: '978-0-234567-89-0',
        price: 28.50,
        courseId: englishCourse.id,
        orgId: school.id,
      },
      {
        title: 'Young Scientists Explorer Guide',
        author: 'Dr. Emily Chen',
        isbn: '978-0-345678-90-1',
        price: 42.00,
        courseId: scienceCourse.id,
        orgId: school.id,
      },
      {
        title: 'Art Basics for Young Creators',
        author: 'Lisa Rodriguez',
        isbn: '978-0-456789-01-2',
        price: 25.75,
        courseId: artCourse.id,
        orgId: school.id,
      },
    ],
  });

  // Create schedules
  console.log('📅 Creating class schedules...');
  
  await prisma.schedule.createMany({
    data: [
      // Mathematics - Monday, Wednesday, Friday
      {
        title: 'Mathematics Grade 5 - Morning Session',
        courseId: mathCourse.id,
        startTime: new Date('2024-01-15T09:00:00Z'),
        endTime: new Date('2024-01-15T09:45:00Z'),
        dayOfWeek: 'MONDAY',
        room: 'Room 101',
        notes: 'Bring calculator and workbook',
        orgId: school.id,
      },
      {
        title: 'Mathematics Grade 5 - Morning Session',
        courseId: mathCourse.id,
        startTime: new Date('2024-01-17T09:00:00Z'),
        endTime: new Date('2024-01-17T09:45:00Z'),
        dayOfWeek: 'WEDNESDAY',
        room: 'Room 101',
        orgId: school.id,
      },
      {
        title: 'Mathematics Grade 5 - Morning Session',
        courseId: mathCourse.id,
        startTime: new Date('2024-01-19T09:00:00Z'),
        endTime: new Date('2024-01-19T09:45:00Z'),
        dayOfWeek: 'FRIDAY',
        room: 'Room 101',
        orgId: school.id,
      },
      
      // English - Tuesday, Thursday
      {
        title: 'English Language Arts Grade 5',
        courseId: englishCourse.id,
        startTime: new Date('2024-01-16T10:00:00Z'),
        endTime: new Date('2024-01-16T10:50:00Z'),
        dayOfWeek: 'TUESDAY',
        room: 'Room 102',
        notes: 'Reading assignment due',
        orgId: school.id,
      },
      {
        title: 'English Language Arts Grade 5',
        courseId: englishCourse.id,
        startTime: new Date('2024-01-18T10:00:00Z'),
        endTime: new Date('2024-01-18T10:50:00Z'),
        dayOfWeek: 'THURSDAY',
        room: 'Room 102',
        orgId: school.id,
      },
      
      // Science - Monday, Wednesday
      {
        title: 'Science Grade 5 - Lab Session',
        courseId: scienceCourse.id,
        startTime: new Date('2024-01-15T14:00:00Z'),
        endTime: new Date('2024-01-15T15:00:00Z'),
        dayOfWeek: 'MONDAY',
        room: 'Science Lab',
        notes: 'Wear safety goggles for experiments',
        orgId: school.id,
      },
      {
        title: 'Science Grade 5 - Lab Session',
        courseId: scienceCourse.id,
        startTime: new Date('2024-01-17T14:00:00Z'),
        endTime: new Date('2024-01-17T15:00:00Z'),
        dayOfWeek: 'WEDNESDAY',
        room: 'Science Lab',
        orgId: school.id,
      },
      
      // Art - Friday
      {
        title: 'Creative Arts Grade 5',
        courseId: artCourse.id,
        startTime: new Date('2024-01-19T13:00:00Z'),
        endTime: new Date('2024-01-19T13:40:00Z'),
        dayOfWeek: 'FRIDAY',
        room: 'Art Studio',
        notes: 'Bring art supplies',
        orgId: school.id,
      },
    ],
  });

  // Create sample purchases
  console.log('💰 Creating purchase records...');
  
  await prisma.purchase.createMany({
    data: [
      {
        studentId: student1Record.id,
        courseId: mathCourse.id,
        amount: 150.00,
        status: 'COMPLETED',
        method: 'CARD',
        reference: 'TXN001',
        notes: 'Full semester payment',
        orgId: school.id,
      },
      {
        studentId: student1Record.id,
        courseId: englishCourse.id,
        amount: 120.00,
        status: 'COMPLETED',
        method: 'BANK_TRANSFER',
        reference: 'TXN002',
        orgId: school.id,
      },
      {
        studentId: student2Record.id,
        courseId: artCourse.id,
        amount: 100.00,
        status: 'COMPLETED',
        method: 'CASH',
        reference: 'TXN003',
        orgId: school.id,
      },
      {
        studentId: student3Record.id,
        courseId: englishCourse.id,
        amount: 120.00,
        status: 'PENDING',
        method: 'MOBILE_PAYMENT',
        reference: 'TXN004',
        notes: 'Payment processing',
        orgId: school.id,
      },
      {
        studentId: student4Record.id,
        courseId: mathCourse.id,
        amount: 150.00,
        status: 'COMPLETED',
        method: 'CARD',
        reference: 'TXN005',
        orgId: school.id,
      },
    ],
  });

  // Create update logs
  console.log('📋 Creating activity logs...');
  
  await prisma.updateLog.createMany({
    data: [
      {
        name: 'Student Enrollment',
        message: 'Alice Brown enrolled in Mathematics Grade 5',
        type: 'INFO',
        updatedBy: schoolOwner.id,
        orgId: school.id,
      },
      {
        name: 'Course Creation',
        message: 'Created new course: Mathematics Grade 5',
        type: 'SUCCESS',
        updatedBy: schoolOwner.id,
        orgId: school.id,
      },
      {
        name: 'Payment Received',
        message: 'Payment received from Alice Brown for Mathematics Grade 5',
        type: 'SUCCESS',
        updatedBy: schoolOwner.id,
        orgId: school.id,
      },
      {
        name: 'Schedule Updated',
        message: 'Updated class schedule for Mathematics Grade 5',
        type: 'INFO',
        updatedBy: teacher.id,
        orgId: school.id,
      },
      {
        name: 'New Student Registration',
        message: 'Bob Wilson registered as new student',
        type: 'INFO',
        updatedBy: schoolOwner.id,
        orgId: school.id,
      },
    ],
  });

  console.log('✅ Database seeding')