import { Loader2 } from "lucide-react"; // Already in your project

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-10">
    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
    <span className="ml-2">Loading...</span>
  </div>
);
