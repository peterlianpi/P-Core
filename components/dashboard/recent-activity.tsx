"use client";

/**
 * RECENT ACTIVITY: Real-time Activity Feed Component
 * 
 * This component provides:
 * 1. Real-time activity updates
 * 2. Organization-specific activity types
 * 3. User avatars and timestamps
 * 4. Activity categorization and filtering
 * 5. Interactive activity items
 * 
 * FEATURES:
 * - Dynamic activity feed based on org type
 * - Color-coded activity indicators
 * - Relative time formatting
 * - Activity filtering by type
 * - Loading states and animations
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  GraduationCap,
  BookOpen,
  DollarSign,
  Calendar,
  Mail,
  UserPlus,
  FileText,
  Award,
  Clock,
  Filter,
  MoreVertical,
  Eye,
  Heart,
  Building
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

// ============================================================================
// INTERFACES
// ============================================================================

interface Activity {
  id: string;
  type: 'enrollment' | 'payment' | 'course' | 'event' | 'communication' | 'system' | 'achievement';
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
    role?: string;
  };
  timestamp: Date;
  metadata?: any;
  priority?: 'low' | 'medium' | 'high';
}

interface RecentActivityProps {
  orgType?: string;
  maxItems?: number;
}

// ============================================================================
// SAMPLE DATA GENERATION
// ============================================================================

const generateSchoolActivities = (): Activity[] => [
  {
    id: '1',
    type: 'enrollment',
    title: 'New Student Enrolled',
    description: 'Sarah Johnson enrolled in Computer Science program',
    user: { name: 'Admin User', avatar: '/avatars/admin.png', role: 'Admin' },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    priority: 'medium'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Fee Payment Received',
    description: 'Monthly tuition payment processed for Mark Wilson',
    user: { name: 'Finance Team', avatar: '/avatars/finance.png', role: 'Accountant' },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: '3',
    type: 'course',
    title: 'Course Updated',
    description: 'Mathematics curriculum revised with new materials',
    user: { name: 'Dr. Emily Davis', avatar: '/avatars/teacher.png', role: 'Teacher' },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Student Achievement',
    description: 'Alex Chen received Dean\'s List recognition',
    user: { name: 'Academic Office', avatar: '/avatars/academic.png', role: 'Staff' },
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    priority: 'high'
  },
  {
    id: '5',
    type: 'event',
    title: 'Event Scheduled',
    description: 'Parent-Teacher conference scheduled for next week',
    user: { name: 'Event Coordinator', avatar: '/avatars/coordinator.png', role: 'Staff' },
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  },
  {
    id: '6',
    type: 'system',
    title: 'System Update',
    description: 'Grade submission system updated successfully',
    user: { name: 'System Admin', avatar: '/avatars/system.png', role: 'Admin' },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  }
];

const generateChurchActivities = (): Activity[] => [
  {
    id: '1',
    type: 'enrollment',
    title: 'New Member Joined',
    description: 'The Smith family joined our congregation',
    user: { name: 'Pastor John', avatar: '/avatars/pastor.png', role: 'Pastor' },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    priority: 'medium'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Donation Received',
    description: 'Special offering for building fund',
    user: { name: 'Treasurer', avatar: '/avatars/treasurer.png', role: 'Treasurer' },
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    type: 'event',
    title: 'Event Planned',
    description: 'Community outreach event scheduled',
    user: { name: 'Ministry Team', avatar: '/avatars/ministry.png', role: 'Staff' },
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: '4',
    type: 'communication',
    title: 'Newsletter Sent',
    description: 'Weekly newsletter distributed to all members',
    user: { name: 'Communications', avatar: '/avatars/comms.png', role: 'Staff' },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  }
];

const generateBusinessActivities = (): Activity[] => [
  {
    id: '1',
    type: 'enrollment',
    title: 'New Employee Onboarded',
    description: 'Jessica Martinez joined the Development team',
    user: { name: 'HR Manager', avatar: '/avatars/hr.png', role: 'Manager' },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    priority: 'medium'
  },
  {
    id: '2',
    type: 'achievement',
    title: 'Project Completed',
    description: 'E-commerce platform project delivered successfully',
    user: { name: 'Project Manager', avatar: '/avatars/pm.png', role: 'Manager' },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    priority: 'high'
  },
  {
    id: '3',
    type: 'payment',
    title: 'Client Payment Received',
    description: 'Invoice #INV-2024-001 paid by ABC Corp',
    user: { name: 'Finance Team', avatar: '/avatars/finance.png', role: 'Accountant' },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: '4',
    type: 'event',
    title: 'Team Meeting',
    description: 'Weekly standup meeting conducted',
    user: { name: 'Scrum Master', avatar: '/avatars/scrum.png', role: 'Lead' },
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  }
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getActivityIcon = (type: Activity['type']) => {
  const iconMap = {
    enrollment: UserPlus,
    payment: DollarSign,
    course: BookOpen,
    event: Calendar,
    communication: Mail,
    system: FileText,
    achievement: Award
  };
  
  return iconMap[type] || User;
};

const getActivityColor = (type: Activity['type'], priority?: Activity['priority']) => {
  if (priority === 'high') return 'bg-red-500';
  if (priority === 'medium') return 'bg-yellow-500';
  
  const colorMap = {
    enrollment: 'bg-green-500',
    payment: 'bg-blue-500',
    course: 'bg-purple-500',
    event: 'bg-orange-500',
    communication: 'bg-cyan-500',
    system: 'bg-gray-500',
    achievement: 'bg-pink-500'
  };
  
  return colorMap[type] || 'bg-gray-400';
};

const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return date.toLocaleDateString();
};

// ============================================================================
// ACTIVITY ITEM COMPONENT
// ============================================================================

const ActivityItem: React.FC<{ 
  activity: Activity; 
  index: number 
}> = ({ activity, index }) => {
  const Icon = getActivityIcon(activity.type);
  const colorClass = getActivityColor(activity.type, activity.priority);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200 group"
    >
      {/* Activity Indicator */}
      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${colorClass} text-white flex-shrink-0`}>
        <Icon className="h-4 w-4" />
      </div>

      {/* Activity Content */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground leading-tight">
            {activity.title}
          </p>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {formatRelativeTime(activity.timestamp)}
          </span>
        </div>
        
        <p className="text-xs text-muted-foreground leading-relaxed">
          {activity.description}
        </p>
        
        {/* User Info */}
        <div className="flex items-center space-x-2">
          <Avatar className="h-5 w-5">
            <AvatarImage src={activity.user.avatar} />
            <AvatarFallback className="text-xs">
              {activity.user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">
            {activity.user.name}
          </span>
          {activity.user.role && (
            <Badge variant="outline" className="text-xs px-1 py-0">
              {activity.user.role}
            </Badge>
          )}
        </div>
      </div>

      {/* Actions */}
      <Button
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 w-6 p-0"
      >
        <MoreVertical className="h-3 w-3" />
      </Button>
    </motion.div>
  );
};

// ============================================================================
// MAIN RECENT ACTIVITY COMPONENT
// ============================================================================

const RecentActivity: React.FC<RecentActivityProps> = ({ 
  orgType = 'school', 
  maxItems = 10 
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Import dashboard API dynamically to avoid circular dependencies
        const { getDashboardActivity } = await import('@/features/dashboard/api');
        
        const result = await getDashboardActivity(orgType, maxItems, filter);
        
        if (result.success && result.data) {
          setActivities(result.data);
        } else {
          // Fallback to mock data if API fails
          let data: Activity[];
          switch (orgType) {
            case 'church':
              data = generateChurchActivities();
              break;
            case 'business':
              data = generateBusinessActivities();
              break;
            default:
              data = generateSchoolActivities();
          }
          setActivities(data.slice(0, maxItems));
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error);
        // Fallback to mock data if API fails
        let data: Activity[];
        switch (orgType) {
          case 'church':
            data = generateChurchActivities();
            break;
          case 'business':
            data = generateBusinessActivities();
            break;
          default:
            data = generateSchoolActivities();
        }
        setActivities(data.slice(0, maxItems));
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [orgType, maxItems, filter]);

  const filteredActivities = activities.filter(activity => 
    filter === 'all' || activity.type === filter
  );

  const activityTypes = Array.from(new Set(activities.map(a => a.type)));

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 animate-pulse">
                <div className="w-8 h-8 bg-muted rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {activityTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <CardDescription>
          Latest updates and activities in your {orgType || 'organization'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="p-6 pt-0 space-y-1">
            <AnimatePresence>
              {filteredActivities.map((activity, index) => (
                <ActivityItem 
                  key={activity.id}
                  activity={activity}
                  index={index}
                />
              ))}
            </AnimatePresence>
            
            {filteredActivities.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No recent activity found</p>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {activities.length > 0 && (
          <>
            <Separator />
            <div className="p-4">
              <Button variant="ghost" className="w-full text-sm">
                <Eye className="h-4 w-4 mr-2" />
                View All Activity
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
