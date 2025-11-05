"use client";

/**
 * MOBILE NAVIGATION DEMO PAGE
 *
 * This page demonstrates the mobile navigation system in action.
 * It shows how the navigation adapts to different user roles and organization types.
 */

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobilePage, MobileCard, MobileSection } from "@/components/mobile";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useData } from "@/providers/data-provider";
import { Smartphone, Navigation, Zap, Shield, Users, Settings } from "lucide-react";

export default function MobileDemoPage() {
  const user = useCurrentUser();
  const { orgId } = useData();

  // Mock organizations data for demo
  const mockOrganizations = [
    {
      organization: {
        name: "Demo School",
        id: "org-1",
        type: "school",
        description: "A demonstration school organization"
      },
      role: "admin"
    },
    {
      organization: {
        name: "Demo Church",
        id: "org-2",
        type: "church",
        description: "A demonstration church organization"
      },
      role: "member"
    }
  ];

  return (
    <MobilePage
      organizations={mockOrganizations}
      title="Mobile Navigation Demo"
      subtitle="Experience the intuitive mobile navigation system"
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <MobileSection title="Welcome to Mobile Navigation">
          <MobileCard>
            <div className="flex items-center gap-3 mb-4">
              <Smartphone className="w-8 h-8 text-primary" />
              <div>
                <h3 className="font-semibold">Mobile-First Design</h3>
                <p className="text-sm text-muted-foreground">
                  Optimized for touch interactions and small screens
                </p>
              </div>
            </div>
            <p className="text-sm">
              This demo showcases a comprehensive mobile navigation system with bottom tabs,
              drawer navigation, and quick actions. The navigation adapts based on your role
              and organization type.
            </p>
          </MobileCard>
        </MobileSection>

        {/* Navigation Features */}
        <MobileSection title="Navigation Features">
          <div className="grid gap-4">
            <MobileCard>
              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Bottom Tab Navigation</h4>
                  <p className="text-sm text-muted-foreground">
                    Primary navigation with 4 main sections: Home, Organization, People, and Settings.
                    Always visible for quick access.
                  </p>
                </div>
              </div>
            </MobileCard>

            <MobileCard>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Quick Actions FAB</h4>
                  <p className="text-sm text-muted-foreground">
                    Floating Action Button with expandable menu for common actions like adding users,
                    creating tasks, scheduling meetings, and sending messages.
                  </p>
                </div>
              </div>
            </MobileCard>

            <MobileCard>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Role-Based Access</h4>
                  <p className="text-sm text-muted-foreground">
                    Navigation items appear based on user permissions and organization roles.
                    Admin users see additional management options.
                  </p>
                </div>
              </div>
            </MobileCard>

            <MobileCard>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">Organization Context</h4>
                  <p className="text-sm text-muted-foreground">
                    Navigation adapts to organization type (school, church, business) showing
                    relevant features and sections.
                  </p>
                </div>
              </div>
            </MobileCard>
          </div>
        </MobileSection>

        {/* Current User Info */}
        <MobileSection title="Current Context">
          <MobileCard>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">User:</span>
                <Badge variant="secondary">{user?.name || "Demo User"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Role:</span>
                <Badge variant="outline">{user?.role || "USER"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Organization:</span>
                <Badge variant="outline">
                  {mockOrganizations.find(org => org.organization.id === orgId)?.organization.name || "Demo School"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Org Type:</span>
                <Badge variant="outline">
                  {mockOrganizations.find(org => org.organization.id === orgId)?.organization.type || "school"}
                </Badge>
              </div>
            </div>
          </MobileCard>
        </MobileSection>

        {/* Usage Instructions */}
        <MobileSection title="How to Use">
          <MobileCard>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">1</div>
                <div>
                  <p className="text-sm">Use the bottom tab navigation to switch between main sections</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">2</div>
                <div>
                  <p className="text-sm">Tap the "More" button to access additional features via the drawer</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">3</div>
                <div>
                  <p className="text-sm">Use the floating action button for quick actions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">4</div>
                <div>
                  <p className="text-sm">Navigation adapts automatically based on your permissions</p>
                </div>
              </div>
            </div>
          </MobileCard>
        </MobileSection>

        {/* Action Buttons */}
        <MobileSection>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button className="flex-1">
              <Users className="w-4 h-4 mr-2" />
              View Users
            </Button>
          </div>
        </MobileSection>
      </div>
    </MobilePage>
  );
}
