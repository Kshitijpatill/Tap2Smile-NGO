from fastapi import APIRouter
from app.models.event import EventResponse
from app.core.database import db
from typing import List

router = APIRouter()

@router.get("/", response_model=List[EventResponse])
async def get_events():
    cursor = db.events.find()
    events = await cursor.to_list(length=100)
    
    results = []
    for e in events:
        e["id"] = str(e["_id"])
        results.append(e)
    return results