# Backend Setup & API Integration Guide

## Current Status

### ✅ What's Working
- Frontend is configured to fetch from API
- API service is properly set up (`/api/impact`, `/api/programs`, `/api/events`)
- Falls back to hardcoded data when API is unavailable
- Backend code is ready and configured

### ❌ What's Not Working
- Backend server is not running (pip not installed)
- Database is empty (no data)
- API calls are failing, using fallback data

## The Problem

When you see the impact stats (200,000+ Lives Impacted, etc.), that data is **hardcoded** in the frontend because:

1. Backend server is not running
2. API endpoint `/api/impact` returns 404
3. Frontend falls back to `defaultStats`

## The Solution

You need to:
1. Install Python dependencies
2. Start the backend server
3. Populate the database with seed data
4. Frontend will automatically fetch from API

---

## Step-by-Step Setup

### Step 1: Install Python & pip

**Check if you have Python:**
```bash
python --version
```

**If not installed, download from:**
https://www.python.org/downloads/

**Make sure to check "Add Python to PATH" during installation!**

### Step 2: Install Backend Dependencies

```bash
cd backend
python -m pip install -r requirements.txt
```

**Required packages:**
- fastapi
- uvicorn
- motor (MongoDB driver)
- pydantic
- python-dotenv
- python-multipart
- passlib
- python-jose
- bcrypt

### Step 3: Verify MongoDB Connection

Your `.env` file is already configured:
```
MONGODB_URI=mongodb+srv://tap2smile_admin:femv0VcnFCtkDGj2@tap2smile-cluster.snfltoj.mongodb.net/?appName=tap2smile-cluster
```

### Step 4: Start Backend Server

```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

**You should see:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete.
```

### Step 5: Seed the Database

**In a new terminal:**
```bash
cd backend
python seed_data.py
```

**This will populate:**
- ✅ 4 Impact Stats (Lives Impacted, Meals Served, etc.)
- ✅ 5 Programs (Kāala, Ātman, Seva, Vidya, Awareness)
- ✅ 3 Sample Events

### Step 6: Test the API

**Open in browser:**
- API Docs: http://localhost:8000/api/docs
- Impact Stats: http://localhost:8000/api/impact
- Programs: http://localhost:8000/api/programs
- Events: http://localhost:8000/api/events

**Or use curl:**
```bash
curl http://localhost:8000/api/impact
```

### Step 7: Verify Frontend Integration

1. **Keep backend running** on port 8000
2. **Keep frontend running** on port 5174
3. **Open**: http://localhost:5174
4. **Check browser console** (F12) - should see API calls succeeding
5. **Impact stats** should now come from database!

---

## How to Verify It's Working

### Before (Using Hardcoded Data):
- Open browser console (F12)
- See: `Failed to fetch impact stats: [error]`
- Data shows: 200,000+, 500,000+, 10,000+, 1,200+

### After (Using API):
- Open browser console (F12)
- See: Successful API calls to `/api/impact`
- Data comes from MongoDB
- Can be updated via admin panel

---

## API Endpoints Reference

### Public Endpoints (No Auth Required)

**Impact Stats:**
```
GET /api/impact
Response: [
  {
    "id": "...",
    "title": "Lives Impacted",
    "value": "200,000+",
    "icon": "Users",
    "updated_at": "2026-02-07T..."
  }
]
```

**Programs:**
```
GET /api/programs
Response: [
  {
    "id": "...",
    "title": "Program Kāala",
    "description": "...",
    "icon": "Palette",
    "cover_image": "/assets/artisticexpression.jpg",
    "is_active": true
  }
]
```

**Events:**
```
GET /api/events
Response: [
  {
    "id": "...",
    "title": "Community Health Camp",
    "description": "...",
    "event_date": "2026-03-15",
    "location": "Mumbai, Maharashtra",
    "is_upcoming": true
  }
]
```

**Submit Forms:**
```
POST /api/contact
POST /api/volunteers
POST /api/donations
```

### Admin Endpoints (Auth Required)

```
POST /api/admin/login
POST /api/impact (create)
PUT /api/impact/{id} (update)
DELETE /api/impact/{id} (delete)
```

---

## Troubleshooting

### Issue 1: "pip is not recognized"

**Solution:**
```bash
# Use python -m pip instead
python -m pip install -r requirements.txt
```

### Issue 2: "No module named 'fastapi'"

**Solution:**
```bash
python -m pip install fastapi uvicorn motor pydantic python-dotenv
```

### Issue 3: "MongoDB connection failed"

**Check:**
1. Internet connection
2. MongoDB URI in `.env` file
3. Firewall not blocking MongoDB Atlas

### Issue 4: "Port 8000 already in use"

**Solution:**
```bash
# Use different port
python -m uvicorn app.main:app --reload --port 8001

# Update frontend vite.config.js proxy to point to 8001
```

### Issue 5: Frontend still shows hardcoded data

**Check:**
1. Backend is running on port 8000
2. Frontend proxy is configured (already done in vite.config.js)
3. Clear browser cache (Ctrl+F5)
4. Check browser console for errors

---

## Current Data Flow

### Without Backend (Current State):
```
Frontend → API Call → Fails → Uses defaultStats (hardcoded)
```

### With Backend (After Setup):
```
Frontend → API Call → Backend → MongoDB → Returns Data → Frontend Displays
```

---

## Files Created

1. **`backend/seed_data.py`** - Script to populate database
2. **`backend/.env`** - Environment variables (already created)
3. **`backend/requirements.txt`** - Python dependencies (already exists)

---

## Next Steps After Backend is Running

1. **Test all API endpoints** using http://localhost:8000/api/docs
2. **Create admin user** to manage data
3. **Update data** through admin panel
4. **Deploy backend** to production server
5. **Update frontend** to point to production API

---

## Production Deployment

### Backend:
1. Deploy to a server (Heroku, Railway, DigitalOcean, etc.)
2. Set environment variables
3. Get production URL (e.g., https://api.taptosmile.org)

### Frontend:
1. Update `BASE_URL` in `frontend/src/services/api.js`:
   ```javascript
   const BASE_URL = 'https://api.taptosmile.org/api';
   ```
2. Build: `npm run build`
3. Deploy `dist` folder

---

## Summary

**To make the site fetch from API instead of hardcoded data:**

1. ✅ Install Python with pip
2. ✅ Install dependencies: `python -m pip install -r requirements.txt`
3. ✅ Start backend: `python -m uvicorn app.main:app --reload --port 8000`
4. ✅ Seed database: `python seed_data.py`
5. ✅ Refresh frontend: http://localhost:5174
6. ✅ Check console: Should see successful API calls
7. ✅ Data now comes from MongoDB!

**The frontend code is already set up to use the API - you just need to start the backend!**
