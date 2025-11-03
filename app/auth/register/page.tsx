/**
 * Register Page - MVP Implementation
 *
 * User registration page using the User Management MVP components
 */

import { Suspense } from 'react';
import { RegisterForm } from '@/features/user-management/mvp/components';
import { Loader2 } from 'lucide-react';

function RegisterPageContent() {
  const handleRegisterSuccess = (user: any) => {
    // Redirect to dashboard or verification page
    window.location.href = '/dashboard';
  };

  const handleRegisterError = (error: string) => {
    console.error('Registration error:', error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Join P-Core and start managing your organization
          </p>
        </div>

        <RegisterForm
          onSuccess={handleRegisterSuccess}
          onError={handleRegisterError}
        />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/auth/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}

export const metadata = {
  title: 'Register - P-Core',
  description: 'Create your P-Core account',
};
