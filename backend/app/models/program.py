from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Union
from datetime import datetime, date

class ProgramBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    description: str = Field(..., min_length=10)
    icon: Optional[str] = None 
    cover_image: Optional[str] = None
    is_active: bool = True


class ProgramResponse(ProgramBase):
    id: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
