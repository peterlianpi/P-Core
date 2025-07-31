// Feature Registry System
// Enables/disables features dynamically and manages feature dependencies

import { OrganizationRole } from "@prisma/client";

export interface FeatureConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  dependencies?: string[];
  requiredRole?: OrganizationRole;
  category: "domain" | "system";
  version: string;
  component?: () => Promise<any>;
  routes?: string[];
}

export interface DomainFeatureConfig extends FeatureConfig {
  category: "domain";
  orgSpecific: boolean;
  integrations?: string[];
}

export interface SystemFeatureConfig extends FeatureConfig {
  category: "system";
  critical: boolean;
}

// Domain Features Registry
export const DOMAIN_FEATURES: Record<string, DomainFeatureConfig> = {
  "organization-management": {
    id: "organization-management",
    name: "Organization Management",
    description: "Core organization, team, and member management",
    enabled: true,
    category: "domain",
    orgSpecific: true,
    version: "1.0.0",
    requiredRole: "VIEWER",
    component: () => import("./organization-management"),
    routes: [
      "/organization",
      "/organization/manage-member",
      "/organization/invite",
      "/organization/settings",
      "/organization/roles"
    ],
  },

  "school-management": {
    id: "school-management",
    name: "School Management",
    description: "Student, course, and academic management system",
    enabled: true,
    dependencies: ["organization-management"],
    category: "domain",
    orgSpecific: true,
    version: "1.0.0",
    requiredRole: "EDITOR",
    component: () => import("./school-management"),
    routes: [
      "/school-management",
      "/school-management/overview",
      "/school-management/students",
      "/school-management/teachers",
      "/school-management/courses",
      "/school-management/courses/add",
      "/school-management/courses/[id]",
      "/school-management/schedule",
      "/school-management/schedule/add",
      "/school-management/schedule/[id]",
      "/school-management/lesson-books",
      "/school-management/lesson-books/add",
      "/school-management/lesson-books/[id]",
      "/school-management/transactions",
      "/school-management/enrollments",
      "/school-management/grades",
      "/school-management/attendance",
      "/school-management/reports"
    ],
    integrations: ["organization-management"],
  },


};

// System Features Registry
export const SYSTEM_FEATURES: Record<string, SystemFeatureConfig> = {
  "dashboard": {
    id: "dashboard",
    name: "Dashboard",
    description: "System dashboard and analytics",
    enabled: true,
    category: "system",
    critical: true,
    version: "1.0.0",
    requiredRole: "VIEWER",
    component: () => import("./system/dashboard"),
    routes: [
      "/dashboard",
      "/dashboard/stats",
      "/dashboard/analytics",
      "/dashboard/activity"
    ],
  },

  "site": {
    id: "site",
    name: "Site Configuration",
    description: "Site settings and configuration management",
    enabled: true,
    category: "system",
    critical: true,
    version: "1.0.0",
    requiredRole: "SUPER_ADMIN",
    component: () => import("./system/site"),
    routes: [
      "/settings",
      "/settings/profile",
      "/settings/account",
      "/settings/notifications",
      "/settings/site"
    ],
  },

  "dynamic-components": {
    id: "dynamic-components",
    name: "Dynamic Components",
    description: "Dynamic component loading system",
    enabled: true,
    category: "system",
    critical: false,
    version: "1.0.0",
    component: () => import("./system/dynamic-components"),
  },

  "feedback": {
    id: "feedback",
    name: "Feedback System",
    description: "User feedback and support system",
    enabled: true,
    category: "system",
    critical: false,
    version: "1.0.0",
    requiredRole: "VIEWER",
    component: () => import("./system/feedback"),
    routes: [
      "/feedback",
      "/feedback/submit",
      "/feedback/admin"
    ],
  },

  "image-upload": {
    id: "image-upload",
    name: "Image Upload",
    description: "Image upload and management utilities",
    enabled: true,
    category: "system",
    critical: false,
    version: "1.0.0",
    component: () => import("./system/image-upload"),
  },

  "version": {
    id: "version",
    name: "Version Management",
    description: "Application version and update management",
    enabled: true,
    category: "system",
    critical: true,
    version: "1.0.0",
    requiredRole: "SUPER_ADMIN",
    component: () => import("./system/version"),
    routes: [
      "/admin/version",
      "/superadmin",
      "/superadmin/users",
      "/superadmin/organizations",
      "/superadmin/system"
    ],
  },

  "authentication": {
    id: "authentication",
    name: "Authentication System",
    description: "User authentication and authorization",
    enabled: true,
    category: "system",
    critical: true,
    version: "1.0.0",
    routes: [
      "/auth/login",
      "/auth/register",
      "/auth/reset",
      "/auth/new-password",
      "/auth/new-verification",
      "/auth/error",
      "/auth/after-login",
      "/accept"
    ],
  },
};

// Combined registry
export const ALL_FEATURES = { ...DOMAIN_FEATURES, ...SYSTEM_FEATURES };

// Feature Registry Class
export class FeatureRegistry {
  private static instance: FeatureRegistry;
  private enabledFeatures: Set<string> = new Set();
  private loadedComponents: Map<string, any> = new Map();

  private constructor() {
    // Initialize with enabled features
    Object.entries(ALL_FEATURES).forEach(([id, config]) => {
      if (config.enabled) {
        this.enabledFeatures.add(id);
      }
    });
  }

  static getInstance(): FeatureRegistry {
    if (!FeatureRegistry.instance) {
      FeatureRegistry.instance = new FeatureRegistry();
    }
    return FeatureRegistry.instance;
  }

  // Check if feature is enabled
  isEnabled(featureId: string): boolean {
    return this.enabledFeatures.has(featureId);
  }

  // Enable a feature (with dependency check)
  async enableFeature(featureId: string): Promise<boolean> {
    const feature = ALL_FEATURES[featureId];
    if (!feature) return false;

    // Check dependencies
    if (feature.dependencies) {
      for (const dep of feature.dependencies) {
        if (!this.isEnabled(dep)) {
          console.warn(`Cannot enable ${featureId}: dependency ${dep} is not enabled`);
          return false;
        }
      }
    }

    this.enabledFeatures.add(featureId);
    return true;
  }

  // Disable a feature (with dependent check)
  disableFeature(featureId: string): boolean {
    const feature = ALL_FEATURES[featureId];
    if (!feature) return false;

    // Check if other features depend on this
    const dependents = Object.entries(ALL_FEATURES)
      .filter(([_, f]) => f.dependencies?.includes(featureId) && this.isEnabled(f.id))
      .map(([id]) => id);

    if (dependents.length > 0) {
      console.warn(`Cannot disable ${featureId}: features ${dependents.join(", ")} depend on it`);
      return false;
    }

    // Don't disable critical system features
    if (feature.category === "system" && (feature as SystemFeatureConfig).critical) {
      console.warn(`Cannot disable critical system feature: ${featureId}`);
      return false;
    }

    this.enabledFeatures.delete(featureId);
    this.loadedComponents.delete(featureId);
    return true;
  }

  // Load feature component dynamically
  async loadFeature(featureId: string): Promise<any> {
    if (!this.isEnabled(featureId)) {
      throw new Error(`Feature ${featureId} is not enabled`);
    }

    if (this.loadedComponents.has(featureId)) {
      return this.loadedComponents.get(featureId);
    }

    const feature = ALL_FEATURES[featureId];
    if (!feature.component) {
      throw new Error(`Feature ${featureId} has no component`);
    }

    try {
      const component = await feature.component();
      this.loadedComponents.set(featureId, component);
      return component;
    } catch (error) {
      console.error(`Failed to load feature ${featureId}:`, error);
      throw error;
    }
  }

  // Get enabled features by category
  getEnabledFeatures(category?: "domain" | "system"): FeatureConfig[] {
    return Object.values(ALL_FEATURES).filter(feature =>
      this.isEnabled(feature.id) &&
      (category ? feature.category === category : true)
    );
  }

  // Get feature config
  getFeature(featureId: string): FeatureConfig | undefined {
    return ALL_FEATURES[featureId];
  }

  // Get enabled routes
  getEnabledRoutes(): string[] {
    return Object.values(ALL_FEATURES)
      .filter(feature => this.isEnabled(feature.id) && feature.routes)
      .flatMap(feature => feature.routes || []);
  }

  // Check user permission for feature
  hasPermission(featureId: string, userRole: OrganizationRole): boolean {
    const feature = ALL_FEATURES[featureId];
    if (!feature || !this.isEnabled(featureId)) return false;

    if (!feature.requiredRole) return true;

    // Expanded role hierarchy for all current and future features
    const roleHierarchy: OrganizationRole[] = [
      "VIEWER",
      "STUDENT",
      "MEMBER",
      "CHOIR_MEMBER",
      "VOLUNTEER",
      "LIBRARY_ASSISTANT",
      "TEACHER",
      "CHOIR_LEADER",
      "LIBRARIAN",
      "OFFICE_STAFF",
      "ACCOUNTANT",
      "EDITOR",
      "MANAGER",
      "ADMIN",
      "OWNER",
      "PASTOR",
      "SUPPORT",
      "AUDITOR",
      "DEVOPS",
      "SYSTEM_MAINTAINER",
      "SUPER_ADMIN"
    ];
    const requiredIndex = roleHierarchy.indexOf(feature.requiredRole);
    const userIndex = roleHierarchy.indexOf(userRole);

    return userIndex >= requiredIndex;
  }

  // Get feature integrations
  getIntegrations(featureId: string): string[] {
    const feature = ALL_FEATURES[featureId] as DomainFeatureConfig;
    return feature.integrations || [];
  }
}

// Export singleton instance
export const featureRegistry = FeatureRegistry.getInstance();

// Utility functions
export const isFeatureEnabled = (featureId: string) => featureRegistry.isEnabled(featureId);
export const loadFeature = (featureId: string) => featureRegistry.loadFeature(featureId);
export const getEnabledFeatures = (category?: "domain" | "system") => featureRegistry.getEnabledFeatures(category);
export const hasFeaturePermission = (featureId: string, userRole: OrganizationRole) => featureRegistry.hasPermission(featureId, userRole);
