import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { VersionFormDynamic } from "../features/system/version/components/version-form-dynamic";
import { VersionComparison } from "../features/system/version/components/version-comparison-new";
import { useVersionFields } from "../features/system/version/hooks/use-version-fields";

// Mock the API hooks
vi.mock("../features/system/version/api/use-list-versions");

describe("Version Management System", () => {
  describe("VersionFormDynamic", () => {
    it("renders all form fields correctly", () => {
      const mockSubmit = vi.fn();
      render(<VersionFormDynamic onSubmit={mockSubmit} />);

      expect(screen.getByText("Version Number")).toBeInTheDocument();
      expect(screen.getByText("Release Name")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Release Date")).toBeInTheDocument();
      expect(screen.getByText("Status")).toBeInTheDocument();
      expect(screen.getByText("Created By")).toBeInTheDocument();
    });

    it("returns correct field configuration", () => {
      const fields = useVersionFields();
      
      expect(fields).toHaveLength(6);
      expect(fields[0]).toEqual({
        name: "version",
        label: "Version Number",
        type: "text",
        placeholder: "e.g., 2.1.0",
      });
    });
  });

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
    });
  });
});
