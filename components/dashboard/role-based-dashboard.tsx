"use client";

import React from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Building2,
  Shield,
  User,
  Settings,
  BarChart3,
  GraduationCap,
  Church,
  Library,
  Briefcase,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { UserRole, RoleConfig } from "@/types/auth";

interface RoleBasedDashboardProps {
  className?: string;
}

export const RoleBasedDashboard: React.FC<RoleBasedDashboardProps> = ({ className }) => {
  const user = useCurrentUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const getRoleConfig = () => {
    switch (user.role) {
      case "SUPERADMIN":
        return {
          title: "Super Administrator Dashboard",
          description: "Complete system oversight and management",
          icon: Shield,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          features: [
            {
              title: "System Administration",
              description: "Manage all system settings and configurations",
              icon: Settings,
              action: "System Settings",
              stats: "All systems operational"
            },
            {
              title: "User Management",
              description: "Oversee all users across organizations",
              icon: Users,
              action: "Manage Users",
              stats: "1,247 total users"
            },
            {
              title: "Analytics & Reporting",
              description: "Advanced system analytics and insights",
              icon: BarChart3,
              action: "View Analytics",
              stats: "99.9% uptime"
            }
          ],
          quickActions: [
            { label: "Security Audit", icon: Shield, variant: "default" as const },
            { label: "System Health", icon: CheckCircle, variant: "outline" as const },
            { label: "Revenue Reports", icon: BarChart3, variant: "outline" as const }
          ]
        };

      case "ADMIN":
        return {
          title: "Administrator Dashboard",
          description: "Organization management and user oversight",
          icon: Shield,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          features: [
            {
              title: "User Administration",
              description: "Manage users within your organization",
              icon: Users,
              action: "Manage Users",
              stats: "156 active users"
            },
            {
              title: "Organization Settings",
              description: "Configure organization preferences",
              icon: Building2,
              action: "Org Settings",
              stats: "3 departments"
            },
            {
              title: "Reports & Analytics",
              description: "View organization performance metrics",
              icon: BarChart3,
              action: "View Reports",
              stats: "94% satisfaction"
            }
          ],
          quickActions: [
            { label: "Add User", icon: Users, variant: "default" as const },
            { label: "System Logs", icon: Clock, variant: "outline" as const },
            { label: "Alerts", icon: AlertTriangle, variant: "outline" as const }
          ]
        };

      case "USER":
        // Check if user has an organization (company owner)
        const hasOrganization = user.defaultOrgId;
        if (hasOrganization) {
          return {
            title: "Company Owner Dashboard",
            description: "Manage your organization and team members",
            icon: Building2,
            color: "text-green-600",
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            features: [
              {
                title: "Team Management",
                description: "Invite and manage team members",
                icon: Users,
                action: "Manage Team",
                stats: "12 team members"
              },
              {
                title: "Organization Overview",
                description: "View your company's performance",
                icon: Building2,
                action: "View Org",
                stats: "3 active projects"
              },
              {
                title: "Resource Access",
                description: "Access organization resources",
                icon: Briefcase,
                action: "Resources",
                stats: "All systems accessible"
              }
            ],
            quickActions: [
              { label: "Invite Member", icon: Users, variant: "default" as const },
              { label: "Create Project", icon: Briefcase, variant: "outline" as const },
              { label: "View Reports", icon: BarChart3, variant: "outline" as const }
            ]
          };
        } else {
          return {
            title: "Personal Dashboard",
            description: "Access your personal workspace and resources",
            icon: User,
            color: "text-purple-600",
            bgColor: "bg-purple-50",
            borderColor: "border-purple-200",
            features: [
              {
                title: "Personal Profile",
                description: "Manage your account settings",
                icon: User,
                action: "Edit Profile",
                stats: "Profile complete"
              },
              {
                title: "Available Organizations",
                description: "Browse and join organizations",
                icon: Building2,
                action: "Browse Orgs",
                stats: "5 nearby orgs"
              },
              {
                title: "Resource Library",
                description: "Access shared resources",
                icon: Library,
                action: "Browse Library",
                stats: "1,200+ resources"
              }
            ],
            quickActions: [
              { label: "Update Profile", icon: User, variant: "default" as const },
              { label: "Join Organization", icon: Building2, variant: "outline" as const },
              { label: "Browse Resources", icon: Library, variant: "outline" as const }
            ]
          };
        }

      default:
        return {
          title: "Dashboard",
          description: "Welcome to your workspace",
          icon: User,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          features: [
            {
              title: "Getting Started",
              description: "Complete your profile setup",
              icon: User,
              action: "Setup Profile",
              stats: "Profile incomplete"
            }
          ],
          quickActions: [
            { label: "Complete Setup", icon: User, variant: "default" as const }
          ]
        };
    }
  };

  const config = getRoleConfig();
  const IconComponent = config.icon;

  return (
    <div className={className}>
      {/* Role Header */}
      <div className={`p-6 rounded-lg ${config.bgColor} ${config.borderColor} border mb-6`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${config.bgColor} border-2 ${config.borderColor}`}>
            <IconComponent className={`h-8 w-8 ${config.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold">{config.title}</h1>
              <Badge variant="secondary" className="text-xs">
                {user.role}
              </Badge>
            </div>
            <p className="text-muted-foreground">{config.description}</p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {config.features.map((feature, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${config.bgColor}`}>
                  <feature.icon className={`h-5 w-5 ${config.color}`} />
                </div>
                <div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{feature.stats}</span>
                <Button size="sm" variant="outline">
                  {feature.action}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions for your role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {config.quickActions.map((action, index) => (
              <Button key={index} variant={action.variant} size="sm">
                <action.icon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role-specific content based on organization type */}
      {user.role === "USER" && user.defaultOrgId && (
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Organization Management
              </CardTitle>
              <CardDescription>
                As a company owner, you have full control over your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Organization Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Invite unlimited team members</li>
                    <li>• Create and manage projects</li>
                    <li>• Access advanced analytics</li>
                    <li>• Custom branding options</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Next Steps</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Set up your organization profile</li>
                    <li>• Invite your first team member</li>
                    <li>• Create your first project</li>
                    <li>• Explore available integrations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
