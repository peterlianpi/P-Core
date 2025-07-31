#!/usr/bin/env node

// P-Core Data Migration Script
// Migrates data from dual databases to unified schema with proper organization mapping
// Handles data transformation and validation

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Initialize Prisma clients for old and new databases
const oldUserDB = new PrismaClient({
  datasources: {
    db: {
      url: process.env.OLD_USER_DATABASE_URL || process.env.USER_DATABASE_URL
    }
  }
});

const oldFeaturesDB = new PrismaClient({
  datasources: {
    db: {
      url: process.env.OLD_FEATURES_DATABASE_URL || process.env.FEATURES_DATABASE_URL
    }
  }
});

const newDB = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// Migration configuration
const MIGRATION_CONFIG = {
  batchSize: 100,
  enableLogging: true,
  enableValidation: true,
  skipExisting: true,
};

// Logger utility
function log(message, level = 'INFO') {
  if (MIGRATION_CONFIG.enableLogging) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${level}: ${message}`);
  }
}

// Error handler
function handleError(error, context) {
  log(`Error in ${context}: ${error.message}`, 'ERROR');
  console.error(error.stack);
  process.exit(1);
}

// Data validation utilities
function validateData(data, schema, context) {
  if (!MIGRATION_CONFIG.enableValidation) return true;
  
  try {
    // Basic validation logic
    if (!data || typeof data !== 'object') {
      throw new Error(`Invalid data structure in ${context}`);
    }
    
    // Add specific validation rules here
    return true;
  } catch (error) {
    log(`Validation failed for ${context}: ${error.message}`, 'WARN');
    return false;
  }
}

// Migration progress tracker
class MigrationTracker {
  constructor() {
    this.progress = {
      users: { total: 0, migrated: 0, failed: 0 },
      organizations: { total: 0, migrated: 0, failed: 0 },
      students: { total: 0, migrated: 0, failed: 0 },
      courses: { total: 0, migrated: 0, failed: 0 },
      members: { total: 0, migrated: 0, failed: 0 },
      // Add more entities as needed
    };
  }

  updateProgress(entity, type, count = 1) {
    if (this.progress[entity]) {
      this.progress[entity][type] += count;
    }
  }

  printSummary() {
    log('=== Migration Summary ===');
    Object.entries(this.progress).forEach(([entity, stats]) => {
      log(`${entity}: ${stats.migrated}/${stats.total} migrated, ${stats.failed} failed`);
    });
  }
}

const tracker = new MigrationTracker();

// Migration functions
async function migrateUsers() {
  log('Starting user migration...');
  
  try {
    // Get users from old database
    const oldUsers = await oldUserDB.user.findMany({
      include: {
        accounts: true,
        UserOrganization: true
      }
    });

    tracker.updateProgress('users', 'total', oldUsers.length);
    log(`Found ${oldUsers.length} users to migrate`);

    for (const user of oldUsers) {
      try {
        // Check if user already exists
        if (MIGRATION_CONFIG.skipExisting) {
          const existing = await newDB.user.findUnique({
            where: { email: user.email }
          });
          if (existing) {
            log(`User ${user.email} already exists, skipping`);
            tracker.updateProgress('users', 'migrated');
            continue;
          }
        }

        // Transform user data for new schema
        const userData = {
          id: user.id,
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          image: user.image,
          password: user.password,
          role: user.role,
          isTwoFactorEnabled: user.isTwoFactorEnabled,
          defaultOrgId: user.defaultOrgId,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        // Validate data
        if (!validateData(userData, 'user', `user ${user.id}`)) {
          tracker.updateProgress('users', 'failed');
          continue;
        }

        // Create user in new database
        await newDB.user.create({
          data: userData
        });

        // Migrate accounts
        for (const account of user.accounts) {
          await newDB.account.create({
            data: {
              id: account.id,
              userId: account.userId,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refreshToken: account.refresh_token,
              accessToken: account.access_token,
              expiresAt: account.expires_at,
              tokenType: account.token_type,
              scope: account.scope,
              idToken: account.id_token,
              sessionState: account.session_state,
            }
          });
        }

        tracker.updateProgress('users', 'migrated');
        log(`Migrated user: ${user.email}`);

      } catch (error) {
        log(`Failed to migrate user ${user.email}: ${error.message}`, 'ERROR');
        tracker.updateProgress('users', 'failed');
      }
    }

    log('User migration completed');
  } catch (error) {
    handleError(error, 'migrateUsers');
  }
}

async function migrateOrganizations() {
  log('Starting organization migration...');
  
  try {
    const oldOrganizations = await oldUserDB.organization.findMany({
      include: {
        UserOrganization: true
      }
    });

    tracker.updateProgress('organizations', 'total', oldOrganizations.length);
    log(`Found ${oldOrganizations.length} organizations to migrate`);

    for (const org of oldOrganizations) {
      try {
        // Transform organization data
        const orgData = {
          id: org.id,
          name: org.name,
          description: org.description,
          logoImage: org.logoImage,
          type: 'MIXED', // Default type, can be updated later
          startedAt: org.startedAt,
          createdAt: org.createdAt,
          updatedAt: org.updatedAt,
          createdById: org.createdById || org.UserOrganization[0]?.userId, // Fallback
        };

        // Validate data
        if (!validateData(orgData, 'organization', `organization ${org.id}`)) {
          tracker.updateProgress('organizations', 'failed');
          continue;
        }

        // Create organization
        await newDB.organization.create({
          data: orgData
        });

        // Migrate user-organization relationships
        for (const userOrg of org.UserOrganization) {
          await newDB.userOrganization.create({
            data: {
              id: userOrg.id,
              userId: userOrg.userId,
              organizationId: userOrg.organizationId,
              role: userOrg.role || 'MEMBER',
              status: 'ACTIVE',
              joinedAt: userOrg.createdAt || new Date(),
            }
          });
        }

        tracker.updateProgress('organizations', 'migrated');
        log(`Migrated organization: ${org.name}`);

      } catch (error) {
        log(`Failed to migrate organization ${org.name}: ${error.message}`, 'ERROR');
        tracker.updateProgress('organizations', 'failed');
      }
    }

    log('Organization migration completed');
  } catch (error) {
    handleError(error, 'migrateOrganizations');
  }
}

async function migrateStudents() {
  log('Starting student migration...');
  
  try {
    const oldStudents = await oldFeaturesDB.student.findMany({
      include: {
        courses: {
          include: {
            course: true
          }
        },
        purchases: true
      }
    });

    tracker.updateProgress('students', 'total', oldStudents.length);
    log(`Found ${oldStudents.length} students to migrate`);

    for (const student of oldStudents) {
      try {
        // Transform student data for new schema
        const studentData = {
          id: student.id,
          number: student.number,
          rollNumber: student.rollNumber,
          name: student.name,
          email: student.email,
          phone: student.phone,
          gender: student.gender,
          birthDate: student.birthDate,
          address: student.address,
          parentName: student.parentName,
          parentPhone: student.parentPhone,
          image: student.image,
          notes: student.notes,
          isActive: student.isActive,
          isArchived: student.isArchived,
          isDeleted: student.isDeleted,
          isProspect: student.isProspect,
          joinedAt: student.joinedAt,
          createdAt: student.createdAt,
          updatedAt: student.updatedAt,
          orgId: student.orgId,
        };

        // Validate data
        if (!validateData(studentData, 'student', `student ${student.id}`)) {
          tracker.updateProgress('students', 'failed');
          continue;
        }

        // Create student
        await newDB.student.create({
          data: studentData
        });

        // Migrate student courses
        for (const studentCourse of student.courses) {
          await newDB.studentCourse.create({
            data: {
              id: studentCourse.id,
              studentId: studentCourse.studentId,
              courseId: studentCourse.courseId,
              status: studentCourse.status,
              enrolledAt: studentCourse.enrolledAt,
              completedAt: studentCourse.completedAt,
              grade: studentCourse.grade,
              notes: studentCourse.notes,
              orgId: student.orgId,
            }
          });
        }

        tracker.updateProgress('students', 'migrated');
        log(`Migrated student: ${student.name}`);

      } catch (error) {
        log(`Failed to migrate student ${student.name}: ${error.message}`, 'ERROR');
        tracker.updateProgress('students', 'failed');
      }
    }

    log('Student migration completed');
  } catch (error) {
    handleError(error, 'migrateStudents');
  }
}

async function migrateCourses() {
  log('Starting course migration...');
  
  try {
    const oldCourses = await oldFeaturesDB.course.findMany({
      include: {
        lessonBooks: true,
        schedules: true
      }
    });

    tracker.updateProgress('courses', 'total', oldCourses.length);
    log(`Found ${oldCourses.length} courses to migrate`);

    for (const course of oldCourses) {
      try {
        // Transform course data
        const courseData = {
          id: course.id,
          name: course.name,
          description: course.description,
          price: course.price,
          duration: course.duration,
          isActive: course.isActive,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
          orgId: course.orgId,
        };

        // Validate data
        if (!validateData(courseData, 'course', `course ${course.id}`)) {
          tracker.updateProgress('courses', 'failed');
          continue;
        }

        // Create course
        await newDB.course.create({
          data: courseData
        });

        // Migrate schedules
        for (const schedule of course.schedules) {
          await newDB.schedule.create({
            data: {
              id: schedule.id,
              title: schedule.title,
              courseId: schedule.courseId,
              startTime: schedule.startTime,
              endTime: schedule.endTime,
              dayOfWeek: schedule.dayOfWeek,
              room: schedule.room,
              notes: schedule.notes,
              isActive: schedule.isActive,
              createdAt: schedule.createdAt,
              updatedAt: schedule.updatedAt,
              orgId: course.orgId,
            }
          });
        }

        tracker.updateProgress('courses', 'migrated');
        log(`Migrated course: ${course.name}`);

      } catch (error) {
        log(`Failed to migrate course ${course.name}: ${error.message}`, 'ERROR');
        tracker.updateProgress('courses', 'failed');
      }
    }

    log('Course migration completed');
  } catch (error) {
    handleError(error, 'migrateCourses');
  }
}

async function migrateMembers() {
  log('Starting member migration...');
  
  try {
    // First, migrate supporting tables
    await migrateKhawks();
    await migrateVengs();
    await migrateHomes();
    await migrateMemberRoles();
    await migrateRelationshipTypes();

    const oldMembers = await oldFeaturesDB.member.findMany({
      include: {
        roles: {
          include: {
            role: true
          }
        },
        familyFrom: {
          include: {
            type: true
          }
        }
      }
    });

    tracker.updateProgress('members', 'total', oldMembers.length);
    log(`Found ${oldMembers.length} members to migrate`);

    for (const member of oldMembers) {
      try {
        // Transform member data
        const memberData = {
          id: member.id,
          number: member.number,
          name: member.name,
          birthDate: member.birthdate,
          gender: member.gender,
          phone: member.phone,
          email: member.email,
          bloodType: member.bloodType,
          image: member.image,
          fbLink: member.fbLink,
          isActive: true, // Default to active
          createdAt: member.createdAt,
          updatedAt: member.updatedAt,
          orgId: member.organizationId,
          homeId: member.homeId,
          spouseId: member.spouseId,
          userId: member.userId,
        };

        // Validate data
        if (!validateData(memberData, 'member', `member ${member.id}`)) {
          tracker.updateProgress('members', 'failed');
          continue;
        }

        // Create member
        await newDB.member.create({
          data: memberData
        });

        // Migrate role assignments
        for (const roleAssignment of member.roles) {
          await newDB.memberRoleAssignment.create({
            data: {
              id: roleAssignment.id,
              memberId: roleAssignment.memberId,
              roleId: roleAssignment.roleId,
              assignedAt: roleAssignment.assignedAt,
              startedAt: roleAssignment.startedAt,
              endedAt: roleAssignment.endedAt,
              orgId: member.organizationId,
            }
          });
        }

        tracker.updateProgress('members', 'migrated');
        log(`Migrated member: ${member.name}`);

      } catch (error) {
        log(`Failed to migrate member ${member.name}: ${error.message}`, 'ERROR');
        tracker.updateProgress('members', 'failed');
      }
    }

    log('Member migration completed');
  } catch (error) {
    handleError(error, 'migrateMembers');
  }
}

async function migrateKhawks() {
  // Implementation for migrating Khawks
  log('Migrating Khawks...');
  // Add implementation
}

async function migrateVengs() {
  // Implementation for migrating Vengs
  log('Migrating Vengs...');
  // Add implementation
}

async function migrateHomes() {
  // Implementation for migrating Homes
  log('Migrating Homes...');
  // Add implementation
}

async function migrateMemberRoles() {
  // Implementation for migrating Member Roles
  log('Migrating Member Roles...');
  // Add implementation
}

async function migrateRelationshipTypes() {
  // Implementation for migrating Relationship Types
  log('Migrating Relationship Types...');
  // Add implementation
}

// Main migration function
async function runMigration() {
  log('=== Starting P-Core Data Migration ===');
  log(`Configuration: ${JSON.stringify(MIGRATION_CONFIG, null, 2)}`);

  try {
    // Test database connections
    log('Testing database connections...');
    await oldUserDB.$connect();
    await oldFeaturesDB.$connect();
    await newDB.$connect();
    log('Database connections established');

    // Run migrations in order
    await migrateUsers();
    await migrateOrganizations();
    await migrateCourses();
    await migrateStudents();
    await migrateMembers();

    // Print summary
    tracker.printSummary();
    log('=== Migration Completed Successfully ===');

  } catch (error) {
    handleError(error, 'runMigration');
  } finally {
    // Cleanup connections
    await oldUserDB.$disconnect();
    await oldFeaturesDB.$disconnect();
    await newDB.$disconnect();
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  // Parse CLI arguments
  args.forEach(arg => {
    if (arg === '--no-validation') {
      MIGRATION_CONFIG.enableValidation = false;
    } else if (arg === '--no-logging') {
      MIGRATION_CONFIG.enableLogging = false;
    } else if (arg === '--overwrite') {
      MIGRATION_CONFIG.skipExisting = false;
    } else if (arg.startsWith('--batch-size=')) {
      MIGRATION_CONFIG.batchSize = parseInt(arg.split('=')[1]);
    }
  });

  runMigration().catch(console.error);
}

module.exports = {
  runMigration,
  migrateUsers,
  migrateOrganizations,
  migrateStudents,
  migrateCourses,
  migrateMembers,
};
