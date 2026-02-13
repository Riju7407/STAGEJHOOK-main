# MongoDB & Vercel Blob Setup Guide

## ✅ What's Configured

Your STAGEJHOOK application is now fully integrated with:

### 🗄️ **MongoDB Database**
- **URI**: `mongodb+srv://Vercel-Admin-atlas-orange-dog:DInPt6IAdp53UD3C@atlas-orange-dog.szoflmn.mongodb.net/`
- **Models Created**:
  - Admin (User authentication + profiles)
  - Portfolio (Project showcase)
  - Exhibition (Event management)
  - Enquiry (Contact form submissions)
- **Default Admin**: `admin@stagejhook.com` / `admin123` ⚠️ Change in production!

### 📦 **Vercel Blob Storage**
- **Token**: `vercel_blob_rw_BznvK71vWxwTBqcX_6K4ta3pQu1esqEpLIh4oAPomnTHUdD`
- **Purpose**: Store all media (images, PDFs, documents)
- **Database**: Only URLs stored, not binary data
- **Benefits**:
  - ✅ No database bloat
  - ✅ Fast CDN delivery
  - ✅ Easy image management
  - ✅ Scalable storage

---

## 🚀 Quick Start

### 1. Backend Server
```bash
cd server
npm install
npm start
```
Server runs on `http://localhost:5000`

### 2. Frontend
```bash
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## 📝 How to Use Image Uploads

### In React Components

```jsx
import { uploadImage } from '../services/imageUploadAPI';
import { useAdminAuth } from '../hooks/useAdminAuth';

export function ImageUploadExample() {
  const { token } = useAdminAuth();
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const url = await uploadImage(file, token);
      setImageUrl(url); // URL ready to save in database
      console.log('Image uploaded:', url);
    } catch (error) {
      console.error('Upload failed:', error.message);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload}
      />
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
}
```

### Saving to Database

When creating Portfolio or Exhibition:
```javascript
const portfolio = {
  title: "Exhibition Stall Design",
  description: "Custom stall design",
  imageUrl: imageUrl,  // The URL from upload
  category: "exhibition",
  status: "published"
  // ... other fields
};

// Save to database (imageUrl is just a string)
```

---

## 🔐 Security

### Environment Variables (Keep Secret!)
```bash
# .env file (Never commit to git!)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
MONGODB_URI=mongodb+srv://username:password@...
JWT_SECRET=your_super_secret_key
```

### In Production (Render/Deploy)
1. Set environment variables in deployment dashboard
2. Change `JWT_SECRET` to a strong random string
3. Change admin password from default
4. Use strong MongoDB password

---

## 📊 Database Models Explained

### Admin
- Stores user credentials (hashed passwords)
- Profile information
- Role: admin or super_admin

### Portfolio
- Exhibition projects showcase
- Stores multiple image URLs (gallery)
- Publication status
- Categorization and tagging

### Exhibition
- Event details (dates, location, capacity)
- Stall pricing and availability
- Sponsorship tiers
- Image gallery

### Enquiry
- Contact form submissions
- Conversation history
- Status tracking
- File attachments (URLs only)

---

## 🎯 File Size Limits

- **Single Image**: Max 5MB
- **Vercel Blob**: Unlimited total storage (with your account limits)
- **MongoDB**: 16MB per document (plenty for URLs and metadata)

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Image Upload
- `POST /api/upload/image` - Upload image, get URL
- `DELETE /api/upload/image/{pathname}` - Delete image

### Coming Soon
- Portfolio CRUD
- Exhibition CRUD
- Enquiry management
- Analytics

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Check Node version
node --version  # Should be v16+

# Check MongoDB connection
# Verify MONGODB_URI in .env

# Check port is available
# Change PORT in .env if 5000 is in use
```

### Image upload fails
```javascript
// Ensure token is valid and authenticated
// Check BLOB_READ_WRITE_TOKEN in .env
// Verify file is < 5MB
// Check file type is image
```

### CORS errors
```
// Make sure FRONTEND_URL in .env matches your frontend URL
// Default: http://localhost:5173
```

---

## 📚 File Structure

```
server/
├── models/
│   ├── Admin.js          ← Authentication
│   ├── Portfolio.js      ← Projects
│   ├── Exhibition.js     ← Events
│   └── Enquiry.js        ← Contacts
├── routes/
│   ├── auth.js
│   └── upload.js         ← Image uploads
├── middleware/
│   └── auth.js
├── services/
│   └── blobStorage.js    ← Vercel Blob integration
├── server.js             ← Main server entry
└── .env                  ← Configuration (SECRET!)

src/
├── services/
│   └── imageUploadAPI.js ← Frontend upload service
└── hooks/
    └── useAdminAuth.js   ← Authentication hook
```

---

## ✨ Next Steps

1. **Update Admin Password**
   ```bash
   # Login with admin@stagejhook.com / admin123
   # Then change password via profile settings
   ```

2. **Create Admin Dashboard**
   - Portfolio management
   - Exhibition management
   - Enquiry handling

3. **Build Public Interfaces**
   - Portfolio display
   - Exhibition listing
   - Contact form

4. **Deploy to Production**
   - Use Render/Vercel
   - Set environment variables
   - Update FRONTEND_URL in .env

---

## 📞 Common Questions

**Q: Are images encrypted?**
A: Vercel Blob provides HTTPS encryption in transit. Consider additional encryption if needed.

**Q: Can I move images later?**
A: Yes, you can migrate Blob storage between accounts using Vercel's migration tools.

**Q: What about image optimization?**
A: Consider using Vercel's Image Optimization API or Cloudinary for advanced features.

**Q: How are URLs stored?**
A: As simple strings in MongoDB. Example: `https://blob.vercelusercontent.com/...`

**Q: Can I use CDN cache headers?**
A: Vercel Blob automatically serves from CDN with optimal caching.

---

## 🎉 You're All Set!

Your MongoDB and Vercel Blob integration is ready to use. Happy building!

For API details, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
