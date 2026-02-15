import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    console.log('🔐 Auth Check:');
    console.log('- Authorization header:', req.headers.authorization ? 'Present' : 'Missing');
    console.log('- Cookies:', req.cookies ? Object.keys(req.cookies) : 'No cookies');
    
    // Check for token in Authorization header first, then in cookies
    let token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      token = req.cookies?.adminToken;
      console.log('- Using cookie token:', token ? 'Yes' : 'No');
    } else {
      console.log('- Using header token:', token ? 'Yes' : 'No');
    }

    if (!token) {
      console.log('❌ No token found in header or cookies');
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first.'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    console.log('✅ Token verified for:', decoded.email);
    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please login again.'
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.admin && (req.admin.role === 'admin' || req.admin.role === 'super_admin')) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
};

export const superAdminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === 'super_admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Super Admin privileges required.'
    });
  }
};
