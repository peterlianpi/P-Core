/**
 * User Profile Page - MVP Implementation
 *
 * Profile management page using the User Management MVP components
 */

'use client';

import { Suspense, useState } from 'react';
import { useCurrentUser, useUpdateProfile } from '@/features/user-management';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, User, Settings } from 'lucide-react';

function ProfilePageContent() {
  const { data: user, isLoading } = useCurrentUser();
  const updateProfile = useUpdateProfile();

  const handleProfileUpdate = (data: any) => {
    updateProfile.mutate(data);
  };

  const handleLogout = () => {
    // For frontend-only app, just reload the page or show a message
    alert('Logout not required in demo mode. This is a frontend-only application.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">
              Please log in to view your profile.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserProfileDisplay user={user} onLogout={handleLogout} />

              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Your account details and status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <p className="text-sm">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Role</p>
                      <p className="text-sm capitalize">{user.role.toLowerCase()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <p className="text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isTwoFactorEnabled
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isTwoFactorEnabled ? '2FA Enabled' : '2FA Disabled'}
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                      <p className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="max-w-2xl">
              <ProfileForm
                user={user}
                onSuccess={handleProfileUpdate}
                onError={(error: Error) => console.error('Profile update error:', error)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Simple profile display component
function UserProfileDisplay({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
        <CardDescription>
          Your personal account details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user.name || 'No name'}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            Sign Out
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

// Simple profile form component
function ProfileForm({ user, onSuccess, onError }: { user: any; onSuccess: (data: any) => void; onError: (error: Error) => void }) {
  const [name, setName] = useState(user.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({ name });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>
          Update your personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              value={user.email}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-muted"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed. Contact support if needed.
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Save Changes
          </button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <ProfilePageContent />
    </Suspense>
  );
}
