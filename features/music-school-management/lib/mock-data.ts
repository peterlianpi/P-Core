import type { User, Course, Student, Teacher, LessonBook, Transaction, DashboardStats } from "./types";

const padNum = (num: number, size = 3) => num.toString().padStart(size, "0");

const now = new Date().toISOString();
const COURSE_NAMES = ["Piano", "Guitar", "Violin", "Drums", "Bass"];
const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];
const TRANSACTION_TYPES = ["monthly_fee", "book_purchase", "other", "material_purchase"] as const;
const COURSE_LEVELS = ["Beginner", "Intermediate", "Advanced", "Professional"] as const;
const PAYMENT_METHODS = ["cash", "card", "online", "bank_transfer"] as const;


type TransactionType = typeof TRANSACTION_TYPES[number];
type PaymentMethod = typeof PAYMENT_METHODS[number];

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

const ROLES = ["admin", "teacher", "student"] as const;

type Role = typeof ROLES[number];

const getRandomItem = <T extends readonly any[]>(arr: T): T[number] => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@musicschool.com",
    name: "Admin User",
    role: "admin",
    avatar: "/placeholder-user.jpg",
    phone: "+1234567890",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "2",
    email: "teacher@musicschool.com",
    name: "John Teacher",
    role: "teacher",
    avatar: "/placeholder-user.jpg",
    phone: "+1234567891",
    createdAt: now,
    updatedAt: now,
  },
  ...Array.from({ length: 48 }).map((_, i) => ({
    id: (i + 3).toString(),
    email: `user${i + 3}@musicschool.com`,
    name: `User ${i + 3}`,
    role: getRandomItem(ROLES),  // Now typed as Role (literal)
    avatar: "/placeholder-user.jpg",
    phone: `+1234567${padNum(i + 30, 4)}`,
    createdAt: now,
    updatedAt: now,
  })),
];


// Generate Courses
export const mockCourses: Course[] = COURSE_NAMES.map((name, i) => ({
  id: (i + 1).toString(),
  name,
  description: `Learn to play ${name.toLowerCase()} from beginner to advanced level`,
  color: COLORS[i % COLORS.length],
  levels: COURSE_LEVELS.slice(0, Math.floor(Math.random() * COURSE_LEVELS.length) + 1),
  monthlyFee: 100 + i * 20,
  isActive: true,
  createdAt: now,
  updatedAt: now,
}));

// Generate Students
export const mockStudents: Student[] = Array.from({ length: 50 }).map((_, i) => {
  const course = getRandomItem(mockCourses);
  return {
    id: (i + 1).toString(),
    name: `Student ${i + 1}`,
    email: `student${i + 1}@example.com`,
    phone: `+1234567${padNum(i + 50, 4)}`,
    avatar: "/placeholder-user.jpg",
    rollNumber: `MS${padNum(i + 1, 3)}`,
    courseId: course.id,
    level: getRandomItem(course.levels),
    enrollmentDate: randomDate(new Date(2023, 0, 1), new Date()),
    status: "active",
    parentName: `Parent ${i + 1}`,
    parentPhone: `+1234567${padNum(i + 100, 4)}`,
    address: `${i + 1} Sample Street, City, State`,
    createdAt: now,
    updatedAt: now,
  };
});

// Generate Teachers
const SPECIALIZATIONS = ["Piano", "Guitar", "Violin", "Drums", "Music Theory", "Bass"];

export const mockTeachers: Teacher[] = Array.from({ length: 50 }).map((_, i) => ({
  id: (i + 1).toString(),
  name: `Teacher ${i + 1}`,
  email: `teacher${i + 1}@musicschool.com`,
  phone: `+1234567${padNum(i + 150, 4)}`,
  avatar: "/placeholder-user.jpg",
  specialization: Array.from({ length: 2 }).map(() => getRandomItem(SPECIALIZATIONS)),
  isActive: true,
  createdAt: now,
  updatedAt: now,
}));

// Generate Lesson Books
export const mockLessonBooks: LessonBook[] = Array.from({ length: 50 }).map((_, i) => {
  const course = getRandomItem(mockCourses);
  return {
    id: (i + 1).toString(),
    title: `${course.name} Lesson Book Vol ${Math.floor(Math.random() * 10) + 1}`,
    author: `Author ${i + 1}`,
    price: parseFloat((10 + Math.random() * 40).toFixed(2)),
    courseId: course.id,
    level: getRandomItem(course.levels),
    description: `A comprehensive ${course.name.toLowerCase()} lesson book`,
    coverImage: "/placeholder.jpg",
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };
});

// Generate Transactions
export const mockTransactions: Transaction[] = Array.from({ length: 50 }).map((_, i) => {
  const student = getRandomItem(mockStudents);
  return {
    id: (i + 1).toString(),
    studentId: student.id,
    // Cast to TransactionType
    type: getRandomItem(TRANSACTION_TYPES) as TransactionType,
    amount: parseFloat((50 + Math.random() * 200).toFixed(2)),
    description: `Transaction ${i + 1} description`,
    status: getRandomItem(["completed", "pending", "failed"] as const),
    // Cast to PaymentMethod
    paymentMethod: getRandomItem(PAYMENT_METHODS) as PaymentMethod,
    dueDate: randomDate(new Date(2023, 0, 1), new Date()),
    paidDate: randomDate(new Date(2023, 0, 1), new Date()),
    createdAt: now,
    updatedAt: now,
  };
});


// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalStudents: mockStudents.length,
  totalRevenue: mockTransactions.reduce((sum, tx) => sum + tx.amount, 0),
  pendingPayments: mockTransactions.filter(tx => tx.status === "pending").length,
  activeTeachers: mockTeachers.length,
  monthlyGrowth: parseFloat((Math.random() * 20).toFixed(2)),
  revenueGrowth: parseFloat((Math.random() * 15).toFixed(2)),
};

// Mock Notifications Interface
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  isRead: boolean;
  createdAt: string;
}

// Notifications
export const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Payment Overdue",
    message: "Student 1's monthly fee is overdue",
    type: "warning",
    isRead: false,
    createdAt: now,
  },
  {
    id: "2",
    title: "New Student Enrolled",
    message: "Student 2 has enrolled in a new course",
    type: "success",
    isRead: false,
    createdAt: now,
  },
  {
    id: "3",
    title: "Class Cancelled",
    message: "Piano class on Jan 21 has been cancelled",
    type: "info",
    isRead: true,
    createdAt: now,
  },
];
