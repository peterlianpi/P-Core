"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Tag,
  AlertCircle,
  History,
  Upload,
} from "lucide-react";
import { useData } from "@/providers/data-provider";
import { useListVersions } from "@/features/system/version/api/use-list-versions";
import { useCreateVersion } from "@/features/system/version/api/use-create-version";
import { useUpdateVersion } from "@/features/system/version/api/use-update-version";
import { useDeleteVersion } from "@/features/system/version/api/use-delete-version";
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

interface VersionFormData {
  version: string;
  name: string;
  description: string;
  releaseDate: string; // ISO string for date input
  status: "DEVELOPMENT" | "TESTING" | "STAGING" | "PRODUCTION" | "DEPRECATED";
  createdBy: string;
}

import { useCurrentUser } from "@/hooks/use-current-user";

interface VersionManagementProps {
  className?: string;
}

export const VersionManagement: React.FC<VersionManagementProps> = ({
  className,
}) => {
  // Version management is now global, not organization-specific
  const { data, isLoading, isError, error } = useListVersions();
  const versions = useMemo(() => data?.versions ?? [], [data]);
  const createMutation = useCreateVersion();
  const updateMutation = useUpdateVersion();
  const deleteMutation = useDeleteVersion();
  const user = useCurrentUser();
  const [selectedVersion, setSelectedVersion] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<VersionFormData>({
    version: "",
    name: "",
    description: "",
    releaseDate: new Date().toISOString().slice(0, 10), // default to today
    status: "DEVELOPMENT",
    createdBy: user?.id || "",
  });
  // Error states for create/update actions
  const [formError, setFormError] = useState<string | null>(null);

  const canManageVersions = user?.role === "SUPERADMIN" || user?.role === "DEVELOPMENT";

  const handleCreate = async () => {
    setFormError(null);
    try {
      await createMutation.mutateAsync({
        version: formData.version,
        name: formData.name,
        description: formData.description,
        releaseDate: new Date(formData.releaseDate),
        status: formData.status,
        createdBy: user?.id || "",
      });
      setIsCreateModalOpen(false);
      resetForm();
    } catch (err: any) {
      setFormError(err?.message || "Failed to create version");
    }
  };

  const handleEdit = (version: any) => {
    setSelectedVersion(version);
    setFormData({
      version: version.version || "",
      name: version.name || "",
      description: version.description || "",
      releaseDate: version.releaseDate ? new Date(version.releaseDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
      status: version.status || "DEVELOPMENT",
      createdBy: version.createdBy || user?.id || "",
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    setFormError(null);
    try {
      await updateMutation.mutateAsync({
        id: selectedVersion.id,
        version: formData.version,
        name: formData.name,
        description: formData.description,
        releaseDate: new Date(formData.releaseDate),
        status: formData.status,
        createdBy: formData.createdBy,
      });
      setIsEditModalOpen(false);
      resetForm();
    } catch (err: any) {
      setFormError(err?.message || "Failed to update version");
    }
  };

  const handleDelete = async (versionId: string) => {
    await deleteMutation.mutateAsync(versionId);
  };

  const resetForm = () => {
    setFormData({
      version: "",
      name: "",
      description: "",
      releaseDate: new Date().toISOString().slice(0, 10),
      status: "DEVELOPMENT",
      createdBy: user?.id || "",
    });
    setSelectedVersion(null);
    setFormError(null);
  };

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(d);
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
            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
            autoComplete="off"
            autoFocus
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Release Name</Label>
          <Input
            id="name"
            placeholder="e.g., Enhanced Analytics Release"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the release..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="releaseDate">Release Date</Label>
          <Input
            id="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            className="w-full border rounded px-2 py-1"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as VersionFormData["status"] })}
          >
            <option value="DEVELOPMENT">Development</option>
            <option value="TESTING">Testing</option>
            <option value="STAGING">Staging</option>
            <option value="PRODUCTION">Production</option>
            <option value="DEPRECATED">Deprecated</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="createdBy">Created By</Label>
        <Input
          id="createdBy"
          value={formData.createdBy}
          disabled
        />
      </div>
      {formError && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2 mt-2">
          {formError}
        </div>
      )}
    </div>
  );

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Version Management</h1>
          <p className="text-muted-foreground">Manage system versions and release notes.</p>
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
                <DialogDescription>Add a new system version with details.</DialogDescription>
              </DialogHeader>
              <VersionForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreate} disabled={createMutation.isPending}>
                  <Upload className="w-4 h-4 mr-2" />
                  {createMutation.isPending ? "Creating..." : "Create Version"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Errors */}
      {isError && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 text-red-800">
            {(error as Error)?.message || "Failed to fetch versions"}
          </CardContent>
        </Card>
      )}

      {/* Version History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="w-5 h-5 mr-2" />
            Versions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading && <div className="text-sm text-muted-foreground">Loading versions...</div>}
            {!isLoading && versions.map((version) => (
              <div key={version.id} className="border rounded-lg p-4 space-y-3 border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">
                        <Tag className="w-3 h-3 mr-1" /> v{version.version}
                      </Badge>
                    </div>
                    <h3 className="font-semibold">{version.name}</h3>
                    {version.description && (
                      <p className="text-sm text-muted-foreground">{version.description}</p>
                    )}
                  </div>

                  {canManageVersions && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(version)}>
                        <Edit className="w-4 h-4" />
                      </Button>
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
                              Are you sure you want to delete version {version.version}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(version.id)} className="bg-red-600 hover:bg-red-700">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Created: {formatDate(version.createdAt)}
                  </div>
                </div>
              </div>
            ))}

            {!isLoading && versions.length === 0 && (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No versions found</h3>
                <p className="text-muted-foreground mb-4">Create your first version to track system releases.</p>
                {canManageVersions && (
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Version
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Version</DialogTitle>
            <DialogDescription>Update version information.</DialogDescription>
          </DialogHeader>
          <VersionForm />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={updateMutation.isPending}>
              <Edit className="w-4 h-4 mr-2" />
              {updateMutation.isPending ? "Updating..." : "Update Version"}
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
              <p className="text-yellow-800">Version management is restricted to Super Administrators only.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VersionManagement;
