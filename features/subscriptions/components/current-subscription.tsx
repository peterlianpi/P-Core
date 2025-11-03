/**
 * Current Subscription Component
 * Displays current subscription status and details
 */

'use client';

import { useCurrentSubscription, useCancelSubscription } from '../hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../api';
import { toast } from 'sonner';

export function CurrentSubscription() {
  const organizationId = 'current-org-id'; // TODO: Get from context
  const { data: subscription, isLoading } = useCurrentSubscription(organizationId);
  const cancelSubscription = useCancelSubscription();

  const handleCancel = async () => {
    if (!subscription) return;
    
    if (confirm('Are you sure you want to cancel your subscription?')) {
      try {
        await cancelSubscription.mutateAsync({
          subscriptionId: subscription.id,
          cancelAtPeriodEnd: true,
        });
        toast.success('Subscription will be cancelled at the end of the billing period');
      } catch (error) {
        toast.error('Failed to cancel subscription');
      }
    }
  };

  if (isLoading) {
    return null;
  }

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Subscription</CardTitle>
          <CardDescription>
            Choose a plan below to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getStatusBadge = () => {
    switch (subscription.status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'trialing':
        return <Badge variant="secondary">Trial</Badge>;
      case 'past_due':
        return <Badge variant="destructive">Past Due</Badge>;
      case 'cancelled':
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{subscription.status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              {subscription.plan.name} Plan
            </CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Amount</p>
              <p className="text-2xl font-bold">
                {formatCurrency(subscription.amount, subscription.currency)}
              </p>
              <p className="text-xs text-muted-foreground">
                per {subscription.billingCycle === 'monthly' ? 'month' : 'year'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium">Next Billing Date</p>
              <p className="text-lg font-semibold">
                {subscription.nextBillingDate
                  ? new Date(subscription.nextBillingDate).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>

          {subscription.trialEndDate && (
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Trial Ends</p>
                <p className="text-lg font-semibold">
                  {new Date(subscription.trialEndDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {subscription.status === 'active' && (
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" size="sm">
              Upgrade Plan
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
              disabled={cancelSubscription.isPending}
            >
              Cancel Subscription
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}