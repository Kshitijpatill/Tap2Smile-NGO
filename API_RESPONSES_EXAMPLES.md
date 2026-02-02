# Admin Panel - Example API Responses & Data Structures

## Programs

### Request
```javascript
await api.fetchPrograms();
// GET http://127.0.0.1:8000/api/programs
```

### Response
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Community Education",
    "description": "Providing quality education to underprivileged children",
    "icon": "📚",
    "is_active": true,
    "created_at": "2026-01-15T10:30:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Healthcare Initiative",
    "description": "Medical camps and health awareness programs",
    "icon": "🏥",
    "is_active": true,
    "created_at": "2026-01-20T14:45:00Z"
  }
]
```

### Frontend After Normalization
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "_id": "507f1f77bcf86cd799439011",
    "title": "Community Education",
    "description": "Providing quality education to underprivileged children",
    "icon": "📚",
    "is_active": true,
    "created_at": "2026-01-15T10:30:00Z"
  },
  ...
]
```

### Create Request
```javascript
await api.createProgram({
  title: "Skills Training",
  description: "Vocational training for job seekers",
  icon: "🎓",
  is_active: true
});
// POST /api/programs
// Content-Type: application/json
// Body: { title, description, icon, is_active }
```

### Update Request
```javascript
await api.updateProgram("507f1f77bcf86cd799439011", {
  title: "Advanced Skills Training",
  is_active: false
});
// PUT /api/programs/507f1f77bcf86cd799439011
```

### Delete Request
```javascript
await api.deleteProgram("507f1f77bcf86cd799439011");
// DELETE /api/programs/507f1f77bcf86cd799439011
```

---

## Events

### Request
```javascript
await api.fetchEvents();
```

### Response
```json
[
  {
    "_id": "607f1f77bcf86cd799439011",
    "title": "Community Cleanup Drive",
    "description": "Clean up local neighborhoods",
    "event_date": "2026-02-20",
    "location": "Central Park",
    "is_upcoming": true,
    "created_at": "2026-01-10T09:00:00Z"
  },
  {
    "_id": "607f1f77bcf86cd799439012",
    "title": "Blood Donation Camp",
    "description": "Health camp for blood donation",
    "event_date": "2026-03-10",
    "location": "City Hospital",
    "is_upcoming": true,
    "created_at": "2026-01-12T11:30:00Z"
  }
]
```

### Create Request
```javascript
await api.createEvent({
  title: "Educational Workshop",
  description: "Skills development workshop",
  event_date: "2026-04-15",
  location: "Community Center",
  is_upcoming: true
});
```

---

## Projects

### Request
```javascript
await api.fetchProjects();
```

### Response
```json
[
  {
    "_id": "707f1f77bcf86cd799439011",
    "title": "School Building Construction",
    "description": "Building new classrooms and library",
    "location": "Village Rampur",
    "program_id": "507f1f77bcf86cd799439011",
    "start_date": "2026-02-01",
    "end_date": "2026-08-31",
    "is_active": true,
    "created_at": "2025-12-15T15:20:00Z"
  },
  {
    "_id": "707f1f77bcf86cd799439012",
    "title": "Water Well Installation",
    "description": "Install water wells in 5 villages",
    "location": "District Area",
    "program_id": "507f1f77bcf86cd799439012",
    "start_date": "2026-01-15",
    "end_date": "2026-06-15",
    "is_active": true,
    "created_at": "2025-12-01T08:45:00Z"
  }
]
```

### Create Request
```javascript
await api.createProject({
  title: "Medical Clinic Setup",
  description: "Set up primary health center",
  location: "Coastal Region",
  program_id: "507f1f77bcf86cd799439012",
  start_date: "2026-03-01",
  end_date: "2026-09-30",
  is_active: true
});
```

---

## Volunteers (Read-Only)

### Request
```javascript
await api.fetchVolunteers();
```

### Response
```json
[
  {
    "_id": "807f1f77bcf86cd799439011",
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "phone": "+91-9876543210",
    "city": "Delhi",
    "interest_area": "Education",
    "status": "active",
    "created_at": "2025-11-20T10:15:00Z"
  },
  {
    "_id": "807f1f77bcf86cd799439012",
    "name": "Priya Singh",
    "email": "priya@example.com",
    "phone": "+91-9876543211",
    "city": "Mumbai",
    "interest_area": "Healthcare",
    "status": "pending",
    "created_at": "2026-01-05T14:30:00Z"
  },
  {
    "_id": "807f1f77bcf86cd799439013",
    "name": "Ahmed Khan",
    "email": "ahmed@example.com",
    "phone": "+91-9876543212",
    "city": "Bangalore",
    "interest_area": "Skills Training",
    "status": "approved",
    "created_at": "2025-12-10T09:45:00Z"
  }
]
```

**Status Options:** `pending` | `approved` | `active` | `inactive`

### Frontend UI
- ✅ Shows volunteer list
- ❌ No edit button
- ❌ No add button
- ❌ No create functionality
- ✅ Delete only (read-only view, deletable by admin)
- ✅ View all volunteer details

---

## Contact Messages (Read-Only)

### Request
```javascript
await api.fetchContacts();
```

### Response
```json
[
  {
    "_id": "907f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Partnership Inquiry",
    "message": "We would like to partner with your NGO for our CSR initiative.",
    "created_at": "2026-01-25T16:20:00Z"
  },
  {
    "_id": "907f1f77bcf86cd799439012",
    "name": "Sarah Johnson",
    "email": "sarah@example.com",
    "subject": "Volunteer Registration",
    "message": "I'm interested in volunteering for your education program.",
    "created_at": "2026-01-28T11:50:00Z"
  },
  {
    "_id": "907f1f77bcf86cd799439013",
    "name": "Mr. Patel",
    "email": "patel@company.com",
    "subject": "Donation Offer",
    "message": "Our company would like to make a significant donation.",
    "created_at": "2026-02-01T09:30:00Z"
  }
]
```

### Frontend UI
- ✅ Shows contact messages in list
- ✅ Display name, email, subject, message
- ❌ No edit button
- ❌ No add button
- ✅ Delete button (to remove spam)
- ✅ Shows creation date
- ✅ Expandable message view

---

## Impact Stats

### Request
```javascript
await api.fetchImpact();
```

### Response
```json
[
  {
    "_id": "a07f1f77bcf86cd799439011",
    "title": "People Helped",
    "value": 5000,
    "icon": "🤝",
    "created_at": "2025-12-01T10:00:00Z"
  },
  {
    "_id": "a07f1f77bcf86cd799439012",
    "title": "Children Educated",
    "value": 1250,
    "icon": "📚",
    "created_at": "2025-12-01T10:00:00Z"
  },
  {
    "_id": "a07f1f77bcf86cd799439013",
    "title": "Villages Supported",
    "value": 42,
    "icon": "🏘️",
    "created_at": "2025-12-01T10:00:00Z"
  },
  {
    "_id": "a07f1f77bcf86cd799439014",
    "title": "Healthcare Services",
    "value": 3500,
    "icon": "🏥",
    "created_at": "2025-12-01T10:00:00Z"
  }
]
```

### Create Request
```javascript
await api.createImpact({
  title: "Trees Planted",
  value: 10000,
  icon: "🌱"
});
```

### Update Request
```javascript
await api.updateImpact("a07f1f77bcf86cd799439011", {
  value: 5500
});
```

---

## Error Responses

### 404 Not Found
```json
{
  "detail": "Program not found"
}
```

### 400 Bad Request
```json
{
  "detail": "Invalid input data"
}
```

### 500 Server Error
```json
{
  "detail": "Internal server error"
}
```

### Frontend Error Handling
```javascript
try {
  await api.deleteProgram(id);
} catch (error) {
  // error.message will be one of:
  // - "Program not found"
  // - "Invalid input data"
  // - "HTTP 500"
  console.error(error.message);
  setError(`Failed to delete program: ${error.message}`);
}
```

---

## Frontend Form Validation

### Programs Form Fields
```javascript
{
  title: "Community Service",        // text, required
  description: "Help others...",     // textarea, required
  icon: "💪",                        // text, optional
  is_active: true                    // checkbox, default: true
}
```

### Events Form Fields
```javascript
{
  title: "Cleanup Drive",            // text, required
  description: "Clean parks...",     // textarea, required
  event_date: "2026-02-15",         // date, required
  location: "Central Park",          // text, optional
  is_upcoming: true                  // checkbox, default: true
}
```

### Projects Form Fields
```javascript
{
  title: "School Building",          // text, required
  description: "Build classrooms",   // textarea, required
  location: "Village X",             // text, optional
  program_id: "507f...",            // text, optional
  start_date: "2026-02-01",         // date, optional
  end_date: "2026-08-31",           // date, optional
  is_active: true                    // checkbox, default: true
}
```

### Impact Form Fields
```javascript
{
  title: "People Helped",            // text, required
  value: 5000,                       // number, required
  icon: "🤝"                         // text, optional
}
```

---

## Database ID Reference

All IDs follow MongoDB ObjectId format:
- **Pattern:** `507f1f77bcf86cd799439011` (24 hex characters)
- **Field Name:** `_id` (in database), `id` (in frontend after normalization)
- **Example:** `"507f1f77bcf86cd799439011"`

---

## API Rate Limiting & Performance

- No rate limiting implemented in Phase 1
- Data loaded on section change
- Pagination: Not implemented (load all)
- Search/Filter: Not implemented
- Sorting: Not implemented

### Future Enhancements
- Implement pagination for large datasets
- Add search functionality
- Add filtering by status
- Add sorting options

---

## Testing Data

### Create Test Program
```javascript
await api.createProgram({
  title: "Test Program " + new Date().getTime(),
  description: "This is a test program",
  icon: "✅",
  is_active: true
});
```

### List All Programs
```javascript
const programs = await api.fetchPrograms();
console.table(programs);
```

### Update First Program
```javascript
const [first] = await api.fetchPrograms();
await api.updateProgram(first.id, {
  title: "Updated: " + first.title,
  is_active: !first.is_active
});
```

### Delete Program by ID
```javascript
await api.deleteProgram("507f1f77bcf86cd799439011");
```

---

*API Reference Last Updated: February 2, 2026*
