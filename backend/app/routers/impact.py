from fastapi import APIRouter
from app.models.impact import ImpactResponse
from app.core.database import db
from typing import List

router = APIRouter()

@router.get("/", response_model=List[ImpactResponse])
async def get_impact_stats():
    stats_cursor = db.impact_stats.find()
    stats = await stats_cursor.to_list(length=100)
    
    results = []
    for s in stats:
        s["id"] = str(s["_id"])
        results.append(s)
        
    return results