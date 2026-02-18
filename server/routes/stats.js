import express from 'express';
import Stats from '../models/Stats.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all stats (public)
router.get('/', async (req, res) => {
  try {
    let stats = await Stats.findOne();
    
    // If no stats exist, create default ones
    if (!stats) {
      stats = new Stats();
      await stats.save();
    }
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single stat by ID
router.get('/:id', async (req, res) => {
  try {
    const stats = await Stats.findById(req.params.id);
    if (!stats) {
      return res.status(404).json({ error: 'Stats not found' });
    }
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create stats (admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const stats = new Stats(req.body);
    await stats.save();
    res.status(201).json(stats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update stats (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const stats = await Stats.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!stats) {
      return res.status(404).json({ error: 'Stats not found' });
    }
    
    res.json(stats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete stats (admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const stats = await Stats.findByIdAndDelete(req.params.id);
    
    if (!stats) {
      return res.status(404).json({ error: 'Stats not found' });
    }
    
    res.json({ message: 'Stats deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
