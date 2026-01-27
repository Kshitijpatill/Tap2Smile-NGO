
# Tap To Smile NGO – API Contracts

## Base URL
```
http://localhost:8000/api
```

## Authentication
**Protected Routes** require the following Header:
```
Authorization: Bearer <your_access_token>
```

---

## 1. Programs API
**Prefix:** `/api/programs`

### 1.1 Get Active Programs (Public)
- **Endpoint:** `GET /`
- **Description:** Fetches a list of all *active* programs.
- **Response:**
```json
[
  {
    "title": "Project Kāla",
    "description": "Art classes for children.",
    "icon": "palette",
    "is_active": true,
    "id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "created_at": "2026-01-20T10:00:00Z",
    "updated_at": "2026-01-20T10:00:00Z"
  }
]
```

### 1.2 Get Single Program (Public)
- **Endpoint:** `GET /{program_id}`

### 1.3 Create Program (Admin Only) 🔒
- **Endpoint:** `POST /`
- **Body:**
```json
{
  "title": "Project Vidya",
  "description": "Education support.",
  "icon": "school",
  "is_active": true
}
```

### 1.4 Update Program (Admin Only) 🔒
- **Endpoint:** `PUT /{program_id}`

### 1.5 Delete Program (Admin Only) 🔒
- **Endpoint:** `DELETE /{program_id}`
- **Note:** Will fail if the program has linked projects.

---

## 2. Projects API
**Prefix:** `/api/projects`

### 2.1 Get Active Projects (Public)
- **Endpoint:** `GET /`
- **Query Params:** `?program_id={id}` (Optional filter)
- **Description:** Returns *only active* projects.
- **Response:**
```json
[
  {
    "title": "Slum Art Workshop",
    "description": "Painting session.",
    "location": "Mumbai",
    "images": ["url1.jpg"],
    "program_id": "65a1b...",
    "start_date": "2026-02-01",
    "end_date": "2026-02-05",
    "is_active": true,
    "id": "..."
  }
]
```

### 2.2 Get ALL Projects (Admin Dashboard) 🔒
- **Endpoint:** `GET /admin`
- **Query Params:** `?program_id={id}` (Optional)

### 2.3 Create Project (Admin Only) 🔒
- **Endpoint:** `POST /`
- **Body:**
```json
{
  "title": "New Workshop",
  "description": "Details...",
  "program_id": "Valid_Program_ObjectId",
  "start_date": "2026-05-01",
  "is_active": true
}
```

### 2.4 Update & Delete (Admin Only) 🔒
- **Update:** `PUT /{project_id}`
- **Delete:** `DELETE /{project_id}`

---

## 3. Events API
**Prefix:** `/api/events`

### 3.1 Get All Events (Public)
- **Endpoint:** `GET /`
- **Description:** Fetches a list of events.
- **Response:**
```json
[
  {
    "id": "65a1b2c3...",
    "title": "Charity Marathon",
    "description": "5km run for education.",
    "event_date": "2026-03-15",
    "location": "Pune",
    "is_upcoming": true,
    "created_at": "2026-01-22T10:00:00Z"
  }
]
```

### 3.2 Get Single Event (Public)
- **Endpoint:** `GET /{event_id}`
- **Response:** Returns the single EventResponse object (same structure as above).

### 3.3 Create Event (Admin Only) 🔒
- **Endpoint:** `POST /`
- **Body:**
```json
{
  "title": "Diwali Donation Drive",
  "description": "Distributing sweets and clothes.",
  "event_date": "2026-11-12",
  "location": "Mumbai",
  "is_upcoming": true
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Event created successfully",
  "id": "65a1b2c3..."
}
```

### 3.4 Update Event (Admin Only) 🔒
- **Endpoint:** `PUT /{event_id}`
- **Body:** (Same fields as Create)
- **Success Response:**
```json
{
  "success": true,
  "message": "Event updated successfully"
}
```

### 3.5 Delete Event (Admin Only) 🔒
- **Endpoint:** `DELETE /{event_id}`
- **Success Response:**
```json
{
  "success": true,
  "message": "Event deleted successfully"
}
```

---

## 4. Volunteers API (Forms)
**Prefix:** `/api/volunteers`

### 4.1 Submit Application (Public)
- **Endpoint:** `POST /`
- **Body:**
```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "phone": "9876543210",
  "city": "Pune",
  "interest_area": "Teaching"
}
```

### 4.2 List Volunteers (Admin Only) 🔒
- **Endpoint:** `GET /`

### 4.3 Update Status (Admin Only) 🔒
- **Endpoint:** `PATCH /{volunteer_id}/status`
- **Body:**
```json
{
  "status": "contacted"
}
```
*Allowed: `new`, `contacted`, `onboarded`, `rejected`*

### 4.4 Delete Application (Admin Only) 🔒
- **Endpoint:** `DELETE /{volunteer_id}`

---

## 5. Contact API
**Prefix:** `/api/contact`

### 5.1 Send Message (Public)
- **Endpoint:** `POST /`
- **Body:**
```json
{
  "name": "Anjali",
  "email": "anjali@test.com",
  "subject": "Partnership",
  "message": "We want to collaborate."
}
```

### 5.2 Manage Messages (Admin Only) 🔒
- **List:** `GET /`
- **Delete:** `DELETE /{message_id}`

---

## 6. Donations API
**Prefix:** `/api/donations`

### 6.1 Initiate Donation (Public)
- **Endpoint:** `POST /`
- **Body:**
```json
{
  "donor_name": "Rohan",
  "donor_email": "rohan@test.com",
  "amount": 500,
  "message": "Keep it up!"
}
```
*Response:* `{"payment_status": "initiated"}`

### 6.2 View Ledger (Admin Only) 🔒
- **Endpoint:** `GET /`

### 6.3 Update Payment Status (Admin Only) 🔒
- **Endpoint:** `PATCH /{donation_id}/status`
- **Body:** `{"status": "success"}`

---

## 7. Admin & Auth API
**Prefix:** `/api/admin`

### 7.1 Login (Public)
- **Endpoint:** `POST /login`
- **Request Type:** `application/x-www-form-urlencoded`
- **Fields:** `username` (Email), `password`
- **Response:**
```json
{
  "access_token": "eyJhbG...",
  "token_type": "bearer"
}
```

### 7.2 Get Profile (Protected) 🔒
- **Endpoint:** `GET /me`

### 7.3 Register New Admin (Superadmin Only) 🔒
- **Endpoint:** `POST /register`
- **Body:**
```json
{
  "name": "New Intern",
  "email": "intern@taptosmile.org",
  "password": "securePass123",
  "role": "admin",
  "is_active": true
}
```

### 7.4 User Management (Superadmin Only) 🔒
- **List:** `GET /`
- **Update:** `PUT /{admin_id}`
- **Delete:** `DELETE /{admin_id}`

---

## 8. Impact API
**Prefix:** `/api/impact`

### 8.1 Get Impact Stats (Public)
- **Endpoint:** `GET /`
- **Description:** Returns the counters/statistics for the homepage.
- **Response:**
```json
[
  {
    "id": "65a1b2c3...",
    "title": "Lives Impacted",
    "value": 200000,
    "icon": "group",
    "updated_at": "2026-01-22T10:00:00Z"
  }
]
```

### 8.2 Get Single Impact Stat (Public)
- **Endpoint:** `GET /{impact_id}`

### 8.3 Create Impact Stat (Admin Only) 🔒
- **Endpoint:** `POST /`
- **Body:**
```json
{
  "title": "Volunteers Joined",
  "value": 500,
  "icon": "diversity_3"
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Impact stat created successfully",
  "id": "65a1b2c3..."
}
```

### 8.4 Update Impact Stat (Admin Only) 🔒
- **Endpoint:** `PUT /{impact_id}`
- **Body:**
```json
{
  "title": "Volunteers Joined",
  "value": 600,
  "icon": "diversity_3"
}
```
- **Success Response:**
```json
{
  "success": true,
  "message": "Impact stat updated successfully"
}
```

### 8.5 Delete Impact Stat (Admin Only) 🔒
- **Endpoint:** `DELETE /{impact_id}`
- **Success Response:**
```json
{
  "success": true,
  "message": "Impact stat deleted successfully"
}
```


