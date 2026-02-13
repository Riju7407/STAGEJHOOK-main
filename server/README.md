# STAGEJHOOK Backend Server

Admin authentication server for STAGEJHOOK project.

## Features

✅ **Admin Login/Logout** - JWT-based authentication
✅ **Token Verification** - Secure token validation
✅ **Protected Routes** - Middleware for admin-only access
✅ **Password Hashing** - Bcryptjs for secure passwords
✅ **CORS Enabled** - Frontend integration ready
✅ **Error Handling** - Comprehensive error messages

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Edit `.env` file with your settings:

```
PORT=5000
JWT_SECRET=your_jwt_secret_key_change_this_in_production
FRONTEND_URL=http://localhost:5173
```

### 3. Start Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication Routes

**POST** `/api/auth/login`
- Login admin user
- Body: `{ email, password }`
- Returns: JWT token and admin info

**POST** `/api/auth/logout`
- Logout admin user
- Requires: Authorization header with token
- Returns: Success message

**GET** `/api/auth/profile`
- Get current admin profile
- Requires: Authorization header with token
- Returns: Admin details

**POST** `/api/auth/verify`
- Verify token validity
- Requires: Authorization header with token
- Returns: Admin info if valid

### Health Check

**GET** `/api/health`
- Check server status
- Returns: Server status and timestamp

## Default Admin Credentials

```
Email: admin@stagejhook.com
Password: admin123
```

⚠️ **CHANGE THESE IN PRODUCTION!**

## Usage with Frontend

### Authentication Header Format

```javascript
const token = localStorage.getItem('adminToken');
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

### Example Login Request

```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@stagejhook.com',
    password: 'admin123'
  })
});

const data = await response.json();
localStorage.setItem('adminToken', data.token);
```

## Project Structure

```
server/
├── server.js           # Main server file
├── package.json        # Dependencies
├── .env               # Environment variables
├── middleware/
│   └── auth.js        # Authentication middleware
├── routes/
│   └── auth.js        # Auth routes
└── models/
    └── Admin.js       # Admin model
```

## Next Steps

1. ✅ Connect MongoDB for persistent storage
2. ✅ Add refresh token mechanism
3. ✅ Implement email verification
4. ✅ Add role-based access control (RBAC)
5. ✅ Deploy to production server

## Security Notes

- Change `JWT_SECRET` in production
- Update default admin credentials
- Use HTTPS in production
- Implement rate limiting
- Add input validation
- Use environment variables for sensitive data
