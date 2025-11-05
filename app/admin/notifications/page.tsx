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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Mail,
  Send,
  Users,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  MessageSquare,
  Settings,
  Plus,
  Search,
  Filter,
  Calendar,
  Target,
} from "lucide-react";
import { mockUsers } from "@/data/user-management/mock-users";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  recipients: string[];
  sentAt: Date;
  status: "sent" | "scheduled" | "draft";
  sentBy: string;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Welcome to P-Core",
      message: "Welcome to our platform! We're excited to have you on board.",
      type: "info",
      recipients: ["all"],
      sentAt: new Date(Date.now() - 86400000),
      status: "sent",
      sentBy: "Admin",
    },
    {
      id: "2",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2-4 AM.",
      type: "warning",
      recipients: ["all"],
      sentAt: new Date(Date.now() - 3600000),
      status: "sent",
      sentBy: "System",
    },
    {
      id: "3",
      title: "New Feature Available",
      message: "Check out our new dashboard analytics feature!",
      type: "success",
      recipients: ["admins"],
      sentAt: new Date(Date.now() - 1800000),
      status: "sent",
      sentBy: "Admin",
    },
  ]);

  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = mockUsers.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendNotification = (notificationData: any) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title: notificationData.title,
      message: notificationData.message,
      type: notificationData.type,
      recipients: selectedRecipients.length > 0 ? selectedRecipients : ["all"],
      sentAt: new Date(),
      status: "sent",
      sentBy: "Admin",
    };

    setNotifications(prev => [newNotification, ...prev]);
    toast.success("Notification sent successfully!");
    setIsComposeOpen(false);
    setSelectedRecipients([]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "info": return <Info className="h-4 w-4 text-blue-500" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "success": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "info": return "secondary";
      case "warning": return "outline";
      case "success": return "default";
      case "error": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "sent": return "default";
      case "scheduled": return "secondary";
      case "draft": return "outline";
      default: return "secondary";
    }
  };

  return (
    <EnhancedAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">
              Send notifications and manage communication with your users.
            </p>
          </div>
          <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Compose Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Compose Notification</DialogTitle>
                <DialogDescription>
                  Create and send a notification to your users.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input id="title" placeholder="Notification title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="message" className="text-right pt-2">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Notification message..."
                    className="col-span-3"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select notification type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">Information</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Recipients Selection */}
                <div className="space-y-4">
                  <Label>Recipients</Label>
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center space-x-4">
                      <Checkbox
                        id="all-users"
                        checked={selectedRecipients.includes("all")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRecipients(["all"]);
                          } else {
                            setSelectedRecipients([]);
                          }
                        }}
                      />
                      <Label htmlFor="all-users" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        All Users
                      </Label>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Checkbox
                        id="admins-only"
                        checked={selectedRecipients.includes("admins")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedRecipients(prev => [...prev.filter(r => r !== "all"), "admins"]);
                          } else {
                            setSelectedRecipients(prev => prev.filter(r => r !== "admins"));
                          }
                        }}
                      />
                      <Label htmlFor="admins-only" className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        Admins Only
                      </Label>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Specific Users</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <div className="max-h-32 overflow-y-auto space-y-2">
                        {filteredUsers.slice(0, 5).map((user) => (
                          <div key={user.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`user-${user.id}`}
                              checked={selectedRecipients.includes(user.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedRecipients(prev => [...prev.filter(r => r !== "all"), user.id]);
                                } else {
                                  setSelectedRecipients(prev => prev.filter(r => r !== user.id));
                                }
                              }}
                            />
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={user.image || ""} />
                              <AvatarFallback className="text-xs">
                                {user.name?.[0]?.toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <Label htmlFor={`user-${user.id}`} className="text-sm">
                              {user.name || user.email}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => handleSendNotification({
                  title: "Test Notification",
                  message: "This is a test notification",
                  type: "info"
                })}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Notification
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-xs text-muted-foreground">All time notifications</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Table */}
        <Card>
          <CardHeader>
            <CardTitle>Notification History</CardTitle>
            <CardDescription>
              View and manage all sent notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Sent By</TableHead>
                  <TableHead>Sent At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(notification.type)}
                        <Badge variant={getTypeBadgeVariant(notification.type)}>
                          {notification.type}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {notification.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {notification.recipients.includes("all")
                          ? "All Users"
                          : notification.recipients.includes("admins")
                          ? "Admins"
                          : `${notification.recipients.length} users`}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(notification.status)}>
                        {notification.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{notification.sentBy}</TableCell>
                    <TableCell>
                      {notification.sentAt.toLocaleDateString()} at{" "}
                      {notification.sentAt.toLocaleTimeString()}
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
            <CardDescription>Common notification tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Bell className="h-6 w-6" />
                <span className="text-sm">System Alert</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Mail className="h-6 w-6" />
                <span className="text-sm">Welcome Email</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <AlertTriangle className="h-6 w-6" />
                <span className="text-sm">Maintenance Notice</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <CheckCircle className="h-6 w-6" />
                <span className="text-sm">Feature Update</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </EnhancedAdminLayout>
  );
}
