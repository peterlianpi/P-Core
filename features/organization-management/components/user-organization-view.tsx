"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Calendar, MapPin } from "lucide-react";
import { useOrgData } from "../context/org-context";

export function UserOrganizationView() {
  const { organizations } = useOrgData();

  if (!organizations || organizations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Organizations</h3>
        <p className="text-muted-foreground max-w-md">
          You are not currently a member of any organizations. Contact your administrator to be added to an organization.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">My Organizations</h2>
        <p className="text-muted-foreground">
          View and manage your organization memberships
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {organizations.map((orgData) => {
          const org = orgData.organization;
          return (
            <Card key={org.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {org.logoImage ? (
                      <img
                        src={org.logoImage}
                        alt={org.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div>
                      <CardTitle className="text-lg">{org.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {org.description || "No description available"}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {orgData.role || "MEMBER"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Organization Type */}
                  {org.type && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="capitalize">{org.type.toLowerCase()}</span>
                    </div>
                  )}

                  {/* Started Date */}
                  {org.startedAt && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Started {new Date(org.startedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {/* Member Count (placeholder for now) */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Organization member</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
