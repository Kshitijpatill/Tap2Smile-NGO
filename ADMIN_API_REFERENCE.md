# Quick Reference - Admin Panel API Endpoints

## Base URL
```
http://127.0.0.1:8000
```

## Programs
```javascript
import * as api from './admin/api';

// Fetch all programs
await api.fetchPrograms();
// → GET /api/programs

// Create program
await api.createProgram({
  title: "Community Service",
  description: "Help others",
  icon: "💪",
  is_active: true
});
// → POST /api/programs

// Update program
await api.updateProgram(id, {
  title: "Updated Title",
  is_active: false
});
// → PUT /api/programs/{id}

// Delete program
await api.deleteProgram(id);
// → DELETE /api/programs/{id}
```

## Events
```javascript
// Fetch all events
await api.fetchEvents();

// Create event
await api.createEvent({
  title: "Community Cleanup",
  description: "Clean up parks",
  event_date: "2026-02-15",
  location: "Central Park",
  is_upcoming: true
});

// Update event
await api.updateEvent(id, { title: "New Title" });

// Delete event
await api.deleteEvent(id);
```

## Projects
```javascript
// Fetch all projects
await api.fetchProjects();

// Create project
await api.createProject({
  title: "School Building",
  description: "Build new classrooms",
  location: "Village X",
  program_id: "507f1f77bcf86cd799439011",
  start_date: "2026-01-01",
  end_date: "2026-12-31",
  is_active: true
});

// Update project
await api.updateProject(id, { title: "Updated Title" });

// Delete project
await api.deleteProject(id);
```

## Volunteers (Read-only)
```javascript
// Fetch all volunteers
await api.fetchVolunteers();

// No create/update/delete
// View only
```

## Contacts (Read-only)
```javascript
// Fetch all contact messages
await api.fetchContacts();

// No create/update/delete
// View only
```

## Impact Stats
```javascript
// Fetch all impact stats
await api.fetchImpact();

// Create impact stat
await api.createImpact({
  title: "People Helped",
  value: 5000,
  icon: "🤝"
});

// Update impact stat
await api.updateImpact(id, { value: 5500 });

// Delete impact stat
await api.deleteImpact(id);
```

---

## ID Field Handling

All responses automatically convert MongoDB `_id` to `id`:

```javascript
// Backend response
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Help Program"
}

// Frontend receives
{
  "id": "507f1f77bcf86cd799439011",
  "_id": "507f1f77bcf86cd799439011",
  "title": "Help Program"
}
```

Use `item.id` in your code - it's automatically normalized!

---

## Error Handling

```javascript
try {
  const programs = await api.fetchPrograms();
} catch (error) {
  console.error("API Error:", error.message);
  // Display user-friendly message
  setError("Failed to load programs");
}
```

---

## Route Structure

```
/admin/login                    → AdminLogin (no sidebar)
/admin/dashboard                → Redirect to /programs
/admin/dashboard/programs       → Programs CRUD
/admin/dashboard/events         → Events CRUD
/admin/dashboard/projects       → Projects CRUD
/admin/dashboard/volunteers     → Volunteers (read-only)
/admin/dashboard/contacts       → Contacts (read-only)
/admin/dashboard/impact         → Impact CRUD
```

---

## Component Props & Usage

### AdminDashboard
```jsx
// Automatically receives section from URL params
// http://localhost:5173/admin/dashboard/programs
const { section = "programs" } = useParams();
```

### AdminLayout
```jsx
// Sidebar with navigation
// Uses Outlet for dynamic content
// Renders AdminDashboard for different sections
```

### AdminLogin
```jsx
// No auth backend yet (Phase 1)
// Sets sessionStorage.setItem("adminLoggedIn", "true")
// Future: Will handle JWT tokens
```

---

## Adding New API Functions

To add a new API function:

1. **Add to `src/admin/api.js`:**
```javascript
export async function newFunction(data) {
  return apiRequest("/api/endpoint", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
```

2. **Add to section config in AdminDashboard:**
```javascript
newSection: {
  label: "New Section",
  emoji: "🆕",
  endpoint: api.fetchNewSection,
  createFn: api.createNewSection,
  // ... etc
}
```

3. **Navigation will auto-generate** from `AdminLayout`

---

## Debugging

Enable console logs:
```javascript
// In api.js, errors are logged:
console.error(`API Error (${endpoint}):`, error);

// In AdminDashboard, errors are displayed:
{error && <div>{error}</div>}
```

Check Network tab in DevTools to see actual API calls.

---

## FAQ

**Q: Why no JWT tokens yet?**
A: Phase 1 focuses on UI structure. Phase 2 will add proper authentication.

**Q: How do I add a new section?**
A: Add config to `sections` object in AdminDashboard + API functions to api.js

**Q: Why separate AdminRoutes?**
A: Keeps admin completely separate from public website. No navbar/footer leakage.

**Q: Can public users see admin panel?**
A: No - routes are separate. No admin links anywhere in public UI.

**Q: How do I handle "contact" typo endpoint?**
A: Backend has `/api/contacts` but might return data differently. Check response structure.
