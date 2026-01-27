from fastapi import APIRouter, HTTPException, Depends, Body
from app.models.donation import DonationCreate, DonationResponse
from app.core.database import db
from typing import List
from app.core.deps import get_current_user
from datetime import datetime
from bson import ObjectId

router = APIRouter()


@router.post("/", response_model=DonationResponse)
async def create_donation_order(donation: DonationCreate):
    donation_dict = donation.model_dump()

    # Statuses: initiated, success, failed
    donation_dict["payment_status"] = "initiated"
    donation_dict["created_at"] = datetime.utcnow()

    # Placeholder for Razorpay Order ID (Future Integration)
    # import uuid
    # donation_dict["order_id"] = f"order_{uuid.uuid4().hex[:10]}"

    result = await db.donations.insert_one(donation_dict)
    new_donation = await db.donations.find_one({"_id": result.inserted_id})
    new_donation["id"] = str(new_donation["_id"])

    return new_donation


@router.get("/", dependencies=[Depends(get_current_user)], response_model=List[DonationResponse])
async def get_all_donations():
    """
    Admin only: View all donation records.
    """
    cursor = db.donations.find().sort("created_at", -1)
    donations = await cursor.to_list(length=100)

    results = []
    for d in donations:
        d["id"] = str(d["_id"])
        results.append(d)
    return results


@router.patch("/{donation_id}/status", dependencies=[Depends(get_current_user)])
async def update_payment_status(donation_id: str, status: str = Body(..., embed=True)):
    if not ObjectId.is_valid(donation_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")

    allowed_statuses = ["initiated", "success", "failed"]
    if status not in allowed_statuses:
        raise HTTPException(
            status_code=400, detail=f"Status must be one of {allowed_statuses}")

    result = await db.donations.update_one(
        {"_id": ObjectId(donation_id)},
        {"$set": {"payment_status": status}}
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404, detail="Donation record not found")

    return {"success": True, "message": f"Payment status updated to {status}"}

@router.delete("/{donation_id}", dependencies=[Depends(get_current_user)])
async def delete_donation(donation_id: str):
    """
    Admin only: Delete a donation record.
    """
    if not ObjectId.is_valid(donation_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")

    result = await db.donations.delete_one({"_id": ObjectId(donation_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Donation record not found")

    return {"success": True, "message": "Donation record deleted successfully"}