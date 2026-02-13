import express from 'express';
import { uploadToBlob, deleteFromBlob } from '../services/blobStorage.js';
import { verifyToken, adminOnly } from '../middleware/auth.js';

const router = express.Router();

/**
 * Upload image to Vercel Blob
 * Returns only the URL (not the binary file)
 */
router.post('/image', verifyToken, adminOnly, async (req, res) => {
  try {
    const { file, fileName, contentType } = req.body;

    if (!file || !fileName) {
      return res.status(400).json({
        success: false,
        message: 'File and fileName are required'
      });
    }

    // Convert base64 to buffer if needed
    let fileBuffer;
    if (typeof file === 'string') {
      // Assume base64 string
      fileBuffer = Buffer.from(file, 'base64');
    } else if (Buffer.isBuffer(file)) {
      fileBuffer = file;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid file format'
      });
    }

    // Upload to Vercel Blob
    const result = await uploadToBlob(
      fileBuffer,
      fileName,
      contentType || 'application/octet-stream'
    );

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: result.url,
        size: result.size,
        uploadedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload image',
      error: error.message
    });
  }
});

/**
 * Delete image from Vercel Blob
 */
router.delete('/image/:pathname(*)', verifyToken, adminOnly, async (req, res) => {
  try {
    const { pathname } = req.params;

    if (!pathname) {
      return res.status(400).json({
        success: false,
        message: 'Pathname is required'
      });
    }

    await deleteFromBlob(pathname);

    return res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete image',
      error: error.message
    });
  }
});

export default router;
