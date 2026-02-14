import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { verifyToken, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
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

    // Find admin with password field
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');
    if (!admin) {
      console.warn(`⚠️ Login attempt with non-existent email: ${email.toLowerCase()}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Verify password
    const isPasswordValid = await admin.matchPassword(password);
    if (!isPasswordValid) {
      console.warn(`⚠️ Login attempt with wrong password for: ${email.toLowerCase()}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin);

    console.log(`✅ Admin logged in successfully: ${admin.email}`);

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        profileImage: admin.profileImage
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Login failed. Please try again later.'
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
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    return res.status(200).json({
      success: true,
      admin
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

// Update Admin Profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      { name, email: email?.toLowerCase() },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      admin
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

// Change Password
router.post('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current and new passwords are required'
      });
    }

    const admin = await Admin.findById(req.admin.id).select('+password');
    
    // Verify current password
    const isPasswordValid = await admin.matchPassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to change password'
    });
  }
});

export default router;
