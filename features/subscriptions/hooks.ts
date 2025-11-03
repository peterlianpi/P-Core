/**
 * Subscriptions Management MVP Hooks
 * React Query hooks for subscription operations
 */

'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type {
  CheckoutData,
  UpgradeSubscriptionData,
  CancelSubscriptionData,
} from './types';
import {
  getSubscriptionPlans,
  getCurrentSubscription,
  createCheckoutSession,
  upgradeSubscription,
  cancelSubscription,
  getInvoices,
  getUsageStats,
  getSubscriptionAnalytics,
} from './api';

/**
 * Get all subscription plans
 */
export function useSubscriptionPlans() {
  return useQuery({
    queryKey: ['subscriptions', 'plans'],
    queryFn: getSubscriptionPlans,
  });
}

/**
 * Get current organization subscription
 */
export function useCurrentSubscription(organizationId: string) {
  return useQuery({
    queryKey: ['subscriptions', 'current', organizationId],
    queryFn: () => getCurrentSubscription(organizationId),
    enabled: !!organizationId,
  });
}

/**
 * Create checkout session
 */
export function useCreateCheckout() {
  return useMutation({
    mutationFn: (data: CheckoutData) => createCheckoutSession(data),
  });
}

/**
 * Upgrade subscription
 */
export function useUpgradeSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpgradeSubscriptionData) => upgradeSubscription(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', 'current'] });
    },
  });
}

/**
 * Cancel subscription
 */
export function useCancelSubscription() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CancelSubscriptionData) => cancelSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', 'current'] });
    },
  });
}

/**
 * Get subscription invoices
 */
export function useInvoices(subscriptionId: string) {
  return useQuery({
    queryKey: ['subscriptions', 'invoices', subscriptionId],
    queryFn: () => getInvoices(subscriptionId),
    enabled: !!subscriptionId,
  });
}

/**
 * Get usage statistics
 */
export function useUsageStats(organizationId: string) {
  return useQuery({
    queryKey: ['subscriptions', 'usage', organizationId],
    queryFn: () => getUsageStats(organizationId),
    enabled: !!organizationId,
    refetchInterval: 60000, // Refetch every minute
  });
}

/**
 * Get subscription analytics (admin)
 */
export function useSubscriptionAnalytics() {
  return useQuery({
    queryKey: ['subscriptions', 'analytics'],
    queryFn: getSubscriptionAnalytics,
  });
}