import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting comprehensive database seeding...');

  // Hash the default password for all users
  const defaultPassword = await bcrypt.hash('password', 12);
  console.log('🔐 Default password hashed for all users: "password"');

  // ============================================================================
  // 1. CREATE USERS WITH DIFFERENT SYSTEM ROLES
  // ============================================================================

  console.log('👥 Creating users with different system roles...');

  const users = await Promise.all([
    // SUPERADMIN - Complete system access
    prisma.user.create({
      data: {
        name: 'System Administrator',
        email: 'superadmin@p-core.com',
        password: defaultPassword,
        role: 'SUPERADMIN',
        isTwoFactorEnabled: false,
        emailVerified: new Date(),
        profile: {
          create: {
            bio: 'System Super Administrator with complete access',
            location: 'System HQ',
            preferences: JSON.stringify({
              theme: 'dark',
              language: 'en',
              notifications: true
            })
          }
        }
      }
    }),

    // ADMIN - System administration
    prisma.user.create({
      data: {
        name: 'John Admin',
        email: 'admin@p-core.com',
        password: defaultPassword,
        role: 'ADMIN',
        isTwoFactorEnabled: false,
        emailVerified: new Date(),
        profile: {
          create: {
            bio: 'System Administrator',
            location: 'New York, USA',
            preferences: JSON.stringify({
              theme: 'light',
              language: 'en',
              notifications: true
            })
          }
        }
      }
    }),

    // REGULAR USERS
    prisma.user.create({
      data: {
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        password: defaultPassword,
        role: 'USER',
        isTwoFactorEnabled: false,
        emailVerified: new Date(),
        profile: {
          create: {
            bio: 'School teacher and community volunteer',
            location: 'Springfield, USA',
            preferences: JSON.stringify({
              theme: 'light',
              language: 'en',
              notifications: true
            })
          }
        }
      }
    }),

    prisma.user.create({
      data: {
        name: 'Bob Smith',
        email: 'bob.smith@email.com',
        password: defaultPassword,
        role: 'USER',
        isTwoFactorEnabled: false,
        emailVerified: new Date(),
        profile: {
          create: {
            bio: 'Church member and choir director',
            location: 'Faith City, USA',
            preferences: JSON.stringify({
              theme: 'dark',
              language: 'en',
              notifications: true
            })
          }
        }
      }
    }),

    prisma.user.create({
      data: {
        name: 'Carol Davis',
        email: 'carol.davis@email.com',
        password: defaultPassword,
        role: 'USER',
        isTwoFactorEnabled: false,
        emailVerified: new Date(),
        profile: {
          create: {
            bio: 'Librarian and book enthusiast',
            location: 'Booktown, USA',
            preferences: JSON.stringify({
              theme: 'light',
              language: 'en',
              notifications: false
            })
          }
        }
      }
    }),

    prisma.user.create({
      data: {
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        password: defaultPassword,
        role: 'USER',
        isTwoFactorEnabled: false,
        emailVerified: new Date(),
        profile: {
          create: {
            bio: 'Student and tech enthusiast',
            location: 'Springfield, USA',
            preferences: JSON.stringify({
              theme: 'dark',
              language: 'en',
              notifications: true
            })
          }
        }
      }
    })
  ]);

  console.log('✅ Users created with different roles');

  // ============================================================================
  // 2. CREATE ORGANIZATIONS OF DIFFERENT TYPES
  // ============================================================================

  console.log('🏢 Creating organizations of different types...');

  const organizations = await Promise.all([
    // SCHOOL ORGANIZATION
    prisma.organization.create({
      data: {
        name: 'Springfield High School',
        description: 'Leading educational institution committed to student success',
        type: 'EDUCATION',
        size: 'LARGE',
        industry: 'Education',
        ownerId: users[2].id, // Alice Johnson (USER role)
        settings: JSON.stringify({
          theme: 'light',
          notifications: true,
          timezone: 'America/New_York',
          features: {
            schoolManagement: true,
            studentPortal: true,
            parentPortal: true
          }
        })
      }
    }),

    // CHURCH ORGANIZATION
    prisma.organization.create({
      data: {
        name: 'Grace Community Church',
        description: 'Welcoming community church focused on faith and fellowship',
        type: 'NONPROFIT',
        size: 'MEDIUM',
        industry: 'Religious',
        ownerId: users[3].id, // Bob Smith (USER role)
        settings: JSON.stringify({
          theme: 'light',
          notifications: true,
          timezone: 'America/New_York',
          features: {
            churchManagement: true,
            memberPortal: true,
            eventManagement: true
          }
        })
      }
    }),

    // LIBRARY ORGANIZATION
    prisma.organization.create({
      data: {
        name: 'Central City Library',
        description: 'Public library serving the community with knowledge and resources',
        type: 'NONPROFIT',
        size: 'MEDIUM',
        industry: 'Education',
        ownerId: users[4].id, // Carol Davis (USER role)
        settings: JSON.stringify({
          theme: 'light',
          notifications: true,
          timezone: 'America/New_York',
          features: {
            libraryManagement: true,
            onlineCatalog: true,
            communityPrograms: true
          }
        })
      }
    }),

    // GENERAL/COMPANY ORGANIZATION
    prisma.organization.create({
      data: {
        name: 'TechCorp Solutions',
        description: 'Technology solutions and consulting company',
        type: 'COMPANY',
        size: 'MEDIUM',
        industry: 'Technology',
        ownerId: users[1].id, // John Admin (ADMIN role)
        settings: JSON.stringify({
          theme: 'dark',
          notifications: true,
          timezone: 'America/New_York',
          features: {
            projectManagement: true,
            teamCollaboration: true,
            resourceManagement: true
          }
        })
      }
    })
  ]);

  console.log('✅ Organizations created');

  // ============================================================================
  // 3. SET DEFAULT ORGANIZATIONS FOR USERS
  // ============================================================================

  await Promise.all([
    prisma.user.update({
      where: { id: users[0].id }, // Superadmin
      data: { defaultOrgId: organizations[0].id } // Can access any org
    }),
    prisma.user.update({
      where: { id: users[1].id }, // Admin
      data: { defaultOrgId: organizations[3].id } // TechCorp
    }),
    prisma.user.update({
      where: { id: users[2].id }, // Alice
      data: { defaultOrgId: organizations[0].id } // School
    }),
    prisma.user.update({
      where: { id: users[3].id }, // Bob
      data: { defaultOrgId: organizations[1].id } // Church
    }),
    prisma.user.update({
      where: { id: users[4].id }, // Carol
      data: { defaultOrgId: organizations[2].id } // Library
    }),
    prisma.user.update({
      where: { id: users[5].id }, // David
      data: { defaultOrgId: organizations[0].id } // School
    })
  ]);

  // ============================================================================
  // 4. CREATE ORGANIZATION MEMBERSHIPS WITH DIFFERENT ROLES
  // ============================================================================

  console.log('👥 Creating organization memberships...');

  await Promise.all([
    // SCHOOL MEMBERSHIPS
    prisma.userOrganization.create({
      data: {
        userId: users[2].id, // Alice Johnson
        organizationId: organizations[0].id, // School
        role: 'OWNER' // School owner
      }
    }),
    prisma.userOrganization.create({
      data: {
        userId: users[5].id, // David Wilson
        organizationId: organizations[0].id, // School
        role: 'MEMBER' // Student/regular member
      }
    }),

    // CHURCH MEMBERSHIPS
    prisma.userOrganization.create({
      data: {
        userId: users[3].id, // Bob Smith
        organizationId: organizations[1].id, // Church
        role: 'OWNER' // Church owner
      }
    }),

    // LIBRARY MEMBERSHIPS
    prisma.userOrganization.create({
      data: {
        userId: users[4].id, // Carol Davis
        organizationId: organizations[2].id, // Library
        role: 'OWNER' // Library owner
      }
    }),

    // COMPANY MEMBERSHIPS
    prisma.userOrganization.create({
      data: {
        userId: users[1].id, // John Admin
        organizationId: organizations[3].id, // TechCorp
        role: 'OWNER' // Company owner
      }
    }),

    // SUPERADMIN HAS ACCESS TO ALL ORGANIZATIONS
    prisma.userOrganization.create({
      data: {
        userId: users[0].id, // Superadmin
        organizationId: organizations[0].id, // School
        role: 'ADMIN' // Can manage school
      }
    }),
    prisma.userOrganization.create({
      data: {
        userId: users[0].id, // Superadmin
        organizationId: organizations[1].id, // Church
        role: 'ADMIN' // Can manage church
      }
    }),
    prisma.userOrganization.create({
      data: {
        userId: users[0].id, // Superadmin
        organizationId: organizations[2].id, // Library
        role: 'ADMIN' // Can manage library
      }
    }),
    prisma.userOrganization.create({
      data: {
        userId: users[0].id, // Superadmin
        organizationId: organizations[3].id, // TechCorp
        role: 'ADMIN' // Can manage company
      }
    })
  ]);

  console.log('✅ Organization memberships created');

  // ============================================================================
  // 5. CREATE COMPREHENSIVE SCHOOL DATA
  // ============================================================================

  console.log('🎓 Creating comprehensive school data...');

  const students = await Promise.all([
    prisma.student.create({
      data: {
        firstName: 'Emma',
        lastName: 'Thompson',
        email: 'emma.thompson@springfield.edu',
        phone: '+1-555-0101',
        dateOfBirth: new Date('2008-03-15'),
        gender: 'Female',
        address: '123 Maple Street, Springfield, USA',
        grade: '10th Grade',
        studentId: 'STU2024001',
        emergencyContact: JSON.stringify({
          name: 'Sarah Thompson',
          phone: '+1-555-0102',
          relationship: 'Mother'
        }),
        medicalInfo: JSON.stringify({
          allergies: [],
          medications: [],
          conditions: []
        })
      }
    }),
    prisma.student.create({
      data: {
        firstName: 'Liam',
        lastName: 'Garcia',
        email: 'liam.garcia@springfield.edu',
        phone: '+1-555-0103',
        dateOfBirth: new Date('2007-07-22'),
        gender: 'Male',
        address: '456 Oak Avenue, Springfield, USA',
        grade: '11th Grade',
        studentId: 'STU2024002',
        emergencyContact: JSON.stringify({
          name: 'Maria Garcia',
          phone: '+1-555-0104',
          relationship: 'Mother'
        }),
        medicalInfo: JSON.stringify({
          allergies: ['Peanuts'],
          medications: [],
          conditions: []
        })
      }
    }),
    prisma.student.create({
      data: {
        firstName: 'Sophia',
        lastName: 'Chen',
        email: 'sophia.chen@springfield.edu',
        phone: '+1-555-0105',
        dateOfBirth: new Date('2009-01-10'),
        gender: 'Female',
        address: '789 Pine Road, Springfield, USA',
        grade: '9th Grade',
        studentId: 'STU2024003',
        emergencyContact: JSON.stringify({
          name: 'Wei Chen',
          phone: '+1-555-0106',
          relationship: 'Father'
        }),
        medicalInfo: JSON.stringify({
          allergies: [],
          medications: [],
          conditions: []
        })
      }
    })
  ]);

  const courses = await Promise.all([
    prisma.course.create({
      data: {
        name: 'Advanced Mathematics',
        code: 'MATH301',
        description: 'Calculus and Advanced Algebra',
        credits: 4,
        subject: 'Mathematics',
        gradeLevel: '11th Grade'
      }
    }),
    prisma.course.create({
      data: {
        name: 'English Literature',
        code: 'ENG201',
        description: 'American and British Literature',
        credits: 3,
        subject: 'English',
        gradeLevel: '10th Grade'
      }
    }),
    prisma.course.create({
      data: {
        name: 'Biology',
        code: 'SCI101',
        description: 'Introduction to Biological Sciences',
        credits: 3,
        subject: 'Science',
        gradeLevel: '9th Grade'
      }
    })
  ]);

  // Create enrollments
  await Promise.all([
    prisma.enrollment.create({
      data: {
        studentId: students[0].id,
        courseId: courses[1].id, // English for 10th grader
        grade: 'A',
        status: 'ACTIVE'
      }
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[1].id,
        courseId: courses[0].id, // Math for 11th grader
        grade: 'B+',
        status: 'ACTIVE'
      }
    }),
    prisma.enrollment.create({
      data: {
        studentId: students[2].id,
        courseId: courses[2].id, // Biology for 9th grader
        grade: 'A+',
        status: 'ACTIVE'
      }
    })
  ]);

  // Create schedules
  await Promise.all([
    prisma.schedule.create({
      data: {
        courseId: courses[0].id,
        dayOfWeek: 1, // Monday
        startTime: '09:00',
        endTime: '10:30',
        room: 'Room 201',
        instructor: 'Dr. Johnson'
      }
    }),
    prisma.schedule.create({
      data: {
        courseId: courses[1].id,
        dayOfWeek: 2, // Tuesday
        startTime: '10:45',
        endTime: '12:15',
        room: 'Room 105',
        instructor: 'Ms. Williams'
      }
    }),
    prisma.schedule.create({
      data: {
        courseId: courses[2].id,
        dayOfWeek: 3, // Wednesday
        startTime: '13:00',
        endTime: '14:30',
        room: 'Lab 3',
        instructor: 'Mr. Brown'
      }
    })
  ]);

  console.log('✅ School data created');

  // ============================================================================
  // 6. CREATE COMPREHENSIVE CHURCH DATA
  // ============================================================================

  console.log('⛪ Creating comprehensive church data...');

  const churchMembers = await Promise.all([
    prisma.churchMember.create({
      data: {
        firstName: 'Michael',
        lastName: 'Rodriguez',
        email: 'michael.rodriguez@gracechurch.org',
        phone: '+1-555-0201',
        dateOfBirth: new Date('1982-05-15'),
        gender: 'Male',
        address: '123 Faith Street, Faith City, USA',
        memberId: 'CHM2024001',
        baptismDate: new Date('2005-06-20'),
        maritalStatus: 'Married',
        occupation: 'Teacher',
        emergencyContact: JSON.stringify({
          name: 'Maria Rodriguez',
          phone: '+1-555-0202',
          relationship: 'Wife'
        })
      }
    }),
    prisma.churchMember.create({
      data: {
        firstName: 'Jennifer',
        lastName: 'Martinez',
        email: 'jennifer.martinez@gracechurch.org',
        phone: '+1-555-0203',
        dateOfBirth: new Date('1988-09-12'),
        gender: 'Female',
        address: '456 Hope Avenue, Faith City, USA',
        memberId: 'CHM2024002',
        baptismDate: new Date('2010-03-15'),
        maritalStatus: 'Married',
        occupation: 'Nurse',
        emergencyContact: JSON.stringify({
          name: 'Carlos Martinez',
          phone: '+1-555-0204',
          relationship: 'Husband'
        })
      }
    }),
    prisma.churchMember.create({
      data: {
        firstName: 'David',
        lastName: 'Johnson',
        email: 'david.johnson@gracechurch.org',
        phone: '+1-555-0205',
        dateOfBirth: new Date('1995-11-08'),
        gender: 'Male',
        address: '789 Grace Boulevard, Faith City, USA',
        memberId: 'CHM2024003',
        baptismDate: new Date('2018-07-22'),
        maritalStatus: 'Single',
        occupation: 'Software Developer',
        emergencyContact: JSON.stringify({
          name: 'Sarah Johnson',
          phone: '+1-555-0206',
          relationship: 'Sister'
        })
      }
    })
  ]);

  // Create families
  const families = await Promise.all([
    prisma.family.create({
      data: {
        name: 'Rodriguez Family',
        address: '123 Faith Street, Faith City, USA',
        headId: churchMembers[0].id
      }
    }),
    prisma.family.create({
      data: {
        name: 'Martinez Family',
        address: '456 Hope Avenue, Faith City, USA',
        headId: churchMembers[1].id
      }
    })
  ]);

  // Add family members
  await Promise.all([
    prisma.familyMember.create({
      data: {
        familyId: families[0].id,
        memberId: churchMembers[0].id,
        relationship: 'Head',
        isHead: true
      }
    }),
    prisma.familyMember.create({
      data: {
        familyId: families[1].id,
        memberId: churchMembers[1].id,
        relationship: 'Head',
        isHead: true
      }
    })
  ]);

  // Create choirs
  const choirs = await Promise.all([
    prisma.choir.create({
      data: {
        name: 'Grace Worship Choir',
        description: 'Main worship choir for Sunday services',
        director: 'Sarah Johnson',
        type: 'MIXED'
      }
    }),
    prisma.choir.create({
      data: {
        name: 'Youth Praise Team',
        description: 'Youth worship and praise team',
        director: 'Mike Thompson',
        type: 'YOUTH'
      }
    })
  ]);

  // Add choir members
  await Promise.all([
    prisma.choirMember.create({
      data: {
        choirId: choirs[0].id,
        memberId: churchMembers[0].id,
        role: 'MEMBER',
        joinedAt: new Date('2020-01-15')
      }
    }),
    prisma.choirMember.create({
      data: {
        choirId: choirs[0].id,
        memberId: churchMembers[1].id,
        role: 'MEMBER',
        joinedAt: new Date('2021-03-10')
      }
    }),
    prisma.choirMember.create({
      data: {
        choirId: choirs[1].id,
        memberId: churchMembers[2].id,
        role: 'LEADER',
        joinedAt: new Date('2022-09-01')
      }
    })
  ]);

  console.log('✅ Church data created');

  // ============================================================================
  // 7. CREATE COMPREHENSIVE LIBRARY DATA
  // ============================================================================

  console.log('📚 Creating comprehensive library data...');

  const books = await Promise.all([
    prisma.book.create({
      data: {
        title: 'The Complete Guide to Web Development',
        author: 'Sarah Johnson',
        isbn: '978-0-123456-78-9',
        publisher: 'Tech Publishing House',
        publishYear: 2023,
        genre: 'Technology',
        description: 'Comprehensive guide to modern web development practices',
        language: 'English',
        pages: 450,
        quantity: 5,
        available: 4,
        location: 'Shelf T-1-A',
        condition: 'EXCELLENT'
      }
    }),
    prisma.book.create({
      data: {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '978-0-06-112008-4',
        publisher: 'J.B. Lippincott & Co.',
        publishYear: 1960,
        genre: 'Fiction',
        description: 'Classic American novel about racial injustice',
        language: 'English',
        pages: 376,
        quantity: 8,
        available: 6,
        location: 'Shelf F-2-B',
        condition: 'GOOD'
      }
    }),
    prisma.book.create({
      data: {
        title: 'Introduction to Psychology',
        author: 'Dr. Emily Carter',
        isbn: '978-1-567890-12-3',
        publisher: 'Academic Press',
        publishYear: 2021,
        genre: 'Psychology',
        description: 'Foundational concepts in modern psychology',
        language: 'English',
        pages: 520,
        quantity: 3,
        available: 3,
        location: 'Shelf P-3-C',
        condition: 'EXCELLENT'
      }
    }),
    prisma.book.create({
      data: {
        title: 'The Holy Bible',
        author: 'Various Authors',
        isbn: '978-0-345678-90-1',
        publisher: 'Faith Publishing',
        publishYear: 2019,
        genre: 'Religious',
        description: 'King James Version of the Holy Bible',
        language: 'English',
        pages: 1200,
        quantity: 10,
        available: 9,
        location: 'Shelf R-1-A',
        condition: 'EXCELLENT'
      }
    })
  ]);

  // Create loans
  await Promise.all([
    prisma.loan.create({
      data: {
        bookId: books[0].id,
        userId: users[5].id, // David Wilson (student)
        userType: 'USER',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
        notes: 'For computer science project'
      }
    }),
    prisma.loan.create({
      data: {
        bookId: books[1].id,
        userId: churchMembers[0].id, // Michael Rodriguez
        userType: 'MEMBER',
        dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days
        notes: 'Book club selection'
      }
    })
  ]);

  // Create reservations
  await prisma.reservation.create({
    data: {
      bookId: books[2].id,
      userId: users[2].id, // Alice Johnson
      userType: 'USER',
      reserveDate: new Date(),
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      status: 'ACTIVE',
      notes: 'For psychology class'
    }
  });

  console.log('✅ Library data created');

  // ============================================================================
  // 8. CREATE TEAMS AND ACTIVITIES
  // ============================================================================

  console.log('👥 Creating teams and activities...');

  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: 'School Administration',
        description: 'School leadership and administration team',
        leaderId: users[2].id, // Alice Johnson
        organizationId: organizations[0].id, // School
        memberIds: JSON.stringify([users[2].id, users[5].id]),
        settings: JSON.stringify({
          color: '#3b82f6',
          isPublic: false,
          permissions: ['manage_students', 'manage_courses']
        })
      }
    }),
    prisma.team.create({
      data: {
        name: 'Church Leadership',
        description: 'Church leadership and pastoral team',
        leaderId: users[3].id, // Bob Smith
        organizationId: organizations[1].id, // Church
        memberIds: JSON.stringify([users[3].id]),
        settings: JSON.stringify({
          color: '#10b981',
          isPublic: true,
          permissions: ['manage_members', 'manage_events']
        })
      }
    }),
    prisma.team.create({
      data: {
        name: 'Library Staff',
        description: 'Library management and staff team',
        leaderId: users[4].id, // Carol Davis
        organizationId: organizations[2].id, // Library
        memberIds: JSON.stringify([users[4].id]),
        settings: JSON.stringify({
          color: '#f59e0b',
          isPublic: true,
          permissions: ['manage_books', 'manage_loans']
        })
      }
    })
  ]);

  // Create activities
  await Promise.all([
    prisma.activity.create({
      data: {
        type: 'USER_REGISTERED',
        description: 'System Administrator account created',
        userId: users[0].id,
        organizationId: organizations[0].id,
        metadata: JSON.stringify({
          action: 'register',
          source: 'system',
          role: 'SUPERADMIN'
        })
      }
    }),
    prisma.activity.create({
      data: {
        type: 'ORGANIZATION_CREATED',
        description: 'Springfield High School organization created',
        userId: users[2].id,
        organizationId: organizations[0].id,
        metadata: JSON.stringify({
          action: 'create_org',
          orgType: 'EDUCATION'
        })
      }
    }),
    prisma.activity.create({
      data: {
        type: 'SYSTEM_UPDATE',
        description: 'Student Emma Thompson enrolled in English Literature course',
        userId: users[2].id,
        organizationId: organizations[0].id,
        metadata: JSON.stringify({
          action: 'enrollment',
          studentId: students[0].id,
          courseId: courses[1].id
        })
      }
    }),
    prisma.activity.create({
      data: {
        type: 'SYSTEM_UPDATE',
        description: 'Web Development book loaned to David Wilson',
        userId: users[4].id,
        organizationId: organizations[2].id,
        metadata: JSON.stringify({
          action: 'loan',
          bookId: books[0].id,
          userId: users[5].id
        })
      }
    })
  ]);

  console.log('✅ Teams and activities created');

  // ============================================================================
  // 9. CREATE NOTIFICATIONS
  // ============================================================================

  console.log('🔔 Creating notifications...');

  await Promise.all([
    prisma.notification.create({
      data: {
        title: 'Welcome to P-Core!',
        message: 'Your account has been successfully set up. Explore the dashboard to get started.',
        type: 'INFO',
        recipients: JSON.stringify(['all']),
        senderId: users[0].id,
        metadata: JSON.stringify({
          priority: 'normal',
          category: 'welcome'
        })
      }
    }),
    prisma.notification.create({
      data: {
        title: 'New Student Enrollment',
        message: 'Emma Thompson has been enrolled in English Literature course.',
        type: 'SUCCESS',
        recipients: JSON.stringify([users[2].id]), // Alice (school admin)
        senderId: users[2].id,
        metadata: JSON.stringify({
          priority: 'normal',
          category: 'enrollment',
          studentId: students[0].id
        })
      }
    }),
    prisma.notification.create({
      data: {
        title: 'Book Due Soon',
        message: 'Your loan for "Web Development Guide" is due in 3 days.',
        type: 'WARNING',
        recipients: JSON.stringify([users[5].id]), // David Wilson
        senderId: users[4].id, // Carol (librarian)
        metadata: JSON.stringify({
          priority: 'high',
          category: 'loan',
          bookId: books[0].id
        })
      }
    }),
    prisma.notification.create({
      data: {
        title: 'System Maintenance',
        message: 'Scheduled maintenance will occur tonight from 2-4 AM EST.',
        type: 'INFO',
        recipients: JSON.stringify([users[0].id, users[1].id]), // Admins only
        senderId: users[0].id,
        metadata: JSON.stringify({
          priority: 'normal',
          category: 'maintenance'
        })
      }
    })
  ]);

  console.log('✅ Notifications created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e: any) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
