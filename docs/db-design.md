# Database Schema (MongoDB)


##  Collections List

```
admins   ---> Stores admin users , like who can access the admin panel

programs ---> programs which are executed under a NGO

projects ---> projects which are executed under a program

events  ---> events which are executed under a program

volunteers  ---> volunteers who fill the form

donations  ---> donations made by people and volunteers

contact messages  ---> contact messages sent by users

impact_stats  ---> impact stats of a program, like how many events were held , total donations total liveline volunteers etc

```


---

### `admins`


```json
{
  "_id": ObjectId,
  "name": "string",
  "email": "string",
  "password_hash": "string",
  "role": "admin",
  "is_active": true,
  "created_at": "ISODate",
  "updated_at": "ISODate"
}

```
`programs`


``` json
{
  "_id": ObjectId,
  "title": "string",
  "slug": "string",
  "short_description": "string",
  "full_description": "string",
  "icon": "string",
  "cover_image": "string",
  "is_active": true,
  "created_at": "ISODate",
  "updated_at": "ISODate"
}

```

`projects`
``` json
{
  "_id": ObjectId,
  "title": "string",
  "slug": "string",
  "program_id": "ObjectId",
  "short_description": "string",
  "description": "string",
  "images": ["string"],
  "location": "string",
  "start_date": "ISODate",
  "end_date": "ISODate | null",
  "status": "ongoing | completed",
  "is_featured": false,
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```


`events`
```json
{
  "_id": ObjectId,
  "title": "string",
  "slug": "string",
  "description": "string",
  "event_date": "ISODate",
  "location": "string",
  "banner_image": "string",
  "is_upcoming": true,
  "created_at": "ISODate",
  "updated_at": "ISODate"
}

```


`volunteers`

```json
{
  "_id": ObjectId,
  "name": "string",
  "email": "string",
  "phone": "string",
  "city": "string",
  "area_of_interest": "string",
  "message": "string",
  "status": "new | contacted | onboarded",
  "created_at": "ISODate"
}

```


`donations`

```json
{
  "_id": ObjectId,
  "donor_name": "string",
  "donor_email": "string",
  "donor_phone": "string",
  "amount": 1000,
  "currency": "INR",
  "payment_gateway": "razorpay",
  "order_id": "string",
  "payment_id": "string | null",
  "payment_status": "initiated | success | failed",
  "created_at": "ISODate"
}
```

`contacts`

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


`impact_stats`

```json
{
  "_id": ObjectId,
  "label": "string",
  "value": 200000,
  "icon": "string",
  "is_active": true,
  "updated_at": "ISODate"
}

```