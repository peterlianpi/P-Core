"use client";

import React from "react";
import { ImageUploadManager } from "@/components/image/image-upload-manager";

export default function ImageUploadTest() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Image Upload Test</h1>
      
      <div className="space-y-8">
        {/* Test for organization logo */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Organization Logo Upload</h2>
          <ImageUploadManager
            ownerType="ORGANIZATION"
            ownerId="test-org-123"
            feature="logo"
            multiple={false}
            accept="image/*"
            maxSize={5 * 1024 * 1024} // 5MB
          />
        </div>

        {/* Test for user profile */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">User Profile Upload</h2>
          <ImageUploadManager
            ownerType="USER"
            ownerId="test-user-456"
            feature="profile"
            multiple={false}
            accept="image/*"
            maxSize={3 * 1024 * 1024} // 3MB
          />
        </div>

        {/* Test for multiple images */}
        <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Gallery Upload (Multiple)</h2>
          <ImageUploadManager
            ownerType="BOOK"
            ownerId="test-book-789"
            feature="gallery"
            multiple={true}
            accept="image/*"
            maxSize={2 * 1024 * 1024} // 2MB
          />
        </div>
      </div>
    </div>
  );
}
