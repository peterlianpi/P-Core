import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { INITIAL_IMPORT_RESULTS } from "@/components/import-data/import-helper/import-data";
import { UploadButton } from "@/components/import-data/upload-button";

export function StudentActions({
  onUpload,
  handleAddNew,
}: {
  onUpload?: (results: typeof INITIAL_IMPORT_RESULTS) => void;
  handleAddNew: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleAddNew}>
          <Button variant="secondary" className="w-full">
            Add
          </Button>
        </DropdownMenuItem>

        {onUpload && (
          <DropdownMenuItem>
            <UploadButton onUpload={onUpload} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
