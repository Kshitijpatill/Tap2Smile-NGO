from fastapi import APIRouter, HTTPException
from app.models.program import ProgramResponse
from app.core.database import db
from typing import List

router = APIRouter()

@router.get("/", response_model=List[ProgramResponse])
async def get_programs():
    programs_cursor = db.programs.find({"is_active": True})
    programs = await programs_cursor.to_list(length=100)
    
    results = []
    for p in programs:
        p["id"] = str(p["_id"])  
        results.append(p)
        
    return results

