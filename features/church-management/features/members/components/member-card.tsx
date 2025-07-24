// Enhanced Member Card Component
// Displays church member information with family relationships and roles
// Integrates with the new unified architecture

'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  Heart,
  Calendar,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    image?: string | null;
    phone?: string | null;
    email?: string | null;
    birthDate?: string | null;
    gender?: string | null;
    bloodType?: string | null;
    isActive: boolean;
    home?: {
      id: string;
      homeNumber: string;
      veng: {
        id: string;
        name: string;
        khawk: {
          id: string;
          name: string;
        };
      };
    } | null;
    spouse?: {
      id: string;
      name: string;
    } | null;
    roles?: Array<{
      id: string;
      role: {
        id: string;
        name: string;
      };
    }>;
    familyFrom?: Array<{
      id: string;
      to: {
        id: string;
        name: string;
      };
      type: {
        name: string;
      };
    }>;
  };
  onEdit?: (member: any) => void;
  onDelete?: (memberId: string) => void;
  onViewDetails?: (memberId: string) => void;
  onAssignRole?: (memberId: string) => void;
  className?: string;
}

export function MemberCard({ 
  member, 
  onEdit, 
  onDelete, 
  onViewDetails,
  onAssignRole,
  className 
}: MemberCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className={cn(
      "group hover:shadow-md transition-all duration-200",
      !member.isActive && "opacity-60 bg-muted/30",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.image || undefined} alt={member.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight truncate">
                {member.name}
              </h3>
              
              {member.birthDate && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>Age {calculateAge(member.birthDate)}</span>
                  {member.gender && (
                    <>
                      <span>•</span>
                      <span>{member.gender}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails?.(member.id)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit?.(member)}>
                Edit Member
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAssignRole?.(member.id)}>
                Assign Role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete?.(member.id)}
                className="text-destructive"
              >
                Delete Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contact Information */}
        <div className="space-y-2">
          {member.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{member.phone}</span>
            </div>
          )}
          
          {member.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{member.email}</span>
            </div>
          )}
        </div>

        {/* Location Information */}
        {member.home && (
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {member.home.veng.khawk.name} → {member.home.veng.name} → Home {member.home.homeNumber}
            </span>
          </div>
        )}

        {/* Family Information */}
        {member.spouse && (
          <div className="flex items-center gap-2 text-sm">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-muted-foreground">
              Married to <span className="font-medium">{member.spouse.name}</span>
            </span>
          </div>
        )}

        {/* Family Relationships */}
        {member.familyFrom && member.familyFrom.length > 0 && (
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {member.familyFrom.map((rel, index) => (
                <span key={rel.id}>
                  {rel.type.name} of {rel.to.name}
                  {index < member.familyFrom!.length - 1 && ", "}
                </span>
              ))}
            </span>
          </div>
        )}

        {/* Roles */}
        {member.roles && member.roles.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {member.roles.map((roleAssignment) => (
              <Badge 
                key={roleAssignment.id} 
                variant="secondary" 
                className="text-xs"
              >
                {roleAssignment.role.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Additional Information */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {member.bloodType && (
              <span>Blood: {member.bloodType}</span>
            )}
            <span className={cn(
              "font-medium",
              member.isActive ? "text-green-600" : "text-red-600"
            )}>
              {member.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onViewDetails?.(member.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Member list component for displaying multiple cards
interface MemberListProps {
  members: Array<any>;
  onEdit?: (member: any) => void;
  onDelete?: (memberId: string) => void;
  onViewDetails?: (memberId: string) => void;
  onAssignRole?: (memberId: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function MemberList({ 
  members, 
  onEdit, 
  onDelete, 
  onViewDetails,
  onAssignRole,
  isLoading = false,
  className 
}: MemberListProps) {
  if (isLoading) {
    return (
      <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-muted rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No members found</h3>
        <p className="text-muted-foreground">
          No church members match your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
          onAssignRole={onAssignRole}
        />
      ))}
    </div>
  );
}
