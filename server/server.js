import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import portfolioRoutes from './routes/portfolio.js';
import exhibitionRoutes from './routes/exhibition.js';
import enquiryRoutes from './routes/enquiry.js';
import Admin from './models/Admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS with multiple origins support
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://stagejhook-main.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      console.warn(`CORS request blocked from origin: ${origin}`);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
async function connectDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ Connected to MongoDB');
    await seedDefaultAdmin();
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    console.log('⚠️  Retrying in 5 seconds...');
    setTimeout(connectDatabase, 5000);
  }
}

// Seed default admin user
async function seedDefaultAdmin() {
  try {
    const adminEmail = 'admin@stagejhook.com';
    const adminPassword = 'admin123';
    
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const newAdmin = new Admin({
        email: adminEmail,
        password: adminPassword,
        name: 'Admin User',
        role: 'super_admin'
      });
      
      await newAdmin.save();
      console.log(`✅ Default admin user created successfully!`);
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔐 Password: ${adminPassword}`);
    } else {
      console.log('✅ Default admin user already exists');
      console.log(`📧 Email: ${adminEmail}`);
      
      // Check if password needs to be reset (if admin was created without proper hashing)
      const lastLogin = existingAdmin.lastLogin ? new Date(existingAdmin.lastLogin).toLocaleString() : 'Never';
      console.log(`🕐 Last login: ${lastLogin}`);
    }
  } catch (error) {
    console.error('❌ Error seeding default admin:', error);
    // Don't stop the server if seeding fails
    console.log('⚠️  Server will continue running. Admin user may need to be created manually.');
  }
}

// Connect to database
connectDatabase();

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log('📁 Static file serving enabled for /uploads');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/exhibition', exhibitionRoutes);
app.use('/api/enquiry', enquiryRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to STAGEJHOOK API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      upload: '/api/upload',
      portfolio: '/api/portfolio',
      exhibition: '/api/exhibition',
      health: '/api/health'
    },
    frontend: process.env.FRONTEND_URL || 'http://localhost:5173'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date()
  });
});

// Debug endpoint - Check admin credentials (for development/troubleshooting)
app.get('/api/debug/admin-status', async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: 'admin@stagejhook.com' });
    
    if (!admin) {
      return res.json({
        success: false,
        message: 'Default admin user not found in database',
        databaseStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        defaultEmail: 'admin@stagejhook.com',
        defaultPassword: 'admin123',
        action: 'Please use these credentials. If still 401, try logging in again after server restart.'
      });
    }

    res.json({
      success: true,
      message: 'Default admin user exists',
      email: admin.email,
      name: admin.name,
      role: admin.role,
      lastLogin: admin.lastLogin || 'Never logged in',
      databaseStatus: 'connected',
      credentials: {
        email: 'admin@stagejhook.com',
        password: 'admin123'
      }
    });
  } catch (error) {
    console.error('Debug endpoint error:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking admin status',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📝 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});
