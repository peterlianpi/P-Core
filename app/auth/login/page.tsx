/**
 * Login Page - MVP Implementation
 *
 * Authentication page using the User Management MVP components
 */

import { Suspense } from 'react';
import { LoginForm } from '@/features/user-management/mvp/components';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

function LoginPageContent() {
  const handleLoginSuccess = (user: any) => {
    // Redirect to dashboard or intended page
    window.location.href = '/dashboard';
  };

  const handleLoginError = (error: string) => {
    console.error('Login error:', error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <LoginForm
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a
              href="/auth/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <LoginPageContent />
    </Suspense>
  );
}

export const metadata = {
  title: 'Login - P-Core',
  description: 'Sign in to your P-Core account',
};
