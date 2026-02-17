import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      trim: true
    },
    company: {
      type: String,
      trim: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    enquiryType: {
      type: String,
      enum: ['exhibition_stall', 'sponsorship', 'general_inquiry', 'contact_inquiry', 'bulk_order', 'other'],
      default: 'general_inquiry'
    },
    exhibitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exhibition'
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed', 'in_progress', 'resolved', 'closed'],
      default: 'new'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    attachmentUrl: {
      type: String // URL to uploaded document/file
    },
    attachmentName: {
      type: String
    },
    notes: {
      type: String,
      trim: true
    },
    responses: [
      {
        respondent: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Admin'
        },
        message: String,
        attachmentUrl: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    followUpDate: Date,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin'
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

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
