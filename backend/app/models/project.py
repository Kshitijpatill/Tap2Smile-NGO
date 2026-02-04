from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime, date

class ProjectBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=150)
    description: str
    location: Optional[str] = None
    images: Optional[List[str]] = []
    program_ids: Optional[List[str]] = [] 
    program_id: Optional[str] = None 
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    is_active: bool = True

class ProjectResponse(ProjectBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    program_ids: Optional[List[str]] = []

    class Config:
        from_attributes = True