import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['exhibition', 'design', 'event', 'other'],
      default: 'exhibition'
    },
    imageUrl: {
      type: String,
      required: true
    },
    imageName: {
      type: String // Original filename from Vercel Blob
    },
    thumbnailUrl: {
      type: String // Optional thumbnail URL
    },
    client: {
      type: String,
      trim: true
    },
    location: {
      type: String,
      trim: true
    },
    startDate: Date,
    endDate: Date,
    budget: {
      amount: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'completed', 'archived'],
      default: 'draft'
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0 // For custom sorting
    },
    tags: [String],
    galleryUrls: [
      {
        url: String, // URL only, not base64
        caption: String,
        order: Number
      }
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    },
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

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
