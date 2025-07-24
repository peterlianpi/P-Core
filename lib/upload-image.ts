/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/imageUpload.ts
import { uploadImage } from "@/data/upload-image-cloudinary"

export interface ImageUploadResult {
  success: boolean
  url?: string
  error?: string
  metadata?: {
    publicId: string
    format: string
    width: number
    height: number
    bytes: number
  }
}

export interface ImageUploadOptions {
  maxFileSize?: number // in MB, default 5MB
  allowedFormats?: string[] // default: ['jpg', 'jpeg', 'png', 'webp']
  folder?: string // Cloudinary folder
  transformation?: Record<string, any>
}

const DEFAULT_OPTIONS: Required<ImageUploadOptions> = {
  maxFileSize: 5,
  allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  folder: 'uploads',
  transformation: {}
}

/**
 * Validates image file before upload
 */
export function validateImageFile(
  file: File, 
  options: ImageUploadOptions = {}
): { isValid: boolean; error?: string } {
  const opts = { ...DEFAULT_OPTIONS, ...options }
  
  // Check file size
  const fileSizeMB = file.size / (1024 * 1024)
  if (fileSizeMB > opts.maxFileSize) {
    return {
      isValid: false,
      error: `File size (${fileSizeMB.toFixed(2)}MB) exceeds maximum allowed size of ${opts.maxFileSize}MB`
    }
  }
  
  // Check file type
  const fileExtension = file.name.split('.').pop()?.toLowerCase()
  if (!fileExtension || !opts.allowedFormats.includes(fileExtension)) {
    return {
      isValid: false,
      error: `File type .${fileExtension} is not supported. Allowed formats: ${opts.allowedFormats.join(', ')}`
    }
  }
  
  // Check MIME type
  const mimeType = file.type
  const allowedMimeTypes = opts.allowedFormats.map(format => {
    switch (format) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'png':
        return 'image/png'
      case 'webp':
        return 'image/webp'
      case 'gif':
        return 'image/gif'
      default:
        return `image/${format}`
    }
  })
  
  if (!allowedMimeTypes.includes(mimeType)) {
    return {
      isValid: false,
      error: `Invalid file type. Expected an image file.`
    }
  }
  
  return { isValid: true }
}

/**
 * Handles single image upload with comprehensive error handling
 */
export async function handleImageUpload(
  file: File,
  options: ImageUploadOptions = {}
): Promise<ImageUploadResult> {
  try {
    // Validate file
    const validation = validateImageFile(file, options)
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error
      }
    }

    // Upload to Cloudinary
    const result = await uploadImage(file, options)

    // Check if result is a valid URL string
    if (typeof result === 'string' && result.startsWith('http')) {
      return {
        success: true,
        url: result
      }
    }

    // Handle Cloudinary response object
    if (typeof result === 'object' && result !== null) {
      const cloudinaryResult = result as any
      
      if (cloudinaryResult.secure_url) {
        return {
          success: true,
          url: cloudinaryResult.secure_url,
          metadata: {
            publicId: cloudinaryResult.public_id,
            format: cloudinaryResult.format,
            width: cloudinaryResult.width,
            height: cloudinaryResult.height,
            bytes: cloudinaryResult.bytes
          }
        }
      }
    }

    return {
      success: false,
      error: 'Invalid response from image upload service'
    }
  } catch (error) {
    console.error('Image upload failed:', error)
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('network')) {
        return {
          success: false,
          error: 'Network error occurred during upload. Please check your connection and try again.'
        }
      }
      
      if (error.message.includes('timeout')) {
        return {
          success: false,
          error: 'Upload timed out. Please try again with a smaller file.'
        }
      }
      
      return {
        success: false,
        error: error.message
      }
    }

    return {
      success: false,
      error: 'An unexpected error occurred during upload'
    }
  }
}

/**
 * Handles multiple image uploads
 */
export async function handleMultipleImageUploads(
  files: File[],
  options: ImageUploadOptions = {}
): Promise<ImageUploadResult[]> {
  const uploadPromises = files.map(file => handleImageUpload(file, options))
  return Promise.all(uploadPromises)
}

/**
 * Creates a preview URL for local display before upload
 */
export function createImagePreview(file: File): string {
  return URL.createObjectURL(file)
}

/**
 * Revokes image preview URL to free memory
 */
export function revokeImagePreview(url: string): void {
  URL.revokeObjectURL(url)
}

/**
 * Formats file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Compresses image before upload (for large files)
 */
export function compressImage(
  file: File, 
  maxWidth: number = 1920, 
  maxHeight: number = 1080, 
  quality: number = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            })
            resolve(compressedFile)
          } else {
            reject(new Error('Failed to compress image'))
          }
        },
        'image/jpeg',
        quality
      )
    }
    
    img.onerror = () => reject(new Error('Failed to load image for compression'))
    img.src = URL.createObjectURL(file)
  })
}
