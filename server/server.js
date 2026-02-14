import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import portfolioRoutes from './routes/portfolio.js';
import exhibitionRoutes from './routes/exhibition.js';
import Admin from './models/Admin.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

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
    const existingAdmin = await Admin.findOne({ email: 'admin@stagejhook.com' });
    
    if (!existingAdmin) {
      const newAdmin = new Admin({
        email: 'admin@stagejhook.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'super_admin'
      });
      
      await newAdmin.save();
      console.log('✅ Default admin user created: admin@stagejhook.com / admin123');
    } else {
      console.log('✅ Default admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error seeding default admin:', error);
  }
}

// Connect to database
connectDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/exhibition', exhibitionRoutes);

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
