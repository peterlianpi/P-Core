/**
 * Subscriptions Management MVP Types
 * Core type definitions for subscription and billing operations
 */

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string | null;
  tier: 'basic' | 'professional' | 'enterprise' | 'custom';
  priceMonthly: number;
  priceYearly: number;
  currency: string;
  features: string[];
  limits: {
    users: number;
    organizations: number;
    storageGb: number;
    apiCalls: number;
  };
  isActive: boolean;
  isPopular: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationSubscription {
  id: string;
  organizationId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due' | 'trialing';
  billingCycle: 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date | null;
  trialEndDate: Date | null;
  cancelledAt: Date | null;
  nextBillingDate: Date | null;
  amount: number;
  currency: string;
  paymentMethodId: string | null;
  stripeSubscriptionId: string | null;
  stripeCustomerId: string | null;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionInvoice {
  id: string;
  subscriptionId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  dueDate: Date | null;
  paidAt: Date | null;
  stripeInvoiceId: string | null;
  invoiceUrl: string | null;
  metadata: Record<string, any> | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionUsage {
  id: string;
  subscriptionId: string;
  metric: 'users' | 'storage' | 'api_calls';
  value: number;
  periodStart: Date;
  periodEnd: Date;
  createdAt: Date;
}

export interface UsageStats {
  users: {
    current: number;
    limit: number;
    percentage: number;
  };
  storage: {
    current: number;
    limit: number;
    percentage: number;
  };
  apiCalls: {
    current: number;
    limit: number;
    percentage: number;
  };
}

export interface CheckoutData {
  planId: string;
  billingCycle: 'monthly' | 'yearly';
  organizationId: string;
  paymentMethodId?: string;
}

export interface UpgradeSubscriptionData {
  subscriptionId: string;
  newPlanId: string;
  billingCycle?: 'monthly' | 'yearly';
}

export interface CancelSubscriptionData {
  subscriptionId: string;
  reason?: string;
  cancelAtPeriodEnd?: boolean;
}

export interface SubscriptionAnalytics {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  activeSubscriptions: number;
  trialSubscriptions: number;
  cancelledSubscriptions: number;
  churnRate: number;
  averageRevenuePerUser: number;
  subscriptionsByPlan: Record<string, number>;
  revenueByPlan: Record<string, number>;
}