# Render Deployment Guide

## 🚀 Overview

This guide explains how to deploy STAGEJHOOK to Render Cloud with MongoDB Atlas and Vercel Blob storage.

---

## ✅ Prerequisites

1. **GitHub Repository** - Code pushed to GitHub (Done ✓)
2. **MongoDB Atlas Account** - Database connection string ready
3. **Vercel Blob Token** - Image storage token (from Vercel account or similar)
4. **Render Account** - Free tier available

---

## 📋 Step 1: Prepare Environment Variables

Before deploying, gather these environment variables:

```
JWT_SECRET=generate_a_strong_random_string_here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxx
FRONTEND_URL=https://your-deployed-frontend.com
```

---

## 🔧 Step 2: Deploy to Render

### Option A: Using render.yaml (Recommended)

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Connect GitHub Repository**:
   - Click "New Web Service"
   - Connect your GitHub account
   - Select STAGEJHOOK-main repository
3. **Render will auto-detect render.yaml**
4. **Set Environment Variables** in Render Dashboard:
   - Add each variable from Step 1 with **Scoped** access
   - Render will inject them automatically

### Option B: Manual Configuration

1. **Create Web Service on Render**
2. **Configure Service**:
   - **Name**: stagejhook-backend
   - **Environment**: Node
   - **Build Command**: `cd server && npm install && cd ..`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier

3. **Add Environment Variables**:
   - Go to "Environment" tab
   - Add all variables from Step 1

---

## 🔐 Step 3: Set Environment Variables on Render

In your Render service dashboard:

1. Click **"Environment"**
2. Add each variable:
   - **NODE_ENV** = `production`
   - **JWT_SECRET** = (generate strong random string)
   - **MONGODB_URI** = (your MongoDB Atlas connection)
   - **BLOB_READ_WRITE_TOKEN** = (your Vercel Blob token)
   - **FRONTEND_URL** = `https://your-frontend-url.com` (update after frontend deploy)

---

## 🐛 Step 4: Troubleshooting Deployment Errors

### Error: `ERR_MODULE_NOT_FOUND: Cannot find package 'express'`

**Cause**: Dependencies not installed in server directory

**Solution** (Already Fixed ✓):
- `server-start.js` entry point handles this
- `render.yaml` ensures `cd server && npm install`
- Root `npm start` uses new entry point

### Error: `Cannot find module '/opt/render/project/src/server/server.js'`

**Cause**: Wrong working directory

**Solution** (Already Fixed ✓):
- Application uses monorepo structure
- Entry point (`server-start.js`) handles directory navigation
- Render.yaml specifies correct build steps

### Error: `EADDRINUSE: address already in use :::5000`

**Cause**: Port 5000 already in use

**Solution**:
- Render enforces unique port assignment
- Should auto-resolve after redeploy
- Check no other services running on same instance

### Error: `MONGODB_URI is not set`

**Cause**: Environment variable not configured on Render

**Solution**:
1. Go to Render service > Environment
2. Add `MONGODB_URI` with your MongoDB Atlas connection string
3. Redeploy service

---

## 📊 Deployment Configuration Explained

### render.yaml

```yaml
services:
  - type: web
    name: stagejhook-backend
    env: node
    plan: free
    rootDir: ./
    buildCommand: cd server && npm install && cd ..
    startCommand: npm start
```

**Key Points**:
- `type: web` - Web service (API)
- `env: node` - Node.js environment
- `plan: free` - Free tier (limited resources)
- `rootDir: ./` - Root of repository
- `buildCommand` - Installs server dependencies
- `startCommand` - Runs `npm start` from root (which calls `server-start.js`)

### server-start.js

```javascript
// Spawns: npm start in the server directory
// This ensures proper node_modules resolution
// Built-in entry point for production deployments
```

---

## 🚀 Step 5: Deploy

### First Deploy

1. Push latest code to main branch
2. Render auto-detects changes (if using GitHub integration)
3. Or click **"Deploy latest commit"** in Render dashboard

### Check Deployment Status

1. Go to Render Dashboard
2. Click your service
3. Check **Events** tab for build progress
4. Check **Logs** tab for runtime messages

### Expected Logs on Successful Deploy

```
✅ Server running on http://localhost:5000
📝 API Base URL: http://localhost:5000/api
🔗 Frontend URL: https://your-frontend-url.com
✅ Connected to MongoDB
✅ Default admin user already exists
```

---

## 🔗 Step 6: Connect Frontend (Optional)

After backend is deployed:

1. **Get Backend URL** from Render dashboard (e.g., `https://stagejhook-backend.onrender.com`)
2. Update frontend `adminAuthAPI.js`:

```javascript
const API_BASE_URL = 'https://stagejhook-backend.onrender.com/api';
```

3. Deploy frontend to Render/Vercel
4. Update `FRONTEND_URL` on backend service

---

## 📱 Testing Deployed Application

### Test API Health

```bash
curl https://stagejhook-backend.onrender.com/api/health
```

Expected response:
```json
{
  "status": "Server is running",
  "database": "connected",
  "timestamp": "2024-02-13T10:30:00.000Z"
}
```

### Test Admin Login

Use curl or Postman:

```bash
curl -X POST https://stagejhook-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@stagejhook.com",
    "password": "admin123"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": { ... }
}
```

---

## 🔐 Security Checklist

Before production deployment:

- [ ] Change default admin password
- [ ] Generate new JWT_SECRET (strong random string)
- [ ] Verify BLOB_READ_WRITE_TOKEN is kept secret
- [ ] Verify MONGODB_URI with secure credentials
- [ ] Set NODE_ENV=production
- [ ] Enable CORS for correct frontend URL only
- [ ] Review all environment variables are set
- [ ] Test authentication flows
- [ ] Test image upload functionality

---

## 📊 Monitoring Deployed Application

### View Logs

1. Render Dashboard > Service > Logs tab
2. Real-time logs of API requests and errors

### Check Resource Usage

1. Render Dashboard > Service > Overview tab
2. Monitor CPU, memory, and bandwidth usage
3. Free tier has limits (be aware if traffic grows)

### Restart Service

1. Render Dashboard > Service > More > Restart
2. Useful if service hangs or needs reset

---

## 🔄 Redeployment

### Auto-Redeploy on Git Push

When connected to GitHub, Render automatically redeploys on push to main branch.

### Manual Redeploy

1. Render Dashboard > Service
2. Click **"Deploy latest commit"** button
3. Or push new commit to trigger auto-deploy

### Update Environment Variables

1. Change variable value in Render Dashboard
2. Click **"Save"**
3. Service auto-restarts with new values

---

## 💡 Performance Tips

1. **Free Tier Limits**:
   - Auto-spins down after 15 mins of inactivity
   - ~400 hours per month
   - Limited RAM and CPU

2. **Upgrade to Paid**:
   - Paid tier keeps service always running
   - More reliable for production
   - Recommended when traffic grows

3. **Image Optimization**:
   - Vercel Blob handles CDN caching
   - Image URLs are cached automatically
   - No image caching configuration needed

---

## 🆘 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Service won't start | Dependencies missing | Redeploy, check build logs |
| CORS errors | FRONTEND_URL not set | Update FRONTEND_URL environment variable |
| Can't upload images | BLOB token missing | Add BLOB_READ_WRITE_TOKEN to environment |
| MongoDB connection fails | Connection string invalid | Verify MONGODB_URI in dashboard |
| Slow startup | Cold start on free tier | Upgrade to paid tier for always-on service |

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Vercel Blob**: https://vercel.com/docs/storage/vercel-blob
- **Express.js**: https://expressjs.com/

---

## ✨ You're All Set!

Your STAGEJHOOK backend is ready for production deployment. Follow these steps and your API will be live on Render! 🚀

For issues:
1. Check Render logs
2. Verify all environment variables are set
3. Test locally before deploying
4. Reference troubleshooting section above
