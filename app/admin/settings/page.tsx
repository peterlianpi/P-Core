"use client";

import React, { useState } from "react";
import { EnhancedAdminLayout } from "@/components/admin-panel/enhanced-admin-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Bell,
  Mail,
  Database,
  Globe,
  Lock,
  Key,
  Users,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    general: {
      appName: "P-Core Admin",
      appDescription: "Advanced admin panel for P-Core system",
      timezone: "UTC",
      language: "en",
      maintenanceMode: false,
    },
    security: {
      twoFactorRequired: false,
      sessionTimeout: 30,
      passwordMinLength: 8,
      loginAttempts: 5,
      ipWhitelist: false,
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      systemAlerts: true,
      userActivity: false,
      securityAlerts: true,
    },
    system: {
      cacheEnabled: true,
      debugMode: false,
      logLevel: "info",
      backupFrequency: "daily",
      maxFileSize: 10,
    },
  });

  const handleSaveSettings = (section: string) => {
    toast.success(`${section} settings saved successfully!`);
  };

  const handleResetSettings = (section: string) => {
    toast.info(`${section} settings reset to defaults`);
  };

  return (
    <EnhancedAdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
            <p className="text-muted-foreground">
              Configure system-wide settings, security policies, and application preferences.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset All
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </Button>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>
                  Basic application configuration and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">Application Name</Label>
                    <Input
                      id="app-name"
                      value={settings.general.appName}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        general: { ...prev.general, appName: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.general.timezone}
                      onValueChange={(value) => setSettings(prev => ({
                        ...prev,
                        general: { ...prev.general, timezone: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="app-description">Application Description</Label>
                  <Textarea
                    id="app-description"
                    value={settings.general.appDescription}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, appDescription: e.target.value }
                    }))}
                    rows={3}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <Select
                      value={settings.general.language}
                      onValueChange={(value) => setSettings(prev => ({
                        ...prev,
                        general: { ...prev.general, language: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="maintenance-mode"
                      checked={settings.general.maintenanceMode}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        general: { ...prev.general, maintenanceMode: checked }
                      }))}
                    />
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => handleResetSettings("General")}>
                    Reset
                  </Button>
                  <Button onClick={() => handleSaveSettings("General")}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure authentication, access control, and security policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input
                      id="session-timeout"
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-min-length">Minimum Password Length</Label>
                    <Input
                      id="password-min-length"
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, passwordMinLength: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="login-attempts">Max Login Attempts</Label>
                    <Input
                      id="login-attempts"
                      type="number"
                      value={settings.security.loginAttempts}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, loginAttempts: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="two-factor-required"
                      checked={settings.security.twoFactorRequired}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        security: { ...prev.security, twoFactorRequired: checked }
                      }))}
                    />
                    <Label htmlFor="two-factor-required">Require 2FA for all users</Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="ip-whitelist"
                    checked={settings.security.ipWhitelist}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, ipWhitelist: checked }
                    }))}
                  />
                  <Label htmlFor="ip-whitelist">Enable IP Whitelist</Label>
                </div>

                <Separator />

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => handleResetSettings("Security")}>
                    Reset
                  </Button>
                  <Button onClick={() => handleSaveSettings("Security")}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Security Status
                </CardTitle>
                <CardDescription>
                  Current security configuration status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Password Policy</div>
                      <div className="text-sm text-muted-foreground">Active</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-medium">Session Management</div>
                      <div className="text-sm text-muted-foreground">Active</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="font-medium">IP Whitelist</div>
                      <div className="text-sm text-muted-foreground">Disabled</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure how and when notifications are sent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <div className="text-sm text-muted-foreground">
                        Send notifications via email
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, emailNotifications: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <div className="text-sm text-muted-foreground">
                        Send browser push notifications
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, pushNotifications: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Alerts</Label>
                      <div className="text-sm text-muted-foreground">
                        Critical system notifications
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.systemAlerts}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, systemAlerts: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>User Activity</Label>
                      <div className="text-sm text-muted-foreground">
                        Notifications for user actions
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.userActivity}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, userActivity: checked }
                      }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Security Alerts</Label>
                      <div className="text-sm text-muted-foreground">
                        Security-related notifications
                      </div>
                    </div>
                    <Switch
                      checked={settings.notifications.securityAlerts}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, securityAlerts: checked }
                      }))}
                    />
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => handleResetSettings("Notifications")}>
                    Reset
                  </Button>
                  <Button onClick={() => handleSaveSettings("Notifications")}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Configuration
                </CardTitle>
                <CardDescription>
                  Performance, caching, and system-wide settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="log-level">Log Level</Label>
                    <Select
                      value={settings.system.logLevel}
                      onValueChange={(value) => setSettings(prev => ({
                        ...prev,
                        system: { ...prev.system, logLevel: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="debug">Debug</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select
                      value={settings.system.backupFrequency}
                      onValueChange={(value) => setSettings(prev => ({
                        ...prev,
                        system: { ...prev.system, backupFrequency: value }
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="max-file-size">Max File Size (MB)</Label>
                    <Input
                      id="max-file-size"
                      type="number"
                      value={settings.system.maxFileSize}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        system: { ...prev.system, maxFileSize: parseInt(e.target.value) }
                      }))}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="cache-enabled"
                      checked={settings.system.cacheEnabled}
                      onCheckedChange={(checked) => setSettings(prev => ({
                        ...prev,
                        system: { ...prev.system, cacheEnabled: checked }
                      }))}
                    />
                    <Label htmlFor="cache-enabled">Enable Caching</Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="debug-mode"
                    checked={settings.system.debugMode}
                    onCheckedChange={(checked) => setSettings(prev => ({
                      ...prev,
                      system: { ...prev.system, debugMode: checked }
                    }))}
                  />
                  <Label htmlFor="debug-mode">Debug Mode</Label>
                  <Badge variant="outline" className="ml-2">
                    {settings.system.debugMode ? "Enabled" : "Disabled"}
                  </Badge>
                </div>

                <Separator />

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => handleResetSettings("System")}>
                    Reset
                  </Button>
                  <Button onClick={() => handleSaveSettings("System")}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Advanced Settings
                </CardTitle>
                <CardDescription>
                  Advanced configuration options for experienced administrators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <h4 className="font-medium text-red-800">Danger Zone</h4>
                    </div>
                    <p className="text-sm text-red-700 mb-4">
                      These settings can affect system stability. Only modify if you know what you're doing.
                    </p>
                    <div className="space-y-3">
                      <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                        Clear System Cache
                      </Button>
                      <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                        Reset All Settings
                      </Button>
                      <Button variant="destructive">
                        Factory Reset
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">API Configuration</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>API Rate Limit</Label>
                      <Input placeholder="1000 requests/hour" />
                    </div>
                    <div className="space-y-2">
                      <Label>API Timeout</Label>
                      <Input placeholder="30 seconds" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Database Configuration</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Connection Pool Size</Label>
                      <Input placeholder="10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Query Timeout</Label>
                      <Input placeholder="30 seconds" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => handleResetSettings("Advanced")}>
                    Reset
                  </Button>
                  <Button onClick={() => handleSaveSettings("Advanced")}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EnhancedAdminLayout>
  );
}
