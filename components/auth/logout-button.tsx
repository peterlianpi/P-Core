"use client";

import { logout } from "@/actions/auth/logout";
import { trackLogout } from "@/actions/auth/track-system-activities";
import { useCurrentUser } from "@/hooks/use-current-user";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const user = useCurrentUser();
  const onClick = () => {
    trackLogout({ value: user?.email ?? "Unknown" });
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
