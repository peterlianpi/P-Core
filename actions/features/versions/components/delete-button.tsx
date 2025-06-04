import { deleteVersion } from "../delete-version";

export default function DeleteVersionButton({ versionId }) {
  const handleDelete = async () => {
    const result = await deleteVersion(versionId);
    alert(result.success || result.error);
  };

  return <button onClick={handleDelete}>Delete Version</button>;
}
