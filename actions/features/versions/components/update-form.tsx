import { useState } from "react";
import { updateVersion } from "@/features/version/actions/updateVersion";
import { getVersionById } from "@/features/version/actions/getVersion";

export default function UpdateVersionForm({ versionId }) {
  const [version, setVersion] = useState(null);

  // Fetch version data from server
  useEffect(() => {
    async function fetchVersion() {
      const fetchedVersion = await getVersionById(versionId);
      setVersion(fetchedVersion);
    }

    fetchVersion();
  }, [versionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = {
      version: formData.get("version"),
      name: formData.get("name"),
      description: formData.get("description"),
      status: formData.get("status"),
    };
    const result = await updateVersion(versionId, values);
    alert(result.success || result.error);
  };

  if (!version) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="version" defaultValue={version.version} required />
      <input name="name" defaultValue={version.name} required />
      <textarea name="description" defaultValue={version.description || ""} />
      <select name="status" defaultValue={version.status}>
        <option value="beta">Beta</option>
        <option value="stable">Stable</option>
      </select>
      <button type="submit">Update Version</button>
    </form>
  );
}
