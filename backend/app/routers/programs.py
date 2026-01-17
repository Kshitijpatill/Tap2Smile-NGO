from fastapi import APIRouter, HTTPException, Depends
from app.models.program import ProgramResponse, ProgramBase
from app.core.database import db
from typing import List
from app.core.deps import get_current_user

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


@router.post("/", dependencies=[Depends(get_current_user)])
async def create_program(program: ProgramBase):
    program_dict = program.model_dump()

    from datetime import datetime
    program_dict["created_at"] = datetime.utcnow()
    program_dict["updated_at"] = datetime.utcnow()

    result = await db.programs.insert_one(program_dict)

    if result.inserted_id:
        return {"success": True, "message": "Program created successfully", "id": str(result.inserted_id)}

    raise HTTPException(status_code=500, detail="Failed to create program")
