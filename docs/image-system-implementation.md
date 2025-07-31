# Standardized Image System Implementation

*Last Updated: January 26, 2025*

## 🎯 **Overview**

P-Core now uses a **unified image management system** with standardized field names, comprehensive validation, and organized cloud storage across all models.

---

## 📐 **Standardized Image Field**

### **Consistent Naming Convention**
```typescript
// All models now use the same image field name
export const IMAGE_FIELD = "imageUrl" as const;

// Usage in API responses
{
  id: "student_123",
  name: "John Doe",
  email: "john@school.com",
  imageUrl: "https://cloudinary.com/p-core/students/profile/student_123_profile_1234567890.jpg" // Standard field
}
```

### **Database Storage**
```prisma
// Images stored in separate table with polymorphic relations
model Image {
  id        String     @id @default(cuid())
  publicId  String     @unique
  url       String
  folder    String
  feature   String     // 'profile', 'cover', 'gallery', etc.
  ownerId   String     // Entity ID (User, Student, Member, etc.)
  ownerType ImageOwner // Enum: USER, ORGANIZATION, STUDENT, MEMBER, BOOK, OTHER
  orgId     String?    @map("org_id") // Tenant isolation
  
  @@index([ownerId, ownerType])
  @@index([orgId])
  @@schema("auth")
}
```

---

## 🗂️ **Organized Folder Structure**

### **Cloudinary Folder Hierarchy**
```
p-core/                           # Base folder
├── organizations/
│   ├── logo/                     # Organization logos
│   ├── cover/                    # Cover images  
│   └── gallery/                  # Gallery images
├── users/
│   ├── profile/                  # User profile photos
│   └── cover/                    # User cover photos
├── students/
│   ├── profile/                  # Student profile photos
│   └── gallery/                  # Student gallery
├── members/
│   ├── profile/                  # Member profile photos
│   └── gallery/                  # Member gallery
├── books/
│   ├── cover/                    # Book cover images
│   ├── thumbnail/                # Book thumbnails
│   └── gallery/                  # Book gallery
└── others/
    └── profile/                  # Other entity types
```

### **Image Naming Convention**
```typescript
// Format: {ownerType}_{ownerId}_{feature}_{timestamp}
// Examples:
"user_cuid123_profile_1640995200000"
"student_cuid456_profile_1640995201000" 
"organization_cuid789_logo_1640995202000"
"book_cuid012_cover_1640995203000"
```

---

## 🔧 **API Endpoints**

### **Upload Image**
```typescript
POST /api/upload-image

{
  "imageData": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...", // Base64 image
  "ownerType": "STUDENT",     // USER | ORGANIZATION | STUDENT | MEMBER | BOOK | OTHER
  "ownerId": "student_123",   // Entity ID
  "feature": "profile"        // profile | cover | gallery | thumbnail | logo
}

// Response
{
  "success": true,
  "data": {
    "id": "img_cuid",
    "url": "https://cloudinary.com/p-core/students/profile/student_123_profile_1234567890.jpg",
    "publicId": "student_123_profile_1234567890",
    "feature": "profile"
  }
}
```

### **Get Images**
```typescript
GET /api/upload-image?ownerType=STUDENT&ownerId=student_123&feature=profile

// Response
{
  "success": true,
  "data": [
    {
      "id": "img_cuid",
      "url": "https://cloudinary.com/...",
      "publicId": "student_123_profile_1234567890",
      "feature": "profile",
      "ownerType": "STUDENT",
      "ownerId": "student_123",
      "createdAt": "2025-01-26T10:00:00Z"
    }
  ]
}
```

### **Delete Image**
```typescript
DELETE /api/upload-image

{
  "imageId": "img_cuid"
}

// Response
{
  "success": true,
  "message": "Image deleted successfully"
}
```

### **Update Image**
```typescript
PUT /api/upload-image/img_cuid

{
  "imageData": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
  "feature": "cover" // Optional - change feature type
}
```

---

## 📝 **Validation Schemas**

### **Comprehensive Zod Validation**
```typescript
// Base64 image validation with size limits
export const Base64ImageSchema = z
  .string()
  .min(1, "Image data is required")
  .refine(
    (data) => /^data:image\/(jpeg|jpg|png|gif|webp);base64,/.test(data),
    { message: "Invalid image format. Must be JPEG, PNG, GIF, or WebP" }
  )
  .refine(
    (data) => {
      const base64Part = data.split(',')[1];
      const sizeInBytes = (base64Part.length * 3) / 4;
      return sizeInBytes <= 10 * 1024 * 1024; // 10MB limit
    },
    { message: "Image size must be less than 10MB" }
  );

// Entity-specific schemas
export const StudentImageUploadSchema = ImageUploadSchema.extend({
  ownerType: z.literal("STUDENT"),
  feature: z.enum(["profile", "gallery"]).optional().default("profile"),
});

export const OrganizationImageUploadSchema = ImageUploadSchema.extend({
  ownerType: z.literal("ORGANIZATION"),
  feature: z.enum(["logo", "cover", "gallery"]).optional().default("logo"),
});
```

---

## 🔌 **Helper Functions**

### **Get Primary Image for Entity**
```typescript
import { getPrimaryImage, IMAGE_FIELD } from "@/lib/image-utils";

// Get student's profile image
const imageUrl = await getPrimaryImage("STUDENT", studentId, orgId, "profile");

// Add to API response
const student = await prisma.student.findUnique({ where: { id: studentId } });
const studentWithImage = {
  ...student,
  [IMAGE_FIELD]: imageUrl  // Adds 'imageUrl' field
};
```

### **Batch Set Images for Multiple Entities**
```typescript
import { setEntitiesImageUrls } from "@/lib/image-utils";

// Get students with their profile images
const students = await prisma.student.findMany({ where: { orgId } });
const studentsWithImages = await setEntitiesImageUrls(
  students, 
  "STUDENT", 
  orgId, 
  "profile"
);

// Each student now has 'imageUrl' field
studentsWithImages.forEach(student => {
  console.log(student.imageUrl); // URL or null
});
```

---

## 🛡️ **Security & Permissions**

### **Role-Based Access Control**
```typescript
// Required permissions for image operations
- "read:images"   - View images
- "write:images"  - Upload images  
- "delete:images" - Delete images

// Middleware automatically applied
app.use("*", organizationSecurityMiddleware);      // Tenant isolation
app.use("*", requirePermission("write:images"));   // Permission check
```

### **Tenant Isolation**
```typescript
// All images automatically scoped to organization
const images = await prisma.image.findMany({
  where: {
    orgId: orgContext.organizationId,  // Automatic filtering
    ownerType: "STUDENT",
    ownerId: studentId
  }
});
```

---

## 🖼️ **Image Optimization**

### **Automatic Cloudinary Transformations**
```typescript
// Applied during upload
const cloudinaryResult = await cloudinary.uploader.upload(imageData, {
  folder,
  public_id: publicId,
  resource_type: "image",
  transformation: [
    { width: 800, height: 600, crop: "limit" },  // Max dimensions
    { quality: "auto" },                         // Auto quality
    { fetch_format: "auto" }                     // Auto format (WebP, etc.)
  ]
});
```

### **Image Features by Entity Type**

| Entity Type | Available Features | Default | Use Case |
|-------------|-------------------|---------|----------|
| **User** | `profile`, `cover` | `profile` | Profile photos, header images |
| **Organization** | `logo`, `cover`, `gallery` | `logo` | Branding, marketing materials |
| **Student** | `profile`, `gallery` | `profile` | ID photos, portfolios |
| **Member** | `profile`, `gallery` | `profile` | Church member photos, events |
| **Book** | `cover`, `thumbnail`, `gallery` | `cover` | Book covers, previews |

---

## 🔄 **Migration Guide**

### **From Old Image System**
```typescript
// BEFORE (inconsistent fields)
student.image     // Sometimes URL, sometimes ID
member.photo      // Different field name
book.coverImage   // Another variant

// AFTER (standardized)
student.imageUrl  // Always URL or null
member.imageUrl   // Consistent naming
book.imageUrl     // Same across all models
```

### **API Response Updates**
```typescript
// Old API responses
{
  id: "123",
  name: "John",
  image: "cloudinary.com/old/path/image.jpg"  // Inconsistent
}

// New API responses  
{
  id: "123", 
  name: "John",
  imageUrl: "cloudinary.com/p-core/students/profile/student_123_profile_1234567890.jpg"  // Standardized
}
```

---

## 📚 **Usage Examples**

### **Student Profile with Image**
```typescript
// API endpoint: GET /api/students/:id
export async function getStudent(id: string, orgId: string) {
  const student = await prisma.student.findUnique({
    where: { id, orgId }
  });
  
  if (!student) return null;
  
  // Add standardized image field
  return await setEntityImageUrl(student, "STUDENT", orgId, "profile");
}

// Response includes imageUrl field
{
  id: "student_123",
  name: "John Doe", 
  email: "john@school.com",
  imageUrl: "https://cloudinary.com/p-core/students/profile/..." // Added automatically
}
```

### **Organization Logo Display**
```typescript
// Frontend component
function OrganizationLogo({ org }: { org: Organization }) {
  return (
    <img 
      src={org.imageUrl || '/default-logo.png'} 
      alt={`${org.name} logo`}
      className="h-12 w-12 object-contain"
    />
  );
}
```

---

## 🧹 **Maintenance**

### **Cleanup Orphaned Images**
```typescript
import { cleanupOrphanedImages } from "@/lib/image-utils";

// Remove images with no corresponding entity
const deletedCount = await cleanupOrphanedImages(organizationId);
console.log(`Cleaned up ${deletedCount} orphaned images`);
```

### **Image Analytics**
```typescript
// Track image usage across organization
const imageStats = await prisma.image.groupBy({
  by: ['ownerType', 'feature'],
  where: { orgId },
  _count: true
});

// Example result:
// [
//   { ownerType: 'STUDENT', feature: 'profile', _count: 150 },
//   { ownerType: 'ORGANIZATION', feature: 'logo', _count: 1 },
//   { ownerType: 'BOOK', feature: 'cover', _count: 45 }
// ]
```

---

## ✅ **Benefits of Standardized System**

1. **Consistent API**: Same field name (`imageUrl`) across all entities
2. **Organized Storage**: Logical folder structure in Cloudinary
3. **Type Safety**: Comprehensive Zod validation with TypeScript types  
4. **Performance**: Batch image loading and automatic optimization
5. **Security**: Tenant isolation and permission-based access
6. **Maintainability**: Central utilities for image management
7. **Scalability**: Polymorphic design supports any entity type

---

*Implementation completed: January 26, 2025*  
*Ready for: Production deployment with standardized image handling*
