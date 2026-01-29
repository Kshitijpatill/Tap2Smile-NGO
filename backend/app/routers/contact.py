from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from app.models.contact import ContactCreate, ContactResponse
from app.core.database import db
from typing import List
from app.core.deps import get_current_user
from app.core.mail import send_admin_notification
from datetime import datetime
from bson import ObjectId

router = APIRouter()


@router.post("/", response_model=ContactResponse)
async def send_message(data: ContactCreate, background_tasks: BackgroundTasks):
    """
    Public: Send a contact message.
    Prevents duplicate submissions of the exact same message.
    """

    existing_message = await db.contact_messages.find_one({
        "email": data.email,
        "subject": data.subject,
        "message": data.message
    })

    if existing_message:
        raise HTTPException(
            status_code=400,
            detail="You have already sent this message. We will get back to you soon!"
        )

    contact_dict = data.model_dump()
    contact_dict["created_at"] = datetime.utcnow()
    result = await db.contact_messages.insert_one(contact_dict)
    new_message = await db.contact_messages.find_one({"_id": result.inserted_id})
    new_message["id"] = str(new_message["_id"])

    email_subject = f"Contact Query: {new_message['subject']}"
    email_body = f"""
    <strong>From:</strong> {new_message['name']} ({new_message['email']})<br>
    <strong>Message:</strong><br>
    {new_message['message']}
    """
    background_tasks.add_task(send_admin_notification,email_subject, email_body)
    
    return new_message


@router.get("/", dependencies=[Depends(get_current_user)], response_model=List[ContactResponse])
async def get_all_messages():
    cursor = db.contact_messages.find().sort("created_at", -1)
    messages = await cursor.to_list(length=100)
    results = []
    for m in messages:
        m["id"] = str(m["_id"])
        results.append(m)
    return results


@router.delete("/{message_id}", dependencies=[Depends(get_current_user)])
async def delete_message(message_id: str):
    if not ObjectId.is_valid(message_id):
        raise HTTPException(status_code=400, detail="Invalid ID format")

    result = await db.contact_messages.delete_one({"_id": ObjectId(message_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")

    return {"success": True, "message": "Message deleted successfully"}
