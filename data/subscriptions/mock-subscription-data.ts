/**
 * Mock Subscriptions Management Data
 * Provides realistic subscription plans, billing cycles, and user subscriptions per organization
 */

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  tier: 'basic' | 'professional' | 'enterprise' | 'custom';
  price: {
    monthly: number;
    yearly: number;
    currency: string;
  };
  features: string[];
  limits: {
    users: number;
    organizations: number;
    storage: number; // in GB
    apiCalls: number; // per month
  };
  isActive: boolean;
  isPopular?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BillingCycle {
  id: string;
  name: string;
  interval: 'monthly' | 'quarterly' | 'yearly';
  intervalCount: number;
  discount?: number; // percentage discount for longer cycles
}

export interface UserSubscription {
  id: string;
  userId: string;
  organizationId: string;
  planId: string;
  billingCycleId: string;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due' | 'trialing';
  startDate: Date;
  endDate?: Date;
  trialEndDate?: Date;
  cancelledAt?: Date;
  nextBillingDate: Date;
  amount: number;
  currency: string;
  autoRenew: boolean;
  paymentMethodId?: string;
  metadata?: Record<string, any>;
}

export interface Invoice {
  id: string;
  subscriptionId: string;
  userId: string;
  organizationId: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  billingPeriodStart: Date;
  billingPeriodEnd: Date;
  dueDate: Date;
  paidAt?: Date;
  paymentMethod?: string;
  items: InvoiceItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  amount: number;
  quantity: number;
  unitPrice: number;
}

export interface SubscriptionStatistics {
  totalSubscriptions: number;
  activeSubscriptions: number;
  cancelledSubscriptions: number;
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  averageRevenuePerUser: number;
  churnRate: number;
  byPlan: Record<string, {
    count: number;
    revenue: number;
    percentage: number;
  }>;
  byStatus: Record<string, number>;
  recentPayments: Array<{
    date: string;
    amount: number;
    count: number;
  }>;
  upcomingRenewals: Array<{
    date: string;
    count: number;
    amount: number;
  }>;
}

// Mock Subscription Plans
export const mockSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic Plan',
    description: 'Perfect for small schools and basic management needs',
    tier: 'basic',
    price: {
      monthly: 29.99,
      yearly: 299.99,
      currency: 'USD',
    },
    features: [
      'Up to 50 users',
      '1 organization',
      'Basic student management',
      'Course scheduling',
      'Email notifications',
      'Basic reporting',
    ],
    limits: {
      users: 50,
      organizations: 1,
      storage: 10,
      apiCalls: 10000,
    },
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'plan-professional',
    name: 'Professional Plan',
    description: 'Advanced features for growing educational institutions',
    tier: 'professional',
    price: {
      monthly: 79.99,
      yearly: 799.99,
      currency: 'USD',
    },
    features: [
      'Up to 200 users',
      'Up to 3 organizations',
      'Advanced student management',
      'Library management system',
      'Church management tools',
      'Advanced reporting & analytics',
      'Priority support',
      'API access',
    ],
    limits: {
      users: 200,
      organizations: 3,
      storage: 100,
      apiCalls: 50000,
    },
    isActive: true,
    isPopular: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise Plan',
    description: 'Complete solution for large educational networks',
    tier: 'enterprise',
    price: {
      monthly: 199.99,
      yearly: 1999.99,
      currency: 'USD',
    },
    features: [
      'Unlimited users',
      'Unlimited organizations',
      'All management modules',
      'Advanced analytics & insights',
      'Custom integrations',
      'Dedicated support manager',
      'SLA guarantee',
      'White-label options',
    ],
    limits: {
      users: -1, // unlimited
      organizations: -1, // unlimited
      storage: 1000,
      apiCalls: 200000,
    },
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'plan-custom',
    name: 'Custom Plan',
    description: 'Tailored solution for your specific needs',
    tier: 'custom',
    price: {
      monthly: 0, // custom pricing
      yearly: 0, // custom pricing
      currency: 'USD',
    },
    features: [
      'Custom user limits',
      'Custom features',
      'Custom integrations',
      'Dedicated infrastructure',
      'Custom SLA',
    ],
    limits: {
      users: -1,
      organizations: -1,
      storage: -1,
      apiCalls: -1,
    },
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Mock Billing Cycles
export const mockBillingCycles: BillingCycle[] = [
  {
    id: 'cycle-monthly',
    name: 'Monthly',
    interval: 'monthly',
    intervalCount: 1,
  },
  {
    id: 'cycle-quarterly',
    name: 'Quarterly',
    interval: 'quarterly',
    intervalCount: 3,
    discount: 5,
  },
  {
    id: 'cycle-yearly',
    name: 'Yearly',
    interval: 'yearly',
    intervalCount: 12,
    discount: 15,
  },
];

// Mock User Subscriptions
export const mockUserSubscriptions: UserSubscription[] = [
  {
    id: 'sub-001',
    userId: 'user-admin-001',
    organizationId: 'org1',
    planId: 'plan-professional',
    billingCycleId: 'cycle-yearly',
    status: 'active',
    startDate: new Date('2024-01-15'),
    nextBillingDate: new Date('2025-01-15'),
    amount: 799.99,
    currency: 'USD',
    autoRenew: true,
    paymentMethodId: 'pm_card_visa',
  },
  {
    id: 'sub-002',
    userId: 'user-teacher-001',
    organizationId: 'org1',
    planId: 'plan-basic',
    billingCycleId: 'cycle-monthly',
    status: 'active',
    startDate: new Date('2024-02-01'),
    nextBillingDate: new Date('2024-12-01'),
    amount: 29.99,
    currency: 'USD',
    autoRenew: true,
    paymentMethodId: 'pm_card_mastercard',
  },
  {
    id: 'sub-003',
    userId: 'user-student-001',
    organizationId: 'org1',
    planId: 'plan-basic',
    billingCycleId: 'cycle-monthly',
    status: 'trialing',
    startDate: new Date('2024-10-15'),
    trialEndDate: new Date('2024-11-15'),
    nextBillingDate: new Date('2024-12-15'),
    amount: 29.99,
    currency: 'USD',
    autoRenew: true,
    paymentMethodId: 'pm_card_visa',
  },
  {
    id: 'sub-004',
    userId: 'user-librarian-001',
    organizationId: 'org1',
    planId: 'plan-professional',
    billingCycleId: 'cycle-quarterly',
    status: 'past_due',
    startDate: new Date('2024-06-01'),
    nextBillingDate: new Date('2024-09-01'),
    amount: 239.97,
    currency: 'USD',
    autoRenew: false,
    paymentMethodId: 'pm_card_amex',
  },
  {
    id: 'sub-005',
    userId: 'user-inactive-001',
    organizationId: 'org1',
    planId: 'plan-basic',
    billingCycleId: 'cycle-monthly',
    status: 'cancelled',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-06-01'),
    cancelledAt: new Date('2024-05-15'),
    nextBillingDate: new Date('2024-06-01'), // Not applicable for cancelled, but required
    amount: 29.99,
    currency: 'USD',
    autoRenew: false,
  },
];

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: 'inv-001',
    subscriptionId: 'sub-001',
    userId: 'user-admin-001',
    organizationId: 'org1',
    amount: 799.99,
    currency: 'USD',
    status: 'paid',
    billingPeriodStart: new Date('2024-01-15'),
    billingPeriodEnd: new Date('2025-01-15'),
    dueDate: new Date('2024-01-15'),
    paidAt: new Date('2024-01-15'),
    paymentMethod: 'Visa **** 4242',
    items: [
      {
        id: 'item-001',
        description: 'Professional Plan - Yearly',
        amount: 799.99,
        quantity: 1,
        unitPrice: 799.99,
      },
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'inv-002',
    subscriptionId: 'sub-002',
    userId: 'user-teacher-001',
    organizationId: 'org1',
    amount: 29.99,
    currency: 'USD',
    status: 'paid',
    billingPeriodStart: new Date('2024-11-01'),
    billingPeriodEnd: new Date('2024-12-01'),
    dueDate: new Date('2024-11-01'),
    paidAt: new Date('2024-11-01'),
    paymentMethod: 'Mastercard **** 5555',
    items: [
      {
        id: 'item-002',
        description: 'Basic Plan - Monthly',
        amount: 29.99,
        quantity: 1,
        unitPrice: 29.99,
      },
    ],
    createdAt: new Date('2024-10-25'),
    updatedAt: new Date('2024-11-01'),
  },
  {
    id: 'inv-003',
    subscriptionId: 'sub-004',
    userId: 'user-librarian-001',
    organizationId: 'org1',
    amount: 239.97,
    currency: 'USD',
    status: 'open',
    billingPeriodStart: new Date('2024-06-01'),
    billingPeriodEnd: new Date('2024-09-01'),
    dueDate: new Date('2024-09-01'),
    paymentMethod: 'Amex **** 0001',
    items: [
      {
        id: 'item-003',
        description: 'Professional Plan - Quarterly',
        amount: 239.97,
        quantity: 1,
        unitPrice: 239.97,
      },
    ],
    createdAt: new Date('2024-08-25'),
    updatedAt: new Date('2024-08-25'),
  },
];

// Mock Subscription Statistics
export const mockSubscriptionStatistics: SubscriptionStatistics = {
  totalSubscriptions: 1247,
  activeSubscriptions: 1156,
  cancelledSubscriptions: 91,
  totalRevenue: 2456789.50,
  monthlyRecurringRevenue: 156789.25,
  averageRevenuePerUser: 1974.25,
  churnRate: 2.3,
  byPlan: {
    'plan-basic': {
      count: 567,
      revenue: 456789.50,
      percentage: 45.4,
    },
    'plan-professional': {
      count: 456,
      revenue: 1234567.25,
      percentage: 36.6,
    },
    'plan-enterprise': {
      count: 123,
      revenue: 678932.75,
      percentage: 9.9,
    },
    'plan-custom': {
      count: 101,
      revenue: 86500.00,
      percentage: 8.1,
    },
  },
  byStatus: {
    active: 1156,
    inactive: 45,
    cancelled: 91,
    past_due: 23,
    trialing: 32,
  },
  recentPayments: [
    { date: '2024-11-01', amount: 15678.50, count: 45 },
    { date: '2024-11-02', amount: 12345.25, count: 38 },
    { date: '2024-11-03', amount: 18976.75, count: 52 },
    { date: '2024-11-04', amount: 14567.00, count: 41 },
    { date: '2024-11-05', amount: 22345.50, count: 63 },
    { date: '2024-11-06', amount: 16789.25, count: 47 },
    { date: '2024-11-07', amount: 19876.00, count: 55 },
  ],
  upcomingRenewals: [
    { date: '2024-11-15', count: 23, amount: 3456.77 },
    { date: '2024-11-30', count: 45, amount: 6789.25 },
    { date: '2024-12-01', count: 67, amount: 12345.50 },
    { date: '2024-12-15', count: 34, amount: 5678.90 },
    { date: '2024-12-31', count: 89, amount: 15678.25 },
  ],
};

// Helper functions
export function getSubscriptionPlanById(id: string): SubscriptionPlan | undefined {
  return mockSubscriptionPlans.find(plan => plan.id === id);
}

export function getPlansByTier(tier: string): SubscriptionPlan[] {
  return mockSubscriptionPlans.filter(plan => plan.tier === tier);
}

export function getUserSubscriptionsByUserId(userId: string): UserSubscription[] {
  return mockUserSubscriptions.filter(sub => sub.userId === userId);
}

export function getUserSubscriptionsByOrganization(orgId: string): UserSubscription[] {
  return mockUserSubscriptions.filter(sub => sub.organizationId === orgId);
}

export function getInvoicesByUserId(userId: string): Invoice[] {
  return mockInvoices.filter(invoice => invoice.userId === userId);
}

export function getInvoicesByStatus(status: string): Invoice[] {
  return mockInvoices.filter(invoice => invoice.status === status);
}

export function getUpcomingRenewals(days: number = 30): UserSubscription[] {
  const cutoffDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return mockUserSubscriptions
    .filter(sub => sub.nextBillingDate <= cutoffDate && sub.status === 'active')
    .sort((a, b) => a.nextBillingDate.getTime() - b.nextBillingDate.getTime());
}

export function calculateSubscriptionRevenue(): number {
  return mockUserSubscriptions
    .filter(sub => sub.status === 'active')
    .reduce((total, sub) => total + sub.amount, 0);
}

export function getSubscriptionManagementData() {
  return {
    plans: mockSubscriptionPlans,
    billingCycles: mockBillingCycles,
    subscriptions: mockUserSubscriptions,
    invoices: mockInvoices,
    statistics: mockSubscriptionStatistics,
  };
}
