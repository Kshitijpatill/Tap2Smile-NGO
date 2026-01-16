from fastapi import APIRouter, HTTPException
from app.models.contact import ContactCreate
from app.core.database import db
from datetime import datetime

router = APIRouter()

@router.post("/")
async def send_message(data: ContactCreate):
    contact_dict = data.model_dump()
    contact_dict["created_at"] = datetime.utcnow()
    
    result = await db.contact_messages.insert_one(contact_dict)
    
    if result.inserted_id:
        return {"success": True, "message": "Message received successfully"}
    
    raise HTTPException(status_code=500, detail="Failed to send message")