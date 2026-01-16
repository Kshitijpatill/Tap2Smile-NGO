from fastapi import APIRouter, HTTPException
from app.models.volunteer import VolunteerCreate
from app.core.database import db
from datetime import datetime

router = APIRouter()


@router.post("/volunteer")
async def submit_volunteer(data: VolunteerCreate):
    volunteer_dict = data.model_dump()
    volunteer_dict["created_at"] = datetime.utcnow()
    volunteer_dict["status"] = "new"

    result = await db.volunteers.insert_one(volunteer_dict)

    if result.inserted_id:
        return {"success": True, "message": "Volunteer registered successfully", "id": str(result.inserted_id)}

    raise HTTPException(status_code=500, detail="Failed to register volunteer")
