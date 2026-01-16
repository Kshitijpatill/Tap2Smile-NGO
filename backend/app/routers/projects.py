from fastapi import APIRouter
from app.models.project import ProjectResponse
from app.core.database import db
from typing import List

router = APIRouter()

@router.get("/", response_model=List[ProjectResponse])
async def get_projects():
    cursor = db.projects.find({"is_active": True})
    projects = await cursor.to_list(length=100)
    
    results = []
    for p in projects:
        p["id"] = str(p["_id"])
        results.append(p)
    return results