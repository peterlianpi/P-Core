/**
 * Subscriptions Management MVP API
 * Core API functions for subscription and billing operations
 */

import type {
  SubscriptionPlan,
  OrganizationSubscription,
  SubscriptionInvoice,
  UsageStats,
  CheckoutData,
  UpgradeSubscriptionData,
  CancelSubscriptionData,
  SubscriptionAnalytics,
} from './types';

const API_BASE = '/api/subscriptions';

/**
 * Get all available subscription plans
 */
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const response = await fetch(`${API_BASE}/plans`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get subscription plans');
  }

  return response.json();
}

/**
 * Get current organization subscription
 */
export async function getCurrentSubscription(organizationId: string): Promise<OrganizationSubscription | null> {
  const response = await fetch(`${API_BASE}/current?organizationId=${organizationId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get current subscription');
  }

  return response.json();
}

/**
 * Create checkout session for new subscription
 */
export async function createCheckoutSession(data: CheckoutData): Promise<{ sessionId: string; url: string }> {
  const response = await fetch(`${API_BASE}/checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create checkout session');
  }

  return response.json();
}

/**
 * Upgrade/downgrade subscription
 */
export async function upgradeSubscription(data: UpgradeSubscriptionData): Promise<OrganizationSubscription> {
  const response = await fetch(`${API_BASE}/upgrade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to upgrade subscription');
  }

  return response.json();
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(data: CancelSubscriptionData): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE}/cancel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to cancel subscription');
  }

  return response.json();
}

/**
 * Get subscription invoices
 */
export async function getInvoices(subscriptionId: string): Promise<SubscriptionInvoice[]> {
  const response = await fetch(`${API_BASE}/invoices?subscriptionId=${subscriptionId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get invoices');
  }

  return response.json();
}

/**
 * Get usage statistics
 */
export async function getUsageStats(organizationId: string): Promise<UsageStats> {
  const response = await fetch(`${API_BASE}/usage?organizationId=${organizationId}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get usage stats');
  }

  return response.json();
}

/**
 * Get subscription analytics (admin only)
 */
export async function getSubscriptionAnalytics(): Promise<SubscriptionAnalytics> {
  const response = await fetch(`/api/admin/subscriptions/analytics`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get subscription analytics');
  }

  return response.json();
}

/**
 * Calculate plan price based on billing cycle
 */
export function calculatePlanPrice(plan: SubscriptionPlan, billingCycle: 'monthly' | 'yearly'): number {
  return billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
}

/**
 * Calculate savings for yearly billing
 */
export function calculateYearlySavings(plan: SubscriptionPlan): number {
  const monthlyTotal = plan.priceMonthly * 12;
  const yearlySavings = monthlyTotal - plan.priceYearly;
  return Math.round(yearlySavings * 100) / 100;
}

/**
 * Calculate savings percentage
 */
export function calculateSavingsPercentage(plan: SubscriptionPlan): number {
  const monthlyTotal = plan.priceMonthly * 12;
  const savings = calculateYearlySavings(plan);
  return Math.round((savings / monthlyTotal) * 100);
}

/**
 * Check if usage is approaching limit
 */
export function isApproachingLimit(current: number, limit: number, threshold: number = 0.8): boolean {
  return current / limit >= threshold;
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}