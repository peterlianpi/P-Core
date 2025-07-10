// app/accept/page.tsx

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const AcceptPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (token) {
      // Store the token for later use after login/register
      localStorage.setItem("inviteToken", token);

      // Optional: toast message
      toast.info("You're being redirected to complete your invitation");

      // Redirect to register/login
      router.push("/auth/register");
    } else {
      toast.error("Invalid or missing invite token.");
      router.push("/");
    }
  }, [token, router]);

  return null; // Or show a loading spinner
};

export default AcceptPage;
