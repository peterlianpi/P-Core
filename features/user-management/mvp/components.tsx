/**
 * User Management MVP Components
 *
 * Core React components for user authentication and profile management using shadcn/ui
 */

'use client';

import React, { useState, useEffect } from 'react';
import { UserProfile, LoginCredentials, RegisterData, UpdateProfileData } from './types';
import { loginUser, registerUser, getCurrentUser, updateUserProfile, logoutUser, validatePassword, validateEmail } from './api';

// shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Loader2, Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSuccess?: (user: UserProfile) => void;
  onError?: (error: string) => void;
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await loginUser(credentials);
      onSuccess?.(response.user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setErrors({ general: message });
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof LoginCredentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCredentials(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={handleChange('email')}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange('password')}
                className="pl-10"
                required
              />
            </div>
          </div>

          {errors.general && (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

interface RegisterFormProps {
  onSuccess?: (user: UserProfile) => void;
  onError?: (error: string) => void;
}

export function RegisterForm({ onSuccess, onError }: RegisterFormProps) {
  const [data, setData] = useState<RegisterData>({
    email: '',
    password: '',
    name: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!validateEmail(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors[0];
    }

    if (data.password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await registerUser(data);
      onSuccess?.(response.user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setErrors({ general: message });
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof RegisterData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create Account</CardTitle>
        <CardDescription className="text-center">
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={data.name}
                onChange={handleChange('name')}
                className="pl-10"
                required
              />
            </div>
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleChange('email')}
                className="pl-10"
                required
              />
            </div>
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={data.password}
                onChange={handleChange('password')}
                className="pl-10"
                required
              />
            </div>
            {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
          </div>

          {errors.general && (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

interface ProfileFormProps {
  user: UserProfile;
  onSuccess?: (user: UserProfile) => void;
  onError?: (error: string) => void;
}

export function ProfileForm({ user, onSuccess, onError }: ProfileFormProps) {
  const [data, setData] = useState<UpdateProfileData>({
    name: user.name || '',
    avatar: user.avatar || '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const updatedUser = await updateUserProfile(data);
      onSuccess?.(updatedUser);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Profile update failed';
      setErrors({ general: message });
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof UpdateProfileData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Profile Settings</CardTitle>
        <CardDescription className="text-center">
          Update your personal information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={data.name || ''}
                onChange={handleChange('name')}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={data.avatar || ''}
              onChange={handleChange('avatar')}
            />
          </div>

          {errors.general && (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

interface UserProfileDisplayProps {
  user: UserProfile;
  onLogout?: () => void;
}

export function UserProfileDisplay({ user, onLogout }: UserProfileDisplayProps) {
  const handleLogout = async () => {
    try {
      await logoutUser();
      onLogout?.();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Profile</CardTitle>
        <CardDescription className="text-center">
          Your account information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.avatar} alt={user.name || user.email} />
            <AvatarFallback>
              {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : user.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="text-lg font-medium">{user.name || 'No name set'}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground">Role: {user.role}</p>
            {user.lastLogin && (
              <p className="text-sm text-muted-foreground">
                Last login: {new Date(user.lastLogin).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        <Separator className="my-4" />

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full"
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
