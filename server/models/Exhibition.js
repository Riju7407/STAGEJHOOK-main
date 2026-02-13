import mongoose from 'mongoose';

const exhibitionSchema = new mongoose.Schema(
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
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    coverImageUrl: {
      type: String,
      required: true
    },
    coverImageName: {
      type: String // Original filename from Vercel Blob
    },
    category: {
      type: String,
      enum: ['trade_show', 'art_exhibition', 'product_launch', 'conference', 'expo', 'other'],
      default: 'expo'
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming'
    },
    capacity: Number,
    registeredCount: {
      type: Number,
      default: 0
    },
    stallSize: {
      small: Number,   // Number of small stalls available
      medium: Number,  // Number of medium stalls available
      large: Number    // Number of large stalls available
    },
    pricing: {
      small: Number,
      medium: Number,
      large: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    },
    amenities: [String],
    sponsorshipTiers: [
      {
        name: String,
        benefits: [String],
        cost: Number
      }
    ],
    exhibitionGuide: {
      url: String, // PDF or document URL
      name: String
    },
    imageGallery: [
      {
        url: String, // URL only
        caption: String,
        order: Number
      }
    ],
    isPublished: {
      type: Boolean,
      default: false
    },
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

const Exhibition = mongoose.model('Exhibition', exhibitionSchema);

export default Exhibition;
