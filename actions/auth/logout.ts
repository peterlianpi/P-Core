"use server";

import { signOut } from "@/lib/auth/auth";
import { trackLogout } from "./track-system-activities";
import { currentUser } from "@/lib/auth";

export const logout = async () => {
  try {
    // Get current user before signing out
    const user = await currentUser();

    // Track logout activity before signing out
    if (user?.email) {
      await trackLogout({ value: user.email });
    }

    // Sign out using NextAuth
    await signOut({ redirect: false });

    return { success: "Logged out successfully" };
  } catch (error) {
    console.error("Logout error:", error);
    return { error: "Failed to logout" };
  }
};
