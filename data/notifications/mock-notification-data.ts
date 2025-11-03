/**
 * Mock Notifications Management Data
 * Provides realistic notification templates, delivery status, and user preferences
 */

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'push' | 'in_app';
  category: 'system' | 'academic' | 'library' | 'payment' | 'social' | 'marketing';
  subject?: string;
  content: string;
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  usageCount: number;
  successRate: number;
}

export interface NotificationDelivery {
  id: string;
  templateId: string;
  recipientId: string;
  recipientEmail?: string;
  recipientPhone?: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced';
  sentAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  retryCount: number;
  channel: 'email' | 'sms' | 'push' | 'in_app';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  metadata?: Record<string, any>;
}

export interface UserNotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  categories: {
    system: boolean;
    academic: boolean;
    library: boolean;
    payment: boolean;
    social: boolean;
    marketing: boolean;
  };
  quietHours: {
    enabled: boolean;
    startTime: string; // HH:MM format
    endTime: string;   // HH:MM format
    timezone: string;
  };
  frequency: 'immediate' | 'daily' | 'weekly' | 'never';
}

export interface NotificationStatistics {
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
  deliveryRate: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  byChannel: Record<string, {
    sent: number;
    delivered: number;
    failed: number;
    rate: number;
  }>;
  byCategory: Record<string, {
    sent: number;
    delivered: number;
    failed: number;
    rate: number;
  }>;
  recentActivity: Array<{
    date: string;
    sent: number;
    delivered: number;
    failed: number;
  }>;
}

// Mock Notification Templates
export const mockNotificationTemplates: NotificationTemplate[] = [
  {
    id: 'template-welcome',
    name: 'Welcome Email',
    type: 'email',
    category: 'system',
    subject: 'Welcome to P-Core, {{userName}}!',
    content: `
      <h1>Welcome to P-Core!</h1>
      <p>Dear {{userName}},</p>
      <p>Thank you for joining {{organizationName}}. Your account has been successfully created.</p>
      <p>You can now access all features of our platform.</p>
      <p>Best regards,<br>The P-Core Team</p>
    `,
    variables: ['userName', 'organizationName'],
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    usageCount: 456,
    successRate: 98.5,
  },
  {
    id: 'template-course-enrollment',
    name: 'Course Enrollment Confirmation',
    type: 'email',
    category: 'academic',
    subject: 'Course Enrollment Confirmed: {{courseName}}',
    content: `
      <h2>Course Enrollment Confirmed</h2>
      <p>Hello {{studentName}},</p>
      <p>You have been successfully enrolled in <strong>{{courseName}}</strong>.</p>
      <p><strong>Course Details:</strong></p>
      <ul>
        <li>Start Date: {{startDate}}</li>
        <li>Duration: {{duration}} minutes</li>
        <li>Instructor: {{instructorName}}</li>
      </ul>
      <p>Please log in to your account to access course materials.</p>
    `,
    variables: ['studentName', 'courseName', 'startDate', 'duration', 'instructorName'],
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-02-01'),
    usageCount: 1234,
    successRate: 97.2,
  },
  {
    id: 'template-book-due',
    name: 'Book Due Reminder',
    type: 'email',
    category: 'library',
    subject: 'Book Due Soon: {{bookTitle}}',
    content: `
      <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107;">
        <h3>📚 Book Due Reminder</h3>
        <p>Dear {{memberName}},</p>
        <p>The following book is due soon:</p>
        <div style="background-color: white; padding: 10px; margin: 10px 0; border-radius: 5px;">
          <strong>{{bookTitle}}</strong><br>
          Due Date: {{dueDate}}<br>
          Days Remaining: {{daysRemaining}}
        </div>
        <p>Please return the book on time to avoid late fees.</p>
      </div>
    `,
    variables: ['memberName', 'bookTitle', 'dueDate', 'daysRemaining'],
    isActive: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    usageCount: 567,
    successRate: 95.8,
  },
  {
    id: 'template-payment-receipt',
    name: 'Payment Receipt',
    type: 'email',
    category: 'payment',
    subject: 'Payment Receipt - Invoice #{{invoiceNumber}}',
    content: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Payment Receipt</h2>
        <div style="border: 1px solid #ddd; padding: 20px; margin: 20px 0;">
          <h3>Invoice #{{invoiceNumber}}</h3>
          <p><strong>Amount Paid:</strong> ${{amount}}</p>
          <p><strong>Payment Date:</strong> {{paymentDate}}</p>
          <p><strong>Payment Method:</strong> {{paymentMethod}}</p>
          <p><strong>Description:</strong> {{description}}</p>
        </div>
        <p>Thank you for your payment!</p>
      </div>
    `,
    variables: ['invoiceNumber', 'amount', 'paymentDate', 'paymentMethod', 'description'],
    isActive: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
    usageCount: 890,
    successRate: 99.1,
  },
  {
    id: 'template-system-maintenance',
    name: 'System Maintenance Notification',
    type: 'push',
    category: 'system',
    content: '🛠️ System maintenance scheduled for {{maintenanceTime}}. Expected downtime: {{duration}} minutes.',
    variables: ['maintenanceTime', 'duration'],
    isActive: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01'),
    usageCount: 12,
    successRate: 100,
  },
  {
    id: 'template-event-reminder',
    name: 'Event Reminder SMS',
    type: 'sms',
    category: 'social',
    content: 'Hi {{name}}! Reminder: {{eventName}} starts at {{startTime}} on {{date}}. Location: {{location}}',
    variables: ['name', 'eventName', 'startTime', 'date', 'location'],
    isActive: true,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
    usageCount: 234,
    successRate: 92.3,
  },
];

// Mock Notification Deliveries
export const mockNotificationDeliveries: NotificationDelivery[] = [
  {
    id: 'delivery-001',
    templateId: 'template-welcome',
    recipientId: 'user-student-001',
    recipientEmail: 'mike.chen@p-core.com',
    status: 'delivered',
    sentAt: new Date(Date.now() - 1000 * 60 * 30),
    deliveredAt: new Date(Date.now() - 1000 * 60 * 25),
    retryCount: 0,
    channel: 'email',
    priority: 'normal',
    metadata: { userName: 'Mike Chen', organizationName: 'P-Core School' },
  },
  {
    id: 'delivery-002',
    templateId: 'template-course-enrollment',
    recipientId: 'user-student-001',
    recipientEmail: 'mike.chen@p-core.com',
    status: 'delivered',
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 30000),
    retryCount: 0,
    channel: 'email',
    priority: 'high',
    metadata: {
      studentName: 'Mike Chen',
      courseName: 'Math 101',
      startDate: '2024-11-15',
      duration: '90',
      instructorName: 'Sarah Johnson'
    },
  },
  {
    id: 'delivery-003',
    templateId: 'template-book-due',
    recipientId: 'user-student-001',
    recipientEmail: 'mike.chen@p-core.com',
    status: 'sent',
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
    retryCount: 0,
    channel: 'email',
    priority: 'normal',
    metadata: {
      memberName: 'Mike Chen',
      bookTitle: 'Introduction to Algebra',
      dueDate: '2024-11-10',
      daysRemaining: '2'
    },
  },
  {
    id: 'delivery-004',
    templateId: 'template-payment-receipt',
    recipientId: 'user-teacher-001',
    recipientEmail: 'sarah.johnson@p-core.com',
    status: 'failed',
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    failedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 + 10000),
    failureReason: 'Mailbox full',
    retryCount: 2,
    channel: 'email',
    priority: 'normal',
    metadata: {
      invoiceNumber: 'INV-1001',
      amount: '150.00',
      paymentDate: '2024-11-02',
      paymentMethod: 'Credit Card',
      description: 'English Course Enrollment'
    },
  },
  {
    id: 'delivery-005',
    templateId: 'template-system-maintenance',
    recipientId: 'user-admin-001',
    status: 'delivered',
    sentAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
    deliveredAt: new Date(Date.now() - 1000 * 60 * 60 * 12 + 5000),
    retryCount: 0,
    channel: 'push',
    priority: 'high',
    metadata: {
      maintenanceTime: '2024-11-05 02:00 AM',
      duration: '30'
    },
  },
];

// Mock User Notification Preferences
export const mockUserNotificationPreferences: UserNotificationPreferences[] = [
  {
    userId: 'user-admin-001',
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    inAppNotifications: true,
    categories: {
      system: true,
      academic: true,
      library: true,
      payment: true,
      social: true,
      marketing: false,
    },
    quietHours: {
      enabled: false,
      startTime: '22:00',
      endTime: '08:00',
      timezone: 'Asia/Yangon',
    },
    frequency: 'immediate',
  },
  {
    userId: 'user-teacher-001',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    inAppNotifications: true,
    categories: {
      system: true,
      academic: true,
      library: true,
      payment: true,
      social: true,
      marketing: false,
    },
    quietHours: {
      enabled: true,
      startTime: '22:00',
      endTime: '07:00',
      timezone: 'Asia/Yangon',
    },
    frequency: 'immediate',
  },
  {
    userId: 'user-student-001',
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    inAppNotifications: true,
    categories: {
      system: true,
      academic: true,
      library: true,
      payment: true,
      social: false,
      marketing: false,
    },
    quietHours: {
      enabled: false,
      startTime: '23:00',
      endTime: '08:00',
      timezone: 'Asia/Yangon',
    },
    frequency: 'daily',
  },
  {
    userId: 'user-librarian-001',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: false,
    inAppNotifications: true,
    categories: {
      system: true,
      academic: false,
      library: true,
      payment: true,
      social: true,
      marketing: false,
    },
    quietHours: {
      enabled: true,
      startTime: '21:00',
      endTime: '06:00',
      timezone: 'Asia/Yangon',
    },
    frequency: 'immediate',
  },
];

// Mock Notification Statistics
export const mockNotificationStatistics: NotificationStatistics = {
  totalSent: 15432,
  totalDelivered: 14876,
  totalFailed: 556,
  deliveryRate: 96.4,
  openRate: 68.5,
  clickRate: 24.3,
  bounceRate: 2.1,
  byChannel: {
    email: { sent: 12000, delivered: 11520, failed: 480, rate: 96.0 },
    sms: { sent: 1500, delivered: 1425, failed: 75, rate: 95.0 },
    push: { sent: 1800, delivered: 1710, failed: 90, rate: 95.0 },
    in_app: { sent: 132, delivered: 221, failed: 11, rate: 83.7 },
  },
  byCategory: {
    system: { sent: 2340, delivered: 2287, failed: 53, rate: 97.7 },
    academic: { sent: 4567, delivered: 4412, failed: 155, rate: 96.6 },
    library: { sent: 1890, delivered: 1823, failed: 67, rate: 96.5 },
    payment: { sent: 3456, delivered: 3401, failed: 55, rate: 98.4 },
    social: { sent: 1234, delivered: 1189, failed: 45, rate: 96.4 },
    marketing: { sent: 945, delivered: 764, failed: 181, rate: 80.8 },
  },
  recentActivity: [
    { date: '2024-11-01', sent: 234, delivered: 225, failed: 9 },
    { date: '2024-11-02', sent: 345, delivered: 332, failed: 13 },
    { date: '2024-11-03', sent: 456, delivered: 441, failed: 15 },
    { date: '2024-11-04', sent: 321, delivered: 309, failed: 12 },
    { date: '2024-11-05', sent: 567, delivered: 548, failed: 19 },
    { date: '2024-11-06', sent: 432, delivered: 418, failed: 14 },
    { date: '2024-11-07', sent: 389, delivered: 376, failed: 13 },
  ],
};

// Helper functions
export function getNotificationTemplateById(id: string): NotificationTemplate | undefined {
  return mockNotificationTemplates.find(template => template.id === id);
}

export function getTemplatesByCategory(category: string): NotificationTemplate[] {
  return mockNotificationTemplates.filter(template => template.category === category);
}

export function getTemplatesByType(type: string): NotificationTemplate[] {
  return mockNotificationTemplates.filter(template => template.type === type);
}

export function getUserNotificationPreferences(userId: string): UserNotificationPreferences | undefined {
  return mockUserNotificationPreferences.find(pref => pref.userId === userId);
}

export function getDeliveriesByStatus(status: string): NotificationDelivery[] {
  return mockNotificationDeliveries.filter(delivery => delivery.status === status);
}

export function getDeliveriesByTemplate(templateId: string): NotificationDelivery[] {
  return mockNotificationDeliveries.filter(delivery => delivery.templateId === templateId);
}

export function getRecentDeliveries(hours: number = 24): NotificationDelivery[] {
  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
  return mockNotificationDeliveries
    .filter(delivery => delivery.sentAt && delivery.sentAt >= cutoffTime)
    .sort((a, b) => (b.sentAt?.getTime() || 0) - (a.sentAt?.getTime() || 0));
}

export function getNotificationManagementData() {
  return {
    templates: mockNotificationTemplates,
    deliveries: mockNotificationDeliveries,
    userPreferences: mockUserNotificationPreferences,
    statistics: mockNotificationStatistics,
  };
}
