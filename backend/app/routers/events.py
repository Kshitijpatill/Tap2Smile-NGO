from fastapi import APIRouter, HTTPException, Depends
from app.models.event import EventResponse, EventBase
from app.core.database import db
from typing import List
from app.core.deps import get_current_user
from bson import ObjectId
from datetime import datetime, date, time

router = APIRouter()


def validate_object_id(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Event ID format")
    return ObjectId(id)


@router.get("/", response_model=List[EventResponse])
async def get_events():
    cursor = db.events.find(
        {"is_active": {"$ne": False}}
    )

    events = await cursor.to_list(length=100)

    results = []
    for e in events:
        e["id"] = str(e["_id"])
        results.append(e)

    return results


@router.post("/", dependencies=[Depends(get_current_user)])
async def create_event(event: EventBase):
    event_dict = event.model_dump()
    if isinstance(event_dict.get("event_date"), date):
        event_dict["event_date"] = datetime.combine(
            event_dict["event_date"],
            time.min
        )

    event_dict["created_at"] = datetime.utcnow()
    event_dict["updated_at"] = datetime.utcnow()

    result = await db.events.insert_one(event_dict)

    if result.inserted_id:
        return {
            "success": True,
            "message": "Event created successfully",
            "id": str(result.inserted_id)
        }

    raise HTTPException(status_code=500, detail="Failed to create event")


@router.get("/{event_id}", response_model=EventResponse)
async def get_single_event(event_id: str):

    event_obj_id = validate_object_id(event_id)

    event = await db.events.find_one({"_id": event_obj_id})

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    event["id"] = str(event["_id"])
    return event


@router.put("/{event_id}", dependencies=[Depends(get_current_user)])
async def update_event(event_id: str, event: EventBase):

    event_obj_id = validate_object_id(event_id)

    update_data = event.model_dump()
    if isinstance(update_data.get("event_date"), date):
        update_data["event_date"] = datetime.combine(
            update_data["event_date"],
            time.min
        )
    update_data["updated_at"] = datetime.utcnow()

    result = await db.events.update_one(
        {"_id": event_obj_id},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")

    return {"success": True, "message": "Event updated successfully"}


@router.delete("/{event_id}", dependencies=[Depends(get_current_user)])
async def delete_event(event_id: str):

    event_obj_id = validate_object_id(event_id)

    result = await db.events.delete_one({"_id": event_obj_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")

    return {"success": True, "message": "Event deleted successfully"}
