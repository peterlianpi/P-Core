import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EditButton({ vengId }: { vengId: number|string }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/vengs/${vengId}`);
  };

  return (
    <Button variant="outline" onClick={handleEdit}>
      Edit
    </Button>
  );
}
