from fastapi import APIRouter, HTTPException, Depends, Query
from app.models.program import ProgramResponse, ProgramBase
from app.core.database import db
from typing import List, Optional
from app.core.deps import get_current_user
from bson import ObjectId
from datetime import datetime, timezone

router = APIRouter()


def validate_object_id(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(
            status_code=400, detail="Invalid Program ID format")
    return ObjectId(id)


@router.get("/", response_model=List[ProgramResponse])
async def get_programs(active_only: bool = True):
    query = {}
    if active_only:
        query["is_active"] = True

    programs_cursor = db.programs.find(query)
    programs = await programs_cursor.to_list(length=100)

    results = []
    for p in programs:
        p["id"] = str(p["_id"])
        results.append(p)

    return results


@router.post("/", dependencies=[Depends(get_current_user)], response_model=ProgramResponse)
async def create_program(program: ProgramBase):
    try:
        # Check for duplicates (Case-insensitive)
        existing_program = await db.programs.find_one({
            "title": {"$regex": f"^{program.title}$", "$options": "i"}
        })

        if existing_program:
            raise HTTPException(
                status_code=400,
                detail="A program with this title already exists."
            )

        program_dict = program.model_dump()
        program_dict["created_at"] = datetime.now(timezone.utc)
        program_dict["updated_at"] = datetime.now(timezone.utc)

        result = await db.programs.insert_one(program_dict)

        created_program = await db.programs.find_one({"_id": result.inserted_id})
        created_program["id"] = str(created_program["_id"])
        return created_program
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"[create_program] ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{program_id}", response_model=ProgramResponse)
async def get_single_program(program_id: str):
    program_obj_id = validate_object_id(program_id)
    program = await db.programs.find_one({"_id": program_obj_id})

    if not program:
        raise HTTPException(status_code=404, detail="Program not found")

    program["id"] = str(program["_id"])
    return program


@router.put("/{program_id}", dependencies=[Depends(get_current_user)], response_model=ProgramResponse)
async def update_program(program_id: str, program: ProgramBase):
    program_obj_id = validate_object_id(program_id)
    
    try:
        update_data = program.model_dump()
        update_data["updated_at"] = datetime.now(timezone.utc)

        result = await db.programs.update_one(
            {"_id": program_obj_id},
            {"$set": update_data}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Program not found")

        updated_program = await db.programs.find_one({"_id": program_obj_id})
        updated_program["id"] = str(updated_program["_id"])
        return updated_program
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"[update_program] ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{program_id}", dependencies=[Depends(get_current_user)])
async def delete_program(program_id: str):
    program_obj_id = validate_object_id(program_id)
    
    # Robust Check: Check if this program is used in NEW (list) or OLD (string) fields
    linked_projects = await db.projects.count_documents({
        "$or": [
            {"program_ids": program_obj_id}, # Checks inside the array
            {"program_id": program_obj_id}   # Checks the old string field
        ]
    })
    
    if linked_projects > 0:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot delete program. It is linked to {linked_projects} active projects."
        )

    result = await db.programs.delete_one({"_id": program_obj_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Program not found")

    return {"success": True, "message": "Program deleted successfully"}