// app/versions/page.tsx (Server Component)
import { getAllVersions } from "../get-version";

export default async function VersionListPage() {
  const result = await getAllVersions();

  if ("error" in result) {
    return <div>Error: {result.error}</div>;
  }

  return (
    <div>
      <h2>Versions List</h2>
      <ul>
        {result.data.map((version) => (
          <li key={version.id}>
            {version.status} - {version.version}
          </li>
        ))}
      </ul>
    </div>
  );
}
