from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from app.models.volunteer import VolunteerCreate, VolunteerResponse, VolunteerUpdate
from app.core.database import db
from typing import List
from app.core.deps import get_current_user
from app.core.mail import send_admin_notification, send_user_confirmation
from datetime import datetime
from bson import ObjectId

router = APIRouter()


@router.post("/", response_model=VolunteerResponse)
async def submit_volunteer_application(application: VolunteerCreate, background_tasks: BackgroundTasks):
    """
    Public endpoint for users to apply as a volunteer.
    """
    existing_volunteer = await db.volunteers.find_one({"email": application.email})

    if existing_volunteer:
        raise HTTPException(
            status_code=400,
            detail="An application with this email already exists."
        )
    app_dict = application.model_dump()

    app_dict["status"] = "new"
    app_dict["created_at"] = datetime.utcnow()

    result = await db.volunteers.insert_one(app_dict)

    new_volunteer = await db.volunteers.find_one({"_id": result.inserted_id})
    new_volunteer["id"] = str(new_volunteer["_id"])

    email_subject = f"New Volunteer: {new_volunteer['name']}"
    email_body = f"""
    <strong>Name:</strong> {new_volunteer['name']}<br>
    <strong>Email:</strong> {new_volunteer['email']}<br>
    <strong>Phone:</strong> {new_volunteer['phone']}<br>
    <strong>City:</strong> {new_volunteer['city']}<br>
    <strong>Interest:</strong> {new_volunteer.get('interest_area', 'General')}
    """

    background_tasks.add_task(send_admin_notification,email_subject, email_body)
    
    user_subject = "Welcome to the Team! 🤝"
    user_body = f"""
    Thank you for applying to volunteer with TapToSmile!
    <br><br>
    We have received your application for <strong>{new_volunteer.get('interest_area', 'General Support')}</strong>. 
    Our coordinator will review your profile and reach out to you soon.
    """
    background_tasks.add_task(
        send_user_confirmation,
        new_volunteer['email'],
        new_volunteer['name'],
        user_subject,
        user_body
    )
    return new_volunteer


@router.get("/", dependencies=[Depends(get_current_user)], response_model=List[VolunteerResponse])
async def get_all_volunteers():
    """
    Admin only: List all volunteer applications.
    """
    cursor = db.volunteers.find().sort("created_at", -1)
    volunteers = await cursor.to_list(length=100)

    results = []
    for v in volunteers:
        v["id"] = str(v["_id"])
        results.append(v)
    return results


@router.patch("/{volunteer_id}/status", dependencies=[Depends(get_current_user)])
async def update_volunteer_status(volunteer_id: str, update_data: VolunteerUpdate):
    """
    Admin only: Update the status of a volunteer.
    Body: { "status": "contacted" }
    """
    if not ObjectId.is_valid(volunteer_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")

    allowed_statuses = ["new", "contacted", "onboarded", "rejected"]

    if update_data.status not in allowed_statuses:
        raise HTTPException(
            status_code=400, detail=f"Status must be one of {allowed_statuses}")

    result = await db.volunteers.update_one(
        {"_id": ObjectId(volunteer_id)},
        {"$set": {"status": update_data.status}}
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404, detail="Volunteer application not found")

    return {"success": True, "message": f"Status updated to {update_data.status}"}


@router.delete("/{volunteer_id}", dependencies=[Depends(get_current_user)])
async def delete_volunteer(volunteer_id: str):
    """
    Admin only: Delete a volunteer application.
    """
    if not ObjectId.is_valid(volunteer_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")

    result = await db.volunteers.delete_one({"_id": ObjectId(volunteer_id)})

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404, detail="Volunteer application not found")

    return {"success": True, "message": "Application deleted successfully"}
