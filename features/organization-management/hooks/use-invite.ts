"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useGetInviteDetailsByToken } from "../api/use-get-invite-details-by-token";

export const useInvite = () => {
    const searchParams = useSearchParams();
    const tokenFromUrl = searchParams.get("token");

    const [token, setToken] = useState<string>("");
    const [isHydrated, setIsHydrated] = useState(false); // ✅ new state

    // ✅ Step 1: Load token
    useEffect(() => {
        if (tokenFromUrl) {
            localStorage.setItem("inviteToken", tokenFromUrl);
            setToken(tokenFromUrl);
        } else {
            const savedToken = localStorage.getItem("inviteToken");
            if (savedToken) {
                setToken(savedToken);
            }
        }
        setIsHydrated(true); // ✅ Only set true after loading localStorage
    }, [tokenFromUrl]);

    // ✅ Step 2: Fetch invite
    const {
        data: invite,
        isLoading,
        isError,
    } = useGetInviteDetailsByToken(token ?? "");

    // ✅ Step 3: Handle invalid or expired token
    useEffect(() => {
        if (!token || isLoading) return;

        if (invite) {
            const now = new Date();
            const expiresAt = new Date(invite.expiresAt);
            if (expiresAt < now) {
                toast.error("This invite has expired.");
                localStorage.removeItem("inviteToken");
                setToken("");
            }
        }

        if (isError) {
            toast.error("Invalid invite token.");
            localStorage.removeItem("inviteToken");
            setToken("");
        }
    }, [invite, isError, isLoading, token]);

    return {
        token,
        invite,
        isLoading,
        isError,
        isHydrated, // ✅ return hydration flag
    };
};
