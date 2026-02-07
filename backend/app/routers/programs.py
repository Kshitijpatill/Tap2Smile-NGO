from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List
from datetime import datetime, timezone
from bson import ObjectId

from app.models.program import ProgramBase, ProgramResponse
from app.core.database import db
from app.core.deps import get_current_user

router = APIRouter()


# -----------------------------
# Helpers
# -----------------------------
def validate_object_id(id: str) -> ObjectId:
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Program ID format")
    return ObjectId(id)


# -----------------------------
# Public: Get Programs
# -----------------------------
@router.get("/", response_model=List[ProgramResponse])
async def get_programs(active_only: bool = Query(True)):
    query = {"is_active": True} if active_only else {}

    cursor = db.programs.find(query).sort("created_at", -1)
    programs = await cursor.to_list(length=100)

    for p in programs:
        p["id"] = str(p["_id"])

    return programs


# -----------------------------
# Admin: Create Program
# -----------------------------
@router.post(
    "/",
    dependencies=[Depends(get_current_user)],
    response_model=ProgramResponse
)
async def create_program(program: ProgramBase):
    # Prevent duplicate titles (case-insensitive)
    existing = await db.programs.find_one({
        "title": {"$regex": f"^{program.title}$", "$options": "i"}
    })

    if existing:
        raise HTTPException(
            status_code=400,
            detail="A program with this title already exists."
        )

    program_data = program.model_dump()
    now = datetime.now(timezone.utc)

    program_data.update({
        "created_at": now,
        "updated_at": now
    })

    result = await db.programs.insert_one(program_data)
    created = await db.programs.find_one({"_id": result.inserted_id})

    created["id"] = str(created["_id"])
    return created


# -----------------------------
# Public: Get Single Program
# -----------------------------
@router.get("/{program_id}", response_model=ProgramResponse)
async def get_single_program(program_id: str):
    program_obj_id = validate_object_id(program_id)
    program = await db.programs.find_one({"_id": program_obj_id})

    if not program:
        raise HTTPException(status_code=404, detail="Program not found")

    program["id"] = str(program["_id"])
    return program


# -----------------------------
# Admin: Update Program (PATCH)
# -----------------------------
@router.patch(
    "/{program_id}",
    dependencies=[Depends(get_current_user)],
    response_model=ProgramResponse
)
async def update_program(program_id: str, program: ProgramBase):
    program_obj_id = validate_object_id(program_id)

    update_data = program.model_dump(exclude_unset=True)
    update_data["updated_at"] = datetime.now(timezone.utc)

    result = await db.programs.update_one(
        {"_id": program_obj_id},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Program not found")

    updated = await db.programs.find_one({"_id": program_obj_id})
    updated["id"] = str(updated["_id"])
    return updated


# -----------------------------
# Admin: Delete Program
# -----------------------------
@router.delete("/{program_id}", dependencies=[Depends(get_current_user)])
async def delete_program(program_id: str):
    program_obj_id = validate_object_id(program_id)

    # Check linkage with projects (new + legacy schemas)
    linked_projects = await db.projects.count_documents({
        "$or": [
            {"program_ids": program_obj_id},  # new array field
            {"program_id": program_obj_id}    # legacy field
        ]
    })

    if linked_projects > 0:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot delete program. Linked to {linked_projects} project(s)."
        )

    result = await db.programs.delete_one({"_id": program_obj_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Program not found")

    return {"success": True, "message": "Program deleted successfully"}
