import { describe, it, expect } from "vitest";
import { useVersionFields } from "../features/system/version/hooks/use-version-fields";

describe("Version Management System", () => {
  describe("useVersionFields", () => {
    it("returns correct field configuration", () => {
      const fields = useVersionFields();
      
      expect(fields).toHaveLength(6);
      expect(fields[0]).toEqual({
        name: "version",
        label: "Version Number",
        type: "text",
        placeholder: "e.g., 2.1.0",
      });
      
      expect(fields[1]).toEqual({
        name: "name",
        label: "Release Name",
        type: "text",
        placeholder: "e.g., Enhanced Analytics Release",
      });
      
      expect(fields[2]).toEqual({
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Brief description of the release...",
      });
      
      expect(fields[3]).toEqual({
        name: "releaseDate",
        label: "Release Date",
        type: "date",
      });
      
      expect(fields[4]).toEqual({
        name: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "Development", value: "DEVELOPMENT" },
          { label: "Testing", value: "TESTING" },
          { label: "Staging", value: "STAGING" },
          { label: "Production", value: "PRODUCTION" },
          { label: "Deprecated", value: "DEPRECATED" },
        ],
      });
      
      expect(fields[5]).toEqual({
        name: "createdBy",
        label: "Created By",
        type: "text",
      });
    });
  });

  describe("Field Configuration Validation", () => {
    it("has all required fields", () => {
      const fields = useVersionFields();
      const fieldNames = fields.map(f => f.name);
      
      expect(fieldNames).toContain("version");
      expect(fieldNames).toContain("name");
      expect(fieldNames).toContain("description");
      expect(fieldNames).toContain("releaseDate");
      expect(fieldNames).toContain("status");
      expect(fieldNames).toContain("createdBy");
    });

    it("has correct field types", () => {
      const fields = useVersionFields();
      
      expect(fields.find(f => f.name === "version")?.type).toBe("text");
      expect(fields.find(f => f.name === "name")?.type).toBe("text");
      expect(fields.find(f => f.name === "description")?.type).toBe("textarea");
      expect(fields.find(f => f.name === "releaseDate")?.type).toBe("date");
      expect(fields.find(f => f.name === "status")?.type).toBe("select");
      expect(fields.find(f => f.name === "createdBy")?.type).toBe("text");
    });
  });
});
