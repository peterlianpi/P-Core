import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Crown, Shield, Users } from "lucide-react";

type Organization = {
  id: string;
  name: string;
  logoImage: string | undefined;
  description: string | undefined;
  startedAt: Date | null | undefined;
  role: string | undefined;
  type?: string;
};

function OrganizationCard({ organization }: { organization: Organization }) {
  const getRoleIcon = (role?: string) => {
    switch (role?.toUpperCase()) {
      case 'OWNER':
        return <Crown className="h-3 w-3" />;
      case 'ADMIN':
        return <Shield className="h-3 w-3" />;
      default:
        return <Users className="h-3 w-3" />;
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role?.toUpperCase()) {
      case 'OWNER':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ADMIN':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date?: Date | null) => {
    if (!date) return '-';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-48 h-64 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 hover:border-blue-200">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-center">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={organization.logoImage || "/image/profile.png"}
              alt={organization.name}
            />
            <AvatarFallback className="text-lg font-semibold">
              {organization.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <div className="text-center">
          <h3 className="font-semibold text-sm truncate" title={organization.name}>
            {organization.name}
          </h3>
          {organization.type && (
            <Badge variant="outline" className="text-xs mt-1">
              {organization.type}
            </Badge>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-1">
            {getRoleIcon(organization.role)}
            <Badge
              variant="secondary"
              className={`text-xs ${getRoleColor(organization.role)}`}
            >
              {organization.role || 'Member'}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span className="truncate">
              {formatDate(organization.startedAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrganizationCard;
