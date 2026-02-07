from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date, datetime

class ProjectBase(BaseModel):
    title: str = Field(..., min_length=3)
    description: str = Field(..., min_length=10)
    location: Optional[str] = None

    # ✅ FIX 1: support multiple programs
    program_ids: List[str] = Field(default_factory=list)

    # ✅ FIX 2: support multiple images
    images: List[str] = Field(default_factory=list)

    start_date: Optional[date] = None
    end_date: Optional[date] = None

    is_active: bool = True


class ProjectResponse(ProjectBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
