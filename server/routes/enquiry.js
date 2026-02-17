import express from 'express';
import Enquiry from '../models/Enquiry.js';

const router = express.Router();

/**
 * Create a new enquiry/registration
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, subject, message, enquiryType, exhibitionId } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject, and message are required'
      });
    }

    const enquiry = new Enquiry({
      name,
      email,
      phone: phone || '',
      company: company || '',
      subject,
      message,
      enquiryType: enquiryType || 'general_inquiry',
      exhibitionId: exhibitionId || null,
      status: 'new'
    });

    const savedEnquiry = await enquiry.save();

    console.log(`✅ Enquiry created: ${savedEnquiry._id}`);

    return res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: savedEnquiry
    });
  } catch (error) {
    console.error('❌ Create enquiry error:', error.message);
    console.error('Stack:', error.stack);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit enquiry',
      error: error.message
    });
  }
});

/**
 * Get all enquiries
 */
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('exhibitionId', 'title')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: enquiries,
      count: enquiries.length
    });
  } catch (error) {
    console.error('Get enquiries error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiries',
      error: error.message
    });
  }
});

/**
 * Get enquiry by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id)
      .populate('exhibitionId', 'title');

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    return res.status(200).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    console.error('Get enquiry error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch enquiry',
      error: error.message
    });
  }
});

/**
 * Update enquiry status
 */
router.put('/:id', async (req, res) => {
  try {
    const { status, priority, notes } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    if (status) enquiry.status = status;
    if (priority) enquiry.priority = priority;
    if (notes) enquiry.notes = notes;

    await enquiry.save();

    console.log(`✅ Enquiry updated: ${enquiry._id}`);

    return res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      data: enquiry
    });
  } catch (error) {
    console.error('Update enquiry error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update enquiry',
      error: error.message
    });
  }
});

/**
 * Delete enquiry
 */
router.delete('/:id', async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: 'Enquiry not found'
      });
    }

    console.log(`✅ Enquiry deleted: ${req.params.id}`);

    return res.status(200).json({
      success: true,
      message: 'Enquiry deleted successfully'
    });
  } catch (error) {
    console.error('Delete enquiry error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete enquiry',
      error: error.message
    });
  }
});

export default router;
