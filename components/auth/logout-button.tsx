"use client";

import { logout } from "@/actions/auth/logout";
import { trackLogout } from "@/actions/auth/track-user-activities";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    trackLogout();
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
