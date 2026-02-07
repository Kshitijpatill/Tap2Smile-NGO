from fastapi import APIRouter, HTTPException, Depends, Query
from app.models.project import ProjectResponse, ProjectBase
from app.core.database import db
from typing import List, Optional
from bson import ObjectId
from datetime import datetime, time, timezone
from app.core.deps import get_current_user

router = APIRouter()


# --------------------------------------------------
# Helpers
# --------------------------------------------------
async def validate_program_ids(program_ids: List[str]):
    if not program_ids:
        return []

    valid_obj_ids = []

    for pid in program_ids:
        if not ObjectId.is_valid(pid):
            raise HTTPException(
                status_code=400,
                detail=f"Invalid Program ID format: {pid}"
            )

        program = await db.programs.find_one({"_id": ObjectId(pid)})
        if not program:
            raise HTTPException(
                status_code=404,
                detail=f"Program with ID {pid} not found"
            )

        valid_obj_ids.append(ObjectId(pid))

    return valid_obj_ids


def normalize_dates(data: dict):
    if data.get("start_date"):
        data["start_date"] = datetime.combine(data["start_date"], time.min)
    if data.get("end_date"):
        data["end_date"] = datetime.combine(data["end_date"], time.min)


def normalize_program_ids(project: dict):
    found_ids = set()

    if isinstance(project.get("program_ids"), list):
        for pid in project["program_ids"]:
            found_ids.add(str(pid))

    if project.get("program_id"):
        found_ids.add(str(project["program_id"]))

    project["program_ids"] = list(found_ids)


# --------------------------------------------------
# Public: Get Projects
# --------------------------------------------------
@router.get("/", response_model=List[ProjectResponse])
async def get_projects(active_only: bool = True):
    query = {}
    if active_only:
        query["is_active"] = True

    cursor = db.projects.find(query).sort("created_at", -1)
    projects = await cursor.to_list(length=100)

    results = []
    for p in projects:
        p["id"] = str(p["_id"])
        normalize_program_ids(p)
        results.append(p)

    return results


# --------------------------------------------------
# Admin: Get Projects
# --------------------------------------------------
@router.get(
    "/admin",
    dependencies=[Depends(get_current_user)],
    response_model=List[ProjectResponse]
)
async def get_all_projects_admin(program_id: Optional[str] = Query(None)):
    query = {}

    if program_id:
        if not ObjectId.is_valid(program_id):
            raise HTTPException(status_code=400, detail="Invalid Program ID")

        query["$or"] = [
            {"program_ids": ObjectId(program_id)},
            {"program_id": ObjectId(program_id)}
        ]

    cursor = db.projects.find(query).sort("created_at", -1)
    projects = await cursor.to_list(length=100)

    results = []
    for p in projects:
        p["id"] = str(p["_id"])
        normalize_program_ids(p)
        results.append(p)

    return results


# --------------------------------------------------
# Admin: Create Project
# --------------------------------------------------
@router.post(
    "/",
    dependencies=[Depends(get_current_user)],
    response_model=ProjectResponse
)
async def create_project(project: ProjectBase):
    project_data = project.model_dump()

    # ✅ program_ids
    project_data["program_ids"] = await validate_program_ids(
        project_data.get("program_ids", [])
    )

    # ✅ dates
    normalize_dates(project_data)

    project_data["created_at"] = datetime.now(timezone.utc)
    project_data["updated_at"] = project_data["created_at"]

    result = await db.projects.insert_one(project_data)

    created = await db.projects.find_one({"_id": result.inserted_id})
    created["id"] = str(created["_id"])
    normalize_program_ids(created)

    return created


# --------------------------------------------------
# Admin: Update Project (PATCH – IMPORTANT)
# --------------------------------------------------
@router.patch(
    "/{project_id}",
    dependencies=[Depends(get_current_user)],
    response_model=ProjectResponse
)
async def update_project(project_id: str, project: ProjectBase):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid Project ID")

    update_data = project.model_dump()

    if "program_ids" in update_data:
        update_data["program_ids"] = await validate_program_ids(
            update_data.get("program_ids", [])
        )

    normalize_dates(update_data)
    update_data["updated_at"] = datetime.now(timezone.utc)

    result = await db.projects.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    updated = await db.projects.find_one({"_id": ObjectId(project_id)})
    updated["id"] = str(updated["_id"])
    normalize_program_ids(updated)

    return updated


# --------------------------------------------------
# Admin: Delete Project
# --------------------------------------------------
@router.delete(
    "/{project_id}",
    dependencies=[Depends(get_current_user)]
)
async def delete_project(project_id: str):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid Project ID")

    result = await db.projects.delete_one({"_id": ObjectId(project_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    return {"success": True, "message": "Project deleted successfully"}
