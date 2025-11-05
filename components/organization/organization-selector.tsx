'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Building2,
  ChevronDown,
  Plus,
  Settings,
  Users,
  GraduationCap,
  Church,
  Library,
  Globe
} from 'lucide-react';
import { useCurrentUser } from '@/hooks/use-current-user';

interface Organization {
  id: string;
  name: string;
  type: 'school' | 'church' | 'library' | 'general';
  subdomain: string;
  role: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
}

const mockOrganizations: Organization[] = [
  {
    id: 'school-1',
    name: 'Springfield High School',
    type: 'school',
    subdomain: 'springfield',
    role: 'ADMIN',
    status: 'ACTIVE'
  },
  {
    id: 'church-1',
    name: 'Grace Community Church',
    type: 'church',
    subdomain: 'gracechurch',
    role: 'MEMBER',
    status: 'ACTIVE'
  },
  {
    id: 'library-1',
    name: 'City Public Library',
    type: 'library',
    subdomain: 'citylibrary',
    role: 'MANAGER',
    status: 'ACTIVE'
  }
];

const getOrganizationIcon = (type: string) => {
  switch (type) {
    case 'school':
      return GraduationCap;
    case 'church':
      return Church;
    case 'library':
      return Library;
    default:
      return Building2;
  }
};

const getOrganizationColor = (type: string) => {
  switch (type) {
    case 'school':
      return 'text-blue-600 bg-blue-50';
    case 'church':
      return 'text-purple-600 bg-purple-50';
    case 'library':
      return 'text-green-600 bg-green-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export function OrganizationSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const user = useCurrentUser();
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from API
    setOrganizations(mockOrganizations);
    // Set first active organization as current
    const activeOrg = mockOrganizations.find(org => org.status === 'ACTIVE');
    setCurrentOrg(activeOrg || null);
  }, []);

  const handleOrganizationChange = (org: Organization) => {
    setCurrentOrg(org);
    // Update URL with organization context
    const newPath = pathname.replace(/\/org\/[^\/]*/, `/org/${org.id}`);
    router.push(newPath);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'OWNER':
      case 'ADMIN':
        return 'default';
      case 'MANAGER':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (!currentOrg) {
    return (
      <Button variant="outline" size="sm">
        <Building2 className="h-4 w-4 mr-2" />
        Select Organization
      </Button>
    );
  }

  const Icon = getOrganizationIcon(currentOrg.type);
  const colorClass = getOrganizationColor(currentOrg.type);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between min-w-[200px]">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded ${colorClass}`}>
              <Icon className="h-3 w-3" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium truncate max-w-[120px]">
                {currentOrg.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {currentOrg.type.charAt(0).toUpperCase() + currentOrg.type.slice(1)}
              </div>
            </div>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[280px]">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {organizations.map((org) => {
          const OrgIcon = getOrganizationIcon(org.type);
          const isCurrent = org.id === currentOrg.id;

          return (
            <DropdownMenuItem
              key={org.id}
              onClick={() => handleOrganizationChange(org)}
              className={`flex items-center gap-3 p-3 ${isCurrent ? 'bg-accent' : ''}`}
            >
              <div className={`p-1 rounded ${getOrganizationColor(org.type)}`}>
                <OrgIcon className="h-3 w-3" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {org.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {org.type.charAt(0).toUpperCase() + org.type.slice(1)}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant={getRoleBadgeVariant(org.role)} className="text-xs">
                  {org.role}
                </Badge>
                {isCurrent && (
                  <div className="w-2 h-2 bg-primary rounded-full" />
                )}
              </div>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push('/organizations')}>
          <Plus className="h-4 w-4 mr-2" />
          Join Organization
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push('/organizations/manage')}>
          <Settings className="h-4 w-4 mr-2" />
          Manage Organizations
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
