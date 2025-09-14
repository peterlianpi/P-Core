import { FieldConfig } from "@/features/system/dynamic-components/types/field-config";

export const useVersionFields = (): FieldConfig[] => {
  const versionFields: FieldConfig[] = [
    {
      name: "version",
      label: "Version Number",
      type: "text",
      placeholder: "e.g., 2.1.0"
    },
    {
      name: "name",
      label: "Release Name",
      type: "text",
      placeholder: "e.g., Enhanced Analytics Release"
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Brief description of the release..."
    },
    {
      name: "releaseDate",
      label: "Release Date",
      type: "date"
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Development", value: "DEVELOPMENT" },
        { label: "Testing", value: "TESTING" },
        { label: "Staging", value: "STAGING" },
        { label: "Production", value: "PRODUCTION" },
        { label: "Deprecated", value: "DEPRECATED" }
      ]
    },
    {
      name: "createdBy",
      label: "Created By",
      type: "text"
    }
  ];

  return versionFields;
};

export const useVersionComparisonFields = (): FieldConfig[] => {
  const comparisonFields: FieldConfig[] = [
    {
      name: "baseVersion",
      label: "Base Version",
      type: "select",
      placeholder: "Select base version"
    },
    {
      name: "compareVersion",
      label: "Compare Version",
      type: "select",
      placeholder: "Select version to compare"
    },
    {
      name: "includeChanges",
      label: "Include Changes",
      type: "checkbox"
    },
    {
      name: "includeBugFixes",
      label: "Include Bug Fixes",
      type: "checkbox"
    },
    {
      name: "includeFeatures",
      label: "Include New Features",
      type: "checkbox"
    }
  ];

  return comparisonFields;
};

export const useVersionFilterFields = (): FieldConfig[] => {
  const filterFields: FieldConfig[] = [
    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "All Statuses",
      options: [
        { label: "All Statuses", value: "" },
        { label: "Development", value: "DEVELOPMENT" },
        { label: "Testing", value: "TESTING" },
        { label: "Staging", value: "STAGING" },
        { label: "Production", value: "PRODUCTION" },
        { label: "Deprecated", value: "DEPRECATED" }
      ]
    },
    {
      name: "dateRange",
      label: "Date Range",
      type: "date"
    },
    {
      name: "search",
      label: "Search",
      type: "text",
      placeholder: "Search by version or name..."
    }
  ];

  return filterFields;
};
