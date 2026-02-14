import express from 'express';
import Exhibition from '../models/Exhibition.js';
import { verifyToken, adminOnly } from '../middleware/auth.js';
import { deleteFromBlob } from '../services/blobStorage.js';

const router = express.Router();

// Create Exhibition
router.post('/', verifyToken, adminOnly, async (req, res) => {
  try {
    const { 
      title, description, startDate, endDate, location, coverImageUrl, 
      coverImageName, category, capacity, stallSize, pricing, amenities, 
      sponsorshipTiers 
    } = req.body;

    if (!title || !description || !startDate || !endDate || !location || !coverImageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, dates, location, and coverImageUrl are required'
      });
    }

    const exhibition = new Exhibition({
      title,
      description,
      startDate,
      endDate,
      location,
      coverImageUrl,
      coverImageName,
      category: category || 'expo',
      status: 'upcoming',
      capacity: capacity || 100,
      stallSize: stallSize || { small: 0, medium: 0, large: 0 },
      pricing: pricing || { small: 0, medium: 0, large: 0, currency: 'USD' },
      amenities: amenities || [],
      sponsorshipTiers: sponsorshipTiers || [],
      createdBy: req.admin.id
    });

    await exhibition.save();

    return res.status(201).json({
      success: true,
      message: 'Exhibition created successfully',
      data: exhibition
    });
  } catch (error) {
    console.error('Create exhibition error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create exhibition',
      error: error.message
    });
  }
});

// Get All Exhibitions
router.get('/', async (req, res) => {
  try {
    const { status, isPublished, category } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';
    if (category) filter.category = category;

    const exhibitions = await Exhibition.find(filter)
      .populate('createdBy', 'name email')
      .sort({ startDate: 1 });

    return res.status(200).json({
      success: true,
      data: exhibitions,
      count: exhibitions.length
    });
  } catch (error) {
    console.error('Get exhibitions error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch exhibitions',
      error: error.message
    });
  }
});

// Get Exhibition by ID
router.get('/:id', async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!exhibition) {
      return res.status(404).json({
        success: false,
        message: 'Exhibition not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: exhibition
    });
  } catch (error) {
    console.error('Get exhibition error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch exhibition',
      error: error.message
    });
  }
});

// Update Exhibition
router.put('/:id', verifyToken, adminOnly, async (req, res) => {
  try {
    const { 
      title, description, startDate, endDate, location, coverImageUrl,
      coverImageName, category, capacity, stallSize, pricing, amenities,
      sponsorshipTiers, isPublished
    } = req.body;

    const exhibition = await Exhibition.findById(req.params.id);

    if (!exhibition) {
      return res.status(404).json({
        success: false,
        message: 'Exhibition not found'
      });
    }

    // Update status based on dates
    const now = new Date();
    if (new Date(endDate) < now) {
      exhibition.status = 'completed';
    } else if (new Date(startDate) <= now && new Date(endDate) >= now) {
      exhibition.status = 'ongoing';
    } else {
      exhibition.status = 'upcoming';
    }

    // Update fields if provided
    if (title) exhibition.title = title;
    if (description) exhibition.description = description;
    if (startDate) exhibition.startDate = startDate;
    if (endDate) exhibition.endDate = endDate;
    if (location) exhibition.location = location;
    if (coverImageUrl) {
      if (exhibition.coverImageName) {
        try {
          await deleteFromBlob(exhibition.coverImageName);
        } catch (err) {
          console.warn('Could not delete old image:', err);
        }
      }
      exhibition.coverImageUrl = coverImageUrl;
      exhibition.coverImageName = coverImageName;
    }
    if (category) exhibition.category = category;
    if (capacity) exhibition.capacity = capacity;
    if (stallSize) exhibition.stallSize = stallSize;
    if (pricing) exhibition.pricing = pricing;
    if (amenities) exhibition.amenities = amenities;
    if (sponsorshipTiers) exhibition.sponsorshipTiers = sponsorshipTiers;
    if (isPublished !== undefined) exhibition.isPublished = isPublished;

    exhibition.updatedAt = new Date();
    await exhibition.save();

    return res.status(200).json({
      success: true,
      message: 'Exhibition updated successfully',
      data: exhibition
    });
  } catch (error) {
    console.error('Update exhibition error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update exhibition',
      error: error.message
    });
  }
});

// Delete Exhibition
router.delete('/:id', verifyToken, adminOnly, async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id);

    if (!exhibition) {
      return res.status(404).json({
        success: false,
        message: 'Exhibition not found'
      });
    }

    // Delete cover image
    if (exhibition.coverImageName) {
      try {
        await deleteFromBlob(exhibition.coverImageName);
      } catch (err) {
        console.warn('Could not delete cover image:', err);
      }
    }

    // Delete gallery images
    if (exhibition.imageGallery && exhibition.imageGallery.length > 0) {
      for (const img of exhibition.imageGallery) {
        try {
          await deleteFromBlob(img.url);
        } catch (err) {
          console.warn('Could not delete gallery image:', err);
        }
      }
    }

    // Delete exhibition guide
    if (exhibition.exhibitionGuide?.url) {
      try {
        await deleteFromBlob(exhibition.exhibitionGuide.url);
      } catch (err) {
        console.warn('Could not delete exhibition guide:', err);
      }
    }

    await Exhibition.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Exhibition deleted successfully'
    });
  } catch (error) {
    console.error('Delete exhibition error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete exhibition',
      error: error.message
    });
  }
});

// Publish/Unpublish Exhibition
router.patch('/:id/publish', verifyToken, adminOnly, async (req, res) => {
  try {
    const { isPublished } = req.body;

    const exhibition = await Exhibition.findByIdAndUpdate(
      req.params.id,
      { isPublished },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Exhibition ${isPublished ? 'published' : 'unpublished'} successfully`,
      data: exhibition
    });
  } catch (error) {
    console.error('Publish exhibition error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update publication status',
      error: error.message
    });
  }
});

// Update stall registration
router.patch('/:id/register-stall', async (req, res) => {
  try {
    const { stallSize } = req.body;

    const exhibition = await Exhibition.findById(req.params.id);

    if (!exhibition) {
      return res.status(404).json({
        success: false,
        message: 'Exhibition not found'
      });
    }

    // Decrement available stalls
    if (stallSize && exhibition.stallSize[stallSize] > 0) {
      exhibition.stallSize[stallSize]--;
      exhibition.registeredCount++;
      await exhibition.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Stall registered successfully',
      data: exhibition
    });
  } catch (error) {
    console.error('Register stall error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to register stall',
      error: error.message
    });
  }
});

export default router;
