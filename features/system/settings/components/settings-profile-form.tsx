"use client"

import { useEffect, useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { UserIcon, Shield, Building2, MessageCircle, Eye, EyeOff, Loader2, Menu, LogOut, Trash2, Download, AlertTriangle, UserCog } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

import type { BadgeVariant } from "../components/DesktopProfileHeader";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useOrgData } from "@/features"
import { userSettingsSchema } from "../user-settings-schema"
import CustomUploadImagePage from "../../image-upload/components/upload-image"
import { MobileProfileHeader } from "../components/MobileProfileHeader"
import { DesktopProfileHeader } from "../components/DesktopProfileHeader"
import { settings as updateSettings } from "@/actions/settings/settings" // Server action for updating settings

// Types remain the same...
type UserRole = "SUPERADMIN" | "ADMIN" | "USER"

interface UserProfile {
  id?: string
  name?: string
  email?: string
  image?: string
  role?: UserRole
  isTwoFactorEnabled?: boolean
  defaultOrgId?: string
}

interface TelegramSetting {
  telegramChatId?: string
  telegramBotToken?: string
  isActive?: boolean
}

interface UserProfileSettingsProps {
  user: UserProfile
  telegram?: TelegramSetting
}

type UserSettingsFormData = z.infer<typeof userSettingsSchema>

const tabs = [
  { id: "profile", label: "Profile", icon: UserIcon },
  { id: "security", label: "Security", icon: Shield },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "telegram", label: "Telegram", icon: MessageCircle },
  { id: "account", label: "Account", icon: UserCog },
]

export function UserProfileSettings({ user, telegram }: UserProfileSettingsProps) {
  const { organizations } = useOrgData()
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    user?.image || null
  );

  const form = useForm<UserSettingsFormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      image: user?.image || "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
      defaultOrgId: user?.defaultOrgId || "",
      telegramChatId: telegram?.telegramChatId || "",
      telegramBotToken: telegram?.telegramBotToken || "",
    },
  })

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Reset form when user data changes
  useEffect(() => {
    form.reset({
      name: user?.name || "",
      email: user?.email || "",
      image: user?.image || "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
      defaultOrgId: user?.defaultOrgId || "",
      telegramChatId: telegram?.telegramChatId || "",
      telegramBotToken: telegram?.telegramBotToken || "",
    });
  }, [user, telegram, form]);

  const fileRef = form.register("image" as any);

  /**
   * Handles form submission for user settings using the server action.
   * Calls the server action and shows user feedback.
   * All sensitive logic is handled server-side for security.
   */
  /**
   * Handles form submission for user settings using the server action.
   * Ensures all required fields (role, image) are included for type safety.
   * Calls the server action and shows user feedback.
   * All sensitive logic is handled server-side for security.
   */
  const onSubmit = async (data: UserSettingsFormData) => {
    setIsLoading(true);
    try {
      // Always include required fields from the user object if not present in form data
      const payload = {
        ...data,
        // Always provide a valid role string; fallback to 'USER' if undefined
        role: user.role ?? "USER",
        image: imageUrl, // Use form image or fallback to user image
      };
      const result = await updateSettings(payload);
      if (result?.success) {
        toast.success(result.success);
      } else {
        toast.error(result?.error || "Failed to update settings");
      }
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setIsLoading(false);
    }
  };

  // Compatible with DesktopProfileHeader/MobileProfileHeader
  const getRoleBadgeVariant = (role?: string): BadgeVariant => {
    switch (role) {
      case "SUPERADMIN":
        return "destructive";
      case "ADMIN":
        return "default";
      default:
        return "secondary";
    }
  };

  const currentTab = tabs.find((tab) => tab.id === activeTab)

  // Mobile Navigation Component
  const MobileNavigation = () => (
    <div className="md:hidden">
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Menu className="h-4 w-4 mr-2" />
            {currentTab?.label}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="space-y-2 mt-6">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setActiveTab(tab.id)
                    setMobileMenuOpen(false)
                  }}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <MobileProfileHeader
        user={{...user,image:imageUrl??""}}
        currentTab={currentTab}
        getRoleBadgeVariant={getRoleBadgeVariant}
      />

      <div className="w-full px-4 py-4 md:py-8">
        {/* Desktop Profile Header */}
        <DesktopProfileHeader
          user={user}
          getRoleBadgeVariant={getRoleBadgeVariant}
          renderAvatar={() => (
            <CustomUploadImagePage
              ownerId={user.id ?? ''}
              ownerType={"USER"}
              feature="profile"
              canEdit={true}
              isClient={isClient}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              fileRef={fileRef}
            />
          )}
        />
        <MobileNavigation />
        {/* Settings Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Desktop Tabs */}
          <TabsList className="hidden md:grid w-full grid-cols-5">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-4 md:space-y-6 mt-0">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg md:text-xl">Profile Information</CardTitle>
                    <CardDescription className="text-sm">
                      Update your personal information and profile details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Mobile Profile Image */}
                    <div className="md:hidden flex flex-col items-center gap-4 pb-4 border-b">
                      <>
                        <CustomUploadImagePage
                          ownerId={user.id ?? ''}
                          ownerType={"USER"}
                          feature="profile"
                          canEdit={true}
                          isClient={isClient}
                          imageUrl={imageUrl}
                          setImageUrl={setImageUrl}
                          fileRef={fileRef}
                        />
                      </>
                      <div className="text-center">
                        <p className="font-medium">{user.name || "User"}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} className="md:text-base" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} className="md:text-base" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="Enter your phone number" {...field} className="md:text-base" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} className="md:text-base" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Security Tab */}
              <TabsContent value="security" className="space-y-4 md:space-y-6 mt-0">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg md:text-xl">Security Settings</CardTitle>
                    <CardDescription className="text-sm">
                      Manage your password and security preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 md:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Enter current password"
                                  {...field}
                                  className="md:text-base"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs md:text-sm">
                              Leave blank to keep your current password
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showNewPassword ? "text" : "password"}
                                  placeholder="Enter new password"
                                  {...field}
                                  className="md:text-base"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs md:text-sm">Must be at least 8 characters long</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Separator />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <FormField
                        control={form.control}
                        name="securityQuestion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Security Question</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a security question" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="pet">What is your pet's name?</SelectItem>
                                <SelectItem value="city">What city were you born in?</SelectItem>
                                <SelectItem value="school">What was your first school?</SelectItem>
                                <SelectItem value="color">What is your favorite color?</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-xs md:text-sm">
                              Used for account recovery
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="securityAnswer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Security Answer</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your security answer" {...field} className="md:text-base" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="isTwoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                          <div className="space-y-0.5 flex-1 pr-2">
                            <FormLabel className="text-sm md:text-base">Two-Factor Authentication</FormLabel>
                            <FormDescription className="text-xs md:text-sm">
                              Add an extra layer of security to your account
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Organization Tab */}
              <TabsContent value="organization" className="space-y-4 md:space-y-6 mt-0">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg md:text-xl">Organization Settings</CardTitle>
                    <CardDescription className="text-sm">
                      Manage your organization preferences and default settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className={`grid gap-4 md:gap-6 ${user.role === "USER" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                      <FormField
                        control={form.control}
                        name="defaultOrgId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Organization</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your default organization" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {organizations.map((org) => (
                                  <SelectItem key={org.organization.id} value={org.organization.id}>
                                    {org.organization.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-xs md:text-sm">
                              This organization will be selected by default when you log in
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {user.role !== "USER" && (
                        <FormField
                          control={form.control}
                          name="orgRole"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization Role</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select your role" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="OWNER">Owner</SelectItem>
                                  <SelectItem value="ADMIN">Administrator</SelectItem>
                                  <SelectItem value="MEMBER">Member</SelectItem>
                                  <SelectItem value="VIEWER">Viewer</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription className="text-xs md:text-sm">
                                Your role within the selected organization
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:p-4">
                          <div className="space-y-0.5 flex-1 pr-2">
                            <FormLabel className="text-sm md:text-base">Email Notifications</FormLabel>
                            <FormDescription className="text-xs md:text-sm">
                              Receive email notifications for organization activities
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Telegram Tab */}
              <TabsContent value="telegram" className="space-y-4 md:space-y-6 mt-0">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg md:text-xl">Telegram Integration</CardTitle>
                    <CardDescription className="text-sm">
                      Configure your Telegram bot settings for notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="telegramChatId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telegram Chat ID</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your Telegram chat ID" {...field} />
                            </FormControl>
                            <FormDescription className="text-xs md:text-sm">
                              Your unique Telegram chat identifier for receiving notifications
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {user.role === "SUPERADMIN" && (
                        <FormField
                          control={form.control}
                          name="telegramBotToken"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telegram Bot Token</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="Enter your bot token" {...field} />
                              </FormControl>
                              <FormDescription className="text-xs md:text-sm">
                                Bot token for sending messages (Super Admin only)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Account Tab */}
              <TabsContent value="account" className="space-y-4 md:space-y-6 mt-0">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg md:text-xl">Account Management</CardTitle>
                    <CardDescription className="text-sm">
                      Manage your account settings and data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Account Actions */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Download className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Export Data</h4>
                            <p className="text-sm text-muted-foreground">Download a copy of your data</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-red-900">Delete Account</h4>
                            <p className="text-sm text-red-700">Permanently delete your account and all data</p>
                          </div>
                        </div>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Logout Section */}
                    <div className="pt-4">
                      <h4 className="font-medium mb-4">Session Management</h4>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <LogOut className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Sign Out</h4>
                            <p className="text-sm text-muted-foreground">Sign out of your account</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => signOut({ callbackUrl: "/" })}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Submit Button - Fixed at bottom on mobile */}
              <div className="sticky bottom-0 bg-background border-t md:border-t-0 md:static p-4 md:p-0 -mx-4 md:mx-0">
                <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  )
}
