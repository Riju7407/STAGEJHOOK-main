import { put, del } from '@vercel/blob';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

if (!BLOB_TOKEN) {
  console.warn('Warning: BLOB_READ_WRITE_TOKEN not set. Image uploads will fail.');
}

/**
 * Upload a file to Vercel Blob storage
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - Original file name
 * @param {string} contentType - MIME type of the file
 * @returns {Promise<{url: string, pathname: string}>}
 */
export async function uploadToBlob(fileBuffer, fileName, contentType) {
  try {
    const timestamp = Date.now();
    const uniqueName = `${timestamp}-${fileName}`;
    
    const blob = await put(uniqueName, fileBuffer, {
      access: 'public',
      contentType: contentType,
      token: BLOB_TOKEN,
      addRandomSuffix: false
    });

    return {
      url: blob.url,
      pathname: blob.pathname,
      size: fileBuffer.length
    };
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    throw new Error(`Failed to upload file: ${error.message}`);
  }
}

/**
 * Delete a file from Vercel Blob storage
 * @param {string} pathname - The pathname of the blob to delete
 * @returns {Promise<void>}
 */
export async function deleteFromBlob(pathname) {
  try {
    await del(pathname, {
      token: BLOB_TOKEN
    });
    console.log(`Deleted blob: ${pathname}`);
  } catch (error) {
    console.error('Error deleting from Vercel Blob:', error);
    throw new Error(`Failed to delete file: ${error.message}`);
  }
}

/**
 * Get blob URL from pathname
 * @param {string} pathname - The pathname of the blob
 * @returns {string} Full URL to the blob
 */
export function getBlobUrl(pathname) {
  if (pathname.startsWith('http')) {
    return pathname;
  }
  return `https://blob.vercelusercontent.com/${pathname}`;
}

export default {
  uploadToBlob,
  deleteFromBlob,
  getBlobUrl
};
