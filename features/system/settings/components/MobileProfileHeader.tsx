import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type BadgeVariant = "default" | "destructive" | "outline" | "secondary" | "success" | null | undefined;

interface MobileProfileHeaderProps {
  user: {
    image?: string;
    name?: string;
    role?: string;
  };
  currentTab: { label: string } | undefined;
  getRoleBadgeVariant: (role?: string) => BadgeVariant;
  renderAvatar?: () => React.ReactNode;
}

/**
 * MobileProfileHeader - reusable mobile profile header for settings pages.
 * Shows avatar (customizable), name, current tab, and role badge.
 */
export function MobileProfileHeader({ user, currentTab, getRoleBadgeVariant, renderAvatar }: MobileProfileHeaderProps) {
  const initials = user.name?.split(" ").map((n) => n[0]).join("") || "U";
  return (
    <div className="md:hidden bg-background border-b sticky top-0 z-40">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {renderAvatar ? (
            renderAvatar()
          ) : (
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-sm">{initials}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <h1 className="font-semibold text-sm">{user.name || "User"}</h1>
            <p className="text-xs text-muted-foreground">{currentTab?.label}</p>
          </div>
        </div>
        <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
          {user.role || "USER"}
        </Badge>
      </div>
    </div>
  );
}
