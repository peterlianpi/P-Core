// hooks/useInvite.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useGetInviteDetailsByToken } from "@/features/org/api/invite-client";

export const useInvite = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const tokenFromUrl = searchParams.get("token");

    const [token, setToken] = useState<string>("");

    // Save token from URL or load from localStorage once
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
    }, [tokenFromUrl]);

    // Fetch invite using token from state/localStorage
    const {
        data: invite,
        isLoading,
        isError,
    } = useGetInviteDetailsByToken(token ?? "");

    // Handle invalid/expired token
    useEffect(() => {
        if (!token || isLoading) return;

        if (invite) {
            const now = new Date();
            const expiresAt = new Date(invite.expiresAt);
            if (expiresAt < now) {
                toast.error("This invite has expired.");
                localStorage.removeItem("inviteToken");
                setToken("");
                // Optionally navigate away here
            }
        }

        if (isError) {
            toast.error("Invalid invite token.");
            localStorage.removeItem("inviteToken");
            setToken('');
            // Optionally navigate away here
        }
    }, [invite, isError, isLoading, token, router]);

    return {
        token,
        invite,
        isLoading,
        isError,
    };
};

