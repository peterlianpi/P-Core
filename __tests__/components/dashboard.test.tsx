/**
 * Dashboard Component Tests
 * Tests for the main dashboard page with mock data
 */

import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import DashboardPage from '../../app/(protected)/dashboard/page';

// Mock the useCurrentUser hook
vi.mock('../../../features/user-management/hooks', () => ({
  useCurrentUser: () => ({
    data: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'ADMIN',
      isTwoFactorEnabled: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-11-01'),
      organizations: []
    },
    isLoading: false
  })
}));

// Create a test query client
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0
    }
  }
});

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders dashboard with user greeting', async () => {
    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText('Welcome back, John Doe!')).toBeInTheDocument();
    });
  });

  it('displays admin role badge', async () => {
    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText('ADMIN')).toBeInTheDocument();
    });
  });

  it('shows dashboard statistics cards', async () => {
    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getAllByText('Total Students')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Active Students')[0]).toBeInTheDocument();
      expect(screen.getByText('Courses Offered')).toBeInTheDocument();
      expect(screen.getByText('System Health')).toBeInTheDocument();
    });
  });

  it('displays tab navigation', async () => {
    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Analytics')).toBeInTheDocument();
      expect(screen.getByText('Advanced')).toBeInTheDocument();
      expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    });
  });

  it('shows recent activity section', async () => {
    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    });
  });

  it('displays quick actions', async () => {
    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText('Quick Actions')).toBeInTheDocument();
      expect(screen.getByText('Manage Students')).toBeInTheDocument();
      expect(screen.getByText('Manage Members')).toBeInTheDocument();
    });
  });
});

describe('DashboardPage - Loading States', () => {
  it('shows loading spinner when data is loading', () => {
    // Mock loading state for this test only
    vi.doMock('../../../features/user-management/hooks', () => ({
      useCurrentUser: () => ({
        data: undefined,
        isLoading: true
      })
    }));

    renderWithProviders(<DashboardPage />);

    // Should show loading component
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

describe('DashboardPage - Role-based Features', () => {
  it('shows admin panel tab for admin users', async () => {
    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    });
  });

  it('shows super admin tab for super admin users', async () => {
    // Mock super admin user
    vi.mock('../../../features/user-management/hooks', () => ({
      useCurrentUser: () => ({
        data: {
          id: 'user-1',
          name: 'Super Admin',
          email: 'admin@example.com',
          role: 'SUPERADMIN',
          isTwoFactorEnabled: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          organizations: []
        },
        isLoading: false
      })
    }));

    renderWithProviders(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText('Super')).toBeInTheDocument();
    });
  });
});
