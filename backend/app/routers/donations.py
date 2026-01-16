from fastapi import APIRouter, HTTPException
from app.models.donation import DonationCreate
from app.core.database import db
from datetime import datetime

router = APIRouter()

@router.post("/")
async def process_donation(data: DonationCreate):
    donation_dict = data.model_dump()
    donation_dict["created_at"] = datetime.utcnow()
    donation_dict["payment_status"] = "pending" 
    
    result = await db.donations.insert_one(donation_dict)
    
    if result.inserted_id:
        return {
            "success": True, 
            "message": "Donation initiated", 
            "order_id": str(result.inserted_id)
        }
    
    raise HTTPException(status_code=500, detail="Failed to initiate donation")