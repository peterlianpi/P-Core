"use client";

import React, { useState } from "react";
import { EnhancedAdminLayout } from "@/components/admin-panel/enhanced-admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Crown,
  DollarSign,
  Users,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  TrendingUp,
  Calendar,
  CreditCard,
  Download,
  Mail,
  AlertCircle,
  Settings,
  BarChart3,
  PieChart,
  FileText,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import { mockUsers } from "@/data/user-management/mock-users";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: "monthly" | "yearly";
  features: string[];
  maxUsers: number;
  isActive: boolean;
  subscriberCount: number;
  createdAt: Date;
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      name: "Free",
      description: "Basic features for getting started",
      price: 0,
      interval: "monthly",
      features: ["Up to 3 users", "Basic analytics", "Email support"],
      maxUsers: 3,
      isActive: true,
      subscriberCount: 45,
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "2",
      name: "Pro",
      description: "Advanced features for growing teams",
      price: 29,
      interval: "monthly",
      features: ["Up to 10 users", "Advanced analytics", "Priority support", "API access"],
      maxUsers: 10,
      isActive: true,
      subscriberCount: 23,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "3",
      name: "Enterprise",
      description: "Full-featured solution for large organizations",
      price: 99,
      interval: "monthly",
      features: ["Unlimited users", "Custom analytics", "24/7 support", "Advanced API", "Custom integrations"],
      maxUsers: -1, // unlimited
      isActive: true,
      subscriberCount: 8,
      createdAt: new Date("2024-02-01"),
    },
  ]);

  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Quick Actions State
  const [isPaymentMethodsOpen, setIsPaymentMethodsOpen] = useState(false);
  const [isRevenueReportsOpen, setIsRevenueReportsOpen] = useState(false);
  const [isBillingCyclesOpen, setIsBillingCyclesOpen] = useState(false);
  const [isSubscriberManagementOpen, setIsSubscriberManagementOpen] = useState(false);

  // Mock data for quick actions
  const [paymentMethods] = useState([
    { id: "1", name: "Stripe", status: "active", lastUsed: "2024-01-15", transactions: 1247 },
    { id: "2", name: "PayPal", status: "active", lastUsed: "2024-01-10", transactions: 456 },
    { id: "3", name: "Bank Transfer", status: "inactive", lastUsed: "2023-12-01", transactions: 23 },
  ]);

  const [billingCycles] = useState([
    { id: "1", name: "Monthly", active: true, subscribers: 45, revenue: 1325 },
    { id: "2", name: "Yearly", active: true, subscribers: 23, revenue: 6789 },
    { id: "3", name: "Quarterly", active: false, subscribers: 0, revenue: 0 },
  ]);

  const [subscribers] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", plan: "Pro", status: "active", nextBilling: "2024-02-15", amount: 29 },
    { id: "2", name: "Jane Smith", email: "jane@example.com", plan: "Enterprise", status: "active", nextBilling: "2024-02-20", amount: 99 },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", plan: "Free", status: "active", nextBilling: "N/A", amount: 0 },
    { id: "4", name: "Alice Brown", email: "alice@example.com", plan: "Pro", status: "past_due", nextBilling: "2024-01-15", amount: 29 },
  ]);

  const [revenueReports] = useState({
    monthly: [
      { month: "Jan 2024", revenue: 3456, subscriptions: 45, refunds: 123 },
      { month: "Dec 2023", revenue: 3210, subscriptions: 42, refunds: 98 },
      { month: "Nov 2023", revenue: 2987, subscriptions: 38, refunds: 76 },
    ],
    byPlan: [
      { plan: "Free", revenue: 0, subscribers: 45, percentage: 45 },
      { plan: "Pro", revenue: 667, subscribers: 23, percentage: 23 },
      { plan: "Enterprise", revenue: 792, subscribers: 8, percentage: 8 },
    ]
  });

  const handleCreatePlan = (planData: any) => {
    const newPlan: Plan = {
      id: Date.now().toString(),
      name: planData.name,
      description: planData.description,
      price: parseFloat(planData.price) || 0,
      interval: planData.interval,
      features: selectedFeatures,
      maxUsers: parseInt(planData.maxUsers) || 1,
      isActive: true,
      subscriberCount: 0,
      createdAt: new Date(),
    };

    setPlans(prev => [...prev, newPlan]);
    toast.success("Plan created successfully!");
    setIsCreatePlanOpen(false);
    setSelectedFeatures([]);
  };

  const handleTogglePlanStatus = (planId: string) => {
    setPlans(prev => prev.map(plan =>
      plan.id === planId
        ? { ...plan, isActive: !plan.isActive }
        : plan
    ));
    toast.success("Plan status updated!");
  };

  const handleDeletePlan = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (plan?.subscriberCount && plan.subscriberCount > 0) {
      toast.error("Cannot delete plan with active subscribers");
      return;
    }

    setPlans(prev => prev.filter(plan => plan.id !== planId));
    toast.success("Plan deleted successfully!");
  };

  const getPlanStats = () => {
    const totalPlans = plans.length;
    const activePlans = plans.filter(plan => plan.isActive).length;
    const totalSubscribers = plans.reduce((acc, plan) => acc + plan.subscriberCount, 0);
    const totalRevenue = plans.reduce((acc, plan) => acc + (plan.price * plan.subscriberCount), 0);

    return { totalPlans, activePlans, totalSubscribers, totalRevenue };
  };

  const stats = getPlanStats();

  const availableFeatures = [
    "Up to X users",
    "Basic analytics",
    "Advanced analytics",
    "Email support",
    "Priority support",
    "24/7 support",
    "API access",
    "Advanced API",
    "Custom integrations",
    "White-labeling",
    "Custom domains",
    "Advanced security",
  ];

  return (
    <EnhancedAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Plans & Billing</h1>
            <p className="text-muted-foreground">
              Manage subscription plans, pricing, and billing settings.
            </p>
          </div>
          <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Plan</DialogTitle>
                <DialogDescription>
                  Set up a new subscription plan with pricing and features.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan-name" className="text-right">Name</Label>
                  <Input id="plan-name" placeholder="Plan name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="plan-description" className="text-right pt-2">Description</Label>
                  <Textarea
                    id="plan-description"
                    placeholder="Plan description..."
                    className="col-span-3"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan-price" className="text-right">Price</Label>
                  <Input id="plan-price" type="number" placeholder="29.99" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan-interval" className="text-right">Interval</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select billing interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plan-max-users" className="text-right">Max Users</Label>
                  <Input id="plan-max-users" type="number" placeholder="10" className="col-span-3" />
                </div>

                {/* Features Selection */}
                <div className="space-y-4">
                  <Label>Features</Label>
                  <div className="border rounded-lg p-4 max-h-48 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2">
                      {availableFeatures.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`feature-${feature}`}
                            checked={selectedFeatures.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedFeatures(prev => [...prev, feature]);
                              } else {
                                setSelectedFeatures(prev => prev.filter(f => f !== feature));
                              }
                            }}
                            className="rounded"
                          />
                          <Label htmlFor={`feature-${feature}`} className="text-sm cursor-pointer">
                            {feature}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => handleCreatePlan({
                  name: "New Plan",
                  description: "Plan description",
                  price: "29.99",
                  interval: "monthly",
                  maxUsers: "10"
                })}>
                  Create Plan
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Plans</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPlans}</div>
              <p className="text-xs text-muted-foreground">Active subscription plans</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activePlans}</div>
              <p className="text-xs text-muted-foreground">Currently available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalSubscribers}</div>
              <p className="text-xs text-muted-foreground">Across all plans</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue}</div>
              <p className="text-xs text-muted-foreground">Recurring revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Plans Table */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>
              Manage your pricing plans and subscription tiers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Subscribers</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {plan.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold">
                          ${plan.price}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /{plan.interval}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Max {plan.maxUsers === -1 ? 'unlimited' : plan.maxUsers} users
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {plan.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {plan.features.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{plan.features.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {plan.subscriberCount} subscriber{plan.subscriberCount !== 1 ? 's' : ''}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={plan.isActive}
                          onCheckedChange={() => handleTogglePlanStatus(plan.id)}
                        />
                        <Badge variant={plan.isActive ? 'default' : 'secondary'}>
                          {plan.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePlan(plan.id)}
                          disabled={plan.subscriberCount > 0}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common billing and subscription management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => setIsPaymentMethodsOpen(true)}
              >
                <CreditCard className="h-6 w-6" />
                <span className="text-sm">Payment Methods</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => setIsRevenueReportsOpen(true)}
              >
                <TrendingUp className="h-6 w-6" />
                <span className="text-sm">Revenue Reports</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => setIsBillingCyclesOpen(true)}
              >
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Billing Cycles</span>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2"
                onClick={() => setIsSubscriberManagementOpen(true)}
              >
                <Users className="h-6 w-6" />
                <span className="text-sm">Subscriber Management</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Dialog */}
        <Dialog open={isPaymentMethodsOpen} onOpenChange={setIsPaymentMethodsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </DialogTitle>
              <DialogDescription>
                Manage payment processors and view transaction statistics
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4">
                {paymentMethods.map((method) => (
                  <Card key={method.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{method.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Last used: {method.lastUsed}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={method.status === 'active' ? 'default' : 'secondary'}>
                            {method.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            {method.transactions} transactions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
                <Button variant="outline" className="flex-1">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Method
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Revenue Reports Dialog */}
        <Dialog open={isRevenueReportsOpen} onOpenChange={setIsRevenueReportsOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Revenue Reports
              </DialogTitle>
              <DialogDescription>
                View detailed revenue analytics and generate reports
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly Revenue</TabsTrigger>
                <TabsTrigger value="plans">Revenue by Plan</TabsTrigger>
              </TabsList>
              <TabsContent value="monthly" className="space-y-4">
                <div className="space-y-4">
                  {revenueReports.monthly.map((month) => (
                    <Card key={month.month}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{month.month}</h4>
                            <p className="text-sm text-muted-foreground">
                              {month.subscriptions} subscriptions
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">${month.revenue}</div>
                            <p className="text-sm text-muted-foreground">
                              ${month.refunds} refunds
                            </p>
                          </div>
                        </div>
                        <Progress
                          value={(month.revenue / 4000) * 100}
                          className="mt-2"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="plans" className="space-y-4">
                <div className="space-y-4">
                  {revenueReports.byPlan.map((plan) => (
                    <Card key={plan.plan}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <PieChart className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium">{plan.plan}</h4>
                              <p className="text-sm text-muted-foreground">
                                {plan.subscribers} subscribers
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">${plan.revenue}</div>
                            <Badge variant="outline">{plan.percentage}%</Badge>
                          </div>
                        </div>
                        <Progress value={plan.percentage} className="mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Billing Cycles Dialog */}
        <Dialog open={isBillingCyclesOpen} onOpenChange={setIsBillingCyclesOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Billing Cycles
              </DialogTitle>
              <DialogDescription>
                Configure billing cycle settings and view cycle performance
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4">
                {billingCycles.map((cycle) => (
                  <Card key={cycle.id}>
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-medium">{cycle.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {cycle.subscribers} subscribers
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">${cycle.revenue}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Switch checked={cycle.active} />
                            <Badge variant={cycle.active ? 'default' : 'secondary'}>
                              {cycle.active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Cycles
                </Button>
                <Button variant="outline" className="flex-1">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Subscriber Management Dialog */}
        <Dialog open={isSubscriberManagementOpen} onOpenChange={setIsSubscriberManagementOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Subscriber Management
              </DialogTitle>
              <DialogDescription>
                Manage subscribers, view billing status, and handle subscriptions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search subscribers..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="past_due">Past Due</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subscriber</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Next Billing</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{subscriber.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {subscriber.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{subscriber.plan}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              subscriber.status === 'active' ? 'default' :
                              subscriber.status === 'past_due' ? 'destructive' :
                              'secondary'
                            }
                          >
                            {subscriber.status === 'past_due' ? 'Past Due' : subscriber.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {subscriber.nextBilling === 'N/A' ? (
                            <span className="text-muted-foreground">N/A</span>
                          ) : (
                            <span>{subscriber.nextBilling}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">
                            ${subscriber.amount}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {subscriber.status === 'past_due' && (
                              <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Export Subscribers
                </Button>
                <Button variant="outline" className="flex-1">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Notifications
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </EnhancedAdminLayout>
  );
}
