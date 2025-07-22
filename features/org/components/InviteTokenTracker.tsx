"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const INVITE_TOKEN_KEY = "inviteToken";

export const InviteTokenTracker = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // Save token in localStorage for later use after login/register
      localStorage.setItem(INVITE_TOKEN_KEY, token);
    }
  }, [token]);

  return null; // This component renders nothing visible
};

// Helper to get and clear token after auth
export const getAndClearInviteToken = (): string | null => {
  const token = localStorage.getItem(INVITE_TOKEN_KEY);
  if (token) {
    localStorage.removeItem(INVITE_TOKEN_KEY);
    return token;
  }
  return null;
};
