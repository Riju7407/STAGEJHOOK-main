# STAGEJHOOK API Documentation

## Overview
Complete API documentation for STAGEJHOOK exhibition management system. All image uploads use Vercel Blob storage with only URLs stored in MongoDB.

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-deploy-url/api
```

---

## Authentication Endpoints

### 1. Admin Login
**POST** `/auth/login`

Login with admin credentials to receive JWT token.

**Request Body:**
```json
{
  "email": "admin@stagejhook.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "ObjectId",
    "email": "admin@stagejhook.com",
    "name": "Admin User",
    "role": "super_admin",
    "profileImage": {
      "url": "https://blob.vercelusercontent.com/...",
      "pathname": "..."
    }
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 2. Admin Logout
**POST** `/auth/logout`

Logout from admin panel (token-based, no server-side invalidation required yet).

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 3. Get Admin Profile
**GET** `/auth/profile`

Retrieve current logged-in admin's profile.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "admin": {
    "_id": "ObjectId",
    "email": "admin@stagejhook.com",
    "name": "Admin User",
    "role": "super_admin",
    "profileImage": {
      "url": "https://blob.vercelusercontent.com/...",
      "pathname": "..."
    },
    "lastLogin": "2024-02-13T10:30:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-02-13T10:30:00.000Z"
  }
}
```

---

### 4. Update Admin Profile
**PUT** `/auth/profile`

Update admin name and email.

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@stagejhook.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "admin": { /* updated admin object */ }
}
```

---

### 5. Change Password
**POST** `/auth/change-password`

Change admin password securely.

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "currentPassword": "admin123",
  "newPassword": "newSecurePassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### 6. Verify Token
**POST** `/auth/verify`

Check if JWT token is still valid.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Token is valid",
  "admin": { /* admin object */ }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Token verification failed"
}
```

---

## Image Upload Endpoints

> ⚠️ **Important**: Images are stored in Vercel Blob storage. Only URLs are stored in MongoDB database. This ensures:
> - No database bloat from binary files
> - Fast image delivery via CDN
> - Easy image management and deletion
> - Scalable storage solution

### 1. Upload Image
**POST** `/upload/image`

Upload image to Vercel Blob and get URL.

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "file": "base64_encoded_image_string",
  "fileName": "exhibition-photo.jpg",
  "contentType": "image/jpeg"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://blob.vercelusercontent.com/path/to/image",
    "size": 245678,
    "uploadedAt": "2024-02-13T10:30:00.000Z"
  }
}
```

**JavaScript Example:**
```javascript
import { uploadImage } from '../services/imageUploadAPI.js';

const fileInput = document.querySelector('input[type="file"]');
const token = localStorage.getItem('token');

const imageUrl = await uploadImage(fileInput.files[0], token);
console.log('Uploaded image URL:', imageUrl);
// Only the URL is needed for storing in database
```

---

### 2. Delete Image
**DELETE** `/upload/image/{pathname}`

Delete image from Vercel Blob storage.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

## Database Models

### Admin Schema
```javascript
{
  _id: ObjectId,
  email: String (unique, lowercase),
  password: String (hashed with bcrypt),
  name: String,
  role: 'admin' | 'super_admin',
  isActive: Boolean,
  profileImage: {
    url: String,           // Vercel Blob URL only
    pathname: String       // Blob pathname for deletion
  },
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Portfolio Schema
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: 'exhibition' | 'design' | 'event' | 'other',
  imageUrl: String,        // Vercel Blob URL only
  imageName: String,       // Original filename
  thumbnailUrl: String,    // Optional thumbnail URL
  client: String,
  location: String,
  startDate: Date,
  endDate: Date,
  budget: {
    amount: Number,
    currency: String
  },
  status: 'draft' | 'active' | 'completed' | 'archived',
  isPublished: Boolean,
  tags: [String],
  galleryUrls: [
    {
      url: String,         // Vercel Blob URL only
      caption: String,
      order: Number
    }
  ],
  createdBy: ObjectId (Admin reference),
  createdAt: Date,
  updatedAt: Date
}
```

### Exhibition Schema
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  startDate: Date,
  endDate: Date,
  location: String,
  coverImageUrl: String,   // Vercel Blob URL only
  coverImageName: String,
  category: String,
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled',
  capacity: Number,
  registeredCount: Number,
  stallSize: {
    small: Number,
    medium: Number,
    large: Number
  },
  pricing: {
    small: Number,
    medium: Number,
    large: Number,
    currency: String
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
    url: String,           // Document URL from Blob
    name: String
  },
  imageGallery: [
    {
      url: String,         // Vercel Blob URL only
      caption: String,
      order: Number
    }
  ],
  isPublished: Boolean,
  createdBy: ObjectId (Admin reference),
  createdAt: Date,
  updatedAt: Date
}
```

### Enquiry Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  company: String,
  subject: String,
  message: String,
  enquiryType: 'exhibition_stall' | 'sponsorship' | 'general_inquiry' | 'bulk_order' | 'other',
  exhibitionId: ObjectId (Exhibition reference),
  status: 'new' | 'in_progress' | 'resolved' | 'closed',
  priority: 'low' | 'medium' | 'high',
  attachmentUrl: String,   // Vercel Blob URL only
  attachmentName: String,
  notes: String,
  responses: [
    {
      respondent: ObjectId (Admin reference),
      message: String,
      attachmentUrl: String,
      createdAt: Date
    }
  ],
  followUpDate: Date,
  assignedTo: ObjectId (Admin reference),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": {} // Only in development mode
}
```

### Common Status Codes
- **200**: Success
- **400**: Bad Request (missing/invalid parameters)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **500**: Server Error

---

## Environment Variables

```bash
# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Vercel Blob
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx

# Frontend
FRONTEND_URL=http://localhost:5173
```

---

## Notes

1. **Image Storage**: All images are stored in Vercel Blob. Database stores only URLs and metadata.
2. **Authentication**: All protected endpoints require `Authorization: Bearer {token}` header.
3. **File Size Limits**: Maximum 5MB per image upload.
4. **CORS**: Enabled for configured FRONTEND_URL.
5. **Database**: MongoDB Atlas connection with automatic indexing.
6. **Default Admin**: `admin@stagejhook.com` / `admin123` (change in production!)

---

## Future Enhancements

- [ ] Portfolio CRUD endpoints
- [ ] Exhibition CRUD endpoints
- [ ] Enquiry management endpoints
- [ ] Admin user management (create/edit/delete)
- [ ] Role-based access control (RBAC)
- [ ] Email notifications
- [ ] Image optimization/compression
- [ ] Bulk image upload
- [ ] Image search/filtering
- [ ] Analytics dashboard
