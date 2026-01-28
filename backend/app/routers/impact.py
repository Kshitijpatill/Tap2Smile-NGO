from fastapi import APIRouter, HTTPException, Depends
from app.models.impact import ImpactResponse, ImpactBase
from app.core.database import db
from typing import List
from app.core.deps import get_current_user
from bson import ObjectId
from datetime import datetime

router = APIRouter()


# ===== ID VALIDATION =====
def validate_object_id(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid Impact ID format")
    return ObjectId(id)


# ===== GET ALL IMPACT STATS =====
@router.get("/", response_model=List[ImpactResponse])
async def get_impact():
    cursor = db.impact_stats.find({})
    stats = await cursor.to_list(length=100)

    results = []
    for s in stats:
        s["id"] = str(s["_id"])
        results.append(s)

    return results


# ===== CREATE IMPACT STAT (Admin only) =====
@router.post("/", dependencies=[Depends(get_current_user)])
async def create_impact(stat: ImpactBase):
    stat_dict = stat.model_dump()
    stat_dict["updated_at"] = datetime.utcnow()

    result = await db.impact_stats.insert_one(stat_dict)

    if result.inserted_id:
        return {
            "success": True,
            "message": "Impact stat created successfully",
            "id": str(result.inserted_id)
        }

    raise HTTPException(status_code=500, detail="Failed to create impact stat")


# ===== GET SINGLE IMPACT =====
@router.get("/{impact_id}", response_model=ImpactResponse)
async def get_single_impact(impact_id: str):

    impact_obj_id = validate_object_id(impact_id)

    stat = await db.impact_stats.find_one({"_id": impact_obj_id})

    if not stat:
        raise HTTPException(status_code=404, detail="Impact stat not found")

    stat["id"] = str(stat["_id"])
    return stat


# ===== UPDATE IMPACT (Admin only) =====
@router.put("/{impact_id}", dependencies=[Depends(get_current_user)])
async def update_impact(impact_id: str, stat: ImpactBase):

    impact_obj_id = validate_object_id(impact_id)

    update_data = stat.model_dump()
    update_data["updated_at"] = datetime.utcnow()

    result = await db.impact_stats.update_one(
        {"_id": impact_obj_id},
        {"$set": update_data}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Impact stat not found")

    return {"success": True, "message": "Impact stat updated successfully"}


# ===== DELETE IMPACT (Admin only) =====
@router.delete("/{impact_id}", dependencies=[Depends(get_current_user)])
async def delete_impact(impact_id: str):

    impact_obj_id = validate_object_id(impact_id)

    result = await db.impact_stats.delete_one({"_id": impact_obj_id})

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Impact stat not found")

    return {"success": True, "message": "Impact stat deleted successfully"}
