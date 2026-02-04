from fastapi import APIRouter, Depends
from app.core.deps import get_current_user
from app.core.database import db
from bson import ObjectId

router = APIRouter()

# ---------------- PROGRAMS ----------------
@router.get("/programs")
async def admin_programs(user=Depends(get_current_user)):
    return await db.programs.find().to_list(100)

# ---------------- PROJECTS ----------------
@router.get("/projects")
async def admin_projects(user=Depends(get_current_user)):
    return await db.projects.find().to_list(100)

# ---------------- EVENTS ----------------
@router.get("/events")
async def admin_events(user=Depends(get_current_user)):
    return await db.events.find().to_list(100)

# ---------------- VOLUNTEERS ----------------
@router.get("/volunteers")
async def admin_volunteers(user=Depends(get_current_user)):
    return await db.volunteers.find().to_list(200)

# ---------------- DONATIONS ----------------
@router.get("/donations")
async def admin_donations(user=Depends(get_current_user)):
    return await db.donations.find().to_list(200)

# ---------------- CONTACT / MESSAGES ----------------
@router.get("/messages")
async def admin_messages(user=Depends(get_current_user)):
    return await db.contact.find().to_list(200)

# ---------------- IMPACT ----------------
@router.get("/impact")
async def admin_impact(user=Depends(get_current_user)):
    return await db.impact.find().to_list(50)
