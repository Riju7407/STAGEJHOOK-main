import express from 'express';
import Portfolio from '../models/Portfolio.js';
import { verifyToken, adminOnly } from '../middleware/auth.js';
import { deleteFromLocal } from '../services/blobStorage.js';
import { transformPortfolioUrls } from '../services/urlTransform.js';

const router = express.Router();

// Create Portfolio
router.post('/', verifyToken, adminOnly, async (req, res) => {
  try {
    const { title, description, category, imageUrl, imageName, client, location, status, tags, galleryUrls } = req.body;

    if (!title || !description || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and imageUrl are required'
      });
    }

    const portfolio = new Portfolio({
      title,
      description,
      category: category || 'exhibition',
      imageUrl,
      imageName,
      client,
      location,
      status: status || 'draft',
      isPublished: true, // Auto-publish for users to see
      tags: tags || [],
      galleryUrls: galleryUrls || [],
      createdBy: req.admin.id
    });

    await portfolio.save();

    console.log(`✅ Portfolio created and published: ${portfolio.title}`);

    return res.status(201).json({
      success: true,
      message: 'Portfolio created and published successfully',
      data: portfolio
    });
  } catch (error) {
    console.error('Create portfolio error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create portfolio',
      error: error.message
    });
  }
});

// Get All Portfolios
router.get('/', async (req, res) => {
  try {
    const { status, isPublished, category } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';
    if (category) filter.category = category;

    const portfolios = await Portfolio.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    // Transform URLs to fix localhost references
    const transformedPortfolios = portfolios.map(p => transformPortfolioUrls(p));

    return res.status(200).json({
      success: true,
      data: transformedPortfolios,
      count: transformedPortfolios.length
    });
  } catch (error) {
    console.error('Get portfolios error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolios',
      error: error.message
    });
  }
});

// Get Portfolio by ID
router.get('/:id', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Transform URLs to fix localhost references
    const transformedPortfolio = transformPortfolioUrls(portfolio);

    return res.status(200).json({
      success: true,
      data: transformedPortfolio
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio',
      error: error.message
    });
  }
});

// Update Portfolio
router.put('/:id', verifyToken, adminOnly, async (req, res) => {
  try {
    const { title, description, category, imageUrl, imageName, client, location, status, tags, galleryUrls, isPublished } = req.body;

    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Update fields if provided
    if (title) portfolio.title = title;
    if (description) portfolio.description = description;
    if (category) portfolio.category = category;
    if (imageUrl) {
      // Delete old image if exists
      if (portfolio.imageName) {
        try {
          await deleteFromLocal(portfolio.imageName);
        } catch (err) {
          console.warn('Could not delete old image:', err);
        }
      }
      portfolio.imageUrl = imageUrl;
      portfolio.imageName = imageName;
    }
    if (client !== undefined) portfolio.client = client;
    if (location !== undefined) portfolio.location = location;
    if (status) portfolio.status = status;
    if (tags) portfolio.tags = tags;
    if (galleryUrls) portfolio.galleryUrls = galleryUrls;
    if (isPublished !== undefined) portfolio.isPublished = isPublished;

    portfolio.updatedAt = new Date();
    await portfolio.save();

    return res.status(200).json({
      success: true,
      message: 'Portfolio updated successfully',
      data: portfolio
    });
  } catch (error) {
    console.error('Update portfolio error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update portfolio',
      error: error.message
    });
  }
});

// Delete Portfolio
router.delete('/:id', verifyToken, adminOnly, async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio not found'
      });
    }

    // Delete associated images
    if (portfolio.imageName) {
      try {
        await deleteFromLocal(portfolio.imageName);
      } catch (err) {
        console.warn('Could not delete main image:', err);
      }
    }

    // Delete gallery images
    if (portfolio.galleryUrls && portfolio.galleryUrls.length > 0) {
      for (const img of portfolio.galleryUrls) {
        try {
          await deleteFromLocal(img.url);
        } catch (err) {
          console.warn('Could not delete gallery image:', err);
        }
      }
    }

    await Portfolio.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Portfolio deleted successfully'
    });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete portfolio',
      error: error.message
    });
  }
});

// Publish/Unpublish Portfolio
router.patch('/:id/publish', verifyToken, adminOnly, async (req, res) => {
  try {
    const { isPublished } = req.body;

    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { isPublished },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: `Portfolio ${isPublished ? 'published' : 'unpublished'} successfully`,
      data: portfolio
    });
  } catch (error) {
    console.error('Publish portfolio error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update publication status',
      error: error.message
    });
  }
});

export default router;
