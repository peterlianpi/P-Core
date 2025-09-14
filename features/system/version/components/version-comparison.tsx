"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useListVersions } from "@/features/system/version/api/use-list-versions";
import { useVersionComparisonFields } from "@/features/system/version/hooks/use-version-fields";
import { DynamicForm } from "@/features/system/dynamic-components/components/dynamic-form";
import { useForm } from "react-hook-form";
import { ArrowRight, GitCompare, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface VersionComparisonData {
  baseVersion: string;
  compareVersion: string;
  includeChanges: boolean;
  includeBugFixes: boolean;
  includeFeatures: boolean;
}

interface VersionComparisonProps {
  className?: string;
}

export const VersionComparison: React.FC<VersionComparisonProps> = ({
  className,
}) => {
  const { data, isLoading } = useListVersions();
  const versions = data?.versions ?? [];
  const comparisonFields = useVersionComparisonFields();
  const [comparisonResult, setComparisonResult] = useState<any>(null);

  const form = useForm<VersionComparisonData>({
    defaultValues: {
      baseVersion: "",
      compareVersion: "",
      includeChanges: true,
      includeBugFixes: true,
      includeFeatures: true,
    },
  });

  // Update select options with actual versions
  const updatedFields = comparisonFields.map(field => {
    if (field.name === "baseVersion" || field.name === "compareVersion") {
      return {
        ...field,
        options: versions.map(v => ({
          label: `v${v.version} - ${v.name}`,
          value: v.id
        }))
      };
    }
    return field;
  });

  const handleCompare = (data: VersionComparisonData) => {
    // Mock comparison logic - in real implementation, this would call an API
    const baseVersion = versions.find(v => v.id === data.baseVersion);
    const compareVersion = versions.find(v => v.id === data.compareVersion);
    
    if (baseVersion && compareVersion) {
      setComparisonResult({
        baseVersion,
        compareVersion,
        changes: data.includeChanges ? [
          "Updated dashboard layout",
          "Enhanced user profile settings",
          "Improved performance metrics"
        ] : [],
        bugFixes: data.includeBugFixes ? [
          "Fixed login redirect issue",
          "Resolved data export bug",
          "Corrected notification timing"
        ] : [],
        features: data.includeFeatures ? [
          "Added dark mode support",
          "Implemented real-time notifications",
          "Enhanced search functionality"
        ] : []
      });
    }
  };

  const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GitCompare className="w-5 h-5 mr-2" />
            Compare Versions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DynamicForm
            fields={updatedFields}
            form={form}
            onSubmit={handleCompare}
            className="space-y-4"
          >
            <Button type="submit" disabled={isLoading || versions.length < 2}>
              <GitCompare className="w-4 h-4 mr-2" />
              Compare Versions
            </Button>
          </DynamicForm>
        </CardContent>
      </Card>

      {comparisonResult && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Version Headers */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">Base Version</span>
                  </div>
                  <Badge variant="secondary">v{comparisonResult.baseVersion.version}</Badge>
                  <p className="text-sm font-medium mt-1">{comparisonResult.baseVersion.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {formatDate(comparisonResult.baseVersion.releaseDate)}
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">Compare Version</span>
                  </div>
                  <Badge variant="secondary">v{comparisonResult.compareVersion.version}</Badge>
                  <p className="text-sm font-medium mt-1">{comparisonResult.compareVersion.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {formatDate(comparisonResult.compareVersion.releaseDate)}
                  </p>
                </div>
              </div>

              {/* Changes */}
              {comparisonResult.changes.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Changes</h4>
                  <ul className="space-y-1">
                    {comparisonResult.changes.map((change: string, index: number) => (
                      <li key={index} className="text-sm flex items-start">
                        <ArrowRight className="w-3 h-3 mr-2 mt-0.5 text-muted-foreground" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bug Fixes */}
              {comparisonResult.bugFixes.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Bug Fixes</h4>
                  <ul className="space-y-1">
                    {comparisonResult.bugFixes.map((fix: string, index: number) => (
                      <li key={index} className="text-sm flex items-start">
                        <ArrowRight className="w-3 h-3 mr-2 mt-0.5 text-muted-foreground" />
                        {fix}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              {comparisonResult.features.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">New Features</h4>
                  <ul className="space-y-1">
                    {comparisonResult.features.map((feature: string, index: number) => (
                      <li key={index} className="text-sm flex items-start">
                        <ArrowRight className="w-3 h-3 mr-2 mt-0.5 text-muted-foreground" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
