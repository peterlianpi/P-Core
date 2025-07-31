"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Tag,
  CheckCircle,
  AlertCircle,
  History,
  Upload,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

// Sample data - replace with actual API calls
const generateVersionData = () => [
  {
    id: "1",
    version: "2.1.0",
    name: "Enhanced Analytics Release",
    description: "Major update with new analytics dashboard, improved performance monitoring, and enhanced reporting capabilities.",
    releaseDate: new Date("2024-01-15"),
    isActive: true,
    changelog: `
### New Features
- Advanced analytics dashboard with real-time data
- Performance monitoring and alerting system
- Enhanced reporting with custom filters
- New chart types and visualizations

### Improvements
- 40% faster page load times
- Improved mobile responsiveness
- Better error handling and user feedback

### Bug Fixes
- Fixed issue with data export functionality
- Resolved authentication timeout problems
- Corrected chart rendering on mobile devices
    `,
    createdAt: new Date("2024-01-10"),
    createdBy: "Super Admin",
  },
  {
    id: "2", 
    version: "2.0.5",
    name: "Security & Performance Update",
    description: "Critical security patches and performance optimizations for better system stability.",
    releaseDate: new Date("2023-12-20"),
    isActive: false,
    changelog: `
### Security
- Updated authentication mechanisms
- Enhanced data encryption
- Fixed XSS vulnerabilities

### Performance
- Database query optimizations
- Reduced memory usage by 25%
- Improved caching strategies
    `,
    createdAt: new Date("2023-12-15"),
    createdBy: "Super Admin",
  },
  {
    id: "3",
    version: "2.0.0",
    name: "Major Platform Overhaul",
    description: "Complete system redesign with modern UI, improved architecture, and new feature set.",
    releaseDate: new Date("2023-11-01"),
    isActive: false,
    changelog: `
### Breaking Changes
- New API endpoints (v2)
- Updated database schema
- Changed authentication flow

### New Features
- Modern React-based UI
- Real-time notifications
- Advanced user management
- Multi-tenant support

### Migration Notes
- Automatic database migration required
- User data will be preserved
- Legacy API endpoints deprecated
    `,
    createdAt: new Date("2023-10-25"),
    createdBy: "Super Admin",
  },
];

interface VersionFormData {
  version: string;
  name: string;
  description: string;
  releaseDate: string;
  isActive: boolean;
  changelog: string;
}

interface VersionManagementProps {
  className?: string;
  userRole?: "SUPERADMIN" | "ADMIN" | "USER";
}

export const VersionManagement: React.FC<VersionManagementProps> = ({
  className,
  userRole = "USER",
}) => {
  const [versions] = useState(generateVersionData());
  const [selectedVersion, setSelectedVersion] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<VersionFormData>({
    version: "",
    name: "",
    description: "",
    releaseDate: "",
    isActive: false,
    changelog: "",
  });

  const canManageVersions = userRole === "SUPERADMIN";

  const handleCreate = () => {
    console.log("Creating version:", formData);
    setIsCreateModalOpen(false);
    resetForm();
  };

  const handleEdit = (version: any) => {
    setSelectedVersion(version);
    setFormData({
      version: version.version,
      name: version.name,
      description: version.description,
      releaseDate: version.releaseDate.toISOString().split('T')[0],
      isActive: version.isActive,
      changelog: version.changelog,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    console.log("Updating version:", selectedVersion.id, formData);
    setIsEditModalOpen(false);
    resetForm();
  };

  const handleDelete = (versionId: string) => {
    console.log("Deleting version:", versionId);
  };

  const resetForm = () => {
    setFormData({
      version: "",
      name: "",
      description: "",
      releaseDate: "",
      isActive: false,
      changelog: "",
    });
    setSelectedVersion(null);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const VersionForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="version">Version Number</Label>
          <Input
            id="version"
            placeholder="e.g., 2.1.0"
            value={formData.version}
            onChange={(e) => setFormData({...formData, version: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="releaseDate">Release Date</Label>
          <Input
            id="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={(e) => setFormData({...formData, releaseDate: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Release Name</Label>
        <Input
          id="name"
          placeholder="e.g., Enhanced Analytics Release"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the release..."
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="changelog">Changelog</Label>
        <Textarea
          id="changelog"
          placeholder="Detailed changelog in Markdown format..."
          value={formData.changelog}
          onChange={(e) => setFormData({...formData, changelog: e.target.value})}
          rows={6}
          className="font-mono text-sm"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
        />
        <Label htmlFor="isActive">Set as Active Version</Label>
      </div>
    </div>
  );

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Version Management</h1>
          <p className="text-muted-foreground">
            Manage system versions, releases, and changelogs
          </p>
        </div>
        {canManageVersions && (
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Version
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Version</DialogTitle>
                <DialogDescription>
                  Add a new system version with release notes and changelog.
                </DialogDescription>
              </DialogHeader>
              <VersionForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate}>
                  <Upload className="w-4 h-4 mr-2" />
                  Create Version
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Current Version Card */}
      {versions.find(v => v.isActive) && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <CardTitle className="text-green-800">Current Active Version</CardTitle>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                v{versions.find(v => v.isActive)?.version}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h3 className="font-semibold text-green-800">
                {versions.find(v => v.isActive)?.name}
              </h3>
              <p className="text-green-700">
                {versions.find(v => v.isActive)?.description}
              </p>
              <div className="flex items-center text-sm text-green-600">
                <Calendar className="w-4 h-4 mr-1" />
                Released: {formatDate(versions.find(v => v.isActive)?.releaseDate!)}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Version History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="w-5 h-5 mr-2" />
            Version History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {versions.map((version) => (
              <div
                key={version.id}
                className={cn(
                  "border rounded-lg p-4 space-y-3",
                  version.isActive ? "border-green-200 bg-green-50" : "border-gray-200"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant={version.isActive ? "default" : "secondary"}>
                        <Tag className="w-3 h-3 mr-1" />
                        v{version.version}
                      </Badge>
                      {version.isActive && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Active
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold">{version.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {version.description}
                    </p>
                  </div>
                  
                  {canManageVersions && (
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(version)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      {!version.isActive && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Version</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete version {version.version}? 
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(version.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Released: {formatDate(version.releaseDate)}
                  </div>
                  <div>
                    Created by: {version.createdBy}
                  </div>
                </div>

                {/* Changelog Preview */}
                {version.changelog && (
                  <div className="mt-3 p-3 bg-gray-50 rounded border">
                    <h4 className="text-sm font-medium mb-2">Changelog:</h4>
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap font-mono leading-relaxed">
                      {version.changelog.length > 200 
                        ? version.changelog.substring(0, 200) + "..."
                        : version.changelog
                      }
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {versions.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No versions found</h3>
              <p className="text-muted-foreground mb-4">
                Create your first version to track system releases.
              </p>
              {canManageVersions && (
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Version
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Version</DialogTitle>
            <DialogDescription>
              Update version information and changelog.
            </DialogDescription>
          </DialogHeader>
          <VersionForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>
              <Edit className="w-4 h-4 mr-2" />
              Update Version
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Access Restriction Notice */}
      {!canManageVersions && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-800">
                Version management is restricted to Super Administrators only.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VersionManagement;
