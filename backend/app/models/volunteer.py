from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime, date


class VolunteerCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    city: Optional[str] = None
    interest_area: Optional[str] = None

class VolunteerUpdate(BaseModel):
    status: str
    
class VolunteerResponse(VolunteerCreate):
    id: str
    status: str
    created_at: datetime
    class Config:
        from_attributes = True
