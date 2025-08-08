// Feature Registry: Centralized feature metadata, enable/disable, and permission checks
// This module powers feature-based navigation and dynamic capability flags across the app.
// It is intentionally framework-agnostic and safe to import from both client and server modules.

import { OrganizationRole } from "@/shared/types/organization-role";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type FeatureCategory = "domain" | "system";

export interface FeatureConfig {
  id: string; // Unique feature id, used in URLs and guards
  name: string; // Human-friendly name for UI
  category: FeatureCategory; // Domain (business) or System (infra)
  enabled: boolean; // Toggle feature on/off
  description?: string; // Optional description for admin UI
  minRole?: OrganizationRole; // Minimum org role required to see/use the feature
  dependencies?: string[]; // Other features this feature depends on
}

// -----------------------------------------------------------------------------
// Role hierarchy for permission comparison
// Higher number = more privileges
// NOTE: Keep this in sync with your business rules and OrganizationRole enum.
// -----------------------------------------------------------------------------
const rolePriority: Record<OrganizationRole, number> = {
  [OrganizationRole.VIEWER]: 1,
  [OrganizationRole.STUDENT]: 1,
  [OrganizationRole.MEMBER]: 2,
  [OrganizationRole.CHOIR_MEMBER]: 2,
  [OrganizationRole.VOLUNTEER]: 2,
  [OrganizationRole.LIBRARY_ASSISTANT]: 2,
  [OrganizationRole.TEACHER]: 3,
  [OrganizationRole.CHOIR_LEADER]: 3,
  [OrganizationRole.LIBRARIAN]: 3,
  [OrganizationRole.OFFICE_STAFF]: 3,
  [OrganizationRole.ACCOUNTANT]: 3,
  [OrganizationRole.EDITOR]: 4,
  [OrganizationRole.MANAGER]: 5,
  [OrganizationRole.ADMIN]: 6,
  [OrganizationRole.OWNER]: 7,
  [OrganizationRole.PASTOR]: 6,
  [OrganizationRole.SUPPORT]: 6,
  [OrganizationRole.AUDITOR]: 6,
  [OrganizationRole.DEVOPS]: 6,
  [OrganizationRole.SYSTEM_MAINTAINER]: 6,
  [OrganizationRole.SUPER_ADMIN]: 8,
};

const hasMinRole = (required: OrganizationRole = OrganizationRole.MEMBER, current: OrganizationRole) => {
  return rolePriority[current] >= rolePriority[required];
};

// -----------------------------------------------------------------------------
// Default registry
// Tweak enabled and minRole defaults as needed. These drive the sidebar and guards.
// -----------------------------------------------------------------------------
const registry: FeatureConfig[] = [
  // Domain features
  {
    id: "organization-management",
    name: "Organization",
    category: "domain",
    enabled: true,
    minRole: OrganizationRole.MEMBER,
  },
  {
    id: "school-management",
    name: "School Management",
    category: "domain",
    enabled: false,
    minRole: OrganizationRole.MEMBER,
    dependencies: ["organization-management"],
  },
  {
    id: "church-management",
    name: "Church Management",
    category: "domain",
    enabled: false,
    minRole: OrganizationRole.MEMBER,
    dependencies: ["organization-management"],
  },
  {
    id: "library-management",
    name: "Library Management",
    category: "domain",
    enabled: false,
    minRole: OrganizationRole.MEMBER,
    dependencies: ["organization-management"],
  },

  // System features
  {
    id: "dashboard",
    name: "Dashboard",
    category: "system",
    enabled: true,
    minRole: OrganizationRole.MEMBER,
  },
  // {
  //   id: "site",
  //   name: "Site Settings",
  //   category: "system",
  //   enabled: true,
  //   minRole: OrganizationRole.ADMIN,
  // },
  {
    id: "version",
    name: "Version Management",
    category: "system",
    enabled: true,
    minRole: OrganizationRole.ADMIN,
  },
  // {
  //   id: "dynamic-components",
  //   name: "Dynamic Components",
  //   category: "system",
  //   enabled: true,
  //   minRole: OrganizationRole.ADMIN,
  // },
  {
    id: "feedback",
    name: "Feedback",
    category: "system",
    enabled: true,
    minRole: OrganizationRole.MEMBER,
  },
  // {
  //   id: "image-upload",
  //   name: "Image Upload",
  //   category: "system",
  //   enabled: true,
  //   minRole: OrganizationRole.EDITOR,
  // },
];

// Internal map for faster lookups
const byId = new Map<string, FeatureConfig>(registry.map((f) => [f.id, { ...f }]));

// -----------------------------------------------------------------------------
// Public API
// -----------------------------------------------------------------------------

export function getAllFeatures(): FeatureConfig[] {
  return Array.from(byId.values());
}

export function getFeatureById(id: string): FeatureConfig | undefined {
  return byId.get(id);
}

export function isFeatureEnabled(id: string): boolean {
  const f = byId.get(id);
  return !!f?.enabled;
}

export function hasFeaturePermission(id: string, orgRole: OrganizationRole): boolean {
  const f = byId.get(id);
  if (!f) return false; // Unknown feature: no access
  if (!f.enabled) return false; // Disabled feature: no access
  return hasMinRole(f.minRole, orgRole);
}

export function getEnabledFeatures(): FeatureConfig[] {
  return getAllFeatures().filter((f) => f.enabled);
}

export function enableFeature(id: string): void {
  const f = byId.get(id);
  if (f) {
    f.enabled = true;
    byId.set(id, f);
  }
}

export function disableFeature(id: string): void {
  const f = byId.get(id);
  if (f) {
    f.enabled = false;
    byId.set(id, f);
  }
}

export function registerFeature(config: FeatureConfig): void {
  if (byId.has(config.id)) return;
  byId.set(config.id, { ...config });
}

// Convenience export compatible with existing imports
export const featureRegistry = {
  getAll: getAllFeatures,
  getEnabled: getEnabledFeatures,
  getById: getFeatureById,
  isEnabled: isFeatureEnabled,
  hasPermission: hasFeaturePermission,
  enable: enableFeature,
  disable: disableFeature,
  register: registerFeature,
};

// End of feature-registry
