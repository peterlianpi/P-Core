import React from "react";
import { AlertTriangle } from "lucide-react"; // Import the error icon

type ErrorBoxProps = {
  error: Error | null;
};

function ErrorBox({ error }: ErrorBoxProps) {
  return (
    <div className="flex h-[85vh] items-center justify-center">
      <div className="bg-red-100 border-l-4 border-red-500 p-6 w-full max-w-lg rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <AlertTriangle className="h-8 w-8 text-red-500" /> {/* Lucide Icon */}
          <div>
            <h2 className="text-2xl font-semibold text-red-700">
              Oops, something went wrong!
            </h2>
            <p className="mt-2 text-lg text-red-600">
              {error?.message || "An unexpected error occurred."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorBox;
