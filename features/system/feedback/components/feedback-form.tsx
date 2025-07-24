"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useCreateFeedback } from "../api/use-create-feedback";

export default function FeedbackForm() {
  const createFeedback = useCreateFeedback();
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Form validation function
  const validateForm = () => {
    if (!feedback.trim()) {
      toast.error("Feedback cannot be empty.");
      return false;
    }

    if (!anonymous && email && !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }

    setEmailError(""); // Reset email error if valid
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await createFeedback.mutateAsync({
        name,
        email,
        phone,
        message: feedback,
        anonymous,
      });
      toast.success("Feedback submitted successfully!");
      setFeedback("");
      setName("");
      setEmail("");
      setPhone("");
      setAnonymous(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to submit feedback.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Give Feedback</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md space-y-4">
        <h2 className="text-lg font-semibold">Submit Your Feedback</h2>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={anonymous}
            onCheckedChange={(checked) => setAnonymous(!!checked)}
          />
          <Label htmlFor="anonymous">Submit Anonymously</Label>
        </div>

        {!anonymous && (
          <>
            <div>
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label>Email (Optional)</Label>
              <Input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>

            <div>
              <Label>Phone (Optional)</Label>
              <Input
                type="tel"
                placeholder="Enter your phone number..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        )}

        <div>
          <Label>Feedback</Label>
          <Textarea
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading || !feedback.trim()}
          className="w-full"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
