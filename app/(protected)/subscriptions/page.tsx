/**
 * Subscriptions Page - MVP Implementation
 * 
 * Subscription management page for organizations
 */

import type { Metadata } from 'next';
import { AdminLayout } from '@/components/admin-layout';
import { SubscriptionPlans } from '@/features/subscriptions/components/subscription-plans';
import { CurrentSubscription } from '@/features/subscriptions/components/current-subscription';
import { UsageOverview } from '@/features/subscriptions/components/usage-overview';

export const metadata: Metadata = {
  title: 'Subscriptions | P-Core',
  description: 'Manage your subscription and billing',
};

export default function SubscriptionsPage() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
            <p className="text-muted-foreground mt-1">
              Manage your subscription plan and billing
            </p>
          </div>
        </div>

        <CurrentSubscription />
        <UsageOverview />
        <SubscriptionPlans />
      </div>
    </AdminLayout>
  );
}