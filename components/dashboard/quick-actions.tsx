"use client";

/**
 * QUICK ACTIONS: Context-Aware Action Shortcuts
 * 
 * This component provides:
 * 1. Role-based quick action buttons
 * 2. Organization-type specific actions
 * 3. Modern card-based layout
 * 4. Navigation shortcuts to common tasks
 * 5. Permission-aware action visibility
 * 
 * FEATURES:
 * - Dynamic actions based on user role and org type
 * - Beautiful icons and descriptions
 * - Hover effects and animations
 * - Keyboard shortcuts support
 * - Analytics tracking for action usage
 */

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Plus,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  Upload,
  Download,
  Mail,
  BarChart3,
  UserPlus,
  Building,
  Heart,
  Briefcase,
  Award
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ============================================================================
// INTERFACES
// ============================================================================

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  shortcut?: string;
  requiredRole?: string[];
  category: 'primary' | 'secondary' | 'management';
}

interface QuickActionsProps {
  orgType?: string;
  userRole?: string;
}

// ============================================================================
// ACTION DEFINITIONS
// ============================================================================

const getActionsForSchool = (): QuickAction[] => [
  {
    id: 'add-student',
    title: 'Add New Student',
    description: 'Enroll a new student in the system',
    icon: UserPlus,
    href: '/school-management/students/add',
    color: 'bg-blue-500',
    shortcut: 'S',
    requiredRole: ['OWNER', 'ADMIN', 'OFFICE_STAFF'],
    category: 'primary'
  },
  {
    id: 'create-course',
    title: 'Create Course',
    description: 'Set up a new course or subject',
    icon: BookOpen,
    href: '/school-management/courses/add',
    color: 'bg-green-500',
    shortcut: 'C',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'primary'
  },
  {
    id: 'add-teacher',
    title: 'Add Teacher',
    description: 'Register a new teaching staff member',
    icon: GraduationCap,
    href: '/school-management/teachers/add',
    color: 'bg-purple-500',
    shortcut: 'T',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'primary'
  },
  {
    id: 'schedule-class',
    title: 'Schedule Class',
    description: 'Create or modify class schedules',
    icon: Calendar,
    href: '/school-management/schedule/add',
    color: 'bg-orange-500',
    shortcut: 'H',
    requiredRole: ['OWNER', 'ADMIN', 'TEACHER'],
    category: 'secondary'
  },
  {
    id: 'record-payment',
    title: 'Record Payment',
    description: 'Process student fee payments',
    icon: DollarSign,
    href: '/school-management/transactions/add',
    color: 'bg-emerald-500',
    shortcut: 'P',
    requiredRole: ['OWNER', 'ADMIN', 'ACCOUNTANT'],
    category: 'secondary'
  },
  {
    id: 'generate-report',
    title: 'Generate Report',
    description: 'Create academic or financial reports',
    icon: FileText,
    href: '/school-management/reports',
    color: 'bg-indigo-500',
    shortcut: 'R',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'management'
  },
  {
    id: 'bulk-import',
    title: 'Bulk Import',
    description: 'Import students or data from CSV',
    icon: Upload,
    href: '/school-management/import',
    color: 'bg-teal-500',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'management'
  },
  {
    id: 'analytics',
    title: 'View Analytics',
    description: 'Check performance metrics',
    icon: BarChart3,
    href: '/school-management/analytics',
    color: 'bg-pink-500',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'management'
  }
];

const getActionsForChurch = (): QuickAction[] => [
  {
    id: 'add-member',
    title: 'Add New Member',
    description: 'Register a new church member',
    icon: UserPlus,
    href: '/members/add',
    color: 'bg-blue-500',
    shortcut: 'M',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'primary'
  },
  {
    id: 'create-event',
    title: 'Create Event',
    description: 'Plan a church event or service',
    icon: Calendar,
    href: '/events/add',
    color: 'bg-green-500',
    shortcut: 'E',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'primary'
  },
  {
    id: 'add-family',
    title: 'Add Family',
    description: 'Register a new family unit',
    icon: Building,
    href: '/families/add',
    color: 'bg-purple-500',
    shortcut: 'F',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'primary'
  },
  {
    id: 'record-donation',
    title: 'Record Donation',
    description: 'Process member donations',
    icon: Heart,
    href: '/donations/add',
    color: 'bg-pink-500',
    shortcut: 'D',
    requiredRole: ['OWNER', 'ADMIN', 'ACCOUNTANT'],
    category: 'secondary'
  },
  {
    id: 'send-newsletter',
    title: 'Send Newsletter',
    description: 'Communicate with members',
    icon: Mail,
    href: '/communications/newsletter',
    color: 'bg-orange-500',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'secondary'
  },
  {
    id: 'member-directory',
    title: 'Member Directory',
    description: 'View and manage member list',
    icon: Users,
    href: '/members',
    color: 'bg-indigo-500',
    category: 'management'
  }
];

const getActionsForBusiness = (): QuickAction[] => [
  {
    id: 'add-employee',
    title: 'Add Employee',
    description: 'Onboard a new team member',
    icon: UserPlus,
    href: '/employees/add',
    color: 'bg-blue-500',
    shortcut: 'E',
    requiredRole: ['OWNER', 'ADMIN', 'MANAGER'],
    category: 'primary'
  },
  {
    id: 'create-project',
    title: 'Create Project',
    description: 'Start a new business project',
    icon: Briefcase,
    href: '/projects/add',
    color: 'bg-green-500',
    shortcut: 'P',
    requiredRole: ['OWNER', 'ADMIN', 'MANAGER'],
    category: 'primary'
  },
  {
    id: 'add-client',
    title: 'Add Client',
    description: 'Register a new business client',
    icon: Building,
    href: '/clients/add',
    color: 'bg-purple-500',
    shortcut: 'C',
    requiredRole: ['OWNER', 'ADMIN', 'MANAGER'],
    category: 'primary'
  },
  {
    id: 'track-performance',
    title: 'Performance Tracking',
    description: 'Monitor team and project metrics',
    icon: BarChart3,
    href: '/performance',
    color: 'bg-orange-500',
    requiredRole: ['OWNER', 'ADMIN', 'MANAGER'],
    category: 'secondary'
  },
  {
    id: 'financial-report',
    title: 'Financial Report',
    description: 'Generate business reports',
    icon: FileText,
    href: '/reports/financial',
    color: 'bg-emerald-500',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'management'
  }
];

const getDefaultActions = (): QuickAction[] => [
  {
    id: 'add-member',
    title: 'Add Member',
    description: 'Invite a new organization member',
    icon: UserPlus,
    href: '/organization/invite',
    color: 'bg-blue-500',
    shortcut: 'M',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'primary'
  },
  {
    id: 'organization-settings',
    title: 'Organization Settings',
    description: 'Manage organization preferences',
    icon: Settings,
    href: '/organization/settings',
    color: 'bg-gray-500',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'management'
  },
  {
    id: 'view-reports',
    title: 'View Reports',
    description: 'Check organization reports',
    icon: FileText,
    href: '/reports',
    color: 'bg-indigo-500',
    requiredRole: ['OWNER', 'ADMIN'],
    category: 'management'
  }
];

// ============================================================================
// ACTION CARD COMPONENT
// ============================================================================

const ActionCard: React.FC<{
  action: QuickAction;
  index: number;
}> = ({ action, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <Link href={action.href}>
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-background to-muted/30 hover:from-background hover:to-muted/50">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className={cn(
              'flex items-center justify-center w-12 h-12 rounded-lg text-white transition-transform duration-300 group-hover:scale-110',
              action.color
            )}>
              <action.icon className="h-6 w-6" />
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                {action.shortcut && (
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    {action.shortcut}
                  </Badge>
                )}
              </div>
              
              <p className="text-xs text-muted-foreground leading-relaxed">
                {action.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  </motion.div>
);

// ============================================================================
// MAIN QUICK ACTIONS COMPONENT
// ============================================================================

const QuickActions: React.FC<QuickActionsProps> = ({ 
  orgType = 'organization', 
  userRole = 'MEMBER' 
}) => {
  // Get actions based on organization type
  const getAllActions = () => {
    switch (orgType) {
      case 'school':
        return getActionsForSchool();
      case 'church':
        return getActionsForChurch();
      case 'business':
        return getActionsForBusiness();
      default:
        return getDefaultActions();
    }
  };

  const allActions = getAllActions();

  // Filter actions based on user role
  const filteredActions = allActions.filter(action => 
    !action.requiredRole || action.requiredRole.includes(userRole)
  );

  // Group actions by category
  const primaryActions = filteredActions.filter(a => a.category === 'primary');
  const secondaryActions = filteredActions.filter(a => a.category === 'secondary');
  const managementActions = filteredActions.filter(a => a.category === 'management');

  return (
    <div className="space-y-8">
      {/* Primary Actions */}
      {primaryActions.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <Badge variant="secondary" className="text-xs">
              {primaryActions.length} available
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {primaryActions.map((action, index) => (
              <ActionCard key={action.id} action={action} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Secondary Actions */}
      {secondaryActions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Additional Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {secondaryActions.map((action, index) => (
              <ActionCard 
                key={action.id} 
                action={action} 
                index={primaryActions.length + index} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Management Actions */}
      {managementActions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Management</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {managementActions.map((action, index) => (
              <ActionCard 
                key={action.id} 
                action={action} 
                index={primaryActions.length + secondaryActions.length + index} 
              />
            ))}
          </div>
        </div>
      )}

      {/* No Actions Message */}
      {filteredActions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-2">
              <Award className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-semibold text-muted-foreground">
                No Quick Actions Available
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Quick actions will appear here based on your role and organization type. 
                Contact your administrator for access to more features.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Keyboard Shortcuts Info */}
      {filteredActions.some(a => a.shortcut) && (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <kbd className="px-2 py-1 bg-background rounded text-xs">Alt</kbd>
              <span>+</span>
              <kbd className="px-2 py-1 bg-background rounded text-xs">Key</kbd>
              <span>for keyboard shortcuts</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuickActions;
