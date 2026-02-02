# Quick Test Checklist - Admin Panel v1.1

## Prerequisites ✅
- [ ] Backend running: `uvicorn app.main:app --reload`
- [ ] Frontend running: `npm run dev`
- [ ] Both on localhost (backend: 8000, frontend: 5173/5174)

---

## Test 1: JWT Authentication
**Objective:** Verify admin can login with JWT

**Steps:**
1. Open http://localhost:5174/admin/login
2. Enter email: `admin@taptosmile.org`
3. Enter password: `admin123`
4. Click "Login to Dashboard"
5. Should redirect to programs page
6. Open DevTools (F12) → Storage → Session Storage
7. Verify `adminToken` key exists with long JWT string

**Expected Results:** ✅
- Login succeeds
- Redirects to /admin/dashboard/programs
- Token stored in sessionStorage
- Token is valid JWT (3 parts separated by dots)

---

## Test 2: Volunteers Section (Fixed)
**Objective:** Verify auth token is sent and volunteers load

**Steps:**
1. Click "Volunteers" in sidebar
2. Wait for data to load
3. Open DevTools → Network tab
4. Find request to `/api/volunteers`
5. Check Headers tab
6. Look for: `Authorization: Bearer eyJ...` (starts with "Bearer ")

**Expected Results:** ✅
- Volunteers section loads without error
- Network request includes Authorization header
- List of volunteers displays in cards
- Each card shows: name, email, phone, city, interest_area, status

---

## Test 3: Contacts Section (Fixed)
**Objective:** Verify auth token is sent and contacts load

**Steps:**
1. Click "Contact Messages" in sidebar
2. Wait for data to load
3. Open DevTools → Network tab
4. Find request to `/api/contacts`
5. Check Headers tab
6. Look for: `Authorization: Bearer eyJ...`

**Expected Results:** ✅
- Contacts section loads without error
- Network request includes Authorization header
- List of contact messages displays
- Each card shows: name, email, subject, message

---

## Test 4: Image Upload - Programs
**Objective:** Verify file upload works with FormData

**Steps:**
1. Navigate to Programs section
2. Click "Add New Program"
3. Fill form:
   - Title: "Test Education Program"
   - Description: "Learning program for underprivileged children"
   - Icon: "📚"
   - Program Image: **Select any .jpg or .png file**
   - Active: Checked
4. Click "Save Program"
5. Open DevTools → Network tab
6. Find POST request to `/api/programs`
7. Check Headers and see:
   - `Content-Type: multipart/form-data; boundary=...` (NOT application/json)
   - `Authorization: Bearer eyJ...`
8. Program should appear in the list below

**Expected Results:** ✅
- Form accepts file input
- Selected filename shows (e.g., "✓ photo.jpg")
- Request sent as multipart/form-data (not JSON)
- File successfully uploaded
- Program created and appears in list with image

---

## Test 5: Image Upload - Events
**Objective:** Verify event image upload

**Steps:**
1. Navigate to Events section
2. Click "Add New Event"
3. Fill form:
   - Title: "Community Cleanup Drive"
   - Description: "Join us for environmental cleanup"
   - Event Date: Pick any future date
   - Location: "Central Park"
   - Event Image: Select a .png or .jpg file
   - Upcoming: Checked
4. Click "Save Event"
5. Verify in Network tab: `multipart/form-data` header
6. Event should appear in list

**Expected Results:** ✅
- File upload works
- Request is multipart (not JSON)
- Event created with image

---

## Test 6: Image Upload - Projects
**Objective:** Verify project image upload

**Steps:**
1. Navigate to Projects section
2. Click "Add New Project"
3. Fill form with required fields + image file
4. Submit and verify multipart request
5. Project should appear in list

**Expected Results:** ✅
- Image upload works
- Request is multipart/form-data
- Project created successfully

---

## Test 7: Image Upload - Impact
**Objective:** Verify impact stats image upload

**Steps:**
1. Navigate to Impact Stats section
2. Click "Add New Impact Stat"
3. Fill form:
   - Title: "Lives Improved"
   - Value: "5000"
   - Icon: "❤️"
   - Impact Image: Select image file
4. Click "Save Impact Stat"
5. Verify multipart request in Network tab
6. Impact should appear in list

**Expected Results:** ✅
- Image upload works
- Request is multipart/form-data
- Impact stat created

---

## Test 8: Update with Image (Optional)
**Objective:** Verify editing items updates images

**Steps:**
1. In Programs section, click edit icon on any program
2. Change some fields (title, description)
3. Select NEW image file OR leave blank to keep existing
4. Click "Save Program"
5. Check Network: Should be multipart if file selected
6. Program should update with new image or keep old one

**Expected Results:** ✅
- Edit form opens with current data
- Can upload new image or skip image to keep old
- Update request includes file if selected
- Program updates successfully

---

## Test 9: Read-Only Sections (Volunteers & Contacts)
**Objective:** Verify read-only sections have no edit/add buttons

**Steps:**
1. Click "Volunteers"
2. Verify: NO "Add New Volunteer" button
3. Verify: Edit icons NOT visible on cards
4. Verify: Can still see delete buttons (might be for admin cleanup)
5. Repeat for "Contact Messages"

**Expected Results:** ✅
- Volunteers section is read-only
- No "Add New" button
- No edit icons
- Can only view data
- Same for Contacts

---

## Test 10: Logout & Re-login
**Objective:** Verify token is cleared on logout

**Steps:**
1. Click logout button (red button in sidebar)
2. Confirm logout
3. Should redirect to login page
4. Open DevTools → Session Storage
5. Verify `adminToken` is GONE
6. Try logging in again with correct credentials
7. Should work again

**Expected Results:** ✅
- Logout clears token from storage
- Login page displays
- Can login again
- New token issued on re-login

---

## Test 11: Wrong Credentials (Negative Test)
**Objective:** Verify wrong password shows error

**Steps:**
1. Go to http://localhost:5174/admin/login
2. Enter: admin@taptosmile.org / wrongpassword
3. Click Login
4. Should show red error message
5. Should NOT redirect
6. Should NOT store token

**Expected Results:** ✅
- Error message displayed: "Incorrect email or password"
- No token stored
- Stays on login page
- Can try again

---

## Test 12: Navigation Between Sections
**Objective:** Verify smooth navigation and auth persistence

**Steps:**
1. Login successfully
2. Click: Programs → Events → Projects → Impact → Volunteers → Contacts
3. Each section loads data
4. No auth errors
5. No token loss
6. Sidebar responsive (collapse/expand works)

**Expected Results:** ✅
- All sections load without auth errors
- Data displays correctly
- Token stays in storage
- Navigation smooth and fast
- Sidebar collapse/expand works

---

## Summary Checklist

| # | Test | Status | Notes |
|---|------|--------|-------|
| 1 | JWT Login | ⚪ | |
| 2 | Volunteers Load | ⚪ | |
| 3 | Contacts Load | ⚪ | |
| 4 | Program Image Upload | ⚪ | |
| 5 | Event Image Upload | ⚪ | |
| 6 | Project Image Upload | ⚪ | |
| 7 | Impact Image Upload | ⚪ | |
| 8 | Update with Image | ⚪ | |
| 9 | Read-Only Sections | ⚪ | |
| 10 | Logout/Login | ⚪ | |
| 11 | Wrong Credentials | ⚪ | |
| 12 | Navigation | ⚪ | |

**Status Legend:** ⚪ = Not started | 🟡 = In progress | 🟢 = Passed | 🔴 = Failed

---

## Troubleshooting

### Issue: "Could not validate credentials" error
**Solution:** 
- Check that token is being sent in Authorization header
- Verify backend is running and accessible
- Try logging out and back in
- Check DevTools → Network → Headers for Authorization

### Issue: Files not uploading
**Solution:**
- Check file size (backend may have limits)
- Verify file type is .jpg, .png, .gif, .webp
- Check Network tab for response errors
- Ensure backend directory has write permissions

### Issue: Volunteers/Contacts still not loading
**Solution:**
- Clear browser cache and sessionStorage
- Verify token is present in Storage tab
- Check Network tab for 401/403 errors
- Verify backend /api/volunteers and /api/contacts endpoints exist
- Check backend database has data in volunteers and contact_messages collections

### Issue: Network shows "multipart" but not "FormData"
**Solution:**
- This is normal! Browser automatically converts FormData to multipart
- Look for `Content-Type: multipart/form-data; boundary=...` header
- File should be visible in Request payload

---

## Performance Tips

1. **Network Optimization:**
   - Compress images before uploading (< 1MB)
   - Use PNG for graphics, JPG for photos

2. **Browser Optimization:**
   - Keep DevTools Network tab open while testing
   - Clear cache between major version changes
   - Use incognito window if caching issues occur

3. **Testing Tips:**
   - Test on different browsers (Chrome, Firefox, Edge)
   - Test on mobile device for responsive UI
   - Test with slow network in DevTools throttling

---

**Last Updated:** February 2, 2026  
**Admin Panel Version:** 1.1  
**Status:** Ready for comprehensive testing
