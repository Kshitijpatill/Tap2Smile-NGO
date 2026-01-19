from fastapi import APIRouter, HTTPException, Depends
from app.models.program import ProgramResponse, ProgramBase
from app.core.database import db
from typing import List
from app.core.deps import get_current_user
from bson import ObjectId
from datetime import datetime

router = APIRouter()


# ===== ID VALIDATION HELPER =====

def validate_object_id(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Program ID format")
    return ObjectId(id)


# ===== EXISTING WORKING CODE (UNCHANGED) =====

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
    program_dict["created_at"] = datetime.utcnow()
    program_dict["updated_at"] = datetime.utcnow()

    result = await db.programs.insert_one(program_dict)

    if result.inserted_id:
        return {
            "success": True,
            "message": "Program created successfully",
            "id": str(result.inserted_id)
        }

    raise HTTPException(status_code=500, detail="Failed to create program")


# ===== NEW CRUD WITH VALIDATION =====

# GET single program by ID
@router.get("/{program_id}", response_model=ProgramResponse)
async def get_single_program(program_id: str):

    program_obj_id = validate_object_id(program_id)

    program = await db.programs.find_one({"_id": program_obj_id})

    if not program:
        raise HTTPException(status_code=404, detail="Program not found")

    program["id"] = str(program["_id"])
    return program


# UPDATE program (Admin only)
@router.put("/{program_id}", dependencies=[Depends(get_current_user)])
async def update_program(program_id: str, program: ProgramBase):

    program_obj_id = validate_object_id(program_id)

    update_data = program.model_dump()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.programs.update_one(
        {"_id": program_obj_id},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Program not found")

    return {"success": True, "message": "Program updated successfully"}


# DELETE program (Admin only)
@router.delete("/{program_id}", dependencies=[Depends(get_current_user)])
async def delete_program(program_id: str):

    program_obj_id = validate_object_id(program_id)

    result = await db.programs.delete_one({"_id": program_obj_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Program not found")

    return {"success": True, "message": "Program deleted successfully"}
