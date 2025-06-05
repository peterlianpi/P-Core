import { deleteVersion } from "../delete-version";

export default function DeleteVersionButton({
  versionId,
}: {
  versionId: string;
}) {
  const handleDelete = async () => {
    const result = await deleteVersion({ id: versionId });
    alert(result.success || result.error);
  };

  return <button onClick={handleDelete}>Delete Version</button>;
}
