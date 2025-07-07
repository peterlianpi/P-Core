"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InviteUserForm({ organizationId }: { organizationId: string }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const sendInvite = async () => {
    setSending(true);
    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, organizationId }),
      });
      if (!res.ok) throw new Error("Failed to send invite");
      alert("Invite sent!");
      setEmail("");
    } catch {
      alert("Error sending invite");
    }
    setSending(false);
  };

  return (
    <div className="max-w-md space-y-4">
      <Label htmlFor="email">User Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="user@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button onClick={sendInvite} disabled={sending || !email}>
        {sending ? "Sending..." : "Send Invite"}
      </Button>
    </div>
  );
}
