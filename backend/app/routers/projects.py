from fastapi import APIRouter, HTTPException, Depends, Query
from app.models.project import ProjectResponse, ProjectBase
from app.core.database import db
from typing import List, Optional
from bson import ObjectId
from datetime import datetime, time, timezone
from app.core.deps import get_current_user

router = APIRouter()


async def validate_program_id(program_id: str):
    if not ObjectId.is_valid(program_id):
        raise HTTPException(
            status_code=400, detail="Invalid Program ID format")

    program = await db.programs.find_one({"_id": ObjectId(program_id)})
    if not program:
        raise HTTPException(
            status_code=404, detail=f"Program with ID {program_id} not found")
    return True


@router.get("/admin", dependencies=[Depends(get_current_user)], response_model=List[ProjectResponse])
async def get_all_projects_admin(program_id: Optional[str] = Query(None)):
    """
    Admin Only: Get ALL projects (Active + Inactive).
    Use this for the Admin Panel list.
    """
    query = {}

    if program_id:
        if not ObjectId.is_valid(program_id):
            raise HTTPException(
                status_code=400, detail="Invalid Program ID format")
        query["program_id"] = ObjectId(program_id)

    cursor = db.projects.find(query)
    projects = await cursor.to_list(length=100)

    results = []
    for p in projects:
        p["id"] = str(p["_id"])
        if "program_id" in p and p["program_id"]:
            p["program_id"] = str(p["program_id"])
        results.append(p)

    return results


@router.get("/", response_model=List[ProjectResponse])
async def get_projects(
    program_id: Optional[str] = Query(None),
):
    query = {}

    if program_id:
        if not ObjectId.is_valid(program_id):
            raise HTTPException(
                status_code=400, detail="Invalid Program ID format")
        query["program_id"] = ObjectId(program_id)

    cursor = db.projects.find(query)
    projects = await cursor.to_list(length=100)

    results = []
    for p in projects:
        p["id"] = str(p["_id"])
        if "program_id" in p and p["program_id"]:
            p["program_id"] = str(p["program_id"])
        results.append(p)

    return results


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_single_project(project_id: str):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(
            status_code=400, detail="Invalid Project ID format")

    project = await db.projects.find_one({"_id": ObjectId(project_id)})

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project["id"] = str(project["_id"])
    if "program_id" in project and project["program_id"]:
        project["program_id"] = str(project["program_id"])

    return project


@router.post("/", dependencies=[Depends(get_current_user)], response_model=ProjectResponse)
async def create_project(project: ProjectBase):
    try:
        project_dict = project.model_dump()
        print(f"[create_project] payload: {project_dict}")

        if project_dict.get("program_id"):
            # validate string ObjectId
            await validate_program_id(project_dict["program_id"])
            project_dict["program_id"] = ObjectId(project_dict["program_id"])

        if project_dict.get("start_date"):
            project_dict["start_date"] = datetime.combine(
                project_dict["start_date"],
                time.min,
                tzinfo=timezone.utc
            )

        if project_dict.get("end_date"):
            project_dict["end_date"] = datetime.combine(
                project_dict["end_date"],
                time.min,
                tzinfo=timezone.utc
            )

        project_dict["created_at"] = datetime.now(timezone.utc)
        project_dict["updated_at"] = datetime.now(timezone.utc)

        result = await db.projects.insert_one(project_dict)

        created_project = await db.projects.find_one({"_id": result.inserted_id})
        created_project["id"] = str(created_project["_id"])

        if created_project.get("program_id"):
            created_project["program_id"] = str(created_project["program_id"])

        return created_project
    except HTTPException:
        raise
    except Exception as e:
        print(f"[create_project] ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{project_id}", dependencies=[Depends(get_current_user)], response_model=ProjectResponse)
async def update_project(project_id: str, project: ProjectBase):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(
            status_code=400, detail="Invalid Project ID format")

    try:
        update_data = project.model_dump()
        print(f"[update_project] id={project_id} payload={update_data}")

        if update_data.get("start_date"):
            update_data["start_date"] = datetime.combine(
                update_data["start_date"],
                time.min,
                tzinfo=timezone.utc
            )

        if update_data.get("end_date"):
            update_data["end_date"] = datetime.combine(
                update_data["end_date"],
                time.min,
                tzinfo=timezone.utc
            )

        if update_data.get("program_id"):
            await validate_program_id(update_data["program_id"])
            update_data["program_id"] = ObjectId(update_data["program_id"])

        update_data["updated_at"] = datetime.now(timezone.utc)

        result = await db.projects.update_one(
            {"_id": ObjectId(project_id)},
            {"$set": update_data}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Project not found")

        updated_project = await db.projects.find_one({"_id": ObjectId(project_id)})

        if "created_at" not in updated_project:
            updated_project["created_at"] = updated_project["updated_at"]

        updated_project["id"] = str(updated_project["_id"])
        if "program_id" in updated_project and updated_project["program_id"]:
            updated_project["program_id"] = str(updated_project["program_id"])

        return updated_project
    except HTTPException:
        raise
    except Exception as e:
        print(f"[update_project] ERROR: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{project_id}", dependencies=[Depends(get_current_user)])
async def delete_project(project_id: str):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(
            status_code=400, detail="Invalid Project ID format")

    result = await db.projects.delete_one({"_id": ObjectId(project_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    return {"success": True, "message": "Project deleted successfully"}
