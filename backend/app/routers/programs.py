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


@router.delete("/{program_id}", dependencies=[Depends(get_current_user)])
async def delete_program(program_id: str):
    program_obj_id = validate_object_id(program_id)
    linked_projects = await db.projects.count_documents({"program_ids": program_obj_id})
    if linked_projects > 0:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot delete program. It is linked to {linked_projects} projects."
        )

    result = await db.programs.delete_one({"_id": program_obj_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Program not found")

    return {"success": True, "message": "Program deleted successfully"}

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
        print(f"[create_program] payload: {program.model_dump()}")
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
        print(f"[update_program] id={program_id} payload={program.model_dump()}")
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
    
    linked_projects = await db.projects.count_documents({"program_id": program_obj_id})
    if linked_projects > 0:
        raise HTTPException(
            status_code=400, 
            detail=f"Cannot delete program. It has {linked_projects} active projects linked to it."
        )

    result = await db.programs.delete_one({"_id": program_obj_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Program not found")

    return {"success": True, "message": "Program deleted successfully"}



from fastapi import APIRouter, HTTPException, Depends, Query
from app.models.project import ProjectResponse, ProjectBase
from app.core.database import db
from typing import List, Optional
from bson import ObjectId
from datetime import datetime, time, timezone
from app.core.deps import get_current_user

router = APIRouter()

async def validate_program_ids(program_ids: List[str]):
    if not program_ids:
        return []

    valid_obj_ids = []
    for pid in program_ids:
        if not ObjectId.is_valid(pid):
            raise HTTPException(
                status_code=400, detail=f"Invalid Program ID format: {pid}")
        
        program = await db.programs.find_one({"_id": ObjectId(pid)})
        if not program:
            raise HTTPException(
                status_code=404, detail=f"Program with ID {pid} not found")
        
        valid_obj_ids.append(ObjectId(pid))
    
    return valid_obj_ids



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
        
        found_ids = set()
        if "program_ids" in p and isinstance(p["program_ids"], list):
            for pid in p["program_ids"]:
                found_ids.add(str(pid))
        
        if "program_id" in p and p["program_id"]:
            found_ids.add(str(p["program_id"]))

        p["program_ids"] = list(found_ids)
            
        results.append(p)

    return results


@router.get("/admin", dependencies=[Depends(get_current_user)], response_model=List[ProjectResponse])
async def get_all_projects_admin(program_id: Optional[str] = Query(None)):
    query = {}

    if program_id:
        if not ObjectId.is_valid(program_id):
            raise HTTPException(status_code=400, detail="Invalid Program ID format")
        
        query["$or"] = [
            {"program_ids": ObjectId(program_id)},
            {"program_id": ObjectId(program_id)}
        ]

    cursor = db.projects.find(query).sort("created_at", -1)
    projects = await cursor.to_list(length=100)

    results = []
    for p in projects:
        p["id"] = str(p["_id"])
        
        found_ids = set()
        if "program_ids" in p and isinstance(p["program_ids"], list):
            for pid in p["program_ids"]:
                found_ids.add(str(pid))
        if "program_id" in p and p["program_id"]:
            found_ids.add(str(p["program_id"]))
        
        p["program_ids"] = list(found_ids)
            
        results.append(p)

    return results


@router.post("/", dependencies=[Depends(get_current_user)], response_model=ProjectResponse)
async def create_project(project: ProjectBase):
    project_data = project.model_dump()

    if project_data.get("program_ids"):
        project_data["program_ids"] = await validate_program_ids(project_data["program_ids"])
    else:
        project_data["program_ids"] = []

    if project_data.get("start_date"):
        project_data["start_date"] = datetime.combine(
            project_data["start_date"], time.min
        )
    if project_data.get("end_date"):
        project_data["end_date"] = datetime.combine(
            project_data["end_date"], time.min
        )

    project_data["created_at"] = datetime.now(timezone.utc)
    project_data["updated_at"] = project_data["created_at"]

    new_project = await db.projects.insert_one(project_data)
    created_project = await db.projects.find_one({"_id": new_project.inserted_id})

    created_project["id"] = str(created_project["_id"])
    created_project["program_ids"] = [str(pid) for pid in created_project.get("program_ids", [])]

    return created_project


@router.put("/{project_id}", dependencies=[Depends(get_current_user)], response_model=ProjectResponse)
async def update_project(project_id: str, project: ProjectBase):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid Project ID format")

    update_data = project.model_dump()

    if "program_ids" in update_data:
        update_data["program_ids"] = await validate_program_ids(update_data["program_ids"])

    if update_data.get("start_date"):
        update_data["start_date"] = datetime.combine(
            update_data["start_date"], time.min
        )
    if update_data.get("end_date"):
        update_data["end_date"] = datetime.combine(
            update_data["end_date"], time.min
        )

    update_data["updated_at"] = datetime.now(timezone.utc)

    result = await db.projects.update_one(
        {"_id": ObjectId(project_id)},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    updated_project = await db.projects.find_one({"_id": ObjectId(project_id)})
    
    updated_project["id"] = str(updated_project["_id"])
    
    found_ids = set()
    if "program_ids" in updated_project and isinstance(updated_project["program_ids"], list):
        for pid in updated_project["program_ids"]:
            found_ids.add(str(pid))
    if "program_id" in updated_project and updated_project["program_id"]:
        found_ids.add(str(updated_project["program_id"]))
    updated_project["program_ids"] = list(found_ids)

    return updated_project


@router.delete("/{project_id}", dependencies=[Depends(get_current_user)])
async def delete_project(project_id: str):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid Project ID format")

    result = await db.projects.delete_one({"_id": ObjectId(project_id)})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    return {"message": "Project deleted successfully"}