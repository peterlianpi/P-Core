import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EditButton({ memberId }: { memberId: number }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/members/${memberId}`);
  };

  return (
    <Button variant="outline" onClick={handleEdit}>
      Edit
    </Button>
  );
}
