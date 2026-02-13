import express from 'express';
import jwt from 'jsonwebtoken';
import { findAdminByEmail, verifyPassword, createAdmin } from '../models/Admin.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find admin
    const admin = findAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(admin);

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// Admin Logout
router.post('/logout', verifyToken, (req, res) => {
  try {
    // In a real app, you might invalidate the token in a blacklist
    return res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

// Get Current Admin Profile
router.get('/profile', verifyToken, (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    console.error('Profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch profile'
    });
  }
});

// Verify Token (for checking if user is still logged in)
router.post('/verify', verifyToken, (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: 'Token is valid',
      admin: req.admin
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed'
    });
  }
});

export default router;
