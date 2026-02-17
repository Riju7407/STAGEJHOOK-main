import { put, del } from '@vercel/blob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory for local fallback if needed
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory for local fallback');
}

// Check if Vercel Blob is configured
const USE_VERCEL_BLOB = !!process.env.BLOB_READ_WRITE_TOKEN;

if (USE_VERCEL_BLOB) {
  console.log('✅ Using Vercel Blob Storage for persistent file storage');
} else {
  console.warn('⚠️  Vercel Blob not configured. Falls back to local storage (not recommended for Vercel deployments)');
}

/**
 * Upload a file to Vercel Blob (or local storage as fallback)
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - Original file name
 * @param {string} contentType - MIME type of the file
 * @returns {Promise<{url: string, pathname: string, size: number}>}
 */
export async function uploadToLocal(fileBuffer, fileName, contentType) {
  try {
    const timestamp = Date.now();
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);
    const uniqueName = `${timestamp}-${baseName}${ext}`;
    
    if (USE_VERCEL_BLOB) {
      // Upload to Vercel Blob for persistent storage
      try {
        const blob = await put(uniqueName, fileBuffer, {
          contentType: contentType || 'application/octet-stream',
          access: 'public'
        });
        
        console.log(`✅ File uploaded to Vercel Blob: ${uniqueName}`);
        
        return {
          url: blob.url,
          pathname: uniqueName,
          size: fileBuffer.length
        };
      } catch (blobError) {
        console.error('Vercel Blob upload error:', blobError.message);
        console.log('⚠️  Falling back to local storage...');
        // Fall back to local storage if Vercel Blob fails
      }
    }
    
    // Fallback to local storage
    const filePath = path.join(uploadsDir, uniqueName);
    await fs.promises.writeFile(filePath, fileBuffer);
    
    const baseUrl = process.env.API_BASE_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`;
    const url = `${baseUrl}/uploads/${uniqueName}`;
    
    console.log(`✅ File uploaded to local storage: ${uniqueName}`);
    
    return {
      url: url,
      pathname: uniqueName,
      size: fileBuffer.length
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

/**
 * Delete a file from Vercel Blob (or local storage as fallback)
 * @param {string} pathname - The pathname/filename of the file to delete
 * @returns {Promise<void>}
 */
export async function deleteFromLocal(pathname) {
  try {
    if (USE_VERCEL_BLOB && pathname.includes('blob.vercelusercontent.com')) {
      // Delete from Vercel Blob
      try {
        await del(pathname);
        console.log(`✅ Deleted file from Vercel Blob: ${pathname}`);
        return;
      } catch (blobError) {
        console.error('Vercel Blob deletion error:', blobError.message);
        console.log('⚠️  Blob deletion failed, attempting local deletion...');
      }
    }
    
    // Fallback to local deletion
    const fileName = pathname.includes('/') ? path.basename(pathname) : pathname;
    const filePath = path.join(uploadsDir, fileName);
    
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      console.log(`✅ Deleted file from local storage: ${fileName}`);
    } else {
      console.warn(`⚠️  File not found: ${fileName}`);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error(`Failed to delete file: ${error.message}`);
  }
}

/**
 * Get file URL from pathname
 * @param {string} pathname - The pathname of the file
 * @returns {string} Full URL to the file
 */
export function getFileUrl(pathname) {
  if (pathname.startsWith('http')) {
    return pathname;
  }
  const baseUrl = process.env.API_BASE_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`;
  return `${baseUrl}/uploads/${pathname}`;
}

export default {
  uploadToLocal,
  deleteFromLocal,
  getFileUrl
};
