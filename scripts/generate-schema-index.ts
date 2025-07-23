// generate-schema-index.ts
import fs from "fs";
import path from "path";

const targetDir = path.join(__dirname, "schemas"); // Adjust if needed
const indexPath = path.join(targetDir, "index.ts");

const files = fs
  .readdirSync(targetDir)
  .filter((file) => file.endsWith(".ts") && file !== "index.ts");

const exports: string[] = [];

for (const file of files) {
  const baseName = file.replace(/\.ts$/, "");
  exports.push(`export * from "./${baseName}";`);
}

const content = `// 🔄 Auto-generated on ${new Date().toLocaleString()}
${exports.join("\n")}\n`;

fs.writeFileSync(indexPath, content);

console.log(`✅ Generated index.ts with ${files.length} exports in /schemas`);
