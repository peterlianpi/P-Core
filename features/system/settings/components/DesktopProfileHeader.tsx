import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export type BadgeVariant = "default" | "destructive" | "outline" | "secondary" | "success" | null | undefined;

interface DesktopProfileHeaderProps {
  user: {
    image?: string;
    name?: string;
    email?: string;
    role?: string;
  };
  getRoleBadgeVariant: (role?: string) => BadgeVariant;
  renderAvatar?: () => React.ReactNode;
}

/**
 * DesktopProfileHeader - reusable desktop profile header for settings pages.
 * Shows avatar (customizable), name, email, and role badge.
 */
export function DesktopProfileHeader({ user, getRoleBadgeVariant, renderAvatar }: DesktopProfileHeaderProps) {
  const initials = user.name?.split(" ").map((n) => n[0]).join("") || "U";
  return (
    <Card className="hidden md:block mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            {renderAvatar ? (
              renderAvatar()
            ) : (
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
            )}
            
          </div>
          <div className="text-center sm:text-left space-y-2">
            <h1 className="text-2xl font-bold">{user.name || "User"}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <Badge variant={getRoleBadgeVariant(user.role)}>{user.role || "USER"}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
