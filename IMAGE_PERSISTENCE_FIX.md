# 🐛 Image Persistence Issue - FIXED

## Problem
Admin uploads images that were stored in the database, but after some time, when users visit the website, exhibition images are not visible.

### Root Cause
The application was using **local file storage** (`/server/uploads` directory) to save images. However, when deployed on serverless platforms like Vercel or Render:
- The local filesystem is **ephemeral** (temporary)
- Files are deleted after deployment or server restart
- This causes all uploaded images to disappear

## Solution
Updated the blob storage service to use **Vercel Blob Storage**, which provides persistent, cloud-based file storage.

### What Changed

#### 1. **Updated `server/services/blobStorage.js`**
   - Now uses `@vercel/blob` package for persistent cloud storage
   - Automatically uploads files to Vercel Blob when `BLOB_READ_WRITE_TOKEN` is configured
   - Falls back to local storage if Vercel Blob is not available
   - Compatible with both Vercel and Render deployments

#### 2. **Updated `server/package.json`**
   - Added `@vercel/blob` dependency: `"^0.23.4"`

#### 3. **Updated `server/.env`**
   - Added `BLOB_READ_WRITE_TOKEN` environment variable

#### 4. **Created `server/.env.example`**
   - Documents all required environment variables

## Deployment Instructions

### For Render Deployment
1. **Set Environment Variable in Render:**
   - Go to your Render service settings
   - Add environment variable: `BLOB_READ_WRITE_TOKEN`
   - Value: `vercel_blob_rw_BznvK71vWxwTBqcX_6K4ta3pQu1esqEpLIh4oAPomnTHUdD`

2. **Redeploy your service:**
   - Push code changes to your repository
   - Render will automatically redeploy with the new configuration

### For Local Development
```bash
cd server
npm install    # Install @vercel/blob package
npm start      # Start server
```

The `.env` file already contains the `BLOB_READ_WRITE_TOKEN`, so images will be stored in Vercel Blob locally as well.

## Verification
After deployment:
1. Admin uploads an image for exhibition
2. Image is stored in Vercel Blob (persistent cloud storage)
3. URL is saved to MongoDB database
4. Refresh page, restart server, or redeploy - image will still be visible ✅

## Technical Details

### How It Works
1. When admin uploads image:
   ```
   Image File → Vercel Blob Storage (persistent)
   ↓
   URL returned → Saved to MongoDB
   ```

2. When user views exhibition:
   ```
   MongoDB → Image URL (from Vercel Blob)
   ↓
   Browser → Displays image from Vercel Blob CDN (fast & reliable)
   ```

### Benefits
✅ **Persistent** - Images survive server restarts and redeployments  
✅ **Scalable** - No database bloat (only URLs stored)  
✅ **Fast** - Served from Vercel Blob CDN  
✅ **Reliable** - No dependency on local filesystem  
✅ **Fallback** - Still works with local storage if Blob is unavailable

## Important Notes
⚠️ **Do NOT remove the `BLOB_READ_WRITE_TOKEN`** from Render environment variables, or images will be stored locally again and will disappear after deployment.

For questions or issues, check the Vercel Blob documentation: https://vercel.com/docs/storage/vercel-blob
