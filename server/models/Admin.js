import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+[\w-\.]*@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // Don't return password by default
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      enum: ['admin', 'super_admin'],
      default: 'admin'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    profileImage: {
      url: String,
      pathname: String // For Vercel Blob pathname
    },
    lastLogin: Date,
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
adminSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to get safe admin data (without password)
adminSchema.methods.toJSON = function() {
  const admin = this.toObject();
  delete admin.password;
  return admin;
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;

// Legacy function exports for compatibility
export const findAdminByEmail = async (email) => {
  return await Admin.findOne({ email: email.toLowerCase() });
};

export const createAdmin = async (email, password, name) => {
  const admin = new Admin({ email, password, name });
  return await admin.save();
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const getAllAdmins = async () => {
  return await Admin.find({}, { password: 0 }).lean();
};

export const findAdminById = async (id) => {
  return await Admin.findById(id, { password: 0 });
};
