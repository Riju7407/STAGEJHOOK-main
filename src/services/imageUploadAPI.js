/**
 * Image Upload Service - Uploads images to Vercel Blob and stores URLs in database
 * Images are not stored as files, only URLs are stored
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Upload image file and get URL
 * @param {File} file - The image file from file input
 * @param {string} token - JWT authentication token
 * @returns {Promise<string>} - URL of the uploaded image
 */
export async function uploadImage(file, token) {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    // Validate file type (images only)
    if (!file.type.startsWith('image/')) {
      throw new Error('Please select an image file');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('Image size must be less than 5MB');
    }

    // Convert file to base64
    const base64 = await fileToBase64(file);

    // Call upload API
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        file: base64,
        fileName: file.name,
        contentType: file.type
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Upload failed');
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Upload failed');
    }

    return data.data.url; // Return only the URL
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  }
}

/**
 * Delete image from Vercel Blob
 * @param {string} imageUrl - The URL or pathname of the image
 * @param {string} token - JWT authentication token
 * @returns {Promise<boolean>} - True if deletion was successful
 */
export async function deleteImage(imageUrl, token) {
  try {
    if (!imageUrl) {
      throw new Error('No image URL provided');
    }

    // Extract pathname from URL if needed
    let pathname = imageUrl;
    if (imageUrl.startsWith('http')) {
      pathname = imageUrl.split('/blob/')[1] || imageUrl;
    }

    const response = await fetch(`${API_BASE_URL}/upload/image/${pathname}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Deletion failed');
    }

    return true;
  } catch (error) {
    console.error('Image deletion error:', error);
    throw error;
  }
}

/**
 * Convert File to Base64 string
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - Base64 encoded string
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      // Remove the data:image/...;base64, prefix if present
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Handle file input change and upload
 * @param {Event} event - File input change event
 * @param {string} token - JWT authentication token
 * @returns {Promise<string>} - URL of uploaded image
 */
export async function handleImageUpload(event, token) {
  try {
    const file = event.target.files[0];
    if (!file) {
      return null;
    }

    const url = await uploadImage(file, token);
    return url;
  } catch (error) {
    console.error('Error in handleImageUpload:', error);
    throw error;
  }
}

export default {
  uploadImage,
  deleteImage,
  handleImageUpload,
  fileToBase64
};
