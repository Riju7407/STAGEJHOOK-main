import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}

/**
 * Upload a file to local storage
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
    const filePath = path.join(uploadsDir, uniqueName);
    
    // Write file to disk
    await fs.promises.writeFile(filePath, fileBuffer);
    
    // Generate URL - this will be served by Express static middleware
    const baseUrl = process.env.API_BASE_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`;
    const url = `${baseUrl}/uploads/${uniqueName}`;
    
    console.log(`✅ File uploaded successfully: ${uniqueName}`);
    
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
 * Delete a file from local storage
 * @param {string} pathname - The pathname/filename of the file to delete
 * @returns {Promise<void>}
 */
export async function deleteFromLocal(pathname) {
  try {
    // Extract just the filename if a full URL is provided
    const fileName = pathname.includes('/') ? path.basename(pathname) : pathname;
    const filePath = path.join(uploadsDir, fileName);
    
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      console.log(`✅ Deleted file: ${fileName}`);
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
