# Tap To Smile NGO – API Contracts

## Base URL
```
/api
```

## Common Response Format
**Success:**
```json
{
  "success": true,
  "data": {...}
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## 1. Volunteer API
**Endpoint:** `POST /api/forms/volunteer`

**Request Body:**
```json
{
  "full_name": "string",
  "email": "string",
  "phone": "string",
  "city": "string",
  "interest_area": "string"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Volunteer registered successfully"
}
```

## 2. Contact API
**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Message received"
}
```

## 3. Programs API
**Get All Programs:** `GET /api/programs`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "short_description": "string",
      "icon": "string",
      "cover_image": "string"
    }
  ]
}
```

## 4. Projects API
**Get All Projects:** `GET /api/projects`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "program": "string",
      "date": "YYYY-MM-DD",
      "thumbnail": "string"
    }
  ]
}
```

## 5. Events API
**Get All Events:** `GET /api/events`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "string",
      "date": "YYYY-MM-DD",
      "location": "string",
      "is_upcoming": true
    }
  ]
}
```

## 6. Admin API (Protected)
**Auth Header Required:** `Authorization: Bearer <token>` (Except for Login)

### 6.1 Admin Login
**Endpoint:** `POST /api/admin/login`

**Request Body (Form Data):**
```
username: (string) Admin Email
password: (string) Admin Password
```

**Success Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1Ni...",
  "token_type": "bearer"
}
```

### 6.2 Get Current Admin Profile
**Endpoint:** `GET /api/admin/me`

**Success Response:**
```json
{
  "name": "Kshitij Admin",
  "email": "admin@taptosmile.org",
  "is_active": true,
  "role": "superadmin",
  "id": "696a6c7ca894652eb4bbc56c",
  "created_at": "2026-01-16T16:51:08.739000"
}
```

### 6.3 Get All Admins (Superadmin Only)
**Endpoint:** `GET /api/admin/`

**Success Response:**
```json
[
  {
    "name": "Admin Two",
    "email": "admin2@taptosmile.org",
    "is_active": true,
    "role": "admin",
    "id": "...",
    "created_at": "..."
  }
]
```

### 6.4 Register New Admin
**Endpoint:** `POST /api/admin/register`

**Request Body:**
```json
{
  "name": "New Admin",
  "email": "new@taptosmile.org",
  "password": "strongpassword123",
  "role": "admin",
  "is_active": true
}
```

### 6.5 Update Admin
**Endpoint:** `PUT /api/admin/{admin_id}`

**Request Body:**
```json
{
  "name": "Updated Name",
  "role": "superadmin",
  "is_active": false
}
```

### 6.6 Delete Admin
**Endpoint:** `DELETE /api/admin/{admin_id}`

**Success Response:**
```json
{
  "success": true,
  "message": "Admin user deleted successfully"
}
```
