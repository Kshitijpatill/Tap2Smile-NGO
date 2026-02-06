from fastapi import APIRouter, HTTPException, Depends, Body, BackgroundTasks
from app.models.donation import DonationCreate, DonationResponse
from typing import List
from app.core.database import db
from app.core.deps import get_current_user
from app.core.mail import send_admin_notification, send_user_confirmation
from datetime import datetime
from bson import ObjectId

router = APIRouter()

@router.post("/", response_model=DonationResponse)
async def submit_donation_pledge(
    donation: DonationCreate, 
    background_tasks: BackgroundTasks
):
    """
    Public: User submits a 'promise' to donate.
    Sends emails to Superadmins AND the Donor.
    """
    donation_dict = donation.model_dump()
    
    # Default status is 'pending'
    donation_dict["status"] = "pending" 
    donation_dict["created_at"] = datetime.utcnow()
    
    result = await db.donations.insert_one(donation_dict)
    
    new_donation = await db.donations.find_one({"_id": result.inserted_id})
    new_donation["id"] = str(new_donation["_id"])
    
    admin_subject = f"New Pledge: ₹{new_donation['amount']} from {new_donation['donor_name']}"
    admin_body = f"""
    <strong>Donor:</strong> {new_donation['donor_name']}<br>
    <strong>Amount:</strong> ₹{new_donation['amount']}<br>
    <strong>Phone:</strong> {new_donation['donor_phone']}<br>
    <strong>Email:</strong> {new_donation['donor_email']}<br>
    """
    background_tasks.add_task(send_admin_notification, admin_subject, admin_body)

    user_subject = "We received your Pledge! ❤️"
    user_body = f"""
    Thank you so much for your generous pledge of <strong>₹{new_donation['amount']}</strong>.
    <br><br>
    Our team has received your details and will contact you shortly at <strong>{new_donation['donor_phone']}</strong> to coordinate the transfer.
    <br><br>
    Your support helps us bring smiles to those in need.
    """
    background_tasks.add_task(
        send_user_confirmation, 
        new_donation['donor_email'], 
        new_donation['donor_name'], 
        user_subject, 
        user_body
    )
    
    return new_donation

@router.get("/", dependencies=[Depends(get_current_user)], response_model=List[DonationResponse])
async def get_all_donations():
    """Admin: View all pledges."""
    cursor = db.donations.find().sort("created_at", -1)
    donations = await cursor.to_list(length=100)
    
    results = []
    for d in donations:
        d["id"] = str(d["_id"])
        results.append(d)
    return results

@router.patch("/{donation_id}/status", dependencies=[Depends(get_current_user)])
async def update_donation_status(donation_id: str, status: str = Body(..., embed=True)):
    """Admin: Mark pledge as 'received'."""
    if not ObjectId.is_valid(donation_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
        
    allowed = ["pending", "received", "cancelled"]
    if status not in allowed:
        raise HTTPException(status_code=400, detail=f"Status must be one of {allowed}")

    result = await db.donations.update_one(
        {"_id": ObjectId(donation_id)},
        {"$set": {"status": status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Donation not found")
        
    return {"success": True, "message": f"Status updated to {status}"}

@router.delete("/{donation_id}", dependencies=[Depends(get_current_user)])
async def delete_donation(donation_id: str):
    if not ObjectId.is_valid(donation_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")

    result = await db.donations.delete_one({"_id": ObjectId(donation_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Donation not found")

    return {"success": True, "message": "Donation deleted successfully"}