"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useListVersions } from "@/features/system/version/api/use-list-versions";
import { ArrowRight, GitCompare, Calendar, Tag } from "lucide-react";
import { cn } from "@/lib/utils";

interface VersionComparisonProps {
  className?: string;
}

export const VersionComparison: React.FC<VersionComparisonProps> = ({
  className,
}) => {
  const { data, isLoading } = useListVersions();
  const versions = data?.versions ?? [];
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [baseVersion, setBaseVersion] = useState("");
  const [compareVersion, setCompareVersion] = useState("");

  const handleCompare = () => {
    const base = versions.find(v => v.id === baseVersion);
    const compare = versions.find(v => v.id === compareVersion);
    
    if (base && compare) {
      setComparisonResult({
        baseVersion: base,
        compareVersion: compare,
        changes: [
          "Updated dashboard layout",
          "Enhanced user profile settings",
          "Improved performance metrics"
        ],
        bugFixes: [
          "Fixed login redirect issue",
          "Resolved data export bug",
          "Corrected notification timing"
        ],
        features: [
          "Added dark mode support",
          "Implemented real-time notifications",
          "Enhanced search functionality"
        ]
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Base Version</label>
                <select
                  value={baseVersion}
                  onChange={(e) => setBaseVersion(e.target.value)}
                  className="w-full border rounded px-2 py-1 mt-1"
                >
                  <option value="">Select base version</option>
                  {versions.map(v => (
                    <option key={v.id} value={v.id}>
                      v{v.version} - {v.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Compare Version</label>
                <select
                  value={compareVersion}
                  onChange={(e) => setCompareVersion(e.target.value)}
                  className="w-full border rounded px-2 py-1 mt-1"
                >
                  <option value="">Select compare version</option>
                  {versions.map(v => (
                    <option key={v.id} value={v.id}>
                      v{v.version} - {v.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button 
              onClick={handleCompare} 
              disabled={isLoading || !baseVersion || !compareVersion || baseVersion === compareVersion}
            >
              <GitCompare className="w-4 h-4 mr-2" />
              Compare Versions
            </Button>
          </div>
        </CardContent>
      </Card>

      {comparisonResult && (
        <Card>
          <CardHeader>
            <CardTitle>Comparison Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
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
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
