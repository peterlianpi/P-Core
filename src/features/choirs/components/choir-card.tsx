// Enhanced Choir Card Component
// Displays choir information with member tracking and performance statistics
// Integrates with the new unified architecture

'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Music, 
  Users, 
  Calendar,
  Mic,
  MoreHorizontal,
  Clock,
  MapPin,
  Star
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface ChoirCardProps {
  choir: {
    id: string;
    name: string;
    description?: string | null;
    director?: string | null;
    isActive: boolean;
    createdAt: string;
    members?: Array<{
      id: string;
      voice?: string | null;
      status: string;
      member: {
        id: string;
        name: string;
        image?: string | null;
      };
    }>;
    songs?: Array<{
      id: string;
      status: string;
      song: {
        id: string;
        title: string;
        artist?: string | null;
      };
    }>;
    events?: Array<{
      id: string;
      title: string;
      eventDate: string;
      location?: string | null;
    }>;
  };
  onEdit?: (choir: any) => void;
  onDelete?: (choirId: string) => void;
  onViewDetails?: (choirId: string) => void;
  onManageMembers?: (choirId: string) => void;
  onManageSongs?: (choirId: string) => void;
  className?: string;
}

export function ChoirCard({ 
  choir, 
  onEdit, 
  onDelete, 
  onViewDetails,
  onManageMembers,
  onManageSongs,
  className 
}: ChoirCardProps) {
  const activeMembers = choir.members?.filter(m => m.status === "ACTIVE") || [];
  const totalSongs = choir.songs?.length || 0;
  const readySongs = choir.songs?.filter(s => s.status === "READY" || s.status === "PERFORMED").length || 0;
  const upcomingEvents = choir.events?.filter(e => new Date(e.eventDate) > new Date()).length || 0;

  // Voice part distribution
  const voiceStats = activeMembers.reduce((acc, member) => {
    if (member.voice) {
      const voice = member.voice.toLowerCase();
      if (voice.includes('soprano')) acc.soprano++;
      else if (voice.includes('alto')) acc.alto++;
      else if (voice.includes('tenor')) acc.tenor++;
      else if (voice.includes('bass')) acc.bass++;
    }
    return acc;
  }, { soprano: 0, alto: 0, tenor: 0, bass: 0 });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getNextEvent = () => {
    if (!choir.events || choir.events.length === 0) return null;
    
    const upcoming = choir.events
      .filter(e => new Date(e.eventDate) > new Date())
      .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    
    return upcoming[0] || null;
  };

  const nextEvent = getNextEvent();

  return (
    <Card className={cn(
      "group hover:shadow-md transition-all duration-200",
      !choir.isActive && "opacity-60 bg-muted/30",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Music className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg leading-tight truncate">
                {choir.name}
              </CardTitle>
              {!choir.isActive && (
                <Badge variant="secondary" className="text-xs">
                  Inactive
                </Badge>
              )}
            </div>
            
            {choir.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {choir.description}
              </p>
            )}

            {choir.director && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                <Mic className="h-3 w-3" />
                <span>Director: {choir.director}</span>
              </div>
            )}
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
              <DropdownMenuItem onClick={() => onViewDetails?.(choir.id)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onManageMembers?.(choir.id)}>
                Manage Members
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onManageSongs?.(choir.id)}>
                Manage Songs
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit?.(choir)}>
                Edit Choir
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(choir.id)}
                className="text-destructive"
              >
                Delete Choir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">
              {activeMembers.length}
            </div>
            <div className="text-xs text-muted-foreground">Members</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-600">
              {totalSongs}
            </div>
            <div className="text-xs text-muted-foreground">Songs</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-600">
              {upcomingEvents}
            </div>
            <div className="text-xs text-muted-foreground">Events</div>
          </div>
        </div>

        {/* Voice Parts Distribution */}
        {activeMembers.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Voice Parts</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Soprano</span>
                <span className="font-medium">{voiceStats.soprano}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Alto</span>
                <span className="font-medium">{voiceStats.alto}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tenor</span>
                <span className="font-medium">{voiceStats.tenor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bass</span>
                <span className="font-medium">{voiceStats.bass}</span>
              </div>
            </div>
          </div>
        )}

        {/* Song Progress */}
        {totalSongs > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Repertoire Progress</span>
              <span className="font-medium">{readySongs}/{totalSongs}</span>
            </div>
            <Progress 
              value={(readySongs / totalSongs) * 100} 
              className="h-2"
            />
          </div>
        )}

        {/* Member Avatars */}
        {activeMembers.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Members</span>
              {activeMembers.length > 4 && (
                <span className="text-xs text-muted-foreground">
                  +{activeMembers.length - 4} more
                </span>
              )}
            </div>
            <div className="flex -space-x-2">
              {activeMembers.slice(0, 4).map((choirMember) => (
                <Avatar key={choirMember.id} className="h-8 w-8 border-2 border-background">
                  <AvatarImage 
                    src={choirMember.member.image || undefined} 
                    alt={choirMember.member.name} 
                  />
                  <AvatarFallback className="text-xs">
                    {choirMember.member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ))}
              {activeMembers.length > 4 && (
                <div className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    +{activeMembers.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Next Event */}
        {nextEvent && (
          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Next Event</span>
            </div>
            <div className="space-y-1">
              <div className="font-medium text-sm">{nextEvent.title}</div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(nextEvent.eventDate)}</span>
                </div>
                {nextEvent.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{nextEvent.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onManageMembers?.(choir.id)}
          >
            <Users className="h-4 w-4 mr-1" />
            Members
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onManageSongs?.(choir.id)}
          >
            <Music className="h-4 w-4 mr-1" />
            Songs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Choir list component for displaying multiple cards
interface ChoirListProps {
  choirs: Array<any>;
  onEdit?: (choir: any) => void;
  onDelete?: (choirId: string) => void;
  onViewDetails?: (choirId: string) => void;
  onManageMembers?: (choirId: string) => void;
  onManageSongs?: (choirId: string) => void;
  isLoading?: boolean;
  className?: string;
}

export function ChoirList({ 
  choirs, 
  onEdit, 
  onDelete, 
  onViewDetails,
  onManageMembers,
  onManageSongs,
  isLoading = false,
  className 
}: ChoirListProps) {
  if (isLoading) {
    return (
      <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="space-y-2">
                <div className="h-5 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-12 bg-muted rounded" />
                  <div className="h-12 bg-muted rounded" />
                  <div className="h-12 bg-muted rounded" />
                </div>
                <div className="h-8 bg-muted rounded" />
                <div className="flex gap-2">
                  <div className="h-8 bg-muted rounded flex-1" />
                  <div className="h-8 bg-muted rounded flex-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (choirs.length === 0) {
    return (
      <div className="text-center py-12">
        <Music className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">No choirs found</h3>
        <p className="text-muted-foreground">
          No choirs match your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {choirs.map((choir) => (
        <ChoirCard
          key={choir.id}
          choir={choir}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewDetails={onViewDetails}
          onManageMembers={onManageMembers}
          onManageSongs={onManageSongs}
        />
      ))}
    </div>
  );
}
