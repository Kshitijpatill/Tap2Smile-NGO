# Tap2Smile Deployment & Testing Guide

## ✅ CHANGES COMMITTED TO GITHUB

All changes have been successfully committed and pushed to the `main-aryaa` branch:
- Repository: https://github.com/Kshitijpatill/Tap2Smile-NGO
- Branch: `main-aryaa`
- Latest Commits:
  1. "Fix: Complete UI/UX improvements - responsive design, currency fix, image fixes, hero slider, and backend setup"
  2. "feat: Enhanced Programs page with expandable project sections and detailed content"

## 🚀 TO SEE CHANGES ON LIVE SITE

### Option 1: Deploy from GitHub (Recommended)
If your live site (https://taptosmile.org/) is connected to GitHub:

1. **Merge to Main Branch** (if needed):
   ```bash
   git checkout main
   git merge main-aryaa
   git push origin main
   ```

2. **Trigger Deployment**:
   - If using Vercel/Netlify: They auto-deploy on push to main
   - If using manual deployment: Pull latest code on server and rebuild

### Option 2: Build and Deploy Manually

1. **Build Frontend**:
   ```bash
   cd frontend
   npm install
   npm run build
   ```

2. **Upload `dist` folder** to your web server

3. **Setup Backend** (if not already running):
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
   ```

## 🔧 BACKEND API TESTING

### Prerequisites
You need Python and pip installed. To install dependencies:

```bash
cd backend
python -m pip install -r requirements.txt
```

### Start Backend Server
```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

### Test API Endpoints

Once server is running, visit: http://localhost:8000/api/docs

#### Available Endpoints:

1. **Programs API**
   - GET `/api/programs/` - Get all programs
   - POST `/api/programs/` - Create program (requires auth)
   - GET `/api/programs/{id}` - Get single program
   - PUT `/api/programs/{id}` - Update program (requires auth)
   - DELETE `/api/programs/{id}` - Delete program (requires auth)

2. **Impact Stats API**
   - GET `/api/impact/` - Get all impact stats
   - POST `/api/impact/` - Create stat (requires auth)
   - GET `/api/impact/{id}` - Get single stat
   - PUT `/api/impact/{id}` - Update stat (requires auth)
   - DELETE `/api/impact/{id}` - Delete stat (requires auth)

3. **Events API**
   - GET `/api/events/` - Get all events
   - POST `/api/events/` - Create event (requires auth)
   - GET `/api/events/{id}` - Get single event
   - PUT `/api/events/{id}` - Update event (requires auth)
   - DELETE `/api/events/{id}` - Delete event (requires auth)

4. **Contact API**
   - POST `/api/contact/` - Submit contact form

5. **Volunteers API**
   - POST `/api/volunteers/` - Submit volunteer form

6. **Donations API**
   - POST `/api/donations/` - Submit donation pledge

### Testing with curl

```bash
# Test Programs API
curl http://localhost:8000/api/programs/

# Test Impact Stats
curl http://localhost:8000/api/impact/

# Test Events
curl http://localhost:8000/api/events/

# Submit Contact Form
curl -X POST http://localhost:8000/api/contact/ \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Test","message":"Testing"}'
```

## 📊 SEED DATA FOR TESTING

### Create Sample Programs
```bash
curl -X POST http://localhost:8000/api/programs/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Program Kāala",
    "description": "Conducting Art classes for the underprivileged crowd especially children who have talent but no resources.",
    "icon": "Palette",
    "cover_image": "/assets/artisticexpression.jpg",
    "is_active": true
  }'
```

### Create Sample Impact Stats
```bash
curl -X POST http://localhost:8000/api/impact/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lives Impacted",
    "value": "200,000+",
    "icon": "Users"
  }'
```

### Create Sample Event
```bash
curl -X POST http://localhost:8000/api/events/ \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Community Health Camp",
    "description": "Free health checkup and awareness session",
    "event_date": "2026-03-15",
    "location": "Mumbai, Maharashtra",
    "is_active": true,
    "is_upcoming": true
  }'
```

## 🎨 WHAT'S NEW IN THE FRONTEND

### 1. Programs Page - MAJOR UPDATE
- **Expandable Sections**: Each program now has a "View Projects" button
- **Project Cards**: Shows 4 detailed projects under each program
- **Images**: All projects have matching images from your assets
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Content**: Based on the images you provided

Programs now include:
- **Program Kāala**: Art Workshops, Dance Classes, Music Training, Talent Showcases
- **Program Ātman**: Yoga Sessions, Mental Health Talks, Sports Day, Fitness Camps
- **Program Seva**: Food Drives, Clothes Distribution, Blood Donation, Grocery Kits
- **Program Vidya**: Scholarship Programs, School Kits, Career Counseling, Tech Labs
- **Awareness**: Flash Mobs, Road Shows, Marathons, Art Campaigns

### 2. All Pages Responsive
- Mobile (320px+): ✅
- Tablet (768px+): ✅
- Desktop (1024px+): ✅
- Large Desktop (1440px+): ✅

### 3. Images Fixed
- No more grayscale on mobile
- Proper aspect ratios
- Responsive borders
- All images load correctly

### 4. Currency Fixed
- All ₹ symbols instead of $
- Donation amounts in INR

### 5. Hero Slider Fixed
- Navigation buttons work
- Auto-play works
- Smooth transitions

## 🔐 BACKEND CONFIGURATION

### Environment Variables (.env file created)
```
MONGODB_URI=mongodb+srv://tap2smile_admin:femv0VcnFCtkDGj2@tap2smile-cluster.snfltoj.mongodb.net/?appName=tap2smile-cluster
MAIL_USERNAME=kshitijpatil2024@gmail.com
MAIL_PASSWORD=enrr yenf hpxy ljlr
MAIL_FROM=kshitijpatil2024@gmail.com
SECRET_KEY=2a5db0c7e8790c89dce6b3e0166e22282580e93b193db9a84bcc7d8dc259dde6
```

### Database Collections
- `programs` - Program information
- `projects` - Projects under programs
- `events` - Events and activities
- `impact_stats` - Impact statistics
- `volunteers` - Volunteer registrations
- `contacts` - Contact form submissions
- `donations` - Donation pledges
- `admins` - Admin users

## 📝 WHAT STILL NEEDS TO BE DONE

### 1. Install Python Dependencies
Your system doesn't have pip installed. You need to:
1. Install Python properly with pip
2. Or use a virtual environment
3. Then run: `pip install -r backend/requirements.txt`

### 2. Populate Database
Once backend is running, you need to add:
- Programs data
- Impact statistics
- Events
- Admin users

### 3. Test All Forms
- Contact form submission
- Volunteer form submission
- Donation form submission

### 4. Deploy to Production
- Build frontend: `npm run build`
- Upload to server
- Configure domain
- Setup SSL certificate

## 🎯 QUICK START CHECKLIST

- [x] Code committed to GitHub (main-aryaa branch)
- [x] Frontend UI/UX fixed
- [x] Programs page restructured
- [x] Images fixed
- [x] Currency changed to INR
- [x] Hero slider fixed
- [x] Responsive design implemented
- [x] Backend .env configured
- [ ] Install Python dependencies
- [ ] Start backend server
- [ ] Test API endpoints
- [ ] Populate database with seed data
- [ ] Deploy to production
- [ ] Test live site

## 🆘 TROUBLESHOOTING

### Frontend Not Updating?
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Check if you're on the right branch
4. Rebuild: `npm run build`

### Backend Not Starting?
1. Check Python installation: `python --version`
2. Check pip: `python -m pip --version`
3. Install dependencies: `python -m pip install -r requirements.txt`
4. Check MongoDB connection in .env

### Images Not Loading?
1. Check image paths in code
2. Verify images exist in `frontend/public/assets/`
3. Check browser console for 404 errors

## 📞 SUPPORT

If you need help:
1. Check the error messages in browser console (F12)
2. Check backend logs if API calls fail
3. Verify all environment variables are set
4. Make sure MongoDB is accessible

---

**Last Updated**: February 7, 2026
**Status**: Code Ready - Needs Deployment
**Branch**: main-aryaa
