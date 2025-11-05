/**
 * Simplified Admin Panel Layout for Frontend-Only System
 * No complex organization management needed
 */

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export async function AdminPanelLayoutPage({ children }: ProtectedLayoutProps) {
  // Simple wrapper for admin panel pages
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
