
# Database Schema (MongoDB)

## Collections List
- **`users`** → Stores admin users (formerly 'admins')
- **`programs`** → Programs executed under the NGO (e.g., Project Kāla)
- **`projects`** → Specific projects executed under a Program
- **`events`** → One-time or recurring events
- **`volunteers`** → Volunteer application forms
- **`donations`** → Donation records and payment statuses
- **`contact_messages`** → Messages sent via the 'Contact Us' form
- **`impact_stats`** → Statistics displayed on the homepage

---

## `users`
*Represents the Admin accounts.*

```json
{
  "_id": ObjectId,
  "name": "string",
  "email": "string",
  "password_hash": "string",
  "role": "admin | superadmin",
  "is_active": true,
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```

## `programs`
*The main pillars of the NGO (e.g., Education, Health).*

```json
{
  "_id": ObjectId,
  "title": "string",
  "description": "string",
  "icon": "string",
  "is_active": true,
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```

## `projects`
*Specific initiatives linked to a Program.*

```json
{
  "_id": ObjectId,
  "title": "string",
  "description": "string",
  "program_id": ObjectId,  // Reference to 'programs' collection
  "location": "string",
  "images": ["string"],
  "start_date": "ISODate",
  "end_date": "ISODate | null",
  "is_active": true,
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```

## `events`
*Upcoming or past events.*

```json
{
  "_id": ObjectId,
  "title": "string",
  "description": "string",
  "event_date": "ISODate",
  "location": "string",
  "is_upcoming": true,
  "created_at": "ISODate"
}
```

## `volunteers`
*Applications submitted via the website.*

```json
{
  "_id": ObjectId,
  "name": "string",
  "email": "string",
  "phone": "string",
  "city": "string",
  "interest_area": "string",
  "status": "new | contacted | onboarded | rejected",
  "created_at": "ISODate"
}
```

## `donations`
*Records of donation attempts and successes.*

```json
{
  "_id": ObjectId,
  "donor_name": "string",
  "donor_email": "string",
  "donor_phone": "string",
  "amount": 1000.00,
  "message": "string",
  "payment_status": "initiated | success | failed",
  "order_id": "string",    // Razorpay Order ID
  "payment_id": "string",  // Razorpay Payment ID
  "created_at": "ISODate"
}
```

## `contact_messages`
*General inquiries.*

```json
{
  "_id": ObjectId,
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "created_at": "ISODate"
}
```

## `impact_stats`
*Counters for the homepage.*

```json
{
  "_id": ObjectId,
  "title": "string",   // e.g., "Lives Impacted"
  "value": 200000,
  "icon": "string",    // FontAwesome or Material Icon name
  "updated_at": "ISODate"
}
```

