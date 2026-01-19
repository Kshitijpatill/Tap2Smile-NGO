from fastapi import APIRouter, HTTPException, Depends, Query
from app.models.project import ProjectResponse, ProjectBase
from app.core.database import db
from typing import List
from bson import ObjectId
from datetime import datetime
from app.core.deps import get_current_user

router = APIRouter()


# ===== GET ALL PROJECTS =====
# Optional filter: /api/projects?program_id=xxxx

@router.get("/", response_model=List[ProjectResponse])
async def get_projects(program_id: str = Query(None)):
    
    query = {"is_active": True}

    # If program_id is provided → filter by program
    if program_id:
        query["program_id"] = ObjectId(program_id)

    cursor = db.projects.find(query)
    projects = await cursor.to_list(length=100)

    results = []
    for p in projects:
        p["id"] = str(p["_id"])
        p["program_id"] = str(p["program_id"])
        results.append(p)

    return results


# ===== CREATE PROJECT (Admin Only) =====

@router.post("/", dependencies=[Depends(get_current_user)])
async def create_project(project: ProjectBase):

    project_dict = project.model_dump()

    # Ensure program exists before inserting
    program = await db.programs.find_one({"_id": ObjectId(project_dict["program_id"])})
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")

    project_dict["program_id"] = ObjectId(project_dict["program_id"])
    project_dict["created_at"] = datetime.utcnow()
    project_dict["updated_at"] = datetime.utcnow()

    result = await db.projects.insert_one(project_dict)

    if result.inserted_id:
        return {
            "success": True,
            "message": "Project created successfully",
            "id": str(result.inserted_id)
        }

    raise HTTPException(status_code=500, detail="Failed to create project")


# ===== GET SINGLE PROJECT =====

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_single_project(project_id: str):
    
    project = await db.projects.find_one({"_id": ObjectId(project_id)})

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    project["id"] = str(project["_id"])
    project["program_id"] = str(project["program_id"])
    return project


# ===== UPDATE PROJECT (Admin Only) =====

@router.put("/{project_id}", dependencies=[Depends(get_current_user)])
async def update_project(project_id: str, project: ProjectBase):

    update_data = project.model_dump()

    # Ensure referenced program exists
    program = await db.programs.find_one({"_id": ObjectId(update_data["program_id"])})
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")

    update_data["program_id"] = ObjectId(update_data["program_id"])
    update_data["updated_at"] = datetime.utcnow()

    result = await db.projects.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    return {"success": True, "message": "Project updated successfully"}


# ===== DELETE PROJECT (Admin Only) =====

@router.delete("/{project_id}", dependencies=[Depends(get_current_user)])
async def delete_project(project_id: str):

    result = await db.projects.delete_one({"_id": ObjectId(project_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    return {"success": True, "message": "Project deleted successfully"}
