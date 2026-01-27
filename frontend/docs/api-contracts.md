# Tap To Smile NGO – API Contracts

## Base URL
/api

## Common Response Format
All APIs return this structure:

Success:
{
  "success": true,
  "data": {...}
}

Error:
{
  "success": false,
  "message": "Error description"
}

---

## 1. Volunteer API

### Endpoint
POST /api/volunteers

### Request Body
{
  "full_name": "string",
  "email": "string",
  "phone": "string",
  "city": "string",
  "interest_area": "string"
}

### Success Response
{
  "success": true,
  "message": "Volunteer registered successfully"
}

---

## 2. Contact API

### Endpoint
POST /api/contact

### Request Body
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}

### Success Response
{
  "success": true,
  "message": "Message received"
}

---

## 3. Programs API

### Get All Programs
GET /api/programs

### Response
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

---

## 4. Projects API

### Get All Projects
GET /api/projects

### Response
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

---

## 5. Events API

### Get All Events
GET /api/events

### Response
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
