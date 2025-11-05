import React from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

type ErrorBoxProps = {
  error: Error | null;
};

function ErrorBox({ error }: ErrorBoxProps) {
  return (
    <div className="flex h-[85vh] items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Oops, something went wrong!</AlertTitle>
            <AlertDescription>
              {error?.message || "An unexpected error occurred."}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}

export default ErrorBox;
